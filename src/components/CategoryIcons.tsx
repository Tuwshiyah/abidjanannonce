import React from 'react';

// Modern duotone SVG icons — filled accents + clean outlines
export const CategoryIcons: Record<string, React.ReactNode> = {
    vehicules: (
        <img src="/categories/vehicules.webp" alt="Véhicules" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "50%", transform: "scale(1.15)" }} />
    ),
    immobilier: (
        <img src="/categories/immobilier.webp" alt="Immobilier" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "50%" }} />
    ),
    electronique: (
        <img src="/categories/electronique.webp" alt="Électronique" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", borderRadius: "50%" }} />
    ),
    mode: (
        <img src="/categories/mode.webp" alt="Mode & Beauté" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", borderRadius: "50%" }} />
    ),
    maison: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 32v22a3 3 0 003 3h34a3 3 0 003-3V32" fill="currentColor" opacity=".1" />
            <rect x="12" y="32" width="40" height="25" rx="3" stroke="currentColor" strokeWidth="2.8" />
            <path d="M16 36h12v12H16z" rx="2" stroke="currentColor" strokeWidth="2.2" fill="currentColor" opacity=".12" />
            <rect x="36" y="36" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2.2" />
            <line x1="42" y1="36" x2="42" y2="48" stroke="currentColor" strokeWidth="1.5" />
            <line x1="36" y1="42" x2="48" y2="42" stroke="currentColor" strokeWidth="1.5" />
            <line x1="16" y1="52" x2="48" y2="52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 34L32 14l24 20" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    emploi: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="22" width="52" height="32" rx="5" fill="currentColor" opacity=".1" />
            <rect x="6" y="22" width="52" height="32" rx="5" stroke="currentColor" strokeWidth="2.8" />
            <path d="M22 22V16a6 6 0 016-6h8a6 6 0 016 6v6" stroke="currentColor" strokeWidth="2.8" />
            <path d="M6 36h52" stroke="currentColor" strokeWidth="2.2" />
            <rect x="26" y="31" width="12" height="10" rx="3" fill="currentColor" opacity=".2" stroke="currentColor" strokeWidth="2.2" />
        </svg>
    ),
    alimentation: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="36" r="20" fill="currentColor" opacity=".08" />
            <circle cx="32" cy="36" r="20" stroke="currentColor" strokeWidth="2.8" />
            <path d="M20 34c0-8 6-14 12-14s12 6 12 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M32 8v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M34 9c3 2 5 5 4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M30 9c-3 2-5 5-4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="40" x2="48" y2="40" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M24 48c3 3 13 3 16 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
    ),
    cours: (
        <img src="/categories/cours.webp" alt="Cours & Formation" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%", borderRadius: "50%" }} />
    ),
    loisirs: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="12" width="48" height="32" rx="5" fill="currentColor" opacity=".1" />
            <rect x="8" y="12" width="48" height="32" rx="5" stroke="currentColor" strokeWidth="2.8" />
            <path d="M24 44h16v8a3 3 0 01-3 3H27a3 3 0 01-3-3v-8z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity=".1" />
            <polygon points="26,22 26,36 40,29" fill="currentColor" opacity=".35" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        </svg>
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
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="22" fill="currentColor" opacity=".08" stroke="currentColor" strokeWidth="2.8" />
            <path d="M38 22a8 8 0 00-12 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M24 30l4 2 4-4 4 4 4-2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 38h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M28 42h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
    ),
    animaux: (
        <img src="/categories/animaux.webp" alt="Animaux" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", borderRadius: "50%" }} />
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
