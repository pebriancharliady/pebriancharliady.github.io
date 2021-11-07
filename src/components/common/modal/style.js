import styled, { css } from "styled-components"
import variables from "../../../data/variables"

const insetZero = css`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
export const OverlayBody = styled.div`
  position: fixed;
  ${insetZero}
  height: 100vh;
  z-index: 50;

  &.overlay {
    /* transition-property: all; */
    /* transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); */
    /* transition-duration: 500ms; */
  }
  &.overlay-enter {
    opacity: 0;
  }

  &.overlay-enter-active {
    opacity: 1;
  }

  &.overlay-exit {
    opacity: 1;
  }

  &.overlay-exit-active {
    opacity: 0;
  }

  &.overlay-enter-done {
    opacity: 1;
  }
`

export const OverlayBackground = styled.div`
  position: absolute;
  background-color: ${variables.black};
  opacity: 0.25;
  ${insetZero}
  z-index: 10;
`

export const ModalContainer = styled.div`
  position: absolute;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  ${insetZero}
`

export const ModalContent = styled.div`
  background-color: white;
  width: auto;
  max-width: fit-content;
  @media (max-width: ${variables.breakpointPhone}) {
    width: 100%;
    max-width: 100%;
    & > img {
      width: 100%;
    }
  }
`

export const ModalCloseButton = styled.div`
  position: relative;
  & > div.modal-close {
    /* @apply absolute right-0 cursor-pointer inline-block; */
    position: absolute;
    cursor: pointer;
    display: inline-block;
    right: 0;
    width: 30px;
    height: 30px;

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }

    &:before,
    :after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 15px;
      height: 2px;
      content: "";
      background-color: black;
      margin-left: -25%;
    }
  }
`
