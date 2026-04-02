"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { ID } from "appwrite";
import "../../publier.css";
import "../../inscription-form.css";

export default function InscriptionEntreprisePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [businessName, setBusinessName] = useState("");
    const [sector, setSector] = useState("");
    const [rccm, setRccm] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");
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
            await account.create(ID.unique(), email, password, businessName);
            await account.createEmailPasswordSession(email, password);
            await account.updatePrefs({ accountType: "entreprise", phone, whatsapp, city, businessName, sector, rccm, website, address });
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
                        <Link href="/publier/entreprise">Entreprise</Link>
                        <span className="publier-topbar-sep">/</span>
                        <span className="publier-topbar-current">Inscription</span>
                    </nav>
                </div>
                <Link href="/publier/entreprise" className="publier-close-btn" aria-label="Retour">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </Link>
            </div>

            <div className="publier-content" style={{ justifyContent: "flex-start", paddingTop: 32 }}>
                <div className="pf-form-wrapper pf-form-wrapper-wide">
                    <div className="pf-form-header">
                        <h1>Créer un compte entreprise</h1>
                        <p>Renseignez les informations de votre entreprise pour accéder aux outils PRO</p>
                    </div>

                    {error && (
                        <div className="pf-error">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                            {error}
                        </div>
                    )}

                    <form className="pf-form" onSubmit={handleRegister}>
                        <div className="pf-section-label">Informations entreprise</div>

                        <div className="pf-field">
                            <label>Nom de l&apos;entreprise *</label>
                            <input type="text" required placeholder="Nom de votre entreprise" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                        </div>

                        <div className="pf-row">
                            <div className="pf-field">
                                <label>Secteur d&apos;activité *</label>
                                <input type="text" required placeholder="Ex: Commerce, Services..." value={sector} onChange={(e) => setSector(e.target.value)} />
                            </div>
                            <div className="pf-field">
                                <label>RCCM <span className="pf-optional">(optionnel)</span></label>
                                <input type="text" placeholder="Numéro RCCM" value={rccm} onChange={(e) => setRccm(e.target.value)} />
                            </div>
                        </div>

                        <div className="pf-row">
                            <div className="pf-field">
                                <label>Adresse physique *</label>
                                <input type="text" required placeholder="Adresse de votre entreprise" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="pf-field">
                                <label>Site web / Réseaux <span className="pf-optional">(optionnel)</span></label>
                                <input type="text" placeholder="www.exemple.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
                            </div>
                        </div>

                        <div className="pf-section-divider" />
                        <div className="pf-section-label">Responsable du compte</div>

                        <div className="pf-row">
                            <div className="pf-field">
                                <label>Prénom du responsable *</label>
                                <input type="text" required placeholder="Votre prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="pf-field">
                                <label>Nom du responsable *</label>
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

                        <div className="pf-section-divider" />
                        <div className="pf-section-label">Identifiants de connexion</div>

                        <div className="pf-field">
                            <label>Email professionnel *</label>
                            <input type="email" required placeholder="contact@entreprise.ci" value={email} onChange={(e) => setEmail(e.target.value)} />
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

                        <button type="submit" className="pf-submit pf-submit-gold" disabled={loading}>
                            {loading ? "Création en cours..." : "Créer mon compte entreprise"}
                        </button>
                    </form>

                    <div className="pf-footer">
                        Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
