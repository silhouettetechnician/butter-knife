import React from 'react'
import { Card } from 'react-bootstrap';
import { graphql } from "gatsby"

const ClothingItem = ({ src, title, price, description, onClick, edge }) => <Card onClick={onClick} style={{ width: '20rem', margin: '5px', border: 'none' }}>
        <Card.Img style={{ width: '100%', height: '100%' }} variant="top" src={src} />
        <Card.Body>
            <Card.Title>{edge ? edge.productName.productName : ' '}</Card.Title>
            <hr />
            <Card.Text style={{ color: 'grey', fontSize: '12px' }}>
               {description}
        </Card.Text>
            <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>£{price}</Card.Text>
        </Card.Body>
    </Card>

export default ClothingItem