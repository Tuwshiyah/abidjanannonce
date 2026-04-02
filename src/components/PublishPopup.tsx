"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import "./publish-popup.css";

export default function PublishButton() {
    const [open, setOpen] = useState(false);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
        if (open) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [open, close]);

    return (
        <>
            <button className="publish-btn" onClick={() => setOpen(true)}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Publier une annonce
            </button>

            {open && (
                <div className="pub-overlay" onClick={close}>
                    <div className="pub-modal" onClick={(e) => e.stopPropagation()}>
                        {/* Close */}
                        <button className="pub-close" onClick={close} aria-label="Fermer">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Header */}
                        <div className="pub-header">
                            <div className="pub-header-icon">
                                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="3" y="3" width="18" height="18" rx="4" />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                            </div>
                            <h2>Publiez votre annonce</h2>
                            <p>Pour publier une annonce, vous devez avoir un compte. Choisissez le type de compte qui vous correspond.</p>
                        </div>

                        {/* Two columns */}
                        <div className="pub-columns">
                            {/* Particulier */}
                            <div className="pub-col">
                                <div className="pub-col-icon pub-col-icon-blue">
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="12" cy="8" r="5" />
                                        <path d="M20 21a8 8 0 0 0-16 0" />
                                    </svg>
                                </div>
                                <h3>Particulier</h3>
                                <span className="pub-col-subtitle">Vendez vos objets personnels</span>
                                <ul className="pub-perks">
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        5 annonces gratuites incluses
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        3 photos par annonce
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Boosts À la une disponibles
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Options à la carte (remontée, urgent...)
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Inscription rapide et gratuite
                                    </li>
                                </ul>
                                <div className="pub-pricing">
                                    <span className="pub-price-tag">Gratuit pour commencer</span>
                                    <span className="pub-price-detail">Options payantes disponibles pour booster vos annonces</span>
                                </div>
                                <Link href="/inscription?type=particulier" className="pub-cta pub-cta-blue" onClick={close}>
                                    Créer un compte particulier
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /><polyline points="12 5 19 12 12 19" /></svg>
                                </Link>
                            </div>

                            {/* Entreprise */}
                            <div className="pub-col pub-col-pro">
                                <div className="pub-pro-badge">Recommandé</div>
                                <div className="pub-col-icon pub-col-icon-gold">
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="2" y="7" width="20" height="14" rx="3" />
                                        <path d="M16 7V5a4 4 0 0 0-8 0v2" />
                                        <circle cx="12" cy="14" r="2" />
                                    </svg>
                                </div>
                                <h3>Entreprise <span className="pub-pro-label">PRO</span></h3>
                                <span className="pub-col-subtitle">Vendez de façon professionnelle</span>
                                <ul className="pub-perks">
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Jusqu&apos;à 40+ annonces
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        8 photos par annonce
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Badge PRO vérifié
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Page boutique personnalisée
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Statistiques & boosts
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        WhatsApp Business intégré
                                    </li>
                                </ul>
                                <div className="pub-pricing">
                                    <span className="pub-price-tag pub-price-tag-pro">À partir de 7 500 FCFA/mois</span>
                                    <span className="pub-price-detail">Plusieurs forfaits selon vos besoins</span>
                                </div>
                                <Link href="/inscription?type=entreprise" className="pub-cta pub-cta-gold" onClick={close}>
                                    Créer un compte entreprise
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /><polyline points="12 5 19 12 12 19" /></svg>
                                </Link>
                            </div>
                        </div>

                        {/* Already have account */}
                        <div className="pub-footer">
                            <p>Vous avez déjà un compte ? <Link href="/connexion" onClick={close}>Se connecter</Link></p>
                            <p className="pub-footer-secondary">
                                <Link href="/forfaits" onClick={close}>Comparer tous les forfaits en détail</Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
