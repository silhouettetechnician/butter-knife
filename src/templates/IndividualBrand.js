import React, { useState } from 'react'
import { graphql } from "gatsby"
import Img from "gatsby-image"
import ClothingItem from './ClothingItem'
import styled from '@emotion/styled'
import Flex from '../styles/Flex'
import FilterBar from '../components/FilterBar'
import { Link } from "gatsby"

const LogoImage = styled.img`
    object-fit: cover;
    object-position: 15% 40%;
    width:100%;
    height: 450px;
    background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    );
`
const BrandHeading = styled.p`
    font-family: BerlinBold;
    font-size: 3rem;
    text-transform: uppercase;
    text-decoration: underline;
    margin: 0 auto;
    text-align: ${props => props.align || 'center'};
    color: ${props => props.color ? props.color : 'black'};
    `
const BrandCaption = styled.p`
    font-family: BerlinBold;
    font-size: 0.7rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    color: white;
    `

const IndividualBrand = ({ pageContext, vendor }) => {
  const {
    id,
    title,
    handle,
    description,
    products,
    images,
    price,
    brandImage
  } = pageContext;
  const [data, setData] = useState(pageContext)
  console.log(data, 'data')
  // console.log(data, 'data')
  return (
    <Flex width='100%'>
      <Flex style={{ width: '100%' }}>
        <div style={{ padding: '15px', width:'600px', position: 'absolute', background: 'rgba(0,0,0,0.4)', top: '32%', left: '8%' }}>
          <BrandHeading color='white'>{data.title}</BrandHeading>
          <BrandCaption>{data.description}</BrandCaption>
        </div>
        <LogoImage src={data.brandImage} />
      </Flex>
      {/* <Flex width='20%'><FilterBar data={data} /></Flex> */}
      <Flex justifyEvenly alignEnd width='80%' style={{margin: '0 auto'}}>
        {/* <div style={{background: 'rgba(0,0,0,0.4)'}}> */}
        {/* <div style={{ color: 'black', fontFamily: 'CODE' }}>{data.description}</div> */}
        {data.products && data.products.map((i, index) => <Link key={index} to={`/clothing/${i.handle}`}><ClothingItem data={data.product} key={i.handle} title={i.title} description={i.description} src={i.images[0].originalSrc} price={i.priceRange.minVariantPrice.amount} /></Link>)}
        {/* </div> */}
      </Flex>
    </Flex>
  )
}
export default IndividualBrand