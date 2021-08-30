import React, { useContext } from 'react'
import Flex from '../styles/Flex'
import styled from '@emotion/styled'
import StoreContext from '../contexts/Context'
import Context from '../contexts/StoreContext'
import LineItem from './LineItem'
import { navigate } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from "framer-motion"
import { LogoHolder } from '../components/StyledComponents'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled(Flex)`
max-width: 600px;
width: 100%;
height: 600px;
position: fixed;
border-radius: 6px;
box-shadow: 0 0 5px 0 rgba(102, 102, 102, 0.5);
top: 67px;
right: 0;
z-index: 99999;
color: ${props => props.isDark ? 'white' : 'black'};
background-color: ${props => props.isDark ? '#1D1D1D' : 'white'};
transform: ${({ isOpen }) => isOpen ? 'translateX(-10px)' : 'translateX(100%)'};
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
  const { state } = useContext(Context)
  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }
  const lineItems = checkout.lineItems.map(item => (
    <LineItem isDark={state.isDark} key={item.id.toString()} item={item} />
  ))
  return (
    <Wrapper isDark={state.isDark} justifyAround column alignCenter noWrap isOpen={isOpen} setIsOpen={setIsOpen}>
      <LogoHolder><div onClick={() => navigate('/')} style={{ color: `${state.isDark ? 'white' : 'black'}`, cursor: 'pointer', fontFamily: 'bangers', fontSize: '2.5rem', textDecorationLine: 'line-through', textDecorationColor: `${state.isDark ? '#0131D2' : 'rgb(254, 205, 47)'}` }}> SHOPPING TROLLEY <span style={{ fontFamily: 'Arial', fontSize: '0.7rem' }}>&trade;</span></div></LogoHolder><FontAwesomeIcon style={{ color: `${state.isDark ? 'white' : 'black'}`, position: 'absolute', top: '0', left: '0', margin: '20px', cursor: 'pointer' }} onClick={() => setIsOpen(false)} icon={faTimes} size='2x' />
      <div style={{ overflow: 'auto', margin: '20px', width: '80%' }}>{checkout.lineItems.length !== 0 ? lineItems : 'Trolley Empty :('}</div>
      <div>
        <CartHeading>Total: <p>£ {checkout.totalPrice}</p></CartHeading>
      </div>
      <button
        style={{ border: 'unset', color: `${state.isDark ? 'white' : '#000'} ` }}
        onClick={handleCheckout}
        disabled={checkout.lineItems.length === 0}
      >
        Check out
      </button>
    </Wrapper>
  )
}

export default Cart
