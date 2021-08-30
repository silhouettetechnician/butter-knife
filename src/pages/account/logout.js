import React, { useContext } from 'react';
// import gql from 'graphql-tag';
import { Link, navigate } from 'gatsby'
import { useMutation, gql } from '@apollo/client';
import StoreContext from '../../contexts/Context'

const CUSTOMER_LOGOUT = gql`
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
            field
            message
        }
    }
}
`

const Logout = ({isDark}) => {
    const { setValue, customerAccessToken } = useContext(StoreContext);
    const [handleLogout] = useMutation(CUSTOMER_LOGOUT)

    const handleLogoutClick = (e) => {
        e.preventDefault()
        handleLogout({
            variables: {
                "customerAccessToken": customerAccessToken.accessToken,
            }
        }).then(data => {
            // if (data.customerAccessTokenDelete.userErrors.length) return
            setValue({
                customerAccessToken: ''
            })
            navigate('/')
        })
    }
    return (

        <Link
            to={`/`}
            onClick={e => handleLogoutClick(e)}
        >
            <p
                className="has-text-centered has-text-underlined has-text-black"
                style={{ textDecoration: "underline", color: `${isDark ? 'white' : 'black'}` }}
            >
                Log out
            </p>
        </Link>
    );
};

export default Logout;