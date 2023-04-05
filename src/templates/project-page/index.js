import React from 'react'
import ContentPage from '../content-page'
import Project from '../../components/project'
import './index.scss'
import {graphql} from 'gatsby'

const ProjectPage = (props) => {
  const {project, director, directorProjects} = props.data

  return (
    <div className="project-page" key={project.slug}>
      <ContentPage
        menuColor={project.menuColor}
        logoColor={project.isDark ? 'white' : 'black'}
        headerBackgroundColor={project.background || 'charcoal'}
      >
        <Project
          content={project}
          director={director}
          relatedProjects={directorProjects.edges.map(({node}) => node)}
          includeFooter={true}
        />
      </ContentPage>
    </div>
  )
}

export const query = graphql`
  query ($slug: String!, $director: String!) {
    project: projectsYaml(slug: {eq: $slug}) {
      ...project
    }
    director: directorsYaml(slug: {eq: $director}) {
      ...director
    }
    directorProjects: allProjectsYaml(filter: {creditSlug: {eq: $director}}) {
      edges {
        node {
          ...project
        }
      }
    }
  }
`

export default ProjectPage
