// src/App.jsx
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext'; // 🚨 IMPORTAÇÃO DO PROVEDOR DO CARRINHO

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;