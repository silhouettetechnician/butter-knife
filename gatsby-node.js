const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, boundActionCreators }) => {
  const { createPage } = actions
  
  const storeTemplate = path.resolve('src/templates/clothing-item.js')
  const result = await graphql(`
  {
    allContentfulProduct {
      nodes {
        id
        image {
          fluid {
            src
          }
        }
        slug
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
  
      `)
  if (result.errors) {
    console.log(result.errors)
  }
  console.log(result, 'result')
  const products = result.allContentfulProduct

  if (products) {

    return products && products.forEach((edge) => {
      createPage({
        path: '/clothing/',
        component: storeTemplate,
        context: {edge}
      })

    })
  }
  return
}
