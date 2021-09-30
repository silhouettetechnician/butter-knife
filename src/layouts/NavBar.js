
import React, { useContext } from 'react';
import { AudioPlayerProvider } from "react-use-audio-player"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import reduce from 'lodash/reduce'
import Flex from '../styles/Flex'
import styled from '@emotion/styled'
import Player from '../components/Player'
import Logout from '../pages/account/logout'
import { Navigation, Header, LogoHolder, MobileNavigation, NavMenuItem, MobileNavMenuItem, PageHeading } from '../components/StyledComponents';
import { Link, navigate } from "gatsby";
import StoreContext from '../contexts/Context'
import Context from '../contexts/StoreContext'
import Trolley from '../assets/shopping-cart.svg'

const ResponsiveLogoHolder = styled.div`
    cursor: pointer;
    font-family: bangers;
    font-size: 5rem;
    color: ${props => props.isDark ? 'white' : 'black'};
    text-decoration-line: line-through;
    text-decoration-color: ${props => props.isDark ? '#0131D2' : 'rgb(254, 205, 47)'};
    @media (max-width: 800px) {
        font-size: 4rem;
    }
`
const CartCounter = styled.span`
    color: #663399;
    border-radius: 20px;
    padding: 0 10px;
    font-size: ${props => props.fontSize || '1.3rem'};
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
    & > span > span {
        background-color: ${props => props.isDark ? 'white !important' : 'black !important'};
    }
        &:before{
            background-color: ${props => props.isDark ? 'white !important' : 'black !important'};
        }
        &:after{
            background-color: ${props => props.isDark ? 'white !important' : 'black !important'};
        }
`
const useQuantity = () => {
    const context = useContext(StoreContext)
    const { checkout } = context.store
    const items = checkout ? checkout.lineItems : []
    const total = reduce(items, (acc, item) => acc + item.quantity, 0)
    return [total !== 0, total]
}
export const NavBar = ({ open, setOpen, isOpen, openBurger, setOpenBurger, closeMobileNav, setIsOpen }) => {
    const Divider = () => "|"
    const [hasItems, quantity] = useQuantity()
    const context = useContext(StoreContext)
    const { state, dispatch } = useContext(Context)
    const { customerAccessToken } = context
    let isAuthenticated = false
    customerAccessToken != null &&
        (isAuthenticated = customerAccessToken && customerAccessToken.expiresAt && customerAccessToken.expiresAt > new Date().toISOString() && true)
    return (
        <div style={{ position: 'relative' }}>
            <Header isDark={state.isDark}>
                <AudioPlayerProvider>
                    <Flex justifyBetween>
                        <button id='content-desktop' style={{ fontSize: '15px', padding: '15px', border: 'unset', color: `${state.isDark ? 'white' : 'black'}` }} onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}>{state.isDark ? 'lights on' : 'lights off'}</button>
                        <Player id='content-desktop' isDark={state.isDark} file='/realog.mp3' />
                        <ButtonHolder id='content-desktop'>
                            {isAuthenticated ?
                                <div style={{ padding: '15px' }}>
                                    <Logout isDark={state.isDark} />
                                </div>
                                :
                                <Link to='/account/login' className='strike'>
                                    <div style={{ padding: '15px', color: `${state.isDark ? 'white' : 'black'}`, fontSize: '15px', fontFamily: 'CODE1 !important'}}>
                                        LOGIN/REGISTER
                                    </div>
                                </Link>
                            }
                        </ButtonHolder>
                        <BurgerButton isDark={state.isDark} onClick={() => setOpenBurger(!openBurger)} id='content-mobile' className={`hamburger hamburger--slider ${openBurger && 'is-active'}`} type="button">
                            <span className="hamburger-box">
                                <span style={{ backgroundColor: `${state.isDark ? 'white !important' : 'black !important'}` }} className="hamburger-inner"></span>
                            </span>
                        </BurgerButton>
                        <Flex id='content-mobile'>
                        {hasItems && <div id='content-mobile' style={{width: '100%', display: 'flex'}} ><CartCounter id='content-mobile' fontSize='1.6rem'>{quantity}</CartCounter></div>}
                        <FontAwesomeIcon style={{ cursor: 'pointer', fontSize: '40px', margin: '12px' }} onClick={() => setIsOpen(!isOpen)} id='content-mobile' icon={faShoppingCart}></FontAwesomeIcon>
                        </Flex>
                    </Flex>
                </AudioPlayerProvider>
                <LogoHolder isDark={state.isDark}><ResponsiveLogoHolder isDark={state.isDark} onClick={() => navigate('/')}> BUTTER KNIFE <span style={{ fontFamily: 'Arial', fontSize: '0.7rem' }}>&trade;</span></ResponsiveLogoHolder></LogoHolder>
                {openBurger && <MobileNavigation isDark={state.isDark} openBurger={openBurger}>
                    <button style={{ padding: '15px', border: 'unset', color: `${state.isDark ? 'white' : 'black'}` }} onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}>{state.isDark ? 'lights on' : 'lights off'}</button>
                    <PageHeading width='2.6rem' style={{ textDecorationLine: 'line-through', textDecorationColor: `${state.isDark ? '#0131D2' : 'rgb(254, 205, 47)'}`, margin: '40px 0' }} isDark={state.isDark}>Menu</PageHeading>
                    <>
                        <MobileNavMenuItem onClick={() => closeMobileNav()} isDark={state.isDark} className='strike'><Link to='/whats-new'>What's new</Link></MobileNavMenuItem>
                        <MobileNavMenuItem isDark={state.isDark} className='strike' onClick={() => { setOpen(!open); closeMobileNav() }}><span>Designers</span></MobileNavMenuItem>
                        <MobileNavMenuItem onClick={() => closeMobileNav()}isDark={state.isDark} className='strike' ><Link  to='/mens'>Mens</Link></MobileNavMenuItem>
                        <MobileNavMenuItem onClick={() => closeMobileNav()}isDark={state.isDark} className='strike' ><Link  to='/womens'>Womens</Link></MobileNavMenuItem>
                        <MobileNavMenuItem onClick={() => closeMobileNav()}isDark={state.isDark} className='strike'><Link  to='/souvenirs'>Souvenirs</Link></MobileNavMenuItem>
                        <MobileNavMenuItem onClick={() => closeMobileNav()} isDark={state.isDark} className='strike'><Link style={{ fontFamily: 'BerlinBold' }} to='/footwear'>Footwear</Link></MobileNavMenuItem>
                    </>
                    <ButtonHolder style={{ position: 'absolute', textAlign: 'center',bottom: '10px', width: '100%' }}>
                        {isAuthenticated ?
                            <div style={{ padding: '15px', display: 'flex', width: '100%', justifyContent: 'space-evenly'}}>
                                <Logout isDark={state.isDark} />
                             <Link onClick={() => closeMobileNav()} isDark={state.isDark} className="has-text-centered has-text-underlined has-text-black" to='/account'>My Account</Link>
                            </div>
                            :
                            <Link to='/account/login' className='strike'>
                                <div onClick={() => closeMobileNav()} style={{ padding: '15px', color: `${state.isDark ? 'white' : 'black'}`, fontWeight: 1000 }}>
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
                    <NavMenuItem isDark={state.isDark} className='strike'><Link to='/footwear'>Footwear</Link></NavMenuItem><Divider />
                    <NavMenuItem isDark={state.isDark} className='strike'><Link to='/accessories'>Accessories</Link></NavMenuItem><Divider />
                    <NavMenuItem isDark={state.isDark} className='strike'><Link to='/souvenirs'>Souvenirs</Link></NavMenuItem><Divider />
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