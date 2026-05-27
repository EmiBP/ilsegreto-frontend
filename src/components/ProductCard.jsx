import React from 'react';

function ProductCard({ product }) {
  return (
    <div style={styles.card}>
      <img src={product.imageUrl} alt={product.name} style={styles.image} />
      <div style={styles.info}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.priceContainer}>
          <span style={styles.price}>€ {product.price.toFixed(2)}</span>
        </div>
        <button style={styles.button}>Aggiungi al carrello</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  info: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flexGrow: 1
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
    color: '#333'
  },
  description: {
    fontSize: '13px',
    color: '#666',
    margin: 0,
    height: '36px',
    overflow: 'hidden'
  },
  priceContainer: {
    marginTop: 'auto'
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2e7d32'
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    textAlign: 'center'
  }
};

export default ProductCard;