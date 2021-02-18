import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Client from 'shopify-buy';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";
const client = Client.buildClient({
  storefrontAccessToken: 'your-access-token',
  domain: 'your-shopify-url.myshopify.com'
});
ReactDOM.render(
  <Auth0Provider
  domain="butter-knife.eu.auth0.com"
  clientId="17vSDH4npiNtmGYgNTIrHdvrW4L0D3I7"
  redirectUri={window.location.origin}
>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
</Auth0Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
