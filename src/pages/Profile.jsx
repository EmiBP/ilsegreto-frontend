// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para controlar o modo de edição do formulário
  const [isEditing, setIsEditing] = useState(false);
  const [telefono, setTelefono] = useState('');
  const [via, setVia] = useState('');
  const [citta, setCitta] = useState('');
  const [cap, setCap] = useState('');
  const [provincia, setProvincia] = useState('');
  const [circuito, setCircuito] = useState('');
  const [cartaMascherata, setCartaMascherata] = useState('');

  // Coleta os dados do perfil ao carregar a página
  useEffect(() => {
    fetch("https://ilsegreto-backend.onrender.com/api/user/profile", { credentials: "include" })
      .then(response => {
        if (!response.ok) throw new Error("Effettua prima il login con Google");
        return response.json();
      })
      .then(data => {
        setProfileData(data);
        // Preenche os estados com as informações que vieram do Java
        setTelefono(data.telefono || '');
        if (data.indirizzo) {
          setVia(data.indirizzo.via || '');
          setCitta(data.indirizzo.citta || '');
          setCap(data.indirizzo.cap || '');
          setProvincia(data.indirizzo.provincia || '');
        }
        if (data.datiPagamento) {
          setCircuito(data.datiPagamento.circuito || '');
          setCartaMascherata(data.datiPagamento.cartaMascherata || '');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Envia as alterações para o endpoint /api/user/update no Java
  const handleSaveChanges = (e) => {
    e.preventDefault();
    
    const updatedPayload = {
      telefono: telefono,
      indirizzo: { via, citta, cap, provincia },
      datiPagamento: { circuito, cartaMascherata }
    };

    fetch("https://ilsegreto-backend.onrender.com/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPayload),
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Errore durante il salvataggio");
        return res.json();
      })
      .then(updatedData => {
        setProfileData(updatedData);
        setIsEditing(false); // Fecha o modo edição
      })
      .catch(err => alert(err.message));
  };

  if (loading) return <div className="profile-loading">Caricamento dati profilo...</div>;
  
  if (error) {
    return (
      <div className="profile-error-container">
        <h2>Area Riservata</h2>
        <p>{error}</p>
        <button onClick={() => window.location.href = '/login'} className="primary-button">Vai al Login</button>
      </div>
    );
  }

  return (
    <div className="profile-dashboard-container">
      <header className="profile-header">
        <h1>Benvenuto, {profileData.name}</h1>
        <p>Gestisci i tuoi dati personali, indirizzi di spedizione e metodi di pagamento.</p>
      </header>

      {isEditing ? (
        /* FORMULÁRIO DE EDIÇÃO */
        <form onSubmit={handleSaveChanges} className="profile-edit-form">
          <div className="profile-grid">
            <section className="profile-section-card">
              <h3>📋 Modifica Informazioni Personali</h3>
              <div className="form-group">
                <label>Telefono:</label>
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Via / Indirizzo:</label>
                <input type="text" value={via} onChange={(e) => setVia(e.target.value)} />
              </div>
              <div className="form-group-row">
                <div>
                  <label>Città:</label>
                  <input type="text" value={citta} onChange={(e) => setCitta(e.target.value)} />
                </div>
                <div>
                  <label>CAP:</label>
                  <input type="text" value={cap} onChange={(e) => setCap(e.target.value)} />
                </div>
                <div>
                  <label>Provincia (Sigla):</label>
                  <input type="text" maxLength="2" value={provincia} onChange={(e) => setProvincia(e.target.value)} />
                </div>
              </div>
            </section>

            <section className="profile-section-card">
              <h3>💳 Modifica Dati di Pagamento</h3>
              <div className="form-group">
                <label>Circuito (es. Visa, Mastercard):</label>
                <input type="text" value={circuito} onChange={(e) => setCircuito(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Numero Carta (Mascherato per sicurezza):</label>
                <input type="text" placeholder="**** **** **** 1234" value={cartaMascherata} onChange={(e) => setCartaMascherata(e.target.value)} />
              </div>
              <p className="security-note">🛡️ Le informazioni finanziarie sensibili verranno salvate in modo crittografato.</p>
            </section>
          </div>
          <div className="form-actions-buttons">
            <button type="submit" className="save-btn">Salva Modifiche</button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Annulla</button>
          </div>
        </form>
      ) : (
        /* MODAL DE VISUALIZAÇÃO PADRÃO */
        <>
          <div className="profile-grid">
            {/* Informações Pessoais */}
            <section className="profile-section-card">
              <div className="card-title-header">
                <h3>📋 Dati Personali e Spedizione</h3>
                <button className="edit-inline-btn" onClick={() => setIsEditing(true)}>✏️ Modifica Dati</button>
              </div>
              <div className="profile-info-row">
                <strong>Nome completo:</strong> <span>{profileData.name}</span>
              </div>
              <div className="profile-info-row">
                <strong>Email:</strong> <span>{profileData.email}</span>
              </div>
              <div className="profile-info-row">
                <strong>Telefono:</strong> <span>{profileData.telefono || "Non inserito"}</span>
              </div>
              <div className="profile-info-row">
                <strong>Indirizzo:</strong> 
                <span>
                  {profileData.indirizzo && profileData.indirizzo.via !== 'Da completare' 
                    ? `${profileData.indirizzo.via}, ${profileData.indirizzo.citta} (${profileData.indirizzo.provincia}) - CAP ${profileData.indirizzo.cap}`
                    : "Nessun indirizzo salvato"}
                </span>
              </div>
            </section>

            {/* Dados Bancários */}
            <section className="profile-section-card">
              <h3>🔒 Metodo di Pagamento Salvato</h3>
              <p className="security-note">Stato: Attivo e protetto con tokenizzazione</p>
              <div className="card-payment-box">
                <span className="chip-icon">💳</span>
                <div className="card-numbers">
                  <p>Circuito: <strong>{profileData.datiPagamento?.circuito || "Non configurato"}</strong></p>
                  <p className="masked-digits">{profileData.datiPagamento?.cartaMascherata || "**** **** **** ****"}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Histórico de Compras Reais vindas do Relacionamento do Java */}
          <section className="profile-orders-section">
            <h3>🛍️ Cronologia Ordini (I tuoi acquisti)</h3>
            {!profileData.ordini || profileData.ordini.length === 0 ? (
              <p className="no-orders-msg">Non hai ancora effettuato nessun ordine nel nostro store.</p>
            ) : (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>ID Ordine</th>
                    <th>Data</th>
                    <th>Prodotti</th>
                    <th>Totale</th>
                    <th>Stato</th>
                  </tr>
                </thead>
                <tbody>
                  {profileData.ordini.map((ordine) => (
                    <tr key={ordine.id}>
                      <td className="order-id">{ordine.codiceOrdine}</td>
                      <td>{new Date(ordine.dataOrdine).toLocaleDateString('it-IT')}</td>
                      <td>{ordine.prodottiSommario}</td>
                      <td className="order-price">{ordine.totale.toFixed(2)} €</td>
                      <td><span className="status-badge">{ordine.stato}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Profile;