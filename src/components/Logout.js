import React, { useCallback, useEffect, useState } from "react";
import { Formik, ErrorMessage } from 'formik'
import gql from 'graphql-tag';
import { Mutation } from '@apollo/client/react/components'
import { Link, navigate } from 'gatsby'
import ContextConsumer from '../contexts/Context'
// import AuthWrapper from '../layouts/AuthWrapper'

const CUSTOMER_LOGOUT = gql`
mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        userErrors {
            field
            message
        }
        deletedAccessToken
        deletedCustomerAccessTokenId
    }
}
`

const Logout = () => (
    <>
            <Mutation
                mutation={CUSTOMER_LOGOUT}
                onCompleted={data => {
                    if (data.customerAccessTokenDelete.userErrors.length) return

                    set({
                        customerAccessToken: '',
                        cart: '',
                    })

                    // TODO: if active checkout, dissaociate customer


                    navigate('/account/login')
                }}
            >
                {(customerLogout, { loading }) => {
                    return <Link
                        to="/account/login"
                        onClick={e => {
                            e.preventDefault()

                            // delete the Shopify customer token
                            customerLogout({
                                variables: {
                                    "customerAccessToken": store.customerAccessToken.accessToken,
                                }
                            })
                        }}
                    >
                        Log Out
                    </Link>
                }}
            </Mutation>
            )
    </>
)

export default Logout