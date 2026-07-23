import { useEffect } from "react"
import { getScrollY } from "./scrollfx"

/*
  The stack engine: pins a full-screen window while vertical scroll
  deals its items one over another — each incoming card rises over the
  previous, which gets pressed back (scaled, drifted up, dimmed) as if
  a new file were laid on the pile. Driven by the smoothed scroll value
  so the motion inherits the page's inertia; snaps to card boundaries
  once everything settles.

  Options give each stack its flavor:
    tilt      — degrees the incoming card straightens from as it lands
    parallax  — % the card's .bg lags behind the card (needs bleed in
                CSS: .bg { top: -<parallax>% } so no gap shows)

  While a stack is engaged it sets body.reel-active — the HUD frame
  fades out for a true-fullscreen showcase (see GlobalStyle).

  Touch devices pin via position: sticky (no smoother there); desktop
  counter-translates (sticky dies inside the smoother). Reduced motion
  skips everything — callers style the plain vertical fallback via the
  absence of the .is-stack class.
*/

const easeInOutCubic = t =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const easeOutCubic = t => 1 - Math.pow(1 - t, 3)

export const useStack = ({
  wrapRef,
  windowRef,
  counterRef,
  fillRef,
  count,
  panelScroll = 0.85,
  snapIdleMs = 240,
  snapMs = 520,
  /* extra viewports of pin AFTER the last card — the window holds its
     final frame so the next section wipes over it (episode-card style) */
  holdAfter = 0,
  tilt = 0,
  parallax = 0,
}) => {
  useEffect(() => {
    if (typeof window === "undefined") return undefined
    const mm = q => window.matchMedia && window.matchMedia(q).matches
    if (mm("(prefers-reduced-motion: reduce)")) return undefined

    const isTouch = mm("(max-width: 850px)")

    const wrap = wrapRef.current
    const win = windowRef.current
    const counter = counterRef ? counterRef.current : null
    const fill = fillRef ? fillRef.current : null
    if (!wrap || !win || count < 2) return undefined

    const items = Array.from(win.querySelectorAll("[data-stack-item]"))
    if (items.length < 2) return undefined
    const presses = items.map(el => el.querySelector(".press"))
    const bgs = parallax ? items.map(el => el.querySelector(".bg")) : []

    wrap.classList.add("is-stack")
    if (isTouch) wrap.classList.add("is-touch")

    let raf = null
    let leafDist = 0
    let pinDist = 0
    let lastNative = -1
    let stillSince = 0
    let snapAnim = null
    let snapDone = -1
    let engaged = false
    let shownP = null // lerped display progress — the dealing eases
    const dimEl = win.querySelector(".reel-dim")

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

      const progress = leafDist > 0 ? Math.min(1, off / leafDist) : 0

      /* the shown position trails the scroll — fluid dealing */
      if (shownP === null) shownP = progress
      shownP += (progress - shownP) * 0.085
      if (Math.abs(progress - shownP) < 0.0004) shownP = progress

      /* deal the cards: item i rises during segment (i-1..i) of raw;
         once landed it gets pressed back by whatever covers it. The
         two phases never overlap for one card, so a single transform
         write per item is enough. */
      const raw = shownP * (count - 1)
      for (let i = 0; i < count; i += 1) {
        const tIn = i === 0 ? 1 : Math.max(0, Math.min(raw - (i - 1), 1))
        const press = Math.max(0, Math.min(raw - i, 1))

        if (tIn < 1) {
          const e = easeOutCubic(tIn)
          items[i].style.transform = `translate3d(0, ${((1 - e) * 103).toFixed(
            3
          )}%, 0) rotate(${(tilt * (1 - e)).toFixed(3)}deg)`
          if (bgs[i]) {
            bgs[i].style.transform = `translate3d(0, ${(
              (1 - e) *
              parallax
            ).toFixed(3)}%, 0)`
          }
        } else {
          items[i].style.transform = `translate3d(0, ${(-6 * press).toFixed(
            3
          )}%, 0) scale(${(1 - 0.045 * press).toFixed(4)})`
          if (bgs[i]) bgs[i].style.transform = "translate3d(0, 0, 0)"
        }
        if (presses[i]) presses[i].style.opacity = (press * 0.55).toFixed(3)
      }

      /* the frozen frame dims as the next section wipes over it */
      if (dimEl && pinDist > leafDist) {
        const tail = Math.max(0, (off - leafDist) / (pinDist - leafDist))
        dimEl.style.opacity = (tail * 0.85).toFixed(3)
      }

      if (fill) fill.style.transform = `scaleX(${shownP.toFixed(4)})`
      const idx = Math.min(count, Math.round(raw) + 1)
      if (counter && counter.dataset.idx !== String(idx)) {
        counter.dataset.idx = String(idx)
        counter.firstChild.textContent = String(idx).padStart(2, "0")
      }

      /* true fullscreen: fade the HUD while the stack holds the screen */
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
      wrap.classList.remove("is-stack", "is-touch")
      wrap.style.height = ""
      win.style.transform = ""
      items.forEach(el => {
        el.style.transform = ""
      })
      presses.forEach(el => el && (el.style.opacity = ""))
      bgs.forEach(el => el && (el.style.transform = ""))
    }
  }, [
    count,
    panelScroll,
    snapIdleMs,
    snapMs,
    holdAfter,
    tilt,
    parallax,
    wrapRef,
    windowRef,
    counterRef,
    fillRef,
  ])
}
