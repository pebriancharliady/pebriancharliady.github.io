import React from "react"
import PropTypes from "prop-types"
import { GlobalStyle } from "../common"
import Frame from "./frame"
import Footer from "./footer"
import { Shell } from "./style"

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <Frame />
    <Shell>
      <main>{children}</main>
      <Footer />
    </Shell>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
