import React from 'react'
import useGlobalState from '../hooks/useGlobalState'
import StoreContext from '../contexts/StoreContext'

const GlobalStateProvider = ({children}) => {
    return <StoreContext.Provider value={useGlobalState()}>{children}</StoreContext.Provider>
}

export default GlobalStateProvider