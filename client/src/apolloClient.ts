import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// ✅ Set up HTTP connection to GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql', // ✅ Uses Vite proxy, avoids CORS issues
});

// ✅ Attach JWT token to requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// ✅ Ensure `cache` is correctly placed in ApolloClient
const client = new ApolloClient({
  link: authLink.concat(httpLink), // ✅ Ensures token is sent with requests
  cache: new InMemoryCache(), // ✅ `cache` should be here, NOT in `httpLink`
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network', // ✅ Helps prevent stale data issues
    },
  },
});

export default client;
