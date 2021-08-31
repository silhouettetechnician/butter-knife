import React, {useState, useEffect} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./src/layouts/App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-image-gallery/styles/css/image-gallery.css";
import "react-alice-carousel/lib/alice-carousel.css";
import 'react-dropdown/style.css';
// import "./src/knife.css"
import 'react-sticky-header/styles.css';
import { navigate } from 'gatsby';
// const onRedirectCallback = (appState) => {
//   navigate(appState?.returnTo || '/', { replace: true });
// };
export { wrapRootElement } from './src/apollo/provider';
