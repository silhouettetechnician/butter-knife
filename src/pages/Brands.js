import React, { useState } from 'react'
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import ClothingItem from '../templates/ClothingItem'
import styled from '@emotion/styled'
import Flex from '../styles/Flex'
import FilterBar from '../components/FilterBar'
import ProductHitsWithFilter from '../templates/ProductHitsWithFilter'
import { Link } from "gatsby"

const LogoImage = styled.img`
    object-fit: cover;
    object-position: 15% 40%;
    width:100%;
    height: 450px;
    background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    );
`
const BrandHeading = styled.p`
    font-family: BerlinBold;
    font-size: 3rem;
    text-transform: uppercase;
    text-decoration: underline;
    text-align: ${props => props.align || 'center'};
    color: ${props => props.color ? props.color : 'black'};
    `
const BrandCaption = styled.p`
    font-family: BerlinBold;
    font-size: 2rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    color: white;
    `

const IndividualBrand = ({ data }) => {
  console.log(data, 'data indisiduval brand')
  console.log(pageContext, 'pageContext')
  const {

    contentfulBrand: { companyName: companyName, brandImages }
  } = data;
  // const [data, setData] = useState(pageContext)
  console.log(companyName, 'companyName')
  // console.log(data, 'data')
  
  return (
    <Flex width='100%'>
      <Flex style={{ width: '100%' }}>
        <div style={{ position: 'absolute', background: 'rgba(0,0,0,0.4)', top: '32%', left: '8%' }}>
          <BrandHeading color='white'>{data.companyName}</BrandHeading>
          <BrandCaption>{data.caption}</BrandCaption>
        </div>
        {/* <LogoImage src={data.brandImages[0].file.url} /> */}
      </Flex>
      {/* <Flex width='30%'><FilterBar data={data} /></Flex> */}
      <Flex justifyCenter alignCenter width='70%'>
        {/* <div style={{background: 'rgba(0,0,0,0.4)'}}> */}
        <BrandHeading align='left' color='black'>{companyName}</BrandHeading>
        <div style={{ color: 'black', fontFamily: 'CODE' }}>{companyDescription}</div>
        {/* <StaticQuery
            query={graphql`
              query BrandQuery {
                contentfulBrand(filter: {companyName: {companyName: {eq: ${pageContext.companyName}}}) {
                nodes {
                  product {
                    image {
                      file {
                        url
                      }
                    }
                    id
                    price
                    slug
                    brand {
                      companyName {
                        companyName
                      }
                      companyDescription {
                        companyDescription
                      }
                    }
                  }
                  brandImages {
                    file {
                      url
                    }
                  }
                }
              }
            }
            `}
            render={(data, key) => {
              console.log(data, 'data')

                const {
                    nodes
                } = myQuery.data.allContentfulBrand
                const datatest = nodes[0]
                console.log(nodes[0], 'nodess[0[')
                const array = nodes[0].product
                console.log(array, 'array')
                    return data && data.product.map(i => <Link key={i} to={`/clothing/${i.slug}`}><ClothingItem data={i.product} key={i.slug} title={i.companyName} description={i.companyDescription} src={brandImages[0].file.url} price={i.price} /></Link>)
                }
            }
        /> */}
        {/* {data.product && data.product.map((i, index) =>  */}
        {/* </div> */}
      </Flex>
        {/* <ProductHitsWithFilter pageHeading={vendor} indexName='PRODUCTS'/> */}
    </Flex>
  )
}
export default IndividualBrand

export const query = graphql`
query brandQuery {
contentfulBrand(companyName: {companyName: {eq: "NOM"}}) {
  
    product {
      image {
        file {
          url
        }
      }
      id
      price
      slug
      brand {
        companyName {
          companyName
        }
        companyDescription {
          companyDescription
        }
      }
    }
    brandImages {
      file {
        url
      }
    }
  }

}
`