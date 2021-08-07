import React, {useState, useEffect} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./src/App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-image-gallery/styles/css/image-gallery.css";
import "react-alice-carousel/lib/alice-carousel.css";
import 'react-dropdown/style.css';
import fetch from 'isomorphic-fetch'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import "./src/knife.css"
import 'react-sticky-header/styles.css';
import { Auth0Provider } from "@auth0/auth0-react";
import { navigate } from 'gatsby';

const onRedirectCallback = (appState) => {
  navigate(appState?.returnTo || '/', { replace: true });
};

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new createHttpLink({
    uri: `https://${process.env.GATSBY_SHOP_NAME}.myshopify.com/api/2020-07/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token':
        process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
        'Accept' : 'application/graphql'
    },
    fetch,
  }),
})

const wrapRootElement = ({ element }) => {
    return (
      <ApolloProvider client={apolloClient}>
        {/* <Auth0Provider
            domain="butter-knife.eu.auth0.com"
            clientId="17vSDH4npiNtmGYgNTIrHdvrW4L0D3I7"
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        > */}
            {element}
        {/* </Auth0Provider> */}
        </ApolloProvider>
    );
}

export { wrapRootElement }