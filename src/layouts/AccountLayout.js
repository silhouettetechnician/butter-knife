
import React from 'react'
import AuthWrapper from './AuthWrapper'
import { navigate } from 'gatsby'


const AccountLayout = ({children}) => {
    
        return (
            <AuthWrapper>
                {({ isAuthenticated }) => (
                    (isAuthenticated)
                        ? children
                        : (typeof window !== 'undefined') ? navigate(`/account/login`) : null
                )}
            </AuthWrapper>
        )
    }


export default AccountLayout