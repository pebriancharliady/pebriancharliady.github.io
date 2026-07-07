import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import data from "../../../data/data"
import { Wrap, Eyebrow, ButtonLink, ButtonA } from "../../common"
import { Decode, Reveal } from "../../fx"
import ShellScene from "../../three/shellScene"
import {
  HeroSection,
  HeroCopy,
  HeroName,
  HeroLede,
  CtaRow,
  ScanPortrait,
  ReadoutList,
} from "./style"

const READOUT_BASE_DELAY = 1100

const Hero = () => {
  const { portrait } = useStaticQuery(graphql`
    query {
      portrait: file(relativePath: { eq: "header-me.png" }) {
        childImageSharp {
          fluid(maxWidth: 900, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const readouts = [
    ["SUBJECT", data.SiteAuthor.toUpperCase()],
    ["ROLE", data.SiteRole.toUpperCase()],
    [
      "BASE",
      `${
        data.SiteDossier.coordinates
      } — ${data.SiteDossier.base.toUpperCase()}`,
    ],
    ["STACK", data.SiteDossier.stack.toUpperCase()],
  ]

  return (
    <Wrap>
      <HeroSection>
        <HeroCopy>
          <Reveal delay={150}>
            <Eyebrow jp={data.SiteRoleJa}>{data.SiteRole}</Eyebrow>
          </Reveal>
          <HeroName>
            <Decode text="PEBRIAN" delay={300} duration={800} />
            <br />
            <Decode text="CHARLIADY" delay={520} duration={800} />
          </HeroName>
          <Reveal delay={550}>
            <HeroLede>
              Self-taught software developer based in Bandung, Indonesia —
              building web and mobile products end to end. Most days that means{" "}
              <b>React and TypeScript</b>; every day it means solving the
              problem before reaching for the tool.
            </HeroLede>
          </Reveal>
          <Reveal delay={750}>
            <CtaRow>
              <ButtonLink to="/works">View selected work</ButtonLink>
              <ButtonA href={`mailto:${data.SiteContact.email}`}>
                Make contact
              </ButtonA>
            </CtaRow>
          </Reveal>
        </HeroCopy>

        <Reveal delay={400}>
          <ScanPortrait>
            <ShellScene className="orbit" />
            <figure className="portrait">
              <span className="bk bk-tl" aria-hidden="true" />
              <span className="bk bk-tr" aria-hidden="true" />
              <span className="bk bk-bl" aria-hidden="true" />
              <span className="bk bk-br" aria-hidden="true" />
              {portrait && (
                <Img
                  fluid={portrait.childImageSharp.fluid}
                  alt={`Portrait of ${data.SiteAuthor}`}
                />
              )}
              <span className="scan" aria-hidden="true" />
            </figure>
            <ReadoutList>
              {readouts.map(([label, value], i) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>
                    <Decode
                      text={value}
                      delay={READOUT_BASE_DELAY + i * 160}
                      duration={520}
                    />
                  </dd>
                </div>
              ))}
              <div className="status">
                <dt>STATUS</dt>
                <dd>
                  <span className="dot" aria-hidden="true" />
                  <Decode
                    text={data.SiteDossier.status.toUpperCase()}
                    delay={READOUT_BASE_DELAY + readouts.length * 160}
                    duration={520}
                  />
                </dd>
              </div>
            </ReadoutList>
          </ScanPortrait>
        </Reveal>
      </HeroSection>
    </Wrap>
  )
}

export default Hero
