"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS, LATEST_PRODUCTS, Product } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import "./annonces.css";

const ALL_PRODUCTS: Product[] = [...MOCK_PRODUCTS, ...LATEST_PRODUCTS];

const CATEGORIES = [
    { name: "Toutes", count: ALL_PRODUCTS.length },
    { name: "Électronique", count: ALL_PRODUCTS.filter(p => p.category === "Électronique").length },
    { name: "Informatique", count: ALL_PRODUCTS.filter(p => p.category === "Informatique").length },
    { name: "Mode & Beauté", count: ALL_PRODUCTS.filter(p => p.category === "Mode & Beauté").length },
    { name: "Maison & Jardin", count: ALL_PRODUCTS.filter(p => p.category === "Maison & Jardin").length },
    { name: "Véhicules", count: ALL_PRODUCTS.filter(p => p.category === "Véhicules").length },
];

const POPULAR_TAGS = [
    "iPhone", "MacBook", "Samsung", "Nike", "Sony", "PS5",
    "Apple Watch", "Drone", "TV", "Canapé", "Vélo", "Rolex"
];

const CONDITIONS = [
    { value: "all", label: "Tous les états" },
    { value: "Brand New", label: "Neuf" },
    { value: "Like New", label: "Comme neuf" },
    { value: "Used", label: "Occasion" },
];

function AnnoncesContent() {
    const searchParams = useSearchParams();
    const qParam = searchParams.get("q") || "";
    const catParam = searchParams.get("cat") || "";

    const [selectedCategory, setSelectedCategory] = useState(catParam || "Toutes");
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(2000000);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState(qParam);
    const [sortBy, setSortBy] = useState("recent");
    const [conditionFilter, setConditionFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        categories: true, sort: true, price: true, condition: true, tags: true
    });
    const perPage = 12;

    // Sync with URL params on mount
    useEffect(() => {
        if (qParam) setSearchQuery(qParam);
        if (catParam) setSelectedCategory(catParam);
    }, [qParam, catParam]);

    const toggleSection = (key: string) => {
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const filteredProducts = useMemo(() => {
        let products = [...ALL_PRODUCTS];

        if (selectedCategory !== "Toutes") {
            products = products.filter(p => p.category === selectedCategory);
        }

        products = products.filter(p => p.price >= priceMin && p.price <= priceMax);

        if (selectedTags.length > 0) {
            products = products.filter(p =>
                selectedTags.some(tag => p.title.toLowerCase().includes(tag.toLowerCase()))
            );
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            products = products.filter(p =>
                p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
            );
        }

        if (conditionFilter !== "all") {
            products = products.filter(p => p.condition === conditionFilter);
        }

        switch (sortBy) {
            case "price-asc":
                products.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                products.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                products.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        return products;
    }, [selectedCategory, priceMin, priceMax, selectedTags, searchQuery, sortBy, conditionFilter]);

    const totalPages = Math.ceil(filteredProducts.length / perPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
        setCurrentPage(1);
    };

    const removeFilter = (type: string) => {
        if (type === "category") setSelectedCategory("Toutes");
        else if (type === "price") { setPriceMin(0); setPriceMax(2000000); }
        else if (type === "condition") setConditionFilter("all");
        else setSelectedTags(prev => prev.filter(t => t !== type));
        setCurrentPage(1);
    };

    const hasActiveFilters = selectedCategory !== "Toutes" || priceMin > 0 || priceMax < 2000000 || selectedTags.length > 0 || conditionFilter !== "all" || sortBy !== "recent";

    const resetAll = () => {
        setSelectedCategory("Toutes");
        setPriceMin(0);
        setPriceMax(2000000);
        setSelectedTags([]);
        setConditionFilter("all");
        setSortBy("recent");
        setSearchQuery("");
        setCurrentPage(1);
    };

    const activeFilters: { label: string; type: string }[] = [];
    if (selectedCategory !== "Toutes") activeFilters.push({ label: selectedCategory, type: "category" });
    if (priceMin > 0 || priceMax < 2000000) activeFilters.push({ label: `${priceMin.toLocaleString("fr-FR")} - ${priceMax.toLocaleString("fr-FR")} FCFA`, type: "price" });
    if (conditionFilter !== "all") activeFilters.push({ label: CONDITIONS.find(c => c.value === conditionFilter)?.label || "", type: "condition" });
    selectedTags.forEach(tag => activeFilters.push({ label: tag, type: tag }));

    return (
        <div className="annonces-page">
            <nav className="breadcrumb">
                <Link href="/">Accueil</Link>
                <span className="separator">›</span>
                <span className="current">Toutes les annonces</span>
            </nav>

            <div className="annonces-layout">
                {/* Sidebar */}
                <aside className="annonces-sidebar">
                    {/* Search */}
                    <div className="sf-block sf-block-search">
                        <div className="sf-search">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            <input
                                type="text"
                                placeholder="Rechercher une annonce..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            />
                        </div>
                    </div>

                    {/* Categories */}
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
                                    {CATEGORIES.map((cat) => (
                                        <li key={cat.name}>
                                            <button
                                                className={`sf-list-btn ${selectedCategory === cat.name ? "active" : ""}`}
                                                onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
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
                                        <input
                                            type="range"
                                            min="0"
                                            max="2000000"
                                            step="10000"
                                            value={priceMin}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                if (val <= priceMax - 10000) { setPriceMin(val); setCurrentPage(1); }
                                            }}
                                            className="sf-range-input"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="2000000"
                                            step="10000"
                                            value={priceMax}
                                            onChange={(e) => {
                                                const val = Number(e.target.value);
                                                if (val >= priceMin + 10000) { setPriceMax(val); setCurrentPage(1); }
                                            }}
                                            className="sf-range-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="sf-block">
                        <button className="sf-title-toggle" onClick={() => toggleSection("tags")}>
                            <span className="sf-title-left">
                                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                                Tags populaires
                            </span>
                            <svg className={`sf-chevron ${openSections.tags ? "sf-chevron-open" : ""}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </button>
                        {openSections.tags && (
                            <div className="sf-body">
                                <div className="sf-tags">
                                    {POPULAR_TAGS.map((tag) => (
                                        <button
                                            key={tag}
                                            className={`sf-tag ${selectedTags.includes(tag) ? "active" : ""}`}
                                            onClick={() => toggleTag(tag)}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
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
                <main className="annonces-main">
                    {/* Results bar */}
                    <div className="results-bar">
                        <span className="results-count">
                            <strong>{filteredProducts.length}</strong> annonces trouvées
                        </span>
                        {activeFilters.length > 0 && (
                            <div className="active-filters">
                                {activeFilters.map((f) => (
                                    <button key={f.label} className="active-filter" onClick={() => removeFilter(f.type)}>
                                        {f.label}
                                        <span className="remove">×</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Grid */}
                    <div className="annonces-grid">
                        {paginatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} showBadge={false} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="page-btn arrow"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`page-btn ${currentPage === page ? "active" : ""}`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page < 10 ? `0${page}` : page}
                                </button>
                            ))}
                            <button
                                className="page-btn arrow"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function AnnoncesPage() {
    return (
        <Suspense fallback={<div style={{ padding: "60px", textAlign: "center" }}>Chargement...</div>}>
            <AnnoncesContent />
        </Suspense>
    );
}
