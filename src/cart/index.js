import React, { useContext } from 'react'
import Flex from '../styles/Flex'
import styled from '@emotion/styled'
import StoreContext from '../contexts/StoreContext'
import LineItem from './LineItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from "framer-motion"
import { LogoHolder } from '../components/StyledComponents'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled(Flex)`
max-width: 500px;
height: 600px;
position: fixed;
border-radius: 6px;
box-shadow: 0 0 5px 0 rgba(102, 102, 102, 0.5);
top: 67px;
right: 0;
z-index: 99999;
background-color: #fff;
transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
transition: transform 0.6s ease-in-out !important;  
`
const CartHeading = styled.h2`
font-family: BerlinXBold;
text-transform: uppercase;
font-size: 1.5rem;
// margin: 5px;
  
`

const Cart = ({ isOpen, setIsOpen }) => {

  const {
    store: { checkout },
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))
  console.log(checkout, 'checkout')
  return (
      <Wrapper justifyAround column alignCenter noWrap isOpen={isOpen} setIsOpen={setIsOpen}>
<LogoHolder><div onClick={() => navigate('/')} style={{ cursor: 'pointer', fontFamily: 'bangers', fontSize: '2.5rem', textDecorationLine: 'line-through', textDecorationColor: 'rgb(254, 205, 47)'}}> SHOPPING TROLLEY <span style={{ fontFamily: 'Arial', fontSize: '0.7rem' }}>&trade;</span></div></LogoHolder><FontAwesomeIcon style={{ position: 'absolute', top: '0', left: '0', margin: '3px', cursor: 'pointer' }} onClick={() => setIsOpen(false)} icon={faTimes} size='lg' />
        <div style={{overflow: 'scroll'}}>{checkout.lineItems.length !== 0 ? lineItems : 'There are currently no items in your trolley'}</div>
        {/* <h2>Subtotal</h2>
      <p>$ {checkout.subtotalPrice}</p>
      <br />
      <h2>Taxes</h2>
      <p>$ {checkout.totalTax}</p>*/}
        {/* <br /> */}
        <div>
          <CartHeading>Total: <p>£ {checkout.totalPrice}</p></CartHeading>
        </div>
        <button
          onClick={handleCheckout}
          disabled={checkout.lineItems.length === 0}
        >
          Check out
      </button>
      </Wrapper>
  )
}

export default Cart
