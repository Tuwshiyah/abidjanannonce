"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "@/lib/data";
import { useFavorites } from "@/lib/favorites";
import "./product-card.css";

function StarRating({ rating, count }: { rating: number; count: number }) {
    const fullStars = Math.floor(rating);
    const partial = rating - fullStars;
    const hasHalf = partial >= 0.25 && partial < 0.75;
    const extraFull = partial >= 0.75 ? 1 : 0;
    const totalFull = fullStars + extraFull;
    const emptyStars = 5 - totalFull - (hasHalf ? 1 : 0);
    const gradId = `halfGrad-${count}-${rating}`;

    const starPath = "M12 1.5c.4 0 .78.22.97.57l2.6 4.9 5.48.93c.39.07.71.33.84.7.13.36.05.77-.22 1.04l-3.9 3.98.85 5.44c.06.39-.09.78-.4 1.02-.31.24-.72.28-1.07.1L12 17.27l-4.95 2.72c-.35.19-.76.15-1.07-.1a1.12 1.12 0 0 1-.4-1.02l.85-5.44-3.9-3.98a1.12 1.12 0 0 1-.22-1.04c.13-.37.45-.63.84-.7l5.49-.93 2.59-4.9A1.1 1.1 0 0 1 12 1.5z";

    return (
        <div className="star-rating">
            {[...Array(totalFull)].map((_, i) => (
                <svg key={`full-${i}`} viewBox="0 0 24 24" width="16" height="16" fill="#2d2d2d" stroke="none">
                    <path d={starPath} />
                </svg>
            ))}
            {hasHalf && (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="none">
                    <defs>
                        <linearGradient id={gradId}>
                            <stop offset="50%" stopColor="#2d2d2d" />
                            <stop offset="50%" stopColor="#d9d9d9" />
                        </linearGradient>
                    </defs>
                    <path d={starPath} fill={`url(#${gradId})`} />
                </svg>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <svg key={`empty-${i}`} viewBox="0 0 24 24" width="16" height="16" fill="#d9d9d9" stroke="none">
                    <path d={starPath} />
                </svg>
            ))}
            <span className="rating-value">{rating}</span>
            <span className="review-count">({count})</span>
        </div>
    );
}


export default function ProductCard({ product, badgeType = "premium", showBadge = true }: { product: Product; badgeType?: "premium" | "boosted"; showBadge?: boolean }) {
    const oldPrice = product.price * 1.35;
    const router = useRouter();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [showToast, setShowToast] = useState(false);
    const liked = isFavorite(product.id);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const needsLogin = toggleFavorite(product.id);
        if (needsLogin) {
            router.push("/connexion");
            return;
        }
        if (!liked) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
    };

    return (
        <div className="product-card">
            <div className="card-image-container">
                <button
                    className={`heart-button ${liked ? "heart-active" : ""}`}
                    aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
                    onClick={handleLike}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill={liked ? "currentColor" : "none"}>
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                {showToast && (
                    <div className="card-toast">Ajouté aux favoris</div>
                )}
                <Link href={`/product/${product.id}`} className="card-image-link">
                    <img src={product.imageUrl} alt={product.title} className="card-image" />
                </Link>
            </div>

            <div className="card-tags">
                {showBadge && (
                    <span className={`card-tag ${badgeType === "boosted" ? "tag-boosted" : "tag-brand"}`}>
                        {badgeType === "boosted" ? "Boosté" : "Premium"}
                    </span>
                )}
                {product.isProSeller && (
                    <span className="card-tag tag-pro">
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        PRO
                    </span>
                )}
                <span className="card-tag tag-category">{product.category} ›</span>
            </div>

            <div className="card-content">
                <Link href={`/product/${product.id}`}>
                    <h3 className="card-title">{product.title}</h3>
                </Link>

                <StarRating rating={product.rating} count={product.reviewCount} />

                <div className="card-price-row">
                    <span className="card-price">{product.price.toLocaleString('fr-FR')} FCFA</span>
                    <span className="card-old-price">{oldPrice.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} FCFA</span>
                </div>
            </div>
        </div>
    );
}
