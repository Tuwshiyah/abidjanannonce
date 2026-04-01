"use client";

import { useState } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { ID } from "appwrite";
import "../connexion/auth.css";

type AccountType = null | "particulier" | "entreprise";

export default function InscriptionPage() {
    const [accountType, setAccountType] = useState<AccountType>(null);

    // Common fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Business fields
    const [businessName, setBusinessName] = useState("");
    const [sector, setSector] = useState("");
    const [rccm, setRccm] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const getPasswordStrength = () => {
        if (password.length === 0) return { level: 0, label: "", color: "" };
        if (password.length < 6) return { level: 1, label: "Faible", color: "#e53935" };
        if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { level: 2, label: "Moyen", color: "#f5af02" };
        return { level: 3, label: "Fort", color: "#2e7d32" };
    };

    const strength = getPasswordStrength();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const displayName = accountType === "entreprise" ? businessName : `${firstName} ${lastName}`;
            await account.create(ID.unique(), email, password, displayName);
            await account.createEmailPasswordSession(email, password);
            // Store account type preference
            await account.updatePrefs({
                accountType,
                phone,
                city,
                ...(accountType === "entreprise" ? {
                    businessName,
                    sector,
                    rccm,
                    website,
                    address,
                } : {}),
            });
            window.location.href = "/tableau-de-bord";
        } catch (err: unknown) {
            const appwriteError = err as { message?: string; code?: number };
            if (appwriteError.code === 409) {
                setError("Un compte avec cet email existe déjà.");
            } else if (appwriteError.message?.includes("password")) {
                setError("Le mot de passe doit contenir au moins 8 caractères.");
            } else {
                setError(appwriteError.message || "Une erreur est survenue. Veuillez réessayer.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Step 1: Choose account type
    if (!accountType) {
        return (
            <div className="auth-page auth-page-centered">
                <div className="auth-right">
                    <div className="auth-card">
                        <div className="auth-card-header">
                            <h1>Comment voulez-vous vous inscrire ?</h1>
                            <p className="auth-subtitle">Choisissez le type de compte qui vous correspond</p>
                        </div>

                        <div className="auth-type-choices">
                            <button className="auth-type-card" onClick={() => setAccountType("particulier")}>
                                <div className="auth-type-icon auth-type-icon-blue">
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <h3>Je suis un particulier</h3>
                                <p>Je vends des objets personnels ou je cherche des bonnes affaires</p>
                                <ul className="auth-type-perks">
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        3 annonces gratuites
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Inscription rapide
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Messagerie intégrée
                                    </li>
                                </ul>
                                <span className="auth-type-cta">
                                    Commencer
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /><polyline points="12 5 19 12 12 19" /></svg>
                                </span>
                            </button>

                            <button className="auth-type-card auth-type-card-pro" onClick={() => setAccountType("entreprise")}>
                                <div className="auth-type-badge">Recommandé pour les pros</div>
                                <div className="auth-type-icon auth-type-icon-gold">
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="2" y="7" width="20" height="14" rx="2" />
                                        <path d="M16 7V5a4 4 0 0 0-8 0v2" />
                                        <circle cx="12" cy="14" r="2" />
                                    </svg>
                                </div>
                                <h3>Je suis une entreprise</h3>
                                <p>Je vends de façon professionnelle et souhaite développer mon activité</p>
                                <ul className="auth-type-perks">
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Boutique vendeur personnalisée
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Badge vendeur vérifié
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Statistiques et outils pro
                                    </li>
                                </ul>
                                <span className="auth-type-cta auth-type-cta-gold">
                                    Commencer
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /><polyline points="12 5 19 12 12 19" /></svg>
                                </span>
                            </button>
                        </div>

                        <div className="auth-footer">
                            Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Step 2: Registration form
    return (
        <div className="auth-page auth-page-centered">
            <div className="auth-right">
                <div className="auth-card">
                    <div className="auth-card-header">
                        <div className="auth-header-with-back">
                            <button className="auth-step-back" onClick={() => setAccountType(null)}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                            </button>
                            <div>
                                <h1>Créer un compte {accountType === "entreprise" ? "entreprise" : "particulier"}</h1>
                                <p className="auth-subtitle">
                                    {accountType === "entreprise"
                                        ? "Renseignez les informations de votre entreprise"
                                        : "Remplissez les informations ci-dessous pour commencer"
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="auth-error">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                            {error}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleRegister}>
                        {/* Business-specific fields */}
                        {accountType === "entreprise" && (
                            <>
                                <div className="auth-section-label">Informations entreprise</div>
                                <div className="auth-field">
                                    <label htmlFor="businessName">Nom de l&apos;entreprise *</label>
                                    <div className="auth-input-wrap">
                                        <svg className="auth-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a4 4 0 0 0-8 0v2" /></svg>
                                        <input type="text" id="businessName" required placeholder="Nom de votre entreprise" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="auth-row">
                                    <div className="auth-field">
                                        <label htmlFor="sector">Secteur d&apos;activité *</label>
                                        <div className="auth-input-wrap">
                                            <svg className="auth-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                                            <input type="text" id="sector" required placeholder="Ex: Commerce, Services..." value={sector} onChange={(e) => setSector(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="auth-field">
                                        <label htmlFor="rccm">RCCM <span className="auth-optional">(optionnel)</span></label>
                                        <div className="auth-input-wrap">
                                            <svg className="auth-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                                            <input type="text" id="rccm" placeholder="Numéro RCCM" value={rccm} onChange={(e) => setRccm(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="auth-row">
                                    <div className="auth-field">
                                        <label htmlFor="address">Adresse physique *</label>
                                        <div className="auth-input-wrap">
                                            <svg className="auth-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                            <input type="text" id="address" required placeholder="Adresse de votre entreprise" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="auth-field">
                                        <label htmlFor="website">Site web / Réseaux <span className="auth-optional">(optionnel)</span></label>
                                        <div className="auth-input-wrap">
                                            <svg className="auth-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                            <input type="text" id="website" placeholder="www.exemple.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="auth-section-divider" />
                                <div className="auth-section-label">Responsable du compte</div>
                            </>
                        )}

                        {/* Common fields */}
                        <div className="auth-row">
                            <div className="auth-field">
                                <label htmlFor="firstName">{accountType === "entreprise" ? "Prénom du responsable" : "Prénom"} *</label>
                                <div className="auth-input-wrap">
                                    <svg className="auth-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    <input type="text" id="firstName" required placeholder="Votre prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                            </div>
                            <div className="auth-field">
                                <label htmlFor="lastName">{accountType === "entreprise" ? "Nom du responsable" : "Nom"} *</label>
                                <div className="auth-input-wrap">
                                    <svg className="auth-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    <input type="text" id="lastName" required placeholder="Votre nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="auth-row">
                            <div className="auth-field">
                                <label htmlFor="phone">Téléphone *</label>
                                <div className="auth-input-wrap">
                                    <svg className="auth-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    <input type="tel" id="phone" required placeholder="+225 07 00 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className="auth-field">
                                <label htmlFor="city">Ville *</label>
                                <div className="auth-input-wrap">
                                    <svg className="auth-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    <input type="text" id="city" required placeholder="Ex: Abidjan" value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="email">Email *</label>
                            <div className="auth-input-wrap">
                                <svg className="auth-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                <input type="email" id="email" required placeholder={accountType === "entreprise" ? "contact@entreprise.ci" : "nom@exemple.com"} value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="password">Mot de passe *</label>
                            <div className="auth-input-wrap">
                                <svg className="auth-input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                <input type={showPassword ? "text" : "password"} id="password" required minLength={8} placeholder="Minimum 8 caractères" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button type="button" className="auth-toggle-pw" onClick={() => setShowPassword(!showPassword)} aria-label="Afficher le mot de passe">
                                    {showPassword ? (
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                            {password.length > 0 && (
                                <div className="auth-pw-strength">
                                    <div className="auth-pw-bars">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="auth-pw-bar" style={{ background: i <= strength.level ? strength.color : "#e0e0e0" }} />
                                        ))}
                                    </div>
                                    <span style={{ color: strength.color }}>{strength.label}</span>
                                </div>
                            )}
                        </div>

                        <div className="auth-checkbox">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">
                                J&apos;accepte les <a href="#">Conditions d&apos;utilisation</a> et la <a href="#">Politique de confidentialité</a>
                            </label>
                        </div>

                        <button type="submit" className="auth-btn-primary" disabled={loading}>
                            {loading ? (
                                <><span className="auth-spinner" />Création en cours...</>
                            ) : (
                                accountType === "entreprise" ? "Créer mon compte entreprise" : "Créer mon compte"
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>ou continuer avec</span>
                    </div>

                    <div className="auth-social">
                        <button className="auth-social-btn">
                            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </button>
                        <button className="auth-social-btn">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                            Apple
                        </button>
                    </div>

                    <div className="auth-footer">
                        Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
