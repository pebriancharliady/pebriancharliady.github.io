import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import kebabCase from "lodash/kebabCase"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Wrap, PageHead } from "../../components/common"
import { Reveal } from "../../components/fx"
import { PostMeta } from "../../components/blog/style"
import {
  BackLink,
  ArticleShell,
  FigViewer,
  ArticleBody,
  PagerNav,
} from "../../components/article/style"

const BlogPost = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const f = post.frontmatter
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO title={f.title} description={f.description || post.excerpt} />
      <Wrap>
        <ArticleShell>
          <BackLink to="/blog">
            <span className="arrow" aria-hidden="true">
              ←
            </span>
            All entries
          </BackLink>

          <Reveal>
            <PageHead jp="記事" kicker="Log entry" title={f.title} />
          </Reveal>

          <Reveal delay={100}>
            <PostMeta>
              <span>
                <span className="k">DATE</span> {f.date}
              </span>
              <span>
                <span className="k">READ</span> {f.time} min
              </span>
              <span>
                <span className="k">TAGS</span>{" "}
                {f.categories.map((c, i) => (
                  <React.Fragment key={c}>
                    <Link to={`/${kebabCase(c)}/`}>#{c}</Link>
                    {i < f.categories.length - 1 ? " " : ""}
                  </React.Fragment>
                ))}
              </span>
            </PostMeta>
          </Reveal>

          {f.image && (
            <Reveal delay={180}>
              <FigViewer as="figure">
                <span className="bk bk-tl" aria-hidden="true" />
                <span className="bk bk-tr" aria-hidden="true" />
                <span className="bk bk-bl" aria-hidden="true" />
                <span className="bk bk-br" aria-hidden="true" />
                <Img fluid={f.image.childImageSharp.fluid} alt={f.title} />
                <figcaption>
                  <span>FIG. 01</span>
                  {f.imageCredit && (
                    <a
                      href={f.imageCredit}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Image credit: {f.imageCredit}
                    </a>
                  )}
                </figcaption>
              </FigViewer>
            </Reveal>
          )}

          <ArticleBody dangerouslySetInnerHTML={{ __html: post.html }} />

          {(previous || next) && (
            <PagerNav aria-label="Adjacent entries">
              <ul>
                <li className="prev">
                  {previous && (
                    <Link to={previous.fields.slug} rel="prev">
                      <span className="dir">
                        <span className="arrow" aria-hidden="true">
                          ←
                        </span>{" "}
                        Previous entry
                      </span>
                      <span className="name">{previous.frontmatter.title}</span>
                    </Link>
                  )}
                </li>
                <li className="next">
                  {next && (
                    <Link to={next.fields.slug} rel="next">
                      <span className="dir">
                        Next entry{" "}
                        <span className="arrow" aria-hidden="true">
                          →
                        </span>
                      </span>
                      <span className="name">{next.frontmatter.title}</span>
                    </Link>
                  )}
                </li>
              </ul>
            </PagerNav>
          )}
        </ArticleShell>
      </Wrap>
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        time
        categories
        description
        imageCredit
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
