import React, { useRef } from "react"
import Img from "gatsby-image"
import data from "../../../data/data"
import { Eyebrow, ButtonA, KanjiMark } from "../../common"
import { Ticker, useReel } from "../../fx"
import { ReelWrap, ReelWindow, ReelChrome, ReelTrack } from "../worksReel/style"
import { ServicePanel } from "./style"

/*
  services: [{ title, jp, kanji, body, tech, image (fluid) }]
*/
const ServicesReel = ({ services }) => {
  const wrapRef = useRef(null)
  const windowRef = useRef(null)
  const trackRef = useRef(null)
  const counterRef = useRef(null)
  const fillRef = useRef(null)

  const n = services.length

  useReel({
    wrapRef,
    windowRef,
    trackRef,
    counterRef,
    fillRef,
    count: n,
  })

  return (
    <ReelWrap ref={wrapRef}>
      <ReelWindow $dark ref={windowRef}>
        <ReelChrome $dark>
          <Ticker
            className="reel-ticker"
            tone="dark"
            jp="提供業務"
            text="Services — What I can build for you"
            speed={0.5}
          />
          <div className="reel-head">
            <Eyebrow jp="業務">Services</Eyebrow>
            <span className="reel-aside">
              {String(n).padStart(2, "0")} disciplines
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
            <KanjiMark $flow>業務</KanjiMark>
          </span>
          <div className="reel-foot">
            <span className="reel-counter" ref={counterRef}>
              <span>01</span>
              <span className="of"> / {String(n).padStart(2, "0")}</span>
            </span>
            <span className="reel-progress" aria-hidden="true">
              <span className="reel-progress-fill" ref={fillRef} />
            </span>
            <ButtonA href={`mailto:${data.SiteContact.email}`}>
              Make contact
            </ButtonA>
          </div>
        </ReelChrome>

        <ReelTrack ref={trackRef}>
          {services.map((svc, i) => (
            <ServicePanel key={svc.title}>
              <span className="bg" aria-hidden="true">
                {svc.image && <Img fluid={svc.image} alt="" />}
              </span>
              <span className="scrim" aria-hidden="true" />
              <div className="inner">
                <div className="svc-meta">
                  <span className="code">
                    SERVICE {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="jp" lang="ja">
                    {svc.jp}
                  </span>
                </div>
                <h3 className="svc-title">{svc.title}</h3>
                <p className="svc-body">{svc.body}</p>
                <p className="svc-tech">
                  <span className="k">STACK //</span>
                  {svc.tech}
                </p>
              </div>
            </ServicePanel>
          ))}
        </ReelTrack>
      </ReelWindow>
    </ReelWrap>
  )
}

export default ServicesReel
