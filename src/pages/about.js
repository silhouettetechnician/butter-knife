import React, { useContext } from 'react'
import Flex from '../styles/Flex'
import StoreContext from '../contexts/StoreContext'
import Aboutimg from '../assets/About4.jpg'
import editedLegoMan from '../assets/editedLegoMan.png'
import styled from '@emotion/styled'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

const ArrowDown = styled.div`
    background: white;
    &:after{
        background: white;
    }
`
const AboutUsParagraph = styled.p`
    font-size: 2em;
    font-family: CODE;
    text-transform: uppercase;
    margin: 0 auto;
    color: white;
    font-weight: 1000;
    // color: ${props => props.isDark ? 'white' : 'black'};
    width: 80%;
    margin-bottom: 20px;
    text-align: center;
`

const AboutUs = styled.h1`
    font-family: bangers;
    text-align: center;
    font-size: 4rem;
    position: absolute;
    top: 30%;
    left: 15%;
    color: ${props => !props.isDark ? 'white' : 'black'};
`
const About = () => {
    const { state } = useContext(StoreContext)
    return (
        // <Flex justifyCenter height='auto' width='100%'>
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
            <Parallax pages={4} style={{ position: 'absolute', top: '0', left: '0', backgroundImage: `url(${Aboutimg})`, backgroundSize: 'cover' }}>

                <ParallaxLayer
                    offset={0}
                    speed={0.5}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                    <AboutUsParagraph isDark={state.isDark}>Butterknife brings you all the latest brands and designers.</AboutUsParagraph>
                    <div className="arrow-container">
                        <ArrowDown isDark={state.isDark} className="arrow-down"></ArrowDown>
                    </div>
                </ParallaxLayer>


                {/* <ParallaxLayer offset={1} speed={2} style={{ backgroundImage: `url(${aboutImage})`, backgroundSize: 'cover' }} /> */}
                <ParallaxLayer
                    offset={1}
                    speed={0.5}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'black',
                    }}>

                    <AboutUsParagraph isDark={state.isDark}>Butterknife inspires men and women to express their unique individual style... </AboutUsParagraph>
                </ParallaxLayer>
                <ParallaxLayer
                    offset={2}
                    speed={0.5}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'black',
                    }}>

                    <AboutUsParagraph isDark={state.isDark}>through a wide selection of new, quality made designs.</AboutUsParagraph>
                </ParallaxLayer>
                <ParallaxLayer
                    offset={3}
                    speed={0.5}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'black',
                    }}>

                    <AboutUsParagraph isDark={state.isDark}>don't hesitate to get in contact for any queries via our contact page</AboutUsParagraph>
                </ParallaxLayer>

                {/* <p>We hope you enjoy your shopping experience with us and please do not hesitate to reach out to our Customer Service should there be questions, concerns, observations or even styling tips.</p> */}
            </Parallax>

        </div>
    )
}

export default About

{/* <div style={{ width: '300px', height: '200px', background: 'rgba(0,0,0,0.75)', position: 'absolute', top: 'calc(0% + 250px)', left: 'calc(50% - 150px)', display: 'flex', flexDirection: 'column-reverse' }}>
                        <AboutUs isDark={state.isDark} >ABOUT US</AboutUs>
                        <div class="arrow-container">
                            <div class="arrow-down"></div>
                        </div>
                    </div> */}