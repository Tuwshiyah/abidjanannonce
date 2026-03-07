"use client";

import { useRef } from "react";
import { Product } from "@/lib/data";
import ProductCard from "./ProductCard";

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
        <section className="deals-section">
            <div className="deals-header">
                <h2>Annonces à la une</h2>
                <div className="scroll-arrows">
                    <button
                        className="scroll-arrow"
                        onClick={() => scroll("left")}
                        aria-label="Défiler vers la gauche"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        className="scroll-arrow"
                        onClick={() => scroll("right")}
                        aria-label="Défiler vers la droite"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 6 15 12 9 18" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="product-scroll" ref={scrollRef}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
