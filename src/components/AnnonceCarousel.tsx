"use client";

import { useRef } from "react";
import { Product } from "@/lib/data";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function AnnonceCarousel({ products }: { products: Product[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 260;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="featured-section">
            <div className="featured-bg-accent" />
            <div className="featured-inner">
                <div className="featured-header">
                    <div className="featured-header-left">
                        <div className="featured-badge-row">
                            <span className="featured-fire-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22c-4.97 0-9-3.58-9-8 0-4 2.5-6.5 5-9 .5 3 2.5 5 5 6 0-3 1.5-6 4-8 1 2 2.5 5 2.5 8 .3 1.5.5 3 .5 3 0 4.42-3.58 8-8 8z" />
                                </svg>
                            </span>
                            <h2>Annonces à la une</h2>
                        </div>
                        <p className="featured-subtitle">Annonces sponsorisées avec une visibilité maximale</p>
                    </div>
                    <div className="featured-header-right">
                        <Link href="/forfaits" className="featured-boost-link">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                            Booster mon annonce
                        </Link>
                        <div className="scroll-arrows">
                            <button
                                className="scroll-arrow featured-arrow"
                                onClick={() => scroll("left")}
                                aria-label="Défiler vers la gauche"
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button
                                className="scroll-arrow featured-arrow"
                                onClick={() => scroll("right")}
                                aria-label="Défiler vers la droite"
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="product-scroll featured-scroll" ref={scrollRef}>
                    {products.map((product) => (
                        <div key={product.id} className="featured-card-wrapper">
                            <ProductCard product={product} badgeType="premium" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
