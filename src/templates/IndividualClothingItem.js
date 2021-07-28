import React, { useState, useContext, useCallback, useEffect } from 'react'
import SliderImage from 'react-zoom-slider';
import styled from '@emotion/styled'
import algoliasearch from 'algoliasearch/lite';
import { graphql } from "gatsby"
import find from 'lodash/find'
import StoreContext from '../contexts/StoreContext'
import ImageGallery from 'react-image-gallery';
import Flex from '../styles/Flex'
import DropDownSort from '../components/DropDownSort'
import { notify } from 'react-notify-toast'
import 'react-awesome-slider/dist/styles.css'


// const Button = styled.button`
//     width: 100%;
//     height: 41px;
//     border: 1px solid hsla(0,0%,79.6%,.5);
//     border-radius: 2px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin: 0 8px 16px 0;
//     color: #111;
//     font-family: Georgia;
//     font-size: 14px;
//     font-weight: 400;
//     letter-spacing: .14px;
//     line-height: 18px;
//     position: relative;
//     cursor: pointer;
//         &:focus{
//             background: #A1A1A1;
//         }
// `

const IndividualClothingItem = ({ data, hit }) => {
    const {
        options,
        title,
        description,
        variants,
        images,
        variants: [initialVariant],
        priceRange: { minVariantPrice },
    } = data.shopifyProduct
    const [val, setVal] = useState('Choose size')
    const [variant, setVariant] = useState({ ...initialVariant })
    const [quantity, setQuantity] = useState(1)
    const {
        addVariantToCart,
        store: { client, adding },
    } = useContext(StoreContext)
    
    const productVariant =
        client.product.helpers.variantForOptions(data.shopifyProduct, variant) || variant

    const [available, setAvailable] = useState(productVariant.availableForSale)

    const checkAvailability = useCallback(
        productId => {
            client.product.fetch(productId).then(fetchedProduct => {
                // this checks the currently selected variant for availability
                const result = fetchedProduct.variants.filter(
                    variant => variant.id === productVariant.shopifyId
                )
                if (result.length > 0) {
                    setAvailable(result[0].available)
                }
            })
        },
        [client.product, productVariant.shopifyId]
    )

    useEffect(() => {
        checkAvailability(data.shopifyProduct.shopifyId)
    }, [productVariant, checkAvailability, data.shopifyProduct.shopifyId])

    const handleQuantityChange = ({ target }) => {
        setQuantity(target.value)
    }

    const handleOptionChange = (optionIndex, { target }) => {
        const { value } = target
        const currentOptions = [...variant.selectedOptions]

        currentOptions[optionIndex] = {
            ...currentOptions[optionIndex],
            value,
        }

        const selectedVariant = find(variants, ({ selectedOptions }) =>
            isEqual(currentOptions, selectedOptions)
        )

        setVariant({ ...selectedVariant })
    }

    const handleAddToCart = () => {
        addVariantToCart(val, quantity)
        notify.show(`Added ${val} to trolley`);
        console.log(productVariant.shopifyId)
    }

    const searchClient = algoliasearch(
        'K8SF9T86WY',
        'b88108260d8ff9427171d1937d70e6d8'
    );

    const imagesMap = images.map((i, index) => ({ image: i.originalSrc, text: i.originalSrc }))
    const imageRender = imagesMap.map((item, index) => <ImageGallery key={index} data-src={item} alt={index} />)
    const sizes = variants.map(variant => ({ title: variant.title, id: variant.shopifyId, }))


    return (
        <Flex width='100%' justifyAround>
            <Flex justifyCenter width='60%' height='100vh'>
                <SliderImage data={imagesMap}
                    width="1000px"
                    showDescription={false}
                    direction="right" showPlayButton={false} items={imagesMap} />
            </Flex>
            <Flex column alignCenter width='35%' height='100vh' padding='1rem'>
                <h2 style={{ fontFamily: 'bangers', marginTop: '1rem', fontSize: '3rem',/*textDecorationLine: 'line-through', textDecorationColor: 'rgb(254, 205, 47)'*/ }}>{title}</h2><br />
                <hr style={{
                    border: '0.1px solid rgba(254, 205, 47, 0.4)', width: '75%', marginTop: '1rem',
                    marginBottom: '3rem'
                }} />
                <div><p style={{ fontFamily: 'graphikMed', fontSize: '2.4rem' }}>{`£${Math.round(minVariantPrice.amount)}`}</p></div>
                <div><p style={{ fontFamily: 'graphikReg', fontSize: '1rem' }}>{description}</p></div>
                <DropDownSort data={sizes} val={val} setVal={setVal} />
                <button
                    type="submit"
                    onClick={handleAddToCart}
                >Add to trolley</button>
            </Flex>
        </Flex>
    )
}

export default IndividualClothingItem

export const pageQuery = graphql`
query ClothinItemQuery($handle: String!){
    shopifyProduct (handle:{eq: $handle }) {
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
        selectedOptions {
            name
            value
          }
      }
    images {
        originalSrc
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
    options {
      values
      name
    }
    }
}

`;
