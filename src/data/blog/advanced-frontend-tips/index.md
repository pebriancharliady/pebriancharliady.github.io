---
title: Advanced frontend tips I wish someone had shown me earlier
date: "2026-06-21T09:00:00.000Z"
image: './cover.png'
imageCredit: https://pebriancharliady.github.io
time: 12
categories: ['frontend', 'javascript', 'css', 'performance']
description: "Seven techniques that separate a page that works from a page that feels engineered: cancelling stale requests, killing layout thrash, content-visibility, :has(), custom properties as a JS→CSS bridge, and more — with code."
---

These aren't framework tricks. They're platform-level techniques that keep paying off no matter what sits on top — the kind of thing that separates "it works" from "it feels engineered." Code included for every one.

## 1. Cancel stale requests with AbortController

The classic bug: the user types "re", then "react", and the response for "re" arrives *last*, overwriting the correct results. Debouncing reduces the odds; it doesn't fix the race. Cancellation does.

```js
function createSearcher() {
  let controller = null

  return async function search(query) {
    // kill the in-flight request before starting a new one
    controller?.abort()
    controller = new AbortController()

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        signal: controller.signal,
      })
      return await res.json()
    } catch (err) {
      if (err.name === 'AbortError') return null // expected, not an error
      throw err
    }
  }
}
```

The same `signal` works almost everywhere now — and passing it to `addEventListener` gives you one-line teardown for a whole group of listeners:

```js
const controller = new AbortController()
window.addEventListener('scroll', onScroll, { signal: controller.signal })
window.addEventListener('resize', onResize, { signal: controller.signal })
el.addEventListener('pointermove', onMove, { signal: controller.signal })

// later: removes all three at once
controller.abort()
```

In React, wire it to effect cleanup and stale `setState` after unmount disappears as a category of bug.

## 2. Stop interleaving DOM reads and writes

Layout thrashing is the most common cause of jank I see in real codebases. Reading layout (`offsetHeight`, `getBoundingClientRect`) after writing styles forces the browser to recalculate layout synchronously — do it in a loop and one frame does the work of fifty.

```js
// BAD: read → write → read → write... forces layout every iteration
items.forEach(el => {
  const h = el.offsetHeight        // read (forces layout)
  el.style.height = h * 1.5 + 'px' // write (invalidates layout)
})

// GOOD: batch all reads, then all writes — one layout pass
const heights = items.map(el => el.offsetHeight)
items.forEach((el, i) => {
  el.style.height = heights[i] * 1.5 + 'px'
})
```

The pattern scales up into FLIP (First, Last, Invert, Play) — how you animate layout changes without animating layout:

```js
function flip(el, mutate) {
  const first = el.getBoundingClientRect() // 1. read
  mutate()                                 // 2. apply the layout change
  const last = el.getBoundingClientRect()  // 3. read once more

  const dx = first.left - last.left
  const dy = first.top - last.top

  // 4. invert with a transform (compositor-only), then release
  el.animate(
    [
      { transform: `translate(${dx}px, ${dy}px)` },
      { transform: 'translate(0, 0)' },
    ],
    { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
  )
}
```

The element *layout-jumps* instantly, but the transform makes it look like it travelled. All the animation happens on `transform`, which never touches layout.

## 3. `content-visibility: auto` for long pages

The browser lays out and paints your entire page, including the 90% below the fold nobody has scrolled to yet. `content-visibility: auto` tells it to skip rendering work for off-screen sections until they approach the viewport:

```css
.article-section {
  content-visibility: auto;
  /* reserve estimated space so the scrollbar doesn't dance */
  contain-intrinsic-size: auto 800px;
}
```

On long, sectioned pages (docs, feeds, portfolios) this routinely cuts initial rendering time dramatically — it's the closest thing CSS has to virtualization, with none of the JS. Two rules of engagement: apply it to *sections*, not tiny elements (the bookkeeping has a cost), and always pair it with `contain-intrinsic-size`, or scroll position jumps as sections render in.

## 4. `:has()` is a state machine, not just a "parent selector"

