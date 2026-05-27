// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../context/CartContext';

function Navbar({ searchQuery, setSearchQuery }) {

    const navigate = useNavigate();
    const { cartCount } = useCart();
    // Estados para gerenciar o usuário logado e a abertura do menu flutuante
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Verifica se o usuário está autenticado no Spring Boot assim que a Navbar monta
    useEffect(() => {
        fetch("http://localhost:8080/api/user/profile", { credentials: "include" })
            .then(res => res.ok ? res.json() : null)
            .then(data => setUser(data))
            .catch(() => setUser(null));
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (window.location.pathname !== '/catalog') {
            navigate('/catalog');
        }
    };

    // Limpa a sessão no Java e recarrega a página limpando os estados do React
    const handleLogout = () => {
        fetch("http://localhost:8080/api/user/logout", { method: "POST", credentials: "include" })
            .then(() => {
                setUser(null);
                setDropdownOpen(false);
                navigate("/");
                window.location.reload();
            })
            .catch(err => console.error("Errore durante il logout:", err));
    };

    return (
        <header className="navbar-header">
            <div className="navbar-top-bar">
                <span>Spedizione gratuita per ordini superiori a €50</span>
            </div>

            <div className="navbar-main-container">
                <div className="navbar-brand">
                    <Link to="/">
                        <h1>Il Segreto della Bellezza</h1>
                    </Link>
                </div>

                <nav className="navbar-navigation">
                    <ul>
                        <li><Link to="/catalog?category=Abbigliamento">Abbigliamento</Link></li>
                        <li><Link to="/catalog?category=Accessori">Accessori</Link></li>
                        <li><Link to="/catalog?category=Profumi">Profumi</Link></li>
                        <li><Link to="/catalog">Tutti i Prodotti</Link></li>
                    </ul>
                </nav>

                <div className="navbar-actions">
                    <input
                        type="text"
                        placeholder="Cerca un prodotto..."
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    {/* MENU DO USUÁRIO ADAPTADO AO SEU DESIGN */}
                    <div
                        className="user-menu-wrapper"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <div className="icon-button user-trigger">
                            👤
                            {user && <span className="navbar-user-name">{user.name.split(' ')[0]}</span>}
                        </div>

                        {dropdownOpen && (
                            <div className="navbar-dropdown-box">
                                {user ? (
                                    <>
                                        <div className="dropdown-user-email">{user.email}</div>
                                        <hr className="dropdown-line" />
                                        <Link to="/profile" className="dropdown-link" onClick={() => setDropdownOpen(false)}>📊 Il mio Profilo</Link>
                                        <Link to="/profile" className="dropdown-link" onClick={() => setDropdownOpen(false)}>🛍️ Miei Ordini</Link>
                                        <button onClick={handleLogout} className="dropdown-link logout-button-item">🚪 Esci</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="dropdown-link" onClick={() => setDropdownOpen(false)}>🔑 Accedi / Login</Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <Link to="/cart" className="icon-button" aria-label="Carrello">
                        🛒 <span className="cart-badge">{cartCount}</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Navbar;