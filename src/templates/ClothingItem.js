import React, { useContext } from 'react'
import { Flex } from '../styles/Flex'
import { Card } from 'react-bootstrap';
import { Link } from "gatsby"
import StoreContext from '../contexts/StoreContext'

const SaleOrNot = ({ salePrice, state, price }) => {
    return salePrice ?
        <Flex alignCenter justifyCenter>
            <Card.Text style={{ margin: "0 15px 0 0", color: `${state.isDark ? 'white' : 'grey'}`, fontFamily: 'CODE', fontSize: '2rem', textDecorationLine: "line-through" }}> {`£${Math.trunc(salePrice)}`}</Card.Text>
            <Card.Text style={{ color: `${state.isDark ? 'white' : 'rgb(174, 0, 0)'}`, fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}> {`£${Math.trunc(price)}`}</Card.Text>
        </Flex>
        :
        <Card.Text style={{ color: `${state.isDark ? 'white' : 'black'}`, fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}> {`£${Math.trunc(price)}`}</Card.Text>
}


const ClothingItem = ({ src, title, price, href, vendor, onClick, product, compareAtPrice, width }) => {
    const { state } = useContext(StoreContext)
    return (
        <Link to={`/clothing/${href}`}>
            <Card onClick={onClick} style={{ background: 'transparent', width: width || '20rem', margin: '5px', border: 'none' }}>
                <Card.Img style={{ width: '100%', height: '100%' }} variant="top" src={src} />
                <Card.Body>
                    <Card.Text style={{ color: `${state.isDark ? 'white' : 'black'}`, textAlign: 'center', fontStyle: 'italic' }}>{vendor}</Card.Text>
                    <Card.Title style={{ color: `${state.isDark ? 'white' : 'black'}`, textTransform: 'uppercase', textAlign: 'center', fontSize: '20px' }}>{title}</Card.Title>
                    <SaleOrNot salePrice={compareAtPrice} state={state} price={price} />
                    <hr />
                </Card.Body>
            </Card>
        </Link>
    )
}
export default ClothingItem