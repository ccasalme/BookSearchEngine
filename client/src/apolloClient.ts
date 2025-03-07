import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql', // ✅ Uses Vite proxy
  cache: new InMemoryCache(),
});

export default client;
