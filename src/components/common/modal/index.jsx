import React from "react"
import { useState, useEffect, useRef } from "react"
import propTypes from "prop-types"
import { createPortal } from "react-dom"

import { CSSTransition } from "react-transition-group"

import {
  ModalCloseButton,
  ModalContainer,
  ModalContent,
  OverlayBackground,
  OverlayBody,
} from "./style"

export function Modal(props) {
  const [ready, setReady] = useState(() => false)
  const [display, setDisplay] = useState(() => false)
  const [allow, setAllow] = useState(() => true)

  const modalRef = useRef(null)

  const idModal = "modal"

  function toggleAllow() {
    setAllow(!allow)
  }

  function toggle() {
    if (props.toggleModal) props.toggleModal()
    else setDisplay(!display)
  }

  function handleClickOutside(e) {
    if (
      modalRef?.current &&
      !modalRef?.current?.contains?.(e.target) &&
      allow
    ) {
      toggle()
    }
  }

  useEffect(() => {
    const rootContainer = document.createElement("div")
    rootContainer.setAttribute("id", idModal)
    setReady(true)

    if (!document.getElementById(idModal)) {
      document.body.appendChild(rootContainer)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  useEffect(() => {
    if (display || props.in) {
      document.querySelector("body").classList.add("modal-open")
    }
    return () => {
      document.querySelector("body").classList.remove("modal-open")
    }
  }, [display, props.in])

  if (!ready) return null

  return (
    <>
      {props.children(toggle)}
      {document && document.getElementById(idModal) && (
        <div>
          {createPortal(
            <CSSTransition
              in={props.in ?? display}
              timeout={500}
              onExit={toggleAllow}
              onExited={toggleAllow}
              classNames="overlay"
              unmountOnExit
            >
              <OverlayBody>
                <OverlayBackground />
                <ModalContainer>
                  <ModalContent style={props.modalStyle} ref={modalRef}>
                    <ModalCloseButton>
                      <div
                        role="button"
                        className="modal-close"
                        onKeyDown={toggle}
                        onClick={toggle}
                        aria-label="close modal"
                        tabIndex="-1"
                      ></div>
                    </ModalCloseButton>
                    {props.content(toggle)}
                  </ModalContent>
                </ModalContainer>
              </OverlayBody>
            </CSSTransition>,
            document.getElementById(idModal)
          )}
        </div>
      )}
    </>
  )
}

Modal.defaultProps = {}
Modal.propTypes = {
  in: propTypes.bool,
  toggleModal: propTypes.func,
  content: propTypes.func.isRequired,
}
