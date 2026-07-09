import { useEffect } from "react"

/*
  useTilt — turns an element into a floating 3D plane.

  Idle: a slow levitation (vertical bob + gentle rotation drift).
  Hover: the plane tilts toward the pointer through a spring — the
  target is where the cursor is, but the plane carries weight: it lags,
  arrives with a slight overshoot, and settles.

  The parent needs `perspective` for the rotation to read as 3D.
  Pointer tracking needs a fine pointer; the float runs everywhere.
  Silent under reduced motion.
*/

const SPRING_STIFFNESS = 0.045
const SPRING_DAMPING = 0.86

export const useTilt = (
  ref,
  { maxTilt = 10, floatY = 7, floatTilt = 2, hoverScale = 1.02 } = {}
) => {
  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === "undefined") return undefined
    const mm = q => window.matchMedia && window.matchMedia(q).matches
    if (mm("(prefers-reduced-motion: reduce)")) return undefined

    const canHover = mm("(pointer: fine)")

    let raf = null
    let hovering = false
    let nx = 0
    let ny = 0

    /* spring state per axis: current value + velocity */
    const axes = {
      rx: { c: 0, v: 0 },
      ry: { c: 0, v: 0 },
      ty: { c: 0, v: 0 },
      s: { c: 1, v: 0 },
    }

    const spring = (axis, target) => {
      axis.v = (axis.v + (target - axis.c) * SPRING_STIFFNESS) * SPRING_DAMPING
      axis.c += axis.v
    }

    const onMove = e => {
      const r = el.getBoundingClientRect()
      nx = ((e.clientX - r.left) / r.width) * 2 - 1
      ny = ((e.clientY - r.top) / r.height) * 2 - 1
      hovering = true
    }
    const onLeave = () => {
      hovering = false
    }

    if (canHover) {
      el.addEventListener("pointermove", onMove)
      el.addEventListener("pointerleave", onLeave)
    }

    el.style.willChange = "transform"

    const loop = t => {
      if (hovering) {
        spring(axes.ry, nx * maxTilt)
        spring(axes.rx, -ny * maxTilt * 0.8)
        spring(axes.ty, 0)
        spring(axes.s, hoverScale)
      } else {
        /* the idle levitation path */
        spring(axes.ry, Math.sin(t * 0.0005) * floatTilt)
        spring(axes.rx, Math.sin(t * 0.0004 + 1.7) * floatTilt * 0.8)
        spring(axes.ty, Math.sin(t * 0.0008) * floatY)
        spring(axes.s, 1)
      }
      el.style.transform = `translateY(${axes.ty.c.toFixed(
        2
      )}px) rotateX(${axes.rx.c.toFixed(2)}deg) rotateY(${axes.ry.c.toFixed(
        2
      )}deg) scale(${axes.s.c.toFixed(3)})`
      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      if (canHover) {
        el.removeEventListener("pointermove", onMove)
        el.removeEventListener("pointerleave", onLeave)
      }
      el.style.transform = ""
      el.style.willChange = ""
    }
  }, [ref, maxTilt, floatY, floatTilt, hoverScale])
}
