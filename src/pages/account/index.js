import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Flex from '../../styles/Flex'
import AccountTab from '../../components/AccountTab'
import AccountLayout from '../../layouts/AccountLayout'
import ContextConsumer from '../../layouts/Context'
import gql from "graphql-tag"
import { Query } from '@apollo/client'

const Banner = styled(Flex)`
 padding: 10px 0px; 
 align-items: center;
 flex-direction: column;
// `

const CUSTOMER_INFO = gql`
query($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
        firstName
        lastName
        email
        phone
        defaultAddress {
            firstName
            lastName
            address1
            address2
            city
            provinceCode
            zip
            country
        }
        createdAt
        acceptsMarketing
        orders(first: 1, reverse: true) {
            edges {
                node {
                    id
                    name
                    orderNumber
                    statusUrl
                    totalPrice
                    customerUrl
                }
            }
        }
    }
}
`
const Account = () => {
    const [value, setValue] = useState(0);

    return (
        <AccountLayout>
            <h1>Account Dashboard</h1>
            <ContextConsumer>
                {({ store }) => {
                    return (
                        <Query
                            query={CUSTOMER_INFO}
                            variables={{ customerAccessToken: store.customerAccessToken.accessToken }}
                        >
                            {({ loading, error, data }) => {
                                if (error) return <div>Error :(</div>
                                let greeting = `Welcome back!`
                                if (loading) return (
                                    <>
                                        <p>{greeting}</p>

                                        <h2>Account Info</h2>
                                        <div>
                                            <h3>Email</h3>
                                            <p></p>
                                        </div>
                                        {
                                            phone
                                                ? (
                                                    <div>
                                                        <h3>Phone</h3>
                                                        <p></p>
                                                    </div>
                                                )
                                                : ''
                                        }
                                        <div>
                                            <h3>Order History</h3>
                                            <p></p>
                                        </div>
                                    </>
                                )

                                const { firstName, email, phone, orders } = data.customer;

                                greeting = (firstName) ? `Welcome back ${firstName}!` : greeting

                                return (
                                    <>
                                        <p>{greeting}</p>
                                        <AccountTab value={value} setValue={setValue} />
                                        {value === 0 ?
                                            <Banner>
                                                <h4>My Account</h4>
                                                <p>{user.nickname}</p>
                                            </Banner> :
                                        value === 1 ?
                                        <div>hello 2</div> :
                                        value === 2 ?
                                        <div>hello 3</div> : null
            }
                                        <h2>Account Info</h2>
                                        <div>
                                            <h3>Email</h3>
                                            <p>{email}</p>
                                        </div>
                                        {
                                            phone
                                                ? (
                                                    <div>
                                                        <h3>Phone</h3>
                                                        <p>{phone}</p>
                                                    </div>
                                                )
                                                : ''
                                        }
                                        <div>
                                            <h3>Order History</h3>
                                            {
                                                orders.length
                                                    ? 'TOOD: SHOW ORDERS'
                                                    : <p>You haven't placed any orders yet.</p>
                                            }
                                        </div>
                                    </>
                                )
                            }}
                        </Query>
                    )
                }}
            </ContextConsumer>
        </AccountLayout>
    )
}

export default Account