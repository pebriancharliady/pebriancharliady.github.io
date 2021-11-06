import Img from "gatsby-image"
import styled from 'styled-components';
import variables from '../../data/variables';

export const AboutSection = styled.section`
  @media only screen and (min-width: ${variables.breakpointLarge}) {
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    grid-gap: 10rem;
    text-align: left;
  }
`
export const Avatar =styled(Img)`
  border-radius: 5px;
  box-shadow: 0px 0px 64px rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 70%;
  mix-blend-mode: difference;
  @media(max-width: ${variables.breakpointPhone}) {
    opacity:0.3;
  }
`

export const Content = styled.div`
  @media(max-width: ${variables.breakpointPhone}) {
    position: absolute;
    bottom: 0;
    z-index:999;
    margin: 8rem 0;
  }
`

export const Title = styled.h1`
  font-size: 3rem;
  text-transform: capitalize;
  font-family: "GT-Walsheim-Pro-Bold";
  @media(max-width: ${variables.breakpointPhone}) {
    font-size: 2rem;
  }
`
export const TitleMain = styled.h1`
  font-size: 2.7rem;
  text-transform: capitalize;
  font-family: "PermanentMarker-Regular";
  color: #212529;
  @media(max-width: ${variables.breakpointPhone}) {
    font-size: 2rem;
  }
`

export const Text = styled.p`
  @media(max-width: ${variables.breakpointPhone}) {
    font-size: 0.8rem;
  }
  font-size: 1.2rem;
  line-height: 2;
  color: #232323;
  text-transform: capitalize;
  a {
    color: #3F51B5;
    text-decoration: underline;
  }
`
export const SubTitle = styled.h2`
  font-family: "GT-Walsheim-Pro-Medium";
  margin-top: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  word-spacing: 8px;
  @media(min-width: ${variables.breakpointPhone}) {
    font-size: 1.8em;
  }
`