const {Storage} = require('@google-cloud/storage')
const {createRemoteFileNode} = require('gatsby-source-filesystem')
const path = require(`path`)
const hash = require(`object-hash`)

require('dotenv').config({
  path: `.env`,
})

const projectId = process.env.GCP_ID
const bucket = process.env.GCP_BUCKET
const storage = new Storage({
  projectId,
  credentials: {
//     client_email: process.env.GCP_CLIENT_EMAIL,
//     private_key: process.env.GCP_PRIVATE_KEY.split('\\n').join('\n'),
  },
})

const getSignedUrl = async (file) => {
  const expiration = Date.now() + 1000 * 60 * 60 // default one-hour

  const signedOptions = {
    version: 'v4',
    action: 'read',
    expires: expiration,
  }
  // console.log('getting signed url for', file)
  return await storage.bucket(bucket).file(file).getSignedUrl(signedOptions)
}

exports.createSchemaCustomization = ({actions, schema}) => {
  const {createTypes} = actions

  const typeDefs = [
    schema.buildObjectType({
      name: `CaseStudiesSection`,
      fields: {
        image: {
          type: 'File',
          resolve: (source, args, context) => {
            if (!source.gcpImage) return
            const id = `case-study-image__${hash(source)}`
            return context.nodeModel.getNodeById({
              id,
              type: 'File',
            })
          },
        },
        gallery: {
          type: '[File]',
          resolve: (source, args, context) => {
            if (!source.gcpGallery) return
            const galleryHash = hash(source)
            const images = source.gcpGallery.map((_img, index) => {
              const id = `case-study-gallery__${galleryHash}-${index}`
              return context.nodeModel.getNodeById({
                id,
                type: 'File',
              })
            })
            return images
          },
        },
      },
    }),
  ]

  createTypes([
    ...typeDefs,
    `
    type NewsYaml implements Node {
      gcpImage: String
      image: File @link(from: "fields.newsImageFile")
    }

    type CaseStudiesYaml implements Node {
      sections: [CaseStudiesSection]
    }

    type ProjectsYaml implements Node {
      gcpImage: String
      gcpPoster: String
      gcpImageSquare: String
      gcpGallery: [String]
      image: File @link(from: "fields.projectImageFile")
      poster: File @link(from: "fields.projectPosterFile")
      gallery: [File] @link(from: "fields.projectGalleryFile")
      imageSquare: File @link(from: "fields.projectImageSquareFile")
    }
  `,
  ])
}

exports.onCreateNode = async ({
  node,
  actions: {createNode, createNodeField},
  createNodeId,
  getCache,
}) => {
  const createImageFileFromGcb = async ({
    newNode,
    image,
    customCreateNodeId,
  }) => {
    console.log('createImageFileFromGcb:', newNode.slug, image)
    const signedUrl = await getSignedUrl(image)
    if (signedUrl) {
      const signedUrlString = String(signedUrl)
      const fileNode = await createRemoteFileNode({
        url: signedUrlString,
        parentNodeId: newNode.id,
        createNode,
        createNodeId: customCreateNodeId || createNodeId,
        getCache,
      })

      return fileNode
    }
  }

  const createRemoteImageNode = async (
    newNode,
    {image, name, customCreateNodeId}
  ) => {
    const fileNode = await createImageFileFromGcb({
      newNode,
      image,
      customCreateNodeId,
    })
    if (fileNode) {
      // console.log('createRemoteImageNode ', url, name)
      await createNodeField({node: newNode, name, value: fileNode.id})
    }
  }

  const createRemoteImageGalleryNodes = async (
    newNode,
    {images, name, customCreateNodeId}
  ) => {
    const imageNodes = []

    for (let image of images) {
      const fileNode = await createImageFileFromGcb({
        newNode,
        image,
        customCreateNodeId:
          customCreateNodeId && customCreateNodeId(images.indexOf(image)),
      })

      if (fileNode) {
        imageNodes.push(fileNode.id)
      }
      // console.log('creating gallery image from ', name, image)
      await createNodeField({node: newNode, name, value: imageNodes})
    }
  }
  // process logo images
  // if (node.internal.type === 'LogosYaml' && node.gcpImage) {
  //   console.log('process logo image')
  //   await createRemoteImageNode(node, {
  //     image: node.gcpImage,
  //     name: 'logoImageFile',
  //   })
  // }

  // process project poster images
  if (node.internal.type === 'ProjectsYaml' && node.gcpPoster) {
    console.log('process project poster image')
    await createRemoteImageNode(node, {
      image: node.gcpPoster,
      name: 'projectPosterFile',
    })
  }

  // process project hero images
  if (node.internal.type === 'ProjectsYaml' && node.gcpImage) {
    console.log('process project hero image')
    await createRemoteImageNode(node, {
      image: node.gcpImage,
      name: 'projectImageFile',
    })
  }

  // process project square images
  if (node.internal.type === 'ProjectsYaml' && node.gcpImageSquare) {
    console.log('process project square image')
    await createRemoteImageNode(node, {
      image: node.gcpImageSquare,
      name: 'projectImageSquareFile',
    })
  }

  // process project gallery images
  if (node.internal.type === 'ProjectsYaml' && node.gcpGallery) {
    console.log('process project gallery image')
    await createRemoteImageGalleryNodes(node, {
      images: node.gcpGallery,
      name: 'projectGalleryFile',
    })
  }

  // process news item images
  if (node.internal.type === 'NewsYaml' && node.gcpImage) {
    console.log('process news item image')
    await createRemoteImageNode(node, {
      image: node.gcpImage,
      name: 'newsImageFile',
    })
  }

  // process case study images
  if (node.internal.type === 'CaseStudiesYaml' && node.sections) {
    for (let section of node.sections) {
      const id = hash(section)

      if (section.gcpGallery) {
        await createRemoteImageGalleryNodes(node, {
          images: section.gcpGallery,
          name: 'caseStudyGalleryFile',
          customCreateNodeId: (index) => () => {
            return `case-study-gallery__${id}-${index}`
          },
        })
      }
      if (section.gcpImage) {
        await createRemoteImageNode(node, {
          image: section.gcpImage,
          name: 'caseStudyImageFile',
          customCreateNodeId: () => {
            return `case-study-image__${id}`
          },
        })
      }
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
            slug
            creditSlug
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
          slug: project.slug,
          director: project.creditSlug || '',
        },
      })
    })
  })
}
