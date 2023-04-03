import React from 'react'
import './index.scss'

const PageTitle = ({
  className,
  titleClassName,
  yearClassName,
  title,
  hideLine,
}) => {
  const year = new Date().getFullYear()
  return (
    <>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
        className={`page-title display responsive ${className || ''}`}
      >
        <span className={titleClassName || 'heading-1--size-1'}>{title}</span>
        <span className={yearClassName || 'date cursive-font bold display'}>
          {year}
        </span>
      </h1>
      {!hideLine && (
        <div className="spacing line spacing--medium spacing-top--small-alt width--fullscreen" />
      )}
    </>
  )
}

export default PageTitle
