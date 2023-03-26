import React from 'react'
import {useInView} from 'react-intersection-observer'
import './index.scss'

export const ProjectIntro = (props) => {
  const {ref, inView, entry} = useInView({
    /* Optional options */
    threshold: 0,
    root: props.root,
    triggerOnce: true,
  })

  return (
    <h1 ref={ref} className="project-intro responsive">
      <span className={`project-intro__line ${inView ? 'in-view' : 'hidden'}`}>
        <span
          className={`project-intro__line__parent ${
            inView ? 'in-view' : 'hidden'
          }`}
        >
          <span
            className={`project-intro__line__child ${
              inView ? 'in-view' : 'hidden'
            }`}
          >
            <span className="display-font">PARTS & LABOUR</span>
            <span className="cursive-font bold">™</span>
          </span>
        </span>
      </span>
      <span className={`project-intro__line ${inView ? 'in-view' : 'hidden'}`}>
        <span
          className={`project-intro__line__parent ${
            inView ? 'in-view' : 'hidden'
          }`}
        >
          <span
            className={`project-intro__line__child ${
              inView ? 'in-view' : 'hidden'
            }`}
          >
            <span className="display-font">IS A</span>{' '}
            <span className="standard">‘MULTI DISCIPLINE’</span>
          </span>
        </span>
      </span>
      <span className={`project-intro__line ${inView ? 'in-view' : 'hidden'}`}>
        <span
          className={`project-intro__line__parent ${
            inView ? 'in-view' : 'hidden'
          }`}
        >
          <span
            className={`project-intro__line__child ${
              inView ? 'in-view' : 'hidden'
            }`}
          >
            <span className="bold">CONTENT COMPANY</span>.
          </span>
        </span>
      </span>
    </h1>
  )
}

export default ProjectIntro
