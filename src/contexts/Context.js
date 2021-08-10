import React from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
  domain: `${process.env.GATSBY_SHOP_NAME}.myshopify.com`,
})

export const defaultStoreContext = {
  client,
  adding: true,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
  filteredType: 'all',
  filteredSort: 'featured',
  customerAccessToken: null,
  setValue: () => { },
  addVariantToCart: () => { },
  addVariantToCartAndBuyNow: () => { },
  removeLineItem: () => { },
  updateLineItem: () => { },
}

const StoreContext = React.createContext(defaultStoreContext)

export default StoreContext