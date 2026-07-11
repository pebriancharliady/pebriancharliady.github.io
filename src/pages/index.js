import React, { useRef } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/home/hero"
import WorksReel from "../components/home/worksReel"
import ServicesReel from "../components/home/servicesReel"
import EpisodeCard from "../components/home/episodeCard"
import data from "../data/data"
import {
  Section,
  SectionHead,
  ButtonLink,
  PaperSlab,
} from "../components/common"
import { Reveal, Sigil, useSceneHold } from "../components/fx"
import ShellVoyager from "../components/three/shellVoyager"
import {
  SectionInner,
  SectionFoot,
  NoteList,
  NoteRow,
  StickyHero,
  PageBody,
  HeldStage,
  EndTicker,
  SigilSpot,
  FeatGrid,
  FeatCard,
} from "../components/home/style"

/* the works the reel leafs through, in leafing order (3–5 works well) */
const REEL_SLUGS = ["ifast", "marcon-elmwood", "tartun"]
/* how many works the [more] featured grid shows */
const MAX_FEATURED = 4

const SERVICES = imgs => [
  {
    title: "Web Development",
    jp: "ウェブ開発",
    body:
      "Websites and web apps end to end — marketing sites, dashboards, and everything between: component systems, performance, SEO, and getting it deployed and serving.",
    tech:
      "React · TypeScript · Gatsby · Node.js · Java / JSP · Material UI · Bootstrap · Styled Components · REST & GraphQL · VPS / SSL / DNS",
    image: imgs.web,
  },
  {
    title: "Odoo Development",
    jp: "Odoo開発",
    body:
      "Odoo ERP shaped to the business — custom modules, workflows, reports, and integrations with the systems you already run, from sales to inventory.",
    tech: "Odoo · Python · XML / QWeb · OWL · PostgreSQL · XML-RPC / REST",
    image: imgs.odoo,
  },
  {
    title: "Mobile Apps Development",
    jp: "モバイル開発",
    body:
      "Mobile apps that ship — native Android and cross-platform builds, from the UI down to device integrations like mPOS payments.",
    tech:
      "Android · Java · Kotlin · React Native · Firebase · mPOS · REST APIs",
    image: imgs.mobile,
  },
  {
    title: "Custom Software",
    jp: "カスタム開発",
    body:
      "Software that doesn't fit a box — bespoke systems built end to end: integrations between services that were never meant to talk, payment hardware, admin backends, the workflows behind the business.",
    tech:
      "Java · Node.js · PostgreSQL · REST APIs · Payment integrations · mPOS · Admin dashboards",
    image: imgs.custom,
  },
]

