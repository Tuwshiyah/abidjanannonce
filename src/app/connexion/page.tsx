"use client";

import Link from 'next/link';
import './auth.css';

export default function ConnexionPage() {
    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-logo-wrapper">
                    <Link href="/" className="logo">
                        <span style={{ color: "var(--secondary)" }}>e</span>
                        <span style={{ color: "var(--primary)" }}>b</span>
                        <span style={{ color: "var(--accent-yellow)" }}>a</span>
                        <span style={{ color: "var(--accent-green)" }}>y</span>
                    </Link>
                </div>

                <div className="auth-card glass-panel animate-fade-in">
                    <h1>Bonjour !</h1>
                    <p className="auth-subtitle">Connectez-vous à LuxeBay pour acheter et vendre.</p>

                    <form className="auth-form" onSubmit={(e) => { e.preventDefault(); window.location.href = '/tableau-de-bord'; }}>
                        <div className="form-group">
                            <label htmlFor="email">Email ou pseudo</label>
                            <input type="email" id="email" required placeholder="nom@exemple.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" id="password" required />
                        </div>

                        <button type="submit" className="primary-btn full-width">Continuer</button>
                    </form>

                    <div className="auth-divider">
                        <span>ou</span>
                    </div>

                    <div className="auth-social">
                        <button className="social-btn google-btn">
                            Continuer avec Google
                        </button>
                        <button className="social-btn apple-btn">
                            Continuer avec Apple
                        </button>
                    </div>

                    <div className="auth-footer">
                        Nouveau sur LuxeBay ? <Link href="/inscription">Créer un compte</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
