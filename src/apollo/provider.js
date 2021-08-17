
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import GlobalStateProvider from '../hocs/GlobalStateProvider';
import { useTheme, ThemeProvider, withTheme } from '@emotion/react'
import {theme} from '../theme/theme'
export const wrapRootElement = ({ element }) => (
  <GlobalStateProvider><ThemeProvider theme={theme}><ApolloProvider client={client}>{element}</ApolloProvider></ThemeProvider></GlobalStateProvider>
);
