"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CategoryIcons } from "./CategoryIcons";

const CATEGORIES = [
    { name: "Véhicules", iconKey: "vehicules", color: "#E53935", value: "vehicules" },
    { name: "Immobilier", iconKey: "immobilier", color: "#1E88E5", value: "immobilier" },
    { name: "Électronique", iconKey: "electronique", color: "#43A047", value: "electronique" },
    { name: "Mode & Beauté", iconKey: "mode", color: "#FFB300", value: "mode" },
    { name: "Maison & Jardin", iconKey: "maison", color: "#E53935", value: "maison" },
    { name: "Emploi & Services", iconKey: "emploi", color: "#1E88E5", value: "emploi" },
    { name: "Alimentation", iconKey: "alimentation", color: "#43A047", value: "alimentation" },
    { name: "Cours & Formation", iconKey: "cours", color: "#FFB300", value: "cours" },
    { name: "Loisirs", iconKey: "loisirs", color: "#9C27B0", value: "loisirs" },
    { name: "Animaux", iconKey: "animaux", color: "#00897B", value: "animaux" },
    { name: "Matériel Pro", iconKey: "pro", color: "#546E7A", value: "pro" },
    { name: "Affaires", iconKey: "affaires", color: "#F57C00", value: "affaires" },
];

export default function SearchCategoryPicker() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Toutes les catégories");

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const handleSelect = (name: string) => {
        setSelected(name);
        setIsOpen(false);
    };

    return (
        <>
            <div className="category-select" onClick={() => setIsOpen(true)}>
                <button type="button" className="category-select-btn">
                    {selected}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <>
                    <div className="search-cat-overlay" onClick={() => setIsOpen(false)} />
                    <div className="search-cat-modal">
                        <div className="search-cat-modal-header">
                            <h3>Choisir une catégorie</h3>
                            <button className="search-cat-modal-close" onClick={() => setIsOpen(false)}>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* All categories option */}
                        <div className="search-cat-all" onClick={() => handleSelect("Toutes les catégories")}>
                            <div className="search-cat-all-icon">
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                                </svg>
                            </div>
                            <span>Toutes les catégories</span>
                            {selected === "Toutes les catégories" && (
                                <svg className="search-cat-check" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#3a5ba0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </div>

                        <div className="search-cat-grid">
                            {CATEGORIES.map((cat) => (
                                <div
                                    key={cat.value}
                                    className={`search-cat-item ${selected === cat.name ? "search-cat-item-active" : ""}`}
                                    onClick={() => handleSelect(cat.name)}
                                >
                                    <div className="search-cat-icon" style={{ color: cat.color }}>
                                        {CategoryIcons[cat.iconKey]}
                                    </div>
                                    <span className="search-cat-name">{cat.name}</span>
                                    {selected === cat.name && (
                                        <svg className="search-cat-check" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#3a5ba0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="search-cat-modal-footer">
                            <Link href="/categories" className="search-cat-see-all" onClick={() => setIsOpen(false)}>
                                Voir toutes les catégories →
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
