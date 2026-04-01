"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { MOCK_PRODUCTS } from "@/lib/data";
import { useFavorites } from "@/lib/favorites";
import { ALL_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import "./dashboard.css";

type User = {
    $id: string;
    name: string;
    email: string;
};

const TABS = ["Annonces", "Favoris", "Messages", "Paramètres"];

export default function TableauDeBordPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Annonces");
    const { favorites } = useFavorites();

    const sellerListings = MOCK_PRODUCTS.slice(0, 4);
    const favoriteProducts = ALL_PRODUCTS.filter(p => favorites.includes(p.id));

    useEffect(() => {
        account.get()
            .then((res) => setUser(res as unknown as User))
            .catch(() => {
                setUser({ $id: "demo", name: "Visiteur", email: "demo@abidjanannonce.ci" });
            })
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = async () => {
        await account.deleteSession("current");
        window.location.href = "/connexion";
    };

    if (loading) {
        return (
            <div className="dash" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="dash-loading">
                    <div className="dash-spinner-lg" />
                    <p>Chargement...</p>
                </div>
            </div>
        );
    }

    const initials = (user?.name || "U").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

    return (
        <div className="dash">
            {/* Breadcrumb */}
            <nav className="dash-breadcrumb">
                <Link href="/">Accueil</Link>
                <span>/</span>
                <span className="dash-breadcrumb-current">Mon espace</span>
            </nav>

            {/* Header Card — inspired by seller profile */}
            <div className="dash-header-card">
                <div className="dash-header-top">
                    <div className="dash-header-left">
                        <div className="dash-header-avatar">{initials}</div>
                        <div className="dash-header-info">
                            <div className="dash-header-name-row">
                                <h1>{user?.name || "Utilisateur"}</h1>
                                <span className="dash-plan-badge">Gratuit</span>
                            </div>
                            <p className="dash-header-email">{user?.email}</p>
                            <div className="dash-header-meta">
                                <span className="dash-header-meta-item">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    Abidjan, Côte d&apos;Ivoire
                                </span>
                                <span className="dash-header-meta-item">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                    Membre depuis mars 2025
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="dash-header-actions">
                        <Link href="/vendre" className="dash-action-publish">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            Publier une annonce
                        </Link>
                        <button onClick={handleLogout} className="dash-action-logout">Déconnexion</button>
                    </div>
                </div>

                {/* Stats row inside card */}
                <div className="dash-header-stats">
                    <div className="dash-header-stat">
                        <span className="dash-header-stat-num">{sellerListings.length}</span>
                        <span className="dash-header-stat-label">Annonces</span>
                    </div>
                    <div className="dash-header-stat">
                        <span className="dash-header-stat-num">0</span>
                        <span className="dash-header-stat-label">Vendus</span>
                    </div>
                    <div className="dash-header-stat">
                        <span className="dash-header-stat-num">248</span>
                        <span className="dash-header-stat-label">Vues (30j)</span>
                    </div>
                    <div className="dash-header-stat">
                        <span className="dash-header-stat-num">{favorites.length}</span>
                        <span className="dash-header-stat-label">Favoris</span>
                    </div>
                    <div className="dash-header-stat">
                        <span className="dash-header-stat-num">3</span>
                        <span className="dash-header-stat-label">Messages</span>
                    </div>
                </div>
            </div>

            {/* Upgrade banner */}
            <Link href="/forfaits" className="dash-upgrade-banner">
                <div className="dash-upgrade-left">
                    <span className="dash-upgrade-badge">PRO</span>
                    <div>
                        <strong>Passez au forfait Pro</strong>
                        <p>Plus d&apos;annonces, boosts, boutique vendeur et bien plus.</p>
                    </div>
                </div>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>

            {/* Tabs */}
            <div className="dash-tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`dash-tab ${activeTab === tab ? "dash-tab-active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                        {tab === "Messages" && <span className="dash-tab-badge">3</span>}
                        {tab === "Favoris" && favorites.length > 0 && <span className="dash-tab-badge">{favorites.length}</span>}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="dash-tab-content">
                {activeTab === "Annonces" && (
                    <>
                        {sellerListings.length === 0 ? (
                            <div className="dash-empty">
                                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ccc" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                                <h3>Aucune annonce</h3>
                                <p>Publiez votre première annonce et commencez à vendre.</p>
                                <Link href="/vendre" className="dash-btn-primary">Publier une annonce</Link>
                            </div>
                        ) : (
                            <div className="dash-annonces">
                                {sellerListings.map((product) => (
                                    <div key={product.id} className="dash-annonce-card">
                                        <div className="dash-annonce-img">
                                            <img src={product.imageUrl} alt={product.title} />
                                            <span className="dash-annonce-status dash-status-active">Active</span>
                                        </div>
                                        <div className="dash-annonce-info">
                                            <Link href={`/product/${product.id}`} className="dash-annonce-title">{product.title}</Link>
                                            <span className="dash-annonce-price">{product.price.toLocaleString("fr-FR")} FCFA</span>
                                            <div className="dash-annonce-meta">
                                                <span>{product.category}</span>
                                                <span>•</span>
                                                <span>Publié il y a 3j</span>
                                            </div>
                                        </div>
                                        <div className="dash-annonce-stats">
                                            <div>
                                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                {24 * parseInt(product.id.replace(/\D/g, "") || "1")}
                                            </div>
                                            <div>
                                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                                {3 * parseInt(product.id.replace(/\D/g, "") || "1")}
                                            </div>
                                        </div>
                                        <div className="dash-annonce-actions">
                                            <button className="dash-action-btn">Modifier</button>
                                            <button className="dash-action-btn dash-action-boost">
                                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                                                Booster
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {activeTab === "Favoris" && (
                    <>
                        {favoriteProducts.length === 0 ? (
                            <div className="dash-empty">
                                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ccc" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                <h3>Aucun favori</h3>
                                <p>Ajoutez des annonces en favoris pour les retrouver ici.</p>
                                <Link href="/annonces" className="dash-btn-primary">Parcourir les annonces</Link>
                            </div>
                        ) : (
                            <div className="dash-favorites-grid">
                                {favoriteProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} showBadge={false} />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {activeTab === "Messages" && (
                    <div className="dash-messages">
                        <div className="dash-msg dash-msg-unread">
                            <div className="dash-msg-avatar">JL</div>
                            <div className="dash-msg-body">
                                <div className="dash-msg-top">
                                    <span className="dash-msg-name">Jean_Luc</span>
                                    <span className="dash-msg-time">Il y a 2h</span>
                                </div>
                                <p className="dash-msg-subject">Re: {sellerListings[0]?.title}</p>
                                <p className="dash-msg-text">Bonjour, est-ce que le prix est négociable ?</p>
                            </div>
                        </div>
                        <div className="dash-msg">
                            <div className="dash-msg-avatar">AM</div>
                            <div className="dash-msg-body">
                                <div className="dash-msg-top">
                                    <span className="dash-msg-name">Aminata_M</span>
                                    <span className="dash-msg-time">Hier</span>
                                </div>
                                <p className="dash-msg-subject">Re: {sellerListings[1]?.title}</p>
                                <p className="dash-msg-text">Merci, je passe demain à Cocody récupérer.</p>
                            </div>
                        </div>
                        <div className="dash-msg">
                            <div className="dash-msg-avatar">KS</div>
                            <div className="dash-msg-body">
                                <div className="dash-msg-top">
                                    <span className="dash-msg-name">Kouamé_S</span>
                                    <span className="dash-msg-time">Il y a 3j</span>
                                </div>
                                <p className="dash-msg-subject">Re: {sellerListings[2]?.title}</p>
                                <p className="dash-msg-text">C&apos;est encore disponible ?</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Paramètres" && (
                    <div className="dash-settings">
                        <div className="dash-settings-section">
                            <h3>Informations personnelles</h3>
                            <div className="dash-settings-fields">
                                <div className="dash-settings-field">
                                    <label>Nom complet</label>
                                    <input type="text" defaultValue={user?.name || ""} placeholder="Votre nom" />
                                </div>
                                <div className="dash-settings-field">
                                    <label>Email</label>
                                    <input type="email" defaultValue={user?.email || ""} placeholder="Votre email" disabled />
                                </div>
                                <div className="dash-settings-field">
                                    <label>Téléphone</label>
                                    <input type="tel" placeholder="+225 07 00 00 00 00" />
                                </div>
                                <div className="dash-settings-field">
                                    <label>Ville</label>
                                    <select defaultValue="abidjan">
                                        <option value="abidjan">Abidjan</option>
                                        <option value="yamoussoukro">Yamoussoukro</option>
                                        <option value="bouake">Bouaké</option>
                                    </select>
                                </div>
                            </div>
                            <button className="dash-settings-save">Enregistrer</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
