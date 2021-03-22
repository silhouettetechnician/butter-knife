
import React from 'react';
// import { navigate } from 'hookrouter'
import styled from '@emotion/styled'
import { Navigation, Header, LogoHolder, NavMenuItem} from '../components/StyledComponents';
import { useAuth0 } from "@auth0/auth0-react";
import { Link, navigate } from "gatsby";

const ButtonHolder = styled.div`
    width: auto;
    position: absolute;
    font-family: graphikMed !important;
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
export const NavBar = ({open, setOpen}) => {
    const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
    const Divider = () => "|"
    return (
        <div style={{position: 'relative'}}>
        <Header>
            <LogoHolder><div onClick={() => navigate('/')} style={{ cursor: 'pointer', fontFamily: 'bangers', fontSize: '4rem', textDecorationLine: 'line-through', textDecorationColor: 'rgb(254, 205, 47)' }}> BUTTER KNIFE <span style={{ fontFamily: 'Arial', fontSize: '0.7rem' }}>&trade;</span></div></LogoHolder>
            <Navigation>
                <NavMenuItem className='strike' onClick={() => setOpen(!open)} open={open}><span>What's new</span></NavMenuItem><Divider />
                <NavMenuItem className='strike' onClick={() => setOpen(!open)} open={open}><span>Designers</span></NavMenuItem><Divider />
                <NavMenuItem className='strike'><Link to='/clothing'>Clothing</Link></NavMenuItem><Divider />
                <NavMenuItem className='strike'><Link to='/shoes'>Shoes</Link></NavMenuItem><Divider />
                <NavMenuItem className='strike'><Link to='/accessories'>Accessories</Link></NavMenuItem><Divider />
                <NavMenuItem className='strike'><Link to='/community'>Community</Link></NavMenuItem>
                {isAuthenticated &&<> <Divider /> <NavMenuItem><a className='strike' href='/community'>My Account</a></NavMenuItem></>}
            </Navigation>
            <ButtonHolder>
                {isAuthenticated ?
                    <Button onClick={() => logout({ returnTo: window.location.origin })}className='strike'>
                        LOGOUT
                    </Button>
                    :
                    <Button onClick={() => loginWithRedirect()} className='strike'>
                        LOGIN/REGISTER
                    </Button>
                }
            </ButtonHolder>
        </Header>
                </div>
    )
}

export default NavBar