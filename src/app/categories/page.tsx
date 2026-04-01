"use client";

import { useState } from "react";
import Link from "next/link";
import { CategoryIcons } from "@/components/CategoryIcons";
import { CATEGORIES } from "@/lib/categories";
import "./categories.css";

export default function CategoriesPage() {
    const [search, setSearch] = useState("");

    const filtered = CATEGORIES.filter(cat =>
        cat.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.subcategories.some(sub => sub.toLowerCase().includes(search.toLowerCase()))
    );

    const totalSubs = CATEGORIES.reduce((acc, cat) => acc + cat.subcategories.length, 0);

    return (
        <div className="categories-page">
            {/* Hero */}
            <div className="cat-hero">
                <div className="cat-hero-left">
                    <h1>Toutes nos catégories</h1>
                    <div className="cat-hero-stats">
                        <div className="cat-hero-stat">
                            <span className="cat-hero-stat-number">{CATEGORIES.length}</span>
                            <span className="cat-hero-stat-label">catégories</span>
                        </div>
                        <div className="cat-hero-stat-divider" />
                        <div className="cat-hero-stat">
                            <span className="cat-hero-stat-number">{totalSubs}</span>
                            <span className="cat-hero-stat-label">sous-catégories</span>
                        </div>
                    </div>
                </div>
                <div className="cat-hero-right">
                    <div className="cat-hero-search">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher une catégorie..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button className="cat-search-clear" onClick={() => setSearch("")}>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* No results */}
            {filtered.length === 0 && (
                <div className="cat-no-results">
                    <p>Aucune catégorie trouvée pour &laquo; {search} &raquo;</p>
                    <button onClick={() => setSearch("")}>Effacer la recherche</button>
                </div>
            )}

            {/* Categories Grid */}
            <div className="cat-grid">
                {filtered.map((cat) => {
                    const subsToShow = search
                        ? cat.subcategories.filter(sub => sub.toLowerCase().includes(search.toLowerCase()))
                        : cat.subcategories;

                    return (
                        <div key={cat.value} className="cat-card">
                            {/* Card Header */}
                            <div className="cat-card-header" style={{ borderLeftColor: cat.color }}>
                                <div className="cat-card-icon" style={{ background: `${cat.color}12`, color: cat.color }}>
                                    {CategoryIcons[cat.iconKey]}
                                </div>
                                <div className="cat-card-title-area">
                                    <h2>{cat.name}</h2>
                                    <span className="cat-card-badge" style={{ color: cat.color }}>
                                        {cat.subcategories.length} sous-cat.
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="cat-card-desc">{cat.description}</p>

                            {/* Subcategories */}
                            <ul className="cat-card-subs">
                                {subsToShow.map((sub) => (
                                    <li key={sub}>
                                        <Link href={`/categorie/${cat.value}`}>
                                            <span className="cat-card-sub-dot" style={{ background: cat.color }} />
                                            {sub}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Footer */}
                            <Link href={`/categorie/${cat.value}`} className="cat-card-btn" style={{ color: cat.color, borderColor: `${cat.color}40` }}>
                                Tout voir
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
