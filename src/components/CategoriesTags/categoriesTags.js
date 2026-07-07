import React from "react"
import kebabCase from "lodash/kebabCase"
import { useStaticQuery, graphql } from "gatsby"
import { FacetList, FacetRow } from "../blog/style"

const CategoriesTags = ({ active }) => {
  const data = useStaticQuery(graphql`
    query {
      tags: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
      entries: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(blog)/" } }
      ) {
        totalCount
      }
    }
  `)

  return (
    <FacetList>
      <li>
        <FacetRow to="/blog" $active={!active}>
          All entries <span className="count">{data.entries.totalCount}</span>
        </FacetRow>
      </li>
      {data.tags.group.map(({ fieldValue, totalCount }) => (
        <li key={fieldValue}>
          <FacetRow
            to={`/${kebabCase(fieldValue)}/`}
            $active={active === fieldValue}
          >
            #{fieldValue} <span className="count">{totalCount}</span>
          </FacetRow>
        </li>
      ))}
    </FacetList>
  )
}

export default CategoriesTags
