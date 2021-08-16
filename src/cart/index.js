import React, { useContext } from 'react'
import Flex from '../styles/Flex'
import styled from '@emotion/styled'
import StoreContext from '../contexts/Context'
import LineItem from './LineItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from "framer-motion"
import { LogoHolder } from '../components/StyledComponents'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled(Flex)`
max-width: 800px;
width: 100%;
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

  const context = useContext(StoreContext)
  const { checkout } = context.store

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }
  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))
  return (
    <Wrapper justifyAround column alignCenter noWrap isOpen={isOpen} setIsOpen={setIsOpen}>
      <LogoHolder><div onClick={() => navigate('/')} style={{ cursor: 'pointer', fontFamily: 'bangers', fontSize: '2.5rem', textDecorationLine: 'line-through', textDecorationColor: 'rgb(254, 205, 47)' }}> SHOPPING TROLLEY <span style={{ fontFamily: 'Arial', fontSize: '0.7rem' }}>&trade;</span></div></LogoHolder><FontAwesomeIcon style={{ position: 'absolute', top: '0', left: '0', margin: '20px', cursor: 'pointer' }} onClick={() => setIsOpen(false)} icon={faTimes} size='2x' />
      <div style={{ overflow: 'auto', margin: '20px', width: '80%' }}>{checkout.lineItems.length !== 0 ? lineItems : 'Trolley Empty :('}</div>
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
