import {graphql} from 'gatsby'

export const heroImageFragment = graphql`
  fragment heroImage on File {
    childImageSharp {
      gatsbyImageData(width: 1920, placeholder: BLURRED)
    }
  }
`
export const posterImageFragment = graphql`
  fragment posterImage on File {
    childImageSharp {
      gatsbyImageData(width: 905, placeholder: BLURRED)
    }
  }
`

export const shopImageFragment = graphql`
  fragment shopImage on File {
    childImageSharp {
      gatsbyImageData(width: 800, placeholder: BLURRED)
    }
  }
`
export const newsGalleryImageFragment = graphql`
  fragment newsGalleryImage on File {
    childImageSharp {
      gatsbyImageData(width: 1350, placeholder: BLURRED)
    }
    extension
    publicURL
  }
`
export const squareImageFragment = graphql`
  fragment squareImage on File {
    childImageSharp {
      gatsbyImageData(width: 1620, placeholder: BLURRED)
    }
  }
`
export const coverImageFragment = graphql`
  fragment coverImage on File {
    childImageSharp {
      gatsbyImageData(width: 1400, placeholder: BLURRED)
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
    image {
      ...heroImage
    }
    coverImage {
      ...coverImage
    }
    category
    poster {
      ...posterImage
    }
    galleryAspectRatio
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
