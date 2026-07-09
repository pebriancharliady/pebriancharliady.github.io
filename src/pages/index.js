import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/home/hero"
import WorksReel from "../components/home/worksReel"
import ServicesReel from "../components/home/servicesReel"
import data from "../data/data"
import {
  Section,
  SectionHead,
  ButtonLink,
  HazardBar,
  PaperSlab,
} from "../components/common"
import { Reveal, ScrollScale, Sigil } from "../components/fx"
import ShellVoyager from "../components/three/shellVoyager"
import {
  SectionInner,
  SectionFoot,
  NoteList,
  NoteRow,
  StickyHero,
  PageBody,
  EndTicker,
  EvaCardRoot,
  SigilSpot,
  FeatGrid,
  FeatCard,
} from "../components/home/style"

/* how many work files the reel leafs through (3–5 works well) */
const MAX_WORK_PANELS = 3
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
]

const IndexPage = ({ data: query }) => {
  const works = query.works.edges.slice(0, MAX_WORK_PANELS)
  const posts = query.posts.edges

  /* only the archive beyond the reel — the section stays hidden until
     more works exist than the reel shows */
  const featured = query.works.edges.slice(
    MAX_WORK_PANELS,
    MAX_WORK_PANELS + MAX_FEATURED
  )

  const services = SERVICES({
    web: query.svcWeb && query.svcWeb.childImageSharp.fluid,
    odoo: query.svcOdoo && query.svcOdoo.childImageSharp.fluid,
    mobile: query.svcMobile && query.svcMobile.childImageSharp.fluid,
  })

  return (
    <Layout>
      <SEO title={`${data.SiteAuthor} — ${data.SiteRole}`} />

      <ShellVoyager />

      <StickyHero data-pin-smooth>
        <Hero />
      </StickyHero>

      <PageBody>
        {/* episode 01 — hard black cut before the case files open */}
        <EvaCardRoot>
          <ScrollScale amp={0.16} style={{ position: "relative" }}>
            <span className="ep" lang="ja" aria-hidden="true">
              第壱話
            </span>
            <h2 className="big" lang="ja">
              作品資料
            </h2>
            <span className="sub">Episode 01 — Selected work</span>
          </ScrollScale>
          <HazardBar className="haz" aria-hidden="true" />
        </EvaCardRoot>

        {/* the noir showcase: fullscreen, HUD yields the stage */}
        <WorksReel works={works} totalCount={query.works.totalCount} />

        {/* [more] featured works — the rest of the archive, on paper */}
        {featured.length > 0 && (
          <PaperSlab>
            <SectionInner>
              <Reveal>
                <SectionHead
                  $paper
                  jp="他の作品"
                  title="[More] featured works"
                  aside="From the archive"
                />
              </Reveal>
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
        )}

        {/* episode 02 — services. The -100vh pulls the card up over the
            works reel's holdAfter tail: it wipes over the frozen final
            frame and fully covers exactly as the pin releases. Keep
            this margin paired with holdAfter: 1 on WorksReel. */}
        <EvaCardRoot style={{ marginTop: "-100vh" }}>
          <ScrollScale amp={0.16} style={{ position: "relative" }}>
            <span className="ep" lang="ja" aria-hidden="true">
              第弐話
            </span>
            <h2 className="big" lang="ja">
              業務内容
            </h2>
            <span className="sub">Episode 02 — Services</span>
          </ScrollScale>
          <HazardBar className="haz" aria-hidden="true" />
        </EvaCardRoot>

        <ServicesReel services={services} />

        <Section data-shell-anchor="caps">
          <SigilSpot aria-hidden="true">
            <Sigil />
          </SigilSpot>
          <SectionInner>
            <Reveal>
              <SectionHead jp="記事" title="Field notes" aside="From the blog" />
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
      limit: 8
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
    svcWeb: file(relativePath: { eq: "services/web.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    svcOdoo: file(relativePath: { eq: "services/odoo.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    svcMobile: file(relativePath: { eq: "services/mobile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 80) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
