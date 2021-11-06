import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { AboutSection, Avatar, TitleMain, Text, Content } from "./style"
import { SectionIntro, ContainerLayout, ResumeButton } from "../common"

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "header-me.png" }) {
        childImageSharp {
          fluid(maxWidth: 450) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <>
      <SectionIntro>
        <ContainerLayout>
          <AboutSection>
            <div>
              <Avatar
                fluid={data.placeholderImage.childImageSharp.fluid}
                alt="user photo"
              />
              {/* <SubTitle> Self-Taught Software Developer</SubTitle> */}
            </div>
            <Content>
              <TitleMain>
                <span className="text-primary main-title">P</span>ebrian
                Charliady
              </TitleMain>
              <Text>
                I'm a Self-Taught Software Developer from{" "}
                <b className="text-primary lined-link">Indonesia</b>
              </Text>
              <Text>
                Focused on <b className="text-primary lined-link">solving problem</b> instead of mastering technology
              </Text>
              <Text>
                {" "}
                Experienced building Web and Mobile App using many different
                technologies, but currently love working with <b className="text-primary lined-link"> React & Typescript </b> 
              </Text>
              <ResumeButton to="/works">
                Check out my work
              </ResumeButton>
            </Content>
          </AboutSection>
        </ContainerLayout>
      </SectionIntro>
    </>
  )
}

export default About
