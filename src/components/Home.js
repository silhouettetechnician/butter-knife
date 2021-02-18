import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import styled from '@emotion/styled'

const Slider = styled(Carousel)`
    display:flex justify-content: center;
    align-items: center;
    width: 100%;
    background: unset;
    margin: 0 auto;
`
const Home = () => <Slider showIndicators={false} showStatus={false} showThumbs={false}>
    <div style={{ width: '100%' }}>
        <img alt='carouselimg1' src="/Images/carousel1.jpg" />
    </div>
    <div style={{ width: '100%' }}>
        <img alt='carouselimg2' src="/Images/carousel2.jpg" />
    </div>
    <div style={{ width: '100%' }}>
        <img alt='carouselimg3' src="/Images/carousel3.jpg" />
    </div>
</Slider>

export default Home;
