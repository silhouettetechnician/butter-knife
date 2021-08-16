import React, { useState, useContext, useCallback, useEffect } from 'react'
import isEqual from "lodash/isEqual";
import SliderImage from 'react-zoom-slider';
import styled from '@emotion/styled'
import { graphql } from "gatsby"
import find from 'lodash/find'
import StoreContext from '../contexts/Context'
import ImageGallery from 'react-image-gallery';
import Flex from '../styles/Flex'
import VariantSelector from '../components/VariantSelector'
import { notify } from 'react-notify-toast'
import 'react-awesome-slider/dist/styles.css'
import toast, { Toaster } from 'react-hot-toast';

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
    const [val, setVal] = useState('')
    const [selectedOptions, setSelectedOptions] = useState({})
    const [variant, setVariant] = useState({ ...initialVariant })
    const product = data.shopifyProduct
    const [quantity, setQuantity] = useState(1)
    const {
        addVariantToCart,
        client, adding,
    } = useContext(StoreContext)
console.log(client, 'client')

    const productVariant =
    client.product.helpers.variantForOptions(product, variant) ||
    variant

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
        
    }, [productVariant, checkAvailability, data.shopifyProduct.shopifyId, variant])

    useEffect(() => {
        checkAvailability(product.shopifyId)
      }, [productVariant, checkAvailability, product.shopifyId])
    
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

    const handleAddToCart = async() => {
        await addVariantToCart(productVariant.shopifyId, quantity)
    }

    console.log(variant, 'variant')
    console.log(options, 'options')

    const imagesMap = images.map((i, index) => ({ image: i.originalSrc, text: i.originalSrc }))
    const imageRender = imagesMap.map((item, index) => <ImageGallery key={index} data-src={item} alt={index} />)
    const sizes = variants.map(variant => ({ title: variant.title, id: variant.shopifyId, }))

    return (
        <Flex width='100%' justifyAround>
          <Toaster position='top-right'/>
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
                {/* <DropDownSort data={options} val={val} variant={variant} handleOptionChange={handleOptionChange} setVal={setVal} /> */}
                
                {options.map((options, index) => (
                      <div className="column">
                        <VariantSelector
                          key={options.id.toString()}
                          onChange={(e) => handleOptionChange(index, e)}
                          options={options}
                          fullWidth={options.length > 1}
                        />
                      </div>
                    ))}
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
    shopifyId
    options {
      id
      name
      values
    }
    variants {
      id
      title
      price
      availableForSale
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
    }
}

`;
