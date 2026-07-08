import React, { useEffect, useRef } from "react"

/*
  GSAP ScrollSmoother integration. Native scrolling stays (scrollbar,
  URL, accessibility); the content glides after it with inertia.

  Because the smoother transforms the page content:
  - position: sticky dies inside it → PinOnScroll replaces the hero pin
    with a ScrollTrigger pin (the sticky CSS still covers mobile and
    reduced-motion, where the smoother never activates).
  - scroll-driven effects should read the SMOOTHED position — exposed on
    window.__SMOOTH_Y and consumed via getScrollY() in scrollfx.

  Coordination happens through a window-level promise so page-level
  components (whose effects run before the layout's) can await the
  smoother instance; it resolves null when smoothing is disabled.
*/

const mm = q =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia(q).matches

const smoothingDisabled = () =>
  mm("(prefers-reduced-motion: reduce)") || mm("(max-width: 850px)")

export const smootherPromise = () => {
  if (typeof window === "undefined") return Promise.resolve(null)
  if (!window.__SMOOTHER_PROMISE) {
    let resolve
    window.__SMOOTHER_PROMISE = new Promise(r => {
      resolve = r
    })
    window.__SMOOTHER_RESOLVE = resolve
  }
  return window.__SMOOTHER_PROMISE
}

export const SmoothScroll = ({ children }) => {
  const wrapRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    smootherPromise()
    const resolveWith = inst =>
      window.__SMOOTHER_RESOLVE && window.__SMOOTHER_RESOLVE(inst)

    if (smoothingDisabled()) {
      resolveWith(null)
      return () => {
        delete window.__SMOOTHER_PROMISE
        delete window.__SMOOTHER_RESOLVE
      }
    }

    const html = document.documentElement
    const prevBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = "auto"

    let smoother = null
    let killed = false

    Promise.all([
      import("gsap/dist/gsap"),
      import("gsap/dist/ScrollTrigger"),
      import("gsap/dist/ScrollSmoother"),
    ])
      .then(([g, st, ss]) => {
        if (killed) {
          resolveWith(null)
          return
        }
        const gsap = g.gsap || g.default
        const ScrollTrigger = st.ScrollTrigger || st.default
        const ScrollSmoother = ss.ScrollSmoother || ss.default
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
        /* [data-pin-smooth] elements are counter-translated by the
           smoothed scroll — the content moves -y, they move +y, so they
           stay visually pinned (the sticky-hero wipe). */
        const pinEls = Array.from(
          contentRef.current.querySelectorAll("[data-pin-smooth]")
        )
        const applyPins = y => {
          for (let i = 0; i < pinEls.length; i++) {
            pinEls[i].style.transform = `translate3d(0, ${y}px, 0)`
          }
        }
        smoother = ScrollSmoother.create({
          wrapper: wrapRef.current,
          content: contentRef.current,
          smooth: 1.1,
          effects: false,
          onUpdate: self => {
            const y = self.scrollTop()
            window.__SMOOTH_Y = y
            applyPins(y)
          },
        })
        window.__SMOOTH_Y = smoother.scrollTop()
        applyPins(window.__SMOOTH_Y)
        resolveWith(smoother)
      })
      .catch(() => resolveWith(null))

    return () => {
      killed = true
      if (smoother) smoother.kill()
      html.style.scrollBehavior = prevBehavior
      delete window.__SMOOTH_Y
      delete window.__SMOOTHER_PROMISE
      delete window.__SMOOTHER_RESOLVE
    }
  }, [])

  return (
    <div ref={wrapRef} className="smooth-wrap">
      <div ref={contentRef}>{children}</div>
    </div>
  )
}

/*
  The hero pin: give the element data-pin-smooth — SmoothScroll
  counter-translates it against the smoothed scroll (its position:
  sticky still covers mobile and reduced-motion, where the smoother
  never activates).
*/
