const path = require(`path`)
require('dotenv').config({
  path: `.env`,
})

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions
  const projectPage = path.resolve(`src/templates/project-page/index.js`)

  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query {
        allProjectsYaml {
          nodes {
            title
            client
            credit
            creditName
            creditSlug
            category
            synopsis
            partners
            year
            month
            gallery {
              childImageSharp {
                fluid(maxWidth: 1590) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
              extension
              publicURL
            }
            galleryAspectRatio
            image {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
            imageSquare {
              childImageSharp {
                fluid(maxWidth: 1620) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
            video
            slug
            timecode
            clips
            cover {
              childImageSharp {
                fluid(maxWidth: 1400) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    `,
    {limit: 1000}
  ).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.allProjectsYaml.nodes.forEach((project) => {
      createPage({
        // Path for this page — required
        path: `projects/project/${project.slug}`,
        component: projectPage,
        context: {
          project,
          isPage: true,
        },
      })
    })
  })
}
