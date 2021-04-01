const dotenv = require("dotenv").config()
module.exports = {
  siteMetadata: {
    title: "Butter Knife",
    author: "Timothy Millward",
  },
    plugins: [
      // ...otherPlugins,
      `gatsby-plugin-sass`,
     `gatsby-plugin-layout`,
    
      // {
      //   resolve: "gatsby-plugin-firebase",
      //   options: {
      //     credentials: {
      //       apiKey: "AIzaSyBnQcZS2BjRrw3vNrouMvjwA4RPsJLOElM",
      //       authDomain: "butterknifestore.firebaseapp.com",
      //       databaseURL: "https://butterknifestore-default-rtdb.europe-west1.firebasedatabase.app",
      //       projectId: "butterknifestore",
      //       storageBucket: "butterknifestore.appspot.com",
      //       messagingSenderId: "645660492184",
      //       appId: "1:645660492184:web:11b97d85aae2e61ae36bed",
      //       measurementId: "G-4D0DCRTV07"

      //     }
      //   }
      // },
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
          path: `${__dirname}/src/templates/`,
          name: 'templates',
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
        resolve: `gatsby-plugin-env-variables`,
        options: {
          allowList: ["FIREBASE_API_KEY",
            "FIREBASE_AUTH_DOMAIN",
            "FIREBASE_DATABASE_URL",
            "FIREBASE_PROJECT_ID",
            "FIREBASE_STORAGE_BUCKET",
            "FIREBASE_MESSAGING_SENDER_ID",
            "FIREBASE_APP_ID",
            "CONTENTFUL_ACCESS_TOKEN",
            "CONTENTFUL_SPACE_ID"
        ]
        },
      },
          {
            resolve: `gatsby-source-contentful`,
            options: {
              spaceId: process.env.CONTENTFUL_SPACE_ID,
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
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
    ]}