const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, boundActionCreators }) => {
  const { createPage } = actions

  const storeTemplate = path.resolve('./src/templates/IndividualClothingItem.js')
  const brandTemplate = path.resolve('./src/templates/IndividualBrand.js')

  const result = await graphql(`
  {
    allContentfulProduct {
      nodes {
        id
        price
        productDescription {
          productDescription
        }
        productName {
          productName
        }
        slug
      }
    },
    allContentfulBrand {
      nodes {
        companyName {
          companyName
        }
      }
    }
  }
      `)
  result && result.data.allContentfulProduct.nodes.forEach(({ id, slug }) => {
    createPage({
      path: `/clothing/${slug}`,
      component: storeTemplate,
      context: { id: id, slug: slug }
    })
  })

  result && result.data.allContentfulBrand.nodes.forEach(({ node }) => {
      createPage({
        path: `/brands/${node.companyName}`,
        component: brandTemplate,
        context: {companyName: node.companyName}
      })
    })
  return
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}