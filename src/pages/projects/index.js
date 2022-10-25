import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  portfolio,
  projects as projectsStyle,
} from "../../styles/projects.module.css"

const Projects = ({ data }) => {
  const projects = data.projects.nodes
  const { contact } = data.contact.siteMetadata
  console.log(projects)

  return (
    <Layout>
      <div className={portfolio}>
        <h2>Portfolio</h2>
        <h3>Projects & Websites I've Created</h3>
        <div className={projectsStyle}>
          {projects.map(project => {
            const image = getImage(
              project.frontmatter.thumb.childImageSharp.gatsbyImageData
            )

            return (
              <Link
                to={`/projects/${project.frontmatter.slug}`}
                key={project.id}
              >
                <div>
                  <GatsbyImage image={image} alt={project.frontmatter.title} />
                  <h3>{project.frontmatter.title}</h3>
                  <p>{project.frontmatter.stack}</p>
                </div>
              </Link>
            )
          })}
        </div>
        <p>Like what you see? Email me at {contact} for a quote!</p>
      </div>
    </Layout>
  )
}

// export page query
export const query = graphql`
  query ProjectsPage {
    projects: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          stack
          slug
          thumb {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
        id
      }
    }

    contact: site {
      siteMetadata {
        contact
      }
    }
  }
`

export default Projects
