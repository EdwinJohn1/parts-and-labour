import {graphql, useStaticQuery} from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

const SEO = ({description, lang, meta, keywords, title}) => {
  const {site} = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const siteMetadata = site?.siteMetadata

  const metaDescription = description || siteMetadata?.description || ''
  const metaTitle = title || siteMetadata?.title || ''

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      // title={metaTitle}
      // titleTemplate={`%s | ${metaTitle}`}
      // meta={[
      //   {
      //     name: `description`,
      //     content: metaDescription,
      //   },
      //   {
      //     property: `og:title`,
      //     content: metaTitle,
      //   },
      //   {
      //     property: `og:description`,
      //     content: metaDescription,
      //   },
      //   {
      //     property: `og:type`,
      //     content: `website`,
      //   },
      // ]
      //   .concat(
      //     keywords.length > 0
      //       ? {
      //           name: `keywords`,
      //           content: keywords.join(`, `),
      //         }
      //       : []
      //   )
      //   .concat(meta)}
    />
  )
}

export default SEO
