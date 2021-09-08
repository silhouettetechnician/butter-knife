import React, { useContext } from 'react';
import { Link } from "gatsby"
import styled from '@emotion/styled'
import Flex from '../../styles/Flex'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'
import StoreContext from '../../contexts/Context'
import AuthWrapper from "../../layouts/AuthWrapper"
import AddAddressForm from "../../components/account/adresses/addAddressForm"
import DeleteAddress from "../../components/account/adresses/deleteAddress"
// import EditAddressForm from "../../components/account/adresses/editAddressForm"

const CUSTOMER_ADDRESS = gql`
query($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
        defaultAddress {
            id
        }
        addresses(first: 10) {
            edges {
                node {
                    id
                    address1
                    address2
                    city
                    phone
                    lastName
                    firstName
                    country
                    name
                    zip
                }
            }
        }
    }
}
`
const Box = styled.div`
    position: relative;
    max-width: 600px;
    width: 50%;
    height: 250px;
    background: #fff;
    margin: 2%;
    box-shadow: 0 0 15px rgb(0 0 0 / 10%);
`
const Addresses = () => {
    const { customerAccessToken } = useContext(StoreContext);
    return (
        <AuthWrapper>
            <Query
                query={CUSTOMER_ADDRESS}
                variables={{
                    customerAccessToken: customerAccessToken.accessToken
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <div style={{fontFamily: 'bangers'}}>Fetching</div>
                    if (error) return <div style={{fontFamily: 'bangers'}}>Error</div>
                    const { defaultAddress, addresses } = data.customer
                    return (
                        <Flex column alignCenter width='80%'>
                            <Flex alignCenter justifyCenter column>
                            <h2 style={{fontFamily: 'bangers'}}>Your Addresses</h2>
                            <Link to={"/account"}><p className="has-text-black" style={{ textDecoration: "underline" }}>Return to Account Details</p></Link>
                            <AddAddressForm />
                            <br />
                            </Flex>
                            <Flex justifyCenter alignCenter width='100%'>
                                    {
                                    addresses != null && (
                                        addresses.edges.map((address => (
                                            <Box key={address.node.id} >
                                                    <br/>
                                                    {
                                                        defaultAddress.id === address.node.id && 
                                                        <div className="ribbon ribbon-top-right"><span>default</span></div>                                                
                                                    }
                                                    <p className="has-text-grey">{address.node.firstName} {address.node.lastName}</p>
                                                    <p className="has-text-grey">{address.node.address1}</p>
                                                    <p className="has-text-grey">{address.node.zip}, {address.node.city}</p>
                                                    <p className="has-text-grey">{address.node.country}</p>
                                                    {/* <EditAddressForm address={address.node} /> */}
                                                    <DeleteAddress id={address.node.id}/>
                                            </Box>
                                        )))
                                    )
                                }
                            </Flex>
                            <br/>
                        </Flex>
                    )
                }}
            </Query>
        </AuthWrapper>
    );
};

export default Addresses;