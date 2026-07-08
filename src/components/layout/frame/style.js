import styled, { css, keyframes } from "styled-components"
import v from "../../../data/variables"

const drawX = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`

const drawY = keyframes`
  from { transform: scaleY(0); opacity: 0; }
  to { transform: scaleY(1); opacity: 1; }
`

export const FrameRoot = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
`

const barBase = css`
  position: absolute;
  left: ${v.frameInset};
  right: ${v.frameInset};
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border: 1px solid ${v.line};
  background: rgba(5, 5, 7, 0.8);
  backdrop-filter: blur(10px);
  pointer-events: auto;
  font-family: ${v.fontMono};

  @media (max-width: ${v.breakpointPhone}) {
    left: ${v.frameInsetMobile};
    right: ${v.frameInsetMobile};
  }
`

export const TopBar = styled.header`
  ${barBase};
  top: ${v.frameInset};
  height: 52px;
  transform-origin: left center;
  animation: ${drawX} 0.7s var(--ease-out) both;

  @media (max-width: ${v.breakpointPhone}) {
    top: ${v.frameInsetMobile};
    height: 48px;
  }
`

export const LogoLink = styled.span`
  display: flex;

  a {
    display: flex;
    align-items: center;
    padding: 0 1.3rem;
    border-right: 1px solid ${v.line};
    font-family: ${v.fontMono};
    font-weight: 600;
    font-size: 0.9375rem;
    letter-spacing: 0.3em;
    color: ${v.text};
  }

  @media (max-width: 480px) {
    a {
      padding: 0 0.9rem;
      font-size: 0.8125rem;
    }
  }

  .cursor {
    color: ${v.signal};
    animation: blink 1.1s steps(1) infinite;
  }
`

export const NavList = styled.nav`
  display: flex;
  align-items: stretch;

  a {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.6em;
    padding: 0 1.4rem;
    border-left: 1px solid ${v.line};
    font-size: var(--text-mono-s);
    font-weight: 500;
    letter-spacing: var(--track-mid);
    text-transform: uppercase;
    color: ${v.dim};
    transition: color 0.2s ease, background-color 0.2s ease;

    .jp {
      font-family: ${v.fontJa};
      font-size: 0.8rem;
      color: ${v.faint};
      transition: color 0.2s ease;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 2px;
      background: ${v.signal};
      transform: scaleX(0);
      transform-origin: left center;
      transition: transform 0.3s var(--ease-out);
    }

    &:hover,
    &:focus-visible {
      color: ${v.text};
      background: rgba(237, 238, 243, 0.03);

      .jp {
        color: ${v.signal};
      }
    }

    &.active {
      color: ${v.text};

      &::after {
        transform: scaleX(1);
      }
      .jp {
        color: ${v.signal};
      }
    }
  }

  @media (max-width: ${v.breakpointPhone}) {
    a {
      padding: 0 0.85rem;

      .jp {
        display: none;
      }
    }
  }

  @media (max-width: 480px) {
    a {
      padding: 0 0.65rem;
      font-size: 0.625rem;
      letter-spacing: 0.12em;
    }
  }
`

export const Rail = styled.div`
  position: absolute;
  top: calc(${v.frameInset} + 52px + 26px);
  bottom: calc(${v.frameInset} + 26px);
  ${p => (p.$side === "right" ? "right" : "left")}: ${v.frameInset};
  width: 1px;
  background: ${v.lineFaint};
  transform-origin: center top;
  animation: ${drawY} 0.9s var(--ease-out) 0.25s both;

  .jp {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    writing-mode: vertical-rl;
    font-family: ${v.fontJa};
    font-size: 0.7rem;
    letter-spacing: 0.4em;
    color: ${v.faint};
    background: ${v.ground};
    padding: 14px 0;
    white-space: nowrap;
  }

  @media (max-width: ${v.breakpointLaptop}) {
    display: none;
  }
`

/* registration marks at the four corners of the frame */
export const Tick = styled.span`
  position: absolute;
  width: 11px;
  height: 11px;
  ${p => (p.$pos.includes("t") ? "top" : "bottom")}: calc(${
  v.frameInset
} - 5px);
  ${p => (p.$pos.includes("l") ? "left" : "right")}: calc(${
  v.frameInset
} - 5px);

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: ${v.signal};
  }
  &::before {
    top: 5px;
    left: 0;
    width: 11px;
    height: 1px;
  }
  &::after {
    top: 0;
    left: 5px;
    width: 1px;
    height: 11px;
  }

  @media (max-width: ${v.breakpointPhone}) {
    display: none;
  }
`
