import { useEffect } from "react"
import { getScrollY } from "./scrollfx"

/*
  useEpisode — an episode title card as a pinned scene. The 100vh window
  pins for `holdScrolls` viewports of scroll while the title runs its
  choreography: fade in (first quarter), hold at full opacity (middle),
  fade back out (last quarter) — then the pin releases and the section
  content rises.

  Desktop pins by counter-translate (sticky dies inside the smoother);
  touch pins by CSS sticky via the .is-touch class. Under reduced
  motion the hook does nothing — the title stays statically visible.
*/

const FADE_IN_END = 0.25
const FADE_OUT_START = 0.75

export const useEpisode = ({
  wrapRef,
  windowRef,
  contentRef,
  holdScrolls = 2,
}) => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    const mm = q => window.matchMedia && window.matchMedia(q).matches
    if (mm("(prefers-reduced-motion: reduce)")) return undefined

    const isTouch = mm("(max-width: 850px)")

    const wrap = wrapRef.current
    const win = windowRef.current
    const content = contentRef.current
    if (!wrap || !win || !content) return undefined

    wrap.classList.add("is-ep")
    if (isTouch) wrap.classList.add("is-touch")

    let raf = null
    let pinDist = 0

    const layout = () => {
      pinDist = holdScrolls * window.innerHeight
      wrap.style.height = `${window.innerHeight + pinDist}px`
    }
    layout()
    window.addEventListener("resize", layout)

    const loop = () => {
      const y = getScrollY()
      const wrapTop = wrap.getBoundingClientRect().top + y
      const off = Math.max(0, Math.min(y - wrapTop, pinDist))

      if (!isTouch) {
        win.style.transform = `translate3d(0, ${off.toFixed(2)}px, 0)`
      }

      const p = pinDist > 0 ? off / pinDist : 0
      const o =
        p < FADE_IN_END
          ? p / FADE_IN_END
          : p < FADE_OUT_START
          ? 1
          : 1 - (p - FADE_OUT_START) / (1 - FADE_OUT_START)
      content.style.opacity = o.toFixed(3)
      content.style.transform = `scale(${(0.95 + 0.1 * p).toFixed(4)})`

      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener("resize", layout)
      wrap.classList.remove("is-ep", "is-touch")
      wrap.style.height = ""
      win.style.transform = ""
      content.style.opacity = ""
      content.style.transform = ""
    }
  }, [wrapRef, windowRef, contentRef, holdScrolls])
}
