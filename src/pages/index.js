import React, { useState, useEffect } from 'react';
import SEO from '../components/Seo'
import DarkSwitch from '../hooks/useDarkMode'
import { Carousel } from 'react-responsive-carousel';
import withAuthProvider from '../hocs/withAuthProvider'
import styled from '@emotion/styled';
import ButterButton from '../styles/ButterButton'
import { Link, navigate } from "gatsby";
import Flex from '../styles/Flex'
import { graphql } from "gatsby"
import ReactPlayer from 'react-player'
import HomeVideo from '../assets/MASKSANDSWEATSSAM.mp4'

// const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const VideoWrapper = styled.div`
  position: relative;
  height: unset;
`

const App = ({ data }) => {
    const Slider = styled(Carousel)`
    display: flex
    justify-content: center;
    align-items: center;
    width: 100%;
    background: unset;
    margin: 0 auto;
`
console.log(data, 'data in homepage')
const {
  contentfulBrand: { companyName: companyName, brandImages },
} = data
    // console.log(companyName.companyName, ' index')
    console.log(brandImages[1].file.url, 'brandImages')
    const test = '../static/mainlogo.png'
    const video = '../static/MASKSANDSWEATSSAM.mp4'
    // console.log(process.env.GATSBY_SNIPCART_TEST_KEY, 'process.env.GATSBY_SNIPCART_TEST_KEY')

    return (
      <>
      {/* <DarkSwitch/> */}
          <SEO title='Butterknife' description='Fashion. Footwear. Luxury' metaImage='/mainlogo.png'/>
            <VideoWrapper>
            
            <Flex padding='10% 0 0 0' column justifyCenter alignCenter>
            <h1 style={{zIndex: '999', position: 'relative', color: 'white', fontSize: '4rem', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase'}}>INTRODUCING NOM</h1>
            {/* <button className='raise'>shop now</button> */}
            <Link style={{zIndex: '999'}}to={`/designers/nom`}><button><div className="knife -knife-float" text="SHOP NOW" temptext="Slice here"><div></div></div></button></Link>
            </Flex>
            <ReactPlayer className='react-player' width='100vw' height='100vh' playing url={HomeVideo} muted loop />
            </VideoWrapper>
            {/* <Checkout/> */}
            </>
    );
}

export default App;

export const query = graphql`

query homeQuery {
  contentfulBrand(companyName: {companyName: {eq: "NOM"}}) {
    brandImages {
      file {
        url
      }
    }
    companyName {
      companyName
    }
  }
}

`