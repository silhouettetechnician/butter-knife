import React from 'react'
import Home from './components/Home'
// import Brands from './pages/Brands'
import ProductsByDesigner from './pages/ProductsByDesigner'
import ProductsByItem from './pages/ProductsByItem'
import Clothing from './pages/Clothing'
import Shoes from './pages/Shoes'
import Accessories from './pages/Accessories'

export const routes = {
    '/': () => <Home />,
    // '/designers': () => <Brands />,
    '/designers/:name': ({name}) => <ProductsByDesigner name={unescape(name)} />,
    '/clothing': () => <Clothing />,
    '/clothing/:title': ({title}) => <ProductsByItem title={unescape(title)} />,
    '/shoes': () => <Shoes />,
    '/accessories': () => <Accessories />,
    // '/about': () => <AboutPage />,
    // '/products': () => <ProductOverview />,
    // '/products/:id': ({id}) => <ProductDetails id={id} />
};
 
export default routes