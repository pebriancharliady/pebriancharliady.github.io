import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import v from "../../data/variables"

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/* the smoothed scroll position when GSAP ScrollSmoother is active */
export const getScrollY = () =>
  typeof window === "undefined"
    ? 0
    : window.__SMOOTH_Y != null
    ? window.__SMOOTH_Y
    : window.pageYOffset

/* ------------------------------------------------------------------
   Parallax — child drifts against the scroll direction
------------------------------------------------------------------ */
export const Parallax = ({ speed = 0.12, children, ...rest }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return undefined
    let raf = null
    const update = () => {
      raf = null
      const r = el.getBoundingClientRect()
      const mid = window.innerHeight / 2
      const delta = r.top + r.height / 2 - mid
      el.style.transform = `translateY(${(-delta * speed).toFixed(1)}px)`
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [speed])

  return (
    <div ref={ref} style={{ willChange: "transform" }} {...rest}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------
   Ticker — a data stream scrubbed by the page scroll
------------------------------------------------------------------ */
const TickerStrip = styled.div`
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
  padding: 0.85rem 0;
  font-family: ${v.fontMono};
  font-size: var(--text-mono-s);
  font-weight: 500;
  letter-spacing: var(--track-mid);
  text-transform: uppercase;
  color: ${p => (p.$tone === "paper" ? v.inkFaint : v.faint)};

  .track {
    display: inline-block;
    will-change: transform;
  }

  .chunk {
    display: inline-block;
  }

  .sep {
    margin: 0 1.6em;
    color: ${p => (p.$tone === "paper" ? v.signalDeep : v.signal)};
  }

  .jp {
    font-family: ${v.fontJa};
    letter-spacing: 0.25em;
  }
`

export const Ticker = ({
  text,
  jp,
  tone = "dark",
  reverse = false,
  speed = 0.5,
  ...rest
}) => {
  const trackRef = useRef(null)
  const chunkRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const chunk = chunkRef.current
    if (!track || !chunk || reduced()) return undefined
    let raf = null
    const update = () => {
      raf = null
      const w = chunk.offsetWidth
      if (!w) return
      const base = getScrollY() * speed
      const x = reverse ? (base % w) - w : -(base % w)
      track.style.transform = `translateX(${x.toFixed(1)}px)`
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [reverse, speed])

  const chunk = (key, withRef) => (
    <span className="chunk" key={key} ref={withRef ? chunkRef : undefined}>
      {jp && (
        <>
          <span className="jp" lang="ja">
            {jp}
          </span>
          <span className="sep">◆</span>
        </>
      )}
      {text}
      <span className="sep">◆</span>
    </span>
  )

  return (
    <TickerStrip aria-hidden="true" $tone={tone} {...rest}>
      <span className="track" ref={trackRef}>
        {[0, 1, 2, 3, 4, 5].map(i => chunk(i, i === 0))}
      </span>
    </TickerStrip>
  )
}

/* ------------------------------------------------------------------
   ScrollScale — element breathes larger as it crosses viewport center
------------------------------------------------------------------ */
export const ScrollScale = ({ amp = 0.12, children, ...rest }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return undefined
    let raf = null
    const update = () => {
      raf = null
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const delta = Math.abs(r.top + r.height / 2 - vh / 2)
      const t = Math.max(0, 1 - delta / (vh * 0.85))
      el.style.transform = `scale(${(1 - amp / 2 + t * amp).toFixed(4)})`
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [amp])

  return (
    <div ref={ref} style={{ willChange: "transform" }} {...rest}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------
   ScrollVars — one rAF loop feeding CSS custom properties on <html>:
   --scroll-y (px, unitless) · --scroll-skew (deg, unitless, velocity
   with decay) · --hero-exit (0..1 over the first viewport — synced to
   the episode card's cover of the 100vh hero)
------------------------------------------------------------------ */
export const ScrollVars = () => {
  useEffect(() => {
    if (typeof window === "undefined" || reduced()) return undefined
    const root = document.documentElement

    /* on touch devices only --hero-exit runs — the decorative vars
       (hazard-stripe crawl, velocity skew) invalidate styles across
       the page every frame, which janks scrolling on weak phones */
    const lite =
      window.matchMedia && window.matchMedia("(max-width: 850px)").matches

    let raf = null
    let last = getScrollY()
    let skew = 0
    let idle = 0
    const loop = () => {
      const y = getScrollY()
      const vel = y - last
      last = y
      skew = skew * 0.86 + Math.max(-16, Math.min(16, vel)) * 0.14
      if (Math.abs(vel) < 0.1 && Math.abs(skew) < 0.02) {
        idle += 1
      } else {
        idle = 0
      }
      if (idle < 12) {
        if (!lite) {
          root.style.setProperty("--scroll-y", y.toFixed(0))
          root.style.setProperty("--scroll-skew", (skew * 0.05).toFixed(3))
        }
        root.style.setProperty(
          "--hero-exit",
          Math.max(0, Math.min(1, y / window.innerHeight)).toFixed(3)
        )
      }
      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return null
}

/* ------------------------------------------------------------------
   useScrollProgress — 0..100 page scroll, rAF-throttled
------------------------------------------------------------------ */
export const useScrollProgress = () => {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let raf = null
    const update = () => {
      raf = null
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setPct(
        max > 0 ? Math.min(100, Math.round((getScrollY() / max) * 100)) : 0
      )
    }
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return pct
}
