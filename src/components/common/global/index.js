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
    overflow-x: hidden;
  }

  body {
    margin: 0;
    overflow-x: hidden;
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
    0%, 86%, 100% { transform: none; opacity: 1; }
    87% { transform: translate(-3px, 1px) skewX(-4deg); opacity: 0.85; }
    89% { transform: translate(3px, -1px); }
    91% { transform: translate(-2px, 2px) skewX(3deg); opacity: 0.9; }
    93% { transform: none; }
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
