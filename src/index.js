import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'


import './App.css'
import App from './pages/index';
import Client from 'shopify-buy';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
  domain="butter-knife.eu.auth0.com"
  clientId="17vSDH4npiNtmGYgNTIrHdvrW4L0D3I7"
  redirectUri={window.location.origin}
>
    <App />
</Auth0Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
