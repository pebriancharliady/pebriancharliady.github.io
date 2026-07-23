import styled from "styled-components"
import v from "../../../data/variables"

/*
  A service scene: full-bleed background photograph (noir-graded),
  scrimmed dark, with the offer written over it.
*/
export const ServicePanel = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 76vh;
  padding: 6rem ${v.gutter} 5rem;
  overflow: hidden;

  /* a slide in the pile: opaque scene that covers the one beneath */
  .is-stack & {
    position: absolute;
    inset: 0;
    height: 100%;
    min-height: 0;
    padding-bottom: 7.5rem;
    background: #030304;
    box-shadow: 0 -26px 60px rgba(0, 0, 0, 0.55);
    will-change: transform;

    /* bleed above the frame so the parallax lag never shows a gap —
       useStack slides .bg from +22% (of the bg's own 130% height ≈
       28.6% of the panel) back to 0 as the card lands */
    .bg {
      top: -30%;
      will-change: transform;
    }
  }

  @media (max-width: ${v.breakpointPhone}) {
    .is-stack & {
      padding: 0 ${v.gutter} 5.5rem;
      overflow: hidden;
    }
  }

  .bg {
    position: absolute;
    inset: 0;
    z-index: 0;

    .gatsby-image-wrapper {
      position: absolute !important;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      filter: grayscale(1) contrast(1.15) brightness(0.55);
    }
  }

  /* the slide beneath dims as the next one covers it */
  .press {
    position: absolute;
    inset: 0;
    z-index: 3;
    background: #020203;
    opacity: 0;
    pointer-events: none;
  }

  .scrim {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
        to top,
        rgba(3, 3, 4, 0.94) 0%,
        rgba(3, 3, 4, 0.55) 45%,
        rgba(3, 3, 4, 0.25) 100%
      ),
      linear-gradient(to right, rgba(3, 3, 4, 0.6), transparent 60%);
  }

  .inner {
    position: relative;
    z-index: 2;
    max-width: 64rem;
  }

  .svc-meta {
    display: flex;
    align-items: baseline;
    gap: 1.4em;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${v.faint};

    .code {
      color: ${v.signal};
      font-weight: 600;
    }

    .jp {
      font-family: ${v.fontJa};
      letter-spacing: 0.25em;
      color: ${v.dim};
    }
  }

  .svc-title {
    margin: 1.1rem 0 0;
    font-family: ${v.fontDisplay};
    font-weight: normal;
    font-size: clamp(2rem, 4.5vw, 3.9rem);
    line-height: 0.95;
    text-transform: uppercase;
    color: ${v.inverse};
  }

  .svc-body {
    margin: 1.5rem 0 0;
    max-width: 52ch;
    font-size: 0.98rem;
    line-height: 1.85;
    color: rgba(237, 238, 243, 0.82);
  }

  .svc-tech {
    margin-top: 1.75rem;
    max-width: 72ch;
    font-family: ${v.fontMono};
    font-size: var(--text-mono);
    line-height: 2;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${v.dim};

    .k {
      color: ${v.signal};
      font-weight: 600;
      letter-spacing: var(--track-mid);
      margin-right: 1em;
    }
  }
`
