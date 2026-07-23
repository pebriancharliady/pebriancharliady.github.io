import React, { useEffect } from "react"

/*
  The analog TV layer — a living tube, no signal loss. An SVG
  displacement filter warps the entire smoothed content like curved
  tube glass (html.crt-on → .smooth-wrap gets filter: url(#crt-warp)),
  and the warp gently breathes. The old glitch-burst director is gone —
  it read as screen flicker and cost frames on weak devices.

  Desktop only (phones skip the filter AND the grain — see the media
  gates in GlobalStyle), silent under reduced motion. The scanlines
  and vignette live in GlobalStyle; the HUD frame stays crisp — it's
  the bezel.
*/

/* noise texture as an inline style — kept OUT of styled-components: a
   data-URI mangled by the css minifier aborts runtime style injection */
const noiseUri = (size, freq, alpha) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='${alpha}'/></svg>`
  )}")`

const GRAIN_BG = noiseUri(260, 0.8, 0.7)

/* resting warp strength (center of the breathing oscillation) */
const WARP_SCALE = 10
/* slow amplitude swell — the tube breathing */
const WARP_BREATHE = 2
/* fast small instability — sync flutter */
const WARP_FLUTTER = 2.5

export const AnalogTV = () => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    const mm = q => window.matchMedia && window.matchMedia(q).matches
    if (mm("(prefers-reduced-motion: reduce)")) return undefined

    /* the displacement warp is desktop-only — SVG filters are heavy on
       phone GPUs, and phones get the plain unfiltered page */
    if (mm("(max-width: 850px)")) return undefined

    const root = document.documentElement
    root.classList.add("crt-on")
    const disp = document.getElementById("crt-disp")

    let raf = null

    /* the tube breathes: warp amplitude swells and flutters */
    const wobble = t => {
      if (disp) {
        const s =
          WARP_SCALE +
          Math.sin(t * 0.0011) * WARP_BREATHE +
          Math.sin(t * 0.0093) * WARP_FLUTTER
        disp.setAttribute("scale", s.toFixed(1))
      }
      raf = window.requestAnimationFrame(wobble)
    }
    raf = window.requestAnimationFrame(wobble)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      root.classList.remove("crt-on")
      if (disp) disp.setAttribute("scale", String(WARP_SCALE))
    }
  }, [])

  return (
    <>
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute" }}
      >
        <filter
          id="crt-warp"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            id="crt-turb"
            type="fractalNoise"
            baseFrequency="0.0009 0.012"
            numOctaves="1"
            seed="7"
            result="warp"
          />
          <feDisplacementMap
            id="crt-disp"
            in="SourceGraphic"
            in2="warp"
            scale={WARP_SCALE}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div
        className="crt-grain"
        style={{ backgroundImage: GRAIN_BG }}
        aria-hidden="true"
      />
    </>
  )
}
