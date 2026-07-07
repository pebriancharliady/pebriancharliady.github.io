import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  WideWrap,
  PageHead,
  Chip,
  ChipRow,
  KanjiMark,
  PaperSlab,
  Hanko,
  FormTag,
} from "../components/common"
import { Reveal, Parallax } from "../components/fx"
import { FileList, FileRow } from "../components/works/style"
import { SlabTicker, HankoSpot } from "../components/home/style"

const WorkIndex = ({ data }) => {
  const works = data.allMarkdownRemark.edges
  const count = String(works.length).padStart(2, "0")

  return (
    <Layout>
      <SEO title="Selected work" />
      <WideWrap>
        <Reveal>
          <PageHead
            jp="作品"
            kicker="Selected work"
            title={
              <>
                Work <span className="outline">files</span>
              </>
            }
            aside={`${count} files on record — web · mobile · infrastructure`}
          >
            Shipped projects, each with what was built, the stack it runs on,
            and where it lives now.
          </PageHead>
        </Reveal>
      </WideWrap>

      <PaperSlab>
        <SlabTicker
          tone="paper"
          jp="作品ファイル"
          text={`Work files — ${count} on record`}
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
          Form 09-B / Full archive
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
            top: "10rem",
            right: "1.5vw",
            zIndex: 0,
          }}
        >
          <KanjiMark $flow $paper aria-hidden="true">
            作品
          </KanjiMark>
        </Parallax>

        <WideWrap style={{ position: "relative", zIndex: 1 }}>
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
                    <h2 className="title">
                      {f.title}
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </h2>
                    <span className="grid">
                      <span>
                        <p className="desc">{f.description}</p>
                        <ChipRow className="chips">
                          {f.tags.map(tag => (
                            <Chip key={tag}>{tag}</Chip>
                          ))}
                        </ChipRow>
                      </span>
                      <Reveal
                        as="span"
                        variant="clip"
                        delay={150 + i * 90}
                        className="media"
                      >
                        <Img
                          fluid={f.image.childImageSharp.fluid}
                          alt={f.title}
                        />
                      </Reveal>
                    </span>
                  </FileRow>
                </Reveal>
              )
            })}
          </FileList>
        </WideWrap>
      </PaperSlab>
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
                fluid(maxWidth: 1400, quality: 90) {
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
