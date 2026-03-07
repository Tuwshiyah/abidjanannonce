"use client";

import { useState } from "react";
import Link from "next/link";
import { CategoryIcons } from "@/components/CategoryIcons";
import "./categories.css";

const CATEGORIES = [
    {
        name: "Véhicules",
        iconKey: "vehicules",
        color: "#E53935",
        description: "Voitures, motos, pièces détachées et tout pour vos déplacements au quotidien."
    },
    {
        name: "Immobilier",
        iconKey: "immobilier",
        color: "#1E88E5",
        description: "Appartements, maisons, terrains et locaux commerciaux à vendre ou louer."
    },
    {
        name: "Électronique",
        iconKey: "electronique",
        color: "#43A047",
        description: "Smartphones, tablettes, accessoires et gadgets high-tech pour tous."
    },
    {
        name: "Mode & Beauté",
        iconKey: "mode",
        color: "#FFB300",
        description: "Vêtements, chaussures, bijoux et produits de beauté pour hommes et femmes."
    },
    {
        name: "Maison & Jardin",
        iconKey: "maison",
        color: "#E53935",
        description: "Meubles, décoration, électroménager et tout pour embellir votre intérieur."
    },
    {
        name: "Emploi & Services",
        iconKey: "emploi",
        color: "#1E88E5",
        description: "Offres d'emploi, services professionnels et opportunités de carrière."
    },
    {
        name: "Alimentation",
        iconKey: "alimentation",
        color: "#43A047",
        description: "Produits alimentaires, boissons et spécialités locales et importées."
    },
    {
        name: "Cours & Formation",
        iconKey: "cours",
        color: "#FFB300",
        description: "Formations professionnelles, cours particuliers et programmes éducatifs."
    },
    {
        name: "Loisirs",
        iconKey: "loisirs",
        color: "#9C27B0",
        description: "Jeux vidéo, sports, musique et divertissements pour tous les goûts."
    },
    {
        name: "Animaux",
        iconKey: "animaux",
        color: "#00897B",
        description: "Animaux de compagnie, accessoires et tout pour le bien-être de vos compagnons."
    },
    {
        name: "Matériel Pro",
        iconKey: "pro",
        color: "#546E7A",
        description: "Équipements, outillage et matériaux pour professionnels du BTP et artisans."
    },
    {
        name: "Affaires",
        iconKey: "affaires",
        color: "#F57C00",
        description: "Opportunités d'investissement, fonds de commerce et partenariats d'affaires."
    },
];

export default function CategoriesPage() {
    const [search, setSearch] = useState("");

    const filtered = CATEGORIES.filter(cat =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="categories-page">
            {/* Header */}
            <div className="categories-header">
                <h1>Nos catégories</h1>
                <div className="categories-search">
                    <span className="cat-search-icon">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Rechercher une catégorie"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="categories-grid">
                {filtered.map((cat) => (
                    <div key={cat.name} className="category-card">
                        <div className="card-color-bar" style={{ background: cat.color }} />
                        <div className="card-icon-area" style={{ color: cat.color }}>
                            {CategoryIcons[cat.iconKey]}
                        </div>
                        <div className="card-info">
                            <h3>{cat.name}</h3>
                            <p>{cat.description}</p>
                            <Link href="/annonces" className="explore-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                    <circle cx="8" cy="6" r="2" fill="currentColor" opacity="0.3" />
                                    <circle cx="16" cy="12" r="2" fill="currentColor" opacity="0.3" />
                                    <circle cx="10" cy="18" r="2" fill="currentColor" opacity="0.3" />
                                </svg>
                                Explorer les produits
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
