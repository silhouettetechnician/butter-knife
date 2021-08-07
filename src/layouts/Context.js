import React, { useState } from "react"

const defaultContextValue = {
    set: () => { },
}

const { Provider, Consumer } = React.createContext(defaultContextValue)

const ContextProviderComponent = () => {
    const [ set, setSet ] = useState(setData)
    const [ store, setStore ] = useState({
        cartCount: getLocalStorageFromKey('cartCount') || 0,
        customerAccessToken: getLocalStorageFromKey('customerAccessToken'),
        isCartOpen: false,
        checkout: getLocalStorageFromKey('checkout')
    })
    
    const getLocalStorageFromKey = (key) => {
        try {
            return JSON.parse(localStorage.getItem(key))
        } catch(e) {
            // error retrieving
            return ''
        }
    }

    const setData = (newData, shouldStoreLocal = true) => {
        setStore({
                ...store,
                ...newData,
        })

        if (!shouldStoreLocal) return

        Object.keys(newData).forEach(key => {
            try {
                localStorage.setItem(key, JSON.stringify(newData[key]));
            } catch (e) {
                console.log(e)
            }
        })
    }

        return <Provider set={set} store={store}>{children}</Provider>
}

export { Consumer as default, ContextProviderComponent }