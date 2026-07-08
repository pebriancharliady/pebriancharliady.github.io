import styled from "styled-components"
import v from "../../../data/variables"

/* the crimson field — every page closes on the brand color */
export const FooterRoot = styled.footer`
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: ${v.crimson};
  background-image: radial-gradient(rgba(0, 0, 0, 0.18) 1px, transparent 1px);
  background-size: 56px 56px;
  color: ${v.inverse};
  padding: clamp(4rem, 10vh, 6.5rem) 0 3.25rem;

  *::selection {
    background: ${v.ink};
    color: ${v.inverse};
  }

  /* hazard edging along the top of the crimson field */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 12px;
    background-image: repeating-linear-gradient(
      45deg,
      rgba(2, 2, 4, 0.32) 0,
      rgba(2, 2, 4, 0.32) 13px,
      transparent 13px,
      transparent 26px
    );
    background-position-x: calc(var(--scroll-y, 0) * -0.55px);
  }
`

export const FooterEyebrow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.8em;
  font-family: ${v.fontMono};
  font-size: var(--text-mono-s);
  font-weight: 500;
  letter-spacing: var(--track-wide);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);

  &::before {
    content: "";
    align-self: center;
    flex: none;
    width: 8px;
    height: 8px;
    background: ${v.inverse};
  }

  .jp {
    font-family: ${v.fontJa};
    font-size: 1.1em;
    letter-spacing: 0.25em;
    color: ${v.inverse};
  }

  .sep {
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0;
  }
`

export const BigMail = styled.a`
  display: inline-block;
  margin-top: 1.75rem;
  font-family: ${v.fontDisplay};
  font-size: clamp(1.3rem, 4.6vw, 3.4rem);
  line-height: 1.05;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: ${v.inverse};
  overflow-wrap: anywhere;
  position: relative;
  transition: color 0.25s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    height: 2px;
    background: rgba(255, 255, 255, 0.9);
    transform: scaleX(0);
    transform-origin: right center;
    transition: transform 0.6s var(--ease-out);
  }

  &:hover,
  &:focus-visible {
    color: ${v.paper};

    &::after {
      transform: scaleX(1);
      transform-origin: left center;
    }
  }
`

export const FooterMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.25rem 2rem;
  margin-top: clamp(2.5rem, 6vh, 4rem);
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`

export const SocialRow = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const CrimsonLink = styled.a`
  display: inline-flex;
  align-items: baseline;
  gap: 0.5em;
  font-family: ${v.fontMono};
  font-size: var(--text-mono);
  letter-spacing: var(--track-mid);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  transition: color 0.2s ease;

  .arrow {
    color: ${v.inverse};
    display: inline-block;
    transition: transform 0.25s var(--ease-out);
  }

  &:hover,
  &:focus-visible {
    color: ${v.inverse};

    .arrow {
      transform: translate(2px, -2px);
    }
  }
`

export const CopyLine = styled.p`
  font-family: ${v.fontMono};
  font-size: var(--text-mono-s);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
`
