"use client";

import { useState } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { ID } from "appwrite";
import "../connexion/auth.css";

export default function InscriptionPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await account.create(
                ID.unique(),
                email,
                password,
                `${firstName} ${lastName}`
            );
            // Auto-login after registration
            await account.createEmailPasswordSession(email, password);
            window.location.href = "/tableau-de-bord";
        } catch (err: unknown) {
            const appwriteError = err as { message?: string; code?: number };
            if (appwriteError.code === 409) {
                setError("Un compte avec cet email existe d\u00e9j\u00e0.");
            } else if (appwriteError.message?.includes("password")) {
                setError("Le mot de passe doit contenir au moins 8 caract\u00e8res.");
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
                    <h1>Cr\u00e9er un compte</h1>
                    <p className="auth-subtitle">Rejoignez LuxeBay pour commencer \u00e0 faire des affaires.</p>

                    {error && <div className="auth-error">{error}</div>}

                    <form className="auth-form" onSubmit={handleRegister}>
                        <div className="form-row">
                            <div className="form-group half">
                                <label htmlFor="firstName">Pr\u00e9nom</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-group half">
                                <label htmlFor="lastName">Nom</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
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
                                minLength={8}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group checkbox-group">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms" className="terms-label">
                                J&apos;accepte les Conditions d&apos;utilisation et la D\u00e9claration de confidentialit\u00e9 de LuxeBay.
                            </label>
                        </div>

                        <button type="submit" className="primary-btn full-width" disabled={loading}>
                            {loading ? "Cr\u00e9ation..." : "Cr\u00e9er un compte"}
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
                        Vous avez d\u00e9j\u00e0 un compte ? <Link href="/connexion">Connectez-vous</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
