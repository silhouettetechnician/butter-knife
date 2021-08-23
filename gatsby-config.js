
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const myQuery = `{
  pages: {
  allShopifyProduct {
    edges {
      node {
        objectID: id
        id
        handle
        vendor
      }
    }
  }
}
}`;

const queries = [
  {
    query: myQuery,
    transformer: ({ data }) => data.pages.edges, // optional, // overrides main index name, optional
    /*matchFields: ['slug', 'modified', 'Vendor', 'Tags', 'Option2 Value'],*/ // Array<String> overrides main match fields, optional
  },
];
module.exports = {
  siteMetadata: {
    title: "Butterknife",
    description: "Fashion. Footwear. Luxury",
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
  'gatsby-plugin-dark-mode',
  `gatsby-plugin-fontawesome-css`,
  `gatsby-plugin-image`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  'gatsby-plugin-react-helmet',

  {
    resolve: `gatsby-source-contentful`,
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `BUTTER KNIFE`,
      short_name: `BUTTER KNIFE`,
      start_url: `/`,
      // background_color: `#663399`,
      // theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/favicon-32x32.png`, // This path is relative to the root of the site.
    }
  },
  {
    resolve: `gatsby-source-shopify`,
    options: {
      // The domain name of your Shopify shop.
      shopName: process.env.GATSBY_SHOP_NAME,
      // The storefront access token
      accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
    },
  },
  // {
  //   resolve: `gatsby-plugin-apollo-shopify`,
  //   options: {
  //     shopName: process.env.GATSBY_SHOP_NAME,
  //     accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
  //   },
  // },
  {
    resolve: 'gatsby-plugin-snipcart',
    options: {
        //replace with own Snipcart API key
        apiKey: process.env.GATSBY_SNIPCART_TEST_KEY,
        autopop: true,
    }
},
// {
//   resolve: 'gatsby-plugin-apollo',
//   options: {
//     uri: `https://${process.env.GATSBY_SHOP_NAME}/api/2021-04/graphql`,
//     headers: { 'Content-Type': 'application/graphql',
//     'Accept': 'application/json'
//   }
//   }
// },
{
  resolve: `gatsby-source-graphql`,
  options: {
    typeName: 'Shopify',
    fieldName: 'shopify',
    url: `https://${process.env.GATSBY_SHOP_NAME}.myshopify.com/api/graphql`,
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
      // 'Content-Type': 'application/graphql',
      // 'Accept': 'application/json'
    },
  },
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
        "CONTENTFUL_ENVIRONMENT",
        "GATSBY_STRIPE_PUBLISHABLE_KEY",
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
/*{
   // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
   resolve: `gatsby-plugin-algolia`,
   options: {
     appId: process.env.GATSBY_ALGOLIA_APP_ID,
     // Use Admin API key without GATSBY_ prefix, so that the key isn't exposed in the application
     // Tip: use Search API key with GATSBY_ prefix to access the service from within components
     apiKey: process.env.ALGOLIA_ADMIN_KEY,
     indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
     queries,
     chunkSize: 10000, // default: 1000
     settings: {
       // optional, any index settings
       // Note: by supplying settings, you will overwrite all existing settings on the index
     },
     enablePartialUpdates: true, // default: false
     concurrentQueries: false, // default: true
     skipIndexing: true, // default: false, useful for e.g. preview deploys or local development
     continueOnFailure: false // default: false, don't fail the build if algolia indexing fails
   },
 },*/