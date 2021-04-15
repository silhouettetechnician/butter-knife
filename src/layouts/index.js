import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link, graphql, StaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import Sticky from 'react-stickynode';
import { AppContainer, DropDownBrands } from '../components/StyledComponents';
import NavBar from './NavBar'
import Footer from './Footer'
import { designerList } from '../constannts/brand-names'
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
    const [catOpen, setCatOpen] = useState(false)
    // const { allContentfulBrand: nodes } = data
    const brandRender =
        <StaticQuery
            query={graphql`
        {
            allContentfulBrand {
                nodes {
                companyName {
                    id
                    companyName
                }
                }
        
            }}`}
            render={data => {
                const {
                    nodes
                } = data.allContentfulBrand
                return nodes.map((brand, i) => {
                    return open ? <DropDownBrands onMouseLeave={() => setOpen(!open)} open={open} setOpen={setOpen}><Cross><FontAwesomeIcon onClick={() => setOpen(!open)} color="black" size="lg" icon={faTimes} /></Cross><ListItem key={i} to={`/brands/${unescape(brand.companyName.companyName)}`} className='strike'>{brand.companyName.companyName}</ListItem></DropDownBrands> : <></>
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
        <>
            <Sticky style={{ zIndex: '99 !important' }} enabled={true} bottomBoundary={1000}>
                <NavBar open={open} setOpen={setOpen} catOpen={catOpen} setCatOpen={setCatOpen} />
            </Sticky>
            <Flex justifyCenter column alignCenter height='100%'>
                {brandRender}
                {/* {cate} */}
            </Flex>
            { children}
            <Footer />
        </>
    )
}

export default Layout
