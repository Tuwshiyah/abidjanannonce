"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { CategoryIcons } from "@/components/CategoryIcons";
import { ALL_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import "./categorie.css";
import "@/app/annonces/annonces.css";

const CONDITIONS = [
    { value: "all", label: "Tous les états" },
    { value: "Brand New", label: "Neuf" },
    { value: "Like New", label: "Comme neuf" },
    { value: "Used", label: "Occasion" },
];

export default function CategorieContent({ slug }: { slug: string }) {
    const [activeSubcat, setActiveSubcat] = useState<string | null>(null);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(2000000);
    const [sortBy, setSortBy] = useState("recent");
    const [conditionFilter, setConditionFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        subcats: true, sort: false, price: false, condition: false
    });
    const perPage = 12;

    const category = CATEGORIES.find((c) => c.value === slug);

    if (!category) {
        return (
            <div className="catpage-not-found">
                <h1>Catégorie introuvable</h1>
                <p>La catégorie demandée n&apos;existe pas.</p>
                <Link href="/categories" className="catpage-back-btn">Voir toutes les catégories</Link>
            </div>
        );
    }

    const toggleSection = (key: string) => {
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Filter products matching this category
    const categoryProducts = ALL_PRODUCTS.filter((p) => {
        const catName = category.name.toLowerCase();
        const pCat = p.category.toLowerCase();
        return pCat.includes(catName.split(" ")[0].replace("é", "e").replace("è", "e")) ||
            catName.includes(pCat.split(" ")[0].replace("é", "e").replace("è", "e"));
    });

    const filteredProducts = useMemo(() => {
        let products = [...categoryProducts];

        products = products.filter(p => p.price >= priceMin && p.price <= priceMax);

        if (conditionFilter !== "all") {
            products = products.filter(p => p.condition === conditionFilter);
        }

        switch (sortBy) {
            case "price-asc": products.sort((a, b) => a.price - b.price); break;
            case "price-desc": products.sort((a, b) => b.price - a.price); break;
            case "rating": products.sort((a, b) => b.rating - a.rating); break;
        }

        return products;
    }, [categoryProducts, priceMin, priceMax, sortBy, conditionFilter]);

    const totalPages = Math.ceil(filteredProducts.length / perPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

    const hasActiveFilters = priceMin > 0 || priceMax < 2000000 || conditionFilter !== "all" || sortBy !== "recent" || activeSubcat !== null;

    const resetAll = () => {
        setActiveSubcat(null);
        setPriceMin(0);
        setPriceMax(2000000);
        setConditionFilter("all");
        setSortBy("recent");
        setCurrentPage(1);
    };

    return (
        <div className="catpage-wrapper">
        <div className="catpage">
            {/* Breadcrumb */}
            <nav className="catpage-breadcrumb">
                <Link href="/">Accueil</Link>
                <span>/</span>
                <Link href="/categories">Catégories</Link>
                <span>/</span>
                <span className="catpage-breadcrumb-current">{category.name}</span>
            </nav>

            {/* Hero */}
            <div className="catpage-hero">
                <div className="catpage-hero-icon" style={{ background: `${category.color}14`, color: category.color }}>
                    {CategoryIcons[category.iconKey]}
                </div>
                <div className="catpage-hero-info">
                    <h1>{category.name}</h1>
                    <p>{category.description}</p>
                    <div className="catpage-hero-stats">
                        <span className="catpage-hero-stat">
                            <strong>{filteredProducts.length}</strong> annonce{filteredProducts.length !== 1 ? "s" : ""}
                        </span>
                        <span className="catpage-hero-stat-sep">·</span>
                        <span className="catpage-hero-stat">
                            <strong>{category.subcategories.length}</strong> sous-catégories
                        </span>
                    </div>
                </div>
            </div>

            {/* Layout with sidebar */}
            <div className="catpage-layout">
                {/* Sidebar Filters */}
                <aside className="annonces-sidebar">
                    {/* Subcategories */}
                    <div className="sf-block">
                        <button className="sf-title-toggle" onClick={() => toggleSection("subcats")}>
                            <span className="sf-title-left">
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                                Sous-catégories
                            </span>
                            <svg className={`sf-chevron ${openSections.subcats ? "sf-chevron-open" : ""}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                        {openSections.subcats && (
                            <div className="sf-body">
                                <ul className="sf-list">
                                    <li>
                                        <button
                                            className={`sf-list-btn ${!activeSubcat ? "active" : ""}`}
                                            onClick={() => { setActiveSubcat(null); setCurrentPage(1); }}
                                        >
                                            <span>Tout voir</span>
                                            <span className="sf-count">{categoryProducts.length}</span>
                                        </button>
                                    </li>
                                    {category.subcategories.map((sub) => (
                                        <li key={sub}>
                                            <button
                                                className={`sf-list-btn ${activeSubcat === sub ? "active" : ""}`}
                                                onClick={() => { setActiveSubcat(activeSubcat === sub ? null : sub); setCurrentPage(1); }}
                                            >
                                                <span>{sub}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

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
                                    {[
                                        { value: "recent", label: "Plus récent" },
                                        { value: "price-asc", label: "Prix croissant" },
                                        { value: "price-desc", label: "Prix décroissant" },
                                        { value: "rating", label: "Meilleures notes" },
                                    ].map((opt) => (
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

                    {/* Price Range */}
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
                                        <span>{priceMin.toLocaleString("fr-FR")} FCFA</span>
                                        <span>{priceMax.toLocaleString("fr-FR")} FCFA</span>
                                    </div>
                                    <div className="sf-range-track">
                                        <div
                                            className="sf-range-fill"
                                            style={{
                                                left: `${(priceMin / 2000000) * 100}%`,
                                                right: `${100 - (priceMax / 2000000) * 100}%`,
                                            }}
                                        />
                                        <input type="range" min="0" max="2000000" step="10000" value={priceMin}
                                            onChange={(e) => { const val = Number(e.target.value); if (val <= priceMax - 10000) { setPriceMin(val); setCurrentPage(1); } }}
                                            className="sf-range-input" />
                                        <input type="range" min="0" max="2000000" step="10000" value={priceMax}
                                            onChange={(e) => { const val = Number(e.target.value); if (val >= priceMin + 10000) { setPriceMax(val); setCurrentPage(1); } }}
                                            className="sf-range-input" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Condition */}
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
                                    {CONDITIONS.map((cond) => (
                                        <li key={cond.value}>
                                            <button
                                                className={`sf-list-btn ${conditionFilter === cond.value ? "active" : ""}`}
                                                onClick={() => { setConditionFilter(cond.value); setCurrentPage(1); }}
                                            >
                                                <span>{cond.label}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Reset */}
                    {hasActiveFilters && (
                        <button className="sf-reset-btn" onClick={resetAll}>
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Réinitialiser les filtres
                        </button>
                    )}
                </aside>

                {/* Main Content */}
                <main className="catpage-main">
                    <div className="catpage-toolbar">
                        <span className="catpage-result-count">
                            <strong>{filteredProducts.length}</strong> résultat{filteredProducts.length !== 1 ? "s" : ""}
                            {activeSubcat && <> dans <strong>{activeSubcat}</strong></>}
                        </span>
                    </div>

                    {paginatedProducts.length > 0 ? (
                        <div className="catpage-grid">
                            {paginatedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} showBadge={false} />
                            ))}
                        </div>
                    ) : (
                        <div className="catpage-empty">
                            <div className="catpage-empty-icon" style={{ color: category.color }}>
                                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </div>
                            <h3>Aucune annonce pour le moment</h3>
                            <p>Soyez le premier à publier dans cette catégorie !</p>
                            <Link href="/vendre" className="catpage-publish-btn" style={{ background: category.color }}>
                                Publier une annonce
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button className="page-btn arrow" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button key={page} className={`page-btn ${currentPage === page ? "active" : ""}`} onClick={() => setCurrentPage(page)}>
                                    {page < 10 ? `0${page}` : page}
                                </button>
                            ))}
                            <button className="page-btn arrow" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 6 15 12 9 18"/></svg>
                            </button>
                        </div>
                    )}
                </main>
            </div>

            {/* Other Categories */}
            <div className="catpage-other">
                <h2>Autres catégories</h2>
                <div className="catpage-other-grid">
                    {CATEGORIES.filter((c) => c.value !== slug).slice(0, 6).map((cat) => (
                        <Link key={cat.value} href={`/categorie/${cat.value}`} className="catpage-other-card">
                            <div className="catpage-other-icon" style={{ background: `${cat.color}14`, color: cat.color }}>
                                {CategoryIcons[cat.iconKey]}
                            </div>
                            <div>
                                <span className="catpage-other-name">{cat.name}</span>
                                <span className="catpage-other-count">{cat.subcategories.length} sous-cat.</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}
