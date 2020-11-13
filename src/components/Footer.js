import StickyFooter from 'react-sticky-footer';
import {LogoHolder} from './StyledComponents'
import {navigate} from 'hookrouter'
import React from 'react'

const Footer = () => (
<StickyFooter
    bottomThreshold={50}
    normalStyles={{
    // backgroundColor: "#114B5F",
    borderTop: '1px solid grey',
    padding: "2rem"
    }}
    stickyStyles={{
    // backgroundColor: "#114B5F",
    borderBottom: '1px solid grey',
    padding: "2rem"
    }}
>
<LogoHolder><div onClick={() => navigate('/')} style={{cursor: 'pointer', fontFamily: 'bangers', fontSize: '3rem', textDecorationLine: 'line-through', textDecorationColor: 'rgb(254, 205, 47)'}}> BUTTER KNIFE <span style={{fontFamily: 'Arial', fontSize: '0.7rem'}}>&trade;</span></div></LogoHolder>
</StickyFooter>
)

export default Footer