Everyone learned `:has()` as "finally, a parent selector." Its real power is expressing UI state in CSS that used to require JS classes:

```css
/* form group flags itself when its input is invalid after interaction */
.field:has(input:user-invalid) {
  --field-accent: var(--color-error);
}

/* dim every card except the hovered one — no JS, no re-render */
.grid:has(.card:hover) .card:not(:hover) {
  opacity: 0.55;
  transition: opacity 0.25s;
}

/* layout reacts to content: sidebar present? change the grid */
.layout:has(> .sidebar) {
  grid-template-columns: 280px 1fr;
}
```

Every one of these used to be a `useEffect`, a state flag, and a className ternary. Now it's a selector the browser optimizes for you.

## 5. Custom properties as the JS → CSS bridge

When JavaScript needs to drive visuals continuously — scroll progress, cursor position, audio levels — don't set twenty style properties from JS. Set *one custom property* and let CSS fan it out:

```js
let ticking = false
window.addEventListener('scroll', () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const progress = window.scrollY / (document.body.scrollHeight - innerHeight)
    document.documentElement.style.setProperty('--scroll-p', progress.toFixed(4))
    ticking = false
  })
}, { passive: true })
```

```css
.progress-bar { transform: scaleX(var(--scroll-p, 0)); }
.hero-title   { opacity: calc(1 - var(--scroll-p, 0) * 3); }
.watermark    { translate: 0 calc(var(--scroll-p, 0) * -120px); }
```

One JS write per frame, unlimited consumers, and designers can retune every effect without touching JavaScript. The `requestAnimationFrame` guard matters: it coalesces scroll events (which can fire faster than refresh) into at most one write per frame. This is the architecture behind most "scroll-linked" sites you admire — including this one, where `--scroll-y` on `<html>` drives tickers, skew, and parallax from a single source of truth.

## 6. IntersectionObserver — and its silent nesting trap

`IntersectionObserver` is the right tool for reveal-on-scroll, lazy work, and analytics beacons — it's asynchronous and never forces layout, unlike `getBoundingClientRect` polling:

```js
const io = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-in')
      io.unobserve(entry.target) // reveal once, then stop paying for it
    }
  },
  { rootMargin: '0px 0px -12% 0px' } // fire slightly before fully in view
)

document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))
```

Two hard-won details. First, `rootMargin` is your tuning knob — a negative bottom margin means elements animate as they *enter comfortably*, not while half-clipped at the viewport edge.

Second, the trap: **don't nest observer-driven reveal components.** An inner observer whose element is inside a parent that's still hidden/transformed can compute intersection against geometry that never settles, and it silently never fires. No error, no warning — the inner content just never appears. The robust pattern is one observer on the *parent*, with descendants animating off the parent's revealed class:

```css
.section.is-in .clip-on-reveal {
  clip-path: inset(0 0 0 0);
  transition: clip-path 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(var(--i, 0) * 80ms); /* stagger via custom property */
}
```

One observer, CSS handles the choreography.

## 7. Treat `prefers-reduced-motion` as an architecture, not a media query

If your motion lives in both CSS and JS (it does), gating only the CSS side means reduced-motion users still get JS-driven parallax, smooth-scroll hijacking, and canvas animation — often the *most* nausea-inducing parts. Gate both sides from day one:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```js
const media = window.matchMedia('(prefers-reduced-motion: reduce)')

function setupMotion() {
  if (media.matches) return revealEverythingStatically()
  initScrollEffects()
}

media.addEventListener('change', setupMotion) // users can toggle mid-session
setupMotion()
```

The discipline that makes this cheap: every effect ships with its OFF state at the moment it's written. Retrofitting reduced-motion onto a finished site is archaeology; building it in is two extra lines per effect. As a bonus, the static fallback doubles as your layout-testing mode and your "old device" mode.

## The common thread

Every one of these boils down to the same instinct: **let the browser do what it's ruthlessly optimized to do, and stop interrupting it.** Cancel work that no longer matters, batch what forces synchronization, declare state instead of imperatively syncing it, and render only what's on screen. Frameworks come and go on top of this layer — the layer itself keeps compounding.
