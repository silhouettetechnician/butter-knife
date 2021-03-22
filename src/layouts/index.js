import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'
import { AppContainer, Content } from '../components/StyledComponents';
import NavBar from './NavBar'
import Footer from './Footer'
import { designerList } from '../constannts/brand-names'
import Flex from '../styles/Flex'
const ListItem = styled.a`
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
export const Layout = ({children}) => {
    const [open, setOpen] = useState(false)
return <AppContainer>
    <NavBar open={open} setOpen={setOpen}/>
        <Content open={open} setOpen={setOpen}>
            <Flex justifyCenter column alignCenter height='100%'>
                <Cross>
                    <FontAwesomeIcon onClick={() => setOpen(!open)}size='2x' icon={faTimes}/>
                </Cross>{designerList.map((brand,i) => <ListItem key={i} href={`/designers/${unescape(brand.name)}`} className='strike'>{brand.name}</ListItem>)}
            </Flex>
        </Content>
    {children}
    <Footer/>
</AppContainer>
}

export default Layout