import styled from "styled-components"
import v from "../../../data/variables"

/*
  Paper mode — the printed page of the dossier. Dark is the screen;
  this is the document. Slabs get a sheared edge, binder punch holes,
  and the same survey grid printed in ink.
*/

export const PaperSlab = styled.section`
  position: relative;
  z-index: 1;
  background-color: ${v.paper};
  background-image: radial-gradient(
    rgba(16, 17, 24, 0.06) 1px,
    transparent 1px
  );
  background-size: 56px 56px;
  color: ${v.ink};
  clip-path: polygon(0 0, 100% 3.5rem, 100% 100%, 0 calc(100% - 3.5rem));
  padding: clamp(6rem, 13vh, 8.5rem) 0 clamp(7rem, 14vh, 9.5rem);

  /* binder punch holes — the dark world shows through */
  &::before {
    content: "";
    position: absolute;
    top: 6rem;
    bottom: 6rem;
    left: clamp(8px, 1.6vw, 24px);
    width: 15px;
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
    clip-path: polygon(0 0, 100% 2rem, 100% 100%, 0 calc(100% - 2rem));
    padding: 4.5rem 0 5.5rem;

    &::before {
      display: none;
    }
  }
`

/* a paper document panel for detail pages — corner cut like a filing tab */
export const PaperPanel = styled.div`
  position: relative;
  background-color: ${v.paper};
  background-image: radial-gradient(
    rgba(16, 17, 24, 0.06) 1px,
    transparent 1px
  );
  background-size: 56px 56px;
  color: ${v.ink};
  clip-path: polygon(
    0 0,
    calc(100% - 2.25rem) 0,
    100% 2.25rem,
    100% 100%,
    0 100%
  );
  padding: clamp(1.75rem, 4vw, 3rem);
  padding-left: calc(clamp(1.75rem, 4vw, 3rem) + 24px);

  &::before {
    content: "";
    position: absolute;
    top: 2rem;
    bottom: 2rem;
    left: 12px;
    width: 13px;
    background-image: radial-gradient(
      circle at 50% 50%,
      ${v.ground} 4.5px,
      rgba(16, 17, 24, 0.2) 5.5px,
      transparent 6.5px
    );
    background-size: 13px 52px;
    background-repeat: repeat-y;
    pointer-events: none;
  }

  @media (max-width: ${v.breakpointPhone}) {
    padding-left: clamp(1.75rem, 4vw, 3rem);

    &::before {
      display: none;
    }
  }
`

/* red hanko stamp — lands with the "stamp" reveal variant */
export const Hanko = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  background: ${v.crimson};
  color: ${v.paper};
  font-family: ${v.fontJa};
  font-size: 2rem;
  line-height: 1;
  transform: rotate(-7deg);
  outline: 2px solid ${v.paper};
  outline-offset: -7px;
  mix-blend-mode: multiply;
  opacity: 0.92;
  user-select: none;
  pointer-events: none;

  @media (max-width: ${v.breakpointPhone}) {
    width: 54px;
    height: 54px;
    font-size: 1.6rem;
  }
`

/* corner form label on printed sections */
export const FormTag = styled.span`
  position: absolute;
  top: 4.6rem;
  right: ${v.gutter};
  font-family: ${v.fontMono};
  font-size: var(--text-mono-s);
  letter-spacing: var(--track-mid);
  text-transform: uppercase;
  color: ${v.inkFaint};
  pointer-events: none;

  @media (max-width: ${v.breakpointPhone}) {
    top: 2.8rem;
  }
`
