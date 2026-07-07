import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import v from "../../data/variables"

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

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
      const base = window.pageYOffset * speed
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
      setPct(max > 0 ? Math.min(100, Math.round((window.pageYOffset / max) * 100)) : 0)
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
