"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data";
import ContactSellerModal from "@/components/ContactSellerModal";
import "./product-detail.css";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // We use React.use() to unwrap params per Next.js 15 app router best practices if needed, 
    // but simpler to just unwrap normally.
    const resolvedParams = use(params);
    const product = getProductById(resolvedParams.id);

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!product) {
        notFound();
    }

    return (
        <div className="product-page container animate-fade-in">
            <div className="product-layout">

                {/* Gallery Column */}
                <div className="product-gallery">
                    <div className="main-image-container glass-panel">
                        <img src={product.imageUrl} alt={product.title} className="main-image" />
                    </div>
                </div>

                {/* Info Column */}
                <div className="product-info">
                    <div className="breadcrumb">
                        High-Tech / Appareils photo et caméscopes / Appareils numériques
                    </div>

                    <h1 className="product-title">{product.title}</h1>

                    <div className="product-meta">
                        <span className="condition-tag">{product.condition}</span>
                        <div className="seller-badge">
                            <span className="seller-name">{product.sellerName}</span>
                            <span className="seller-rating">★ {product.sellerRating}</span>
                        </div>
                    </div>

                    <div className="price-section">
                        <span className="price-label">Prix demandé</span>
                        <div className="price-display">
                            {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                        </div>
                        <p className="price-note">Aucun frais caché. Transaction directe avec le vendeur.</p>
                    </div>

                    <div className="action-section">
                        <button className="contact-seller-btn" onClick={() => setIsModalOpen(true)}>
                            Contacter le vendeur
                        </button>
                        <button className="save-item-btn">
                            ♡ Ajouter à la liste d&apos;affaires à suivre
                        </button>
                    </div>

                    <div className="description-section">
                        <h2>À propos de cet objet</h2>
                        <p className="description-text">{product.description}</p>
                    </div>

                    <div className="trust-signals">
                        <div className="trust-item">
                            <span className="trust-icon">🛡️</span>
                            <div>
                                <strong>Vérifiez avant d&apos;acheter</strong>
                                <p>Nous vous recommandons de vérifier le produit en personne ou par appel vidéo avant de finaliser la transaction.</p>
                            </div>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">💬</span>
                            <div>
                                <strong>Messagerie sécurisée</strong>
                                <p>Vos coordonnées restent privées. Les messages sont envoyés de manière sécurisée directement au vendeur.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <ContactSellerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                sellerName={product.sellerName}
                productTitle={product.title}
            />
        </div>
    );
}
