"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { MOCK_PRODUCTS } from "@/lib/data";
import "./dashboard.css";

type User = {
    $id: string;
    name: string;
    email: string;
};

export default function TableauDeBordPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const sellerListings = MOCK_PRODUCTS.slice(3, 5);

    useEffect(() => {
        account.get()
            .then((res) => setUser(res as unknown as User))
            .catch(() => {
                window.location.href = "/connexion";
            })
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = async () => {
        await account.deleteSession("current");
        window.location.href = "/connexion";
    };

    if (loading) {
        return (
            <div className="dashboard-page container" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p>Chargement...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-page container animate-fade-in">
            <div className="dashboard-header">
                <div>
                    <h1>Mon Tableau de Bord</h1>
                    <p className="dashboard-subtitle">Bienvenue, {user?.name || "Utilisateur"} !</p>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <Link href="/vendre" className="primary-btn shrink-btn">
                        + Nouvelle Annonce
                    </Link>
                    <button onClick={handleLogout} className="secondary-btn shrink-btn" style={{ whiteSpace: "nowrap" }}>
                        D{"\u00e9"}connexion
                    </button>
                </div>
            </div>

            <div className="dashboard-grid">
                <aside className="dashboard-sidebar">
                    <nav className="sidebar-nav glass-panel">
                        <ul>
                            <li className="active"><a href="#">Vue d&apos;ensemble</a></li>
                            <li><a href="#">Mes annonces (2)</a></li>
                            <li><a href="#">Brouillons (0)</a></li>
                            <li><a href="#">Termin{"\u00e9"}es (14)</a></li>
                            <li className="nav-divider"></li>
                            <li><a href="#">Messages & Contacts (3)</a></li>
                            <li><a href="#">{"\u00c9"}valuations</a></li>
                            <li><a href="#">Param{"\u00e8"}tres du compte</a></li>
                        </ul>
                    </nav>
                </aside>

                <main className="dashboard-content">
                    <div className="stats-row">
                        <div className="stat-card glass-panel">
                            <h3>Ventes sur 90 jours</h3>
                            <div className="stat-value">3 450,00 {"\u20ac"}</div>
                            <span className="stat-trend positive">{"\u2191"} +12%</span>
                        </div>
                        <div className="stat-card glass-panel">
                            <h3>Vues (30j)</h3>
                            <div className="stat-value">1 248</div>
                            <span className="stat-trend positive">{"\u2191"} +5%</span>
                        </div>
                        <div className="stat-card glass-panel">
                            <h3>{"\u00c9"}valuation</h3>
                            <div className="stat-value">100%</div>
                            <span className="stat-subtitle">Positif (42 avis)</span>
                        </div>
                    </div>

                    <div className="listings-section glass-panel">
                        <div className="section-header">
                            <h2>Annonces en cours</h2>
                            <button className="secondary-btn">Voir tout</button>
                        </div>
                        <div className="listings-list">
                            {sellerListings.map(product => (
                                <div key={product.id} className="listing-item">
                                    <div className="listing-image">
                                        <img src={product.imageUrl} alt={product.title} />
                                    </div>
                                    <div className="listing-details">
                                        <Link href={`/product/${product.id}`} className="listing-title">
                                            {product.title}
                                        </Link>
                                        <div className="listing-meta">
                                            <span>N{"\u00b0"} d&apos;objet: {123456789000 + (parseInt(product.id.replace(/\D/g, '') || '0'))}</span>
                                            <span>{"\u2022"}</span>
                                            <span className="condition-tag">{product.condition}</span>
                                        </div>
                                    </div>
                                    <div className="listing-stats">
                                        <div className="stat-cell">
                                            <span className="stat-label">Prix</span>
                                            <span className="stat-num">{product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                                        </div>
                                        <div className="stat-cell">
                                            <span className="stat-label">Vues</span>
                                            <span className="stat-num">{24 * (parseInt(product.id.replace(/\D/g, '') || '1'))}</span>
                                        </div>
                                        <div className="stat-cell">
                                            <span className="stat-label">Suivis</span>
                                            <span className="stat-num">{3 * (parseInt(product.id.replace(/\D/g, '') || '1'))}</span>
                                        </div>
                                    </div>
                                    <div className="listing-actions">
                                        <button className="action-btn">Modifier</button>
                                        <button className="action-btn">Terminer</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="messages-section glass-panel">
                        <div className="section-header">
                            <h2>Derniers messages</h2>
                        </div>
                        <div className="message-list">
                            <div className="message-item unread">
                                <div className="msg-avatar">JL</div>
                                <div className="msg-content">
                                    <div className="msg-header">
                                        <span className="msg-sender">Jean_Luc_75</span>
                                        <span className="msg-time">Il y a 2 heures</span>
                                    </div>
                                    <div className="msg-subject">Objet : {sellerListings[0].title}</div>
                                    <p className="msg-preview">Bonjour, est-ce que le prix est n{"\u00e9"}gociable si je viens le chercher ?</p>
                                </div>
                            </div>
                            <div className="message-item">
                                <div className="msg-avatar">MC</div>
                                <div className="msg-content">
                                    <div className="msg-header">
                                        <span className="msg-sender">MarieCaro</span>
                                        <span className="msg-time">Hier</span>
                                    </div>
                                    <div className="msg-subject">Objet : {sellerListings[1].title}</div>
                                    <p className="msg-preview">Merci pour votre r{"\u00e9"}ponse rapide, je regarde {"\u00e7"}a ce soir.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
