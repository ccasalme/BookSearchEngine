import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql', // ✅ Uses Vite proxy, avoiding CORS completely
  cache: new InMemoryCache(),
});

export default client;
