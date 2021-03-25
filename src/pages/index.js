import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styled from '@emotion/styled';
import { graphql } from "gatsby"

const App = ({ data }) => {
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
    const {
        allContentfulAsset: { edges: node },
    } = data
    console.log(node[1].node.file.url, 'node')
    // console.log(file[1].file.url,'file[1].file.url')
    // const {hello} = data.nodes[1].file
    return (
        <>
            <video playsInline loop controls autoPlay muted>
                <source src={node[1].node.file.url} type="video/mp4" />
                <p>
                    Video could not be found. <a href="mailto:daan@devign.it">Please let me know</a>
                </p>
            </video>
            {/* <img src={node[1].node.file.url} alt='vid' /> */}
            <Slider showIndicators={false} infiniteLoop={true} showStatus={false} showThumbs={false} autoPlay={true}>
                <div style={{ width: '100vw', height: '100vh' }}>
                    <img alt='carouselimg2' src={"carousel1.jpg"} />
                </div>
                <div style={{ width: '100vw', height: '100vh' }}>
                    <img alt='carouselimg1' src={"carousel1.jpg"} />
                </div>
                <div style={{ width: '100%', height: '100vh' }}>
                    <img alt='carouselimgvw' src={"carousel3.jpg"} />
                </div>
            </Slider>
        </>
    );
}

export default App;

export const query = graphql`
  {
    allContentfulAsset {
      edges{
          node{
              file{
                  contentType,
                  fileName,
                  url
              }
          }
      }
    }
  }
`