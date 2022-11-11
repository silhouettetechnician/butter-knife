import React, { useContext, useState, useCallback } from 'react';
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { PageHeading, ContainerFlex, TitleAndFilter, ContainerFlexHide } from '../components/StyledComponents'
import ClothingItem from '../templates/ClothingItem'
import StoreContext from '../contexts/Context'
import FilterBar from '../components/FilterBar'
import DropDown from '../components/DropDownSort'
import Context from '../contexts/StoreContext'
import Flex from '../styles/Flex';
import _ from 'lodash'

const Womens = ({ data }) => {
  const {
    allShopifyProduct
  } = data
  const productNodes = allShopifyProduct.edges.map(edge => {
    return {
      ...edge.node
    }
  })
  const context = useContext(StoreContext)
  const {
    addVariantToCart,
    client, adding,
  } = context
  const { state } = useContext(Context)
  const [priceSort, setPriceSort] = useState('new')
  const [productList, setProductList] = useState(productNodes)
  // const [priceDetect, setPriceDetect] = useState(false)
  const productCheckboxes = _.uniqBy(productList, 'productType').map(node => node.productType)
  const coloursCheckboxes = _.uniq(productList.map(i => i.variants.map(variant => variant.selectedOptions[1].value)).map(color => _.uniq(color)).flat())
  // const priceRange = productList.sort((a, b) => a.priceRangeV2.maxVariantPrice.amount - b.priceRangeV2.maxVariantPrice.amount)
  // const priceMin = priceRange[0].priceRangeV2.maxVariantPrice.amount
  // const priceMax = priceRange[priceRange.length - 1].priceRangeV2.maxVariantPrice.amount
  // const [price, setPrice] = useState({min: parseInt(priceMin), max: parseInt(priceMax)})
  const vendorCheckboxes = _.uniqBy(productList, 'vendor').map(node => node.vendor)
  const checkboxesToFilter = { 'Type': productCheckboxes, 'Colour': coloursCheckboxes, 'Brand': vendorCheckboxes, }
  const [checkedInputs, setCheckedInputs] = useState({ 'Type': [], 'Colour': [], 'Brand': [] })

  const handleInputChange = (e, key) => {
    if (e.target.checked) {
      return setCheckedInputs({ ...checkedInputs, [key]: [...checkedInputs[key], e.target.value] })
    }
    return setCheckedInputs({ ...checkedInputs, [key]: checkedInputs[key].filter(item => item !== e.target.value) })
  }
  const getItems = () => {
    return productList.filter((product, i) => {
      const type = product && product.productType
      const colour = product && product.variants[0].selectedOptions[1].value
      const brand = product && product.vendor
      // const price = product && product.priceRangeV2.maxVariantPrice.amount
      const checkedTypes = checkedInputs['Type'].find(t => t === type)
      const checkedColours = checkedInputs['Colour'].find(t => t === colour)
      const checkedBrands = checkedInputs['Brand'].find(t => t === brand)
      const isTypes = checkedInputs['Type'].length >= 1 ? checkedTypes : true
      const isColours = checkedInputs['Colour'].length >= 1 ? checkedColours : true
      const isBrands = checkedInputs['Brand'].length >= 1 ? checkedBrands : true
      // const isPrice = priceDetect && product && product.priceRangeV2.maxVariantPrice.amount > price.min ? product : product && product.priceRangeV2.maxVariantPrice.amount < price.max || product
      return isTypes && isColours && isBrands
    })
  }

  const filteredItems = getItems()

  return (
    <>

      <TitleAndFilter justifyBetween width='100%'>
        <div id='content-desktop' style={{ width: '190px' }}></div>
        <PageHeading isDark={state.isDark}>Womens</PageHeading>
        <DropDown priceSort={priceSort} setPriceSort={setPriceSort} />
      </TitleAndFilter>

      <Flex width='100%' margin='20px 0 0 0' justifyAround>
        <ContainerFlexHide width='20%' justifyCenter>
          <FilterBar checkboxesToFilter={checkboxesToFilter} handleInputChange={handleInputChange} />
        </ContainerFlexHide>
        <ContainerFlex justifyAround>
          {filteredItems && filteredItems.sort((a, b) => priceSort === 'new' ? new Date(b.createdAt) - new Date(a.createdAt) : priceSort === 'featured' ? a : priceSort === 'price low' ? a.variants[0].price - b.variants[0].price : priceSort === 'price high' ? b.variants[0].price - a.variants[0].price : null).map((product, index) => (
            <ClothingItem
              key={index}
              product={product}
              href={product.handle}
              vendor={product.vendor}
              data={productList}
              title={product.title}
              description={product.description}
              src={product.images && product.images[0].originalSrc}
              compareAtPrice={product.variants[0].compareAtPrice && Math.round(product.variants[0].compareAtPrice)}
              price={product.priceRangeV2 && Math.round(product.priceRangeV2.maxVariantPrice.amount)} />
          )
          )}
        </ContainerFlex>
      </Flex>
    </>
  )
}

export default Womens

export const query = graphql`
{
  allShopifyProduct(filter: {tags: {eq: "Womens"}}) {
    edges {
      node {
        id
        handle
        title
        vendor
        createdAt
        variants {
          id
          price
          compareAtPrice
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
        priceRangeV2 {
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





