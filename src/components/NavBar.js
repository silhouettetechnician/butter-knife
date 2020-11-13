import React from 'react'
import { navigate } from 'hookrouter'
import { Navigation, Header, NavMenuItem, LogoHolder } from './StyledComponents';

export const NavBar = () => {
    const Divider = () => "|"
return(
    <Header>
    <LogoHolder><div onClick={() => navigate('/')} style={{cursor: 'pointer', fontFamily: 'bangers', fontSize: '3rem', textDecorationLine: 'line-through', textDecorationColor: 'rgb(254, 205, 47)'}}> BUTTER KNIFE <span style={{fontFamily: 'Arial', fontSize: '0.7rem'}}>&trade;</span></div></LogoHolder>
    <Navigation>
        <NavMenuItem><a className='strike' href='/brands'>Brands</a></NavMenuItem><Divider/>
        <NavMenuItem><a className='strike' href='/clothing'>Clothing</a></NavMenuItem><Divider/>
        <NavMenuItem><a className='strike' href='/shoes'>Shoes</a></NavMenuItem><Divider/>
        <NavMenuItem><a className='strike' href='/accessories'>Accessories</a></NavMenuItem>
    </Navigation>
</Header>
)
}

export default NavBar