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

export const SectionFoot = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: clamp(2rem, 5vh, 3rem);
`

/* ------------------------------------------------------------------
   capabilities — spec sheet rows, not marketing columns
------------------------------------------------------------------ */
export const SpecList = styled.div`
  border-top: 1px solid ${v.line};
`

export const SpecRow = styled.div`
  display: grid;
  grid-template-areas: "k t d s";
  grid-template-columns: 64px minmax(180px, 240px) minmax(0, 1fr) minmax(
      170px,
      220px
    );
  gap: clamp(1.25rem, 3vw, 2.75rem);
  align-items: start;
  padding: 1.7rem 0;
  border-bottom: 1px solid ${v.lineFaint};

  .kanji {
    grid-area: k;
    font-family: ${v.fontJa};
    font-size: 2.7rem;
    line-height: 1;
    color: rgba(237, 238, 243, 0.02);
    -webkit-text-stroke: 1px rgba(225, 49, 72, 0.55);
  }

  h3 {
    grid-area: t;
    padding-top: 0.4rem;
    font-family: ${v.fontDisplay};
    font-weight: normal;
    font-size: 1.02rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: ${v.text};
  }

  p {
    grid-area: d;
    margin: 0;
    padding-top: 0.35rem;
    max-width: 52ch;
    font-size: 0.95rem;
    line-height: 1.75;
    color: ${v.dim};
  }

  .stack {
    grid-area: s;
    padding-top: 0.45rem;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${v.faint};
    text-align: right;
  }

  @media (max-width: ${v.breakpointPhone}) {
    grid-template-areas:
      "k t"
      "d d"
      "s s";
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 0.9rem 1.1rem;

    .stack {
      text-align: left;
      padding-top: 0;
    }

    p {
      padding-top: 0;
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
