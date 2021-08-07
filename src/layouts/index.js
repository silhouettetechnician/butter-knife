import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Notifications, {notify} from 'react-notify-toast';
import useMeta from '../hooks/useMeta'
import _ from 'lodash'
import ContextProvider from '../hocs/withContextProvider'
import { Link, graphql, StaticQuery } from 'gatsby'
import ContextConsumer from '../layouts/Context'
import styled from '@emotion/styled'
import Sticky from 'react-stickynode';
import Cart from '../cart/index'
import { AppContainer, DropDownBrands } from '../components/StyledComponents';
import NavBar from './NavBar'
import Footer from './Footer'
import Client from "shopify-buy"
// import { designerList } from '../constannts/brand-names'
import Flex from '../styles/Flex'

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
    const {title, description} = useMeta();
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartRequest, setCartRequest] = useState(false)
    const [checkout, setCheckout] = useState({lineItems: []})
    const [products, setProducts] = useState([])
    const [shop, setShop] = useState({})

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
                    return <ListItem key={i} to={`/designers/${brand.handle}`} className='strike'>{brand.title}</ListItem>})
                }
                </DropDownBrands> : <></>
            }}
        />
    return (
        <ContextProvider>
        <ContextConsumer>
        {({ set }) => {
            return <div style={{position: 'relative'}}>
        <Notifications/>
            <Helmet>
                <html lang='en' />
                <title>{title}</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css"/>
                {/* <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.1.1/default/snipcart.css" /> */}
                {/* <script async src="https://cdn.snipcart.com/themes/v3.1.1/default/snipcart.js"></script> */}
                {/* <meta name={title} content='Suprabha Blog!' /> */}
            </Helmet>
            <Sticky style={{ zIndex: '99 !important' }} enabled={true} bottomBoundary={1000}>
                <NavBar isOpen={isOpen} setIsOpen={setIsOpen} open={open} setOpen={setOpen} catOpen={catOpen} setCatOpen={setCatOpen} />
            </Sticky>
            <Flex justifyCenter column alignCenter height='100%'>
                {brandRender}
                {children}
                {/* {React.cloneElement(children, {addVariantToCart: addVariantToCart})} */}
            </Flex>
            {
                window.location.pathname !== '/' && <Footer />
            }                                                                                                                                                                                                  
            <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        }}
        </ContextConsumer>
        </ContextProvider>
    )
}

export default Layout
