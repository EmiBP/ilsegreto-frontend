// src/pages/Login.jsx
import React from 'react';
import './Login.css';

function Login() {
  // Functions to handle actions will be connected to Spring Boot later
  const handleTraditionalLogin = (e) => {
    e.preventDefault();
    console.log("Connecting with Spring Boot Security...");
  };

 const handleSocialLogin = (provider) => {
  if (provider === 'google') {
    // This URL is automatically provided by Spring Security OAuth2 Client
    window.location.href = "https://ilsegreto-backend.onrender.com/oauth2/authorization/google";
  } else {
    alert(`Il login con ${provider} sarà configurato nei prossimi passi!`);
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Accedi a Il Segreto della Bellezza</h2>
        <p className="login-subtitle">Entra nel tuo account per gestire i tuoi ordini</p>

        {/* Bottone Social: Google */}
        <button 
          className="social-button google-btn" 
          onClick={() => handleSocialLogin('google')}
        >
          <span className="social-icon">🌐</span> Accedi con Google
        </button>

        {/* Bottone Social: Facebook */}
        <button 
          className="social-button facebook-btn" 
          onClick={() => handleSocialLogin('facebook')}
        >
          <span className="social-icon">🔵</span> Accedi con Facebook
        </button>

        {/* Bottone Social: Instagram */}
        <button 
          className="social-button instagram-btn" 
          onClick={() => handleSocialLogin('instagram')}
        >
          <span className="social-icon">📸</span> Accedi con Instagram
        </button>

        <div className="login-divider">
          <span>oppure usa la tua email</span>
        </div>

        {/* Form Tradizionale */}
        <form onSubmit={handleTraditionalLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Indirizzo Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="esempio@email.com" 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Inserisci la tua password" 
              required 
            />
          </div>

          <div className="login-helpers">
            <label className="remember-me">
              <input type="checkbox" /> Ricordami
            </label>
            <a href="#forgot" className="forgot-password">Password dimenticata?</a>
          </div>

          {/* Reusing our primary-button class from global.css */}
          <button type="submit" className="primary-button login-submit-btn">
            Accedi
          </button>
        </form>

        <p className="login-register-redirect">
          Non hai ancora un account? <a href="#register">Registrati ora</a>
        </p>
      </div>
    </div>
  );
}

export default Login;