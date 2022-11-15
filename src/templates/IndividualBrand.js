import React from 'react'
import ClothingItem from './ClothingItem'
import styled from '@emotion/styled'
import Flex from '../styles/Flex'

const BrandHeading = styled.p`
    font-family: bangers;
    // font-family: BerlinBold;
    font-size: 3rem;
    text-transform: uppercase;
    text-decoration: underline;
    margin: 0 auto;
    text-align: ${props => props.align || 'center'};
    color: ${props => props.color ? props.color : 'black'};
    `
const BrandCaption = styled.p`
    font-size: ${props => props.dhenze ? '1rem' : '1.3rem'};
    letter-spacing: 1px;
    // text-transform: uppercase;
    text-overflow: ellipsis;
    text-align: center;
    color: white;
    `

const BrandWrapper = styled.div`
    position: relative;
    z-index: 0;
    background-image: ${(props) => props.brandImage && `url(${props.brandImage})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 5;
      background-color: rgba(75, 78, 83, 0.3);
    }
`

const BrandContentWrapper = styled.div`
    position: relative;
    z-index: 5;
    margin: 5%;
`

const IndividualBrand = ({ pageContext }) => {
  const {
    title,
    description,
    products,
    brandImage
  } = pageContext;
  return (
    <Flex width='100%'>
      <BrandWrapper brandImage={brandImage}>
        <BrandContentWrapper>
          <BrandHeading style={{ fontFamily: title === 'Hucci' ? 'caesar' : 'bangers' }} color='white'>{title}</BrandHeading>
          <BrandCaption dhenze={title === 'Dhenze'} style={{ fontFamily: title === 'Hucci' ? 'caesar' : title === '1683 ATELIER' ? 'Fondamento' : 'BerlinBold', fontSize: title === "Hucci" && "1rem" }}>{description}</BrandCaption>
        </BrandContentWrapper>
      </BrandWrapper>
      <Flex justifyEvenly alignEnd width='80%' style={{ margin: '0 auto' }}>
        {/* <div style={{ color: 'black', fontFamily: 'CODE' }}>{data.description}</div> */}
        {products && products.map((product, index) =>
          <ClothingItem
            key={index}
            product={product}
            href={product.handle}
            vendor={product.vendor}
            data={products}
            title={product.title}
            description={product.description}
            src={product.images && product.images[0].originalSrc}
            compareAtPrice={product.variants && Math.round(product.variants[0].compareAtPrice)}
            price={product && product.priceRangeV2.maxVariantPrice.amount} />
        )}
        {/* </div> */}
      </Flex>
    </Flex>
  )
}
export default IndividualBrand