import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import './App.css'
import App from './pages/index';
import WrapRootApollo from './apollo/provider'
import * as serviceWorker from './serviceWorker';
import { CartProvider } from 'use-shopping-cart';
const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
ReactDOM.render(
  
  <WrapRootApollo>
    <CartProvider
      mode="checkout-session"
      stripe={stripe}
      billingAddressCollection={false}
      successUrl={'stripe.com'}
      cancelUrl={'http://localhost:3333'}
      currency={'GBP'}
    >
      <App />
    </CartProvider>
  </WrapRootApollo>
  ,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
