import React, { useEffect, useRef, useState } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#<>/*"

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Text that resolves out of signal noise, left to right.
 * Server-rendered as the plain text; screen readers only ever see the
 * plain text.
 */
export const Decode = ({ text, delay = 0, duration = 900, ...rest }) => {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (prefersReduced()) return undefined
    let raf
    let start = null
    const scramble = keep =>
      text
        .split("")
        .map((ch, i) => {
          if (ch === " " || i < keep) return ch
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join("")
    const tick = now => {
      if (start === null) start = now
      const t = now - start - delay
      if (t >= duration) {
        setDisplay(text)
        return
      }
      setDisplay(scramble(t < 0 ? 0 : Math.floor((t / duration) * text.length)))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, delay, duration])

  return (
    <span {...rest}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

/**
 * Fades content up once it enters the viewport. The CSS lives in
 * GlobalStyle under [data-reveal]; reduced-motion users see everything
 * immediately.
 */
export const Reveal = ({ as: Tag = "div", delay = 0, children, ...rest }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in")
      return undefined
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          el.classList.add("is-in")
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
