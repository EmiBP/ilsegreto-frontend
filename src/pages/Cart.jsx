// src/pages/Cart.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, cartTotal, setCartItems } = useCart();
  const navigate = useNavigate();

  // Função para gerenciar a quantidade de itens dentro do carrinho
  const handleQuantityChange = (id, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          if (type === 'increase') {
            return { ...item, quantity: item.quantity + 1 };
          }
          if (type === 'decrease' && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  // Função para remover um produto completamente do carrinho
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Regra de frete idêntica ao do Checkout: Grátis acima de €50
  const shipping = cartTotal >= 50 || cartTotal === 0 ? 0.00 : 4.90;
  const total = cartTotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-container">
        <h2>Il tuo carrello è vuoto</h2>
        <p>Non hai ancora aggiunto nessun prodotto di bellezza.</p>
        <Link to="/catalog">
          <button className="primary-button">Torna allo Shop</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h2 className="cart-main-title">Il Mio Carrello</h2>

      <div className="cart-layout-grid">
        {/* Coluna Esquerda: Lista de Produtos Reais */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div className="cart-item-row" key={item.id}>
              <div className="cart-item-img">
                <img src={item.image} alt={item.nome} />
              </div>
              
              <div className="cart-item-details">
                <h4>{item.nome}</h4>
                <p className="cart-item-unit-price">{item.prezzo.toFixed(2)} €</p>
              </div>

              {/* Seletores de Quantidade Reativos */}
              <div className="cart-qty-controls">
                <button type="button" onClick={() => handleQuantityChange(item.id, 'decrease')}>-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => handleQuantityChange(item.id, 'increase')}>+</button>
              </div>

              <div className="cart-item-total-price">
                <strong>{(item.prezzo * item.quantity).toFixed(2)} €</strong>
              </div>

              <button 
                type="button" 
                className="cart-remove-item-btn" 
                onClick={() => handleRemoveItem(item.id)}
                aria-label="Rimuovi prodotto"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Coluna Direita: Resumo de Valores */}
        <div className="cart-summary-card">
          <h3>Riepilogo Ordine</h3>
          
          <div className="summary-info-row">
            <span>Subtotale</span>
            <span>{cartTotal.toFixed(2)} €</span>
          </div>
          
          <div className="summary-info-row">
            <span>Spedizione</span>
            <span>{shipping === 0 ? "Gratis" : `${shipping.toFixed(2)} €`}</span>
          </div>

          <hr className="summary-hr" />

          <div className="summary-info-row cart-grand-total">
            <span>Totale</span>
            <span>{total.toFixed(2)} €</span>
          </div>

          <button 
            className="primary-button proceed-checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Procedi al Checkout
          </button>

          <Link to="/catalog" className="continue-shopping-link">
            Continua lo Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;