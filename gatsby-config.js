
module.exports = {
    plugins: [
      // ...otherPlugins,
   
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
            "CONTENTFUL_ACCESS_TOKEN"
        ]
        },
      },
          {
            resolve: `gatsby-source-contentful`,
            options: {
              spaceId: process.env.CONTENTFUL_SPACE_ID,
              // Learn about environment variables: https://gatsby.dev/env-vars
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            },
          },
          {
            resolve: `gatsby-source-contentful`,
            options: {
              spaceId: process.env.CONTENTFUL_SPACE_ID,
              // Learn about environment variables: https://gatsby.dev/env-vars
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
              host: `preview.contentful.com`,
            },
          },
          module.exports = {
            plugins: [
              {
                resolve: `gatsby-source-contentful`,
                options: {
                  spaceId: process.env.CONTENTFUL_SPACE_ID,
                  // Learn about environment variables: https://gatsby.app/env-vars
                  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                  downloadLocal: true,
                },
              },
            ],
          }
        ],
      }

  console.log(`Database url is :${process.env.DATABASE_URL}`)