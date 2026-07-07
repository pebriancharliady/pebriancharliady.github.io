import styled from "styled-components"
import v from "../../../data/variables"

export const HeroSection = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 6.5fr) minmax(0, 5.5fr);
  gap: clamp(2.5rem, 6vw, 5.5rem);
  align-items: center;
  min-height: clamp(520px, calc(100vh - 220px), 880px);
  padding: clamp(3rem, 7vh, 4.5rem) 0;

  @media (max-width: ${v.breakpointTablet}) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
    align-items: start;
  }
`

export const HeroCopy = styled.div`
  position: relative;
  z-index: 1;
`

export const HeroName = styled.h1`
  margin: 1.6rem 0 1.9rem;
  font-family: ${v.fontDisplay};
  font-weight: normal;
  font-size: var(--text-hero);
  line-height: 0.92;
  letter-spacing: -0.005em;
  text-transform: uppercase;
  color: ${v.text};
`

export const HeroLede = styled.p`
  font-size: var(--text-body);
  line-height: 1.85;
  color: ${v.dim};
  max-width: 33em;

  b {
    color: ${v.text};
  }
`

export const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 2.4rem;
`

export const ScanPortrait = styled.div`
  position: relative;

  .orbit {
    position: absolute;
    top: -16%;
    right: -13%;
    width: min(370px, 68%);
    aspect-ratio: 1 / 1;
    z-index: 2;
    pointer-events: none;
  }

  .portrait {
    position: relative;
    z-index: 1;
    margin-left: 9%;
    border: 1px solid ${v.line};
    background: ${v.panel};
    overflow: hidden;

    img {
      filter: saturate(0.85) contrast(1.06);
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      box-shadow: inset 0 0 70px rgba(5, 5, 7, 0.55);
      pointer-events: none;
    }
  }

  .scan {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 36%;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(225, 49, 72, 0),
      rgba(225, 49, 72, 0.12) 42%,
      rgba(225, 49, 72, 0.34) 50%,
      rgba(225, 49, 72, 0) 100%
    );
    animation: scanSweep 1.7s var(--ease-out) 1s 1 both;
  }

  /* corner brackets */
  .bk {
    position: absolute;
    width: 19px;
    height: 19px;
    z-index: 3;
    border-color: ${v.signal};
    border-style: solid;
    border-width: 0;
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

  @media (max-width: ${v.breakpointTablet}) {
    max-width: 460px;

    .orbit {
      top: -12%;
      right: -4%;
    }
  }
`

export const ReadoutList = styled.dl`
  position: relative;
  z-index: 1;
  margin: 1.4rem 0 0 9%;
  border: 1px solid ${v.lineFaint};
  border-top: 0;
  background: rgba(12, 13, 20, 0.8);

  > div {
    display: flex;
    align-items: baseline;
    gap: 1.1em;
    padding: 0.52em 0.95em;
    border-top: 1px solid ${v.lineFaint};
  }

  dt {
    flex: none;
    min-width: 7ch;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.18em;
    color: ${v.faint};
  }

  dd {
    margin: 0;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: 0.08em;
    color: ${v.text};
    overflow-wrap: anywhere;
  }

  .status dd {
    display: inline-flex;
    align-items: center;
    gap: 0.6em;
    color: ${v.signal};
  }

  .dot {
    flex: none;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${v.signal};
    animation: pulse 2.4s ease-out infinite;
  }
`
