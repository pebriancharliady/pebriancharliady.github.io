import React from "react"
import socialMedia from "../../../data/socialMedia.json"
import data from "../../../data/data"
import { Wrap, HairRule, Eyebrow, MonoLink } from "../../common"
import { Reveal } from "../../fx"
import {
  FooterRoot,
  ContactBlock,
  BigMail,
  FooterMeta,
  SocialRow,
  CopyLine,
} from "./style"

const Footer = () => (
  <FooterRoot>
    <Wrap>
      <HairRule />
      <ContactBlock>
        <Reveal>
          <Eyebrow jp="接続">Make contact</Eyebrow>
          <BigMail href={`mailto:${data.SiteContact.email}`}>
            {data.SiteContact.email}
          </BigMail>
        </Reveal>
      </ContactBlock>
      <FooterMeta>
        <SocialRow>
          {socialMedia.map(({ id, name, url }) => (
            <li key={id}>
              <MonoLink
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${data.SiteAuthor} on ${name}`}
              >
                {name}{" "}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </MonoLink>
            </li>
          ))}
        </SocialRow>
        <CopyLine>
          © {data.SiteCopyright} {data.SiteAuthor} — {data.SiteDossier.base}
        </CopyLine>
      </FooterMeta>
    </Wrap>
  </FooterRoot>
)

export default Footer
