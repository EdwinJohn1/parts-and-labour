import React from 'react'
import SEO from '../../elements/seo'
import Footer from '../../components/footer'
import ContentPage from '../../templates/content-page'
import {isSmallScreen} from '../../utils'
import {useStaticQuery, graphql} from 'gatsby'
import './index.scss'

const ContactPage = () => {
  const {content} = useStaticQuery(graphql`
    query {
      content: pagesYaml(yamlId: {eq: "contact"}) {
        locations {
          slug
          name
          abbreviation
          address {
            street
            city
            state
            zip
            country
          }
          contacts {
            name
            title
            initials
            phone {
              city
              number
            }
            email
          }
        }
      }
    }
  `)
  const {locations} = content
  return (
    <ContentPage
      shouldShowLogo
      logoColor="black"
      menuColor={isSmallScreen() ? 'white' : 'black'}
      headerBackgroundColor="lavender"
      className="contact-page"
    >
      <SEO
        title="Parts & Labour: Contact"
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
      {/*<h1 className="headline">Let’s do something amazing</h1>*/}

      <div className="contact-container">
        <div className="contact-container__section abbreviations">
          {locations.map(({abbreviation}) => {
            return (
              <div className={`abbreviation ${abbreviation.toLowerCase()}`}>
                {abbreviation}
              </div>
            )
          })}
        </div>
        <div class="contact-locations">
          {locations.map(({name, abbreviation, address, contacts}) => {
            return (
              <div className="contact-container__section contact-location">
                <div className="contact-location__container address">
                  <p className="responsive bold location-name">
                    {name} <span className="abbreviation">{abbreviation}</span>
                  </p>
                  <p className="responsive">
                    {address.street} {address.city}
                  </p>
                  <p className="responsive">
                    {address.state} {address.zip}-{address.country}
                  </p>
                </div>
                {contacts.map((contact, index) => {
                  return (
                    <div
                      className="contact-location__container contact"
                      key={index}
                    >
                      <p className="responsive contact__name body-font-bold">
                        {contact.name}
                      </p>
                      <p className="responsive contact__title">
                        {contact.title}
                      </p>
                      {contact.subtitle && (
                        <p className="responsive contact__subtitle">
                          {contact.subtitle}
                        </p>
                      )}
                      {phoneNumber(contact.phone)}
                      {contact.email && (
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      )}
                      {contact.address && <p>{contact.address}</p>}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </ContentPage>
  )
}

export const phoneNumber = (phoneObject) => {
  return phoneObject.map((phone, phoneIndex) => {
    const phoneNumber = String(phone.number)
    const isIntl = phoneNumber.charAt(0) === '1'
    let phoneNumberToUse = isIntl
      ? phoneNumber.substr(1, phoneNumber.length - 1)
      : phoneNumber
    if (isIntl) {
    }
    const formattedNumber = `${
      isIntl ? '+1 ' : ''
    }(${phoneNumberToUse.substring(0, 3)}) ${phoneNumberToUse.substring(
      3,
      6
    )} ${phoneNumberToUse.substring(6, 10)}`
    return (
      <a key={phoneIndex} href={`tel:${phoneNumber}`}>
        {formattedNumber}
      </a>
    )
  })
}

export default ContactPage
