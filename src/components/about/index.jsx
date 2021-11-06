import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { AboutSection, Avatar, Title, Text, SubTitle } from "./style"
import { SectionIntro, ContainerLayout, ResumeButton } from "../common"

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "header-me.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
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
              <SubTitle> Self-Taught Software Developer</SubTitle>
            </div>
            <div>
              <Title> Hi, I’m Pebrian Charliady</Title>
              <Text>
                I'm a Self-Taught Software Developer from {" "}
                <b className="text-primary lined-link">Indonesia</b> living in
                Bandung.
              </Text>
              {/* <Text> I love working with modern technologies, building and designing awesome projects. I prefer minimalistic & clean designs with strong user experience.</Text> */}
              {/* <Text>
                {" "}
                behind the word mountains, far from the countries Vokalia and
                Consonantia, there live the blind texts. Separated they live in
                Bookmarksgrove right at the coast of the Semantics, a large
                language ocean. A small river named Duden flows by their place
                and supplies it with the necessary regelialia.
              </Text> */}
              <ResumeButton href="resume.pdf" target="_blank">
                Check out my resume
              </ResumeButton>
            </div>
          </AboutSection>
        </ContainerLayout>
      </SectionIntro>
    </>
  )
}

export default About
