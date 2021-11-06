import React from 'react'
import aboutBackground2 from '../assets/aboutBackground2.jpg'
import styled from '@emotion/styled'
import Flex from '../styles/Flex'

const pStyles = {
    fontSize: '2.4vw'
}
const BackgroundImage = styled.img`
    width: 100%;
    background-size: cover;
    text-align: center;
`
const Container = styled(Flex)` 
    color: white;
    font-family: BerlinXBold;
    font-size: 2em;
`
const ContactContainer = styled.div`
    position: fixed;
    background-attachment: fixed;
    top: 30%;
    padding: 1%;
    max-width: 60%;
    background: rgba(0,0,0,0.75);
`

const Contact = () => {
    return (
        <Container justifyCenter >
            <BackgroundImage src={aboutBackground2}/>
            <ContactContainer>
            <p style ={pStyles}>General Enquiries & Returns: <br/> <a href='mailto:contact@butter-knife.co.uk'>contact@butter-knife.co.uk</a></p>
            <p style ={pStyles}>Other Enquiries: <br/> <a href='mailto:timothy.millward@butter-knife.co.uk'>timothy.millward@butter-knife.co.uk</a></p>
            <p style ={pStyles}>Instagram: <br/> <a target='_blank' href='https://www.instagram.com/butterknifeclothing/'>@butterknifeclothing</a></p>
            </ContactContainer>
        </Container>
    )
}

export default Contact
