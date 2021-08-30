
import React, { useContext, useState } from 'react';
import { AudioPlayerProvider } from "react-use-audio-player"
import reduce from 'lodash/reduce'
import Flex from '../styles/Flex'
import styled from '@emotion/styled'
import Player from '../components/Player'
import Logout from '../pages/account/logout'
import { Navigation, Header, LogoHolder, MobileNavigation, NavMenuItem, MobileNavMenuItem, PageHeading } from '../components/StyledComponents';
import { Link, navigate } from "gatsby";
import realog from '../assets/realog.mp3'
import StoreContext from '../contexts/Context'
import Context from '../contexts/StoreContext'
import Trolley from '../assets/shopping-cart.svg'
import { useTheme, ThemeProvider, withTheme } from '@emotion/react'

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
const BurgerButton = styled.button`
    display: none;
`
const Anchor = styled(Link)`
    ...NavMenuItem;
`
const useQuantity = () => {
    const context = useContext(StoreContext)
    const { checkout } = context.store
    const items = checkout ? checkout.lineItems : []
    const total = reduce(items, (acc, item) => acc + item.quantity, 0)
    return [total !== 0, total]
}
export const NavBar = ({ open, setOpen, isOpen, openBurger, setOpenBurger, closeMobileNav, setIsOpen, catOpen, setCatOpen }) => {
    const Divider = () => "|"
    const [hasItems, quantity] = useQuantity()
    const context = useContext(StoreContext)
    const { state, dispatch } = useContext(Context)
    const theme = useTheme()
    const { customerAccessToken } = context
    let isAuthenticated = false
    customerAccessToken != null &&
        (isAuthenticated = customerAccessToken && customerAccessToken.expiresAt && customerAccessToken.expiresAt > new Date().toISOString() && true)
        console.log(openBurger, 'openBurger')
    return (
        <div style={{ position: 'relative' }}>
            <Header isDark={state.isDark}>
                <AudioPlayerProvider>
                    <Flex justifyBetween>
                        <button id='content-desktop' style={{ padding: '15px', border: 'unset', color: `${state.isDark ? 'white' : 'black'}` }} onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}>{state.isDark ? 'lights on' : 'lights off'}</button>
                        <Player isDark={state.isDark} file={realog} />
                        <ButtonHolder id='content-desktop'>
                            {isAuthenticated ?
                                <div style={{ padding: '15px' }}>
                                    <Logout isDark={state.isDark} />
                                </div>
                                :
                                <Link to='/account/login' className='strike'>
                                    <div style={{ padding: '15px', color: `${state.isDark ? 'white' : 'black'}` }}>
                                        LOGIN/REGISTER
                                    </div>
                                </Link>
                            }
                        </ButtonHolder>
                        <BurgerButton onClick={() => setOpenBurger(!openBurger)} id='content-mobile' className={`hamburger hamburger--slider ${openBurger && 'is-active'}`} type="button">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </BurgerButton>
                    </Flex>
                </AudioPlayerProvider>
                <LogoHolder isDark={state.isDark}><div onClick={() => navigate('/')} style={{ cursor: 'pointer', fontFamily: 'bangers', fontSize: '5rem', color: `${state.isDark ? 'white' : 'black'}`, textDecorationLine: 'line-through', textDecorationColor: `${state.isDark ? '#0131D2' : 'rgb(254, 205, 47)'}` }}> BUTTER KNIFE <span style={{ fontFamily: 'Arial', fontSize: '0.7rem' }}>&trade;</span></div></LogoHolder>
               {openBurger && <MobileNavigation openBurger={openBurger}>
                <PageHeading width='2.6rem'style={{textDecorationLine: 'line-through', textDecorationColor: `${state.isDark ? '#0131D2' : 'rgb(254, 205, 47)'}`, margin: '40px 0'}} isDark={state.isDark}>Menu</PageHeading>
                <>
                <MobileNavMenuItem onClick={() => closeMobileNav()} isDark={state.isDark} className='strike'><Link to='/whats-new'>What's new</Link></MobileNavMenuItem>
                    <MobileNavMenuItem isDark={state.isDark} className='strike' onClick={() => setOpen(!open)}><span>Designers</span></MobileNavMenuItem>
                    <MobileNavMenuItem isDark={state.isDark} className='strike' ><Link onClick={() => closeMobileNav()} to='/mens'>Mens</Link></MobileNavMenuItem>
                    <MobileNavMenuItem isDark={state.isDark} className='strike' ><Link onClick={() => closeMobileNav()} to='/womens'>Womens</Link></MobileNavMenuItem>
                    <MobileNavMenuItem onClick={() => closeMobileNav()} isDark={state.isDark} className='strike'><Link style={{ fontFamily: 'BerlinBold' }} to='/footwear'>Footwear</Link></MobileNavMenuItem>
                    </>
                    <ButtonHolder onClick={() => closeMobileNav()} style={{position: 'absolute', bottom: '10px'}}>
                            {isAuthenticated ?
                                <div style={{ padding: '15px' }}>
                                    <Logout isDark={state.isDark} />
                                </div>
                                :
                                <Link to='/account/login' className='strike'>
                                    <div style={{ padding: '15px', color: `${state.isDark ? 'white' : 'black'}` }}>
                                        LOGIN/REGISTER
                                    </div>
                                </Link>
                            }
                        </ButtonHolder>
                </MobileNavigation>}
                <Navigation>
                    <NavMenuItem isDark={state.isDark} className='strike'><Link to='/whats-new'>What's new</Link></NavMenuItem><Divider />
                    <NavMenuItem isDark={state.isDark} className='strike' onClick={() => setOpen(!open)}><span>Designers</span></NavMenuItem><Divider />
                    <NavMenuItem isDark={state.isDark} className='strike'><Link to='/mens'>Mens</Link></NavMenuItem><Divider />
                    <NavMenuItem isDark={state.isDark} className='strike'><Link to='/womens'>Womens</Link></NavMenuItem><Divider />
                    <NavMenuItem isDark={state.isDark} className='strike'><Link style={{ fontFamily: 'BerlinBold' }} to='/footwear'>Footwear</Link></NavMenuItem><Divider />
                    <NavMenuItem isDark={state.isDark} className='strike'><Link style={{ fontFamily: 'BerlinBold' }} to='/accessories'>Accessories</Link></NavMenuItem><Divider />
                    {/* <NavMenuItem className='strike'><Link style={{fontFamily: 'BerlinBold'}}to='/vintage'>Vintage</Link></NavMenuItem><Divider /> */}
                    <NavMenuItem isDark={state.isDark} className='strike'><Link style={{ fontFamily: 'BerlinBold' }} to='/vintage'>Souvenirs</Link></NavMenuItem><Divider />
                    <NavMenuItem isDark={state.isDark} className='strike' onClick={() => setIsOpen(!open)}>{hasItems && <CartCounter>{quantity}</CartCounter>}
                        Trolley <img src={Trolley} alt='cart' style={{ color: `${state.isDark ? 'white' : 'black'}`, width: '15px', paddingBottom: '5px' }} />
                    </NavMenuItem>
                    {isAuthenticated && <> <Divider /><NavMenuItem isDark={state.isDark}><Link className='strike' to='/account'>My Account</Link></NavMenuItem></>}
                </Navigation>
                <div height='50px'></div>
            </Header>
        </div>
    )
}

export default NavBar