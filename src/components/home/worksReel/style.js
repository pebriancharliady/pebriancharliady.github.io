import styled, { css } from "styled-components"
import { Link } from "gatsby"
import v from "../../../data/variables"

/*
  The reel shell, shared by both showcases. Paper by default (the
  printed file — works), $dark for the noir stage (services). Either
  way the HUD frame fades out while a reel holds the screen, and the
  viewfinder corners + REC keep the footage feel.

  Default styling is the vertical-stack fallback (mobile, reduced
  motion, no-JS); .is-h switches to the pinned horizontal geometry.
*/

export const ReelWrap = styled.div`
  position: relative;
  z-index: 1;
`

export const ReelWindow = styled.div`
  position: relative;
  overflow: hidden;

  ${p =>
    p.$dark
      ? css`
          background: radial-gradient(
              ellipse 62% 48% at 50% 36%,
              rgba(237, 238, 243, 0.055),
              transparent 70%
            ),
            radial-gradient(
              ellipse at center,
              transparent 52%,
              rgba(0, 0, 0, 0.55)
            ),
            #030304;
          color: ${v.text};
        `
      : css`
          background-color: ${v.paper};
          background-image: radial-gradient(
            rgba(16, 17, 24, 0.06) 1px,
            transparent 1px
          );
          background-size: 56px 56px;
          color: ${v.ink};

          /* binder punch holes — part of the pinned chrome */
          &::before {
            content: "";
            position: absolute;
            top: 5rem;
            bottom: 5rem;
            left: clamp(8px, 1.6vw, 24px);
            width: 15px;
            z-index: 4;
            background-image: radial-gradient(
              circle at 50% 50%,
              ${v.ground} 5.5px,
              rgba(16, 17, 24, 0.2) 6.5px,
              transparent 7.5px
            );
            background-size: 15px 58px;
            background-repeat: repeat-y;
            pointer-events: none;
          }

          @media (max-width: ${v.breakpointPhone}) {
            &::before {
              display: none;
            }
          }
        `}

  .is-h & {
    height: 100vh;
  }

  /* touch devices pin natively — no smoother there to kill sticky */
  .is-touch & {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100svh;
  }

  /* darkens the frozen final frame while the next section wipes over
     it (driven by useReel during the holdAfter tail) */
  .reel-dim {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: #020203;
    opacity: 0;
    pointer-events: none;
  }
`

export const ReelChrome = styled.div`
  /* fallback (stacked) layout: a simple header block */
  position: relative;

  .reel-ticker,
  .reel-kanji,
  .reel-rec,
  .reel-corners,
  .reel-foot {
    display: none;
  }

  .reel-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding: 5.5rem ${v.gutter} 0;
  }

  /* horizontal engine active: full pinned-window chrome */
  .is-h & {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;

    .reel-ticker {
      display: block;
      position: absolute;
      top: 26px;
      left: 0;
      right: 0;
      border-bottom: 1px solid
        ${p => (p.$dark ? v.lineFaint : v.lineInkFaint)};
    }

    .reel-head {
      position: absolute;
      top: 92px;
      left: 0;
      right: 0;
      padding: 0 ${v.gutter};
    }

    .reel-kanji,
    .reel-rec,
    .reel-corners {
      display: block;
    }

    .reel-foot {
      display: flex;
    }
  }

  .reel-aside {
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: var(--track-mid);
    text-transform: uppercase;
    color: ${p => (p.$dark ? v.faint : v.inkFaint)};
  }

  /* surveillance chrome */
  .reel-rec {
    position: absolute;
    top: 92px;
    right: ${v.gutter};
    display: inline-flex;
    align-items: center;
    gap: 0.6em;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    font-weight: 600;
    letter-spacing: 0.3em;
    color: ${p => (p.$dark ? v.signal : v.crimson)};

    .rec-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${p => (p.$dark ? v.signal : v.crimson)};
      animation: blink 1.1s steps(1) infinite;
    }
  }

  .reel-corners span {
    position: absolute;
    width: 30px;
    height: 30px;
    border: 0 solid
      ${p =>
        p.$dark ? "rgba(237, 238, 243, 0.45)" : "rgba(16, 17, 24, 0.4)"};
  }
  .reel-corners .c-tl {
    top: 20px;
    left: 20px;
    border-top-width: 2px;
    border-left-width: 2px;
  }
  .reel-corners .c-tr {
    top: 20px;
    right: 20px;
    border-top-width: 2px;
    border-right-width: 2px;
  }
  .reel-corners .c-bl {
    bottom: 20px;
    left: 20px;
    border-bottom-width: 2px;
    border-left-width: 2px;
  }
  .reel-corners .c-br {
    bottom: 20px;
    right: 20px;
    border-bottom-width: 2px;
    border-right-width: 2px;
  }

  .reel-foot {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.1rem ${v.gutter} 1.3rem;
    border-top: 1px solid ${p => (p.$dark ? v.lineFaint : v.lineInkFaint)};
    pointer-events: auto;
  }

  .reel-counter {
    font-family: ${v.fontMono};
    font-size: var(--text-mono);
    font-weight: 600;
    letter-spacing: 0.2em;
    color: ${p => (p.$dark ? v.text : v.ink)};

    .of {
      color: ${p => (p.$dark ? v.faint : v.inkFaint)};
      font-weight: 400;
    }
  }

  .reel-progress {
    flex: 1;
    max-width: 340px;
    height: 2px;
    background: ${p => (p.$dark ? v.lineFaint : v.lineInkFaint)};
    overflow: hidden;
  }

  .reel-progress-fill {
    display: block;
    width: 100%;
    height: 100%;
    background: ${p => (p.$dark ? v.signal : v.crimson)};
    transform: scaleX(0);
    transform-origin: left center;
  }

  .reel-kanji {
    position: absolute;
    top: 16%;
    right: 1vw;
    z-index: 0;
  }

  @media (max-width: ${v.breakpointPhone}) {
    .is-h & {
      .reel-progress {
        display: none;
      }
      .reel-head {
        top: 78px;
      }
      .reel-rec {
        top: 78px;
      }
    }
  }
`

