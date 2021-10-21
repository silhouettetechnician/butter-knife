
const { createFilePath } = require(`gatsby-source-filesystem`)

const path = require(`path`)
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const brandTemplate = path.resolve('./src/templates/IndividualBrand.js')
    const storeTemplate = path.resolve('./src/templates/IndividualClothingItem.js')
    const blogPostTemplate = path.resolve(`src/templates/BlogTemplate.js`)

    // const resultBlog = await graphql(`
    // {
    //   allMarkdownRemark(
    //     sort: { order: DESC, fields: [frontmatter___date] }
    //     limit: 1000
    //   ) {
    //     edges {
    //       node {
    //         id
    //         frontmatter {
    //           path
    //         }
    //       }
    //     }
    //   }
    // }
    // `)

    // resultBlog.data.allMarkdownRemark.edges.forEach(({ node }) => {
    //   console.log(node, 'node')
    //   createPage({
    //     path: `/blog${node.frontmatter.path}`,
    //     component: blogPostTemplate,
    //     context: {},
    //   })
    // })

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
    edges{
    node {
      id
      title
      handle
      shopifyId
      description
      image {
        originalSrc
      }
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
        priceRangeV2 {
          minVariantPrice {
            amount
          }
        }
        createdAt
      }
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
    resultBrand && resultBrand.data.allShopifyCollection.edges.forEach((node) => {
      if (brandsFound.indexOf(node) === -1) {
        brandsFound.push(node)
      }
    })
    brandsFound.length > 0 && brandsFound.forEach(({node}) => {
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
          brandImage: node.image.originalSrc,
          images: node.products.images,
          // product: node.product,
        }
      })
    })
    return


// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === 'build-html' || stage === 'develop-html') {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /butter-knife/,
//             use: 'null-loader'
//           }
//         ]
//       }
//     });
//   }
// };








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
}