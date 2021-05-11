import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { graphql } from "gatsby"
import Dropdown from '../components/DropDownSort'
import { Link } from "gatsby"
import ClothingItem from '../templates/ClothingItem'
import FilterBar from '../components/FilterBar'
import Flex from '../styles/Flex';
import _ from 'lodash'

const Clothing = ({ data }) => {
  const {
    allContentfulProduct: { nodes: products },
  } = data

  const productListToSearch = products && products.map((i, key) => ({
    ...i,
    brand: i.brand.companyName.companyName,
    type: i.type,
    colour: i.colour[0]
  }))
  
  const [activeFilter, setActiveFilter] = useState([]);
  const [productList, setProductList] = useState(productListToSearch)
  const [val, setVal] = useState(undefined)
  const [filter, setFilter ] = useState('none')
  const [checked, setChecked] = useState(false)
  const colours = _.uniq(products.map(product => product.colour).flat())
  const types = _.uniq(products.map(product => product.type))
  const brands = _.uniq(products.map(product => product.brand.companyName.companyName))

  let colorData = colours.reduce((acc,curr)=> (acc[curr]=false,acc),{});
  let typesData = types.reduce((acc,curr)=> (acc[curr]=false,acc),{});
  let brandData = brands.reduce((acc,curr)=> (acc[curr]=false,acc),{});
  var totalData = Object.assign({}, colorData, typesData, brandData);
 
  const [checkedInputs, setCheckedInputs] = useState(totalData)
  // const { redirectToCheckout, cartCount } = useShoppingCart()
  useEffect(() => {
    console.log('Checked Inputs', checkedInputs)
    console.log('Product List:', productList)
  }, [checkedInputs, val])
  // console.log(totalPrice, 'totalPrice')
  // console.log(redirectToCheckout, 'redirectToCheckout')
  // console.log(cartCount, 'cartCount')
  const renderItems = () => {
    let hasNoFilters = Object.keys(checkedInputs).length < 1 || 
      Object.keys(checkedInputs).every(value => checkedInputs[value] === false) && val === undefined

    if(hasNoFilters){
      return productList.map((i, id) => <Link key={id} to={`/clothing/${i.slug}`}><ClothingItem data={productList} key={id} title={i.productName.productName} description={i.productDescription.productDescription} src={i.image[0].fluid.src} price={i.price} /></Link>)
    }
    else{
      let filters = Object.keys(checkedInputs).filter(itemID => checkedInputs[itemID] === true)
      console.log(filters, 'filters')
      return productList.map((i, id) => {
      // return 
        let validItem = filters.find(itemID=>itemID === (i.colour || i.type || i.brand))
        console.log(validItem, 'validItem')

        if(!validItem)
          return
        return <Link key={id} to={`/clothing/${i.slug}`}><ClothingItem data={productList} key={id} title={i.productName.productName} description={i.productDescription.productDescription} src={i.image[0].fluid.src} price={i.price} /></Link>
      })
    }
  }  

  return (
    <>
      <Flex justifyEnd style={{ height: '50px' }}> <Dropdown val={val} setVal={setVal}/></Flex>
      <Flex width='100%' margin='20px 0 0 0' justifyAround>
        {/* <ClipLoader size={160} color='FECE2E' loading={loading}/>  */}
        <Flex width='15%' justifyCenter>
          <FilterBar checkedInputs={checkedInputs} setCheckedInputs={setCheckedInputs} checked={checked} setChecked={setChecked} data={totalData} brands={brandData} types={typesData} colours={colorData} activeFilter={activeFilter} setProductList={setProductList} colours={colorData} productList={productList} />
        </Flex>
        <Flex width='80%' margin='20px 0 0 0' justifyAround>
        {renderItems()}
          {/* {productList && productList.map((i, id) => {
            return <Link key={id} to={`/clothing/${i.slug}`}><ClothingItem data={productList} key={id} title={i.productName.productName} description={i.productDescription.productDescription} src={i.image[0].fluid.src} price={i.price} /></Link>
          })} */}
        </Flex>
      </Flex>
    </>
  )
}

export default Clothing

export const query = graphql`
{
    allContentfulProduct(filter: {categories: {elemMatch: {title: {title: {eq: "Clothing"}}}}}) {
      nodes {
        slug
        id
        colour
        type
        image {
          fluid {
            src
          }
        }
        brand {
          companyName {
            companyName
          }
        }
        productDescription {
          productDescription
        }
        categories {
          title {
            title
          }
        }
        price
        productName {
          productName
        }
      }
    }
  }
`