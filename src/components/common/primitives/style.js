import styled, { css } from "styled-components"
import { Link } from "gatsby"
import v from "../../../data/variables"

export const Wrap = styled.div`
  width: 100%;
  max-width: ${v.wrapperWidth};
  margin: 0 auto;
  padding-left: ${v.gutter};
  padding-right: ${v.gutter};
`

export const Section = styled.section`
  position: relative;
  padding: clamp(3.5rem, 9vh, 6.5rem) 0;
`

/* full-canvas wrapper for archive pages — content reaches toward the frame */
export const WideWrap = styled.div`
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;
  padding-left: ${v.gutter};
  padding-right: ${v.gutter};
`

/* ------------------------------------------------------------------
   dossier spread — sticky marginalia spine + asymmetric field
------------------------------------------------------------------ */
export const Spread = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 250px) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;

  @media (max-width: ${v.breakpointTablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 2.25rem;
  }
`

export const Spine = styled.aside`
  position: sticky;
  top: calc(${v.frameInset} + 52px + 28px);

  @media (max-width: ${v.breakpointTablet}) {
    position: static;
    border: 1px solid ${v.lineFaint};
    background: rgba(12, 13, 20, 0.5);
    padding: 1.25rem 1.25rem 1.5rem;
  }
`

export const Field = styled.div`
  min-width: 0;
`

/* one labelled block inside the spine */
export const SpineBlock = styled.div`
  padding: 1.1rem 0;
  border-top: 1px solid ${v.lineFaint};

  &:first-child {
    padding-top: 0;
    border-top: 0;
  }

  .sp-label {
    display: block;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: var(--track-mid);
    text-transform: uppercase;
    color: ${v.faint};
  }

  .sp-value {
    display: block;
    margin-top: 0.5rem;
    font-family: ${v.fontMono};
    font-size: var(--text-mono);
    letter-spacing: 0.06em;
    color: ${v.text};
    overflow-wrap: anywhere;

    a {
      color: ${v.text};
      border-bottom: 1px solid ${v.signal};
      transition: color 0.2s ease;

      &:hover,
      &:focus-visible {
        color: ${v.signal};
      }
    }
  }

  .sp-big {
    font-family: ${v.fontDisplay};
    font-size: 1.6rem;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: ${v.signal};
  }

  .sp-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    margin-top: 0.6rem;

    a {
      font-family: ${v.fontMono};
      font-size: var(--text-mono-s);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${v.dim};
      transition: color 0.2s ease;

      &:hover,
      &:focus-visible {
        color: ${v.signal};
      }
    }
  }
`

export const HairRule = styled.hr`
  border: 0;
  border-top: 1px solid ${v.line};
  margin: 0;
`

/* [ ▪ 作品 / SELECTED WORK ] — the recurring bilingual label */
export const EyebrowRoot = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.8em;
  font-family: ${v.fontMono};
  font-size: var(--text-mono-s);
  font-weight: 500;
  letter-spacing: var(--track-wide);
  text-transform: uppercase;
  color: ${v.dim};

  &::before {
    content: "";
    align-self: center;
    flex: none;
    width: 8px;
    height: 8px;
    background: ${v.crimson};
  }

  .jp {
    font-family: ${v.fontJa};
    font-size: 1.1em;
    letter-spacing: 0.25em;
    color: ${v.text};
  }

  .sep {
    color: ${v.faint};
    letter-spacing: 0;
  }

  ${p =>
    p.$paper &&
    css`
      color: ${v.inkDim};

      .jp {
        color: ${v.ink};
      }

      .sep {
        color: ${v.inkFaint};
      }
    `}
`

export const SectionHeadRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid ${v.line};
  margin-bottom: clamp(2rem, 5vh, 3.25rem);

  .aside {
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: var(--track-mid);
    text-transform: uppercase;
    color: ${v.faint};
    text-align: right;
  }

  ${p =>
    p.$paper &&
    css`
      border-bottom-color: ${v.lineInk};

      .aside {
        color: ${v.inkFaint};
      }
    `}
`

export const DisplayTitle = styled.h2`
  font-family: ${v.fontDisplay};
  font-weight: normal;
  font-size: var(--text-section);
  line-height: 1.02;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: ${v.text};
