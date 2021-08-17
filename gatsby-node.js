// const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const path = require(`path`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const brandTemplate = path.resolve('./src/templates/IndividualBrand.js')
  const storeTemplate = path.resolve('./src/layouts/IndividualClothingItem.js')
  // Query for all products in Shopify
  const result = await graphql(`
  {
    allShopifyProduct {
      edges {
        node {
          id
          handle
          vendor
        }
      }
    }
  }
`)
  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  result.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/clothing/${node.handle}`,
      component: storeTemplate,
      context: {
        product: node,
        handle: node.handle,
        vendor: node.vendor,
        tags: node.tags

      },
    })
  })
  // exports.createPages = async ({ graphql, actions, boundActionCreators }) => {
  //   const { createPage } = actions

  //   const storeTemplate = path.resolve('./src/templates/IndividualClothingItem.js')
  //   const brandTemplate = path.resolve('./src/templates/IndividualBrand.js')

const resultBrand = await graphql(`
{
  allShopifyCollection {
    nodes {
      id
      title
      handle
      shopifyId
      description
      products {
        description
        handle
        id
        images {
          originalSrc
        }
        internal {
          type
        }
        productType
        title
        vendor
        priceRange {
          minVariantPrice {
            amount
          }
        }
        createdAt
      }
      image {
        src
      }
    }
  }
}
`)

  // result && result.data.allContentfulProduct.nodes.forEach(({ id, slug }) => {
  //   createPage({
  //     path: `/clothing/${slug}`,
  //     component: storeTemplate,
  //     context: { id: id, slug: slug }
  //   })
  // })
  const brandsFound = []
  resultBrand && resultBrand.data.allShopifyCollection.nodes.forEach((node) => {
    if (brandsFound.indexOf(node) === -1) {
      brandsFound.push(node)
    }
  })
  brandsFound.length > 0 && brandsFound.forEach((node) => {
    
    createPage({
      path: `/designers/${node.handle}`,
      component: brandTemplate,
      context: {
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: node.description,
        products: node.products,
        // logo: node.logo.file.url,
        // caption: node.caption,
        brandImage: node.image.src,
        images: node.products.images,
        // product: node.product,
      }
    })
  })
  return

}











  // const brandsFound = []
  // resultBrand && resultBrand.data.allContentfulProduct.nodes.forEach((node) => {
  //   if (brandsFound.indexOf(node) === -1) {
  //     brandsFound.push(node)
  //   }
  // })
  // brandsFound.length > 0 && brandsFound.forEach((node) => {
  //   console.log(JSON.stringify(node, 'node gatsby.node'))
  //   createPage({
  //     path: `/designers/${node.companyName.companyName}`,
  //     component: brandTemplate,
  //     context: {
  //       product: node,
  //       handle: node.product.slug,
  //       vendor: node.companyName.companyName
  //     }
  //   })
  // })
  // return
// }

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        "crypto": false
      },
    },
  })
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





//     allContentfulProduct {
//       nodes {
//         id
//         colour
//         price
//         productDescription {
//           productDescription
//         }
//         productName{
//           productName
//         }
//         brand {
//           companyName {
//             id
//             companyName
//           }
//           companyDescription {
//             id
//             companyDescription
//           }
//         }
//         categories {
//           title {
//             title
//           }
//         }
//         slug
//       }
//     }