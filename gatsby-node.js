const {Storage} = require('@google-cloud/storage')
const {createRemoteFileNode} = require('gatsby-source-filesystem')
const path = require(`path`)

require('dotenv').config({
  path: `.env`,
})

const projectId = process.env.GCB_ID
const keyFilename = path.resolve(process.env.GCB_KEY_FILE)
const bucket = process.env.GCB_BUCKET
const storage = new Storage({projectId, keyFilename})

const getSignedUrl = async (file) => {
  const expiration = Date.now() + 1000 * 60 * 60 // default one-hour

  const signedOptions = {
    version: 'v4',
    action: 'read',
    expires: expiration,
  }

  return await storage.bucket(bucket).file(file).getSignedUrl(signedOptions)
}

exports.createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions

  createTypes(`
    type ProjectsYaml implements Node {
      gcbPoster: String
      gcbImage: String
      gcbImageSquare: String
      gcbCoverImage: String
      gcbGallery: [String]
      poster: File @link(from: "fields.posterFile")
      gallery: [File] @link(from: "fields.galleryFile")
      image: File @link(from: "fields.imageFile")
      imageSquare: File @link(from: "fields.imageSquareFile")
      coverImage: File @link(from: "fields.coverFile")
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: {createNode, createNodeField},
  createNodeId,
  getCache,
}) => {
  const tryCreatingFileNode = async (newNode, url) => {
    console.log('tryCreatingFileNode:', newNode.slug, url)
    const signedUrl = await getSignedUrl(url)
    if (signedUrl) {
      const signedUrlString = String(signedUrl)
      const fileNode = await createRemoteFileNode({
        url: signedUrlString,
        parentNodeId: newNode.id,
        createNode,
        createNodeId,
        getCache,
      })
      return fileNode
    }
  }

  const createRemoteImageNode = async (newNode, url, name) => {
    const fileNode = await tryCreatingFileNode(newNode, url)

    if (fileNode) {
      createNodeField({node: newNode, name, value: fileNode.id})
    }
  }

  if (node.internal.type === 'ProjectsYaml' && node.gcbPoster) {
    console.log('generating gcbPoster')
    await createRemoteImageNode(node, node.gcbPoster, 'posterFile')
  }

  if (node.internal.type === 'ProjectsYaml' && node.gcbImage) {
    console.log('generating gcbImage', node.gcbImage)
    await createRemoteImageNode(node, node.gcbImage, 'imageFile')
  }

  if (node.internal.type === 'ProjectsYaml' && node.gcbImageSquare) {
    console.log('generating gcbImageSquare')
    await createRemoteImageNode(node, node.gcbImageSquare, 'imageSquareFile')
  }

  if (node.internal.type === 'ProjectsYaml' && node.gcbCoverImage) {
    console.log('generating gcbCoverImage')
    await createRemoteImageNode(node, node.gcbCoverImage, 'coverFile')
  }

  if (node.internal.type === 'ProjectsYaml' && node.gcbGallery) {
    console.log('generating gcbGallery', node.gcbGallery)
    const imageNodes = []

    for (let image of node.gcbGallery) {
      console.log('creating gallery image')
      const fileNode = await tryCreatingFileNode(node, image)

      if (fileNode) {
        imageNodes.push(fileNode.id)
      }
      createNodeField({node, name: 'galleryFile', value: imageNodes})
    }
  }
}

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
            video
            slug
            timecode
            clips
            poster {
              childImageSharp {
                gatsbyImageData(width: 905, placeholder: BLURRED)
              }
            }
            galleryAspectRatio
            gallery {
              childImageSharp {
                gatsbyImageData(width: 1920, placeholder: BLURRED)
              }
              extension
              publicURL
            }
            coverImage {
              childImageSharp {
                gatsbyImageData(width: 1400, placeholder: BLURRED)
              }
            }
            image {
              childImageSharp {
                gatsbyImageData(width: 1920, placeholder: BLURRED)
              }
            }
            imageSquare {
              childImageSharp {
                gatsbyImageData(width: 1620, placeholder: BLURRED)
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
