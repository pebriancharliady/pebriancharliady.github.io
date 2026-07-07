import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Wrap, PageHead, Chip, ChipRow, Modal } from "../../components/common"
import { Reveal } from "../../components/fx"
import {
  BackLink,
  ArticleShell,
  MetaGrid,
  FigViewer,
  ArticleBody,
} from "../../components/article/style"

const WorkTemplate = ({ data }) => {
  const work = data.markdownRemark
  const f = work.frontmatter

  return (
    <Layout>
      <SEO title={f.title} description={f.description || work.excerpt} />
      <Wrap>
        <ArticleShell>
          <BackLink to="/works">
            <span className="arrow" aria-hidden="true">
              ←
            </span>
            All work files
          </BackLink>

          <Reveal>
            <PageHead jp="作品" kicker="Work file" title={f.title} />
          </Reveal>

          <Reveal delay={100}>
            <MetaGrid>
              <div>
                <dt>Date</dt>
                <dd>{f.date}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{f.category}</dd>
              </div>
              <div>
                <dt>Deployment</dt>
                <dd>
                  {f.projectLink ? (
                    <a
                      href={f.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit project ↗
                    </a>
                  ) : (
                    "Offline / private"
                  )}
                </dd>
              </div>
            </MetaGrid>
          </Reveal>

          <Reveal delay={160}>
            <ChipRow style={{ marginTop: "1.25rem" }}>
              {f.tags.map(tag => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </ChipRow>
          </Reveal>

          {f.image && (
            <Reveal delay={220}>
              <FigViewer>
                <span className="bk bk-tl" aria-hidden="true" />
                <span className="bk bk-tr" aria-hidden="true" />
                <span className="bk bk-bl" aria-hidden="true" />
                <span className="bk bk-br" aria-hidden="true" />
                <Img fluid={f.image.childImageSharp.fluid} alt={f.title} />
                <Modal
                  content={() => (
                    <img
                      src={f.image.childImageSharp.fluid.src}
                      alt={f.title}
                    />
                  )}
                >
                  {toggle => (
                    <button
                      type="button"
                      className="expand"
                      onClick={toggle}
                      aria-label="Enlarge image"
                    />
                  )}
                </Modal>
                <figcaption>
                  <span>FIG. 01 — {f.title}</span>
                  <span>CLICK TO ENLARGE</span>
                </figcaption>
              </FigViewer>
            </Reveal>
          )}

          <ArticleBody dangerouslySetInnerHTML={{ __html: work.html }} />
        </ArticleShell>
      </Wrap>
    </Layout>
  )
}

export default WorkTemplate

export const pageQuery = graphql`
  query portfolioWorkBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        category
        tags
        description
        projectLink
        date(formatString: "YYYY.MM.DD")
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
`
