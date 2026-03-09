"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/data";
import "./seller-profile.css";
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
        <div className="seller-rating-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => {
                const filled = rating >= index + 1 || rating > index + 0.4;
                return (
                    <svg key={index} viewBox="0 0 24 24" width="16" height="16" fill={filled ? "#f5af02" : "#d8d8de"}>
                        <path d="M12 2.2l2.85 5.77 6.37.93-4.61 4.49 1.09 6.35L12 16.73l-5.7 3.01 1.09-6.35L2.78 8.9l6.37-.93L12 2.2z" />
                    </svg>
                );
            })}
        </div>
    );
}

function getBubbleImages(seller: SellerInfo): string[] {
    const images = seller.products.map((p) => p.imageUrl);
    const extras = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=200&auto=format&fit=crop",
    ];
    let i = 0;
    while (images.length < 7) {
        images.push(extras[i % extras.length]);
        i++;
    }
    return images.slice(0, 7);
}

function getCategories(products: Product[]) {
    const catMap = new Map<string, number>();
    for (const p of products) {
        catMap.set(p.category, (catMap.get(p.category) || 0) + 1);
    }
    return Array.from(catMap.entries()).map(([name, count]) => ({ name, count }));
}

export default function SellerProfileContent({ seller }: { seller: SellerInfo }) {
    const bubbleImages = getBubbleImages(seller);
    const categories = getCategories(seller.products);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"sale" | "sold">("sale");
    const [showContactModal, setShowContactModal] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(Math.max(12, Math.round(seller.totalReviews / 5)));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [seller.id]);

    const forSaleProducts = seller.products.filter((p) => !p.sold);
    const soldProducts = seller.products.filter((p) => p.sold);
    const tabProducts = activeTab === "sale" ? forSaleProducts : soldProducts;
    const filteredProducts = activeCategory
        ? tabProducts.filter((p) => p.category === activeCategory)
        : tabProducts;

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount((c) => liked ? c - 1 : c + 1);
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title: seller.name, url });
        } else {
            await navigator.clipboard.writeText(url);
            alert("Lien copi\u00e9 !");
        }
    };

    return (
        <div className="seller-profile-page container">
            <nav className="seller-breadcrumb" aria-label="Fil d'ariane">
                <Link href="/">Accueil</Link>
                <span>/</span>
                <span>{seller.name}</span>
            </nav>

            <div className="seller-header-card">
                <div className="seller-header-top">
                    <div className="seller-header-left">
                        <div className="seller-header-avatar">
                            {seller.name.slice(0, 1)}
                        </div>
                        <div className="seller-header-info">
                            <div className="seller-header-name-row">
                                <h1>{seller.name}</h1>
                                <svg className="seller-fb-check" viewBox="0 0 24 24" width="22" height="22">
                                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.63 13.43 1.75 12 1.75s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z" fill="var(--primary)" />
                                    <path d="M9 12l2 2 4-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="seller-verified-text">{"Vendeur v\u00e9rifi\u00e9"}</span>
                            </div>
                            <div className="seller-header-rating">
                                <RatingStars rating={seller.rating} />
                                <span className="seller-rating-value">{seller.rating.toFixed(1)}/5</span>
                                <span className="seller-rating-count">({seller.totalReviews.toLocaleString("fr-FR")} avis)</span>
                            </div>
                            <div className="seller-meta-row">
                                <span className="seller-meta-item">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                    {seller.location}
                                </span>
                                <span className="seller-meta-sep">{"\u00b7"}</span>
                                <span className="seller-meta-item">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                                    A rejoint le {seller.joinDate}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="seller-header-right">
                        <div className="seller-articles-bubbles">
                            {bubbleImages.map((img, i) => (
                                <div key={i} className="seller-bubble" style={{ zIndex: 5 - i }}>
                                    <img src={img} alt={`Article ${i + 1}`} />
                                </div>
                            ))}
                        </div>
                        <div className="seller-mini-stats">
                            <span className="seller-mini-stat">
                                <strong>{seller.productCount}</strong> annonce{seller.productCount > 1 ? "s" : ""}
                            </span>
                            <span className="seller-mini-stat-sep">{"\u00b7"}</span>
                            <span className="seller-mini-stat">
                                <strong>{seller.totalReviews.toLocaleString("fr-FR")}</strong> avis
                            </span>
                        </div>
                    </div>
                </div>

                <div className="seller-about-section">
                    <h3>{`\u00c0 propos de nous`}</h3>
                    <p>{seller.description}</p>
                </div>

                <div className="seller-header-actions">
                    <button className="seller-contact-btn" onClick={() => setShowContactModal(true)}>Contacter le vendeur</button>
                    <button className="seller-follow-btn">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>Ajouter aux favoris</span>
                    </button>
                    <button className={`seller-like-btn ${liked ? "seller-like-active" : ""}`} onClick={handleLike}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill={liked ? "#e53935" : "none"} stroke="#e53935" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>{likeCount.toLocaleString("fr-FR")}</span>
                    </button>
                    <button className="seller-share-btn" onClick={handleShare}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <path d="M8.59 13.51 15.42 17.49M15.41 6.51 8.59 10.49" />
                        </svg>
                        <span>Partager</span>
                    </button>
                </div>
            </div>

            {showContactModal && (
                <div className="modal-backdrop fadeIn" onClick={() => setShowContactModal(false)}>
                    <div className="modal-content scaleIn" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowContactModal(false)}>&times;</button>
                        <div className="modal-header">
                            <h2>Contacter {seller.name}</h2>
                        </div>
                        <div className="contact-options">
                            <a href="tel:+2250700000000" className="contact-option">
                                <div className="contact-option-icon contact-option-phone">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="contact-option-text">
                                    <strong>{`T\u00e9l\u00e9phone`}</strong>
                                    <span>Appeler directement le vendeur</span>
                                </div>
                            </a>
                            <a href="https://wa.me/2250700000000" target="_blank" rel="noopener noreferrer" className="contact-option">
                                <div className="contact-option-icon contact-option-whatsapp">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                                    </svg>
                                </div>
                                <div className="contact-option-text">
                                    <strong>WhatsApp</strong>
                                    <span>Envoyer un message WhatsApp</span>
                                </div>
                            </a>
                            <a href="mailto:vendeur@luxebay.ci" className="contact-option">
                                <div className="contact-option-icon contact-option-email">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <div className="contact-option-text">
                                    <strong>Email</strong>
                                    <span>Envoyer un email au vendeur</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <section className="seller-products-section">
                <div className="seller-tabs">
                    <button
                        className={`seller-tab ${activeTab === "sale" ? "active" : ""}`}
                        onClick={() => { setActiveTab("sale"); setActiveCategory(null); }}
                    >
                        Disponible
                        <span className="seller-tab-count">{forSaleProducts.length}</span>
                    </button>
                    <button
                        className={`seller-tab ${activeTab === "sold" ? "active" : ""}`}
                        onClick={() => { setActiveTab("sold"); setActiveCategory(null); }}
                    >
                        Vendu
                        <span className="seller-tab-count">{soldProducts.length}</span>
                    </button>
                </div>
                <div className="seller-products-header">
                    <span className="seller-products-count">{filteredProducts.length} article{filteredProducts.length > 1 ? "s" : ""}</span>
                </div>
                <div className="seller-products-layout">
                    <div className="seller-products-grid">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className={`seller-product-item ${product.sold ? "seller-product-sold" : ""}`}>
                                <ProductCard product={product} showBadge={false} />
                                {product.sold && <div className="seller-sold-badge">Vendu</div>}
                            </div>
                        ))}
                    </div>
                    {categories.length > 1 && (
                        <aside className="seller-filters">
                            <h2 className="seller-filters-title">{`Cat\u00e9gories`}</h2>
                            <ul className="seller-filter-list">
                                <li>
                                    <button
                                        className={`seller-filter-btn ${activeCategory === null ? "active" : ""}`}
                                        onClick={() => setActiveCategory(null)}
                                    >
                                        <span>Toutes les annonces<span className="seller-filter-count">{seller.productCount}</span></span>
                                        <svg className="seller-filter-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                    </button>
                                </li>
                                {categories.map((cat) => (
                                    <li key={cat.name}>
                                        <button
                                            className={`seller-filter-btn ${activeCategory === cat.name ? "active" : ""}`}
                                            onClick={() => setActiveCategory(cat.name)}
                                        >
                                            <span>{cat.name}<span className="seller-filter-count">{cat.count}</span></span>
                                            <svg className="seller-filter-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    )}
                </div>
            </section>
        </div>
    );
}
