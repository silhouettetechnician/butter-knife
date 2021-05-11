require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: "Butter Knife",
    description: "Brands. Style. Fashion.",
    author: "Timothy Millward",
    keywords: ['clothing', 'concession', 'menswear', 'butter', 'knife', 'butterknife'],
    siteUrl: "https://butterknife.co.uk",
    // defaultImage: "",
    // twitterUsername: "",
},
plugins: [
  // ...otherPlugins,
  `gatsby-plugin-sass`,
  `gatsby-plugin-layout`,
  `gatsby-plugin-fontawesome-css`,
  `gatsby-plugin-image`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  'gatsby-plugin-react-helmet',

  {
    resolve: `gatsby-source-stripe`,
    options: {
      objects: ["Price"],
      secretKey: process.env.STRIPE_SECRET_KEY,
      downloadFiles: true,
    },
  },
  {
    resolve: 'gatsby-plugin-snipcart',
    options: {
        //replace with own Snipcart API key
        apiKey: process.env.GATSBY_SNIPCART_TEST_KEY,
        autopop: true,
    }
},
  { resolve: `gatsby-transformer-remark` },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/src/`,
      name: `src`,
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/src/layouts/`,
      name: 'layouts',
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/src/pages/`,
      name: 'pages',
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/src/templates/`,
      name: 'templates',
    },
  },

  {
    resolve: `gatsby-plugin-env-variables`,
    options: {
      allowList: ["FIREBASE_API_KEY",
        "FIREBASE_AUTH_DOMAIN",
        "STRIPE_SECRET_KEY",
        "FIREBASE_DATABASE_URL",
        "FIREBASE_PROJECT_ID",
        "FIREBASE_STORAGE_BUCKET",
        "FIREBASE_MESSAGING_SENDER_ID",
        "FIREBASE_APP_ID",
        "CONTENTFUL_ACCESS_TOKEN",
        "CONTENTFUL_SPACE_ID",
        "GATSBY_STRIPE_PUBLISHABLE_KEY"
      ]
    },
  },
//   {
//     resolve: 'gatsby-plugin-snipcart',
//     options: {
//         //replace with own Snipcart API key
//         apiKey: 'M2ZlNTg3YjUtMjMwMi00ODkwLWE4YWQtMmQ5MWEwMTRkOWE3NjM3NTIyODkwMjY4NjUxMDgx ',
//         autopop: true,
//     }
// },
  {
    resolve: `gatsby-source-contentful`,
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  },
  {
    resolve: 'gatsby-plugin-mailchimp',
    options: {
      endpoint: "https://butter-knife.us1.list-manage.com/subscribe/post?u=c4c71e9aa1bc1e3413190f30c&amp;id=2d7debe034",
    },
  },
  
  // {
  //   resolve: `gatsby-source-contentful`,
  //   options: {
  //     spaceId: process.env.CONTENTFUL_SPACE_ID,
  //     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  //     host: `preview.contentful.com`,
  //   },
  // },
  //     {
  //       resolve: `gatsby-source-contentful`,
  //       options: {
  //         spaceId: process.env.CONTENTFUL_SPACE_ID,
  //         accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  //         downloadLocal: true,
  //       },
  //     },
]
}