export const ReelTrack = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  will-change: transform;

  .is-h & {
    flex-direction: row;
    height: 100%;
  }
`

/* a work file page — ink on paper, photos printed in crimson */
export const Panel = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
  color: inherit;
  padding: 9.5rem ${v.gutter} 6.5rem;

  .is-h & {
    flex: none;
    width: 100vw;
    height: 100%;
    padding-top: 10.5rem;
  }

  .metaline {
    display: flex;
    align-items: center;
    gap: 1.4em;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${v.inkFaint};
    white-space: nowrap;

    .code {
      color: ${v.signalDeep};
      font-weight: 600;
    }

    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: ${v.lineInk};
      min-width: 2rem;
    }
  }

  .title {
    display: flex;
    align-items: baseline;
    gap: 0.55em;
    margin: 1.4rem 0 0;
    font-family: ${v.fontDisplay};
    font-weight: normal;
    font-size: clamp(1.9rem, 3.8vw, 3.5rem);
    line-height: 0.95;
    text-transform: uppercase;
    color: ${v.ink};
    transition: color 0.25s ease;

    .arrow {
      flex: none;
      font-family: ${v.fontMono};
      font-size: 0.45em;
      color: ${v.signalDeep};
      opacity: 0;
      transform: translateX(-8px);
      transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
    }
  }

  .desc {
    margin: 1.4rem 0 0;
    max-width: 44ch;
    font-size: 0.95rem;
    line-height: 1.8;
    color: ${v.inkDim};
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .chips {
    margin-top: 1.5rem;

    > * {
      color: ${v.inkDim};
      border-color: ${v.lineInk};
    }
  }

  .open {
    display: inline-flex;
    align-items: baseline;
    gap: 0.7em;
    margin-top: 2.25rem;
    font-family: ${v.fontMono};
    font-size: var(--text-mono);
    font-weight: 500;
    letter-spacing: var(--track-mid);
    text-transform: uppercase;
    color: ${v.ink};

    &::before {
      content: "[";
      color: ${v.signalDeep};
    }
    &::after {
      content: "]";
      color: ${v.signalDeep};
    }
  }

  /* crimson-print photo that lifts to full color on hover */
  .media {
    position: relative;
    overflow: hidden;
    height: 0;
    padding-bottom: 62%;
    border: 1px solid ${v.lineInk};
    background: ${v.paper};

    .gatsby-image-wrapper {
      position: absolute !important;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      filter: grayscale(1) contrast(1.08) brightness(0.95);
      transform: scale(1.01);
      transition: filter 0.5s ease, transform 1.2s var(--ease-out);
    }

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
      color: ${v.crimson};
      animation: rgbSplit 0.4s ease-out 1;
    }
    .arrow {
      opacity: 1;
      transform: translateX(0);
    }
    .open {
      color: ${v.crimson};
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

  @media (max-width: ${v.breakpointTablet}) {
    grid-template-columns: 1fr;
    align-items: start;
    padding: 4rem ${v.gutter} 4.5rem;

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

  /* compact page layout while leafing horizontally on a phone */
  @media (max-width: ${v.breakpointPhone}) {
    .is-h & {
      grid-template-columns: 1fr;
      align-items: start;
      gap: 1.1rem;
      padding: 8rem ${v.gutter} 5rem;
      overflow: hidden;

      .media {
        order: 2;
        padding-bottom: 52%;
      }

      .title {
        font-size: clamp(1.5rem, 6.5vw, 2.2rem);
      }

      .desc {
        font-size: 0.9rem;
        -webkit-line-clamp: 3;
      }

      .open {
        margin-top: 1.25rem;
      }
    }
  }
`
