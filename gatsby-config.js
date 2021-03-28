module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`
      }
    },
    `gatsby-plugin-mdx`
  ]
};
