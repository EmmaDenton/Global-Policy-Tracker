import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink,} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import Map from './components/Map';
import SearchPolicy from './pages/SearchPolicy';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const handlePageChange = (page) => setCurrentPage(page);



function App() {
  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <SearchPolicy />;
      }}
  return (
    <ApolloProvider client={client}>
    <>
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange}/>
      <Outlet />
      <Map />
    </>
    </ApolloProvider>
  );
}

export default App;
