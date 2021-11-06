import styled from "styled-components"
import variables from '../../data/variables'
import Img from "gatsby-image"

export const Intro = styled.div`
  padding: 8rem 0 4rem 0;
  text-align: left;
`

export const Header = styled.header`
  text-align: center;
`

export const Title = styled.h1`
  font-size: 3rem;
  text-transform: capitalize;
  font-family: "GT-Walsheim-Pro-Bold";
  text-align: center;
  color: #7f1324;
`

export const HeaderImage =styled(Img)`
  border-radius: 5px;
  box-shadow: 0px 0px 64px rgb(0 0 0 / 6%);
  width: 100%;
  height: 70%;
  margin: 2rem 0;
`

export const ProjectLink = styled.a`
  /* padding: 0.75rem 0; */
  font-size:1rem;
  font-weight: bold;
  color: ${variables.darkGrey};
`

export const ArticlePost = styled.article`
  margin-bottom: 5rem;
  padding-bottom: 1rem;
  max-width: 60rem;
  margin: auto;
  /* text-align: center; */
  img[src$="imgresponsive"] {
    max-width: 80%;
  }
`
export const SmallText = styled.small`
  font-size: 0.89rem;
  padding-right: 10px;
  font-family: "GT-Walsheim-Pro-Regular";
  > span {
    padding-left: 5px;
    text-align: center;
  }
  text-align: center;
`
export const ArticleBody = styled.div`
  margin-top: 2rem;
  font-size: 1.25rem;
  p {
    font-size: 1.25rem;
    font-family: "GT-Walsheim-Pro-Regular";
  }
  h2 {
    display: inline-block;
    position: relative;
    padding-top: 0.5em;
    padding-bottom: 0.25em;
    transition: all 0.2s ease-out;
    will-change: transform, color;
    font-size: 2rem;
    color: ${variables.primary};
    &:after {
      z-index: 1;
      position: absolute;
      bottom: -1px;
      left: 0;
      content: "";
      display: block;
      width: 100%;
      height: 5px;
      background-color: ${variables.primary};
      transform: scale(0, 1);
      transform-origin: 100% 50%;
      will-change: transform;
      transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1),
        -webkit-transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
    }
    &:hover:after,
    &.active:after {
      background-color: ${variables.primary};
      transform: scale(1);
      transform-origin: 0 50%;
      transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1),
        background-color 0.2s ease-out,
        -webkit-transform 1s cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
`

export const NaviagtionList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5rem;
  grid-row-gap: 5rem;
  list-style: none;
  padding: 0;
  border-top: 4px solid #ff2d2d;
  border-bottom: 4px solid #ff2d2d;
`
export const NaviagtionLi = styled.li`
  padding: 2rem 0;
  &:last-child {
    text-align: right;
  }
  a {
    font-size: 1.3rem;
    font-family: "GT-Walsheim-Pro-Medium";
  }
`
