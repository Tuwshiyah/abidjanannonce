"use client";

import Link from 'next/link';
import '../connexion/auth.css'; // Reusing the same CSS

export default function InscriptionPage() {
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
                    <h1>Créer un compte</h1>
                    <p className="auth-subtitle">Rejoignez LuxeBay pour commencer à faire des affaires.</p>

                    <form className="auth-form" onSubmit={(e) => { e.preventDefault(); window.location.href = '/tableau-de-bord'; }}>
                        <div className="form-row">
                            <div className="form-group half">
                                <label htmlFor="firstName">Prénom</label>
                                <input type="text" id="firstName" required />
                            </div>
                            <div className="form-group half">
                                <label htmlFor="lastName">Nom</label>
                                <input type="text" id="lastName" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required placeholder="nom@exemple.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" id="password" required />
                        </div>

                        <div className="form-group checkbox-group">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms" className="terms-label">
                                J&apos;accepte les Conditions d&apos;utilisation et la Déclaration de confidentialité de LuxeBay.
                            </label>
                        </div>

                        <button type="submit" className="primary-btn full-width">Créer un compte</button>
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
                        Vous avez déjà un compte ? <Link href="/connexion">Connectez-vous</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
