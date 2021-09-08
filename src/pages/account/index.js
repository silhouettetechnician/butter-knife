import React, { useContext } from 'react';
import styled from '@emotion/styled'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'
import { PageHeading } from '../../components/StyledComponents'
import StoreContext from '../../contexts/Context'
import Context from '../../contexts/StoreContext'
import AuthWrapper from "../../layouts/AuthWrapper"
import OrdersList from "../../components/account/orders-list"
import DefaultAddress from "../../components/account/default-address"

const NameTag = styled.p`
    font-family: CODE;
    margin: 1rempx 0;
`

const CUSTOMER_INFO = gql`
query($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
        email
        firstName
        lastName
        phone
        defaultAddress {
            firstName
            lastName
            address1
            city
            zip
            country
        }
        orders(first: 10) {
            edges {
                node {
                    name
                    totalPrice
                    processedAt
                    statusUrl
                    currencyCode
                    lineItems(first: 10) {
                        edges {
                            node {
                                title
                                quantity
                            }
                        }
                    }
                    shippingAddress {
                        address1
                        city
                        lastName
                        firstName
                        zip
                        country
                    }
                    subtotalPrice
                    totalPrice
                }
            }
        }
        addresses(first: 10) {
            edges {
                node {
                    address1
                    city
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
const Account = () => {
    const { customerAccessToken } = useContext(StoreContext);
    const { state } = useContext(Context);
    return (
        <AuthWrapper>
            <Query
                query={CUSTOMER_INFO}
                variables={{
                    customerAccessToken: customerAccessToken.accessToken
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <div style={{ fontFamily: 'bangers' }}>Fetching</div>
                    if (error) return <div style={{ fontFamily: 'bangers' }}>Error</div>
                    const { defaultAddress, orders, email, firstName, addresses, lastName } = data.customer
                    console.log(data, 'data')
                    return (
                        <>
                            <PageHeading isDark={state.isDark}>My Account</PageHeading>
                            {/* <section className="hero is-medium"> */}
                                {/* <div className="hero-body"> */}
                                    {/* <div className="container"> */}
                                        {/* <div className="container"> */}
                                            <div style={{ color: `${state.isDark ? 'white' : 'black'}`, width: '80%' }} className="columns is-centered">
                                                <OrdersList isDark={state.isDark} orders={orders} />
                                                <hr/>
                                                <h3 style={{ fontFamily: 'bangers' }}>Your Details</h3>
                                                <NameTag>{firstName + ' ' + lastName}</NameTag>
                                                <NameTag>{email}</NameTag>
                                                <hr/>
                                                <DefaultAddress
                                                    isDark={state.isDark}
                                                    defaultAddress={defaultAddress}
                                                    addressesSize={addresses.edges.length}
                                                />
                                            {/* </div> */}
                                        {/* </div> */}
                                    {/* </div> */}
                                </div>
                            {/* </section> */}
                        </>
                    )
                }}
            </Query>
        </AuthWrapper>
    );
};

export default Account;