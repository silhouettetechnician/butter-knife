import React from 'react'
import styled from '@emotion/styled'
import Flex from '../styles/Flex'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import AccountTab from '../components/AccountTab'

const Banner = styled(Flex)`
 padding: 10px 0px; 
 align-items: center;
 flex-direction: column;
`

const Account = () => {
    const { user } = useAuth0();
    console.log(user, 'user')
    return (
        <>
        <Banner>
            <h4>My Account</h4>
            <p>{user.nickname}</p>
        </Banner>
        <AccountTab/>
            <hr/>
      </>
    )
}

export default withAuthenticationRequired(Account)