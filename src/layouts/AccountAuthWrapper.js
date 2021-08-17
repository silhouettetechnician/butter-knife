import React,{useContext} from 'react';
import { navigate } from 'gatsby'
import StoreContext from "../contexts/Context"


const AccountAuthWrapper = (props, log) => {
    const { customerAccessToken, client } = useContext(StoreContext);
    console.log(customerAccessToken, 'customerAccessToken')
    console.log(client, 'client')
    const isAuthenticated = customerAccessToken && customerAccessToken.expiresAt && customerAccessToken.expiresAt > new Date().toISOString() ? true : false
    console.log(isAuthenticated, 'isAuthenticated')

    return (
        <>
        {
            (isAuthenticated)
                ? (typeof window !== 'undefined') ? navigate(`/account`) : null
                : props.children
        }
    </>
    );
};

export default AccountAuthWrapper;