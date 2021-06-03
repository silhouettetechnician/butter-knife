import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import useMeta from '../hooks/useMeta'
import ContextProvider from '../hocs/withContextProvider'
import { Link, graphql, StaticQuery } from 'gatsby'
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

    // const client = Client.buildClient({
    //     storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
    //     domain: `butter-knife-concession-store.myshopify.com`,
    //   })

    // useEffect(() => {
    //     client.checkout.create().then(checkout => {
    //       // Do something with the checkout
    //       setCheckout({ checkout })
    //     })
    //   },[])
    //   const addVariantToCart = (async (variantId, quantity) => {
    //     setIsCartOpen(true)
    //     setCartRequest(true)
    //     if (variantId.indexOf("Shopify__ProductVariant__") !== -1)
    //       variantId = variantId.split("Shopify__ProductVariant__")[1]
    
    //     const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    //     console.log(checkout, 'checkout')
    //     const checkoutId = checkout.id
    
    //     const checkout = await client.checkout
    //           .addLineItems(checkoutId, lineItemsToAdd)
    //       console.log(checkout, 'checkout')
    //       setCheckout(checkout)
    //       setCartRequest(false)
    //   })
    const brandRender =
        <StaticQuery
            query={graphql`
        {
            allShopifyProduct {
                nodes {
                vendor
                }
        
            }}`}
            render={(data, key) => {
                const {
                    nodes
                } = data.allShopifyProduct
                return nodes.map((brand, i) => {
                    return open ? <DropDownBrands key={i} onMouseLeave={() => setOpen(!open)} open={open} setOpen={setOpen}><Cross><FontAwesomeIcon onClick={() => setOpen(!open)} color="black" size="lg" icon={faTimes} /></Cross><ListItem key={i} to={`/designers/${unescape(brand.vendor)}`} className='strike'>{brand.vendor}</ListItem></DropDownBrands> : <></>
                }
                )
            }}
        />
    // const categoryRender =
    //     <StaticQuery
    //         query={graphql`
    //     {
    //         allContentfulProduct {
    //             nodes {
    //             type
    //             }

    //         }}`}
    //         render={data => {
    //             const {
    //                 nodes
    //             } = data.allContentfulBrand
    //             return nodes.map((brand, i) => {
    //                 return open ? <DropDownBrands onMouseLeave={() => setCatOpen(!open)} catOpen={catOpen} setOpen={setCatOpen}><Cross><FontAwesomeIcon onClick={() => setOpen(!open)} color="black" size="lg" icon={faTimes} /></Cross><ListItem key={i} to={`/brands/${unescape(brand.companyName.companyName)}`} className='strike'>{brand.companyName.companyName}</ListItem></DropDownBrands> : <></>
    //             }
    //             )
    //         }}
    //     />
    return (
        <ContextProvider>
            <Helmet>
                <html lang='en' />
                <title>{title}</title>
                <script src="https://unpkg.com/react-pose/dist/react-pose.js"></script>
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
            {/* <Footer />                                                                                                                                                                                                   */}
            <Cart isOpen={isOpen} setIsOpen={setIsOpen} />
        </ContextProvider>
    )
}

export default Layout
