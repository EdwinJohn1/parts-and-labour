import {graphql} from 'gatsby'

export const heroImageFragment = graphql`
  fragment heroImage on File {
    childImageSharp {
      gatsbyImageData(width: 1920, placeholder: BLURRED)
    }
  }
`
export const logoImageFragment = graphql`
  fragment logoImage on File {
    childImageSharp {
      gatsbyImageData(width: 600, placeholder: BLURRED)
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

export const squareImageFragment = graphql`
  fragment squareImage on File {
    childImageSharp {
      gatsbyImageData(width: 1620, placeholder: BLURRED)
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
    titles
  }
`

export const newsFragment = graphql`
  fragment news on NewsYaml {
    slug
    date
    title
    category
    year
    description
    meta
    lists {
      titleBold
      subtitle
      items
    }
    region
    language
    image {
      ...squareImage
    }
    runtime
    link
  }
`

export const caseStudyFragment = graphql`
  fragment caseStudy on CaseStudiesYaml {
    slug
    title
    client
    year
    sections {
      title
      location
      date
      image {
        ...squareImage
      }
      gallery {
        ...heroImage
      }
    }
  }
`

export const shopFragment = graphql`
  fragment shop on ShopYaml {
    title
    products {
      name
      variants {
        image {
          ...shopImage
        }
        type
        description
      }
    }
  }
`

export const pageFragment = graphql`
  fragment page on PagesYaml {
    id
    title
    summary
  }
`
