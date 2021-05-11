import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import './App.css'
import App from './pages/index';
import * as serviceWorker from './serviceWorker';
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart';
const stripe = window.Stripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
ReactDOM.render(
  <CartProvider
    mode="checkout-session"
    stripe={stripe}
    billingAddressCollection={false}
    successUrl={'stripe.com'}
    cancelUrl={'http://localhost:3333'}
    currency={'GBP'}
  >
    {/* <div hidden id="snipcart" data-api-key="M2ZlNTg3YjUtMjMwMi00ODkwLWE4YWQtMmQ5MWEwMTRkOWE3NjM3NTIyODkwMjY4NjUxMDgx"></div> */}
    <App />
  </CartProvider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
