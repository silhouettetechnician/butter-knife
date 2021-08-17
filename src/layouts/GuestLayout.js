
import React from 'react'
import AuthWrapper from './AuthWrapper'
import { navigate } from 'gatsby'


const GuestLayout = ({children}) => {
    
        return (
            <AuthWrapper>
                {({ isAuthenticated }) => (
                    (isAuthenticated)
                    ? (typeof window !== 'undefined') ? navigate(`/account`) : null
                        : children
                )}
            </AuthWrapper>
        )
    }


export default GuestLayout