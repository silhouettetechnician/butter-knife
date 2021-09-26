import React, { useContext } from 'react'
import StoreContext from '../contexts/StoreContext'
import aboutBackground2 from '../assets/aboutBackground2.jpg'
import styled from '@emotion/styled'
import Flex from '../styles/Flex'

const pStyles = {
    fontSize: '2.4vw'
}
const Container = styled(Flex)` 
color: white;
font-family: BerlinXBold;
font-size: 2em;
`

const Contact = () => {
    const { state } = useContext(StoreContext)
    return (
        <Container justifyCenter >
            <img src={aboutBackground2} style={{ width: '100%', backgroundSize: 'cover', textAlign: 'center' }} />
            <div style ={{position: 'fixed', backgroundAttachment: 'fixed',top: '30%', padding: '3%', maxWidth: '60%', background: 'rgba(0,0,0,0.75)'}}>
            <p style ={pStyles}>General Enquiries & Returns: <br/> <a href='mailto:contact@butter-knife.co.uk'>contact@butter-knife.co.uk</a></p>
            <p style ={pStyles}>Sales & Press: <br/> <a href='mailto:sales@butter-knife.co.uk'>sales@butter-knife.co.uk</a></p>
            <p style ={pStyles}>Other Enquiries: <br/> <a href='mailto:timothy.millward@butter-knife.co.uk'>timothy.millward@butter-knife.co.uk</a></p>
            <p style ={pStyles}>Instagram: <br/> <a target='_blank' href='https://www.instagram.com/butterknifeclothing/'>@butterknifeclothing</a></p>
            </div>
        </Container>
    )
}

export default Contact
