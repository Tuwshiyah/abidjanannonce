"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { ID } from "appwrite";
import "../../publier.css";
import "../../inscription-form.css";

export default function InscriptionParticulierPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const getStrength = () => {
        if (password.length === 0) return { level: 0, label: "", color: "" };
        if (password.length < 6) return { level: 1, label: "Faible", color: "#e53935" };
        if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { level: 2, label: "Moyen", color: "#f5af02" };
        return { level: 3, label: "Fort", color: "#2e7d32" };
    };
    const strength = getStrength();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
            await account.createEmailPasswordSession(email, password);
            await account.updatePrefs({ accountType: "particulier", phone, whatsapp, city });
            window.location.href = "/vendre";
        } catch (err: unknown) {
            const ae = err as { message?: string; code?: number };
            if (ae.code === 409) setError("Un compte avec cet email existe déjà.");
            else if (ae.message?.includes("password")) setError("Le mot de passe doit contenir au moins 8 caractères.");
            else setError(ae.message || "Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="publier-page">
            <div className="publier-topbar">
                <div className="publier-topbar-left">
                    <Link href="/" className="publier-logo">
                        <span className="publier-logo-a">Abidjan</span>
                        <span className="publier-logo-b">Annonce</span>
                    </Link>
                    <nav className="publier-topbar-breadcrumb">
                        <span className="publier-topbar-sep">/</span>
                        <Link href="/publier">Publier</Link>
                        <span className="publier-topbar-sep">/</span>
                        <Link href="/publier/particulier">Particulier</Link>
                        <span className="publier-topbar-sep">/</span>
                        <span className="publier-topbar-current">Inscription</span>
                    </nav>
                </div>
                <Link href="/publier/particulier" className="publier-close-btn" aria-label="Retour">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </Link>
            </div>

            <div className="publier-content">
                <div className="pf-form-wrapper">
                    <div className="pf-form-header">
                        <h1>Créer un compte particulier</h1>
                        <p>Remplissez les informations ci-dessous pour commencer à publier</p>
                    </div>

                    {error && (
                        <div className="pf-error">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                            {error}
                        </div>
                    )}

                    <form className="pf-form" onSubmit={handleRegister}>
                        <div className="pf-row">
                            <div className="pf-field">
                                <label>Prénom *</label>
                                <input type="text" required placeholder="Votre prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="pf-field">
                                <label>Nom *</label>
                                <input type="text" required placeholder="Votre nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>

                        <div className="pf-row">
                            <div className="pf-field">
                                <label>Téléphone *</label>
                                <input type="tel" required placeholder="+225 07 00 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="pf-field">
                                <label>WhatsApp <span className="pf-optional">(optionnel)</span></label>
                                <input type="tel" placeholder="+225 07 00 00 00" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                            </div>
                        </div>

                        <div className="pf-field">
                            <label>Ville *</label>
                            <input type="text" required placeholder="Ex: Abidjan" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>

                        <div className="pf-field">
                            <label>Email *</label>
                            <input type="email" required placeholder="nom@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="pf-field">
                            <label>Mot de passe *</label>
                            <div className="pf-pw-wrap">
                                <input type={showPassword ? "text" : "password"} required minLength={8} placeholder="Minimum 8 caractères" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button type="button" className="pf-pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "Masquer" : "Afficher"}
                                </button>
                            </div>
                            {password.length > 0 && (
                                <div className="pf-pw-strength">
                                    <div className="pf-pw-bars">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="pf-pw-bar" style={{ background: i <= strength.level ? strength.color : "#e0e0e0" }} />
                                        ))}
                                    </div>
                                    <span style={{ color: strength.color, fontSize: 11, fontWeight: 600 }}>{strength.label}</span>
                                </div>
                            )}
                        </div>

                        <div className="pf-checkbox">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">J&apos;accepte les <a href="#">Conditions d&apos;utilisation</a> et la <a href="#">Politique de confidentialité</a></label>
                        </div>

                        <button type="submit" className="pf-submit" disabled={loading}>
                            {loading ? "Création en cours..." : "Créer mon compte"}
                        </button>
                    </form>

                    <div className="pf-divider"><span>ou</span></div>

                    <div className="pf-social">
                        <button className="pf-social-btn">
                            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Continuer avec Google
                        </button>
                    </div>

                    <div className="pf-footer">
                        Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
