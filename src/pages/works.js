import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Wrap, PageHead, Chip, ChipRow, KanjiMark } from "../components/common"
import { Reveal } from "../components/fx"
import { FileList, FileRow } from "../components/works/style"

const WorkIndex = ({ data }) => {
  const works = data.allMarkdownRemark.edges
  const count = String(works.length).padStart(2, "0")

  return (
    <Layout>
      <SEO title="Selected work" />
      <div style={{ position: "relative" }}>
        <KanjiMark aria-hidden="true" style={{ top: "0", right: "1.5vw" }}>
          作品
        </KanjiMark>
        <Wrap style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <PageHead
              jp="作品"
              kicker="Selected work"
              title="Work files"
              aside={`${count} files on record — web · mobile · infrastructure`}
            >
              Shipped projects, each with what was built, the stack it runs on,
              and where it lives now.
            </PageHead>
          </Reveal>
          <FileList>
            {works.map(({ node }, i) => {
              const f = node.frontmatter
              return (
                <Reveal key={node.fields.slug} delay={i * 90}>
                  <FileRow to={node.fields.slug}>
                    <span>
                      <span className="meta">
                        <span className="code">
                          FILE {String(works.length - i).padStart(2, "0")}
                        </span>
                        <span>{f.date}</span>
                        <span>{f.category}</span>
                      </span>
                      <h2 className="title">
                        {f.title}
                        <span className="arrow" aria-hidden="true">
                          →
                        </span>
                      </h2>
                      <p className="desc">{f.description}</p>
                      <ChipRow className="chips">
                        {f.tags.map(tag => (
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
                  </FileRow>
                </Reveal>
              )
            })}
          </FileList>
        </Wrap>
      </div>
    </Layout>
  )
}

export default WorkIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(works)/" } }
      sort: { fields: [frontmatter___date], order: DESC }
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
                fluid(maxWidth: 1200, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
