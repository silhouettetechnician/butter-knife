import React from 'react'
import styled from '@emotion/styled'
import Flex from '../styles/Flex'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

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
            <hr/>
      {/* <ul>
        <li>Name: </li>
        <li>E-mail: {user.email}</li>
      </ul> */}
      </>
    )
}

export default withAuthenticationRequired(Account)