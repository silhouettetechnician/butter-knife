import React from 'react'
import { Heading1 } from './StyledComponents';
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
    return (
        <>
            {/* <Heading1>Latest</Heading1> */}
            
            <Carousel showIndicators={false} showStatus={false} showThumbs={false} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', background: 'unset', margin: '0 auto'}}>
                <div style={{width: '100%'}}>
                    <img src="/Images/carousel1.jpg" />
                </div>
                <div style={{width: '100%'}}>
                    <img  src="/Images/carousel2.jpg" />
                </div>
                <div style={{width: '100%'}}>
                    <img  src="/Images/carousel3.jpg" />
                </div>
            </Carousel>
            
        </>
    )
}

export default Home;
