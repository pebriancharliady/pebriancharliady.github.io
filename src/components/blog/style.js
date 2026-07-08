import styled from "styled-components"
import { Link } from "gatsby"
import v from "../../data/variables"

export const LogList = styled.div`
  border-top: 1px solid ${v.line};
`

export const LogRow = styled(Link)`
  display: grid;
  grid-template-columns: 100px minmax(0, 1fr) minmax(140px, auto);
  gap: 1.4rem;
  align-items: baseline;
  padding: 1.55rem 0;
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
    font-weight: normal;
    font-size: 1.3rem;
    line-height: 1.35;
    color: ${v.text};
    transition: color 0.2s ease;
  }

  .desc {
    margin-top: 0.55rem;
    font-size: 0.95rem;
    line-height: 1.7;
    color: ${v.dim};
    max-width: 58ch;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: flex-end;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${v.faint};
    text-align: right;

    .time {
      color: ${v.dim};
    }
  }

  &:hover,
  &:focus-visible {
    .title,
    .date {
      color: ${v.signal};
    }
  }

  @media (max-width: ${v.breakpointPhone}) {
    grid-template-columns: 1fr;
    gap: 0.4rem;

    .meta {
      flex-direction: row;
      align-items: baseline;
      text-align: left;
    }
  }
`

/* ------------------------------------------------------------------
   spine identity block for the log pages
------------------------------------------------------------------ */
export const LogSpineHead = styled.div`
  .log-title {
    margin: 0.9rem 0 0;
    font-family: ${v.fontDisplay};
    font-weight: normal;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    line-height: 0.95;
    text-transform: uppercase;
    color: ${v.text};
    overflow-wrap: anywhere;
  }

  .log-title.is-tag {
    color: ${v.signal};
  }

  .log-count {
    display: block;
    margin-top: 0.9rem;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: var(--track-mid);
    text-transform: uppercase;
    color: ${v.faint};
  }
`

/* ------------------------------------------------------------------
   facet list — tag filters as a terminal file tree
------------------------------------------------------------------ */
export const FacetList = styled.ul`
  list-style: none;
  margin: 0.75rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`

export const FacetRow = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.42em 0.7em 0.42em 0.75em;
  margin-left: -0.75em;
  border-left: 2px solid
    ${p => (p.$active ? v.signal : "transparent")};
  font-family: ${v.fontMono};
  font-size: var(--text-mono-s);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${p => (p.$active ? v.text : v.dim)};
  background: ${p => (p.$active ? "rgba(127, 19, 36, 0.18)" : "transparent")};
  transition: color 0.2s ease, background-color 0.2s ease,
    border-color 0.2s ease;

  .count {
    color: ${p => (p.$active ? v.signal : v.faint)};
  }

  &:hover,
  &:focus-visible {
    color: ${v.signal};
  }

  @media (max-width: ${v.breakpointTablet}) {
    margin-left: 0;
  }
`
