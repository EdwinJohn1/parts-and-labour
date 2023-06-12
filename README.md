## Introduction

The <b>Parts & Labour</b> website is built with the Gatsby.js frontend framework and is deployed via Netlify. It sources static images from a GCP bucket and video files from Akamai.

Netlify is configured to deploy production builds from the `main` branch.

## 🚀 Get started

This project uses Node v18.12.1. You can automatically set your local Node version using NVM by executing `nvm use` in your terminal.

1.  **Install dependencies**

    ```shell
    npm install
    ```

2.  **Configure local .env file**

    The site requires a .env file populated with specific environment variables in order to source the static images from GCP. Copy/pasge the `.env.sample` file (rename to `.env`) and contact an administrator to fill in the proper values. **Do not fill out and commit the values in .env.sample**.

3.  **Run the project locally**

    ```shell
    npm run start
    ```

    The site is configured to run at at http://localhost:8000 unless otherwise specified.

## Data

All app data is configured in the `src/data` directory and queried using Gatsby's Graphql API.

## Learn More

- [Gatsby Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [NVM](https://github.com/nvm-sh/nvm)
- [Netlify](https://docs.netlify.com/)
