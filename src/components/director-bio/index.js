import React from 'react'
import ContentBlock from '../content-block'
import Footer from '../footer'
import './index.scss'

const awardStyles = {
  bold: 'display',
  italic: 'cursive-font bold normal-case',
  standard: 'standard',
}

export const Bio = (props) => {
  const bioEl = <span className="cursive-font bold bio-text">Bio.</span>
  const {first, last, bio, awards, handleCloseClick} = props
  return (
    <div className="director-bio">
      <div className="director-bio__content">
        <div className="director-bio__header">
          <h1>
            <span>{first}</span>
            {!last && bioEl} {last && <span>{last}</span>}
            {last && bioEl}
          </h1>
          {handleCloseClick && (
            <p className="close" onClick={handleCloseClick} />
          )}
        </div>
        <div className="spacing spacing--medium spacing-top--tiny line" />
        <div className="director-bio__biography">
          <ContentBlock
            divider
            smallerFont
            smallSpacing
            noJustify
            summary={bio}
          />
        </div>
        {awards && (
          <div className="director-bio__awards">
            {awards.map(({fields}, index) => (
              <p key={index} className="responsive display small">
                {fields.map(({style, text}, index2) => (
                  <span key={index + index2} className={awardStyles[style]}>
                    {text}
                  </span>
                ))}
              </p>
            ))}
            <div className="spacing spacing--medium line" />
          </div>
        )}
      </div>
      <div className="director-bio__footer">
        <Footer />
      </div>
    </div>
  )
}

export default Bio
