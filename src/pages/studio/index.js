import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import SEO from '../../elements/seo'
import ContentPage from '../../templates/content-page'
import {isSmallScreen} from '../../utils'
import ContentBlock from '../../components/content-block'
import PageTitle from '../../components/page-title'
import Footer from '../../components/footer'
import StudioSection from './studio-section'
import './index.scss'

// awards {
//   name
//   image {
//     childImageSharp {
//       fluid(maxWidth: 480) {
//         ...GatsbyImageSharpFluid
//         presentationWidth
//         presentationHeight
//       }
//     }
//   }
//   years {
//     occurance
//     year
//   }
// }
// brands {
//   childImageSharp {
//     fluid(maxWidth: 480) {
//       ...GatsbyImageSharpFluid
//       presentationWidth
//       presentationHeight
//     }
//   }
// }
const ContactPage = () => {
  const {content} = useStaticQuery(graphql`
    query {
      content: pagesYaml(yamlId: {eq: "studio"}) {
        ...page
        sections {
          title
          title
          sectionTitle {
            heading
            title
          }
          summary
          profiles {
            name
            bio
            title
            location
            initials
            image {
              childImageSharp {
                fluid(maxWidth: 360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          awards {
            name
            image {
              childImageSharp {
                fluid(maxWidth: 480) {
                  ...GatsbyImageSharpFluid
                  presentationWidth
                  presentationHeight
                }
              }
            }
            years {
              occurance
              year
            }
          }
          brands {
            childImageSharp {
              fluid(maxWidth: 480) {
                ...GatsbyImageSharpFluid
                presentationWidth
                presentationHeight
              }
            }
          }
        }
      }
    }
  `)
  const {sections, title, summary} = content
  return (
    <ContentPage
      shouldShowLogo
      logoColor="black"
      menuColor={isSmallScreen() ? 'white' : 'black'}
      headerBackgroundColor={'periwinkle'}
      className="studio-page"
    >
      <SEO
        title="Parts & Labour: People"
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
      <ContentBlock summary={<PageTitle title={title} />} smallSpacing />
      <ContentBlock summary={summary} smallSpacing noJustify smallerFont />

      <div className="line spacing spacing--medium" />

      <div className="studio">
        <div className="studio-container">
          <div className="sections">
            {sections.map((section) => (
              <StudioSection {...section} />
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </ContentPage>
  )
}

export default ContactPage
