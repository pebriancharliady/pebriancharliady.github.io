import styled from 'styled-components';
import variables from '../../../data/variables';
import bg from "../../../assets/img/new-beg.png"

export const MainContent = styled.div`
  @media(min-width: ${variables.breakpointPhone}) {
    /* background: linear-gradient(to bottom,rgb(239 233 233 / 46%),transparent 22%); */
    background: url(${bg});
    background-repeat: no-repeat;
    background-size: contain;
  }
`