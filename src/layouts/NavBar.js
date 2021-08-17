
import React, { useContext, useState } from 'react';
import { AudioPlayerProvider } from "react-use-audio-player"
import reduce from 'lodash/reduce'
import Flex from '../styles/Flex'
import styled from '@emotion/styled'
import Player from '../components/Player'
import Logout from '../pages/account/logout'
import { Navigation, Header, LogoHolder, NavMenuItem } from '../components/StyledComponents';
import { Link, navigate } from "gatsby";
import AuthWrapper from './AuthWrapper'
import StoreContext from '../contexts/Context'
import Trolley from '../assets/shopping-cart.svg'

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
    // position: absolute;
    font-family: Berlin !important;
    font-weight: bold;
    // right: 0;
    // margin: 15px;
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
    const context = useContext(StoreContext)
    const { checkout } = context
    const items = checkout ? checkout.lineItems : []
    const total = reduce(items, (acc, item) => acc + item.quantity, 0)
    return [total !== 0, total]
}
export const NavBar = ({ open, setOpen, isOpen, setIsOpen, catOpen, setCatOpen }) => {
    const Divider = () => "|"
    const [hasItems, quantity] = useQuantity()
    const context = useContext(StoreContext)
    const { customerAccessToken } = context
    let isAuthenticated = false
    customerAccessToken != null &&
        (isAuthenticated = customerAccessToken && customerAccessToken.expiresAt && customerAccessToken.expiresAt > new Date().toISOString() && true)
    return (
        <div style={{ position: 'relative' }}>
            <Header >
                <AudioPlayerProvider>
                    <Flex justifyBetween>
                        
                        <Player file='/realog.mp3' />
                        <ButtonHolder>
                            {isAuthenticated ?
                                <div style={{padding: '15px'}}>
                                    <Logout />
                                </div>
                                :
                                <Link to='/account/login' className='strike'>
                                    <div style={{padding: '15px'}}>
                                        LOGIN/REGISTER
                                    </div>
                                </Link>
                            }
                        </ButtonHolder>
                        
                    </Flex>
                </AudioPlayerProvider>
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
        </div>
    )
}

export default NavBar