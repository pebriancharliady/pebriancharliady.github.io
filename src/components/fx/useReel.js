import { useEffect } from "react"
import { getScrollY } from "./scrollfx"

/*
  The reel engine: pins a full-screen window while vertical scroll leafs
  its track horizontally, snaps to panel boundaries once everything
  settles, and releases at the end. Driven by the smoothed scroll value
  so the scrub inherits the page's inertia.

  While a reel is engaged it sets body.reel-active — the HUD frame fades
  out for a true-fullscreen showcase (see GlobalStyle).

  Skips itself on small screens and reduced motion; callers style the
  vertical-stack fallback via the absence of the .is-h class.
*/

const easeInOutCubic = t =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export const useReel = ({
  wrapRef,
  windowRef,
  trackRef,
  counterRef,
  fillRef,
  count,
  panelScroll = 0.75,
  snapIdleMs = 240,
  snapMs = 480,
  /* extra viewports of pin AFTER the last panel — the window holds its
     final frame so the next section wipes over it (episode-card style) */
  holdAfter = 0,
}) => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    const mm = q => window.matchMedia && window.matchMedia(q).matches
    if (mm("(prefers-reduced-motion: reduce)")) return undefined

    /* on touch/small screens the window pins via position: sticky (no
       smoother there, so sticky works natively and never jitters) and
       snapping is skipped so it can't fight touch momentum */
    const isTouch = mm("(max-width: 850px)")

    const wrap = wrapRef.current
    const win = windowRef.current
    const track = trackRef.current
    const counter = counterRef ? counterRef.current : null
    const fill = fillRef ? fillRef.current : null
    if (!wrap || !win || !track || count < 2) return undefined

    wrap.classList.add("is-h")
    if (isTouch) wrap.classList.add("is-touch")

    let raf = null
    let leafDist = 0
    let pinDist = 0
    let lastNative = -1
    let stillSince = 0
    let snapAnim = null
    let snapDone = -1
    let engaged = false

    const layout = () => {
      leafDist = (count - 1) * window.innerHeight * panelScroll
      pinDist = leafDist + holdAfter * window.innerHeight
      wrap.style.height = `${window.innerHeight + pinDist}px`
    }
    layout()
    window.addEventListener("resize", layout)

    const cancelSnap = () => {
      snapAnim = null
    }
    window.addEventListener("wheel", cancelSnap, { passive: true })
    window.addEventListener("touchmove", cancelSnap, { passive: true })
    window.addEventListener("keydown", cancelSnap)

    const loop = now => {
      const y = getScrollY()
      const wrapTop = wrap.getBoundingClientRect().top + y

      const off = Math.max(0, Math.min(y - wrapTop, pinDist))
      if (!isTouch) {
        win.style.transform = `translate3d(0, ${off.toFixed(2)}px, 0)`
      }

      const progress =
        leafDist > 0 ? Math.min(1, off / leafDist) : 0
      track.style.transform = `translate3d(${(
        -progress *
        (count - 1) *
        window.innerWidth
      ).toFixed(2)}px, 0, 0)`

      if (fill) fill.style.transform = `scaleX(${progress.toFixed(4)})`
      const idx = Math.min(count, Math.round(progress * (count - 1)) + 1)
      if (counter && counter.dataset.idx !== String(idx)) {
        counter.dataset.idx = String(idx)
        counter.firstChild.textContent = String(idx).padStart(2, "0")
      }

      /* true fullscreen: fade the HUD while the reel holds the screen */
      const nowEngaged = off > 0.5 && off < pinDist - 0.5
      if (nowEngaged !== engaged) {
        engaged = nowEngaged
        document.body.classList[engaged ? "add" : "remove"]("reel-active")
      }

      const native = window.pageYOffset
      if (isTouch) {
        raf = window.requestAnimationFrame(loop)
        return
      }
      if (snapAnim) {
        const t = Math.min(1, (now - snapAnim.t0) / snapMs)
        const next = Math.round(
          snapAnim.from + (snapAnim.to - snapAnim.from) * easeInOutCubic(t)
        )
        window.scrollTo(0, next)
        lastNative = next
        if (t >= 1) {
          snapDone = snapAnim.to
          snapAnim = null
          stillSince = now
        }
      } else {
        if (native !== lastNative) {
          lastNative = native
          stillSince = now
          snapDone = -1
        }
        const step = window.innerHeight * panelScroll
        const nativeOff = native - wrapTop
        const settled = Math.abs(y - native) < 6
        if (
          now - stillSince > snapIdleMs &&
          settled &&
          nativeOff > 2 &&
          nativeOff < leafDist - 2
        ) {
          const target = Math.round(
            wrapTop + Math.round(nativeOff / step) * step
          )
          if (Math.abs(native - target) > 3 && target !== snapDone) {
            snapAnim = { from: native, to: target, t0: now }
          }
        }
      }

      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener("resize", layout)
      window.removeEventListener("wheel", cancelSnap)
      window.removeEventListener("touchmove", cancelSnap)
      window.removeEventListener("keydown", cancelSnap)
      if (engaged) document.body.classList.remove("reel-active")
      wrap.classList.remove("is-h", "is-touch")
      wrap.style.height = ""
      win.style.transform = ""
      track.style.transform = ""
    }
  }, [count, panelScroll, snapIdleMs, snapMs, wrapRef, windowRef, trackRef, counterRef, fillRef])
}