`

export const Lede = styled.p`
  font-size: var(--text-body);
  line-height: 1.85;
  color: ${v.dim};
  max-width: 38em;

  b,
  strong {
    color: ${v.text};
  }

  a {
    color: ${v.text};
    border-bottom: 1px solid ${v.signal};
    transition: color 0.2s ease;
    &:hover {
      color: ${v.signal};
    }
  }
`

export const Chip = styled.span`
  display: inline-block;
  font-family: ${v.fontMono};
  font-size: var(--text-mono-s);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${v.dim};
  border: 1px solid ${v.lineFaint};
  padding: 0.35em 0.75em;
  white-space: nowrap;
  transition: color 0.2s ease, border-color 0.2s ease;
`

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  gap: 0.9em;
  font-family: ${v.fontMono};
  font-size: var(--text-mono);
  font-weight: 500;
  letter-spacing: var(--track-mid);
  text-transform: uppercase;
  color: ${v.text};
  border: 1px solid ${v.line};
  padding: 1em 1.5em;
  cursor: pointer;
  transition: border-color 0.25s ease, color 0.25s ease,
    background-color 0.25s ease;

  &::before {
    content: "[";
    color: ${v.signal};
    transition: transform 0.3s var(--ease-out);
  }
  &::after {
    content: "]";
    color: ${v.signal};
    transition: transform 0.3s var(--ease-out);
  }

  &:hover,
  &:focus-visible {
    border-color: ${v.signal};
    background: rgba(127, 19, 36, 0.22);
    color: ${v.inverse};

    &::before {
      transform: translateX(-3px);
    }
    &::after {
      transform: translateX(3px);
    }
  }

  ${p =>
    p.$paper &&
    css`
      color: ${v.ink};
      border-color: ${v.lineInk};

      &::before,
      &::after {
        color: ${v.signalDeep};
      }

      &:hover,
      &:focus-visible {
        border-color: ${v.signalDeep};
        background: rgba(127, 19, 36, 0.08);
        color: ${v.crimson};
      }
    `}
`

export const ButtonLink = styled(Link)`
  ${buttonBase}
`

export const ButtonA = styled.a`
  ${buttonBase}
`

export const MonoLink = styled.a`
  display: inline-flex;
  align-items: baseline;
  gap: 0.5em;
  font-family: ${v.fontMono};
  font-size: var(--text-mono);
  letter-spacing: var(--track-mid);
  text-transform: uppercase;
  color: ${v.dim};
  transition: color 0.2s ease;

  .arrow {
    color: ${v.signal};
    display: inline-block;
    transition: transform 0.25s var(--ease-out);
  }

  &:hover,
  &:focus-visible {
    color: ${v.text};

    .arrow {
      transform: translate(2px, -2px);
    }
  }
`

export const PageHeadRoot = styled.header`
  padding: clamp(1.5rem, 5vh, 3.5rem) 0 clamp(2rem, 5vh, 3rem);

  .pg-title {
    margin: 1.1rem 0 0;
    font-family: ${v.fontDisplay};
    font-weight: normal;
    font-size: clamp(2.4rem, 6vw, 4.6rem);
    line-height: 0.95;
    letter-spacing: 0;
    text-transform: uppercase;
    color: ${v.text};
    overflow-wrap: anywhere;

    .outline {
      color: transparent;
      -webkit-text-stroke: 1.5px ${v.text};
    }
  }

  .pg-aside {
    margin-top: 1.1rem;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: var(--track-mid);
    text-transform: uppercase;
    color: ${v.faint};
  }

  .pg-lede {
    margin-top: 1.4rem;
  }
`

/* outlined kanji watermark — wireframe ideograms */
export const KanjiMark = styled.span`
  position: absolute;
  z-index: 0;
  writing-mode: vertical-rl;
  font-family: ${v.fontJa};
  font-size: clamp(9rem, 20vw, 17rem);
  line-height: 1;
  color: rgba(237, 238, 243, 0.03);
  -webkit-text-stroke: 1px rgba(237, 238, 243, 0.08);
  user-select: none;
  pointer-events: none;

  /* let a Parallax wrapper carry the absolute placement */
  ${p =>
    p.$flow &&
    css`
      position: static;
      display: block;
    `}

  ${p =>
    p.$paper &&
    css`
      color: rgba(16, 17, 24, 0.02);
      -webkit-text-stroke: 1px rgba(16, 17, 24, 0.14);
    `}

  ${p =>
    p.$crimson &&
    css`
      color: rgba(255, 255, 255, 0.02);
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
    `}
`
