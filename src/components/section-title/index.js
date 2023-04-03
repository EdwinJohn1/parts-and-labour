import React from 'react'

export const SectionTitleSpacingTop = () => (
  <>
    <div className="spacing" />
    <div className="spacing spacing--tiny no-top" />
  </>
)

export const SectionTitleSpacingBottom = () => (
  <>
    <div className="spacing" />
    <div className="spacing spacing--tiny" />
  </>
)

const year = new Date().getFullYear()

const SectionTitle = (props) => {
  return (
    <>
      {!props.noTop && <SectionTitleSpacingTop />}
      <h2 className="section-title centered body-font responsive">
        <span className="cursive-font bold">{props.heading || year}</span>
        <br />
        <span className="standard bold">{props.title}</span>
      </h2>
      {!props.noBottom && <SectionTitleSpacingBottom />}
    </>
  )
}

export default SectionTitle
