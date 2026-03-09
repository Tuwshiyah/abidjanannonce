"use client";

import { useState } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import "./auth.css";

export default function ConnexionPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await account.createEmailPasswordSession(email, password);
            window.location.href = "/tableau-de-bord";
        } catch (err: unknown) {
            const appwriteError = err as { message?: string; code?: number };
            if (appwriteError.code === 401) {
                setError("Email ou mot de passe incorrect.");
            } else {
                setError(appwriteError.message || "Une erreur est survenue. Veuillez r\u00e9essayer.");
            }
        } finally {
            setLoading(false);
        }
    };

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
                    <p className="auth-subtitle">Connectez-vous \u00e0 LuxeBay pour acheter et vendre.</p>

                    {error && <div className="auth-error">{error}</div>}

                    <form className="auth-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="nom@exemple.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="primary-btn full-width" disabled={loading}>
                            {loading ? "Connexion..." : "Continuer"}
                        </button>
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
                        Nouveau sur LuxeBay ? <Link href="/inscription">Cr\u00e9er un compte</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
