import React from "react"
import { EyebrowRoot, SectionHeadRow, PageHeadRoot, Lede } from "./style"

export const Eyebrow = ({ jp, children, ...rest }) => (
  <EyebrowRoot {...rest}>
    {jp && (
      <span className="jp" lang="ja" aria-hidden="true">
        {jp}
      </span>
    )}
    {jp && <span className="sep">/</span>}
    <span>{children}</span>
  </EyebrowRoot>
)

export const SectionHead = ({ jp, title, aside, $paper, ...rest }) => (
  <SectionHeadRow $paper={$paper} {...rest}>
    <Eyebrow jp={jp} $paper={$paper}>
      {title}
    </Eyebrow>
    {aside && <span className="aside">{aside}</span>}
  </SectionHeadRow>
)

export const PageHead = ({ jp, kicker, title, aside, children, ...rest }) => (
  <PageHeadRoot {...rest}>
    <Eyebrow jp={jp}>{kicker}</Eyebrow>
    <h1 className="pg-title">{title}</h1>
    {aside && <div className="pg-aside">{aside}</div>}
    {children && <Lede className="pg-lede">{children}</Lede>}
  </PageHeadRoot>
)

export * from "./style"
