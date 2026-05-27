// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import './ProductDetail.css';

function ProductDetail() {
  // Mock product data
  const product = {
    id: 3,
    name: "Profume Luxury Incanto",
    category: "Profumi",
    basePrice: 75.00,
    description: "Una fragranza sofisticata ed elegante, con note di cuore floreali e un tocco orientale persistente. Perfetto per chi desidera esprimere la propria essenza misteriosa e affascinante.",
    sizes: ["50ml", "100ml"],
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop&q=80"
    ]
  };

  // State management for user choices
  const [selectedSize, setSelectedSize] = useState("50ml");
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [zipCode, setZipCode] = useState("");
  const [shippingCost, setShippingCost] = useState(null);

  // Dynamic price calculating based on variant
  const currentPrice = selectedSize === "100ml" ? product.basePrice + 35 : product.basePrice;

  const handleQuantityChange = (type) => {
    if (type === 'increase') setQuantity(quantity + 1);
    if (type === 'decrease' && quantity > 1) setQuantity(quantity - 1);
  };

  const handleCalculateShipping = (e) => {
    e.preventDefault();
    // Simulated delivery check
    if (zipCode.length >= 5) {
      setShippingCost("Consegna in 2-3 giorni lavorativi - € 4,90 (Gratis per ordini superiori a €50)");
    }
  };

  return (
    <div className="detail-container">
      <div className="product-layout">
        
        {/* Gallery Section */}
        <div className="gallery-section">
          <div className="main-image-wrapper">
            <img src={selectedImage} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnails-grid">
            {product.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt="Thumbnail" 
                className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="info-section">
          <span className="info-category">{product.category}</span>
          <h2 className="info-title">{product.name}</h2>
          <p className="info-price">{currentPrice.toFixed(2)} €</p>
          
          <div className="info-divider"></div>
          
          <p className="info-description">{product.description}</p>

          {/* Variants Selector */}
          <div className="selectors-container">
            <span className="selector-label">Seleziona Formato:</span>
            <div className="variants-buttons">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`variant-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Cart Action */}
          <div className="actions-container">
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange('decrease')}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange('increase')}>+</button>
            </div>
            
            <button className="primary-button add-to-cart-btn">
              Aggiungi al Carrello
            </button>
          </div>

          <div className="info-divider"></div>

          {/* Shipping Calculator */}
          <div className="shipping-box">
            <span className="selector-label">Calcola Spedizione:</span>
            <form onSubmit={handleCalculateShipping} className="shipping-form">
              <input 
                type="text" 
                placeholder="Inserisci il CAP (es. 00100)" 
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                maxLength="5"
                required
              />
              <button type="submit" className="shipping-submit-btn">Calcola</button>
            </form>
            {shippingCost && <p className="shipping-result">{shippingCost}</p>}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;