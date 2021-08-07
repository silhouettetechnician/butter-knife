
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './client';

export const wrapRootApollo = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);