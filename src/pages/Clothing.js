import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { navigate, A, useRouteMatch } from 'hookrouter';
import Flex from '../styles/Flex';
import firebase from "gatsby-plugin-firebase"

const ClothingItem = ({ src, title, price, onClick }) => {
    return <Card onClick={onClick} style={{ width: '20rem', margin: '5px', border: 'none' }}>
        <Card.Img style={{ width: '100%', height: '100%' }} variant="top" src={src} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <hr />
            <Card.Text style={{ color: 'grey', fontSize: '12px' }}>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
        </Card.Text>
            <Card.Text style={{ fontSize: '16px', fontWeight: 'bold' }}>£{price}</Card.Text>
        </Card.Body>
    </Card>
}
const Clothing = ({ name }) => {
    // firebase.initializeApp()
    const [data, setData] = useState([])
    // const [loading, setLoading] = useState(false)
    useEffect(() => {
        firebase
        .database()
        .ref("/products")
        .once("value")
        .then(snapshot => {
          setData(snapshot.val())
        })
        // fetch('https://butterknifestore-default-rtdb.europe-west1.firebasedatabase.app/products.json', {mode:"cors"})
        // .then(res => res.json())
        // .then(json => setData(json))
        // .catch(err => console.log(err))
    }, [])
    console.log(data, 'data')
    return (
        <>
        <div style={{height: '50px'}}></div>
        <Flex margin='20px 0 0 0' justifyAround>
            {/* <ClipLoader size={160} color='FECE2E' loading={loading}/> */}
            {data && data.map((i, id) => {
                return <ClothingItem key={id} onClick={() => { navigate(`/clothing/${i.title}`) }} title={i.title} src={i.image} price={i.price}/>
            })}
        </Flex>
        </>
    )
}

export default Clothing