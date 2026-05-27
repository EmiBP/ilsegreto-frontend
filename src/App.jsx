// Exemplo de estrutura ideal no seu src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  return (
    <div className="app-container">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {(searchQuery.trim() !== "" || categoryParam) ? (
        <Catalog searchQuery={searchQuery} />
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;