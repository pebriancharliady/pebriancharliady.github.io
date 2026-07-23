import React, { useRef } from "react"
import Img from "gatsby-image"
import { Chip, ChipRow, Eyebrow, ButtonLink, KanjiMark } from "../../common"
import { Ticker, useStack } from "../../fx"
import { ReelWrap, ReelWindow, ReelChrome, StackField, Panel } from "./style"

const WorksReel = ({ works, totalCount }) => {
  const wrapRef = useRef(null)
  const windowRef = useRef(null)
  const counterRef = useRef(null)
  const fillRef = useRef(null)

  const n = works.length

  useStack({
    wrapRef,
    windowRef,
    counterRef,
    fillRef,
    count: n,
    tilt: -1.6, // each file lands with a settling sheet-of-paper tilt
  })

  return (
    <ReelWrap ref={wrapRef} id="selected-work" data-shell-anchor="works">
      <ReelWindow ref={windowRef}>
        <ReelChrome>
          <Ticker
            className="reel-ticker"
            tone="paper"
            jp="選ばれた作品"
            text="Selected work — Case files"
            speed={0.5}
          />
          <div className="reel-head">
            <Eyebrow $paper jp="作品">
              Selected work
            </Eyebrow>
            <span className="reel-aside">
              {String(totalCount).padStart(2, "0")} files on record
            </span>
          </div>
          <span className="reel-rec" aria-hidden="true">
            <span className="rec-dot" />
            REC
          </span>
          <span className="reel-corners" aria-hidden="true">
            <span className="c-tl" />
            <span className="c-tr" />
            <span className="c-bl" />
            <span className="c-br" />
          </span>
          <span className="reel-kanji" aria-hidden="true">
            <KanjiMark $flow $paper>
              作品
            </KanjiMark>
          </span>
          <div className="reel-foot">
            <span className="reel-counter" ref={counterRef}>
              <span>01</span>
              <span className="of"> / {String(n).padStart(2, "0")}</span>
            </span>
            <span className="reel-progress" aria-hidden="true">
              <span className="reel-progress-fill" ref={fillRef} />
            </span>
            {/* <ButtonLink $paper to="/works">
              All work files
            </ButtonLink> */}
          </div>
        </ReelChrome>

        <span className="reel-dim" aria-hidden="true" />
        <StackField>
          {works.map(({ node, fileNo }) => {
            const f = node.frontmatter
            return (
              <Panel
                key={node.fields.slug}
                to={node.fields.slug}
                data-stack-item
              >
                <span>
                  <span className="metaline">
                    <span className="code">
                      FILE {String(fileNo).padStart(2, "0")}
                    </span>
                    <span>{f.date}</span>
                    <span>{f.category}</span>
                  </span>
                  <h3 className="title">
                    {f.title}
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>
                  </h3>
                  <p className="desc">{f.description}</p>
                  <ChipRow className="chips">
                    {f.tags.slice(0, 5).map(tag => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </ChipRow>
                  <span className="open">Open file</span>
                </span>
                <span className="media">
                  <Img fluid={f.image.childImageSharp.fluid} alt={f.title} />
                </span>
                <span className="press" aria-hidden="true" />
              </Panel>
            )
          })}
        </StackField>
      </ReelWindow>
    </ReelWrap>
  )
}

export default WorksReel
