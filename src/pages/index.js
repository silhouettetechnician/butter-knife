import React, { useState, useEffect } from 'react';
import SEO from '../components/Seo'
import { Carousel } from 'react-responsive-carousel';
import styled from '@emotion/styled';
import { Link, navigate } from "gatsby";
import Flex from '../styles/Flex'
import { graphql } from "gatsby"
import ReactPlayer from 'react-player'
// import HomeVideo from '/MASKSANDSWEATSSAM.mp4'

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
const {
  contentfulBrand: { companyName: companyName, brandImages },
} = data

    return (
      <>
          <SEO title='Butterknife' description='Fashion. Footwear. Luxury' metaImage='/mainlogo.png'/>
            <VideoWrapper>
            <Flex padding='10% 0 0 0' column justifyCenter alignCenter>
            <h1 style={{zIndex: '999', position: 'relative', color: 'white', fontSize: '4rem', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase'}}>INTRODUCING NOM</h1>
            <Link style={{zIndex: '999'}}to={`/designers/nom`}><button><div className="knife -knife-float" text="SHOP NOW" temptext="Slice here"><div></div></div></button></Link>
            </Flex>
            <ReactPlayer className='react-player' width='100vw' height='100vh' playing url='https://imgur.com/fjocuPl.mp4' muted loop />
            </VideoWrapper>
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