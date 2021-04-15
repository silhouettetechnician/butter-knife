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
        colour
        price
        productDescription {
          productDescription
        }
        productName{
          productName
        }
        brand {
          companyName {
            id
            companyName
          }
          companyDescription {
            id
            companyDescription
          }
        }
        categories {
          title {
            title
          }
        }
        slug
      }
    }
     allContentfulBrand{
       nodes {
        id
        brandImages {
          file {
            url
          }
        }
        caption
         companyName {
           companyName
         }
         companyDescription {
           companyDescription
         }
         logo{
          file{
            url
          }
        }
        product{
          colour
          slug
          id
          image {
                fluid {
                  src
                }
              }
          productDescription {
                productDescription
              }
          price
          productName {
                productName
              }
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

  const brandsFound = []
  result && result.data.allContentfulBrand.nodes.forEach((node) => {
    if (brandsFound.indexOf(node) === -1) {
      brandsFound.push(node)
    }
  })
  brandsFound.length > 0 && brandsFound.forEach((node) => {
    // console.log(JSON.stringify(node, 'node gatsby.node'))
    createPage({
      path: `/brands/${node.companyName.companyName}`,
      component: brandTemplate,
      context: {
        id: node.id,
        companyName: node.companyName.companyName,
        companyDescription: node.companyDescription.companyDescription,
        logo: node.logo.file.url,
        caption: node.caption,
        brandImages: node.brandImages,
        product: node.product,
      }
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

