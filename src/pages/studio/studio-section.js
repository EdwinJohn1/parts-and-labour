import React from 'react'
import Footer from '../../components/footer'
import ContentBlock from '../../components/content-block'
import SectionTitle from '../../components/section-title'

const StudioSection = ({
  title,
  sectionTitle,
  summary,
  profiles,
  awards,
  brands,
}) => {
  return (
    <div className="studio__section">
      <ContentBlock
        title={title + ':'}
        accordion={true}
        persistAccordionContent={true}
        smallSpacing
        smallerFont
        noJustify
      >
        <SectionTitle
          title={sectionTitle?.title || title}
          heading={sectionTitle?.heading}
          noBottom={awards || brands}
        />
        {summary && (
          <ContentBlock
            summary={summary}
            smallSpacing
            smallerFont
            noJustify
            divider
          />
        )}
        {profiles && (
          <div className="profiles">
            {profiles.map(({initials, name, title, bio, location, image}) => {
              return (
                <div className="studio__profile">
                  <div className="studio__profile__content">
                    <div className="headline">
                      <p className="responsive display smaller-font">{name}</p>
                      <p
                        className="responsive display smaller-font partner justify"
                        dangerouslySetInnerHTML={{
                          __html: title,
                        }}
                      />
                      <p className="responsive display smaller-font location">
                        {location}
                      </p>
                    </div>
                    <div className="bio">
                      <div className="bio__image">
                        {/* <img
                                          src={image.childImageSharp.fluid.src}
                                        /> */}
                        <img />
                      </div>
                      <div className="bio__copy">
                        <p
                          className="justify"
                          dangerouslySetInnerHTML={{
                            __html: bio,
                          }}
                        />
                        <p
                          className="responsive cursive-font bold centered normal-case"
                          style={{margin: '1em 0'}}
                        >
                          {name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {brands && (
          <>
            <div className="logos">
              <div className="logos__list">
                {brands.map((image, i) => {
                  return (
                    <div key={i} className="logos__logo">
                      <div className={`logos__logo__image`}>
                        <img
                          width={image.childImageSharp.fluid.presentationWidth}
                          height={
                            image.childImageSharp.fluid.presentationHeight
                          }
                          src={image.childImageSharp.fluid.src}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="spacing spacing--medium line" />
          </>
        )}
        {awards && (
          <>
            <div className="logos">
              <div className="logos__list">
                {awards.map(({name, classes, image, years}, i) => {
                  return (
                    <div key={i} className="logos__logo">
                      <div
                        className={`logos__logo__image ${(
                          classes || name
                        ).toLowerCase()}`}
                      >
                        <img
                          width={image.childImageSharp.fluid.presentationWidth}
                          height={
                            image.childImageSharp.fluid.presentationHeight
                          }
                          src={image.childImageSharp.fluid.src}
                        />
                      </div>
                      <div className="logos__logo__info">
                        <p className="responsive">
                          <span className="bold">{name}</span>,
                          <br />({' '}
                          {years.map(({occurance, year}, i) => {
                            return (
                              <>
                                {' '}
                                <span
                                  style={{
                                    fontSize: '0.75em',
                                  }}
                                >
                                  x
                                </span>
                                {occurance}{' '}
                                <span className="cursive-font bold">
                                  {year}
                                  {i !== years.length - 1 && ', '}
                                </span>
                              </>
                            )
                          })}{' '}
                          )
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="spacing spacing--medium line" />
          </>
        )}
      </ContentBlock>
    </div>
  )
}

export default StudioSection
