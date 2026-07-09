import React, { useRef } from "react"
import { HazardBar } from "../common"
import { useEpisode } from "../fx"
import { EvaCardRoot } from "./style"

/*
  An episode title card: pinned 100vh scene where the title fades in,
  holds, and fades out with scroll before releasing (see useEpisode).
*/
const EpisodeCard = ({ ep, big, sub, holdScrolls = 2, ...rest }) => {
  const wrapRef = useRef(null)
  const windowRef = useRef(null)
  const contentRef = useRef(null)

  useEpisode({ wrapRef, windowRef, contentRef, holdScrolls })

  return (
    <EvaCardRoot ref={wrapRef} {...rest}>
      <div className="ep-window" ref={windowRef}>
        <div className="ep-content" ref={contentRef}>
          <span className="ep" lang="ja" aria-hidden="true">
            {ep}
          </span>
          <h2 className="big" lang="ja">
            {big}
          </h2>
          <span className="sub">{sub}</span>
        </div>
        <HazardBar className="haz" aria-hidden="true" />
      </div>
    </EvaCardRoot>
  )
}

export default EpisodeCard
