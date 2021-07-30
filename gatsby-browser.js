import React, {useState, useEffect} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./src/App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-image-gallery/styles/css/image-gallery.css";
import "react-alice-carousel/lib/alice-carousel.css";
import 'react-dropdown/style.css';
// import ""
import "./src/knife.css"
import 'react-sticky-header/styles.css';
import { Auth0Provider } from "@auth0/auth0-react";
import { navigate } from 'gatsby';

const onRedirectCallback = (appState) => {
  navigate(appState?.returnTo || '/', { replace: true });
};

import { checkSession } from "./src/utils/auth"

const SessionCheck = ({ children }) => {
  const [loading, stillLoading] = useState(true);
  useEffect(() => checkSession(() => stillLoading(false)));
  return loading === false && <>{children}</>
};

export const wrapRootElement = ({ element }) => {
    return (
        <Auth0Provider
            domain="butter-knife.eu.auth0.com"
            clientId="17vSDH4npiNtmGYgNTIrHdvrW4L0D3I7"
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            <SessionCheck>
            {element}
            </SessionCheck>
        </Auth0Provider>
    );
}