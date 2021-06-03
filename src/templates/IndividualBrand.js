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
    text-align: ${props => props.align || 'center'};
    color: ${props => props.color ? props.color : 'black'};
    `
const BrandCaption = styled.p`
    font-family: BerlinBold;
    font-size: 2rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    color: white;
    `

const IndividualBrand = ({ pageContext, vendor }) => {
  const {
    id,
    slug,
    companyName,
    // vendor,
    companyDescription,
    caption,
    logo,
    brandImages,
    product
  } = pageContext;
  const [data, setData] = useState(pageContext)
  console.log(data, 'data')
  // console.log(data, 'data')
  return (
    <Flex width='100%'>
      <Flex style={{ width: '100%' }}>
        <div style={{ position: 'absolute', background: 'rgba(0,0,0,0.4)', top: '32%', left: '8%' }}>
          <BrandHeading color='white'>{data.companyName}</BrandHeading>
          <BrandCaption>{data.caption}</BrandCaption>
        </div>
        {/* <LogoImage src={data.brandImages[0].file.url} /> */}
      </Flex>
      <Flex width='30%'><FilterBar data={data} /></Flex>
      <Flex justifyCenter alignCenter width='70%'>
        {/* <div style={{background: 'rgba(0,0,0,0.4)'}}> */}
        <BrandHeading align='left' color='black'>{data.companyName}</BrandHeading>
        <div style={{ color: 'black', fontFamily: 'CODE' }}>{data.companyDescription}</div>
        {data.product && data.product.map((i, index) => <Link key={index} to={`/clothing/${i.handle}`}><ClothingItem data={data.product} key={i.handle} title={i.title} description={i.description} src={i.image[0].fluid.src} price={i.price} /></Link>)}
        {/* </div> */}
      </Flex>
    </Flex>
  )
}
export default IndividualBrand

export const pageQuery = graphql`
query MyQuery($vendor: String!) {
  allShopifyProduct(filter: {vendor: {eq: $vendor}}){
      nodes {  
    id
    handle
    description
    shopifyId
    title
    vendor
    variants {
        id
        title
        shopifyId
      }
    images {
        originalSrc
      }
    options {
      values
      name
    }
  }
}
}
`;