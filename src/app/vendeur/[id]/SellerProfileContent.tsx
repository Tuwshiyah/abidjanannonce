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
    const [phoneRevealed, setPhoneRevealed] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviewName, setReviewName] = useState("");
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"recent" | "price-asc" | "price-desc">("recent");
    const [conditionFilter, setConditionFilter] = useState<string | null>(null);
    const [filterPriceMin, setFilterPriceMin] = useState(0);
    const [filterPriceMax, setFilterPriceMax] = useState(50000);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({ sort: true, categories: true, condition: true, price: true });
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const toggleSection = (key: string) => {
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [seller.id]);

    const forSaleProducts = seller.products.filter((p) => !p.sold);
    const soldProducts = seller.products.filter((p) => p.sold);
    const tabProducts = activeTab === "sale" ? forSaleProducts : soldProducts;

    const conditions = Array.from(new Set(tabProducts.map((p) => p.condition)));
    const priceRangeMax = tabProducts.length > 0
        ? Math.ceil(Math.max(...tabProducts.map((p) => p.price)) / 100) * 100
        : 50000;

    // Apply all filters
    let filteredProducts = tabProducts;
    if (activeCategory) {
        filteredProducts = filteredProducts.filter((p) => p.category === activeCategory);
    }
    if (conditionFilter) {
        filteredProducts = filteredProducts.filter((p) => p.condition === conditionFilter);
    }
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter((p) =>
            p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
        );
    }
    if (filterPriceMin > 0 || filterPriceMax < priceRangeMax) {
        filteredProducts = filteredProducts.filter((p) => p.price >= filterPriceMin && p.price <= filterPriceMax);
    }
    // Sort
    if (sortBy === "price-asc") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    const resetFilters = () => {
        setActiveCategory(null);
        setConditionFilter(null);
        setSearchQuery("");
        setSortBy("recent");
        setFilterPriceMin(0);
        setFilterPriceMax(priceRangeMax);
    };

    const hasActiveFilters = activeCategory || conditionFilter || searchQuery.trim() || sortBy !== "recent" || filterPriceMin > 0 || filterPriceMax < priceRangeMax;

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
                                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.63 13.43 1.75 12 1.75s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z" fill="#2e7d32" />
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
                    <button className="seller-follow-btn" onClick={() => setShowAuthPopup(true)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>Ajouter aux favoris</span>
                    </button>
                    <button className={`seller-like-btn ${liked ? "seller-like-active" : ""}`} onClick={() => setShowAuthPopup(true)}>
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
                <div className="modal-backdrop fadeIn" onClick={() => { setShowContactModal(false); setPhoneRevealed(false); }}>
                    <div className="modal-content scaleIn" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => { setShowContactModal(false); setPhoneRevealed(false); }}>&times;</button>
                        <div className="modal-header">
                            <h2>Contacter {seller.name}</h2>
                        </div>
                        <div className="contact-options">
                            <div className="contact-option contact-option-clickable" onClick={() => setPhoneRevealed(true)}>
                                <div className="contact-option-icon contact-option-phone">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="contact-option-text">
                                    <strong>Téléphone</strong>
                                    {phoneRevealed ? (
                                        <a href="tel:+2250700000000" className="contact-phone-number" onClick={(e) => e.stopPropagation()}>+225 07 00 00 00 00</a>
                                    ) : (
                                        <span className="contact-phone-masked">+225 07 XX XX XX XX · <em>Cliquez pour afficher</em></span>
                                    )}
                                </div>
                            </div>
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
                            <a href="mailto:vendeur@abidjanannonce.ci" className="contact-option">
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

            {/* Auth Popup */}
            {showAuthPopup && (
                <div className="auth-popup-backdrop" onClick={() => setShowAuthPopup(false)}>
                    <div className="auth-popup" onClick={(e) => e.stopPropagation()}>
                        <button className="auth-popup-close" onClick={() => setShowAuthPopup(false)}>&times;</button>
                        <div className="auth-popup-icon">
                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#19335d" strokeWidth="1.5">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <h2>Connectez-vous pour continuer</h2>
                        <p>Créez un compte ou connectez-vous pour ajouter des vendeurs en favoris, liker et accéder à toutes les fonctionnalités.</p>
                        <div className="auth-popup-actions">
                            <Link href="/connexion" className="auth-popup-btn-primary">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                                Se connecter
                            </Link>
                            <Link href="/inscription" className="auth-popup-btn-secondary">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                                Créer un compte
                            </Link>
                        </div>
                        <p className="auth-popup-footer">C&apos;est gratuit et ne prend que 30 secondes !</p>
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
                    <aside className="seller-filters">
                        {/* Search */}
                        <div className="sf-block sf-block-search">
                            <div className="sf-search">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                                <input
                                    type="text"
                                    placeholder="Rechercher un article..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        {categories.length > 1 && (
                            <div className="sf-block">
                                <button className="sf-title-toggle" onClick={() => toggleSection("categories")}>
                                    <span className="sf-title-left">
                                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                                        Catégories
                                    </span>
                                    <svg className={`sf-chevron ${openSections.categories ? "sf-chevron-open" : ""}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                </button>
                                {openSections.categories && (
                                    <div className="sf-body">
                                        <ul className="sf-list">
                                            <li>
                                                <button
                                                    className={`sf-list-btn ${activeCategory === null ? "active" : ""}`}
                                                    onClick={() => setActiveCategory(null)}
                                                >
                                                    <span>Toutes</span>
                                                    <span className="sf-count">{tabProducts.length}</span>
                                                </button>
                                            </li>
                                            {categories.map((cat) => (
                                                <li key={cat.name}>
                                                    <button
                                                        className={`sf-list-btn ${activeCategory === cat.name ? "active" : ""}`}
                                                        onClick={() => setActiveCategory(cat.name)}
                                                    >
                                                        <span>{cat.name}</span>
                                                        <span className="sf-count">{cat.count}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sort */}
                        <div className="sf-block">
                            <button className="sf-title-toggle" onClick={() => toggleSection("sort")}>
                                <span className="sf-title-left">
                                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
                                    Trier par
                                </span>
                                <svg className={`sf-chevron ${openSections.sort ? "sf-chevron-open" : ""}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                            {openSections.sort && (
                                <div className="sf-body">
                                    <div className="sf-sort-options">
                                        {([
                                            { value: "recent" as const, label: "Plus récent" },
                                            { value: "price-asc" as const, label: "Prix croissant" },
                                            { value: "price-desc" as const, label: "Prix décroissant" },
                                        ]).map((opt) => (
                                            <button
                                                key={opt.value}
                                                className={`sf-sort-btn ${sortBy === opt.value ? "active" : ""}`}
                                                onClick={() => setSortBy(opt.value)}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Condition */}
                        {conditions.length > 0 && (
                            <div className="sf-block">
                                <button className="sf-title-toggle" onClick={() => toggleSection("condition")}>
                                    <span className="sf-title-left">
                                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                        État
                                    </span>
                                    <svg className={`sf-chevron ${openSections.condition ? "sf-chevron-open" : ""}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                                </button>
                                {openSections.condition && (
                                    <div className="sf-body">
                                        <ul className="sf-list">
                                            <li>
                                                <button
                                                    className={`sf-list-btn ${conditionFilter === null ? "active" : ""}`}
                                                    onClick={() => setConditionFilter(null)}
                                                >
                                                    <span>Tous les états</span>
                                                </button>
                                            </li>
                                            {conditions.map((cond) => {
                                                const label = cond === "Brand New" ? "Neuf" : cond === "Like New" ? "Comme neuf" : "Occasion";
                                                const count = tabProducts.filter((p) => p.condition === cond).length;
                                                return (
                                                    <li key={cond}>
                                                        <button
                                                            className={`sf-list-btn ${conditionFilter === cond ? "active" : ""}`}
                                                            onClick={() => setConditionFilter(conditionFilter === cond ? null : cond)}
                                                        >
                                                            <span>{label}</span>
                                                            <span className="sf-count">{count}</span>
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Price range slider */}
                        <div className="sf-block">
                            <button className="sf-title-toggle" onClick={() => toggleSection("price")}>
                                <span className="sf-title-left">
                                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                    Fourchette de prix
                                </span>
                                <svg className={`sf-chevron ${openSections.price ? "sf-chevron-open" : ""}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                            {openSections.price && (
                                <div className="sf-body">
                                    <div className="sf-price-slider">
                                        <div className="sf-price-values">
                                            <span>{filterPriceMin.toLocaleString("fr-FR")} FCFA</span>
                                            <span>{filterPriceMax.toLocaleString("fr-FR")} FCFA</span>
                                        </div>
                                        <div className="sf-range-track">
                                            <div
                                                className="sf-range-fill"
                                                style={{
                                                    left: `${(filterPriceMin / priceRangeMax) * 100}%`,
                                                    right: `${100 - (filterPriceMax / priceRangeMax) * 100}%`,
                                                }}
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max={priceRangeMax}
                                                step={Math.max(1, Math.round(priceRangeMax / 100))}
                                                value={filterPriceMin}
                                                onChange={(e) => {
                                                    const val = Number(e.target.value);
                                                    if (val <= filterPriceMax - 10) setFilterPriceMin(val);
                                                }}
                                                className="sf-range-input"
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max={priceRangeMax}
                                                step={Math.max(1, Math.round(priceRangeMax / 100))}
                                                value={filterPriceMax}
                                                onChange={(e) => {
                                                    const val = Number(e.target.value);
                                                    if (val >= filterPriceMin + 10) setFilterPriceMax(val);
                                                }}
                                                className="sf-range-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Reset */}
                        {hasActiveFilters && (
                            <button className="sf-reset-btn" onClick={resetFilters}>
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                Réinitialiser les filtres
                            </button>
                        )}
                    </aside>
                </div>
            </section>

            {/* Section Avis */}
            <section className="seller-reviews-section">
                <div className="seller-reviews-header">
                    <div className="seller-reviews-title-row">
                        <h2>Avis sur la boutique</h2>
                        <span className="seller-reviews-count">{seller.totalReviews.toLocaleString("fr-FR")} avis</span>
                    </div>
                    <button
                        className="seller-write-review-btn"
                        onClick={() => setShowReviewForm(!showReviewForm)}
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Donner votre avis
                    </button>
                </div>

                {/* Review Summary */}
                <div className="seller-reviews-summary">
                    <div className="seller-reviews-big-rating">
                        <span className="seller-reviews-big-number">{seller.rating.toFixed(1)}</span>
                        <div>
                            <RatingStars rating={seller.rating} />
                            <span className="seller-reviews-based">Basé sur {seller.totalReviews.toLocaleString("fr-FR")} avis</span>
                        </div>
                    </div>
                    <div className="seller-reviews-bars">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const pct = star === 5 ? 68 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 3 : 2;
                            return (
                                <div key={star} className="seller-review-bar-row">
                                    <span className="seller-review-bar-label">{star} <svg viewBox="0 0 24 24" width="12" height="12" fill="#f5af02"><path d="M12 2.2l2.85 5.77 6.37.93-4.61 4.49 1.09 6.35L12 16.73l-5.7 3.01 1.09-6.35L2.78 8.9l6.37-.93L12 2.2z" /></svg></span>
                                    <div className="seller-review-bar-bg">
                                        <div className="seller-review-bar-fill" style={{ width: `${pct}%` }} />
                                    </div>
                                    <span className="seller-review-bar-pct">{pct}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Review Form */}
                {showReviewForm && !reviewSubmitted && (
                    <div className="seller-review-form">
                        <h3>Partagez votre expérience</h3>
                        <p className="seller-review-form-subtitle">Votre avis aide les autres acheteurs à faire le bon choix.</p>

                        <div className="seller-review-stars-input">
                            <span>Votre note :</span>
                            <div className="seller-review-stars-row">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        className="seller-review-star-btn"
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setReviewRating(star)}
                                    >
                                        <svg viewBox="0 0 24 24" width="28" height="28" fill={(hoverRating || reviewRating) >= star ? "#f5af02" : "#e0e0e0"}>
                                            <path d="M12 2.2l2.85 5.77 6.37.93-4.61 4.49 1.09 6.35L12 16.73l-5.7 3.01 1.09-6.35L2.78 8.9l6.37-.93L12 2.2z" />
                                        </svg>
                                    </button>
                                ))}
                                {reviewRating > 0 && (
                                    <span className="seller-review-rating-text">
                                        {reviewRating === 1 ? "Mauvais" : reviewRating === 2 ? "Moyen" : reviewRating === 3 ? "Bien" : reviewRating === 4 ? "Très bien" : "Excellent"}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="seller-review-field">
                            <label>Votre nom</label>
                            <input
                                type="text"
                                placeholder="Ex: Aminata K."
                                value={reviewName}
                                onChange={(e) => setReviewName(e.target.value)}
                            />
                        </div>

                        <div className="seller-review-field">
                            <label>Votre avis</label>
                            <textarea
                                placeholder="Décrivez votre expérience avec cette boutique..."
                                rows={4}
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                        </div>

                        <div className="seller-review-form-actions">
                            <button
                                className="seller-review-submit-btn"
                                disabled={reviewRating === 0 || !reviewText.trim()}
                                onClick={() => {
                                    setReviewSubmitted(true);
                                    setShowReviewForm(false);
                                }}
                            >
                                Publier mon avis
                            </button>
                            <button className="seller-review-cancel-btn" onClick={() => setShowReviewForm(false)}>
                                Annuler
                            </button>
                        </div>
                    </div>
                )}

                {reviewSubmitted && (
                    <div className="seller-review-success">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#2e7d32" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <p>Merci pour votre avis ! Il sera publié après vérification.</p>
                    </div>
                )}

                {/* Mock Reviews */}
                <div className="seller-reviews-list">
                    {[
                        { name: "Aminata K.", rating: 5, date: "Il y a 2 jours", text: "Vendeur très sérieux et réactif. J'ai reçu mon article en parfait état. Je recommande cette boutique à 100% !" },
                        { name: "Kouassi M.", rating: 4, date: "Il y a 1 semaine", text: "Bonne expérience d'achat. Le produit correspond à la description. Livraison un peu longue mais le vendeur m'a tenu informé." },
                        { name: "Fatou D.", rating: 5, date: "Il y a 2 semaines", text: "Excellent ! Article de qualité et le vendeur est très professionnel. C'est ma 3ème commande ici." },
                        { name: "Ibrahim S.", rating: 3, date: "Il y a 3 semaines", text: "Produit correct mais l'emballage laissait à désirer. Le vendeur a quand même été arrangeant pour résoudre le problème." },
                    ].map((review, i) => (
                        <div key={i} className="seller-review-card">
                            <div className="seller-review-card-top">
                                <div className="seller-review-card-avatar">
                                    {review.name.charAt(0)}
                                </div>
                                <div className="seller-review-card-info">
                                    <span className="seller-review-card-name">{review.name}</span>
                                    <span className="seller-review-card-date">{review.date}</span>
                                </div>
                                <div className="seller-review-card-stars">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <svg key={j} viewBox="0 0 24 24" width="14" height="14" fill={j < review.rating ? "#f5af02" : "#e0e0e0"}>
                                            <path d="M12 2.2l2.85 5.77 6.37.93-4.61 4.49 1.09 6.35L12 16.73l-5.7 3.01 1.09-6.35L2.78 8.9l6.37-.93L12 2.2z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <p className="seller-review-card-text">{review.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
