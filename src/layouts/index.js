import React, { useState, useContext } from 'react'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Notifications from 'react-notify-toast';
import useMeta from '../hooks/useMeta'
import _ from 'lodash'
import { Link, graphql, StaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import Sticky from 'react-stickynode';
import Cart from '../cart/index'
import { DropDownBrands } from '../components/StyledComponents';
import NavBar from './NavBar'
import Footer from './Footer'
import Flex from '../styles/Flex'
import Context from '../contexts/StoreContext'
import { Global, css } from '@emotion/react'
import { useTheme } from '@emotion/react'

// const isBrowser = typeof window !== "undefined"

const ListItem = styled(Link)`
width: 170px;
text-align: center;
font-family: graphikMed;
color: black !important;
line-height: 45px;
cursor: pointer;
font-weight: 600;
&:hover{
    font-weight: bold;
}
`
const Cross = styled.div`
    position: ${props => props.open ? 'none' : 'absolute'};
    top: 13px;
    right: 13px;
`
const Layout = ({ data, children }) => {
    const [open, setOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [catOpen, setCatOpen] = useState(false)
    const { title, description } = useMeta();
    // const [isCartOpen, setIsCartOpen] = useState(false)
    // const [cartRequest, setCartRequest] = useState(false)
    const [openBurger, setOpenBurger] = useState(false)
    const closeMobileNav = () => setOpenBurger(!openBurger)
    const [checkout, setCheckout] = useState({ lineItems: [] })
    // const [products, setProducts] = useState([])
    // const [shop, setShop] = useState({})
    const { state } = useContext(Context)
    const theme = useTheme()

    const brandRender =
        <StaticQuery
            query={graphql`
        {
            allShopifyCollection(sort: { fields: [title] }) {
                nodes {
                title
                handle
                }
        
            }}`}
            render={(data, key) => {
                const {
                    nodes
                } = data.allShopifyCollection
                return open ? <DropDownBrands onMouseLeave={() => setOpen(!open)} open={open} setOpen={setOpen}><Cross><FontAwesomeIcon onClick={() => setOpen(!open)} color="black" size="lg" icon={faTimes} /></Cross>
                    {_.uniqBy(nodes, 'title').filter(i => i.handle !== 'frontpage' && i.handle !== 'clothing' && i.handle !== 'accessories').map((brand, i) => {
                        return <ListItem key={i} to={`/designers/${brand.handle}`} onClick={() => setOpen(!open)}className='strike'>{brand.title}</ListItem>
                    })
                    }
                </DropDownBrands> : <></>
            }}
        />
    return (
        <>
            <Global styles={
                css`
                    body {
                        background-color: ${state.isDark ? theme.dark.background : theme.light.background}
                    }
                `
            } />
            <div style={{ position: 'relative', minHeight: '100vh' }}>
                <Notifications />
                <Sticky style={{ zIndex: '99 !important' }} enabled={true} bottomBoundary={1000}>
                    <NavBar closeMobileNav={closeMobileNav} openBurger={openBurger} setOpenBurger={setOpenBurger} isOpen={isOpen} setIsOpen={setIsOpen} open={open} setOpen={setOpen} catOpen={catOpen} setCatOpen={setCatOpen} />
                </Sticky>
                <Flex style={{backgroundColor: state.isDark ? '#1D1D1D' : 'white'}} width='100%' justifyCenter column alignCenter >
                    {brandRender}
                    {children}
                </Flex>
                <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
                {/* FIX */}
                <Footer />
                {/* {
                window.location.pathname !== '/' && <Footer />
            } */}
            </div>
        </>
    )

}

export default Layout
