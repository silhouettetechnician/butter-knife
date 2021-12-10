require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Butterknife",
    description: "Fashion. Footwear. Luxury",
    author: "Timothy Millward",
    keywords: ['clothing', 'streetwear', 'new designers', 'upcoming brands in the uk', 'butterknife clothing store', 'concession', 'brands', 'designer', 'new', 'menswear', 'butter', 'knife', 'butterknife', 'Butter knife', 'Butterknife', 'womenswear'],
    siteUrl: "https://butterknife.co.uk",
    // defaultImage: "",
    // twitterUsername: "",
  },
  flags: {
    FAST_DEV: true,
    DEV_SSR: true,
  },
  plugins: [
    // ...otherPlugins,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-layout`,
    'gatsby-plugin-dark-mode',
    `gatsby-plugin-fontawesome-css`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-css`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-sitemap`,
      // options: {
      //   output: '/sitemap.xml',
      // },
    },
    // {
    //   resolve: `gatsby-source-contentful`,
    //   options: {
    //     spaceId: process.env.CONTENTFUL_SPACE_ID,
    //     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    //   },
    // },
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
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.SHOPIFY_STORE_URL,
        shopifyConnections: ["collections"],
        // 
        // shopName: process.env.GATSBY_SHOP_NAME,

        // accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
        // paginationSize: 250,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-apollo-shopify',
    //   options: {
    //     shopName: process.env.GATSBY_SHOP_NAME,
    //     accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GA_TRACKING_ID,
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [process.env.GA_TRACKING_ID, process.env.GA_UNIVERSAL_TRACKING_ID],
      },
    },
    // {
    //   resolve: `gatsby-plugin-apollo-shopify`,
    //   options: {
    //     shopName: process.env.GATSBY_SHOP_NAME,
    //     accessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
    //   },
    // },

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
          // 'Accept' : 'application/graphql'
          // 'Content-Type': 'application/graphql',
          // 'Accept': 'application/json'
        },
      },
    },
    { resolve: `gatsby-transformer-remark` },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/_data`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/`,
    //     name: `src`,
    //   }
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/layouts/`,
    //     name: 'layouts',
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/pages/`,
    //     name: 'pages',
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/templates/`,
    //     name: 'templates',
    //   },
    // },

    // {
    //   resolve: `gatsby-plugin-env-variables`,
    //   options: {
    //     allowList: [
    //       "CONTENTFUL_ACCESS_TOKEN",
    //     ]
    //   },
    // },
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

  ]
}
