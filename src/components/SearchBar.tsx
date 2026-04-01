"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { ALL_PRODUCTS } from "@/lib/data";
import "./searchbar.css";

const VILLES = [
    "Tout Abidjan",
    "Cocody",
    "Plateau",
    "Marcory",
    "Yopougon",
    "Abobo",
    "Treichville",
    "Adjamé",
    "Koumassi",
    "Port-Bouët",
    "Yamoussoukro",
    "Bouaké",
];

const POPULAR_SEARCHES = [
    "iPhone 15",
    "Appartement Cocody",
    "Toyota Corolla",
    "MacBook Pro",
    "Terrain Abidjan",
    "Réfrigérateur",
];

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Toutes les catégories");
    const [selectedVille, setSelectedVille] = useState("Tout Abidjan");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showCatDropdown, setShowCatDropdown] = useState(false);
    const [showVilleDropdown, setShowVilleDropdown] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close all dropdowns on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
                setShowCatDropdown(false);
                setShowVilleDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Filter suggestions based on query
    const suggestions = query.length >= 2
        ? ALL_PRODUCTS
            .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5)
        : [];

    // Category matches
    const catSuggestions = query.length >= 2
        ? CATEGORIES.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.subcategories.some((s) => s.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 3)
        : [];

    const handleFocus = () => {
        setShowSuggestions(true);
        setShowCatDropdown(false);
        setShowVilleDropdown(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuggestions(false);
        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());
        if (selectedCategory !== "Toutes les catégories") params.set("cat", selectedCategory);
        if (selectedVille !== "Tout Abidjan") params.set("ville", selectedVille);
        window.location.href = `/annonces?${params.toString()}`;
    };

    return (
        <div className="sb-wrapper" ref={wrapperRef}>
            <form className="sb-form" onSubmit={handleSubmit}>
                {/* Location picker */}
                <div className="sb-location">
                    <button
                        type="button"
                        className="sb-location-btn"
                        onClick={() => {
                            setShowVilleDropdown(!showVilleDropdown);
                            setShowCatDropdown(false);
                            setShowSuggestions(false);
                        }}
                    >
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        <span>{selectedVille}</span>
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>
                    </button>

                    {showVilleDropdown && (
                        <div className="sb-dropdown sb-dropdown-ville">
                            {VILLES.map((v) => (
                                <button
                                    key={v}
                                    type="button"
                                    className={`sb-dropdown-item ${selectedVille === v ? "sb-dropdown-item-active" : ""}`}
                                    onClick={() => { setSelectedVille(v); setShowVilleDropdown(false); }}
                                >
                                    {v}
                                    {selectedVille === v && (
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#19335d" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="sb-divider" />

                {/* Search input */}
                <div className="sb-input-area">
                    <svg className="sb-search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                        type="text"
                        placeholder="Rechercher une annonce..."
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                        onFocus={handleFocus}
                        className="sb-input"
                    />
                    {query && (
                        <button type="button" className="sb-clear" onClick={() => { setQuery(""); setShowSuggestions(false); }}>
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                    )}
                </div>

                <div className="sb-divider" />

                {/* Category picker */}
                <div className="sb-category">
                    <button
                        type="button"
                        className="sb-category-btn"
                        onClick={() => {
                            setShowCatDropdown(!showCatDropdown);
                            setShowVilleDropdown(false);
                            setShowSuggestions(false);
                        }}
                    >
                        <span>{selectedCategory === "Toutes les catégories" ? "Catégorie" : selectedCategory}</span>
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>
                    </button>

                    {showCatDropdown && (
                        <div className="sb-dropdown sb-dropdown-cat">
                            <button
                                type="button"
                                className={`sb-dropdown-item ${selectedCategory === "Toutes les catégories" ? "sb-dropdown-item-active" : ""}`}
                                onClick={() => { setSelectedCategory("Toutes les catégories"); setShowCatDropdown(false); }}
                            >
                                Toutes les catégories
                            </button>
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.value}
                                    type="button"
                                    className={`sb-dropdown-item ${selectedCategory === cat.name ? "sb-dropdown-item-active" : ""}`}
                                    onClick={() => { setSelectedCategory(cat.name); setShowCatDropdown(false); }}
                                >
                                    <span className="sb-dropdown-dot" style={{ background: cat.color }} />
                                    {cat.name}
                                    {selectedCategory === cat.name && (
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#19335d" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit */}
                <button type="submit" className="sb-submit">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                </button>
            </form>

            {/* Suggestions dropdown */}
            {showSuggestions && (
                <div className="sb-suggestions">
                    {/* Popular searches when empty */}
                    {query.length < 2 && (
                        <>
                            <div className="sb-sug-section-title">Recherches populaires</div>
                            {POPULAR_SEARCHES.map((s) => (
                                <button
                                    key={s}
                                    className="sb-sug-item"
                                    onClick={() => { setQuery(s); setShowSuggestions(false); }}
                                >
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" /></svg>
                                    {s}
                                </button>
                            ))}
                        </>
                    )}

                    {/* Category matches */}
                    {catSuggestions.length > 0 && (
                        <>
                            <div className="sb-sug-section-title">Catégories</div>
                            {catSuggestions.map((cat) => (
                                <button
                                    key={cat.value}
                                    className="sb-sug-item sb-sug-cat"
                                    onClick={() => {
                                        setShowSuggestions(false);
                                        window.location.href = `/categorie/${cat.value}`;
                                    }}
                                >
                                    <span className="sb-sug-cat-dot" style={{ background: cat.color }} />
                                    <span>{cat.name}</span>
                                    <span className="sb-sug-cat-count">{cat.subcategories.length} sous-cat.</span>
                                </button>
                            ))}
                        </>
                    )}

                    {/* Product suggestions */}
                    {suggestions.length > 0 && (
                        <>
                            <div className="sb-sug-section-title">Annonces</div>
                            {suggestions.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/product/${p.id}`}
                                    className="sb-sug-item sb-sug-product"
                                    onClick={() => setShowSuggestions(false)}
                                >
                                    <img src={p.imageUrl} alt="" className="sb-sug-img" />
                                    <div className="sb-sug-info">
                                        <span className="sb-sug-title">{p.title}</span>
                                        <span className="sb-sug-price">{p.price.toLocaleString("fr-FR")} FCFA</span>
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}

                    {query.length >= 2 && suggestions.length === 0 && catSuggestions.length === 0 && (
                        <div className="sb-sug-empty">
                            Aucun résultat pour &laquo; {query} &raquo;
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
