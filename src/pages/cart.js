import React from 'react'
import styled from '@emotion/styled'
import Cart from '../cart/index'

export const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
`
const Box = posed.div({
    visible: { opacity: 1 },
  hidden: { opacity: 0 }
});

const CartPage = (isVisible) => (
  <Box
    pose={isVisible ? 'visible' : 'hidden'}>
    <h1>Cart</h1>
    <Cart />
  </Box>
)

export default CartPage
