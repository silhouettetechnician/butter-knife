import React, { useState, useEffect } from 'react'; 
import { Carousel } from 'react-responsive-carousel';
import styled from '@emotion/styled';

const App = () => {
    const Slider = styled(Carousel)`
    display: flex
    justify-content: center;
    align-items: center;
    width: 100%;
    background: unset;
    margin: 0 auto;
`
// useEffect(() => {
    // getFirebase()
// },[])

    return (
            <Slider showIndicators={false} infiniteLoop={true} showStatus={false} showThumbs={false} autoPlay={true}>
                <div style={{ width: '100vw', height: '100vh' }}>
                    <img alt='carouselimg2' src={"carousel2.jpg"} />
                </div>
                <div style={{ width: '100vw', height: '100vh' }}>
                    <img alt='carouselimg1' src={"carousel1.jpg"} />
                </div>
                <div style={{ width: '100%',height: '100vh' }}>
                    <img alt='carouselimgvw' src={"carousel3.jpg"} />
                </div>
            </Slider>
    );
}

export default App;
