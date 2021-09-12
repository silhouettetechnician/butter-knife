import React, { useEffect } from 'react';
import SEO from '../components/Seo';
import { Link, navigate } from "gatsby";
import Flex from '../styles/Flex'
// import ReactPlayer from 'react-player'
import video from '../assets/MASKSANDSWEATSSAM.mp4';

const App = () => {

  // useEffect(() => {
  //   const initialValue = document.body.style.zoom;
  //   document.body.style.zoom = "90%";
  
  //   return () => {
  //     document.body.style.zoom = initialValue;
  //   };
  // },[])

  return (
    <>
      <SEO title='Butterknife' description='Fashion. Footwear. Luxury' metaImage='/mainlogo.png' />
      <Flex justifyCenter width='100vw'>
        <div style={{position: 'absolute', top: '30%', textAlign: 'center', zIndex: '999'}}>
          <h1 style={{ position: 'relative', color: 'white', fontSize: '3em', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>INTRODUCING NOM</h1>
          <button onClick={() => navigate('/designers/nom')}><div className="knife -knife-float" text="SHOP NOW" temptext="Slice here"><div></div></div></button>
        </div>
        <video style={{objectFit: 'cover'}} width='100%' height='100%' preload='auto' loop autoPlay muted>
          <source src={video} type="video/mp4" />
        </video>
        </Flex>
    </>
  );
}

export default App;