const IndexPage = ({ data: query }) => {
  const all = query.works.edges
  const posts = query.posts.edges

  /* the reel is curated by REEL_SLUGS; FILE numbers stay tied to the
     archive (date) order so they match the works page */
  const reelEdges = REEL_SLUGS.map(slug =>
    all.find(({ node }) => node.fields.slug.replace(/\//g, "") === slug)
  ).filter(Boolean)

  const works = reelEdges.map(edge => ({
    ...edge,
    fileNo: query.works.totalCount - all.indexOf(edge),
  }))

  /* the featured grid's last frame freezes and dims while the episode
     02 card wipes over it — same entrance as episode 01 over the hero.
     The hook pulls the card up by the hold distance itself, so if the
     grid is absent the card simply stays in normal flow. */
  const holdWrapRef = useRef(null)
  const holdStageRef = useRef(null)
  useSceneHold({ wrapRef: holdWrapRef, stageRef: holdStageRef })

  /* the newest of whatever the reel doesn't show */
  const featured = all
    .filter(edge => !reelEdges.includes(edge))
    .slice(0, MAX_FEATURED)

  const services = SERVICES({
    web: query.svcWeb && query.svcWeb.childImageSharp.fluid,
    odoo: query.svcOdoo && query.svcOdoo.childImageSharp.fluid,
    mobile: query.svcMobile && query.svcMobile.childImageSharp.fluid,
    custom: query.svcCustom && query.svcCustom.childImageSharp.fluid,
  })

  return (
    <Layout>
      <SEO title={`${data.SiteAuthor} — ${data.SiteRole}`} />

      <ShellVoyager />

      <StickyHero data-pin-smooth>
        <Hero />
      </StickyHero>

      <PageBody>
        {/* episode 01 — pinned title scene before the case files open */}
        <EpisodeCard
          ep="第壱話"
          big="作品資料"
          sub="Episode 01 — Selected work"
        />

        {/* the noir showcase: fullscreen, HUD yields the stage */}
        <WorksReel works={works} totalCount={query.works.totalCount} />

        {/* [more] featured works — the rest of the archive, on paper */}
        {featured.length > 0 && (
          <HeldStage ref={holdWrapRef}>
            <div className="stage" ref={holdStageRef}>
              <PaperSlab>
                <SectionInner>
                  <SectionHead
                    $paper
                    jp="他の作品"
                    title="[More] featured works"
                    aside="From the archive"
                  />
                  <FeatGrid>
                    {featured.map(({ node }, i) => {
                      const f = node.frontmatter
                      return (
                        <Reveal key={node.fields.slug} delay={i * 90}>
                          <FeatCard to={node.fields.slug}>
                            <span className="img">
                              <Img
                                fluid={f.image.childImageSharp.fluid}
                                alt={f.title}
                              />
                            </span>
                            <span className="cap">
                              <span className="t">{f.title}</span>
                              <span className="a" aria-hidden="true">
                                →
                              </span>
                            </span>
                          </FeatCard>
                        </Reveal>
                      )
                    })}
                  </FeatGrid>
                  <SectionFoot>
                    <ButtonLink $paper to="/works">
                      All work files
                    </ButtonLink>
                  </SectionFoot>
                </SectionInner>
              </PaperSlab>
              <span className="scene-dim" aria-hidden="true" />
            </div>
          </HeldStage>
        )}

        {/* episode 02 — services. useSceneHold pulls this card over the
            featured grid's held frame — the same wipe as episode 01. */}
        <EpisodeCard ep="第弐話" big="業務内容" sub="Episode 02 — Services" />

        <ServicesReel services={services} />

        <Section data-shell-anchor="caps">
          <SigilSpot aria-hidden="true">
            <Sigil />
          </SigilSpot>
          <SectionInner>
            <Reveal>
              <SectionHead
                jp="記事"
                title="Field notes"
                aside="From the blog"
              />
            </Reveal>
            <NoteList>
              {posts.map(({ node }, i) => {
                const f = node.frontmatter
                return (
                  <Reveal key={node.fields.slug} delay={i * 80}>
                    <NoteRow to={node.fields.slug}>
                      <span className="date">{f.date}</span>
                      <span className="title">{f.title}</span>
                      <span className="meta">
                        {f.categories.slice(0, 2).join(" · ")} — {f.time} min
                      </span>
                    </NoteRow>
                  </Reveal>
                )
              })}
            </NoteList>
            <SectionFoot>
              <ButtonLink to="/blog">All entries</ButtonLink>
            </SectionFoot>
          </SectionInner>
        </Section>

        <EndTicker
          tone="dark"
          reverse
          jp="接続"
          text={`Make contact — ${data.SiteDossier.status} — Bandung ID`}
          speed={0.4}
        />
      </PageBody>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    works: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(works)/" } }
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            category
            tags
            description
            date(formatString: "YYYY.MM")
            image {
              childImageSharp {
                fluid(maxWidth: 1100, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(blog)/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            time
            categories
            date(formatString: "YYYY.MM.DD")
          }
        }
      }
    }
    svcWeb: file(relativePath: { eq: "marcon-elmwood/image.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    svcOdoo: file(relativePath: { eq: "ifast/image1.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    svcMobile: file(relativePath: { eq: "reapit/image.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    svcCustom: file(relativePath: { eq: "tartun/image.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
