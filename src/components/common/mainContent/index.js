import styled from "styled-components"
import variables from "../../../data/variables"
import bg from "../../../assets/img/new-beg.png"

export const MainContent = styled.div`
  @media (max-width: ${variables.breakpointPhone}) {
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-size: cover;
  }
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #ECEBEB;
`
