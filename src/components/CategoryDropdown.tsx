"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { CategoryIcons } from "./CategoryIcons";

export default function CategoryDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="category-dropdown-wrapper" ref={dropdownRef}>
            <button
                className="shop-by-category"
                onClick={() => setIsOpen(!isOpen)}
            >
                Explorer par<br />catégorie <span style={{ transform: isOpen ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.2s" }}>&#711;</span>
            </button>

            {isOpen && (
                <>
                    <div className="category-dropdown-overlay" onClick={() => setIsOpen(false)} />
                    <div className="category-dropdown">
                        <div className="dropdown-header">
                            <h3>Explorer les catégories</h3>
                            <button className="dropdown-close" onClick={() => setIsOpen(false)}>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div className="dropdown-grid">
                            {CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.name}
                                    href="/annonces"
                                    className="dropdown-cat-item"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="dropdown-cat-icon" style={{ color: cat.color }}>
                                        {CategoryIcons[cat.iconKey]}
                                    </div>
                                    <span className="dropdown-cat-name">{cat.name}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="dropdown-footer">
                            <Link href="/categories" className="dropdown-see-all" onClick={() => setIsOpen(false)}>
                                Voir toutes les catégories →
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
