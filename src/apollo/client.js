import fetch from 'isomorphic-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://butter-knife-concession-store.myshopify.com/api/2020-10/graphql.json',
    fetch,
  }),
  cache: new InMemoryCache()
});