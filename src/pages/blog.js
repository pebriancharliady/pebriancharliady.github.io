import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CategoriesTags from "../components/CategoriesTags/categoriesTags"
import { Wrap, PageHead, KanjiMark } from "../components/common"
import { Reveal } from "../components/fx"
import { LogList, LogRow } from "../components/blog/style"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Field notes" />
      <div style={{ position: "relative" }}>
        <KanjiMark aria-hidden="true" style={{ top: "0", right: "1.5vw" }}>
          記事
        </KanjiMark>
        <Wrap style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <PageHead
              jp="記事"
              kicker="Field notes"
              title="Log"
              aside={`${String(posts.length).padStart(2, "0")} entries`}
            >
              Notes on building for the web — UX, performance, and what shipping
              teaches. Filter by tag or read in order.
            </PageHead>
          </Reveal>
          <Reveal delay={100}>
            <CategoriesTags />
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
        </Wrap>
      </div>
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
