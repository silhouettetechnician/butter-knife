import React from 'react'
import { graphql } from "gatsby"
import Img from "gatsby-image"
import ClothingItem from './ClothingItem'
import styled from '@emotion/styled'
import Flex from '../styles/Flex'
import FilterBar from '../components/FilterBar'

const LogoImage = styled.img`
    object-fit: cover;
    object-position: 15% 40%;
    width:100%;
    height: 280px;
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
    letter-spacing: 3px;
    text-transform: uppercase;
    text-align: center;
    color: white;
    `

const IndividualBrand = ({ pageContext }) => {
  const {
    id,
    slug,
    companyName,
    companyDescription,
    caption,
    logo,
    brandImages,
    product
  } = pageContext;
  console.log(product, 'product')
  return (
    <Flex width='100%'>
        <Flex style={{width:'100%'}}>
        <div style={{position: 'absolute',  background: 'rgba(0,0,0,0.4)', top: '32%', left: '8%'}}>
        <BrandHeading color='white'>{companyName}</BrandHeading>
        <BrandCaption>{caption}</BrandCaption>
        </div>
          <LogoImage src={brandImages[0].file.url} />
        </Flex>
      <Flex width='30%'><FilterBar data={pageContext}/></Flex>
        <Flex justifyCenter alignCenter width='70%'>
        {/* <div style={{background: 'rgba(0,0,0,0.4)'}}> */}
        <BrandHeading align='left' color='black'>{companyName}</BrandHeading>
        <div style={{color: 'black', fontFamily: 'CODE'}}>{companyDescription}</div>
        {product && product.map(i => <ClothingItem data={product} key={id} title={i.productName.productName} description={i.productDescription.productDescription} src={i.image[0].fluid.src} price={i.price}/>)}
        {/* </div> */}
      </Flex>
    </Flex>
  )
}
export default IndividualBrand

export const pageQuery = graphql`
query MyQuery($id: String!) {
  contentfulBrand(id: {eq: $id}){
  id
  caption
  brandImages {
    file {
      url
    }
  }
  companyDescription {
    companyDescription
  }
  companyName {
    companyName
  }
  product{
    slug
    id
    colour
    image {
          fluid {
            src
          }
        }
    productDescription {
          productDescription
        }
    price
    productName {
          productName
        }
  }
  logo{
    file{
      url
    }
  }
}
}
`;