import React, { useState, useContext, useCallback, useEffect } from 'react'
import isEqual from "lodash/isEqual";
import Select from "react-select";
import DropDown from '../components/DropDownSort'
import Zoom from 'react-medium-image-zoom'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from "gatsby"
import find from 'lodash/find'
import { DescriptionFlex } from '../components/StyledComponents'
import StoreContext from '../contexts/Context'
import Context from '../contexts/StoreContext'
import ImageGallery from 'react-image-gallery';
import Flex from '../styles/Flex'
import VariantSelector from '../components/VariantSelector'
import { Carousel } from 'react-responsive-carousel';
import styled from '@emotion/styled'
import toast, { Toaster } from 'react-hot-toast';

const ArrowStyles = {
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 15px)',
  width: 50,
  height: 50,
  cursor: 'pointer',
}
const ImageFlex = styled(Flex)`
@media (max-width: 800px){
  width: 100%;
}
`
const WrapperResponsive = styled(Flex)`
    flex-direction: row;
    margin-bottom: 50px;
@media (max-width: 800px){
  flex-direction: column;
  margin: 10px;
  width: 100%;
}
`

const IndividualClothingItem = ({ data, hit, ...props }) => {
  const {
    options,
    title,
    description,
    vendor,
    variants,
    images,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = data.shopifyProduct
  const [val, setVal] = useState('')
  const [selectedOptions, setSelectedOptions] = useState({})
  const [variant, setVariant] = useState({ ...initialVariant })
  const product = data.shopifyProduct
  const context = useContext(StoreContext)
  const { state } = useContext(Context)
  const [quantity, setQuantity] = useState(1)
  const { store, addVariantToCart } = context
  const productVariant =
    store.client.product.helpers.variantForOptions(product, variant) ||
    variant
  const [available, setAvailable] = useState(productVariant.availableForSale)
  const checkAvailability = useCallback(
    productId => {
      store.client && store.client.product.fetch(productId).then(fetchedProduct => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.shopifyId
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [store.client.product, productVariant.shopifyId]
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

  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity)
  }


  const imagesMap = images.map((i, index) => ({ image: i.originalSrc, text: i.originalSrc }))
  const imageRender = imagesMap.map((item, index) => <ImageGallery key={index} data-src={item} alt={index} />)
  const sizes = variants.map(variant => ({ title: variant.title, id: variant.shopifyId, }))

  return (
    <WrapperResponsive width='100%' justifyEvenly>
      <Toaster position='top-right' />
      <ImageFlex justifyCenter width='55%'>
        <Carousel
        renderArrowPrev={(onClickHandler, hasPrev, label) => hasPrev && <FontAwesomeIcon style={{...ArrowStyles, left: 15, color: 'rgb(254, 205, 47)'}} onClick={onClickHandler} icon={faAngleLeft}/>}
        renderArrowNext={(onClickHandler, hasNext, label) => hasNext && <FontAwesomeIcon style={{...ArrowStyles, right: 15, color: 'rgb(254, 205, 47)'}} onClick={onClickHandler} icon={faAngleRight}/>} 
        >
          {imagesMap.map(image => (
            <img src={image.image} />
          ))}
        </Carousel>
      </ImageFlex>
      <DescriptionFlex column alignCenter width='35%' height='100%'>
        <h2 style={{ fontFamily: 'bangers', marginTop: '1rem', color: `${state.isDark ? 'white' : 'black'}`, fontSize: '3rem',/*textDecorationLine: 'line-through', textDecorationColor: 'rgb(254, 205, 47)'*/ }}>{title}</h2><br />
        <hr style={{
          border: !state.isDark ? '0.1px solid rgba(254, 205, 47, 0.4)' : '0.1px solid rgb(1, 49, 210)', width: '75%', marginTop: '1rem',
          marginBottom: '3rem'
        }} />
        <div><p style={{ color: `${state.isDark ? 'white' : 'black'}`, fontFamily: 'CODE', fontSize: '2.4rem' }}>{`£${Math.round(minVariantPrice.amount)}`}</p></div>
        <div><p style={{ color: `${state.isDark ? 'white' : 'black'}`, fontFamily: 'CODE', fontSize: '1rem' }}>{description}</p></div>
        {/* <DropDownSort data={options} val={val} variant={variant} handleOptionChange={handleOptionChange} setVal={setVal} /> */}

        {options.map((options, index) => {
          
          return (
            <VariantSelector
              isDark={state.isDark}
              key={options.id.toString()}
              onChange={(e) => handleOptionChange(index, e)}
              index={index}
              options={options}
              fullWidth={options.length > 1}
            />
          )
        })}
        <button
          style={{ fontSize: '25px', border: 'unset', color: `${state.isDark ? 'white' : 'black'}` }}
          type="submit"
          onClick={handleAddToCart}
        >+ Add to trolley</button>
      </DescriptionFlex>
    </WrapperResponsive>
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
