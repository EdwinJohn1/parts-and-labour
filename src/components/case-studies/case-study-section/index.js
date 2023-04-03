import React from 'react'
import ProjectBlock from '../../project-block'

const CaseStudySection = ({data}) => {
  const {title, location, image, link, date, gallery} = data

  return (
    <ProjectBlock
      className="case-study-section"
      image={image}
      title={title}
      link={link}
      gallery={gallery}
    >
      <div className="case-study-section__content">
        <p className="responsive">{title}</p>
        <p className="responsive locale-date">
          <span className="display">{location}</span>{' '}
          <span className="cursive-font bold">{date}</span>
        </p>
        {/* <p className="responsive">{client}</p> */}
      </div>
    </ProjectBlock>
  )
}

export default CaseStudySection
