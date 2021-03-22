import React from "react";
import useShopStore from '../hooks/useShopStore';
import { observer } from "mobx-react-lite";
import { observer as classObserver } from "mobx-react";

export const withShopStore = (Component, keys, fixedProps = {}) => ({children, ...props}) => (
    <Component {...fixedProps} {...props} {...useShopStore(keys)}>{children}</Component>
);