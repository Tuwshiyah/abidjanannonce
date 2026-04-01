"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { CategoryIcons } from "./CategoryIcons";
import "./mega-menu.css";

const menuIcons: Record<string, React.ReactNode> = {
    vehicules: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z"/></svg>,
    immobilier: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>,
    electronique: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    mode: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L8 6H4v4l-2 2 2 2v4h4l4 4 4-4h4v-4l2-2-2-2V6h-4L12 2z"/></svg>,
    maison: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M9 22V12h6v10"/></svg>,
    emploi: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
    services: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
    alimentation: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/></svg>,
    loisirs: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
};

export default function CategoryMegaMenu() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const activeCat = CATEGORIES.find((c) => c.value === activeCategory);

    const handleMouseEnter = (value: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveCategory(value);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveCategory(null);
        }, 120);
    };

    const handleMenuEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    return (
        <nav className="mega-nav">
            <div className="container mega-nav-container">
                <ul className="cat-nav-list">
                    {CATEGORIES.slice(0, 9).map((cat) => (
                        <li
                            key={cat.value}
                            className={`cat-nav-item ${activeCategory === cat.value ? "cat-nav-item-active" : ""}`}
                            onMouseEnter={() => handleMouseEnter(cat.value)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link href={`/categorie/${cat.value}`} className="cat-nav-link">
                                {cat.name}
                            </Link>
                        </li>
                    ))}
                    <li className="cat-nav-item">
                        <Link href="/categories" className="cat-nav-link cat-nav-link-more">
                            Toutes les catégories
                        </Link>
                    </li>
                </ul>

                {/* Mega menu panel inside container */}
                {activeCategory && activeCat && (
                    <div
                        className="mega-panel"
                        onMouseEnter={handleMenuEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="mega-panel-inner">
                        {/* Left: category info */}
                        <div className="mega-panel-left" style={{ borderColor: activeCat.color }}>
                            <div className="mega-panel-icon" style={{ color: activeCat.color }}>
                                {CategoryIcons[activeCat.iconKey]}
                            </div>
                            <h3>{activeCat.name}</h3>
                            <p>{activeCat.description}</p>
                            <Link
                                href="/annonces"
                                className="mega-panel-cta"
                                style={{ background: activeCat.color }}
                                onClick={() => setActiveCategory(null)}
                            >
                                Tout voir
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 6 15 12 9 18" /></svg>
                            </Link>
                        </div>

                        {/* Right: all subcategories */}
                        <div className="mega-panel-right">
                            {activeCat.subcategories.map((sub) => (
                                <Link
                                    key={sub}
                                    href="/annonces"
                                    className="mega-panel-sub"
                                    onClick={() => setActiveCategory(null)}
                                >
                                    <span className="mega-panel-dot" style={{ background: activeCat.color }} />
                                    {sub}
                                </Link>
                            ))}
                        </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
