import fetch from 'isomorphic-fetch';
import { ApolloClient, InMemoryCache, createHttpLink, HttpLink} from '@apollo/client';
// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// const client = new ApolloClient({
//   link: new HttpLink({
//     credentials: 'include',
//         fetchOptions: {
//       'Access-Control-Allow-Origin': '*'
//   },
//     headers: {
//       // 'Content-Type': 'application/graphql',
//       // 'Accept': 'application/json',
//       'Access-Control-Allow-Credentials': true,
//       // 'Access-Control-Allow-Origin': '*',
//     },
//   }),
//   cache: new InMemoryCache(),
// });
const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://${process.env.SHOPIFY_STORE_URL}.myshopify.com/api/graphql`,
    credentials: "same-origin",
  //   fetchOptions: {
  //     'mode': 'no-cors',
  // },
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': true,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
})

export default client
