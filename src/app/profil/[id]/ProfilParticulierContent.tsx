"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/data";
import "./profil-particulier.css";
import "@/components/contact-modal.css";

type SellerInfo = {
    id: string;
    name: string;
    rating: number;
    totalReviews: number;
    productCount: number;
    products: Product[];
    memberSince: string;
    joinDate: string;
    responseRate: number;
    responseTime: string;
    description: string;
    location: string;
};

function RatingStars({ rating }: { rating: number }) {
    return (
        <div className="pp-stars">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" width="16" height="16" fill={rating >= i + 1 || rating > i + 0.4 ? "#f5af02" : "#d8d8de"}>
                    <path d="M12 2.2l2.85 5.77 6.37.93-4.61 4.49 1.09 6.35L12 16.73l-5.7 3.01 1.09-6.35L2.78 8.9l6.37-.93L12 2.2z" />
                </svg>
            ))}
        </div>
    );
}

export default function ProfilParticulierContent({ seller, products }: { seller: SellerInfo; products: Product[] }) {
    const [showContact, setShowContact] = useState(false);
    const [phoneRevealed, setPhoneRevealed] = useState(false);
    const [activeTab, setActiveTab] = useState<"sale" | "sold">("sale");

    const firstName = seller.name.split(" ")[0];
    const lastInitial = seller.name.split(" ").length > 1 ? seller.name.split(" ")[1][0] + "." : "";
    const displayName = `${firstName} ${lastInitial}`;
    const initials = seller.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

    const forSale = products.filter(p => !p.sold);
    const sold = products.filter(p => p.sold);
    const tabProducts = activeTab === "sale" ? forSale : sold;

    const monthsSince = (() => {
        const now = new Date();
        const joined = new Date(`${seller.memberSince}-01-01`);
        const months = (now.getFullYear() - joined.getFullYear()) * 12 + now.getMonth() - joined.getMonth();
        if (months < 12) return `${months} mois`;
        const years = Math.floor(months / 12);
        return `${years} an${years > 1 ? "s" : ""}`;
    })();

    return (
        <div className="pp-page">
            {/* Breadcrumb */}
            <nav className="pp-breadcrumb">
                <Link href="/">Accueil</Link>
                <span>/</span>
                <span className="pp-breadcrumb-current">{displayName}</span>
            </nav>

            {/* Profile Card */}
            <div className="pp-card">
                <div className="pp-card-main">
                    <div className="pp-avatar">
                        {initials}
                    </div>
                    <div className="pp-info">
                        <div className="pp-name-row">
                            <h1>{displayName}</h1>
                            <span className="pp-badge-particulier">Particulier</span>
                        </div>
                        <div className="pp-meta">
                            <div className="pp-meta-item">
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                {seller.location}
                            </div>
                            <div className="pp-meta-item">
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                Membre depuis {monthsSince}
                            </div>
                        </div>
                        <div className="pp-rating-row">
                            <RatingStars rating={seller.rating} />
                            <span className="pp-rating-text">{seller.rating.toFixed(1)} ({seller.totalReviews} avis)</span>
                        </div>
                    </div>
                    <div className="pp-actions">
                        <button className="pp-btn-contact" onClick={() => setShowContact(true)}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            Contacter
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="pp-stats">
                    <div className="pp-stat">
                        <span className="pp-stat-num">{forSale.length}</span>
                        <span className="pp-stat-label">Annonces actives</span>
                    </div>
                    <div className="pp-stat">
                        <span className="pp-stat-num">{sold.length}</span>
                        <span className="pp-stat-label">Vendus</span>
                    </div>
                    <div className="pp-stat">
                        <span className="pp-stat-num">{seller.totalReviews}</span>
                        <span className="pp-stat-label">Avis reçus</span>
                    </div>
                    <div className="pp-stat">
                        <span className="pp-stat-num">{seller.responseRate}%</span>
                        <span className="pp-stat-label">Taux de réponse</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="pp-tabs-section">
                <div className="pp-tabs">
                    <button className={`pp-tab ${activeTab === "sale" ? "pp-tab-active" : ""}`} onClick={() => setActiveTab("sale")}>
                        En vente
                        <span className="pp-tab-count">{forSale.length}</span>
                    </button>
                    <button className={`pp-tab ${activeTab === "sold" ? "pp-tab-active" : ""}`} onClick={() => setActiveTab("sold")}>
                        Vendus
                        <span className="pp-tab-count">{sold.length}</span>
                    </button>
                </div>

                {tabProducts.length > 0 ? (
                    <div className="pp-products-grid">
                        {tabProducts.map(p => (
                            <ProductCard key={p.id} product={p} showBadge={false} />
                        ))}
                    </div>
                ) : (
                    <div className="pp-empty">
                        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#ccc" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                        <p>Aucune annonce {activeTab === "sold" ? "vendue" : "en vente"} pour le moment</p>
                    </div>
                )}
            </div>

            {/* Contact Modal */}
            {showContact && (
                <div className="modal-backdrop fadeIn" onClick={() => { setShowContact(false); setPhoneRevealed(false); }}>
                    <div className="modal-content scaleIn" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => { setShowContact(false); setPhoneRevealed(false); }}>&times;</button>
                        <div className="modal-header">
                            <h2>Contacter {displayName}</h2>
                        </div>
                        <div className="contact-options">
                            <div className="contact-option contact-option-clickable" onClick={() => setPhoneRevealed(true)}>
                                <div className="contact-option-icon contact-option-phone">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                </div>
                                <div className="contact-option-text">
                                    <strong>Téléphone</strong>
                                    {phoneRevealed ? (
                                        <a href="tel:+2250700000000" className="contact-phone-number" onClick={e => e.stopPropagation()}>+225 07 00 00 00 00</a>
                                    ) : (
                                        <span className="contact-phone-masked">+225 07 XX XX XX XX · <em>Cliquez pour afficher</em></span>
                                    )}
                                </div>
                            </div>
                            <a href="https://wa.me/2250700000000" target="_blank" rel="noopener noreferrer" className="contact-option">
                                <div className="contact-option-icon contact-option-whatsapp">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                                </div>
                                <div className="contact-option-text">
                                    <strong>WhatsApp</strong>
                                    <span>Envoyer un message WhatsApp</span>
                                </div>
                            </a>
                            <a href="mailto:vendeur@abidjanannonce.ci" className="contact-option">
                                <div className="contact-option-icon contact-option-email">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </div>
                                <div className="contact-option-text">
                                    <strong>Email</strong>
                                    <span>Envoyer un email</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
