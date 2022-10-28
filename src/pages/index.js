import React, { useState, useContext } from 'react';
import styled from '@emotion/styled'
import { graphql, navigate, Link } from "gatsby";
import Flex from '../styles/Flex'
import Carousel from 'react-multi-carousel';
import ReactPlayer from 'react-player'
import Video from '../assets/home.mp4'
import ClothingItem from '../templates/ClothingItem';
import PostLink from '../components/PostLink'
import Context from '../contexts/StoreContext'
import BrandLink from '../components/BrandLink';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2
  }
};

const App = ({ data: {
  allMarkdownRemark: { edges },
  allShopifyProduct,
  allShopifyCollection
}, }) => {
  const { state } = useContext(Context)
  const productNodes = allShopifyProduct.edges.map(edge => {
    return {
      ...edge.node
    }
  })
  const brandNodes = allShopifyCollection.edges.map(edge => {
    return {
      ...edge.node
    }
  })
  const Brands = brandNodes && brandNodes.map(brand => <BrandLink key={brand.id} brand={brand} />)
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
  const [newIn, setNewIn] = useState(productNodes)
  return (
    <>
      <Flex justifyCenter width='100%'>
        <div style={{ position: 'absolute', top: '10%', textAlign: 'center', zIndex: '999' }}>
          <h1 style={{ position: 'relative', color: 'white', fontSize: '4vw', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase', textShadow:"1px 0 0 black,0 1px 0 black,-1px 0 0 black,0 -1px 0 black" }}>BRAND NEW<br />VERY RARE</h1>
          <button style={{textShadow:"1px 0 0 black,0 1px 0 black,-1px 0 0 black,0 -1px 0 black"}} onClick={() => navigate('/designers/very-rare')}><div className="knife -knife-float" text="SHOP NOW" temptext="Slice here"><div></div></div></button>
        </div>
        {/* <iframe src='https://imgur.com/a/m0FfFP7'
          frameborder='0'
          allow='autoplay; encrypted-media'
          allowfullscreen
          title='video'
        /> */}
      <video autoPlay width='100%' loop muted>
        {/* <source src='https://videopress.com/embed/Q0VvEnUo/autoPlay=1%22' type="video/mp4" /> */}
        <source src={Video} type="video/mp4" />
        </video>  
      </Flex>
      <Flex width='100%' justifyCenter alignCenter>
        <h2 style={{ margin: '3%', position: 'relative', color: `${state.isDark ? 'white' : 'black'}`, fontSize: '2.4em', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>Latest products</h2>
      </Flex>
      <Carousel itemClass="carousel-item-padding-0-px" infinity={false} swipeable={true} containerClass="carousel-container" responsive={responsive}>
        {newIn ? newIn.map((product, i) => <Link key={product.id} to={`/clothing/${product.handle}`}><ClothingItem data={newIn} vendor={product.vendor} title={product.title} description={product.description} src={product.images && product.images[0].originalSrc} price={product.priceRangeV2 && Math.round(product.priceRangeV2.maxVariantPrice.amount)} /></Link>) : <div class="loader">Loading...</div>}
      </Carousel>
      {/* BLOG */}
      {/* <Flex width='100%'>
        <div style={{ width: '100%' }}>
          <h2 style={{ margin: '1% 0 3% 0', position: 'relative', color: `${state.isDark ? 'white' : 'black'}`, fontSize: '2.4em', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>Features</h2>
          <Flex margin='10px 0 30px 0' style={{ flexFlow: 'row wrap', justifyContent: 'space-around' }}>
            {Posts}
          </Flex>
        </div>
      </Flex> */}
      {/* BRANDS */}
      <Flex width='100%'>
        <div style={{ width: '100%' }}>
          <h2 style={{ margin: '1% 0 3% 0', position: 'relative', color: `${state.isDark ? 'white' : 'black'}`, fontSize: '2.4em', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>Brands</h2>
          <Flex margin='10px 0 30px 0' style={{ flexFlow: 'row wrap', justifyContent: 'space-around' }}>
          <Carousel itemClass="carousel-item-padding-0-px" infinity={false} swipeable={true} containerClass="carousel-container" responsive={responsive}>
            {Brands}
          </Carousel>
          </Flex>
        </div>
      </Flex>
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
    allShopifyCollection {
      edges {
        node {
          description
          descriptionHtml
          handle
          id
          image {
            originalSrc
          }
          title
        }
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
