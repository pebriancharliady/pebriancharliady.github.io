import React from "react"
import { Link } from "gatsby"
import data from "../../../data/data"
import { FrameRoot, TopBar, LogoLink, NavList, Rail, Tick } from "./style"

const Frame = () => (
  <FrameRoot className="hud-frame">
    <TopBar>
      <LogoLink>
        <Link to="/" aria-label={`${data.SiteAuthor} — home`}>
          {data.SiteLogoText}
          <span className="cursor" aria-hidden="true">
            _
          </span>
        </Link>
      </LogoLink>
      <NavList aria-label="Primary">
        <Link to="/works" activeClassName="active" partiallyActive={true}>
          <span className="jp" lang="ja" aria-hidden="true">
            作品
          </span>
          Works
        </Link>
        <Link to="/blog" activeClassName="active" partiallyActive={true}>
          <span className="jp" lang="ja" aria-hidden="true">
            記事
          </span>
          Blog
        </Link>
        <a href={`mailto:${data.SiteContact.email}`}>
          <span className="jp" lang="ja" aria-hidden="true">
            接続
          </span>
          Contact
        </a>
      </NavList>
    </TopBar>

    <Rail $side="left" aria-hidden="true">
      <span className="jp" lang="ja">
        {data.SiteRoleJa}
      </span>
    </Rail>
    <Rail $side="right" aria-hidden="true">
      <span className="jp" lang="ja">
        {data.SiteAuthorJa}
      </span>
    </Rail>

    <Tick $pos="tl" aria-hidden="true" />
    <Tick $pos="tr" aria-hidden="true" />
    <Tick $pos="bl" aria-hidden="true" />
    <Tick $pos="br" aria-hidden="true" />
  </FrameRoot>
)

export default Frame
