import React, { useEffect } from "react"

/*
  The analog TV layer. An SVG displacement filter warps the entire
  smoothed content like curved tube glass (html.crt-on → .smooth-wrap
  gets filter: url(#crt-warp)), and a director randomly fires
  signal-loss bursts: the warp spikes, the picture jitters, tear lines
  rip across, static flashes (html.glitching + the overlay below).

  Desktop only, silent under reduced motion. The scanlines and vignette
  live in GlobalStyle; the HUD frame stays crisp — it's the bezel.
*/

/* resting warp strength (center of the breathing oscillation) */
const WARP_SCALE = 18
/* slow amplitude swell — the tube breathing */
const WARP_BREATHE = 6
/* fast small instability — sync flutter */
const WARP_FLUTTER = 2.5
const BURST_MIN_GAP = 5000
const BURST_MAX_GAP = 14000

export const AnalogTV = () => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    const mm = q => window.matchMedia && window.matchMedia(q).matches
    if (mm("(prefers-reduced-motion: reduce)") || mm("(max-width: 850px)")) {
      return undefined
    }

    const root = document.documentElement
    root.classList.add("crt-on")
    const disp = document.getElementById("crt-disp")
    const turb = document.getElementById("crt-turb")

    let alive = true
    let timer = null
    let raf = null
    let bursting = false
    const timeouts = []

    /* the tube breathes: warp amplitude swells and flutters */
    const wobble = t => {
      if (!alive) return
      if (!bursting && disp) {
        const s =
          WARP_SCALE +
          Math.sin(t * 0.0011) * WARP_BREATHE +
          Math.sin(t * 0.0093) * WARP_FLUTTER
        disp.setAttribute("scale", s.toFixed(1))
      }
      raf = window.requestAnimationFrame(wobble)
    }
    raf = window.requestAnimationFrame(wobble)

    const later = (fn, ms) => {
      const id = setTimeout(() => alive && fn(), ms)
      timeouts.push(id)
    }

    const burst = () => {
      if (!alive) return
      root.style.setProperty("--tear1", `${8 + Math.random() * 70}%`)
      root.style.setProperty("--tear2", `${12 + Math.random() * 78}%`)
      root.classList.add("glitching")
      bursting = true

      /* new wave pattern every burst, then the signal loses lock */
      if (turb) turb.setAttribute("seed", String(Math.floor(Math.random() * 99)))
      if (disp) {
        const seq = [
          [0, 75],
          [60, 24],
          [120, 90],
          [190, 16],
          [260, WARP_SCALE],
        ]
        seq.forEach(([d, s]) =>
          later(() => disp.setAttribute("scale", String(s)), d)
        )
      }

      later(() => {
        root.classList.remove("glitching")
        bursting = false
        if (disp) disp.setAttribute("scale", String(WARP_SCALE))
      }, 300)

      timer = setTimeout(
        burst,
        BURST_MIN_GAP + Math.random() * (BURST_MAX_GAP - BURST_MIN_GAP)
      )
    }

    timer = setTimeout(burst, 3500 + Math.random() * 4500)

    return () => {
      alive = false
      clearTimeout(timer)
      if (raf) window.cancelAnimationFrame(raf)
      timeouts.forEach(clearTimeout)
      root.classList.remove("crt-on", "glitching")
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
      <div className="crt-glitch-overlay" aria-hidden="true">
        <span className="tear t1" />
        <span className="tear t2" />
        <span className="noise" />
      </div>
    </>
  )
}
