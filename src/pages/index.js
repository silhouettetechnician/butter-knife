import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import withAuthProvider from '../hocs/withAuthProvider'
import styled from '@emotion/styled';
import { graphql } from "gatsby"
import ReactPlayer from 'react-player'

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
        allContentfulAsset: { nodes },
    } = data
    console.log(nodes[0].file.url, 'node')
    // console.log(node.file[1].file.url,'file[1].file.url')
    // const {hello} = data.nodes[1].file
    return (
            <>
            <ReactPlayer width='100%' height='100%' playing url={nodes[0].file.url} muted loop />
            </>
    );
}

export default App;

export const query = graphql`
  {
    allContentfulAsset {
        nodes {
          file {
            url
          }
        }
      }
  }
`