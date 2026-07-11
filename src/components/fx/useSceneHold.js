import { useEffect } from "react"
import { getScrollY } from "./scrollfx"

/*
  useSceneHold — freezes a static section's last viewport for
  `holdScrolls` screens of scroll so the NEXT section in flow wipes
  over it (the episode-card transition): the wrap grows a hold tail,
  the stage counter-translates (desktop) or sticks (touch) to keep its
  final frame on screen, a .scene-dim overlay fades it to dark, and the
  next sibling is pulled up by the hold distance to ride the wipe.

  Silent under reduced motion — normal flow, no pull, no dim.
*/

export const useSceneHold = ({ wrapRef, stageRef, holdScrolls = 1 }) => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    const mm = q => window.matchMedia && window.matchMedia(q).matches
    if (mm("(prefers-reduced-motion: reduce)")) return undefined

    const isTouch = mm("(max-width: 850px)")

    const wrap = wrapRef.current
    const stage = stageRef.current
    if (!wrap || !stage) return undefined

    /* the wipe partner is whatever follows in flow — pulling it up here
       (not in CSS) keeps reduced-motion and no-JS layouts overlap-free */
    const next = wrap.nextElementSibling
    const dim = stage.querySelector(".scene-dim")

    if (isTouch) wrap.classList.add("is-touch")

    let raf = null
    let holdDist = 0
    let holdFrom = 0 // scroll offset into the wrap where the freeze begins

    const layout = () => {
      const vh = window.innerHeight
      const stageH = stage.offsetHeight
      holdDist = holdScrolls * vh
      holdFrom = Math.max(0, stageH - vh)
      wrap.style.height = `${stageH + holdDist}px`
      /* touch pins by sticky — a negative top parks the LAST viewport */
      if (isTouch) stage.style.top = `${Math.min(0, vh - stageH)}px`
      if (next) next.style.marginTop = `-${holdDist}px`
    }
    layout()
    window.addEventListener("resize", layout)

    const loop = () => {
      const y = getScrollY()
      const wrapTop = wrap.getBoundingClientRect().top + y
      const off = Math.max(0, Math.min(y - wrapTop - holdFrom, holdDist))

      if (!isTouch) {
        stage.style.transform = `translate3d(0, ${off.toFixed(2)}px, 0)`
      }

      /* the frozen frame dims as the next scene covers it */
      if (dim) dim.style.opacity = ((off / holdDist) * 0.85).toFixed(3)

      raf = window.requestAnimationFrame(loop)
    }
    raf = window.requestAnimationFrame(loop)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener("resize", layout)
      wrap.classList.remove("is-touch")
      wrap.style.height = ""
      stage.style.transform = ""
      stage.style.top = ""
      if (dim) dim.style.opacity = ""
      if (next) next.style.marginTop = ""
    }
  }, [wrapRef, stageRef, holdScrolls])
}
