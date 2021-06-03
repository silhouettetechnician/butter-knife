import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import Flex from '../styles/Flex'


import StoreContext from '../contexts/StoreContext'

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
`
export const Subtitle = styled.h4`
font-family: graphikReg;
font-size: 0.7rem;
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
    <Wrapper>
      {console.log(item)}
      <Link style={{ cursor: 'pointer' }} to={`/clothing/${item.variant.product.handle}/`}>
        <Flex alignCenter>
          {variantImage}
          <Flex column>
          <LineHeading>
            {item.title}
            {`  `}
            {item.variant.title === !'Default Title' ? item.variant.title : ''}
          </LineHeading>
          <Subtitle>
            {selectedOptions}<br />
            {`Quantity: ${item.quantity}`}<br/>
            {`Price: ${item.variant.price}`}
          </Subtitle>
          </Flex>
        </Flex>
      </Link>
      <button className='strike' onClick={handleRemove}>Remove</button>
    </Wrapper>
  )
}

export default LineItem
