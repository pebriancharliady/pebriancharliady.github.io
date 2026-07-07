import React from "react"
import kebabCase from "lodash/kebabCase"
import { useStaticQuery, graphql } from "gatsby"
import { TagCloud, TagChip } from "../blog/style"

const CategoriesTags = ({ active }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  return (
    <TagCloud>
      {data.allMarkdownRemark.group.map(({ fieldValue, totalCount }) => (
        <TagChip
          key={fieldValue}
          to={`/${kebabCase(fieldValue)}/`}
          $active={active === fieldValue}
        >
          #{fieldValue} <span className="count">{totalCount}</span>
        </TagChip>
      ))}
    </TagCloud>
  )
}

export default CategoriesTags
