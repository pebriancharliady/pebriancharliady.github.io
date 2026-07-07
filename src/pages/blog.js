import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CategoriesTags from "../components/CategoriesTags/categoriesTags"
import {
  Wrap,
  Eyebrow,
  Lede,
  Spread,
  Spine,
  Field,
  SpineBlock,
} from "../components/common"
import { Reveal } from "../components/fx"
import { LogList, LogRow, LogSpineHead } from "../components/blog/style"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Field notes" />
      <Wrap style={{ paddingTop: "clamp(2rem, 6vh, 4rem)" }}>
        <Spread>
          <Spine>
            <SpineBlock>
              <Reveal>
                <LogSpineHead>
                  <Eyebrow jp="記事">Field notes</Eyebrow>
                  <h1 className="log-title">Log</h1>
                  <span className="log-count">
                    {String(posts.length).padStart(2, "0")} entries
                  </span>
                </LogSpineHead>
              </Reveal>
            </SpineBlock>
            <SpineBlock>
              <span className="sp-label">Filter by tag</span>
              <CategoriesTags />
            </SpineBlock>
          </Spine>

          <Field>
            <Reveal>
              <Lede style={{ margin: "0 0 2rem" }}>
                Notes on building for the web — UX, performance, and what
                shipping teaches.
              </Lede>
            </Reveal>
            <LogList>
              {posts.map(({ node }, i) => {
                const f = node.frontmatter
                return (
                  <Reveal key={node.fields.slug} delay={i * 70}>
                    <LogRow to={node.fields.slug}>
                      <span className="date">{f.date}</span>
                      <span>
                        <span className="title">{f.title}</span>
                        <p className="desc">{f.description || node.excerpt}</p>
                      </span>
                      <span className="meta">
                        <span>{f.categories.slice(0, 2).join(" · ")}</span>
                        <span className="time">{f.time} min read</span>
                      </span>
                    </LogRow>
                  </Reveal>
                )
              })}
            </LogList>
          </Field>
        </Spread>
      </Wrap>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(blog)/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            time
            categories
            description
            date(formatString: "YYYY.MM.DD")
          }
        }
      }
    }
  }
`
