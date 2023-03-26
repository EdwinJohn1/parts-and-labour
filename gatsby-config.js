/**
 * @type {import('gatsby').GatsbyConfig}
 */
const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Parts & Labour Website`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-transformer-yaml`,
    {
      resolve: 'gatsby-source-google-storage',
      options: {
        projectId: 'parts-and-labour',
        keyFilename: path.resolve('gcb-service-account-credentials.json'),
        buckets: ['pal-assets'],
        expiration: Date.now() + 1000 * 60 * 60, // optional, default one-hour
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
