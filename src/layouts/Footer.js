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

const FooterMobile = styled(Flex)`
    width: 33%;
    @media (max-width: 800px){
        width: 50%;
    }
`
const TermsBox = styled.ul`
    display: flex;
    align-items: space-between;
    padding-left: 5px;
    & > li{
        list-style: none;
        margin: 0 2px;
    }
`
const InnerHolder = styled.div`
    cursor: pointer;
    font-family: bangers;
    font-size: 5vw;
    display: flex;
    text-decoration-line: line-through;
    text-decoration-color: ${props => props.isDark ? '#0131D2' : 'rgb(254, 205, 47)'};
    color: ${props => props.isDark ? 'white' : 'black'};
    @media (max-width: 800px) {
        margin: 15px;
    }
`
const LogoHolderResponsive = styled.div`
    width:33%;
    display: flex;
    justifyContent: center;
    @media (max-width: 800px) {
        width: 50%;
    }
`
const StyledLink = styled(Link)`
    color: ${props => props.isDark ? 'white !important' : 'black !important'};
`

const imageStyle = {
    width: '5vw',
    margin: '2%'
}
const FooterNew = () => {
    const {state} = useContext(StoreContext)
   return <Footer isDark={state.isDark}>
        <LogoHolderResponsive>
        <LogoHolder  style={{ flexDirection: 'column' }}>
            <InnerHolder isDark={state.isDark} onClick={() => navigate('/')}>
                BUTTER KNIFE
                <span style={{ fontFamily: 'Arial', fontSize: '0.7rem' }}>
                    &trade;
                </span>
            </InnerHolder>
            <TermsBox>
                <li><StyledLink isDark={state.isDark}className='strike' to='/terms'>Terms</StyledLink></li>
                <li><StyledLink isDark={state.isDark}className='strike' to='/privacy'>Privacy</StyledLink></li>
                <li><StyledLink isDark={state.isDark}className='strike' to='/about'>About</StyledLink></li>
                <li><a style={{fontFamily: 'CODE', color: `${state.isDark ? 'white' : 'black'}`}} className='strike' href="mailto:timothy.millward@butter-knife.co.uk">Contact</a></li>
            </TermsBox>
        </LogoHolder>
        </LogoHolderResponsive>
        <FooterMobile justifyCenter alignCenter >
            <img style={imageStyle} src={visa} alt='visa' />
            <img style={imageStyle} src={mastercard} alt='mastercard' />
            <img style={imageStyle} src={paypal} alt='paypal' />
            <img style={imageStyle} src={amex} alt='amex' />
        </FooterMobile>
        <Flex id='content-desktop' style={{padding: '10px', color: `${state.isDark ? 'white' : 'black'}`}}justifyCenter alignCenter width='33%'>
            <p>Copyright © 2021 Butterknife Ltd | All rights reserved | Butterknife Ltd is a company registered in England and Wales with registration number 13373396.</p>
        </Flex>
    </Footer>
}
export default FooterNew