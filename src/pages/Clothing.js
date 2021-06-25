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
  const [productList, setProductList] = useState(productNodes)
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
  const [priceSort, setPriceSort] = useState(options[0])
  const productCheckboxes = _.uniqBy(productList, 'productType').map(node => node.productType)
  const coloursCheckboxes = _.uniq(productList.map(i => i.variants.map(variant => variant.selectedOptions[1].value)).map(color => _.uniq(color)).flat())
  const vendorCheckboxes = _.uniqBy(productList, 'vendor').map(node => node.vendor)
  const checkboxesToFilter = { 'Type': productCheckboxes, 'Colour': coloursCheckboxes, 'Brand': vendorCheckboxes }
  const [checkedInputs, setCheckedInputs] = useState([])
  console.log(productCheckboxes, 'productCheckboxes')
  console.log(coloursCheckboxes, 'coloursCheckboxes')
  console.log(vendorCheckboxes, 'vendorCheckboxes')
  // useEffect(() => {
  //   if(priceSort.value === 'price low') {
  //     const acsending = productList.sort((a,b) => a.priceRange.maxVariantPrice.amount + b.priceRange.maxVariantPrice.amount)
  //     setProductList(acsending)
  //   }
  //   if(priceSort.value === 'price high') {
  //     const descending = productList.sort((a,b) => a.priceRange.maxVariantPrice.amount - b.priceRange.maxVariantPrice.amount)
  //     setProductList(descending)
  //   }
  // }, [priceSort, setPriceSort])

  // const onSelect = selectedOption => {
  //   if (selectedOption.value === 'price low') {
  //     const acsending = productList.sort((a, b) => a.priceRange.maxVariantPrice.amount + b.priceRange.maxVariantPrice.amount)
  //     setProductList(acsending)
  //   }
  //   if (selectedOption.value === 'price high') {
  //     const descending = productList.sort((a, b) => a.priceRange.maxVariantPrice.amount - b.priceRange.maxVariantPrice.amount)
  //     setProductList(descending)
  //   }
  // }

  const handleInputChange = (event) => {
    setCheckedInputs({ ...checkedInputs, [event.target.value]: event.target.checked })
  }

  const renderItems = () => {
    let hasNoFilters = Object.keys(checkedInputs).length < 1 ||
      Object.keys(checkedInputs).every(value => checkedInputs[value] === false)
    if (hasNoFilters) {
      if(priceSort.value === 'price low') {
        return productList.sort((a,b) => b.priceRange.maxVariantPrice.amount - a.priceRange.maxVariantPrice.amount).map((i, id) => <Link key={id} to={`/clothing/${i.handle}`}><ClothingItem data={productList} key={id} title={i.title} description={i.description} src={i.images[0].originalSrc} price={Math.round(i.priceRange.maxVariantPrice.amount)} /></Link>)
      }
      if(priceSort.value === 'price high') {
        return productList.sort((a,b) => a.priceRange.maxVariantPrice.amount - b.priceRange.maxVariantPrice.amount).map((i, id) => <Link key={id} to={`/clothing/${i.handle}`}><ClothingItem data={productList} key={id} title={i.title} description={i.description} src={i.images[0].originalSrc} price={Math.round(i.priceRange.maxVariantPrice.amount)} /></Link>)
      }
      return productList.map((i, id) => <Link key={id} to={`/clothing/${i.handle}`}><ClothingItem data={productList} key={id} title={i.title} description={i.description} src={i.images[0].originalSrc} price={Math.round(i.priceRange.maxVariantPrice.amount)} /></Link>)
    }

    else {
      let filters = Object.keys(checkedInputs).filter(i => checkedInputs[i] === true)
      console.log(filters, 'filters')
      return productList.map((i, id) => {
        let validItem = filters.includes(itemID => itemID === i.productType || itemID === i.vendor || itemID === i.variants[0].selectedOptions[1].value)
        if (!validItem) return
        
        return <Link key={id} to={`/clothing/${i.handle}`}><ClothingItem data={productList} key={id} title={i.title} description={i.description} src={i.images[0].originalSrc} price={Math.round(i.priceRange.maxVariantPrice.amount)} /></Link>
      })
    }
  }

  return (
    <>
      <div style={{ height: '50px' }}></div>
      <Select style={{width: '400px'}} options={options} onChange={(values) => setPriceSort(values)} value={priceSort} />
      <Flex width='100%' margin='20px 0 0 0' justifyAround>
        <Flex width='20%' justifyCenter>
          <FilterBar checkboxesToFilter={checkboxesToFilter} handleInputChange={handleInputChange} />
        </Flex>
        <Flex width='75%' margin='20px 0 0 0' justifyAround>
          {renderItems()}
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
