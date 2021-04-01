import React from 'react'
import { Link } from 'gatsby'
import { graphql } from "gatsby"
import { Heading1 } from '../components/StyledComponents';

const designerList = [
    {
        name: 'NOM'
    },
    {
        name: 'Acne Studios'
    },
    {
        name: 'adidas Originals'
    },
    {
        name: 'Aeries'
    },
    {
        name: 'Hermes'
    },
    {
        name: 'Saint Laurent Paris'
    }
]
const Brands = ({data}) => {
    const {
        allContentfulBrand: { nodes },
      } = data
      console.log(nodes, nodes)
    return(
    <>
    <Heading1>Designers</Heading1>
    {nodes && nodes.map((brand, i) => (
        <Link key={i} to={`/brands/${brand.companyName}`} name={brand.name} className='strike'>{brand.companyDescription}</Link>
    ))}
    </ >
)
    }

export default Brands
