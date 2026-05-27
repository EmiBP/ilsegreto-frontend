// src/pages/Login.jsx
import React from 'react';
import './Login.css';
import { API_URL } from '../config';

function Login() {
  const handleGoogleLogin = () => {
    // URL automática providenciada pelo Spring Security OAuth2 na nuvem
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Il Segreto della Bellezza</h2>
        <p className="login-subtitle">Accedi in totale sicurezza utilizzando il tuo account Google per gestire i tuoi ordini e il tuo profilo.</p>

        {/* Único botão de ação, limpo e elegante */}
        <button 
          className="google-login-btn" 
          onClick={handleGoogleLogin}
        >
          <svg className="google-icon-svg" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.85 3C6.27 7.42 8.9 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.61-.21-2.38H12v4.5h6.48c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-2 3.7-4.94 3.7-8.57z"/>
            <path fill="#FBBC05" d="M5.35 14.5c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3L1.5 6.9C.54 8.82 0 10.95 0 13.2s.54 4.38 1.5 6.3l3.85-3z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.7-2.87c-1.03.69-2.35 1.1-4.26 1.1-3.1 0-5.73-2.38-6.66-5.46l-3.85 3C3.4 20.35 7.35 23 12 23z"/>
          </svg>
          Continua con Google
        </button>

        <p className="login-footer-note">
          🛡️ Connessione cifrata e protetta tramite protocollo Google OAuth2. Non memorizzeremo mai le tue password.
        </p>
      </div>
    </div>
  );
}

export default Login;