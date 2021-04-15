import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { graphql } from "gatsby"
import { Link } from "gatsby"
import ClothingItem from '../templates/ClothingItem'
import { navigate, A, useRouteMatch } from 'hookrouter';
import Flex from '../styles/Flex';

const Clothing = ({ data }) => {
    // firebase.initializeApp()
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(false)
    const {
        allContentfulProduct: { nodes: categories },
      } = data
    console.log(categories,'categories')
    return (
        <>
        <div style={{height: '50px'}}></div>
        <Flex margin='20px 0 0 0' justifyAround>
            {/* <ClipLoader size={160} color='FECE2E' loading={loading}/>  */}
             {categories && categories.map((i, id) => {
                return <Link key={id} to={`/clothing/${i.slug}`}><ClothingItem data={categories} key={id} title={i.productName.productName} description={i.productDescription.productDescription} src={i.image[0].fluid.src} price={i.price}/></Link>
            })}
        </Flex>
        </>
    )
}

export default Clothing

export const query = graphql`
{
    allContentfulProduct(filter: {categories: {elemMatch: {title: {title: {eq: "Accessories"}}}}}) {
      nodes {
        slug
        id
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