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
`
