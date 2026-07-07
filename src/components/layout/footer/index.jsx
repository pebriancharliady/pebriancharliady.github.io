import React from "react"
import socialMedia from "../../../data/socialMedia.json"
import data from "../../../data/data"
import { Wrap, KanjiMark } from "../../common"
import { Reveal, Parallax } from "../../fx"
import {
  FooterRoot,
  FooterEyebrow,
  BigMail,
  FooterMeta,
  SocialRow,
  CrimsonLink,
  CopyLine,
} from "./style"

const Footer = () => (
  <FooterRoot>
    <Parallax
      speed={0.08}
      style={{
        position: "absolute",
        top: "-2rem",
        right: "3vw",
        zIndex: 0,
      }}
    >
      <KanjiMark $flow $crimson aria-hidden="true">
        接続
      </KanjiMark>
    </Parallax>
    <Wrap style={{ position: "relative", zIndex: 1 }}>
      <Reveal>
        <FooterEyebrow>
          <span className="jp" lang="ja" aria-hidden="true">
            接続
          </span>
          <span className="sep">/</span>
          <span>Make contact</span>
        </FooterEyebrow>
        <BigMail href={`mailto:${data.SiteContact.email}`}>
          {data.SiteContact.email}
        </BigMail>
      </Reveal>
      <FooterMeta>
        <SocialRow>
          {socialMedia.map(({ id, name, url }) => (
            <li key={id}>
              <CrimsonLink
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${data.SiteAuthor} on ${name}`}
              >
                {name}{" "}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </CrimsonLink>
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
