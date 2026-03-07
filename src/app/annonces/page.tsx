"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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

const PRICE_RANGES = [
    { label: "Tous les prix", min: 0, max: Infinity },
    { label: "Moins de 100 000 FCFA", min: 0, max: 100000 },
    { label: "100 000 à 300 000 FCFA", min: 100000, max: 300000 },
    { label: "300 000 à 500 000 FCFA", min: 300000, max: 500000 },
    { label: "500 000 à 1 000 000 FCFA", min: 500000, max: 1000000 },
    { label: "Plus de 1 000 000 FCFA", min: 1000000, max: Infinity },
];

const POPULAR_TAGS = [
    "iPhone", "MacBook", "Samsung", "Nike", "Sony", "PS5",
    "Apple Watch", "Drone", "TV", "Canapé", "Vélo", "Rolex"
];

export default function AnnoncesPage() {
    const [selectedCategory, setSelectedCategory] = useState("Toutes");
    const [selectedPriceRange, setSelectedPriceRange] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("recent");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 12;

    const filteredProducts = useMemo(() => {
        let products = [...ALL_PRODUCTS];

        // Category filter
        if (selectedCategory !== "Toutes") {
            products = products.filter(p => p.category === selectedCategory);
        }

        // Price range filter
        const range = PRICE_RANGES[selectedPriceRange];
        products = products.filter(p => p.price >= range.min && p.price < range.max);

        // Tag filter
        if (selectedTags.length > 0) {
            products = products.filter(p =>
                selectedTags.some(tag => p.title.toLowerCase().includes(tag.toLowerCase()))
            );
        }

        // Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            products = products.filter(p =>
                p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
            );
        }

        // Sort
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
    }, [selectedCategory, selectedPriceRange, selectedTags, searchQuery, sortBy]);

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
        else if (type === "price") setSelectedPriceRange(0);
        else setSelectedTags(prev => prev.filter(t => t !== type));
        setCurrentPage(1);
    };

    const activeFilters: { label: string; type: string }[] = [];
    if (selectedCategory !== "Toutes") activeFilters.push({ label: selectedCategory, type: "category" });
    if (selectedPriceRange > 0) activeFilters.push({ label: PRICE_RANGES[selectedPriceRange].label, type: "price" });
    selectedTags.forEach(tag => activeFilters.push({ label: tag, type: tag }));

    return (
        <div className="annonces-page">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Link href="/">Accueil</Link>
                <span className="separator">›</span>
                <span className="current">Toutes les annonces</span>
            </nav>

            <div className="annonces-layout">
                {/* Sidebar */}
                <aside className="annonces-sidebar">
                    {/* Category Filter */}
                    <div className="filter-group">
                        <h3>Catégorie</h3>
                        {CATEGORIES.map((cat) => (
                            <label key={cat.name}>
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === cat.name}
                                    onChange={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
                                />
                                {cat.name}
                                <span className="count">{cat.count}</span>
                            </label>
                        ))}
                    </div>

                    {/* Price Range */}
                    <div className="filter-group">
                        <h3>Fourchette de prix</h3>
                        {PRICE_RANGES.map((range, i) => (
                            <label key={range.label}>
                                <input
                                    type="radio"
                                    name="price"
                                    checked={selectedPriceRange === i}
                                    onChange={() => { setSelectedPriceRange(i); setCurrentPage(1); }}
                                />
                                {range.label}
                            </label>
                        ))}
                    </div>

                    {/* Popular Tags */}
                    <div className="filter-group">
                        <h3>Tags populaires</h3>
                        <div className="tag-cloud">
                            {POPULAR_TAGS.map((tag) => (
                                <button
                                    key={tag}
                                    className={`tag-pill ${selectedTags.includes(tag) ? "active" : ""}`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="annonces-main">
                    {/* Top bar */}
                    <div className="annonces-topbar">
                        <div className="search-annonces">
                            <svg className="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Rechercher une annonce..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            />
                        </div>
                        <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="recent">Plus récentes</option>
                            <option value="price-asc">Prix croissant</option>
                            <option value="price-desc">Prix décroissant</option>
                            <option value="rating">Meilleures notes</option>
                        </select>
                    </div>

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
