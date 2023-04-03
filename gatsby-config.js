/**
 * @type {import('gatsby').GatsbyConfig}
 */
<<<<<<< HEAD
=======
const path = require(`path`)

>>>>>>> feature/gatsby6
module.exports = {
  siteMetadata: {
    title: `Parts & Labour Website`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    'gatsby-plugin-sass',
<<<<<<< HEAD
    'gatsby-plugin-image',
=======
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
>>>>>>> feature/gatsby6
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
<<<<<<< HEAD
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
=======
    `gatsby-transformer-yaml`,
>>>>>>> feature/gatsby6
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
<<<<<<< HEAD
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
=======
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-plugin-react-helmet`,
>>>>>>> feature/gatsby6
  ],
}
