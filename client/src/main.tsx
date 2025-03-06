import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchBooks />
      },
      {
        path: '/saved',
        element: <SavedBooks />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>  {/* ✅ Wrap in ApolloProvider */}
    <RouterProvider router={router} />
  </ApolloProvider>
);
