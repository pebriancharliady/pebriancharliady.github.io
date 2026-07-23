import styled from "styled-components"
import v from "../../../data/variables"

export const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  /* a full screen minus the sticky offset under the HUD bar — the hero
     owns the entire first viewport (see StickyHero's top) */
  min-height: calc(100vh - ${v.frameInset} - 52px);
  padding-top: clamp(2.5rem, 6vh, 4rem);
  padding-bottom: clamp(1.5rem, 4vh, 2.5rem);

  /* the MRZ band rides the bottom edge of the viewport */
  > *:last-child {
    margin-top: auto;
  }

  /* the wireframe cube drifting behind the copy */
  .cube {
    position: absolute;
    top: -2%;
    left: -8%;
    width: min(620px, 52vw);
    height: min(620px, 52vw);
    z-index: 0;
    pointer-events: none;
  }

  @media (max-width: ${v.breakpointTablet}) {
    min-height: 0;

    .cube {
      width: 78vw;
      height: 78vw;
      left: -18%;
    }
  }
`

/* portrait anchored to the top-right; the name runs over it */
export const PortraitZone = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: min(430px, 42%);
  z-index: 1;
  transform: translateY(calc(var(--hero-exit, 0) * 68px));
  opacity: calc(1 - var(--hero-exit, 0) * 0.45);

  @media (max-width: ${v.breakpointTablet}) {
    position: static;
    width: min(420px, 88%);
    margin: 2.5rem 0 0;
  }
`

/* hero layers peel apart as the title card slides over (--hero-exit).
   pointer-events pass through so the portrait's tilt can feel the
   cursor where the name overlaps it (no interactive children here) */
export const HeroCopy = styled.div`
  position: relative;
  z-index: 2;
  pointer-events: none;
  transform: translateY(calc(var(--hero-exit, 0) * -48px));
  opacity: calc(1 - var(--hero-exit, 0) * 0.6);
`

export const HeroName = styled.h1`
  margin: clamp(1.25rem, 4vh, 2.5rem) 0 0;
  /* the name is the one place the dossier voice breaks — a signature */
  font-family: "Extros Backstage", ${v.fontDisplay};
  font-weight: normal;
  font-size: clamp(2.6rem, 8.5vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.005em;
  text-transform: uppercase;
  color: ${v.text};

  .l1,
  .l2 {
    display: block;
  }

  .l2 {
    margin-left: clamp(1.25rem, 10.5vw, 9rem);
  }

  @media (max-width: ${v.breakpointTablet}) {
    font-size: clamp(2.4rem, 10vw, 4.25rem);

    .l2 {
      margin-left: clamp(1rem, 6vw, 3rem);
    }
  }
`

/* the censored bio — bars of redacted text, then the standard notice */
export const Redaction = styled.div`
  margin-top: clamp(1.75rem, 4vh, 2.5rem);
  max-width: min(31em, 55%);

  .bar {
    display: block;
    height: 0.85em;
    background: ${v.darkGrey};
    opacity: 0.5;
    margin-bottom: 0.55em;
  }

  .bar-1 {
    width: 76%;
  }

  .bar-2 {
    width: 52%;
  }

  .note {
    display: inline-flex;
    align-items: baseline;
    gap: 0.7em;
    margin-top: 0.9em;
    font-family: ${v.fontMono};
    font-size: var(--text-mono);
    letter-spacing: var(--track-mid);
    text-transform: uppercase;
    color: ${v.dim};
    white-space: nowrap;

    &::before {
      content: "[";
      color: ${v.signal};
    }

    &::after {
      content: "]";
      color: ${v.signal};
    }
  }

  @media (max-width: ${v.breakpointTablet}) {
    max-width: 34em;
  }

  @media (max-width: ${v.breakpointPhone}) {
    .note {
      font-size: 0.6rem;
      letter-spacing: 0.07em;
      gap: 0.45em;
    }
  }
`

