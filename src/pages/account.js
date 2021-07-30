import React from 'react'
import styled from '@emotion/styled'
import Flex from '../styles/Flex'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import AccountTab from '../components/AccountTab'
import { getProfile } from '../utils/auth'

const Banner = styled(Flex)`
 padding: 10px 0px; 
 align-items: center;
 flex-direction: column;
`
console.log(getProfile())
const Account = () => {
    const [value, setValue] = React.useState(0);
    const { user } = useAuth0();
    console.log(user, 'user')
    return (
        <>
            <AccountTab value={value} setValue={setValue} />
            {value === 0 ?
                <Banner>
                    <h4>My Account</h4>
                    <p>{user.nickname}</p>
                </Banner>`` :
                value === 1 ?
                    <div>hello 2</div> :
                    value === 2 ?
                        <div>hello 3</div> : null
            }
            <hr />
        </>
    )
}

export default withAuthenticationRequired(Account)