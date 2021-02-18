import React from 'react'
import { A } from 'hookrouter'
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
const Brands = () => (
    <>
    <Heading1>Designers</Heading1>
    {designerList.map((brand, i) => (
        <A key={i} href={`/designers/${brand.name}`} name={brand.name} className='strike'>{brand.name}</A>
    ))}
    </ >
)

export default Brands