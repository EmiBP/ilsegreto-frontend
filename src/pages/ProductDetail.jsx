// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { setCartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [shippingCap, setShippingCap] = useState("");
  const [shippingResult, setShippingResult] = useState("");

  const allProducts = [
    { id: 1, name: "Abito Elegante in Seta", category: "Abbigliamento", type: "abito", brand: "Gucci", color: "Rosso", size: "M", price: 129.00, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
    { id: 2, name: "Borsa a Tracolla in Pelle", category: "Accessori", type: "borsa", brand: "Prada", color: "Nero", size: "Unica", price: 89.90, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
    { id: 3, name: "Profumo Luxury Incanto 50ml", category: "Profumi", type: "profumo", brand: "Chanel", color: "Trasparente", size: "50ml", price: 75.00, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400" },
    { id: 4, name: "Pantaloni Casual Slim", category: "Abbigliamento", type: "pantaloni", brand: "Zara", color: "Blu", size: "L", price: 49.90, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400" },
    { id: 5, name: "Calze in Cotone Premium", category: "Abbigliamento", type: "calze", brand: "Armani", color: "Nero", size: "S", price: 15.00, image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=400" },
    { id: 6, name: "Scarpe col Tacco Eleganti", category: "Abbigliamento", type: "scarpe", brand: "Prada", color: "Rosso", size: "37", price: 199.00, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },
    { id: 7, name: "Completo Intimo Pizzo", category: "Abbigliamento", type: "intimo", brand: "Yamamay", color: "Nero", size: "S", price: 39.90, image: "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?w=400" }
  ];

  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="detail-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '20px' }}>Prodotto non trovato</h2>
        <Link to="/" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>Torna al catalogo</Link>
      </div>
    );
  }

  // Inicializa o tamanho padrão do produto se aplicável
  if (selectedSize === "" && product.size) {
    setSelectedSize(product.size);
  }

  const handleQuantityChange = (type) => {
    if (type === 'increase') setQuantity(quantity + 1);
    if (type === 'decrease' && quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { id: product.id, nome: product.name, prezzo: product.price, image: product.image, quantity: quantity }];
    });
    alert(`Aggiunto al carrello: ${quantity}x ${product.name}`);
  };

  const handleShippingSimulate = (e) => {
    e.preventDefault();
    if (shippingCap.trim() === "") return;
    setShippingResult("Spedizione Standard: Gratis (3-5 giorni lavorativi)");
  };

  return (
    <div className="detail-container">
      <div className="product-layout">
        
        {/* SEÇÃO DA GALERIA (ESQUERDA) */}
        <section className="gallery-section">
          <div className="main-image-wrapper">
            <img src={product.image} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnails-grid">
            <img src={product.image} alt={product.name} className="thumbnail active" />
          </div>
        </section>

        {/* SEÇÃO DE INFORMAÇÕES (DIREITA) */}
        <section className="info-section">
          <span className="info-category">{product.brand}</span>
          <h1 className="info-title">{product.name}</h1>
          <p className="info-price">{product.price.toFixed(2)} €</p>
          
          <div className="info-divider"></div>
          
          <p className="info-description">
            Esperienza luxury e comfort eccezionale. Questo pezzo esclusivo riflette l'identità 
            del brand con finiture di alta sartorialità, perfetto per arricchire il tuo stile boutique.
          </p>
          
          <div className="info-divider"></div>

          {/* CONTÊINER DE SELETORES (VARIANTES) */}
          <div className="selectors-container">
            <span className="selector-label">Taglia / Formato</span>
            <div className="variants-buttons">
              <button 
                type="button" 
                className={`variant-btn ${selectedSize === product.size ? 'active' : ''}`}
                onClick={() => setSelectedSize(product.size)}
              >
                {product.size}
              </button>
            </div>
          </div>

          <div className="selectors-container">
            <span className="selector-label">Colore: <span style={{ fontWeight: 'normal', textTransform: 'none' }}>{product.color}</span></span>
          </div>

          {/* BLOCO DE AÇÕES (QUANTIDADE E COMPRA) */}
          <div className="actions-container">
            <div className="quantity-selector">
              <button type="button" onClick={() => handleQuantityChange('decrease')}>-</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => handleQuantityChange('increase')}>+</button>
            </div>
            
            <button 
              type="button" 
              className="primary-button add-to-cart-btn" 
              onClick={handleAddToCart}
            >
              🛒 AGGIUNGI AL CARRELLO
            </button>
          </div>

          <div className="info-divider"></div>

          {/* CALCULO DE FRETE */}
          <div className="selectors-container">
            <span className="selector-label">Calcola Spedizione</span>
            <form className="shipping-form" onSubmit={handleShippingSimulate}>
              <input 
                type="text" 
                placeholder="Inserisci il CAP (es. 00100)" 
                value={shippingCap}
                onChange={(e) => setShippingCap(e.target.value)}
              />
              <button type="submit" className="shipping-submit-btn">Calcola</button>
            </form>
            {shippingResult && <p className="shipping-result">🚚 {shippingResult}</p>}
          </div>

        </section>
      </div>
    </div>
  );
}

export default ProductDetail;