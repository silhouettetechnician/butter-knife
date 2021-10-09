import React from 'react';
import SEO from '../components/Seo';
import { navigate } from "gatsby";
import Flex from '../styles/Flex'
import { Helmet } from 'react-helmet'

const App = () => {
  return (
    <>
      <Helmet>
        <html lang='en' />
        {/* <title>{title}</title> */}
        <script id="mcjs" type="text/javascript">{`!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/c4c71e9aa1bc1e3413190f30c/d80f43037ec26a9c19d2ad25e.js");`}</script>
      </Helmet>
      <SEO title='Butterknife Clothing' description='Fashion. Footwear. Luxury' metaImage='/mainlogo.png' />
      <Flex justifyCenter width='100%'>
        <div style={{ position: 'absolute', top: '30%', textAlign: 'center', zIndex: '999' }}>
          <h1 style={{ position: 'relative', color: 'white', fontSize: '3em', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>NEW DROP <br /> VERYRARE™ c/o Raf Reyes (VR®®)</h1>
          <button onClick={() => navigate('/designers/very-rare')}><div className="knife -knife-float" text="SHOP NOW" temptext="Slice here"><div></div></div></button>
        </div>
        <video style={{ objectFit: 'cover' }} width='100%' height='100%' preload='auto' loop autoPlay muted>
          <source src='https://imgur.com/6aEp0sp.mp4' type="video/mp4" />
        </video>
      </Flex>
    </>
  );
}

export default App;