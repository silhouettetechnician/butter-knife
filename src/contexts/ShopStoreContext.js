import React, { createContext } from 'react';
import shopStore from "../mst/ShopStore";

export const DashboardStoreContext = createContext();
export const DashboardStoreProvider = ({
    children,
    products
}) => {
    if(products) {shopStore.setProducts(products);}
    return <DashboardStoreContext.Provider value={shopStore}>{children}</DashboardStoreContext.Provider>;
};

export default DashboardStoreContext;