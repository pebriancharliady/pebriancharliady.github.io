import { useEffect } from "react"

/*
  The cursor lens: a HUD ring trailing the pointer that optically bends
  whatever sits beneath it (backdrop blur + contrast — a refraction
  glass), with crimson crosshair ticks. It grows over interactive
  elements. Mounted directly on <body>, outside the smoothed content;
  desktop fine-pointer only, absent under reduced motion.
*/

const SIZE = 20
const LERP = 0.16
const HOVER_SCALE = 1.45

export const CursorLens = () => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    const mm = q => window.matchMedia && window.matchMedia(q).matches
    if (
      mm("(prefers-reduced-motion: reduce)") ||
      mm("(max-width: 850px)") ||
      !mm("(pointer: fine)")
    ) {
      return undefined
    }

    const lens = document.createElement("div")
    lens.setAttribute("aria-hidden", "true")
    Object.assign(lens.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: `${SIZE}px`,
      height: `${SIZE}px`,
      borderRadius: "50%",
      border: "1px solid rgba(225, 49, 72, 0.35)",
      backdropFilter: "blur(2px) contrast(1.22) saturate(1.15)",
      WebkitBackdropFilter: "blur(2px) contrast(1.22) saturate(1.15)",
      zIndex: "65",
      pointerEvents: "none",
      opacity: "0",
      transition: "opacity 0.3s ease",
      willChange: "transform",
    })

    /* crosshair ticks */
    const tick = (w, h) => {
      const s = document.createElement("span")
      Object.assign(s.style, {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: `${w}px`,
        height: `${h}px`,
        marginLeft: `${-w / 2}px`,
        marginTop: `${-h / 2}px`,
        background: "rgba(225, 49, 72, 0.6)",
      })
      return s
    }
    lens.appendChild(tick(12, 1))
    lens.appendChild(tick(1, 12))

    document.body.appendChild(lens)

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let x = mx
    let y = my
    let scale = 1
    let targetScale = 1
    let visible = false
    let raf = null

    const onMove = e => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        lens.style.opacity = "1"
      }
      const hot = e.target && e.target.closest
        ? e.target.closest("a, button, [role='button']")
        : null
      targetScale = hot ? HOVER_SCALE : 1
    }
    const onLeave = () => {
      visible = false
      lens.style.opacity = "0"
    }

    const loop = () => {
      x += (mx - x) * LERP
      y += (my - y) * LERP
      scale += (targetScale - scale) * 0.12
      lens.style.transform = `translate3d(${(x - SIZE / 2).toFixed(1)}px, ${(
        y -
        SIZE / 2
      ).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`
      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)

    window.addEventListener("mousemove", onMove, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      if (lens.parentNode === document.body) {
        document.body.removeChild(lens)
      }
    }
  }, [])

  return null
}