export const ScanPortrait = styled.div`
  position: relative;
  /* the portrait is a floating 3D plane (see useTilt) */
  perspective: 900px;

  /* static orbit is the mobile fallback — desktop gets the voyager */
  .orbit {
    display: none;
    position: absolute;
    top: -18%;
    right: -16%;
    width: min(320px, 64vw);
    height: min(320px, 64vw);
    z-index: 0;
    pointer-events: none;
  }

  @media (max-width: ${v.breakpointPhone}) {
    .orbit {
      display: block;
    }
  }

  .portrait {
    position: relative;
    z-index: 1;
    height: 0;
    padding-bottom: 133%;
    border: 1px solid ${v.line};
    background: ${v.panel};
    overflow: hidden;

    .gatsby-image-wrapper {
      position: absolute !important;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    img {
      filter: saturate(0.85) contrast(1.06);
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      box-shadow: inset 0 0 70px rgba(5, 5, 7, 0.55);
      pointer-events: none;
    }
  }

  .scan {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 36%;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(225, 49, 72, 0),
      rgba(225, 49, 72, 0.12) 42%,
      rgba(225, 49, 72, 0.34) 50%,
      rgba(225, 49, 72, 0) 100%
    );
    animation: scanSweep 1.7s var(--ease-out) 1s 1 both;
  }

  /* corner brackets */
  .bk {
    position: absolute;
    width: 19px;
    height: 19px;
    z-index: 3;
    border-color: ${v.signal};
    border-style: solid;
    border-width: 0;
  }
  .bk-tl {
    top: -1px;
    left: -1px;
    border-top-width: 1px;
    border-left-width: 1px;
  }
  .bk-tr {
    top: -1px;
    right: -1px;
    border-top-width: 1px;
    border-right-width: 1px;
  }
  .bk-bl {
    bottom: -1px;
    left: -1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
  }
  .bk-br {
    bottom: -1px;
    right: -1px;
    border-bottom-width: 1px;
    border-right-width: 1px;
  }

  /* subject tag pinned to the portrait frame */
  .subject-id {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.45rem 0.8rem;
    background: rgba(5, 5, 7, 0.82);
    border-bottom: 1px solid ${v.lineFaint};
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${v.dim};

    .id-code {
      color: ${v.signal};
    }
  }
`

/* ------------------------------------------------------------------
   machine-readable zone — the recruitment data as a document band
------------------------------------------------------------------ */
export const Mrz = styled.dl`
  display: grid;
  grid-template-columns: 1.3fr 1.1fr 1.5fr auto;
  margin: clamp(3rem, 8vh, 5rem) 0 0;
  border-top: 1px solid ${v.line};
  border-bottom: 1px solid ${v.line};
  position: relative;
  z-index: 2;
  background: rgba(5, 5, 7, 0.55);

  /* the blur is desktop garnish — backdrop-filter is one of the most
     expensive things a weak phone GPU can composite */
  @media (min-width: 851px) {
    backdrop-filter: blur(10px);
  }
  transform: translateY(calc(var(--hero-exit, 0) * 34px));
  opacity: calc(1 - var(--hero-exit, 0) * 0.85);

  > div {
    padding: 0.95rem 1.2rem 1.05rem;
    border-left: 1px solid ${v.lineFaint};
    min-width: 0;

    &:first-child {
      border-left: 0;
      padding-left: 0;
    }
  }

  dt {
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: var(--track-mid);
    text-transform: uppercase;
    color: ${v.faint};
  }

  dd {
    margin: 0.5rem 0 0;
    font-family: ${v.fontMono};
    font-size: var(--text-mono);
    letter-spacing: 0.06em;
    color: ${v.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status dd {
    display: inline-flex;
    align-items: center;
    gap: 0.6em;
    color: ${v.signal};
    overflow: visible;
  }

  .dot {
    flex: none;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${v.signal};
    animation: pulse 2.4s ease-out infinite;
  }

  @media (max-width: ${v.breakpointTablet}) {
    grid-template-columns: 1fr 1fr;
    border: 1px solid ${v.lineFaint};

    > div {
      border-top: 1px solid ${v.lineFaint};
      padding: 0.8rem 1rem 0.9rem;

      &:first-child {
        padding-left: 1rem;
      }
      &:nth-child(-n + 2) {
        border-top: 0;
      }
      &:nth-child(odd) {
        border-left: 0;
      }
    }

    dd {
      white-space: normal;
    }
  }
`
