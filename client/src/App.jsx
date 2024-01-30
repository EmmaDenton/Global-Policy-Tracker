import React, { useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navbar from './components/Navbar';
import SearchPolicy from './pages/SearchPolicy';
import SavedPolicy from './pages/SavedPolicy';
import { Outlet, Routes, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet>
        <>
          <Routes>
            <Route path="/" element={<SearchPolicy />} />
            <Route path="/SearchPolicy" element={<SearchPolicy />} />
            <Route path="/SavedPolicy" element={<SavedPolicy />} />
          </Routes>
        </>
      </Outlet>
    </ApolloProvider>
  );
}