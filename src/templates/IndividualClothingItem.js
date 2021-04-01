import React from 'react'
import styled from '@emotion/styled'
import { graphql } from "gatsby"
import Flex from '../styles/Flex'
import Carousel from '../templates/Carousel'
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
        &:active{
            background: #A1A1A1;
        }
`

const IndividualClothingItem = ({ data }) => {
    const {
        slug,
        price,
        id,
        image,
        productDescription: { productDescription },
        productName: { productName },
    } = data.contentfulProduct;
    const gello = image.map(i => Object.values(i).map(({ src }) => src)).flat()
    const items = gello.map((item, index) => <div data-src={item} alt={index} />)
    return (
        <Flex width='100%' justifyAround>
            <Flex width='40%' height='100vh'>
                <AwesomeSlider style={{ width: '100%', height: '100%' }}>
                    {items}
                </AwesomeSlider>
            </Flex>
            <Flex column alignCenter width='45%' height='100vh' padding='1rem'>
                <h2 style={{ fontFamily: 'bangers', marginTop: '1rem', fontSize: '3rem', /*textDecorationLine: 'line-through', textDecorationColor: 'rgb(254, 205, 47)'*/ }}>{productName}</h2><br />
                <hr style={{
                    border: '0.1px solid rgba(254, 205, 47, 0.4)', width: '75%', marginTop: '1rem',
                    marginBottom: '3rem'
                }} />
                <div><p style={{ fontFamily: 'graphikMed', fontSize: '2.4rem' }}>{`£${price}`}</p></div>
                <div><p style={{ fontFamily: 'graphikReg', fontSize: '1rem' }}>{productDescription}</p></div>
                <Flex width='40%' noWrap><Button>S</Button><Button>M</Button><Button>L</Button></Flex>
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
        }

`;

