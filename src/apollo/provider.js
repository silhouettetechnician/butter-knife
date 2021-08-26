
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import GlobalStateProvider from '../hocs/GlobalStateProvider';
import { useTheme, ThemeProvider, withTheme } from '@emotion/react'
import Provider from '../contexts/Provider'
import {theme} from '../theme/theme'
export const wrapRootElement = ({ element }) => (
  <Provider><ApolloProvider client={client}><GlobalStateProvider><ThemeProvider theme={theme}>{element}</ThemeProvider></GlobalStateProvider></ApolloProvider></Provider>
);
