import React from 'react'
import { Card } from 'react-bootstrap';
import { graphql } from "gatsby"

const ClothingItem = ({ src, title, price, description, onClick, edge }) => <Card onClick={onClick} style={{ width: '20rem', margin: '5px', border: 'none' }}>
    
        <Card.Img style={{ width: '100%', height: '100%' }} variant="top" src={src} />
        
        
        <Card.Body>
            <Card.Title style={{textTransform: 'uppercase', textAlign: 'center', fontSize: '20px'}}>{title}</Card.Title>
            <Card.Text style={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>£{price}</Card.Text>
            <hr />
            {/* <Card.Text style={{ color: 'grey', fontSize: '12px' }}>
               {description}
        </Card.Text> */}
        </Card.Body>
    </Card>

export default ClothingItem