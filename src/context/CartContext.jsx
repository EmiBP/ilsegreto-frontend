// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Carrega o carrinho do localStorage para não perder os itens ao atualizar a página
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('ilSegretoCart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('ilSegretoCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Função para adicionar produto ao carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Se já existe, aumenta a quantidade
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Se é novo, adiciona com quantidade 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Função para limpar o carrinho após finalizar a compra
  const clearCart = () => {
    setCartItems([]);
  };

  // Total de itens individuais no carrinho para exibir no badge da Navbar
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Valor total da compra em Euros
  const cartTotal = cartItems.reduce((total, item) => total + (item.prezzo * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, cartCount, cartTotal, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}