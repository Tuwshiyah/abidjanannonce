"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
    {
        badge: "N°1 des annonces en Côte d'Ivoire",
        title: "Achetez et vendez",
        subtitle: "près de chez vous",
        description: "Des milliers d'annonces : véhicules, immobilier, électronique, emplois et bien plus.",
        btn: { label: "Parcourir les annonces", href: "/annonces" },
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
    },
    {
        badge: "Vendez en toute simplicité",
        title: "Publiez votre annonce",
        subtitle: "en 2 minutes",
        description: "Créez votre annonce gratuitement et touchez des milliers d'acheteurs en Côte d'Ivoire.",
        btn: { label: "Publier une annonce", href: "/vendre" },
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&auto=format&fit=crop",
    },
    {
        badge: "Boostez vos ventes",
        title: "Devenez vendeur",
        subtitle: "professionnel",
        description: "Badge vérifié, statistiques avancées et visibilité maximale pour vos annonces.",
        btn: { label: "Découvrir les forfaits", href: "/forfaits" },
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goTo = useCallback((index: number) => {
        if (isAnimating || index === current) return;
        setIsAnimating(true);
        setCurrent(index);
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating, current]);

    const next = useCallback(() => {
        goTo((current + 1) % SLIDES.length);
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + SLIDES.length) % SLIDES.length);
    }, [current, goTo]);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        const handleVisibility = () => {
            if (document.hidden) {
                clearInterval(timer);
            } else {
                timer = setInterval(next, 6000);
            }
        };
        timer = setInterval(next, 6000);
        document.addEventListener("visibilitychange", handleVisibility);
        return () => {
            clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [next]);

    return (
        <section className="hero-grid">
            {/* LEFT — Main Slider */}
            <div className="hero-grid-left">
                {SLIDES.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-grid-slide ${index === current ? "hero-grid-slide-active" : ""}`}
                    >
                        <div className="hero-grid-slide-text">
                            <span className="hero-grid-badge">{slide.badge}</span>
                            <h1>
                                {slide.title}<br />
                                <span className="hero-grid-accent">{slide.subtitle}</span>
                            </h1>
                            <p>{slide.description}</p>
                            <Link href={slide.btn.href} className="hero-grid-btn">
                                {slide.btn.label}
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>
                        <div className="hero-grid-slide-img">
                            <Image src={slide.image} alt="" width={600} height={400} loading={index === 0 ? "eager" : "lazy"} sizes="300px" />
                        </div>
                    </div>
                ))}

                {/* Controls */}
                <div className="hero-grid-controls">
                    <button className="hero-grid-arrow" onClick={prev} aria-label="Précédent">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 5 5 12 12 19" />
                        </svg>
                    </button>
                    <div className="hero-grid-dots">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                className={`hero-grid-dot ${i === current ? "active" : ""}`}
                                onClick={() => goTo(i)}
                                aria-label={`Slide ${i + 1}`}
                            >
                                {i === current && <span className="hero-grid-dot-fill" />}
                            </button>
                        ))}
                    </div>
                    <button className="hero-grid-arrow" onClick={next} aria-label="Suivant">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* RIGHT — Two stacked cards */}
            <div className="hero-grid-right">
                {/* Top card — dark promo */}
                <Link href="/forfaits" className="hero-grid-card hero-grid-card-dark">
                    <div className="hero-grid-card-content">
                        <span className="hero-grid-pro-badge">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            PRO
                        </span>
                        <h3>Vendeur PRO</h3>
                        <p>Boostez vos ventes avec une visibilité x5</p>
                        <span className="hero-grid-card-link">
                            Découvrir
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <polyline points="9 6 15 12 9 18" />
                            </svg>
                        </span>
                    </div>
                    <div className="hero-grid-card-img">
                        <Image src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=400&auto=format&fit=crop" alt="" width={400} height={300} loading="lazy" sizes="140px" />
                    </div>
                </Link>

                {/* Bottom card — light promo */}
                <Link href="/vendre" className="hero-grid-card hero-grid-card-light">
                    <div className="hero-grid-card-content">
                        <h3>Publiez gratuitement</h3>
                        <p>Vendez vos articles en quelques clics</p>
                        <span className="hero-grid-card-link hero-grid-card-link-orange">
                            Publier maintenant
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <polyline points="9 6 15 12 9 18" />
                            </svg>
                        </span>
                    </div>
                    <div className="hero-grid-card-img">
                        <Image src="https://images.unsplash.com/photo-1556740758-90de940a6439?q=80&w=400&auto=format&fit=crop" alt="" width={400} height={300} loading="lazy" sizes="140px" />
                    </div>
                </Link>
            </div>
        </section>
    );
}
