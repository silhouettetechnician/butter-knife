import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import Flex from '../styles/Flex'


import StoreContext from '../contexts/Context'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  // flex-wrap: wrap;
  // padding: 2rem 0 2rem 0;
`
export const LineHeading = styled.h4`
  font-family: BerlinXBold;
  text-transform: uppercase;
  font-size: 1rem;
  color: ${props => props.isDark ? 'white' : 'black'};
`
export const Subtitle = styled.h4`
font-family: graphikReg;
font-size: 0.7rem;
color: ${props => props.isDark ? 'white' : 'black'};
`

const LineItem = props => {
  const { item } = props
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = item.variant.image ? (
    <img
      src={item.variant.image.src}
      alt={`${item.title} product shot`}
      height="80px"
    />
  ) : null

  const selectedOptions = item.variant.selectedOptions
    ? item.variant.selectedOptions.map(
      option => `${option.name}: ${option.value} `
    )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
  }

  return (
    <Wrapper style={{color: `${props.isDark ? 'white' : 'black'}`}}>
      {console.log(item)}
      <Link style={{ cursor: 'pointer' }} to={`/clothing/${item.variant.product.handle}/`}>
        <Flex alignCenter>
          {variantImage}
          <Flex column>
          <LineHeading isDark={props.isDark}>
            {item.title}
            {`  `}
            {item.variant.title === !'Default Title' ? item.variant.title : ''}
          </LineHeading>
          <Subtitle isDark={props.isDark}>
            {selectedOptions}<br />
            {`Quantity: ${item.quantity}`}<br/>
            {`Price: ${item.variant.price}`}
          </Subtitle>
          </Flex>
        </Flex>
      </Link>
      <button style={{fontSize: '1.5rem !important', border: 'unset', color: `${props.isDark ? 'white': 'black'}`}}className='strike' onClick={handleRemove}>Remove</button>
    </Wrapper>
  )
}

export default LineItem
