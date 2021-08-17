import React, { useContext } from 'react'
import { Card } from 'react-bootstrap';
import StoreContext from '../contexts/StoreContext'

const ClothingItem = ({ src, title, price, description, onClick, edge }) => {
    const { state } = useContext(StoreContext)
    return (
        <Card onClick={onClick} style={{ background: 'transparent', width: '20rem', margin: '5px', border: 'none' }}>
            <Card.Img style={{ width: '100%', height: '100%', background: 'transparent' }} variant="top" src={src} />
            <Card.Body>
                <Card.Title style={{ color: `${state.isDark ? 'white' : 'black'}`, textTransform: 'uppercase', textAlign: 'center', fontSize: '20px' }}>{title}</Card.Title>
                <Card.Text style={{ color: `${state.isDark ? 'white' : 'black'}`, fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}>£{price}</Card.Text>
                <hr />
                {/* <Card.Text style={{ color: 'grey', fontSize: '12px' }}>
               {description}
        </Card.Text> */}
            </Card.Body>
        </Card>
    )
}
export default ClothingItem