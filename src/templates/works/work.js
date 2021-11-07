import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Calendar, ExternalLink } from "react-feather"

import {
  Intro,
  Title,
  ArticlePost,
  SmallText,
  ArticleBody,
  Header,
  HeaderImage,
  ProjectLink,
} from "../../components/styled/posts"
import { ContainerLayout, Modal } from "../../components/common"

const portfolioWork = ({ data, pageContext, location }) => {
  const work = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={work.frontmatter.title}
        description={work.frontmatter.description || work.excerpt}
      />
      <Intro>
        <ContainerLayout>
          <div>
            <ArticlePost>
              <Header>
                <Title>{work.frontmatter.title}</Title>
                <SmallText>
                  <Calendar
                    className="align-middle text-primary"
                    width="18"
                    height="18"
                  />
                  <span className="align-middle">
                    {" "}
                    Date published : <strong>
                      {work.frontmatter.date}
                    </strong>{" "}
                  </span>
                </SmallText>
                <figure style={{ position: "relative" }}>
                  <HeaderImage
                    fluid={work.frontmatter.image.childImageSharp.fluid}
                    title={work.frontmatter.title}
                  />
                  <Modal
                    content={toggle => (
                      <img
                        src={work.frontmatter.image.childImageSharp.fluid.src}
                        alt={work.frontmatter.title}
                      />
                    )}
                  >
                    {toggle => (
                      <span
                        onClick={toggle}
                        onKeyDown={toggle}
                        role="button"
                        className="link-wrapped"
                        aria-label="open modal"
                        tabIndex="-1"
                      ></span>
                    )}
                  </Modal>
                </figure>

                <ProjectLink
                  href={work.frontmatter.projectLink}
                  className="lined-link"
                  target="_blank"
                >
                  <span className="align-middle">
                    {work.frontmatter.projectLink
                      ? "Visit Project"
                      : "Project URL not provided"}{" "}
                  </span>
                  {work.frontmatter.projectLink && (
                    <ExternalLink
                      className="align-middle text-primary"
                      width="18"
                      height="18"
                    />
                  )}
                </ProjectLink>
              </Header>
              <ArticleBody dangerouslySetInnerHTML={{ __html: work.html }} />
            </ArticlePost>
          </div>
        </ContainerLayout>
      </Intro>
    </Layout>
  )
}

export default portfolioWork

export const data = graphql`
  query portfolioWorkBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      rawMarkdownBody
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        image {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
        projectLink
      }
    }
  }
`
