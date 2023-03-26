import {graphql} from 'gatsby'

export const heroImageFragment = graphql`
  fragment heroImage on File {
    childImageSharp {
      fluid(maxWidth: 1920) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
export const posterImageFragment = graphql`
  fragment posterImage on File {
    childImageSharp {
      fluid(maxWidth: 905) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
export const billboardImageFragment = graphql`
  fragment billboardImage on File {
    childImageSharp {
      fluid(maxWidth: 1590) {
        ...GatsbyImageSharpFluid
      }
    }
    extension
    publicURL
  }
`
export const shopImageFragment = graphql`
  fragment shopImage on File {
    childImageSharp {
      fluid(maxWidth: 800) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
export const newsGalleryImageFragment = graphql`
  fragment newsGalleryImage on File {
    childImageSharp {
      fluid(maxWidth: 1350) {
        ...GatsbyImageSharpFluid
      }
    }
    extension
    publicURL
  }
`
export const squareImageFragment = graphql`
  fragment squareImage on File {
    childImageSharp {
      fluid(maxWidth: 1620) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
export const coverImageFragment = graphql`
  fragment coverImage on File {
    childImageSharp {
      fluid(maxWidth: 1400) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const projectFragment = graphql`
  fragment project on ProjectsYaml {
    title
    titleShort
    slug
    client
    clientShort
    credit
    creditSlug
    creditName
    clips
    preview
    synopsis
    video
    category
    poster {
      ...posterImage
    }
    gallery {
      ...heroImage
    }
    imageSquare {
      ...squareImage
    }
    timecode
    year
    month
    day
  }
`

export const directorFragment = graphql`
  fragment director on DirectorsYaml {
    name
    role
    first
    last
    slug
    bio
    clips
    awards {
      fields {
        style
        text
      }
    }
  }
`
