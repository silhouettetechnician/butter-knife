
import React from 'react';
import { navigate } from 'hookrouter'
import styled from '@emotion/styled'
import { Navigation, Header, LogoHolder, NavMenuItem} from './StyledComponents';
import { useAuth0 } from "@auth0/auth0-react";

const ButtonHolder = styled.div`
    width: auto;
    position: absolute;
    font-family: graphikMed;
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
            <LogoHolder><div onClick={() => navigate('/')} style={{ cursor: 'pointer', fontFamily: 'bangers', fontSize: '3rem', textDecorationLine: 'line-through', textDecorationColor: 'rgb(254, 205, 47)' }}> BUTTER KNIFE <span style={{ fontFamily: 'Arial', fontSize: '0.7rem' }}>&trade;</span></div></LogoHolder>
            <Navigation>
                <NavMenuItem className='strike' onClick={() => setOpen(!open)} open={open}><span>What's new</span></NavMenuItem><Divider />
                <NavMenuItem className='strike' onClick={() => setOpen(!open)} open={open}><span>Designers</span></NavMenuItem><Divider />
                <NavMenuItem className='strike'><a href='/clothing'>Clothing</a></NavMenuItem><Divider />
                <NavMenuItem className='strike'><a href='/shoes'>Shoes</a></NavMenuItem><Divider />
                <NavMenuItem className='strike'><a href='/accessories'>Accessories</a></NavMenuItem><Divider />
                <NavMenuItem className='strike'><a href='/community'>Community</a></NavMenuItem>
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