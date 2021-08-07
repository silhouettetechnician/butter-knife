
import React from 'react'
import ContextConsumer from './Context'
import PropTypes from 'prop-types';

const AuthWrapper = ({children}) => {

        return (
            <ContextConsumer>
                {({ store }) => {
                    const isAuthenticated = store.customerAccessToken && store.customerAccessToken.expiresAt && store.customerAccessToken.expiresAt > new Date().toISOString() ? true : false
                    return (children({
                            isAuthenticated,
                        }))
                }}
            </ContextConsumer>
        )
}

export default AuthWrapper
AuthWrapper.propTypes = {
    children: PropTypes.func.isRequired,
}