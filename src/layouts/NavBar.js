
import React, { useContext, useState } from 'react';
import { AudioPlayerProvider } from "react-use-audio-player"
import reduce from 'lodash/reduce'
import Flex from '../styles/Flex'
import styled from '@emotion/styled'
import Player from '../components/Player'
import { Navigation, Header, LogoHolder, NavMenuItem } from '../components/StyledComponents';
import { useAuth0 } from "@auth0/auth0-react";
import { Link, navigate } from "gatsby";
import StoreContext from '../contexts/StoreContext'
import Trolley from '../assets/shopping-cart.svg'
// import DavidRenderBobbin from '/David_Render_Bobbin.mp3'

const CartCounter = styled.span`
    background-color: white;
    color: #663399;
    border-radius: 20px;
    padding: 0 10px;
    font-size: 1.2rem;
    float: right;
    margin: -10px;
    z-index: 20;
`

const ButtonHolder = styled.div`
    width: auto;
    position: absolute;
    font-family: Berlin !important;
    font-weight: bold;
    right: 0;
    margin: 15px;
`
const Button = styled.button`
    border: 1.5px solid black;
    border-radius: 6px;
    font-weight: bold;
    background: unset;
    padding: 2px;
    width: auto;
    font-size: 1rem;
`
const Anchor = styled(Link)`
    ...NavMenuItem;
`
const useQuantity = () => {
    const {
        store: { checkout },
    } = useContext(StoreContext)
    const items = checkout ? checkout.lineItems : []
    const total = reduce(items, (acc, item) => acc + item.quantity, 0)
    return [total !== 0, total]
}
export const NavBar = ({ open, setOpen, isOpen, setIsOpen, catOpen, setCatOpen }) => {
    const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
    const Divider = () => "|"
    const [hasItems, quantity] = useQuantity()
    console.log(isOpen, 'isOpen in nav')
    return (
        // <div style={{ position: 'relative' }}>
        <>
            <Header >
                <Flex>
                <AudioPlayerProvider>
                    <Player file='/REALOG.mp3' />
                    <ButtonHolder>
                    {isAuthenticated ?
                        <Button onClick={() => logout({ returnTo: window.location.origin })} className='strike'>
                            LOGOUT
                    </Button>
                        :
                        <Button onClick={() => loginWithRedirect()} className='strike'>
                            LOGIN/REGISTER
                    </Button>
                    }
                </ButtonHolder>
                </AudioPlayerProvider>
                </Flex>
                <LogoHolder><div onClick={() => navigate('/')} style={{ cursor: 'pointer', fontFamily: 'bangers', fontSize: '5rem', textDecorationLine: 'line-through', textDecorationColor: 'rgb(254, 205, 47)' }}> BUTTER KNIFE <span style={{ fontFamily: 'Arial', fontSize: '0.7rem' }}>&trade;</span></div></LogoHolder>
                <Navigation>
                    <NavMenuItem className='strike'><Link to='/whats-new'>What's new</Link></NavMenuItem><Divider />
                    <NavMenuItem className='strike' onClick={() => setOpen(!open)}><span>Designers</span></NavMenuItem><Divider />
                    <NavMenuItem className='strike' onClick={() => setCatOpen(!catOpen)}><Link to='/clothing'>Clothing</Link></NavMenuItem><Divider />
                    <NavMenuItem className='strike'><Link style={{ fontFamily: 'BerlinBold' }} to='/footwear'>Footwear</Link></NavMenuItem><Divider />
                    <NavMenuItem className='strike'><Link style={{ fontFamily: 'BerlinBold' }} to='/accessories'>Accessories</Link></NavMenuItem><Divider />
                    {/* <NavMenuItem className='strike'><Link style={{fontFamily: 'BerlinBold'}}to='/vintage'>Vintage</Link></NavMenuItem><Divider /> */}
                    <NavMenuItem className='strike'><Link style={{ fontFamily: 'BerlinBold' }} to='/vintage'>Souvenirs</Link></NavMenuItem><Divider />
                    <NavMenuItem className='strike' onClick={() => setIsOpen(!open)}>{hasItems && <CartCounter>{quantity}</CartCounter>}
                    Trolley <img src={Trolley} alt='cart' style={{ width: '15px', paddingBottom: '5px' }} />
                    </NavMenuItem>
                    {isAuthenticated && <> <Divider /><NavMenuItem><Link className='strike' to='/account'>My Account</Link></NavMenuItem></>}
                </Navigation>
            
                <div height='50px'></div>
            </Header>
        </>

    )
}

export default NavBar