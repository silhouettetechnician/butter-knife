import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import styled from '@emotion/styled'

const FigureCaption = styled.figcaption`
font-size: 14px;
line-height: 1;
color: rgb(26, 26, 26);
box-sizing: border-box;
font-family: ProximaNova-Regular, "Helvetica Neue", Verdana, Arial, sans-serif;
letter-spacing: 0.35px;
margin: 0px;
padding: 0px;
border: 0px;
vertical-align: baseline;
flex: 1 1 0%;
display: flex;
flex-direction: column;
`
const BrandFigure = styled.figure`
font-size: 14px;
line-height: 1;
color: rgb(26, 26, 26);
box-sizing: border-box;
font-family: ProximaNova-Regular, "Helvetica Neue", Verdana, Arial, sans-serif;
letter-spacing: 0.35px;
margin: 0px;
padding: 0px;
border: 0px;
vertical-align: baseline;
display: flex;
flex-direction: column;
height: 100%;
`

const BrandLink = ({ brand }) => {
    return (
        <Link to={`/designers/${brand.handle}`}>
            <figure className="snip1104 red">
                <img /*style={{ height: '100% !important', objectFit: 'cover' }}*/ src={brand.image.originalSrc} />
                <figcaption>
                    <h2>{brand.title}</h2>
                </figcaption>
            </figure>
        </Link>
    )
}

export default BrandLink
