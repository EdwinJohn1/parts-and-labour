import {navigate} from 'gatsby'
import React from 'react'
import './index.scss'

const TitleBackButton = ({title, subtitle, onClose, line}) => {
  return (
    <>
      <div className="title-back-button">
        <div
          className={`title-back-button__heading ${
            subtitle ? 'has-subtitle' : ''
          }`}
        >
          <h1 className="title-back-button__title display responsive heading-1--size-2">
            {title}
          </h1>
          {subtitle && (
            <div className="title-back-button__subtitle">
              <p className="responsive">{subtitle}</p>
            </div>
          )}
        </div>
        <p
          className="close"
          onClick={() => (onClose ? onClose() : navigate(-1))}
        />
      </div>
      {(line === undefined || line) && (
        <div className="spacing line spacing--medium" />
      )}
    </>
  )
}

export default TitleBackButton
