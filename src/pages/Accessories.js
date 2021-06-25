import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Flex from '../styles/Flex'
import ClothingItem from '../templates/ClothingItem'
import FilterBar from '../components/FilterBar'
import _ from 'lodash'

const Accessories = ({ data }) => {

const { allShopifyProduct } = data
const productNodes = allShopifyProduct.edges.map(edge => {
  return {
    ...edge.node
  }
})
const [ accessories, setAccessories ]  = useState(productNodes)
const productCheckboxes = _.uniqBy(accessories, 'productType').map(node => node.productType)
const coloursCheckboxes = _.uniq(accessories.map(i => i.variants.map(variant => variant.selectedOptions[1].value)).map(color => _.uniq(color)).flat())
const vendorCheckboxes = _.uniqBy(accessories, 'vendor').map(node => node.vendor)
const checkboxesToFilter = { 'Type': productCheckboxes, 'Colour': coloursCheckboxes, 'Brand': vendorCheckboxes }
const [checkedInputs, setCheckedInputs] = useState([])

const handleInputChange = (event) => {
  setCheckedInputs({ ...checkedInputs, [event.target.value]: event.target.checked })
}

const renderItems = () => {
let hasNoFilters = Object.keys(checkedInputs).length < 1 || 
  Object.keys(checkedInputs).every(value =>checkedInputs[value] === false)
if(hasNoFilters){
  return accessories.map((i,id) => <Link key={id} to={`/clothing/${i.handle}`}><ClothingItem data={accessories} key={id} title={i.title} description={i.description} src={i.images[0].originalSrc} price={Math.round(i.priceRange.maxVariantPrice.amount)} /></Link>)
}
else{
  let filters = Object.keys(checkedInputs).filter(i => checkedInputs[i] === true)
  return accessories.map((i,id) => {
    let validItem = filters.find(itemID=>itemID === i.productType || itemID === i.vendor || itemID === i.variants[0].selectedOptions[1].value)
    if(!validItem) return
    return <Link key={id} to={`/clothing/${i.handle}`}><ClothingItem data={accessories} key={id} title={i.title} description={i.description} src={i.images[0].originalSrc} price={Math.round(i.priceRange.maxVariantPrice.amount)} /></Link>
  })
}
}
return(
    <>
    <div style={{ height: '50px' }}></div>
    <Flex width='100%' margin='20px 0 0 0' justifyAround>
      {/* <ClipLoader size={160} color='FECE2E' loading={loading}/>  */}
      <Flex width='20%' justifyCenter>
        <FilterBar checkboxesToFilter={checkboxesToFilter} handleInputChange={handleInputChange} />
      </Flex>
      <Flex width='75%' margin='20px 0 0 0' justifyAround>
        {/* {accessories && accessories.edges.map((i, id) => {
          return <Link key={id} to={`/clothing/${i.node.handle}`}><ClothingItem data={accessories} key={id} title={i.node.title} description={i.node.description} src={i.node.images[0].originalSrc} price={Math.round(i.node.priceRange.maxVariantPrice.amount)} /></Link>
        })} */}
        {renderItems()}
      </Flex>
    </Flex>
    </>
)
}

export default Accessories

export const query = graphql`
{
    allShopifyProduct(filter: {tags: {eq: "Accessories"}}) {
      edges {
        node {
          id
          handle
          title
          vendor
          variants {
            id
            price
            title
            product {
              id
              title
            }
            selectedOptions {
              name
              value
            }
          }
          tags
          description
          createdAt
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          productType
          images {
            originalSrc
          }
        }
      }
    }
  }
`



// import React, { useState, useEffect } from 'react';
// import { Card } from 'react-bootstrap';
// import { graphql } from "gatsby"
// import { Link } from "gatsby"
// import ClothingItem from '../templates/ClothingItem'
// import { navigate, A, useRouteMatch } from 'hookrouter';
// import Flex from '../styles/Flex';
// import ProductHitsWithFilter from '../templates/ProductHitsWithFilter'

// const Accessories = ({ data }) => {

//     return (
//         <>
//          <ProductHitsWithFilter indexName='PRODUCTS_accessories' pageHeading='Accessories' />
//         </>
//     )
// }

// export default Accessories
