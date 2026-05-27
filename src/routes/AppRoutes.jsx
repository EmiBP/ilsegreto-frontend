// src/routes/AppRoutes.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Catalog from '../pages/Catalog'; // Imported our new filtered view
import Profile from '../pages/Profile';

function AppRoutes() {
  // Shared state for the search bar tool
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      {/* Passing search state controls to the Navbar */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <Routes>
        {/* 🚀 ROTA PRINCIPAL INTELIGENTE: 
            Se houver algo digitado na busca, ela renderiza o catálogo de resultados.
            Se a caixa de busca for apagada e ficar vazia, a Home reaparece no mesmo segundo! */}
        <Route 
          path="/" 
          element={
            searchQuery.trim() !== "" ? (
              <Catalog searchQuery={searchQuery} />
            ) : (
              <Home />
            )
          } 
        />
        
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Mantém a rota isolada do catálogo para cliques diretos em categorias do menu */}
        <Route path="/catalog" element={<Catalog searchQuery={searchQuery} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;