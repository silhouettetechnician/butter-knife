import React from 'react'
import Home from './components/Home'
import Brands from './pages/Brands'
import Clothing from './pages/Clothing'
import Shoes from './pages/Shoes'
import Accessories from './pages/Accessories'

export const routes = {
    '/': () => <Home />,
    '/brands': () => <Brands />,
    '/clothing': () => <Clothing />,
    '/shoes': () => <Shoes />,
    '/accessories': () => <Accessories />,
    // '/about': () => <AboutPage />,
    // '/products': () => <ProductOverview />,
    // '/products/:id': ({id}) => <ProductDetails id={id} />
};
 
export default routes