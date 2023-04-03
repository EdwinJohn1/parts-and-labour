import React from 'react'
import CaseStudySection from './case-study-section'
import TransitionElement from '../../elements/transition-element'
import ContentBlock from '../content-block'
import './index.scss'

const CaseStudies = ({caseStudies}) => {
  console.log(caseStudies)
  return (
    <div className="case-studies">
      {caseStudies.map((caseStudy, i) => {
        return (
          <TransitionElement
            className="services__item"
            threshold={0.2}
            triggerOnce={true}
          >
            <ContentBlock
              className="case-study-section"
              title={caseStudy.title}
              smallSpacing
              smallerFont
              noJustify
              accordion
              persistAccordionContent
            >
              {caseStudy.sections.map((section) => {
                return <CaseStudySection data={section} />
              })}
              <div className="spacing line spacing-top--medium" />
            </ContentBlock>
          </TransitionElement>
        )
      })}
    </div>
  )
}

export default CaseStudies
