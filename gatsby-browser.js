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
export { wrapRootElement } from './src/apollo/provider';
const onRedirectCallback = (appState) => {
  navigate(appState?.returnTo || '/', { replace: true });
};
