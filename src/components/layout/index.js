import React from "react"
import PropTypes from "prop-types"
import { GlobalStyle } from "../common"
import { ScrollVars, SmoothScroll, CursorLens } from "../fx"
import Frame from "./frame"
import Footer from "./footer"
import { Shell } from "./style"

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <ScrollVars />
    <CursorLens />
    <Frame />
    <SmoothScroll>
      <Shell>
        <main>{children}</main>
        <Footer />
      </Shell>
    </SmoothScroll>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
