import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { graphql } from "gatsby"
import { Link } from "gatsby"
import ClothingItem from '../templates/ClothingItem'
import FilterBar from '../components/FilterBar'
import Flex from '../styles/Flex';
import _ from 'lodash'

const Clothing = ({ data }) => {
  const {
    allContentfulProduct: { nodes: products },
  } = data
  const [activeFilter, setActiveFilter] = useState([]);
  const [productList, setProductList] = useState(products)

  let filterSet = new Set(activeFilter);

      const handleChange = ((event, text) => {
        if (event.target.checked) {
          setActiveFilter((prev) => prev.concat({text}));
        } else {
          const filteredData = activeFilter.filter(
            (filterValue) => filterValue.text !== text
          );
          setActiveFilter(filteredData);
          console.log(activeFilter, 'ACTIVEFILTER')
          const filteredProducts = productList.filter(product => product.colour.some(color => filterSet.has(color)))
          setProductList(filteredProducts)
          console.log(productList, 'PRODUCTLIST')
        }
      });

  const colours = _.uniq(products.map(product => product.colour).flat())
  return (
    <>
      <div style={{ height: '50px' }}></div>
      <Flex width='100%' margin='20px 0 0 0' justifyAround>
        {/* <ClipLoader size={160} color='FECE2E' loading={loading}/>  */}
        <Flex width='20%' justifyCenter>
          <FilterBar colours={colours} handleChange={handleChange} />
        </Flex>
        <Flex width='75%' margin='20px 0 0 0' justifyAround>
          {productList && productList.map((i, id) => {
            return <Link key={id} to={`/clothing/${i.slug}`}><ClothingItem data={productList} key={id} title={i.productName.productName} description={i.productDescription.productDescription} src={i.image[0].fluid.src} price={i.price} /></Link>
          })}
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