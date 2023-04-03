import {graphql, useStaticQuery} from 'gatsby'
import React from 'react'
import CaseStudies from '../../components/case-studies'
import PageTitle from '../../components/page-title'
import withModal from '../../hooks/with-modal'
import ContentPage from '../../templates/content-page'
import ContentBlock from '../../components/content-block'
import Footer from '../../components/footer'
import SEO from '../../elements/seo'

const CaseStudiesPage = () => {
  const {caseStudies, content} = useStaticQuery(graphql`
    query {
      content: pagesYaml(id: {eq: "case-studies"}) {
        summary
      }
      caseStudies: allCaseStudiesYaml {
        edges {
          node {
            ...caseStudy
          }
        }
      }
    }
  `)

  return (
    <ContentPage
      className="case-studies-page"
      logoColor={'black'}
      headerBackgroundColor={'goldenrod'}
    >
      <SEO
        title="Parts & Labour: Case Studies"
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
      <ContentBlock summary={<PageTitle title="Case Studies" />} smallSpacing />
      <ContentBlock
        summary={content.summary}
        smallSpacing
        smallerFont
        noJustify
        noPeriodSpace
      />
      <div className="spacing line small spacing--medium" />
      {/*
      <div style={{display: 'block', width: '100%'}}>
        <Reel />
        <div className="spacing line spacing--medium" />
      </div> */}
      <CaseStudies caseStudies={caseStudies} />
      <Footer />
    </ContentPage>
  )
}

export default withModal(CaseStudiesPage, {modalRoot: '#project-info'})
