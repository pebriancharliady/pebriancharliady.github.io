import styled from "styled-components"
import v from "../../data/variables"

export const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: calc(${v.frameInset} + 52px);
  padding-bottom: ${v.frameInset};

  main {
    flex: 1;
  }

  @media (max-width: ${v.breakpointPhone}) {
    padding-top: calc(${v.frameInsetMobile} + 48px);
    padding-bottom: ${v.frameInsetMobile};
  }
`
