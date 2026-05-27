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
  // Creating a shared state for the search bar tool
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      {/* Passing search state controls to the Navbar */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* New catalog route bound to search triggers */}
        <Route path="/catalog" element={<Catalog searchQuery={searchQuery} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;