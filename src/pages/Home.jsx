// src/pages/Home.jsx
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // 🚨 IMPORTANDO O SEU CONTEXTO GLOBAL

function Home() {
  const { setCartItems } = useCart(); // Resgatando o modificador do carrinho

  // Array de produtos com o preço corrigido para NÚMERO (essencial para o cálculo)
  const featuredProducts = [
    {
      id: 1,
      name: "Abito Elegante in Seta",
      category: "Abbigliamento",
      price: 129.00,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Borsa a Tracolla in Pelle",
      category: "Accessori",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Profumo Luxury Incanto 50ml",
      category: "Profumi",
      price: 75.00,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60"
    }
  ];

  // Função idêntica à do catálogo para injetar o produto no fluxo dinâmico
  const handleAddToWithQty = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevItems, { id: product.id, nome: product.name, prezzo: product.price, image: product.image, quantity: 1 }];
    });

    alert(`Aggiunto al carrello: 1x ${product.name}`);
  };

  return (
    <main className="home-container">
      {/* Sezione Banner Principale */}
      <section className="hero-banner">
        <div className="hero-content">
          <h2>Nuova Collezione Primavera</h2>
          <p>Scopri il segreto per esaltare la tua naturale bellezza.</p>
          <button className="primary-button" onClick={() => window.location.href = '/catalog'}>Acquista Ora</button>
        </div>
      </section>

      {/* Sezione Prodotti In Evidenza */}
      <section className="products-section">
        <h3 className="section-title">I Nostri Prodotti In Evidenza</h3>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">

              {/* Correção nas aspas do Link */}
              <Link to={`/product/${product.id}`} className="product-link-wrapper">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
              </Link>

              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">{product.price.toFixed(2)} €</p>

                {/* Botão com a ação real conectada ao Contexto */}
                <button 
                  className="primary-button card-button"
                  onClick={() => handleAddToWithQty(product)}
                >
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;