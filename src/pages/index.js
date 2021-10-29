import React, { useState, useContext } from 'react';
import SEO from '../components/Seo';
import styled from '@emotion/styled'
import { graphql, navigate, Link } from "gatsby";
import Flex from '../styles/Flex'
import { Helmet } from 'react-helmet'
import Carousel from 'react-multi-carousel';
import ClothingItem from '../templates/ClothingItem';
import PostLink from '../components/PostLink'
import Context from '../contexts/StoreContext'
const ArrowDown = styled.div`
    background: white !important;
    &:after{
        background: white !important;
    }
`
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  }
};

const App = ({ data: {
  site,
  allMarkdownRemark: { edges },
  allShopifyProduct,
}, }) => {
  const { state } = useContext(Context)
  const productNodes = allShopifyProduct.edges.map(edge => {
    return {
      ...edge.node
    }
  })
  // const Posts = edges
  // .filter(edge => !!edge.node.frontmatter.date) 
  // .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
  const [newIn, setNewIn] = useState(productNodes)
  return (
    <>
      <Helmet>
        <html lang='en' />
        {/* <title>{title}</title> */}
        <script id="mcjs" type="text/javascript">{`!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/c4c71e9aa1bc1e3413190f30c/d80f43037ec26a9c19d2ad25e.js");`}</script>
      </Helmet>
      <SEO title='Butterknife Clothing' description='Fashion. Footwear. Luxury' metaImage='/mainlogo.png' />
      <Flex justifyCenter width='100%'>
        <div style={{ position: 'absolute', top: '17%', textAlign: 'center', zIndex: '999' }}>
          <h1 style={{ position: 'relative', color: 'white', fontSize: '4vw', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>Introducing <br /> Dhenze</h1>
          <button onClick={() => navigate('/designers/dhenze')}><div className="knife -knife-float" text="SHOP NOW" temptext="Slice here"><div></div></div></button>
        </div>
        <video autoPlay style={{ objectFit: 'cover' }} width='100%' loop muted>
          <source src='https://imgur.com/1nnPZaZ.mp4' type="video/mp4" />
        </video>
      </Flex>
      <Flex width='100%' justifyCenter alignCenter>
        <h1 style={{ margin: '3%', position: 'relative', color: `${state.isDark ? 'white' : 'black'}`, fontSize: '2.4em', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>Latest products</h1>
      </Flex>
      <Carousel itemClass="carousel-item-padding-0-px" infinity={false} swipeable={true} containerClass="carousel-container" responsive={responsive}>
        {newIn ? newIn.map((product, i) => <Link key={product.id} to={`/clothing/${product.handle}`}><ClothingItem data={newIn} vendor={product.vendor} title={product.title} description={product.description} src={product.images && product.images[0].originalSrc} price={product.priceRangeV2 && Math.round(product.priceRangeV2.maxVariantPrice.amount)} /></Link>) : <div class="loader">Loading...</div>}
      </Carousel>
      {/* <Flex width='100%'> 
        <div style={{ width: '100%' }}>
          <Flex margin='10px 0 30px 0' style={{ flexFlow: 'row wrap', justifyContent: 'space-around' }}>
            {Posts}
          </Flex>
        </div>
      </Flex> */}
    </>
  );
}

export default App;

export const query = graphql`
{
    allShopifyProduct(
      sort: {order: DESC, fields: variants___product___variants___createdAt}
      limit: 15
    ) {
      edges {
        node {
          id
          handle
          createdAt
          title
          vendor
          variants {
            id
            price
            title
            product {
              id
              title
            }
            selectedOptions {
              name
              value
            }
          }
          tags
          description
          createdAt
          priceRangeV2 {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          productType
          images {
            originalSrc
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            path
            thumbnail
            description 
          }
        }
      }
    }
  }
`
