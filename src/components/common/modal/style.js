import styled from "styled-components"
import v from "../../../data/variables"

export const OverlayBody = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 4vw, 3rem);

  &.overlay-enter {
    opacity: 0;
  }
  &.overlay-enter-active {
    opacity: 1;
    transition: opacity 0.25s ease;
  }
  &.overlay-exit {
    opacity: 1;
  }
  &.overlay-exit-active {
    opacity: 0;
    transition: opacity 0.25s ease;
  }
`

export const OverlayBackground = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(2, 2, 4, 0.9);
  backdrop-filter: blur(6px);
`

export const ModalContainer = styled.div`
  position: relative;
  max-width: min(1100px, 94vw);
`

export const ModalContent = styled.div`
  position: relative;
  border: 1px solid ${v.line};
  background: ${v.panel};
  padding: 0;

  img {
    display: block;
    max-width: 100%;
    max-height: 80vh;
    width: auto;
    margin: 0 auto;
  }
`

export const ModalCloseButton = styled.div`
  position: absolute;
  top: -2.4rem;
  right: 0;

  .modal-close {
    cursor: pointer;
    font-family: ${v.fontMono};
    font-size: var(--text-mono-s);
    letter-spacing: var(--track-mid);
    color: ${v.dim};
    transition: color 0.2s ease;

    &::before {
      content: "[ CLOSE ]";
    }

    &:hover,
    &:focus-visible {
      color: ${v.signal};
    }
  }
`
