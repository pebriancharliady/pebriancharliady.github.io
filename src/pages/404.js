import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import v from "../data/variables"
import { Wrap, Eyebrow, ButtonLink } from "../components/common"
import { Decode } from "../components/fx"

const LostSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: calc(100vh - 320px);
  padding: clamp(3rem, 8vh, 5rem) 0;
  text-align: center;

  .code {
    font-family: ${v.fontDisplay};
    font-size: clamp(6rem, 22vw, 15rem);
    line-height: 0.9;
    color: ${v.text};
    animation: glitchShift 3.2s infinite;
  }

  .jp-lost {
    font-family: ${v.fontJa};
    font-size: 1.05rem;
    letter-spacing: 0.55em;
    color: ${v.faint};
  }

  p {
    max-width: 34em;
    color: ${v.dim};
    line-height: 1.8;
  }
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 — Signal lost" />
    <Wrap>
      <LostSection>
        <Eyebrow jp="信号消失">Signal lost</Eyebrow>
        <div className="code" aria-hidden="true">
          <Decode text="404" duration={1200} />
        </div>
        <span className="jp-lost" lang="ja" aria-hidden="true">
          接続が確立できません
        </span>
        <p>
          This route doesn't resolve — the page may have moved, or it never
          existed. Head back to the index and try from there.
        </p>
        <ButtonLink to="/">Return to index</ButtonLink>
      </LostSection>
    </Wrap>
  </Layout>
)

export default NotFoundPage
