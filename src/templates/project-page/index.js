import React from 'react'
import ContentPage from '../content-page'
import Project from '../../components/project'
import './index.scss'

const ProjectPage = (context) => {
  const {pageContext} = context
  const {project, isPage} = pageContext

  return isPage ? (
    <div className="project-page">
      <ContentPage
        menuColor={project.menuColor}
        logoColor={project.isDark ? 'white' : 'black'}
        headerBackgroundColor={project.background || 'charcoal'}
      >
        <Detail
          {...{
            content: project,
            includeFooter: true,
          }}
        />
      </ContentPage>
    </div>
  ) : (
    <Detail {...context} content={project} />
  )
}

const Detail = (props) => {
  return <Project {...props} />
}

export default ProjectPage
