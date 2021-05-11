import React from 'react'
import styled from '@emotion/styled'
import { graphql } from "gatsby"
import Flex from '../styles/Flex'
// import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import Carousel from '../templates/Carousel'
import Checkout from '../components/Checkout'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css'


const Button = styled.button`
    width: 100%;
    height: 41px;
    border: 1px solid hsla(0,0%,79.6%,.5);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px 16px 0;
    color: #111;
    font-family: Georgia;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: .14px;
    line-height: 18px;
    position: relative;
    cursor: pointer;
        &:focus{
            background: #A1A1A1;
        }
`

const IndividualClothingItem = ({ data, redirectToCheckout }) => {
    const {
        slug,
        price,
        id,
        image,
        size,
        productDescription: { productDescription },
        productName: { productName },
    } = data.contentfulProduct;
    const images = image.map(i => Object.values(i).map(({ url }) => url)).flat()
    const imageRender = images.map((item, index) => <div key={index} data-src={item} alt={index} />)
console.log(size, 'size')
    return (
        <Flex width='100%' justifyAround>
            <Flex width='50%' height='100vh'>
                <AwesomeSlider style={{ width: '100%', height: '100%' }}>
                    {imageRender}
                </AwesomeSlider>
            </Flex>
            <Flex column alignCenter width='45%' height='100vh' padding='1rem'>
                <h2 style={{ fontFamily: 'bangers', marginTop: '1rem', fontSize: '3rem',/*textDecorationLine: 'line-through', textDecorationColor: 'rgb(254, 205, 47)'*/ }}>{productName}</h2><br />
                <hr style={{
                    border: '0.1px solid rgba(254, 205, 47, 0.4)', width: '75%', marginTop: '1rem',
                    marginBottom: '3rem'
                }} />
                <div><p style={{ fontFamily: 'graphikMed', fontSize: '2.4rem' }}>{`£${price}`}</p></div>
                <div><p style={{ fontFamily: 'graphikReg', fontSize: '1rem' }}>{productDescription}</p></div>

                <Flex width='40%' noWrap><Button>S</Button><Button>M</Button><Button>L</Button></Flex>
                {/* <button onClick={() => addItem(product)}>Add to cart</button> */}
                {/* <Checkout/> */}
                <button
                    className="snipcart-add-item"
                    data-item-id={productName}
                    data-item-price={price}
                    data-item-image={images[0]}
                    data-item-url={slug}
                    data-item-name={productName}
                    data-item-custom1-name="Size"
                    data-item-custom1-options="6|6.5|7|7.5|8|8.5|9"
                >
                    Add to cart
                </button>
            </Flex>
        </Flex>
    )
}

export default IndividualClothingItem

export const pageQuery = graphql`
query ($slug: String!){
    contentfulProduct (slug:{eq: $slug }) {
        slug
        id
        image {
          file {
            url
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
        }

`;

