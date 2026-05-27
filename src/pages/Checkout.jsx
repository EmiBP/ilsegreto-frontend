// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // 🚨 Conexão com o carrinho global
import './Checkout.css';

function Checkout() {
    const { cartItems, cartTotal, cartCount, clearCart } = useCart(); // Resgatando os dados dinâmicos reais
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [generatedOrderCode, setGeneratedOrderCode] = useState('');

    // Estados para preenchimento dinâmico dos dados do usuário logado
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [telefono, setTelefono] = useState('');

    // Busca os dados do usuário atual para preencher os inputs automaticamente
    useEffect(() => {
        fetch("http://localhost:8080/api/user/profile", { credentials: "include" })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setEmail(data.email || '');
                    setTelefono(data.telefono !== 'Non inserito' ? data.telefono : '');
                    if (data.name) {
                        setNome(data.name.split(' ')[0]);
                    }
                }
            })
            .catch(() => { });
    }, []);

    // Cálculo dinâmico baseado no carrinho real
    const subtotal = cartTotal;
    const shipping = subtotal >= 50 || subtotal === 0 ? 0.00 : 4.90; // Frete grátis acima de €50
    const total = subtotal + shipping;

    // src/pages/Checkout.jsx
    const handleSubmitOrder = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Il carrello è vuoto! Aggiungi dei produtos prima di procedere.");
            return;
        }

        // CAPTURA DIRETA DO INPUT DO SEU FORMULÁRIO (Garante que o e-mail vai preenchido!)
        const emailDigitato = document.getElementById('email').value;

        const stringProdotti = cartItems
            .map(item => `${item.nome || item.name} (x${item.quantity})`)
            .join(', ');

        const orderPayload = {
            totale: total,
            prodotti: stringProdotti,
            emailUtente: emailDigitato // 🚨 Envia o e-mail que está escrito na caixinha de texto!
        };

        fetch("http://localhost:8080/api/orders/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderPayload),
            credentials: "include"
        })
            .then(res => {
                // Se o Java der qualquer erro, vamos ler a mensagem real que ele mandou
                if (!res.ok) {
                    return res.text().then(text => { throw new Error(text) });
                }
                return res.json();
            })
            .then(nuovoOrdine => {
                setGeneratedOrderCode(nuovoOrdine.codiceOrdine);
                setOrderPlaced(true);
                clearCart();
            })
            .catch(err => alert(err.message)); // Mostrará o erro exato do Java na tela
    };

    if (orderPlaced) {
        return (
            <div className="checkout-success-container">
                <div className="success-card">
                    <div className="success-icon">🎉</div>
                    <h2>Ordine Effettuato con Successo!</h2>
                    <p className="success-message">Grazie per il tuo acquisto su <strong>Il Segreto della Bellezza</strong>.</p>
                    <div className="order-details-box">
                        <p><strong>Numero Ordine:</strong> {generatedOrderCode}</p>
                        <p>Ti abbiamo inviato un'e-mail di conferma con i dettagli del tracciamento.</p>
                    </div>
                    <Link to="/">
                        <button className="primary-button home-return-btn">Torna alla Home</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2 className="checkout-main-title">Cassa / Checkout</h2>

            <form onSubmit={handleSubmitOrder} className="checkout-layout">

                {/* Left Column: Forms */}
                <div className="checkout-forms-section">

                    {/* Section 1: Personal Data */}
                    <div className="checkout-block">
                        <h3 className="block-title">1. Dati Personali</h3>
                        <div className="form-row-double">
                            <div className="input-group">
                                <label htmlFor="firstName">Nome</label>
                                <input type="text" id="firstName" required placeholder="Mario" value={nome} onChange={(e) => setNome(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="lastName">Cognome</label>
                                <input type="text" id="lastName" required placeholder="Rossi" />
                            </div>
                        </div>
                        <div className="form-row-double">
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" required placeholder="mario.rossi@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="phone">Telefono</label>
                                <input type="tel" id="phone" required placeholder="+39 333 1234567" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Shipping Address */}
                    <div className="checkout-block">
                        <h3 className="block-title">2. Indirizzo di Spedizione</h3>
                        <div className="form-row-single">
                            <div className="input-group">
                                <label htmlFor="address">Via / Piazza e Numero Civico</label>
                                <input type="text" id="address" required placeholder="Via Roma 15" />
                            </div>
                        </div>
                        <div className="form-row-triple">
                            <div className="input-group">
                                <label htmlFor="zipCode">CAP</label>
                                <input type="text" id="zipCode" maxLength="5" required placeholder="00100" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="city">Città</label>
                                <input type="text" id="city" required placeholder="Roma" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="province">Provincia (Sigla)</label>
                                <input type="text" id="province" maxLength="2" required placeholder="RM" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Payment Method */}
                    <div className="checkout-block">
                        <h3 className="block-title">3. Metodo di Pagamento</h3>

                        <div className="payment-selectors">
                            <label className={`payment-radio-label ${paymentMethod === 'credit_card' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="credit_card"
                                    checked={paymentMethod === 'credit_card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                💳 Carta di Credito
                            </label>

                            <label className={`payment-radio-label ${paymentMethod === 'pix_paypal' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="pix_paypal"
                                    checked={paymentMethod === 'pix_paypal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                📲 PayPal / Info Pix
                            </label>
                        </div>

                        {/* Conditional input fields for Credit Card */}
                        {paymentMethod === 'credit_card' && (
                            <div className="credit-card-fields">
                                <div className="input-group">
                                    <label htmlFor="cardName">Titolare della Carta</label>
                                    <input type="text" id="cardName" placeholder="MARIO ROSSI" required={paymentMethod === 'credit_card'} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="cardNumber">Numero della Carta</label>
                                    <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" maxLength="16" required={paymentMethod === 'credit_card'} />
                                </div>
                                <div className="form-row-double">
                                    <div className="input-group">
                                        <label htmlFor="cardExpiry">Scadenza (MM/AA)</label>
                                        <input type="text" id="cardExpiry" placeholder="12/29" maxLength="5" required={paymentMethod === 'credit_card'} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="cardCvv">CVV</label>
                                        <input type="text" id="cardCvv" placeholder="123" maxLength="3" required={paymentMethod === 'credit_card'} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'pix_paypal' && (
                            <div className="alternative-payment-info">
                                <p>Verrai reindirizzato alla piattaforma sicura per completare il pagamento istantaneo in totale sicurezza.</p>
                            </div>
                        )}
                    </div>

                </div>

                {/* Right Column: Sticky Summary */}
                <div className="checkout-summary-section">
                    <h3 className="summary-title">Riepilogo dell'Ordine</h3>

                    <div className="summary-row">
                        <span>Prodotti nel carrello</span>
                        <strong>{cartCount} articoli</strong>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row">
                        <span>Subtotale</span>
                        <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="summary-row">
                        <span>Spedizione</span>
                        <span>{shipping === 0 ? "Gratis" : `${shipping.toFixed(2)} €`}</span>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row total-row">
                        <span>Totale da Pagare</span>
                        <span>{total.toFixed(2)} €</span>
                    </div>

                    <button type="submit" className="primary-button place-order-btn">
                        Completa l'Ordine
                    </button>
                </div>

            </form>
        </div>
    );
}

export default Checkout;