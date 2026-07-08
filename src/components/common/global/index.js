import { createGlobalStyle } from "styled-components"
import v from "../../../data/variables"
import "./fonts.css"

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --text-hero: clamp(2.75rem, 8.5vw, 6.75rem);
    --text-title: clamp(1.6rem, 3.4vw, 2.9rem);
    --text-section: clamp(1.5rem, 2.6vw, 2.25rem);
    --text-body: 1.0625rem;
    --text-mono: 0.8125rem;
    --text-mono-s: 0.6875rem;
    --track-wide: 0.32em;
    --track-mid: 0.18em;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  }

  html {
    color-scheme: dark;
    background: ${v.ground};
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    /* clip, not hidden: hidden creates a scroll container and kills
       position: sticky (the mobile hero wipe and reel pins) */
    overflow-x: hidden;
    overflow-x: clip;
  }

  /* CRT refresh band rolling down the screen */
  html::after {
    content: "";
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 18vh;
    z-index: 76;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(237, 238, 243, 0),
      rgba(237, 238, 243, 0.028) 50%,
      rgba(237, 238, 243, 0)
    );
    animation: crtRoll 11s linear infinite;
  }

  body {
    margin: 0;
    overflow-x: hidden;
    overflow-x: clip;
    background-color: ${v.ground};
    background-image: radial-gradient(
      rgba(237, 238, 243, 0.05) 1px,
      transparent 1px
    );
    background-size: 56px 56px;
    color: ${v.text};
    font-family: ${v.fontBody};
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body.modal-open {
    overflow: hidden;
  }

  /* persistent TV grain — the noise texture itself is set inline by
     AnalogTV (data-URIs must stay out of this stylesheet: one mangled
     rule aborts styled-components' runtime injection of everything
     after it — see the doubled-text incident) */
  .crt-grain {
    position: fixed;
    inset: -80px;
    z-index: 74;
    pointer-events: none;
    opacity: 0.085;
    background-size: 260px 260px;
    animation: grainCrawl 0.7s steps(1) infinite;
  }

  @keyframes grainCrawl {
    0% { transform: translate(0, 0); }
    14% { transform: translate(-34px, 18px); }
    28% { transform: translate(22px, -42px); }
    42% { transform: translate(-48px, -12px); }
    56% { transform: translate(30px, 36px); }
    70% { transform: translate(-14px, 48px); }
    84% { transform: translate(44px, -24px); }
    100% { transform: translate(0, 0); }
  }

  /* CRT glass — scanlines and a corner vignette over everything */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 75;
    pointer-events: none;
    background-image: repeating-linear-gradient(
        0deg,
        rgba(2, 2, 4, 0.06) 0px,
        rgba(2, 2, 4, 0.06) 1px,
        transparent 1px,
        transparent 3px
      ),
      radial-gradient(
        ellipse at center,
        transparent 62%,
        rgba(2, 2, 4, 0.22) 100%
      );
  }

  main {
    display: block;
  }

  h1, h2, h3, h4, h5, h6, p, figure {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    background-color: transparent;
  }

  img, svg, video, canvas {
    max-width: 100%;
    display: block;
  }

  button {
    font: inherit;
    color: inherit;
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
  }

  b, strong {
    font-weight: normal;
    font-family: ${v.fontDisplay};
  }

  ::selection {
    background: ${v.crimson};
    color: ${v.inverse};
  }

  :focus {
    outline: none;
  }
  :focus-visible {
    outline: 1px solid ${v.signal};
    outline-offset: 3px;
  }

  /* firefox + webkit scrollbars, tuned to the ink family */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${v.darkGrey} transparent;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${v.darkGrey};
    border: 3px solid ${v.ground};
  }
  ::-webkit-scrollbar-track {
    background: ${v.ground};
  }

  .jp {
    font-family: ${v.fontJa};
    font-weight: 500;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  /* ------------------------------------------------------------------
     scroll reveal machinery — <Reveal/> toggles .is-in
     variants: up (default) · clip (wipe from left) · stamp (hanko hit)
  ------------------------------------------------------------------ */
  [data-reveal="up"] {
    opacity: 0;
    transform: translateY(18px);
    transition:
      opacity 0.9s ease var(--reveal-delay, 0ms),
      transform 0.9s var(--ease-out) var(--reveal-delay, 0ms);
    will-change: opacity, transform;
  }
  [data-reveal="up"].is-in {
    opacity: 1;
    transform: none;
  }

  [data-reveal="clip"] {
    clip-path: inset(0 100% 0 0);
    transition: clip-path 1.1s var(--ease-out) var(--reveal-delay, 0ms);
    will-change: clip-path;
  }
  [data-reveal="clip"].is-in {
    clip-path: inset(0 0 0 0);
  }

  [data-reveal="stamp"] {
    opacity: 0;
    transform: scale(1.8) rotate(-16deg);
    transition:
      opacity 0.16s ease-out var(--reveal-delay, 0ms),
      transform 0.34s cubic-bezier(0.34, 1.56, 0.64, 1) var(--reveal-delay, 0ms);
    will-change: opacity, transform;
  }
  [data-reveal="stamp"].is-in {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  /* ------------------------------------------------------------------
     analog TV — the page renders through warped tube glass, and the
     signal occasionally loses lock (html.glitching, see AnalogTV)
  ------------------------------------------------------------------ */
  html.crt-on .smooth-wrap {
    filter: url(#crt-warp);
    will-change: filter;
  }
  html.glitching .smooth-wrap {
    animation: glitchJitter 0.24s steps(3) 1;
  }
  html.crt-on.glitching .smooth-wrap {
    filter: url(#crt-warp) saturate(1.35) contrast(1.12);
  }

  @keyframes glitchJitter {
    0% { transform: translate(-6px, 1px) skewX(-1.2deg); }
    33% { transform: translate(5px, -2px); }
    66% { transform: translate(-3px, 1px) skewX(0.8deg); }
    100% { transform: none; }
  }

  .crt-glitch-overlay {
    position: fixed;
    inset: 0;
    z-index: 77;
    pointer-events: none;
    opacity: 0;
  }
  html.glitching .crt-glitch-overlay {
    opacity: 1;
  }

  .crt-glitch-overlay .tear {
    position: absolute;
    left: -5%;
    right: -5%;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(225, 49, 72, 0.85) 30%,
      rgba(237, 238, 243, 0.9) 55%,
      transparent
    );
    mix-blend-mode: screen;
    animation: tearShift 0.12s steps(3) infinite;
  }
  .crt-glitch-overlay .t1 {
    top: var(--tear1, 30%);
  }
  .crt-glitch-overlay .t2 {
    top: var(--tear2, 64%);
    height: 2px;
    animation-direction: reverse;
  }

  @keyframes tearShift {
    0% { transform: translateX(-14px); }
    50% { transform: translateX(10px); }
    100% { transform: translateX(-5px); }
  }

  .crt-glitch-overlay .noise {
    position: absolute;
    inset: 0;
    opacity: 0.13;
    animation: noiseJump 0.09s steps(2) infinite;
  }

  @keyframes noiseJump {
    0% { background-position: 0 0; }
    100% { background-position: 130px 90px; }
  }

  /* true-fullscreen reels: the HUD frame yields the stage */
  .hud-frame {
    transition: opacity 0.45s ease;
  }
  body.reel-active .hud-frame {
    opacity: 0;
  }
  body.reel-active .hud-frame,
  body.reel-active .hud-frame * {
    pointer-events: none !important;
  }

  /* clip wipe driven by the nearest revealed ancestor */
  .clip-on-reveal {
    clip-path: inset(0 100% 0 0);
    transition: clip-path 1.1s var(--ease-out) 0.18s;
    will-change: clip-path;
  }
  [data-reveal].is-in .clip-on-reveal {
    clip-path: inset(0 0 0 0);
  }

  /* ------------------------------------------------------------------
     shared keyframes
  ------------------------------------------------------------------ */
  @keyframes blink {
    0%, 54% { opacity: 1; }
    55%, 100% { opacity: 0; }
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 ${v.signalGlow}; }
    70% { box-shadow: 0 0 0 7px rgba(225, 49, 72, 0); }
    100% { box-shadow: 0 0 0 0 rgba(225, 49, 72, 0); }
  }
  @keyframes scanSweep {
    0% { transform: translateY(-102%); }
    100% { transform: translateY(102%); }
  }
  @keyframes glitchShift {
    0%, 86%, 100% { transform: none; opacity: 1; text-shadow: none; }
    87% {
      transform: translate(-3px, 1px) skewX(-4deg);
      opacity: 0.85;
      text-shadow: 3px 0 ${v.signal}, -3px 0 rgba(237, 238, 243, 0.7);
    }
    89% {
      transform: translate(3px, -1px);
      text-shadow: -2px 0 ${v.signal}, 2px 0 rgba(237, 238, 243, 0.6);
    }
    91% {
      transform: translate(-2px, 2px) skewX(3deg);
      opacity: 0.9;
      text-shadow: 2px 0 ${v.signal}, -2px 0 rgba(237, 238, 243, 0.5);
    }
    93% { transform: none; text-shadow: none; }
  }
  @keyframes rgbSplit {
    0% {
      text-shadow: -3px 0 ${v.signal}, 3px 0 rgba(237, 238, 243, 0.65);
      transform: translateX(2px);
    }
    35% {
      text-shadow: 2px 0 ${v.signal}, -2px 0 rgba(237, 238, 243, 0.5);
      transform: translateX(-1px);
    }
    70% {
      text-shadow: -1px 0 ${v.signal}, 1px 0 rgba(237, 238, 243, 0.35);
      transform: none;
    }
    100% {
      text-shadow: none;
      transform: none;
    }
  }
  @keyframes crtRoll {
    from { transform: translateY(-20vh); }
    to { transform: translateY(120vh); }
  }

  /* ------------------------------------------------------------------
     prism — monochrome + crimson, matches the HUD
  ------------------------------------------------------------------ */
  .gatsby-highlight {
    margin: 2rem 0;
  }
  .gatsby-highlight pre[class*="language-"] {
    background: ${v.panel};
    border: 1px solid ${v.line};
    padding: 1.25rem 1.5rem;
    overflow: auto;
    font-family: ${v.fontMono};
    font-size: 0.875rem;
    line-height: 1.7;
    color: ${v.text};
  }
  code[class*="language-"], pre[class*="language-"] {
    font-family: ${v.fontMono};
    text-shadow: none;
    color: ${v.text};
  }
  :not(pre) > code {
    font-family: ${v.fontMono};
    font-size: 0.85em;
    background: ${v.panel};
    border: 1px solid ${v.lineFaint};
    padding: 0.15em 0.45em;
    color: ${v.text};
  }
  .token.comment, .token.prolog, .token.doctype, .token.cdata {
    color: ${v.faint};
  }
  .token.punctuation, .token.operator {
    color: ${v.dim};
  }
  .token.keyword, .token.tag, .token.important, .token.deleted {
    color: ${v.signal};
  }
  .token.selector, .token.attr-name, .token.builtin, .token.boolean, .token.number {
    color: #d98a95;
  }
  .token.string, .token.char, .token.attr-value, .token.inserted {
    color: #b9bbc9;
  }
  .token.function, .token.class-name, .token.property {
    color: ${v.text};
  }

  /* ------------------------------------------------------------------
     reduced motion — content always visible, nothing moves
  ------------------------------------------------------------------ */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    [data-reveal],
    [data-reveal="clip"],
    .clip-on-reveal {
      opacity: 1;
      transform: none;
      clip-path: none;
      transition: none;
    }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`
