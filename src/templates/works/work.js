import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import {
  Wrap,
  PageHead,
  Chip,
  ChipRow,
  Modal,
  Spread,
  Spine,
  Field,
  SpineBlock,
  PaperPanel,
  FormTag,
} from "../../components/common"
import { Reveal } from "../../components/fx"
import {
  BackLink,
  ArticleShell,
  FigViewer,
  ArticleBody,
} from "../../components/article/style"

const WorkTemplate = ({ data, pageContext }) => {
  const work = data.markdownRemark
  const f = work.frontmatter
  const fileNo = String(pageContext.fileNo || 0).padStart(2, "0")

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

          <Spread>
            <Spine>
              <SpineBlock>
                <span className="sp-label">File</span>
                <span className="sp-value sp-big">{fileNo}</span>
              </SpineBlock>
              <SpineBlock>
                <span className="sp-label">Date</span>
                <span className="sp-value">{f.date}</span>
              </SpineBlock>
              <SpineBlock>
                <span className="sp-label">Category</span>
                <span className="sp-value">{f.category}</span>
              </SpineBlock>
              <SpineBlock>
                <span className="sp-label">Deployment</span>
                <span className="sp-value">
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
                </span>
              </SpineBlock>
              <SpineBlock>
                <span className="sp-label">Stack</span>
                <ChipRow style={{ marginTop: "0.6rem" }}>
                  {f.tags.map(tag => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </ChipRow>
              </SpineBlock>
            </Spine>

            <Field>
              <Reveal delay={100}>
                <PaperPanel>
                  <FormTag style={{ top: "0.9rem", right: "3.25rem" }}>
                    File {fileNo} / Dossier
                  </FormTag>

                  {f.image && (
                    <div>
                      <FigViewer
                        $paper
                        className="clip-on-reveal"
                        style={{ marginTop: "1.5rem" }}
                      >
                        <span className="bk bk-tl" aria-hidden="true" />
                        <span className="bk bk-tr" aria-hidden="true" />
                        <span className="bk bk-bl" aria-hidden="true" />
                        <span className="bk bk-br" aria-hidden="true" />
                        <Img
                          fluid={f.image.childImageSharp.fluid}
                          alt={f.title}
                        />
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
                    </div>
                  )}

                  <ArticleBody
                    $paper
                    dangerouslySetInnerHTML={{ __html: work.html }}
                    style={{ marginTop: "clamp(1.75rem, 4vh, 2.5rem)" }}
                  />
                </PaperPanel>
              </Reveal>
            </Field>
          </Spread>
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
