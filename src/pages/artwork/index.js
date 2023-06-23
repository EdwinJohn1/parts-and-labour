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
        <h2>ArtWork</h2>  
        <img src="/images/1.png" />
        <img src="/images/2.png" />
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
