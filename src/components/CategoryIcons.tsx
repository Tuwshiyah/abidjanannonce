import React from 'react';

// Modern duotone SVG icons — filled accents + clean outlines
export const CategoryIcons: Record<string, React.ReactNode> = {
    vehicules: (
        <img src="/categories/vehicules.webp" alt="Véhicules" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit", transform: "scale(1.15)" }} />
    ),
    immobilier: (
        <img src="/categories/immobilier.webp" alt="Immobilier" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    electronique: (
        <img src="/categories/electronique.webp" alt="Électronique" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", borderRadius: "inherit" }} />
    ),
    mode: (
        <img src="/categories/mode.webp" alt="Mode & Beauté" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", borderRadius: "inherit" }} />
    ),
    maison: (
        <img src="/categories/maison.webp" alt="Pour la maison" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    emploi: (
        <img src="/categories/emploi.webp" alt="Emplois" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    alimentation: (
        <img src="/categories/alimentation.webp" alt="Alimentation" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    cours: (
        <img src="/categories/cours.webp" alt="Cours & Formation" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    loisirs: (
        <img src="/categories/loisirs.webp" alt="Sports & Loisirs" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
    electromenager: (
        <img src="/categories/electromenager.webp" alt="Électroménager" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
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
        <img src="/categories/services.webp" alt="Services" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", borderRadius: "inherit" }} />
    ),
    animaux: (
        <img src="/categories/animaux.webp" alt="Animaux" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", borderRadius: "inherit" }} />
    ),
    pro: (
        <img src="/categories/pro.webp" alt="Matériel Pro" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "inherit" }} />
    ),
};
