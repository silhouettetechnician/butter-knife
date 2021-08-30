import React, { useState, useEffect } from 'react';
import SEO from '../components/Seo'
import { Carousel } from 'react-responsive-carousel';
import styled from '@emotion/styled';
import { Link, navigate } from "gatsby";
import Flex from '../styles/Flex'
import { graphql } from "gatsby"
import video from '../assets/MASKSANDSWEATSSAM.mp4'

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
  // console.log(HomeVideo, 'cideo')
  const {
    contentfulBrand: { companyName: companyName, brandImages },
  } = data

  return (
    <>
      <SEO title='Butterknife' description='Fashion. Footwear. Luxury' metaImage='/mainlogo.png' />
      {/* <VideoWrapper> */}
      <Flex justifyCenter width='100vw'>
        <div style={{position: 'absolute', top: '30%', textAlign: 'center'}}>
          <h1 style={{ position: 'relative', color: 'white', fontSize: '3em', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>INTRODUCING NOM</h1>
          <Link to={`/designers/nom`}><button><div className="knife -knife-float" text="SHOP NOW" temptext="Slice here"><div></div></div></button></Link>
        </div>
        {/* <Video videoSrcURL='https://imgur.com/a/8NRu2Z9'/> */}
        <video style={{objectFit: 'cover'}} width='100%' height='100%' preload='auto' loop autoPlay muted>
          <source src={video} type="video/mp4" />
        </video>
        </Flex>
        {/* <ReactPlayer className='react-player' width='100vw' height='100vh' playing url={video} muted loop /> */}
      {/* </VideoWrapper> */}
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