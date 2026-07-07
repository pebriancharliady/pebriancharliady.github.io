import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/home/hero"
import data from "../data/data"
import {
  Section,
  SectionHead,
  ButtonLink,
  Chip,
  ChipRow,
  KanjiMark,
  PaperSlab,
  Hanko,
  FormTag,
} from "../components/common"
import { Reveal, Parallax } from "../components/fx"
import ShellVoyager from "../components/three/shellVoyager"
import { FileList, FileRow } from "../components/works/style"
import {
  SectionInner,
  SectionFoot,
  SpecList,
  SpecRow,
  NoteList,
  NoteRow,
  StickyHero,
  PageBody,
  SlabTicker,
  EndTicker,
  HankoSpot,
} from "../components/home/style"

const CAPABILITIES = [
  {
    kanji: "面",
    title: "Frontend engineering",
    body:
      "Interfaces from Figma to production — component systems, responsive builds, and the accessibility details in between.",
    stack: "React · TypeScript · Material UI · CSS",
  },
  {
    kanji: "層",
    title: "Fullstack delivery",
    body:
      "Whole features across the stack: APIs, servlets, Android companions, and the data models underneath them.",
    stack: "Java · JSP · Node · Android",
  },
  {
    kanji: "運",
    title: "Ship & operate",
    body:
      "Code that reaches users — VPS deploys, web servers, SSL and DNS, owned end to end.",
    stack: "Tomcat · VPS · SSL/DNS · GH Pages",
  },
]

const IndexPage = ({ data: query }) => {
  const works = query.works.edges
  const posts = query.posts.edges

  return (
    <Layout>
      <SEO title={`${data.SiteAuthor} — ${data.SiteRole}`} />

      <ShellVoyager />

      <StickyHero>
        <Hero />
      </StickyHero>

      <PageBody>
        {/* the printed file slides up over the HUD */}
        <PaperSlab data-shell-anchor="works">
          <SlabTicker
            tone="paper"
            jp="選ばれた作品"
            text="Selected work — File archive — 2021"
            speed={0.5}
          />
          <FormTag
            style={{
              top: "auto",
              bottom: "2.4rem",
              right: "auto",
              left: "clamp(1.25rem, 4vw, 3.5rem)",
            }}
          >
            Form 09-A / Selected work
          </FormTag>
          <HankoSpot>
            <Reveal variant="stamp" delay={250}>
              <Hanko lang="ja" aria-hidden="true">
                認
              </Hanko>
            </Reveal>
          </HankoSpot>
          <Parallax
            speed={0.09}
            style={{
              position: "absolute",
              top: "9rem",
              right: "1.5vw",
              zIndex: 0,
            }}
          >
            <KanjiMark $flow $paper aria-hidden="true">
              作品
            </KanjiMark>
          </Parallax>

          <SectionInner>
            <Reveal>
              <SectionHead
                $paper
                jp="作品"
                title="Selected work"
                aside={`${String(works.length).padStart(2, "0")} files on record`}
              />
            </Reveal>
            <FileList $paper>
              {works.map(({ node }, i) => {
                const f = node.frontmatter
                return (
                  <Reveal key={node.fields.slug} delay={i * 90}>
                    <FileRow $paper to={node.fields.slug}>
                      <span className="metaline">
                        <span className="code">
                          FILE {String(works.length - i).padStart(2, "0")}
                        </span>
                        <span>{f.date}</span>
                        <span>{f.category}</span>
                      </span>
                      <h3 className="title">
                        {f.title}
                        <span className="arrow" aria-hidden="true">
                          →
                        </span>
                      </h3>
                      <span className="grid">
                        <span>
                          <p className="desc">{f.description}</p>
                          <ChipRow className="chips">
                            {f.tags.slice(0, 4).map(tag => (
                              <Chip key={tag}>{tag}</Chip>
                            ))}
                          </ChipRow>
                        </span>
                        <span className="media clip-on-reveal">
                          <Img
                            fluid={f.image.childImageSharp.fluid}
                            alt={f.title}
                          />
                        </span>
                      </span>
                    </FileRow>
                  </Reveal>
                )
              })}
            </FileList>
            <SectionFoot>
              <ButtonLink $paper to="/works">
                All work files
              </ButtonLink>
            </SectionFoot>
          </SectionInner>
        </PaperSlab>

        <Section data-shell-anchor="caps">
          <SectionInner>
            <Reveal>
              <SectionHead jp="技術" title="Capabilities" aside="What I ship" />
            </Reveal>
            <SpecList>
              {CAPABILITIES.map((cap, i) => (
                <Reveal key={cap.title} delay={i * 80}>
                  <SpecRow>
                    <span className="kanji" lang="ja" aria-hidden="true">
                      {cap.kanji}
                    </span>
                    <h3>{cap.title}</h3>
                    <p>{cap.body}</p>
                    <div className="stack">{cap.stack}</div>
                  </SpecRow>
                </Reveal>
              ))}
            </SpecList>
          </SectionInner>
        </Section>

        <Section>
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
            category
            tags
            description
            date(formatString: "YYYY.MM")
            image {
              childImageSharp {
                fluid(maxWidth: 900, quality: 90) {
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
  }
`
