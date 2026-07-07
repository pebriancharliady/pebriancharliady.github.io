import styled from "styled-components"
import { Link } from "gatsby"
import v from "../../data/variables"

export const LogList = styled.div`
  border-top: 1px solid ${v.line};
`

export const LogRow = styled(Link)`
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) minmax(150px, auto);
  gap: 1.5rem;
  align-items: baseline;
  padding: 1.6rem 0;
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
    max-width: 60ch;
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

export const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 clamp(2rem, 5vh, 3rem);
`

export const TagChip = styled(Link)`
  display: inline-block;
  font-family: ${v.fontMono};
  font-size: var(--text-mono-s);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${p => (p.$active ? v.inverse : v.dim)};
  background: ${p => (p.$active ? v.crimson : "transparent")};
  border: 1px solid ${p => (p.$active ? v.crimson : v.lineFaint)};
  padding: 0.35em 0.75em;
  white-space: nowrap;
  transition: color 0.2s ease, border-color 0.2s ease,
    background-color 0.2s ease;

  .count {
    color: ${p => (p.$active ? "rgba(255,255,255,0.7)" : v.faint)};
  }

  &:hover,
  &:focus-visible {
    color: ${p => (p.$active ? v.inverse : v.text)};
    border-color: ${v.signal};
  }
`

/* post header meta line */
export const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.75em 1.75em;
  margin-top: 1.4rem;
  font-family: ${v.fontMono};
  font-size: var(--text-mono-s);
  letter-spacing: var(--track-mid);
  text-transform: uppercase;
  color: ${v.faint};

  .k {
    color: ${v.signal};
  }

  a {
    color: ${v.dim};
    transition: color 0.2s ease;

    &:hover,
    &:focus-visible {
      color: ${v.signal};
    }
  }
`
