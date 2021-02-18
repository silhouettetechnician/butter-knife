import React, {useState, useEffect} from 'react';
import { useRoutes } from 'hookrouter';
import routes from './routes'
import withContext from "./hocs/withContext";
import Layout from './components/Layout'
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import firebase from "firebase/app";
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import './App.css';
const App = () => {
    // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBnQcZS2BjRrw3vNrouMvjwA4RPsJLOElM",
    authDomain: "butterknifestore.firebaseapp.com",
    databaseURL: "https://butterknifestore-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "butterknifestore",
    storageBucket: "butterknifestore.appspot.com",
    messagingSenderId: "645660492184",
    appId: "1:645660492184:web:11b97d85aae2e61ae36bed",
    measurementId: "G-4D0DCRTV07"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  const routeResult = useRoutes(routes);
  return (
    <Layout >
    {routeResult || <p>Not found</p>}
    </Layout>
  );
}

export default withContext(App);
