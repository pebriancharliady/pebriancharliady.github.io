import styled from "styled-components"
import v from "../../../data/variables"

export const FooterRoot = styled.footer`
  position: relative;
  padding: clamp(3.5rem, 9vh, 6rem) 0 2.5rem;
`

export const ContactBlock = styled.div`
  padding-top: clamp(2rem, 5vh, 3rem);
`

export const BigMail = styled.a`
  display: inline-block;
  margin-top: 1.75rem;
  font-family: ${v.fontDisplay};
  font-size: clamp(1.3rem, 4.6vw, 3.4rem);
  line-height: 1.05;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: ${v.text};
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
    background: ${v.crimson};
    transform: scaleX(0);
    transform-origin: right center;
    transition: transform 0.6s var(--ease-out);
  }

  &:hover,
  &:focus-visible {
    color: ${v.signal};

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
  border-top: 1px solid ${v.lineFaint};
`

export const SocialRow = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const CopyLine = styled.p`
  font-family: ${v.fontMono};
  font-size: var(--text-mono-s);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${v.faint};
`
