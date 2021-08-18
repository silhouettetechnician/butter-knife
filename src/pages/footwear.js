import React, { useState, useContext } from 'react'
import { graphql, Link } from 'gatsby'
import Flex from '../styles/Flex'
import { PageHeading } from '../components/StyledComponents'
import ClothingItem from '../templates/ClothingItem'
import FilterBar from '../components/FilterBar'
import DropDown from '../components/DropDownSort'
import StoreContext from '../contexts/StoreContext'
import _ from 'lodash'

const Footwear = ({ data }) => {

  const { allShopifyProduct } = data
  const productNodes = allShopifyProduct.edges.map(edge => {
    return {
      ...edge.node
    }
  })
  const [priceSort, setPriceSort] = useState('')
  const [footwear, setFootwear] = useState(productNodes)
  const productCheckboxes = _.uniqBy(footwear, 'productType').map(node => node.productType)
  const coloursCheckboxes = _.uniq(footwear.map(i => i.variants.map(variant => variant.selectedOptions[1].value)).map(color => _.uniq(color)).flat())
  const vendorCheckboxes = _.uniqBy(footwear, 'vendor').map(node => node.vendor)
  const checkboxesToFilter = { 'Type': productCheckboxes, 'Colour': coloursCheckboxes, 'Brand': vendorCheckboxes }
  const [checkedInputs, setCheckedInputs] = useState({ 'Type': [], 'Colour': [], 'Brand': [] })
  const { state } = useContext(StoreContext)
  const handleInputChange = (e, key) => {
    if (e.target.checked) {
      return setCheckedInputs({ ...checkedInputs, [key]: [...checkedInputs[key], e.target.value] })
    }
    return setCheckedInputs({ ...checkedInputs, [key]: checkedInputs[key].filter(item => item !== e.target.value) })
  }

  const getItems = () => {
    return footwear.filter((product, i) => {
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
    return <Link key={product.id} to={`/clothing/${product.handle}`}><ClothingItem data={footwear} title={product.title} description={product.description} src={product.images && product.images[0].originalSrc} price={product.priceRange && Math.round(product.priceRange.maxVariantPrice.amount)} />
    </Link>
  }

  const filteredItems = getItems()

  return (
    <>
      <Flex justifyEnd width='100%'>
      <Flex justifyBetween width='54%'>
        <PageHeading isDark={state.isDark}>Footwear</PageHeading>
        <DropDown priceSort={priceSort} setPriceSort={setPriceSort} />
        </Flex>
      </Flex>
      <Flex width='100%' margin='20px 0 0 0' justifyAround>
        <Flex width='20%' justifyCenter>
          <FilterBar checkboxesToFilter={checkboxesToFilter} handleInputChange={handleInputChange} />
        </Flex>
        <Flex width='75%' margin='20px 0 0 0' justifyAround>
          {filteredItems && filteredItems.sort((a, b) => priceSort.value === 'featured' ? a : priceSort.value === 'price low' ? a.variants[0].price - b.variants[0].price : priceSort.value === 'price high' ? b.variants[0].price - a.variants[0].price : null).map(product => <Product product={product} />)}
        </Flex>
      </Flex>
    </>
  )

}

export default Footwear

export const query = graphql`
{
    allShopifyProduct(filter: {tags: {eq: "Footwear"}}) {
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