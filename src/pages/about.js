import React from 'react'
import Flex from '../styles/Flex'
import aboutImage from '../assets/aboutBackground.jpg'
import styled from '@emotion/styled'
const AboutUs = styled.h1`
    font-family: BerlinBold;
    font-size: 4rem;
    position: absolute;
    top: 30%;
    left: 15%;
    color: white;
`
const About = () => {

    return (
        <Flex justifyCenter width='100%'>
            <img src={aboutImage} style={{ width: '100%', filter: 'blur(1px)' }} />
            <AboutUs>ABOUT US</AboutUs>
            <div style={{ width: '50%', color: 'white', position: 'absolute', left: 20, top: 50 }}>
                <p>Butterknife is an independent store that brings you all the latest, up and coming brands and designers allowing you to shop it all in one place.</p>

                <p>Butterknife inspires men and women to express their unique individual style through a wide selection of affordable, well made designs and pieces.</p>

                <p>We hope you enjoy your shopping experience with us and please do not hesitate to reach out to our Customer Service should there be questions, concerns, observations or even styling tips.</p>
            </div>
        </Flex>
    )
}

export default About