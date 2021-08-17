import StickyFooter from 'react-sticky-footer';
import { LogoHolder, Footer } from '../components/StyledComponents'
import Flex from '../styles/Flex'
import { navigate } from 'hookrouter'
import styled from '@emotion/styled'
import React, { useContext, useState } from 'react'
import amex from '../assets/amex.png'
import paypal from '../assets/paypal.png'
import visa from '../assets/visa.png'
import { Link } from "gatsby";
import mastercard from '../assets/mastercard.png'
import StoreContext from '../contexts/StoreContext'

const TermsBox = styled.ul`
    display: flex;
    align-items: space-between;
    & > li{
        list-style: none;
        margin: 0 2px;
    }
`
const InnerHolder = styled.div`
    cursor: pointer;
    font-family: bangers;
    font-size: 4rem;
    display: flex;
    text-decoration-line: line-through;
    text-decoration-color: ${props => props.isDark ? '#0131D2' : 'rgb(254, 205, 47)'};
    color: ${props => props.isDark ? 'white' : 'black'};
`
const imageStyle = {
    width: '50px',
    margin: '2%'
}
const FooterNew = () => {
    const {state} = useContext(StoreContext)
   return <Footer isDark={state.isDark}>
        <div style={{width:'33%', display: 'flex', justifyContent: 'center'}}>
        <LogoHolder  style={{ flexDirection: 'column' }}>
            <InnerHolder isDark={state.isDark} onClick={() => navigate('/')}>
                BUTTER KNIFE
                <span style={{ fontFamily: 'Arial', fontSize: '0.7rem' }}>
                    &trade;
                </span>
            </InnerHolder>
            <TermsBox>
                <li><Link className='strike' style={{color: `${state.isDark ? 'white !important' : 'black !important'}`}}to='/terms'>Terms</Link></li>
                <li><Link className='strike' style={{color: `${state.isDark ? 'white !important' : 'black !important'}`}}to='/privacy'>Privacy</Link></li>
                <li><Link className='strike' style={{color: `${state.isDark ? 'white !important' : 'black !important'}`}}to='/about'>About</Link></li>
                <li><Link className='strike' style={{color: `${state.isDark ? 'white !important' : 'black !important'}`}}to='/contact'>Contact</Link></li>
            </TermsBox>
        </LogoHolder>
        </div>
        <Flex justifyCenter alignCenter width='33%'>
            <img style={imageStyle} src={visa} alt='visa' />
            <img style={imageStyle} src={mastercard} alt='mastercard' />
            <img style={imageStyle} src={paypal} alt='paypal' />
            <img style={imageStyle} src={amex} alt='amex' />
        </Flex>
        <Flex style={{padding: '40px', color: `${state.isDark ? 'white' : 'black'}`}}justifyCenter alignCenter width='33%'>
            <p>Copyright © 2021 Butterknife Ltd | All rights reserved | Butterknife Ltd is a company registered in England and Wales with registration number 13373396.</p>
        </Flex>
    </Footer>
}
export default FooterNew