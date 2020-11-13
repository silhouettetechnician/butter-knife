import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import App from './App';
import Client from 'shopify-buy';
import * as serviceWorker from './serviceWorker';
const client = Client.buildClient({
  storefrontAccessToken: 'your-access-token',
  domain: 'your-shopify-url.myshopify.com'
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
