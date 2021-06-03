import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { graphql } from "gatsby"
import { Link } from "gatsby"
import ClothingItem from '../templates/ClothingItem'
import { navigate, A, useRouteMatch } from 'hookrouter';
import Flex from '../styles/Flex';
import ProductHitsWithFilter from '../templates/ProductHitsWithFilter'

const Accessories = ({ data }) => {
    // firebase.initializeApp()
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(false)
    // const {
    //   allShopifyCollection: { nodes: products },
    //   } = data
    //   const productClothingObject = products.find(i => i.title === 'Accessories')
    //   const clothingByCollection = productClothingObject.products
    // console.log(clothingByCollection,'clothingByCollection')
    return (
        <>
         <ProductHitsWithFilter indexName='PRODUCTS_accessories' pageHeading='Accessories' />
        </>
    )
}

export default Accessories

// export const query = graphql`
// {
//   allShopifyCollection(filter: {title: {eq: "Accessories"}}) {
//     nodes {
//       handle
//       description
//       id
//       title
//       products {
//         shopifyId
//         priceRange {
//           maxVariantPrice {
//             amount
//           }
//           minVariantPrice {
//             amount
//           }
//         }
//         description
//         handle
//         id
//         images {
//           originalSrc
//           id
//           localFile {
//             url
//           }
//         }
//         productType
//         title
//         vendor
//         variants {
//           title
//           product {
//             options {
//               values
//               name
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `