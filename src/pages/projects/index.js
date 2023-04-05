import {graphql, useStaticQuery} from 'gatsby'
import React from 'react'
import CaseStudies from '../../components/case-studies'
import PageTitle from '../../components/page-title'
import withModal from '../../hooks/with-modal'
import ContentPage from '../../templates/content-page'
import ContentBlock from '../../components/content-block'
import Footer from '../../components/footer'
import SEO from '../../elements/seo'
import Projects from '../../components/projects'

const ProjectsPage = () => {
  const {
    content,
    bmwCaseStudy,
    gotCaseStudy,
    amazonCaseStudy,
    buddyCaseStudy,
    bniceCaseStudy,
    twelveCaseStudy,
    mlfpCaseStudy,
    penCaseStudy,
  } = useStaticQuery(graphql`
    query {
      content: pagesYaml(yamlId: {eq: "case-studies"}) {
        summary
      }
    }
  `)

  return (
    <ContentPage
      className="case-studies-page"
      logoColor={'black'}
      headerBackgroundColor={'eggshell'}
    >
      <SEO
        title="Parts & Labour: Projects"
        description="A multi-platform content company based in LA NYC and Toronto"
        keywords={[
          `Parts`,
          `Labour`,
          `agency`,
          `multi-platform`,
          `nyc`,
          `los angeles`,
          `Toronto`,
        ]}
      />
      <Projects />
    </ContentPage>
  )
}

export default withModal(ProjectsPage, {modalRoot: '#project-info'})
