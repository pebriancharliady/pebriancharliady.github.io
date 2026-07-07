import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import CategoriesTags from "../../components/CategoriesTags/categoriesTags"
import {
  Wrap,
  Eyebrow,
  Spread,
  Spine,
  Field,
  SpineBlock,
} from "../../components/common"
import { Reveal } from "../../components/fx"
import { LogList, LogRow, LogSpineHead } from "../../components/blog/style"

const Categories = ({ data, pageContext }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO title={`Entries tagged #${category}`} />
      <Wrap style={{ paddingTop: "clamp(2rem, 6vh, 4rem)" }}>
        <Spread>
          <Spine>
            <SpineBlock>
              <Reveal>
                <LogSpineHead>
                  <Eyebrow jp="記事">Field notes</Eyebrow>
                  <h1 className="log-title is-tag">#{category}</h1>
                  <span className="log-count">
                    {String(totalCount).padStart(2, "0")}{" "}
                    {totalCount === 1 ? "entry" : "entries"} with this tag
                  </span>
                </LogSpineHead>
              </Reveal>
            </SpineBlock>
            <SpineBlock>
              <span className="sp-label">Filter by tag</span>
              <CategoriesTags active={category} />
            </SpineBlock>
          </Spine>

          <Field>
            <LogList style={{ marginTop: "0.25rem" }}>
              {edges.map(({ node }, i) => {
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

export default Categories

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
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
