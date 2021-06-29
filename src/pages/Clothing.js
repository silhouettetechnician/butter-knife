import React, { useEffect, useState } from 'react';
import { graphql } from "gatsby"
import { Link } from "gatsby"
import ClothingItem from '../templates/ClothingItem'
import FilterBar from '../components/FilterBar'
import Select from "react-select";
import Flex from '../styles/Flex';
import _ from 'lodash'

const Clothing = ({ data }) => {
  const {
    allShopifyProduct
  } = data
  const productNodes = allShopifyProduct.edges.map(edge => {
    return {
      ...edge.node
    }
  })
  const options = [
    {
      value: 'featured',
      label: 'Featured'
    },
    {
      value: 'price low',
      label: 'Price low'
    },
    {
      value: 'price high',
      label: 'Price high'
    },
  ]

  const [priceSort, setPriceSort] = useState('')
  const [search, setSearch] = useState('')
  const [productList, setProductList] = useState(productNodes)
  const productCheckboxes = _.uniqBy(productList, 'productType').map(node => node.productType)
  const coloursCheckboxes = _.uniq(productList.map(i => i.variants.map(variant => variant.selectedOptions[1].value)).map(color => _.uniq(color)).flat())
  const vendorCheckboxes = _.uniqBy(productList, 'vendor').map(node => node.vendor)
  const checkboxesToFilter = { 'Type': productCheckboxes, 'Colour': coloursCheckboxes, 'Brand': vendorCheckboxes }
  const [checkedInputs, setCheckedInputs] = useState({ 'Type': [], 'Colour': [], 'Brand': [] })

  const handleInputChange = (e, key) => {
    if (e.target.checked) {
      return setCheckedInputs({ ...checkedInputs, [key]: [...checkedInputs[key], e.target.value] })
    }
    return setCheckedInputs({ ...checkedInputs, [key]: checkedInputs[key].filter(item => item !== e.target.value) })
  }

  const getItems = () => {
    return productList.filter((product, i) => {
      if(priceSort.value === 'price low') {
        return productList.sort((a,b) => b.priceRange.maxVariantPrice.amount - a.priceRange.maxVariantPrice.amount)
      }
      if(priceSort.value === 'price high') {
        return productList.sort((a,b) => a.priceRange.maxVariantPrice.amount - b.priceRange.maxVariantPrice.amount)
      }
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
    return <Link key={product.id} to={`/clothing/${product.handle}`}><ClothingItem data={productList} title={product.title} description={product.description} src={product.images && product.images[0].originalSrc} price={product.priceRange && Math.round(product.priceRange.maxVariantPrice.amount)} />
    </Link>
  }

  const filteredItems = getItems()
 
  return (
    <>
      <div style={{ height: '50px' }}></div>
      <Select style={{width: '400px'}} options={options} onChange={(values) => setPriceSort(values)} value={priceSort} />
      <Flex width='100%' margin='20px 0 0 0' justifyAround>
        <Flex width='20%' justifyCenter>
          <FilterBar checkboxesToFilter={checkboxesToFilter} handleInputChange={handleInputChange} />
        </Flex>
        <Flex width='75%' margin='20px 0 0 0' justifyAround>
          {filteredItems.map(product => <Product product={product} />)}
          
        </Flex>
      </Flex>
    </>
  )
}

export default Clothing

export const query = graphql`
{
  allShopifyProduct(filter: {tags: {eq: "Clothing"}}) {
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
}`



// import React, { useState, useEffect, useCallback } from 'react';
// /* global instantsearch */
// import { graphql } from "gatsby"
// import ProductHitsWithFilter from '../templates/ProductHitsWithFilter'
// import _ from 'lodash'


// const Clothing = ({ data }) => {
//   return (
//     <>
//       <ProductHitsWithFilter indexName='PRODUCTS' pageHeading='Clothing' />
//     </>
//   )
// }

// export default Clothing

// if(priceSort.value === 'price low') {
//   return productList.sort((a,b) => b.priceRange.maxVariantPrice.amount - a.priceRange.maxVariantPrice.amount).map((i, id) => <Link key={id} to={`/clothing/${i.handle}`}><ClothingItem data={productList} key={id} title={i.title} description={i.description} src={i.images[0].originalSrc} price={Math.round(i.priceRange.maxVariantPrice.amount)} /></Link>)
// }
// if(priceSort.value === 'price high') {
//   return productList.sort((a,b) => a.priceRange.maxVariantPrice.amount - b.priceRange.maxVariantPrice.amount).map((i, id) => <Link key={id} to={`/clothing/${i.handle}`}><ClothingItem data={productList} key={id} title={i.title} description={i.description} src={i.images[0].originalSrc} price={Math.round(i.priceRange.maxVariantPrice.amount)} /></Link>)
// }



