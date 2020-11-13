import React from 'react'
import { AppContainer } from './StyledComponents';
import NavBar from './NavBar'
import Footer from './Footer'

export const Layout = ({children}) => (
<AppContainer>
    <NavBar/>
    {children}
    <Footer/>
</AppContainer>
)

export default Layout