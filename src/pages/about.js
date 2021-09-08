import React, { useContext } from 'react'
import StoreContext from '../contexts/StoreContext'
import Aboutimg from '../assets/About4.jpg'
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

const About = () => {
    const { state } = useContext(StoreContext)
    return (
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
                    <AboutUsParagraph isDark={state.isDark}>through a wide selection of new, quality made designs. More brands regularly getting added.</AboutUsParagraph>
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
            </Parallax>

        </div>
    )
}

export default About
