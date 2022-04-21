import { ApolloClient, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
// import { WebSocketLink } from 'apollo-link-ws'

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://apollo-music-gql.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      lazy: true,
      timeout: 60000,
      inactivityTimeout: 60000,
      connectionParams: {
        headers: {
          'x-hasura-admin-secret': 'ADD_YOUR_ADMIN_SECRET',
        },
      },
    },
  }),
  cache: new InMemoryCache(),
})

//old https client
// const client = new ApolloClient({
//   uri: 'https://apollo-music-gql.hasura.app/v1/graphql',
//   cache: new InMemoryCache(),
//   headers: {
//     'content-type': 'application/json',
//     'x-hasura-admin-secret': 'ADD_YOUR_ADMIN_SECRET',
//   },
// })

export default client
