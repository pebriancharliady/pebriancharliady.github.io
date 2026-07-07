import styled from "styled-components"
import { Link } from "gatsby"
import v from "../../data/variables"

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: baseline;
  gap: 0.6em;
  font-family: ${v.fontMono};
  font-size: var(--text-mono-s);
  letter-spacing: var(--track-mid);
  text-transform: uppercase;
  color: ${v.faint};
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
      transform: translateX(-3px);
    }
  }
`

export const ArticleShell = styled.article`
  padding: clamp(2rem, 6vh, 4rem) 0;
`

/* dossier metadata strip on work files */
export const MetaGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  margin: clamp(1.75rem, 4vh, 2.5rem) 0 0;
  border: 1px solid ${v.line};
  background: rgba(12, 13, 20, 0.6);

  > div {
    padding: 0.9rem 1.1rem;
    border-left: 1px solid ${v.lineFaint};

    &:first-child {
      border-left: 0;
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
    margin: 0.45rem 0 0;
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

  @media (max-width: ${v.breakpointPhone}) {
    grid-template-columns: 1fr 1fr;

    > div {
      border-top: 1px solid ${v.lineFaint};

      &:nth-child(-n + 2) {
        border-top: 0;
      }
      &:nth-child(odd) {
        border-left: 0;
      }
    }
  }
`

/* framed figure with corner brackets; click opens the modal */
export const FigViewer = styled.figure`
  position: relative;
  margin: clamp(2rem, 5vh, 3rem) 0 0;
  border: 1px solid ${v.line};
  background: ${v.panel};

  .bk {
    position: absolute;
    width: 19px;
    height: 19px;
    z-index: 3;
    border-color: ${v.signal};
    border-style: solid;
    border-width: 0;
    pointer-events: none;
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

  .expand {
    position: absolute;
    inset: 0;
    z-index: 2;
    cursor: zoom-in;
  }

  figcaption {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.6rem 0.9rem;
    border-top: 1px solid ${v.lineFaint};
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${v.faint};

    a {
      color: ${v.dim};
      overflow-wrap: anywhere;
      text-transform: none;
      letter-spacing: 0.04em;

      &:hover,
      &:focus-visible {
        color: ${v.signal};
      }
    }
  }
`

/* markdown body — content stays as-is, chrome goes dark */
export const ArticleBody = styled.div`
  max-width: 70ch;
  margin-top: clamp(2.5rem, 6vh, 4rem);
  font-size: 1.0625rem;
  line-height: 1.85;
  color: #c9cbd6;

  p {
    margin: 1.35em 0;
  }

  a {
    color: ${v.text};
    border-bottom: 1px solid ${v.signal};
    transition: color 0.2s ease;

    &:hover,
    &:focus-visible {
      color: ${v.signal};
    }
  }

  h2,
  h3,
  h4 {
    margin: 2.4em 0 0.9em;
    font-family: ${v.fontDisplay};
    font-weight: normal;
    text-transform: uppercase;
    color: ${v.text};
  }

  h2 {
    font-size: 1.4rem;
    letter-spacing: 0.04em;

    &::before {
      content: "";
      display: inline-block;
      width: 9px;
      height: 9px;
      margin-right: 0.7em;
      background: ${v.crimson};
    }
  }

  h3 {
    font-size: 1.1rem;
    letter-spacing: 0.06em;
  }

  h4 {
    font-family: ${v.fontMono};
    font-size: 0.9rem;
    letter-spacing: var(--track-mid);
    color: ${v.dim};
  }

  ul,
  ol {
    margin: 1.35em 0;
    padding-left: 0.2em;
    list-style: none;
  }

  li {
    position: relative;
    padding-left: 1.5em;
    margin: 0.5em 0;

    &::before {
      content: "▸";
      position: absolute;
      left: 0;
      color: ${v.signal};
      font-family: ${v.fontMono};
    }
  }

  ol {
    counter-reset: item;

    li::before {
      counter-increment: item;
      content: counter(item, decimal-leading-zero);
      font-size: 0.8em;
      top: 0.25em;
    }
  }

  blockquote {
    margin: 1.75em 0;
    padding: 0.2em 0 0.2em 1.4em;
    border-left: 2px solid ${v.crimson};
    color: ${v.dim};
  }

  img {
    border: 1px solid ${v.line};
  }

  hr {
    border: 0;
    border-top: 1px solid ${v.line};
    margin: 2.5em 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.95rem;

    th,
    td {
      border: 1px solid ${v.lineFaint};
      padding: 0.5em 0.8em;
      text-align: left;
    }

    th {
      font-family: ${v.fontMono};
      font-size: var(--text-mono-s);
      letter-spacing: var(--track-mid);
      text-transform: uppercase;
      color: ${v.dim};
    }
  }
`

/* prev / next terminal nav */
export const PagerNav = styled.nav`
  margin-top: clamp(3rem, 7vh, 4.5rem);

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid ${v.line};
  }

  li {
    min-height: 5.25rem;

    + li {
      border-left: 1px solid ${v.line};
    }
  }

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    height: 100%;
    padding: 1.1rem 1.25rem;
    transition: background-color 0.25s ease;

    .dir {
      font-family: ${v.fontMono};
      font-size: var(--text-mono-s);
      letter-spacing: var(--track-mid);
      text-transform: uppercase;
      color: ${v.faint};

      .arrow {
        color: ${v.signal};
      }
    }

    .name {
      font-family: ${v.fontMedium};
      font-size: 1.02rem;
      line-height: 1.35;
      color: ${v.text};
      transition: color 0.2s ease;
    }

    &:hover,
    &:focus-visible {
      background: rgba(127, 19, 36, 0.14);

      .name {
        color: ${v.signal};
      }
    }
  }

  li.next a {
    text-align: right;
    align-items: flex-end;
  }

  @media (max-width: ${v.breakpointPhone}) {
    ul {
      grid-template-columns: 1fr;
    }

    li + li {
      border-left: 0;
      border-top: 1px solid ${v.line};
    }
  }
`
