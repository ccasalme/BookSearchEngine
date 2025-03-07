import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Set up HTTP connection to GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql', // ✅ Uses Vite proxy
});

// Attach JWT token to requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // ✅ Ensures token is sent with requests
  cache: new InMemoryCache(),
});

export default client;
