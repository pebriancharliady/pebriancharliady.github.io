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
} from "../components/common"
import { Reveal } from "../components/fx"
import {
  SectionInner,
  WorkList,
  WorkRow,
  SectionFoot,
  CapGrid,
  NoteList,
  NoteRow,
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

      <Hero />

      <Section>
        <KanjiMark aria-hidden="true" style={{ top: "1rem", right: "1.5vw" }}>
          作品
        </KanjiMark>
        <SectionInner>
          <Reveal>
            <SectionHead
              jp="作品"
              title="Selected work"
              aside={`${String(works.length).padStart(2, "0")} files on record`}
            />
          </Reveal>
          <WorkList>
            {works.map(({ node }, i) => {
              const f = node.frontmatter
              return (
                <Reveal key={node.fields.slug} delay={i * 90}>
                  <WorkRow to={node.fields.slug}>
                    <span className="meta">
                      <span className="code">
                        FILE {String(works.length - i).padStart(2, "0")}
                      </span>
                      <span>{f.date}</span>
                      <span>{f.category}</span>
                    </span>
                    <span>
                      <h3 className="title">
                        {f.title}
                        <span className="arrow" aria-hidden="true">
                          →
                        </span>
                      </h3>
                      <p className="desc">{f.description}</p>
                      <ChipRow className="chips">
                        {f.tags.slice(0, 4).map(tag => (
                          <Chip key={tag}>{tag}</Chip>
                        ))}
                      </ChipRow>
                    </span>
                    <span className="media">
                      <Img
                        fluid={f.image.childImageSharp.fluid}
                        alt={f.title}
                      />
                    </span>
                  </WorkRow>
                </Reveal>
              )
            })}
          </WorkList>
          <SectionFoot>
            <ButtonLink to="/works">All work files</ButtonLink>
          </SectionFoot>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <Reveal>
            <SectionHead jp="技術" title="Capabilities" aside="What I ship" />
          </Reveal>
          <Reveal delay={120}>
            <CapGrid>
              {CAPABILITIES.map(cap => (
                <div key={cap.title}>
                  <span className="kanji" lang="ja" aria-hidden="true">
                    {cap.kanji}
                  </span>
                  <h3>{cap.title}</h3>
                  <p>{cap.body}</p>
                  <div className="stack">{cap.stack}</div>
                </div>
              ))}
            </CapGrid>
          </Reveal>
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
