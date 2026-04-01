"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/data";
import { useFavorites } from "@/lib/favorites";
import "./product-detail.css";
import "./contact-modal.css";

type DetailTab = "about" | "specs" | "reviews" | "delivery";

function formatPrice(value: number) {
    return `${value.toLocaleString("fr-FR")} FCFA`;
}

function getConditionLabel(condition: Product["condition"]) {
    if (condition === "Brand New") return "Neuf";
    if (condition === "Like New") return "Comme neuf";
    return "Occasion";
}

function getOptionGroups(product: Product) {
    const category = product.category.toLowerCase();

    if (category.includes("informatique")) {
        return [
            { label: "Stockage", values: ["256 Go", "512 Go", "1 To"], active: 0 },
            { label: "Finition", values: ["Argent", "Bleu nuit", "Gris sideral"], active: 0 },
        ];
    }

    if (category.includes("electronique") || category.includes("électronique")) {
        return [
            { label: "Version", values: ["Standard", "Premium", "Pack complet"], active: 1 },
            { label: "Couleur", values: ["Noir", "Argent", "Bleu"], active: 0 },
        ];
    }

    if (category.includes("mode")) {
        return [
            { label: "Taille", values: ["S", "M", "L"], active: 1 },
            { label: "Finition", values: ["Noir", "Blanc", "Edition speciale"], active: 0 },
        ];
    }

    if (category.includes("maison")) {
        return [
            { label: "Format", values: ["Compact", "Standard", "XL"], active: 1 },
            { label: "Couleur", values: ["Beige", "Gris", "Noir"], active: 0 },
        ];
    }

    return [
        { label: "Option", values: ["Essentiel", "Confort", "Premium"], active: 1 },
        { label: "Etat", values: ["Neuf", "Comme neuf", "Occasion"], active: 0 },
    ];
}

function getSpecs(product: Product) {
    return [
        { label: "Categorie", value: product.category },
        { label: "Etat", value: getConditionLabel(product.condition) },
        { label: "Vendeur", value: product.sellerName },
        { label: "Note vendeur", value: `${product.sellerRating}/5` },
        { label: "Avis", value: `${product.reviewCount.toLocaleString("fr-FR")} evaluations` },
        { label: "Reference", value: product.id.toUpperCase() },
    ];
}

function getHighlights(product: Product) {
    return [
        `${getConditionLabel(product.condition)} verifie avant mise en ligne`,
        `Livraison rapide disponible a Abidjan et en interieur`,
        `Paiement securise et assistance AbidjanAnnonce`,
        `${product.reviewCount.toLocaleString("fr-FR")} acheteurs ont consulte cette annonce`,
    ];
}

function getReviewSnippets(product: Product) {
    return [
        {
            author: "Aminata K.",
            text: `Produit conforme a l'annonce. ${product.description}`,
        },
        {
            author: "Yao M.",
            text: "Echange fluide avec le vendeur et expedition rapide.",
        },
        {
            author: "Clarisse N.",
            text: "Tres bon rapport qualite-prix et emballage soigne.",
        },
    ];
}

function getGallery(product: Product, similarProducts: Product[]) {
    const images = [product.imageUrl, ...similarProducts.map((item) => item.imageUrl)];
    while (images.length < 5) {
        images.push(product.imageUrl);
    }
    return images.slice(0, 5);
}

function RatingStars({ rating }: { rating: number }) {
    return (
        <div className="detail-rating-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => {
                const filled = rating >= index + 1 || rating > index + 0.4;
                return (
                    <svg
                        key={index}
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill={filled ? "#f5af02" : "#d8d8de"}
                    >
                        <path d="M12 2.2l2.85 5.77 6.37.93-4.61 4.49 1.09 6.35L12 16.73l-5.7 3.01 1.09-6.35L2.78 8.9l6.37-.93L12 2.2z" />
                    </svg>
                );
            })}
        </div>
    );
}

