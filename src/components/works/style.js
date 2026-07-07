import styled, { css } from "styled-components"
import { Link } from "gatsby"
import v from "../../data/variables"

export const FileList = styled.div`
  border-top: 1px solid ${p => (p.$paper ? v.lineInk : v.line)};
`

/*
  T-composition file row:
  ┌ FILE 03 · 2021.10 · CATEGORY ────────────── (rule runs out) ┐
  │ TITLE SPANNING THE FULL CANVAS                              │
  │ [ description + chips ]        [ image reaching the edge ]  │
  └─────────────────────────────────────────────────────────────┘
*/
export const FileRow = styled(Link)`
  position: relative;
  display: block;
  padding: clamp(2rem, 5vh, 3.25rem) 0;
  border-bottom: 1px solid ${v.line};
  color: inherit;

  .metaline {
    display: flex;
    align-items: center;
    gap: 1.4em;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${v.faint};
    white-space: nowrap;

    .code {
      color: ${v.signal};
      font-weight: 600;
    }

    /* the rule runs out to the canvas edge */
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: ${v.lineFaint};
      min-width: 2rem;
    }
  }

  .title {
    display: flex;
    align-items: baseline;
    gap: 0.55em;
    margin: 1.15rem 0 0;
    font-family: ${v.fontDisplay};
    font-weight: normal;
    font-size: clamp(2rem, 5.2vw, 4.25rem);
    line-height: 0.95;
    text-transform: uppercase;
    color: ${v.text};
    transition: color 0.25s ease;

    .arrow {
      flex: none;
      font-family: ${v.fontMono};
      font-size: 0.45em;
      color: ${v.signal};
      opacity: 0;
      transform: translateX(-8px);
      transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
    }
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: clamp(1.5rem, 4vw, 4.5rem);
    align-items: start;
    margin-top: clamp(1.4rem, 3.5vh, 2.25rem);
  }

  .desc {
    margin: 0;
    max-width: 44ch;
    font-size: 1rem;
    line-height: 1.8;
    color: ${v.dim};
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .chips {
    margin-top: 1.4rem;
  }

  .media {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    border: 1px solid ${v.lineFaint};
    background: ${v.panel};

    .gatsby-image-wrapper {
      position: absolute !important;
      inset: 0;
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
    .grid {
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }

    .media {
      order: 2;
    }

    .metaline {
      flex-wrap: wrap;
      white-space: normal;

      &::after {
        display: none;
      }
    }
  }

  /* printed-on-paper variant */
  ${p =>
    p.$paper &&
    css`
      border-bottom-color: ${v.lineInk};

      .metaline {
        color: ${v.inkFaint};

        .code {
          color: ${v.signalDeep};
        }

        &::after {
          background: ${v.lineInk};
        }
      }

      .title {
        color: ${v.ink};

        .arrow {
          color: ${v.signalDeep};
        }
      }

      .desc {
        color: ${v.inkDim};
      }

      .chips > * {
        color: ${v.inkDim};
        border-color: ${v.lineInk};
      }

      .media {
        border-color: ${v.lineInk};
        background: ${v.paper};
      }

      &:hover,
      &:focus-visible {
        .title {
          color: ${v.crimson};
        }
      }
    `}
`
