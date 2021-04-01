import StickyFooter from 'react-sticky-footer';
import {LogoHolder} from '../components/StyledComponents'
import {navigate} from 'hookrouter'
import styled from '@emotion/styled'
import React, {useState} from 'react'

const InnerHolder = styled.div`
    cursor: pointer;
    font-family: bangers;
    font-size: 3rem;
    text-decoration-line: line-through;
    text-decoration-color: rgb(254 205 47);
`
const Footer = () => 
    <LogoHolder>
        <InnerHolder onClick={() => navigate('/')}>
             BUTTER KNIFE 
             <span style={{fontFamily: 'Arial', fontSize: '0.7rem'}}>
                 &trade;
            </span>
        </InnerHolder>
    </LogoHolder>

export default Footer