import React, { useState, useContext } from 'react'
import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby'
import Flex from '../styles/Flex'
import FilterBar from '../components/FilterBar'
import { PageHeading, ContainerFlex, TitleAndFilter, ContainerFlexHide } from '../components/StyledComponents'
import DropDown from '../components/DropDownSort'
import _ from 'lodash'
import ClothingItem from '../templates/ClothingItem'
import StoreContext from '../contexts/StoreContext'
const WhatsNew = ({ data }) => {

  const { allShopifyProduct } = data
  const productNodes = allShopifyProduct.edges.map(edge => {
    return {
      ...edge.node
    }
  })
  const [priceSort, setPriceSort] = useState('')
  const [newIn, setNewIn] = useState(productNodes)
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
    return <Link key={product.id} to={`/clothing/${product.handle}`}><ClothingItem data={product} title={product.title} vendor={product.vendor} description={product.description} src={product.images && product.images[0].originalSrc} price={product.priceRange && Math.round(product.priceRange.maxVariantPrice.amount)} />
    </Link>
  }
  const { state } = useContext(StoreContext)
  const filteredItems = getItems()
  return (
    <>
      <TitleAndFilter justifyBetween width='100%'>
      <div id='content-desktop' style={{width: '190px'}}></div>
          <PageHeading isDark={state.isDark}>What's new</PageHeading>
          <DropDown priceSort={priceSort} setPriceSort={setPriceSort} />
      </TitleAndFilter>
      <Flex width='100%' margin='20px 0 0 0' justifyAround>
        <ContainerFlexHide width='20%' justifyCenter>
          <FilterBar checkboxesToFilter={checkboxesToFilter} handleInputChange={handleInputChange} />
        </ContainerFlexHide>
        <ContainerFlex justifyAround>
          {filteredItems && filteredItems.sort((a, b) => priceSort.value === 'featured' ? a : priceSort.value === 'price low' ? a.variants[0].price - b.variants[0].price : priceSort.value === 'price high' ? b.variants[0].price - a.variants[0].price : null).map(product => <Product product={product} />)}
        </ContainerFlex>
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

