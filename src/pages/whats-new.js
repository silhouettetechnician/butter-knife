import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Flex from '../styles/Flex'
import FilterBar from '../components/FilterBar'
import _ from 'lodash'
import ClothingItem from '../templates/ClothingItem'

const WhatsNew = ({ data }) => {

const { allShopifyProduct } = data
const productNodes = allShopifyProduct.edges.map(edge => {
  return {
    ...edge.node
  }
})
const [ newIn, setNewIn ]  = useState(productNodes)
console.log(newIn, 'newIn')
const productCheckboxes = _.uniqBy(newIn, 'productType').map(node => node.productType)
const coloursCheckboxes = _.uniq(newIn.map(i => i.variants.map(variant => variant.selectedOptions[1].value)).map(color => _.uniq(color)).flat())
const vendorCheckboxes = _.uniqBy(newIn, 'vendor').map(node => node.vendor)
const checkboxesToFilter = { 'Type': productCheckboxes, 'Colour': coloursCheckboxes, 'Brand': vendorCheckboxes }

const [checkedInputs, setCheckedInputs] = useState([])

const handleInputChange = (event) => {
  setCheckedInputs({ ...checkedInputs, [event.target.value]: event.target.checked })
}

const renderItems = () => {
let hasNoFilters = Object.keys(checkedInputs).length < 1 || 
  Object.keys(checkedInputs).every(value =>checkedInputs[value] === false)
if(hasNoFilters){
  return newIn.map((i,id) => <Link key={id} to={`/clothing/${i.handle}`}><ClothingItem data={newIn} key={id} title={i.title} description={i.description} src={i.images[0].originalSrc} price={Math.round(i.priceRange.maxVariantPrice.amount)} /></Link>)
}
else{
  let filters = Object.keys(checkedInputs).filter(i => checkedInputs[i] === true)
  return newIn.map((i,id) => {
    let validItem = filters.find(itemID=>itemID === i.productType || itemID === i.vendor || itemID === i.variants[0].selectedOptions[1].value)
    if(!validItem) return
    return <Link key={id} to={`/clothing/${i.handle}`}><ClothingItem data={newIn} key={id} title={i.title} description={i.description} src={i.images[0].originalSrc} price={Math.round(i.priceRange.maxVariantPrice.amount)} /></Link>
  })
}
} 
return(
    <>
    <div style={{ height: '50px' }}></div>
    <Flex width='100%' margin='20px 0 0 0' justifyAround>
      {/* <ClipLoader size={160} color='FECE2E' loading={loading}/>  */}
      <Flex width='20%' justifyCenter>
      <FilterBar checkboxesToFilter={checkboxesToFilter} handleInputChange={handleInputChange}/>
      </Flex>
      <Flex width='75%' margin='20px 0 0 0' justifyAround>
        {/* {newIn && newIn.edges.map((i, id) => {
          return <Link key={id} to={`/clothing/${i.node.handle}`}><ClothingItem data={newIn} key={id} title={i.node.title} description={i.node.description} src={i.node.images[0].originalSrc} price={Math.round(i.node.priceRange.maxVariantPrice.amount)} /></Link>
        })} */}
        {renderItems()}
      </Flex>
    </Flex>
    </>
  )
}

export default WhatsNew

export const query = graphql`
{
  allShopifyProduct(sort: {order: DESC, fields: createdAt}) {
      edges {
        node {
          handle
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
          description
          title
          tags
          vendor
          productType
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          id
          createdAt
          images {
            originalSrc
          }
        }
    }
  }
}
`










// import React, { useState } from 'react';
// import { graphql } from 'gatsby'
// import ProductHitsWithFilter from '../templates/ProductHitsWithFilter'
// // import * as styles from './EmailListForm.module.scss';

// const WhatsNew = () => {
  

//   return (

//    <>
//      {/* <img src='/export butter.png' style={{width: '20%'}}/> */}
//      <ProductHitsWithFilter indexName='PRODUCTS_asc_date' pageHeading='New in'/>
//    </>
//   );
// };
// export default WhatsNew;