export default function ProductDetailPage({
    product,
    similarProducts,
}: {
    product: Product;
    similarProducts: Product[];
}) {
    const gallery = getGallery(product, similarProducts);
    const router = useRouter();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<DetailTab>("about");
    const [quantity, setQuantity] = useState(1);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const liked = isFavorite(product.id);

    const handleFavorite = () => {
        const needsLogin = toggleFavorite(product.id);
        if (needsLogin) {
            router.push("/connexion");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product.id]);

    const optionGroups = getOptionGroups(product);
    const specs = getSpecs(product);
    const highlights = getHighlights(product);
    const reviews = getReviewSnippets(product);
    const stockCount = Math.max(12, Math.min(120, Math.round(product.reviewCount / 8)));

    return (
        <div className="product-detail-page container">
            <nav className="product-breadcrumb" aria-label="Fil d'ariane">
                <Link href="/">Accueil</Link>
                <span>/</span>
                <Link href="/annonces">{product.category}</Link>
                <span>/</span>
                <span>{product.title}</span>
            </nav>

            <div className="product-detail-shell">
                <section className="product-gallery-panel">
                    <div className="detail-image-stage">
                        <div className="detail-image-tools">
                            <button aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"} onClick={handleFavorite} style={liked ? { color: "#e53935" } : {}}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                            <button aria-label="Partager">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <path d="M8.59 13.51 15.42 17.49M15.41 6.51 8.59 10.49" />
                                </svg>
                            </button>
                        </div>

                        <img src={gallery[selectedIndex]} alt={product.title} className="detail-main-image" />
                    </div>

                    <div className="detail-thumbnails">
                        {gallery.map((image, index) => (
                            <button
                                key={`${image}-${index}`}
                                className={`detail-thumb ${selectedIndex === index ? "detail-thumb-active" : ""}`}
                                onClick={() => setSelectedIndex(index)}
                                aria-label={`Voir l'image ${index + 1}`}
                            >
                                <img src={image} alt="" />
                            </button>
                        ))}
                    </div>
                </section>

                <aside className="product-purchase-column">
                    <div className="product-purchase-card">
                        <div className="product-kicker-row">
                            <span className="product-category-pill">{product.category}</span>
                        </div>

                        <h1 className="product-title">{product.title}</h1>

                        <div className="detail-price-row">
                            <span className="detail-current-price">{formatPrice(product.price)}</span>
                        </div>

                        <div className="detail-meta-block">
                            <div className="detail-rating-row">
                                <RatingStars rating={product.rating} />
                                <span className="detail-rating-number">{product.rating.toFixed(1)}</span>
                                <span className="detail-rating-count">({product.reviewCount.toLocaleString("fr-FR")} avis)</span>
                            </div>
                            <div className="detail-views-row">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                <span>{Math.max(25, Math.round(product.reviewCount / 3))} personnes consultent cette annonce</span>
                            </div>
                        </div>

                        <div className="detail-stock-row">
                            <strong>{stockCount} articles disponibles</strong>
                            <div className="detail-qty-stepper" aria-label="Quantite">
                                <button
                                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                    aria-label="Diminuer la quantite"
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() => setQuantity((current) => current + 1)}
                                    aria-label="Augmenter la quantite"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="detail-cta-stack">
                            <button className="detail-primary-cta" onClick={() => setShowContactModal(true)}>Contacter le vendeur</button>
                            <button className="detail-secondary-cta">Ajouter au panier</button>
                        </div>
                    </div>

                    <h2 className="seller-card-title">Information du vendeur</h2>
                    <div className="product-seller-card">
                        <div className="seller-info-row">
                            <div className="seller-avatar">{product.sellerName.slice(0, 1)}</div>
                            <div className="seller-meta">
                                <div className="seller-name-badge">
                                    <strong>{product.sellerName}</strong>
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.63 13.43 1.75 12 1.75s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z" fill="#2e7d32" />
                                        <path d="M9 12l2 2 4-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="seller-verified-badge">{`Vendeur v\u00e9rifi\u00e9`}</span>
                                </div>
                                <span>{product.sellerRating.toFixed(1)}/5</span>
                            </div>
                        </div>
                        <div className="seller-actions">
                            <Link href={`/vendeur/${product.sellerId}`} className="seller-profile-btn">Voir le profil du vendeur</Link>
                        </div>
                    </div>
                </aside>
            </div>

            {showContactModal && (
                <div className="modal-backdrop fadeIn" onClick={() => setShowContactModal(false)}>
                    <div className="modal-content scaleIn" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowContactModal(false)}>&times;</button>
                        <div className="modal-header">
                            <h2>Contacter {product.sellerName}</h2>
                            <p className="modal-subtitle">A propos de : <strong>{product.title}</strong></p>
                        </div>
                        <div className="contact-options">
                            <div className="contact-option" onClick={() => setShowPhone(!showPhone)} style={{ cursor: "pointer" }}>
                                <div className="contact-option-icon contact-option-phone">
                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="contact-option-text">
                                    <strong>Téléphone</strong>
                                    {showPhone ? (
                                        <a href="tel:+2250700000000" className="contact-phone-revealed" onClick={(e) => e.stopPropagation()}>+225 07 00 00 00 00</a>
                                    ) : (
                                        <span>+225 07 XX XX XX XX — Cliquez pour afficher</span>
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

            <section className="product-info-layout">
                <div className="product-tabs-card">
                    <div className="product-tabs">
                        <button
                            className={activeTab === "about" ? "product-tab-active" : ""}
                            onClick={() => setActiveTab("about")}
                        >
                            A propos
                        </button>
                        <button
                            className={activeTab === "specs" ? "product-tab-active" : ""}
                            onClick={() => setActiveTab("specs")}
                        >
                            Specs
                        </button>
                        <button
                            className={activeTab === "reviews" ? "product-tab-active" : ""}
                            onClick={() => setActiveTab("reviews")}
                        >
                            Avis
                        </button>
                        <button
                            className={activeTab === "delivery" ? "product-tab-active" : ""}
                            onClick={() => setActiveTab("delivery")}
                        >
                            Livraison
                        </button>
                    </div>

                    {activeTab === "about" && (
                        <div className="product-tab-panel">
                            <h2>A propos de ce produit</h2>
                            <p>{product.description}</p>
                            <ul className="product-bullet-list">
                                {highlights.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === "specs" && (
                        <div className="product-tab-panel">
                            <h2>Caracteristiques</h2>
                            <div className="product-spec-grid">
                                {specs.map((item) => (
                                    <div key={item.label} className="product-spec-item">
                                        <span>{item.label}</span>
                                        <strong>{item.value}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div className="product-tab-panel">
                            <h2>Avis clients</h2>
                            <div className="product-review-list">
                                {reviews.map((review) => (
                                    <article key={review.author} className="product-review-card">
                                        <div>
                                            <strong>{review.author}</strong>
                                            <div className="detail-rating-row">
                                                <RatingStars rating={product.rating} />
                                            </div>
                                        </div>
                                        <p>{review.text}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "delivery" && (
                        <div className="product-tab-panel">
                            <h2>Livraison et garanties</h2>
                            <ul className="product-bullet-list">
                                <li>Retrait disponible sous 24h selon le vendeur.</li>
                                <li>Livraison express a Abidjan et expedition nationale sur demande.</li>
                                <li>Paiement securise et suivi de commande sur AbidjanAnnonce.</li>
                                <li>Retour sous 7 jours si le produit ne correspond pas a l&apos;annonce.</li>
                            </ul>
                        </div>
                    )}

                    <div className="partner-note">
                        <strong>Information produit fournie par nos partenaires</strong>
                        <span>Nous faisons notre maximum pour garantir l&apos;exactitude des annonces.</span>
                    </div>
                </div>
            </section>

            {similarProducts.length > 0 && (
                <section className="similar-products-section">
                    <div className="similar-products-header">
                        <h2>Articles similaires</h2>
                    </div>
                    <div className="similar-products-row">
                        {similarProducts.map((item) => (
                            <div key={item.id} className="similar-product-item">
                                <ProductCard product={item} showBadge={false} />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
