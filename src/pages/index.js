import React, { useState, useContext } from 'react';
import styled from '@emotion/styled'
import { graphql, navigate, Link } from "gatsby";
import Flex from '../styles/Flex'
import Carousel from 'react-multi-carousel';
import ReactPlayer from 'react-player'
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
        {/* <div style={{ position: 'absolute', top: '10%', textAlign: 'center', zIndex: '999' }}>
          <h1 style={{ position: 'relative', color: 'white', fontSize: '4vw', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>SHOP NOM<br />CLOTHING</h1>
          <button onClick={() => navigate('/designers/nom')}><div className="knife -knife-float" text="SHOP NOW" temptext="Slice here"><div></div></div></button>
        </div> */}
        <video autoPlay style={{ objectFit: 'cover', objectPosition: '10% 0 10% 0' }} width='100%' loop muted>
          <source src='https://imgur.com/fjocuPl.mp4' type="video/mp4" />
          {/* <source src='https://imgur.com/BEtntzB.mp4' type="video/mp4" /> */}
        </video>
      </Flex>
      <Flex width='100%' justifyCenter alignCenter>
        <h1 style={{ margin: '3%', position: 'relative', color: `${state.isDark ? 'white' : 'black'}`, fontSize: '2.4em', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>Latest products</h1>
      </Flex>
      <Carousel itemClass="carousel-item-padding-0-px" infinity={false} swipeable={true} containerClass="carousel-container" responsive={responsive}>
        {newIn ? newIn.map((product, i) => <Link key={product.id} to={`/clothing/${product.handle}`}><ClothingItem data={newIn} vendor={product.vendor} title={product.title} description={product.description} src={product.images && product.images[0].originalSrc} price={product.priceRangeV2 && Math.round(product.priceRangeV2.maxVariantPrice.amount)} /></Link>) : <div class="loader">Loading...</div>}
      </Carousel>
      {/* BLOG */}
      {/* <Flex width='100%'>
        <div style={{ width: '100%' }}>
          <h1 style={{ margin: '1% 0 3% 0', position: 'relative', color: `${state.isDark ? 'white' : 'black'}`, fontSize: '2.4em', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>Features</h1>
          <Flex margin='10px 0 30px 0' style={{ flexFlow: 'row wrap', justifyContent: 'space-around' }}>
            {Posts}
          </Flex>
        </div>
      </Flex> */}
      {/* BRANDS */}
      <Flex width='100%'>
        <div style={{ width: '100%' }}>
          <h1 style={{ margin: '1% 0 3% 0', position: 'relative', color: `${state.isDark ? 'white' : 'black'}`, fontSize: '2.4em', fontFamily: 'BerlinXBold', textAlign: 'center', textTransform: 'uppercase' }}>Brands</h1>
          <Flex margin='10px 0 30px 0' style={{ flexFlow: 'row wrap', justifyContent: 'space-around' }}>
            {Brands}
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
    allShopifyCollection(limit: 5) {
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
