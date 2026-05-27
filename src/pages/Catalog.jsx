// src/pages/Catalog.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Catalog.css';

// Helper component to handle separate counter states for each product card cleanly
function ProductCard({ product }) {
    const [cardQty, setCardQty] = useState(1);
    const { setCartItems } = useCart(); // Acessando o modificador direto do contexto global

    const handleCardQtyChange = (type) => {
        if (type === 'increase') setCardQty(cardQty + 1);
        if (type === 'decrease' && cardQty > 1) setCardQty(cardQty - 1);
    };

    // Função interna para injetar o produto multiplicando pela quantidade selecionada na vitrine
    const handleAddWithQty = () => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            
            if (existingItem) {
                // Se o produto já existe no carrinho, soma a quantidade selecionada à atual
                return prevItems.map(item =>
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + cardQty } 
                        : item
                );
            }
            // Se o produto é novo, adiciona respeitando o valor do cardQty
            return [...prevItems, { id: product.id, nome: product.name, prezzo: product.price, image: product.image, quantity: cardQty }];
        });

        // Alerta amigável e reseta o contador do card para 1
        alert(`Aggiunto al carrello: ${cardQty}x ${product.name}`);
        setCardQty(1);
    };

    return (
        <div className="catalog-card">
            <Link to={`/product/${product.id}`}>
                <div className="catalog-img-container">
                    <img src={product.image} alt={product.name} />
                </div>
            </Link>
            <div className="catalog-info">
                <span className="catalog-item-brand">{product.brand}</span>
                <h4 className="catalog-item-name">{product.name}</h4>
                <p className="catalog-item-price">{product.price.toFixed(2)} €</p>
                
                {/* Dynamic Quantity Selector & Add Action buttons */}
                <div className="catalog-card-actions">
                    <div className="card-qty-selector">
                        <button type="button" onClick={() => handleCardQtyChange('decrease')}>-</button>
                        <span>{cardQty}</span>
                        <button type="button" onClick={() => handleCardQtyChange('increase')}>+</button>
                    </div>
                    
                    <button 
                        type="button" 
                        className="primary-button catalog-add-btn"
                        onClick={handleAddWithQty} // 🚨 MÁGICA CONECTADA AQUI
                    >
                        🛒 Aggiungi
                    </button>
                </div>
            </div>
        </div>
    );
}

function Catalog({ searchQuery }) {
    // Reading URL parameters (e.g., ?category=Abbigliamento)
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    // Comprehensive mock database including brands, colors, types and sizes
    const allProducts = [
        { id: 1, name: "Abito Elegante in Seta", category: "Abbigliamento", type: "abito", brand: "Gucci", color: "Rosso", size: "M", price: 129.00, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
        { id: 2, name: "Borsa a Tracolla in Pelle", category: "Accessori", type: "borsa", brand: "Prada", color: "Nero", size: "Unica", price: 89.90, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
        { id: 3, name: "Profumo Luxury Incanto 50ml", category: "Profumi", type: "profumo", brand: "Chanel", color: "Trasparente", size: "50ml", price: 75.00, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400" },
        { id: 4, name: "Pantaloni Casual Slim", category: "Abbigliamento", type: "pantaloni", brand: "Zara", color: "Blu", size: "L", price: 49.90, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400" },
        { id: 5, name: "Calze in Cotone Premium", category: "Abbigliamento", type: "calze", brand: "Armani", color: "Nero", size: "S", price: 15.00, image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=400" },
        { id: 6, name: "Scarpe col Tacco Eleganti", category: "Abbigliamento", type: "scarpe", brand: "Prada", color: "Rosso", size: "37", price: 199.00, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },
        { id: 7, name: "Completo Intimo Pizzo", category: "Abbigliamento", type: "intimo", brand: "Yamamay", color: "Nero", size: "S", price: 39.90, image: "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?w=400" }
    ];

    // Filter States
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedType, setSelectedType] = useState("");

    // Reset side filters if top navigation category changes
    useEffect(() => {
        setSelectedBrand("");
        setSelectedColor("");
        setSelectedSize("");
        setSelectedType("");
    }, [categoryParam]);

    // Combined Filtering Logic (Search bar + Category click + Sidebar filters)
    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = categoryParam ? product.category.toLowerCase() === categoryParam.toLowerCase() : true;
        const matchesSearch = searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
        const matchesColor = selectedColor ? product.color === selectedColor : true;
        const matchesSize = selectedSize ? product.size === selectedSize : true;
        const matchesType = selectedType ? product.type === selectedType : true;

        return matchesCategory && matchesSearch && matchesBrand && matchesColor && matchesSize && matchesType;
    });

    return (
        <div className="catalog-container">
            {/* Sidebar Filters */}
            <aside className="filters-sidebar">
                <h3 className="sidebar-title">Filtri</h3>

                {/* Brand Filter */}
                <div className="filter-group-box">
                    <h4>Marca (Marca)</h4>
                    <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                        <option value="">Tutte le marche</option>
                        <option value="Gucci">Gucci</option>
                        <option value="Prada">Prada</option>
                        <option value="Chanel">Chanel</option>
                        <option value="Zara">Zara</option>
                        <option value="Armani">Armani</option>
                        <option value="Yamamay">Yamamay</option>
                    </select>
                </div>

                {/* Type Filter (Dynamic visibility for Clothing aspect) */}
                {(!categoryParam || categoryParam === "Abbigliamento") && (
                    <div className="filter-group-box">
                        <h4>Tipo di Abbigliamento</h4>
                        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                            <option value="">Tutti i tipi</option>
                            <option value="abito">Abiti</option>
                            <option value="pantaloni">Pantaloni</option>
                            <option value="calze">Calze</option>
                            <option value="scarpe">Scarpe</option>
                            <option value="intimo">Intimo</option>
                        </select>
                    </div>
                )}

                {/* Color Filter */}
                <div className="filter-group-box">
                    <h4>Colore (Cor)</h4>
                    <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                        <option value="">Tutti i colori</option>
                        <option value="Nero">Nero</option>
                        <option value="Rosso">Rosso</option>
                        <option value="Blu">Blu</option>
                        <option value="Trasparente">Trasparente</option>
                    </select>
                </div>

                {/* Size Filter */}
                <div className="filter-group-box">
                    <h4>Taglia / Formato (Tamanho)</h4>
                    <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                        <option value="">Tutte</option>
                        <option value="S">S / 37</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="50ml">50ml</option>
                        <option value="Unica">Taglia Unica</option>
                    </select>
                </div>

                <button
                    className="clear-filters-btn"
                    onClick={() => { setSelectedBrand(""); setSelectedColor(""); setSelectedSize(""); setSelectedType(""); }}
                >
                    Cancella Filtri
                </button>
            </aside>

            {/* Products Grid Display */}
            <main className="catalog-products-side">
                <h2 className="catalog-title">
                    {categoryParam ? categoryParam : "Tutti i Prodotti"}
                    {searchQuery && ` - Risultati per: "${searchQuery}"`}
                </h2>
                <p className="results-counter">{filteredProducts.length} prodotti trovati</p>

                {filteredProducts.length === 0 ? (
                    <div className="no-products-found">
                        <p>Nessun produto corrisponde ai filtri selezionati.</p>
                    </div>
                ) : (
                    <div className="catalog-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Catalog;