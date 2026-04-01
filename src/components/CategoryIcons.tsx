import React from 'react';

// Modern duotone SVG icons — filled accents + clean outlines
export const CategoryIcons: Record<string, React.ReactNode> = {
    vehicules: (
        <img src="/categories/vehicules.webp" alt="Véhicules" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit", transform: "scale(1.15)" }} />
    ),
    immobilier: (
        <img src="/categories/immobilier.webp" alt="Immobilier" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    electronique: (
        <img src="/categories/electronique.webp" alt="Électronique" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", borderRadius: "inherit" }} />
    ),
    mode: (
        <img src="/categories/mode.webp" alt="Mode & Beauté" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", borderRadius: "inherit" }} />
    ),
    maison: (
        <img src="/categories/maison.webp" alt="Pour la maison" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    emploi: (
        <img src="/categories/emploi.webp" alt="Emplois" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    alimentation: (
        <img src="/categories/alimentation.webp" alt="Alimentation" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    cours: (
        <img src="/categories/cours.webp" alt="Cours & Formation" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    loisirs: (
        <img src="/categories/loisirs.webp" alt="Sports & Loisirs" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    electromenager: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14" y="8" width="36" height="48" rx="4" fill="currentColor" opacity=".1" stroke="currentColor" strokeWidth="2.8" />
            <rect x="20" y="14" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2.2" fill="currentColor" opacity=".08" />
            <circle cx="32" cy="44" r="5" stroke="currentColor" strokeWidth="2.2" />
            <line x1="32" y1="39" x2="32" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    enfant: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="24" r="14" fill="currentColor" opacity=".1" stroke="currentColor" strokeWidth="2.8" />
            <circle cx="26" cy="22" r="2" fill="currentColor" />
            <circle cx="38" cy="22" r="2" fill="currentColor" />
            <path d="M26 28c2 3 8 3 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 38v14a4 4 0 004 4h12a4 4 0 004-4V38" stroke="currentColor" strokeWidth="2.8" />
            <line x1="22" y1="44" x2="42" y2="44" stroke="currentColor" strokeWidth="2" />
        </svg>
    ),
    services: (
        <img src="/categories/services.webp" alt="Services" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", borderRadius: "inherit" }} />
    ),
    animaux: (
        <img src="/categories/animaux.webp" alt="Animaux" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", borderRadius: "inherit" }} />
    ),
    pro: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="28" width="48" height="28" rx="4" fill="currentColor" opacity=".1" stroke="currentColor" strokeWidth="2.8" />
            <rect x="18" y="8" width="10" height="20" rx="3" fill="currentColor" opacity=".12" stroke="currentColor" strokeWidth="2.5" />
            <rect x="36" y="14" width="10" height="14" rx="3" fill="currentColor" opacity=".12" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="32" cy="42" r="9" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity=".08" />
            <path d="M27 42l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};
