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
const productCheckboxes = _.uniqBy(newIn, 'productType').map(node => node.productType)
const coloursCheckboxes = _.uniq(newIn.map(i => i.variants.map(variant => variant.selectedOptions[1].value)).map(color => _.uniq(color)).flat())
const vendorCheckboxes = _.uniqBy(newIn, 'vendor').map(node => node.vendor)
const checkboxesToFilter = { 'Type': productCheckboxes, 'Colour': coloursCheckboxes, 'Brand': vendorCheckboxes }
const [checkedInputs, setCheckedInputs] = useState({ 'Type': [], 'Colour': [], 'Brand': [] })

const handleInputChange = (e, key) => {
  if (e.target.checked) {
    return setCheckedInputs({ ...checkedInputs, [key]: [...checkedInputs[key], e.target.value] })
  }
  return setCheckedInputs({ ...checkedInputs, [key]: checkedInputs[key].filter(item => item !== e.target.value) })
}

const getItems = () => {
  return newIn.filter((product, i) => {
    const type = product && product.productType
    const colour = product && product.variants[0].selectedOptions[1].value
    const brand = product && product.vendor
    const checkedTypes = checkedInputs['Type'].find(t => t === type)
    const checkedColours = checkedInputs['Colour'].find(t => t === colour)
    const checkedBrands = checkedInputs['Brand'].find(t => t === brand)
    const isTypes = checkedInputs['Type'].length >= 1 ? checkedTypes : true
    const isColours = checkedInputs['Colour'].length >= 1 ? checkedColours : true
    const isBrands = checkedInputs['Brand'].length >= 1 ? checkedBrands : true
    return isTypes && isColours && isBrands
  })
}

const Product = (i) => {
  const { product } = i
  return <Link key={product.id} to={`/clothing/${product.handle}`}><ClothingItem data={product} title={product.title} description={product.description} src={product.images && product.images[0].originalSrc} price={product.priceRange && Math.round(product.priceRange.maxVariantPrice.amount)} />
  </Link>
}

const filteredItems = getItems()
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
       {filteredItems && filteredItems.map(product => <Product product={product} />)}
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

