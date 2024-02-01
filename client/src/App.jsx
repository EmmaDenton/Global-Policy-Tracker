import React, { useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client';
import Navbar from './components/Navbar';
// import SearchPolicy from './pages/SearchPolicy';
// import SavedPolicy from './pages/SavedPolicy';
import { Outlet, Routes, Route } from 'react-router-dom';
import './App.css'
import { setContext } from '@apollo/client/link/context';
const httpLink = createHttpLink({
  uri: '/graphql',
});

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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet>
        {/* <>
          <Routes>
            <Route path="/" element={<SearchPolicy />} />
            <Route path="/SearchPolicy" element={<SearchPolicy />} />
            <Route path="/SavedPolicy" element={<SavedPolicy />} />
          </Routes>
        </> */}
      </Outlet>
    </ApolloProvider>
  );
}