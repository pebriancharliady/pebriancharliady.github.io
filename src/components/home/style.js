import styled from "styled-components"
import { Link } from "gatsby"
import v from "../../data/variables"
import { Wrap } from "../common"
import { Ticker } from "../fx"

/* Wrap that sits above the kanji watermarks */
export const SectionInner = styled(Wrap)`
  position: relative;
  z-index: 1;
`

/* the hero pins here while the paper slab slides over it */
export const StickyHero = styled.div`
  position: sticky;
  top: calc(${v.frameInset} + 52px);
  z-index: 0;

  @media (max-width: ${v.breakpointPhone}) {
    top: calc(${v.frameInsetMobile} + 48px);
  }
`

/* everything after the hero scrolls over it on an opaque ground */
export const PageBody = styled.div`
  position: relative;
  z-index: 1;
  background-color: ${v.ground};
  background-image: radial-gradient(
    rgba(237, 238, 243, 0.05) 1px,
    transparent 1px
  );
  background-size: 56px 56px;
`

export const SlabTicker = styled(Ticker)`
  position: absolute;
  top: 3.9rem;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${v.lineInkFaint};

  @media (max-width: ${v.breakpointPhone}) {
    top: 2.2rem;
  }
`

export const EndTicker = styled(Ticker)`
  border-top: 1px solid ${v.lineFaint};
  border-bottom: 1px solid ${v.lineFaint};
  margin-top: clamp(2rem, 6vh, 4rem);
`

export const HankoSpot = styled.div`
  position: absolute;
  top: clamp(4.5rem, 10vh, 6.5rem);
  right: calc(${v.gutter} + 1.5rem);
  z-index: 2;

  @media (max-width: ${v.breakpointPhone}) {
    top: 3.2rem;
    right: 1.25rem;
  }
`

/* ------------------------------------------------------------------
   episode title card — hard black cut in the wipe sequence
------------------------------------------------------------------ */
export const EvaCardRoot = styled.section`
  position: relative;
  z-index: 2; /* rides over pinned reels/hero during the wipe */
  min-height: 88vh;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: radial-gradient(
      ellipse at center,
      rgba(237, 238, 243, 0.025),
      transparent 62%
    ),
    #020203;

  .ep {
    position: absolute;
    top: -3.4rem;
    left: -0.5rem;
    font-family: ${v.fontJa};
    font-size: clamp(1.05rem, 2.2vw, 1.75rem);
    font-weight: 600;
    letter-spacing: 0.55em;
    color: ${v.text};
  }

  .big {
    margin: 0;
    font-family: ${v.fontJa};
    font-weight: 800;
    font-size: clamp(4.5rem, 19vw, 15rem);
    line-height: 1;
    letter-spacing: 0.02em;
    color: ${v.inverse};
  }

  .sub {
    position: absolute;
    bottom: -2.8rem;
    right: 0;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    font-weight: 500;
    letter-spacing: var(--track-wide);
    text-transform: uppercase;
    color: ${v.dim};
  }

  .haz {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

/* ------------------------------------------------------------------
   bioresonance sigil behind the capabilities spec sheet
------------------------------------------------------------------ */
export const SigilSpot = styled.div`
  position: absolute;
  top: 4%;
  left: -5%;
  width: min(320px, 26vw);
  z-index: 0;
  opacity: 0.45;
  pointer-events: none;
  transform: rotate(calc(var(--scroll-y, 0) * 0.03deg));

  svg {
    display: block;
    width: 100%;
    animation: sigilSpin 150s linear infinite;
  }

  @keyframes sigilSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: ${v.breakpointPhone}) {
    width: 74vw;
    opacity: 0.3;
  }
`

export const SectionFoot = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: clamp(2rem, 5vh, 3rem);
`

/* ------------------------------------------------------------------
   [more] featured works — dark 2×2 evidence board
------------------------------------------------------------------ */
export const FeatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: ${v.breakpointPhone}) {
    grid-template-columns: 1fr;
  }
`

export const FeatCard = styled(Link)`
  position: relative;
  display: block;
  border: 1px solid ${v.lineInk};
  background: ${v.paper};
  overflow: hidden;
  color: inherit;

  .img {
    position: relative;
    display: block;
    height: 0;
    padding-bottom: 56%;
    overflow: hidden;

    .gatsby-image-wrapper {
      position: absolute !important;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      filter: grayscale(1) contrast(1.08) brightness(0.95);
      transform: scale(1.01);
      transition: filter 0.5s ease, transform 1.2s var(--ease-out);
    }

    /* crimson print, lifts on hover */
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
      background: ${v.crimson};
      mix-blend-mode: multiply;
      opacity: 1;
      transition: opacity 0.45s ease;
      pointer-events: none;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 32%;
      z-index: 2;
      transform: translateY(-102%);
      background: linear-gradient(
        to bottom,
        rgba(225, 49, 72, 0),
        rgba(225, 49, 72, 0.16) 45%,
        rgba(225, 49, 72, 0.38) 50%,
        rgba(225, 49, 72, 0) 100%
      );
      pointer-events: none;
    }
  }

  .cap {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem 1.1rem;
    border-top: 1px solid ${v.lineInk};

    .t {
      font-family: ${v.fontDisplay};
      font-weight: normal;
      font-size: 1.02rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: ${v.ink};
      transition: color 0.2s ease;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .a {
      flex: none;
      font-family: ${v.fontMono};
      color: ${v.signalDeep};
      opacity: 0;
      transform: translateX(-6px);
      transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
    }
  }

  &:hover,
  &:focus-visible {
    .t {
      color: ${v.crimson};
    }
    .a {
      opacity: 1;
      transform: translateX(0);
    }
    .img::before {
      animation: scanSweep 0.85s ease-out 1;
    }
    .img::after {
      opacity: 0;
    }
    .img .gatsby-image-wrapper {
      filter: none;
      transform: scale(1.04);
    }
  }
`

/* ------------------------------------------------------------------
   field notes — log rows
------------------------------------------------------------------ */
export const NoteList = styled.div`
  border-top: 1px solid ${v.line};
`

export const NoteRow = styled(Link)`
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr) auto;
  gap: 1.25rem;
  align-items: baseline;
  padding: 1.2rem 0;
  border-bottom: 1px solid ${v.lineFaint};
  color: inherit;
  transform: skewY(calc(var(--scroll-skew, 0) * 1deg));

  .date {
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.12em;
    color: ${v.faint};
    transition: color 0.2s ease;
  }

  .title {
    font-family: ${v.fontMedium};
    font-size: 1.15rem;
    line-height: 1.35;
    color: ${v.text};
    transition: color 0.2s ease;
  }

  .meta {
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${v.faint};
    text-align: right;
    white-space: nowrap;
  }

  &:hover,
  &:focus-visible {
    .title,
    .date {
      color: ${v.signal};
    }
  }

  @media (max-width: ${v.breakpointPhone}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.35rem;

    .meta {
      text-align: left;
      white-space: normal;
    }
  }
`
