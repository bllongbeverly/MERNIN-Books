import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes> {/* Use Routes element */}
            <Route path='/' element={<SearchBooks />} /> {/* Use element prop */}
            <Route path='/saved' element={<SavedBooks />} /> {/* Use element prop */}
            <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>} /> {/* Use element prop */}
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
