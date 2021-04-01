import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link, graphql, StaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import Sticky from 'react-stickynode';
import { AppContainer, Content } from '../components/StyledComponents';
import NavBar from './NavBar'
import Footer from './Footer'
import { designerList } from '../constannts/brand-names'
import Flex from '../styles/Flex'
const ListItem = styled(Link)`
width: 170px;
text-align: center;
font-family: graphikMed;
line-height: 45px;
cursor: pointer;
font-weight: 600;
&:hover{
    font-weight: bold;
}
`
const Cross = styled.div`
    position: absolute;
    top: 13px;
    right: 13px;
`
const Layout = ({  children }) => {
    const [open, setOpen] = useState(false)
    // const { allContentfulBrand: nodes } = data

    // console.log(data, 'data layout')
    return (
        <>
            <Sticky style={{ zIndex: '99 !important' }} enabled={true} bottomBoundary={1000}>
                <NavBar open={open} setOpen={setOpen} />
            </Sticky>

            <Flex justifyCenter column alignCenter height='100%'>
                <Content open={open} setOpen={setOpen} onMouseOut={() => setOpen(false)}>
                    <StaticQuery
                        query={graphql`
                        query brand {
                              nodes {
                                companyName {
                                  id
                                  companyName
                                }
                              }
                        
                          }`}
                        render={data => {
                            return data.map((brand, i) => <ListItem onMouseOver={() => setOpen(true)} to={`/brands/${unescape(brand.edges.node.companyName.companyName)}`} className='strike'>{brand.edges.node.companyName.companyName}</ListItem>)}}
                    />
                </Content>
            </Flex>
            { children}
            <Footer />
        </>
    )
}

export default Layout
