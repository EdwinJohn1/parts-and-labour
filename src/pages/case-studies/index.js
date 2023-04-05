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
      bmwCaseStudy: caseStudiesYaml(slug: {eq: "bmw"}) {
        ...caseStudy
      }
      gotCaseStudy: caseStudiesYaml(slug: {eq: "got"}) {
        ...caseStudy
      }
      amazonCaseStudy: caseStudiesYaml(slug: {eq: "amazon"}) {
        ...caseStudy
      }
      buddyCaseStudy: caseStudiesYaml(slug: {eq: "buddy"}) {
        ...caseStudy
      }
      bniceCaseStudy: caseStudiesYaml(slug: {eq: "bnice"}) {
        ...caseStudy
      }
      twelveCaseStudy: caseStudiesYaml(slug: {eq: "twelve"}) {
        ...caseStudy
      }
      mlfpCaseStudy: caseStudiesYaml(slug: {eq: "mlfp"}) {
        ...caseStudy
      }
      penCaseStudy: caseStudiesYaml(slug: {eq: "pen"}) {
        ...caseStudy
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

      <CaseStudies
        caseStudies={[
          bmwCaseStudy,
          gotCaseStudy,
          amazonCaseStudy,
          buddyCaseStudy,
          bniceCaseStudy,
          twelveCaseStudy,
          mlfpCaseStudy,
          penCaseStudy,
        ]}
      />
      <Footer />
    </ContentPage>
  )
}

export default withModal(CaseStudiesPage, {modalRoot: '#project-info'})
