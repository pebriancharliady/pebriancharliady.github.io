import styled from "styled-components"
import { Link } from "gatsby"
import v from "../../data/variables"
import { Wrap } from "../common"

/* Wrap that sits above the kanji watermarks */
export const SectionInner = styled(Wrap)`
  position: relative;
  z-index: 1;
`

/* ------------------------------------------------------------------
   selected work — case-file rows
------------------------------------------------------------------ */
export const WorkList = styled.div`
  border-top: 1px solid ${v.line};
`

export const WorkRow = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr) minmax(260px, 40%);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
  padding: clamp(1.75rem, 4vh, 2.75rem) 0;
  border-bottom: 1px solid ${v.line};
  color: inherit;

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${v.faint};

    .code {
      color: ${v.signal};
      font-weight: 600;
    }
  }

  .title {
    display: flex;
    align-items: baseline;
    gap: 0.6em;
    font-family: ${v.fontDisplay};
    font-weight: normal;
    font-size: var(--text-title);
    line-height: 1;
    text-transform: uppercase;
    color: ${v.text};
    transition: color 0.25s ease;

    .arrow {
      font-family: ${v.fontMono};
      font-size: 0.6em;
      color: ${v.signal};
      opacity: 0;
      transform: translateX(-6px);
      transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
    }
  }

  .desc {
    margin-top: 0.9rem;
    max-width: 46ch;
    font-size: 0.975rem;
    line-height: 1.75;
    color: ${v.dim};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .chips {
    margin-top: 1.15rem;
  }

  .media {
    position: relative;
    overflow: hidden;
    border: 1px solid ${v.lineFaint};
    background: ${v.panel};

    .gatsby-image-wrapper {
      filter: grayscale(1) contrast(1.08) brightness(0.95);
      transform: scale(1.01);
      transition: filter 0.5s ease, transform 1.2s var(--ease-out);
    }

    /* crimson-multiply duotone that lifts on hover */
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

    /* scanline sweep, fired on row hover */
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

  &:hover,
  &:focus-visible {
    .title {
      color: ${v.signal};
    }
    .arrow {
      opacity: 1;
      transform: translateX(0);
    }
    .media::after {
      opacity: 0;
    }
    .media::before {
      animation: scanSweep 0.85s ease-out 1;
    }
    .media .gatsby-image-wrapper {
      filter: none;
      transform: scale(1.04);
    }
  }

  @media (max-width: ${v.breakpointPhone}) {
    grid-template-columns: 1fr;
    gap: 1.1rem;

    .meta {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1.1rem;
    }

    .media {
      margin-top: 0.5rem;
    }
  }
`

export const SectionFoot = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: clamp(2rem, 5vh, 3rem);
`

/* ------------------------------------------------------------------
   capabilities
------------------------------------------------------------------ */
export const CapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  > div {
    padding: 0.25rem 2.25rem;
    border-left: 1px solid ${v.line};

    &:first-child {
      padding-left: 0;
      border-left: 0;
    }
  }

  .kanji {
    display: block;
    font-family: ${v.fontJa};
    font-size: 3.4rem;
    line-height: 1;
    color: rgba(237, 238, 243, 0.02);
    -webkit-text-stroke: 1px rgba(225, 49, 72, 0.55);
  }

  h3 {
    margin-top: 1.4rem;
    font-family: ${v.fontDisplay};
    font-weight: normal;
    font-size: 1.05rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: ${v.text};
  }

  p {
    margin-top: 0.85rem;
    font-size: 0.95rem;
    line-height: 1.75;
    color: ${v.dim};
  }

  .stack {
    margin-top: 1.3rem;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${v.faint};
  }

  @media (max-width: ${v.breakpointPhone}) {
    grid-template-columns: 1fr;

    > div {
      padding: 1.75rem 0;
      border-left: 0;
      border-top: 1px solid ${v.line};

      &:first-child {
        padding-top: 0.25rem;
        border-top: 0;
      }
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
