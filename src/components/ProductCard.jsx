import React, { useState, useEffect } from 'react';

function ProductCard({ product }) {
  // Estado para detectar se a tela é de um celular (menor que 768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ajustes dinâmicos baseados no tamanho da tela
  const cardStyle = {
    ...styles.card,
    borderRadius: isMobile ? '4px' : '8px', // Bordas sutilmente menores no mobile
  };

  const imageStyle = {
    ...styles.image,
    height: isMobile ? '160px' : '200px', // Imagem proporcional para telas menores
  };

  const titleStyle = {
    ...styles.title,
    fontSize: isMobile ? '14px' : '16px', // Texto confortável para o celular
  };

  const descriptionStyle = {
    ...styles.description,
    fontSize: isMobile ? '12px' : '13px',
    height: isMobile ? '32px' : '36px',
  };

  const buttonStyle = {
    ...styles.button,
    padding: isMobile ? '12px 8px' : '10px', // Botão mais alto no celular para facilitar o clique
    fontSize: isMobile ? '12px' : '14px',
  };

  return (
    <div style={cardStyle}>
      <img src={product.imageUrl} alt={product.name} style={imageStyle} />
      <div style={styles.info}>
        <h3 style={titleStyle}>{product.name}</h3>
        <p style={descriptionStyle}>{product.description}</p>
        <div style={styles.priceContainer}>
          <span style={styles.price}>€ {product.price.toFixed(2)}</span>
        </div>
        <button style={buttonStyle}>Aggiungi al carrello</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    width: '100%', // Garante que ele ocupe 100% do espaço da grade responsiva
    boxSizing: 'border-box'
  },
  image: {
    width: '100%',
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
    fontWeight: 'bold',
    margin: 0,
    color: '#333'
  },
  description: {
    color: '#666',
    margin: 0,
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
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box'
  }
};

export default ProductCard;