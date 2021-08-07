
import fetch from 'isomorphic-fetch';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: `https://butter-knife-concession-store.myshopify.com/api/2020-10/graphql.json`,
  fetch: fetch,

  cache: new InMemoryCache(),
});