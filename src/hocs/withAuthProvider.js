import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const withAuthProvider = ({Component}) => (
    <Auth0Provider
      domain="butter-knife.eu.auth0.com"
      clientId="17vSDH4npiNtmGYgNTIrHdvrW4L0D3I7"
      redirectUri={window.location.origin}
    >
      <Component/>
    </Auth0Provider>
)

export default withAuthProvider