import React from 'react';

// Modern duotone SVG icons — filled accents + clean outlines
export const CategoryIcons: Record<string, React.ReactNode> = {
    vehicules: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 38h44v6a4 4 0 01-4 4H14a4 4 0 01-4-4v-6z" fill="currentColor" opacity=".15" />
            <path d="M14 38l5-14a4 4 0 013.8-2.8h18.4A4 4 0 0145 24l5 14" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="10" y="38" width="44" height="10" rx="3" stroke="currentColor" strokeWidth="2.8" />
            <circle cx="20" cy="48" r="4" fill="currentColor" opacity=".2" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="44" cy="48" r="4" fill="currentColor" opacity=".2" stroke="currentColor" strokeWidth="2.5" />
            <line x1="26" y1="33" x2="38" y2="33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    ),
    immobilier: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 30v22a3 3 0 003 3h34a3 3 0 003-3V30" fill="currentColor" opacity=".1" />
            <path d="M6 32L32 12l26 20" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="12" y="30" width="40" height="25" rx="3" stroke="currentColor" strokeWidth="2.8" />
            <rect x="24" y="38" width="16" height="17" rx="3" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity=".12" />
            <circle cx="36" cy="47" r="1.5" fill="currentColor" />
            <rect x="17" y="34" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
            <rect x="39" y="34" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
    ),
    electronique: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="6" width="32" height="52" rx="7" fill="currentColor" opacity=".1" />
            <rect x="16" y="6" width="32" height="52" rx="7" stroke="currentColor" strokeWidth="2.8" />
            <rect x="20" y="13" width="24" height="32" rx="3" stroke="currentColor" strokeWidth="2.2" />
            <circle cx="32" cy="52" r="3" stroke="currentColor" strokeWidth="2.2" />
            <line x1="27" y1="9" x2="37" y2="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    ),
    mode: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 10c0 0 4 6 10 6s10-6 10-6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M22 10c-2 4-4 12-4 18v26a2 2 0 002 2h24a2 2 0 002-2V28c0-6-2-14-4-18" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M18 28h28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M18 28v26a2 2 0 002 2h24a2 2 0 002-2V28" fill="currentColor" opacity=".1" />
            <path d="M28 28v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M36 28v6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="32" cy="22" r="2" fill="currentColor" opacity=".4" />
        </svg>
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
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 30v16c0 0 6 8 16 8s16-8 16-8V30" fill="currentColor" opacity=".1" />
            <path d="M6 26l26-14 26 14-26 14L6 26z" fill="currentColor" opacity=".08" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
            <path d="M16 30v16c0 0 6 8 16 8s16-8 16-8V30" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="58" y1="26" x2="58" y2="50" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="58" cy="52" r="2.5" fill="currentColor" />
        </svg>
    ),
    loisirs: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="12" width="48" height="32" rx="5" fill="currentColor" opacity=".1" />
            <rect x="8" y="12" width="48" height="32" rx="5" stroke="currentColor" strokeWidth="2.8" />
            <path d="M24 44h16v8a3 3 0 01-3 3H27a3 3 0 01-3-3v-8z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" opacity=".1" />
            <polygon points="26,22 26,36 40,29" fill="currentColor" opacity=".35" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        </svg>
    ),
    animaux: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="38" rx="20" ry="18" fill="currentColor" opacity=".1" stroke="currentColor" strokeWidth="2.8" />
            <ellipse cx="18" cy="16" rx="6" ry="10" fill="currentColor" opacity=".12" stroke="currentColor" strokeWidth="2.5" />
            <ellipse cx="46" cy="16" rx="6" ry="10" fill="currentColor" opacity=".12" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="24" cy="34" r="3.5" fill="currentColor" opacity=".5" />
            <circle cx="40" cy="34" r="3.5" fill="currentColor" opacity=".5" />
            <ellipse cx="32" cy="40" rx="4" ry="3" fill="currentColor" opacity=".3" stroke="currentColor" strokeWidth="2" />
            <path d="M28 44c2 3 8 3 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
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
    affaires: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="10" width="48" height="44" rx="5" fill="currentColor" opacity=".08" stroke="currentColor" strokeWidth="2.8" />
            <line x1="8" y1="22" x2="56" y2="22" stroke="currentColor" strokeWidth="2.2" />
            <path d="M16 38l10 10 20-18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="16" cy="38" r="3" fill="currentColor" opacity=".3" />
            <circle cx="26" cy="48" r="3" fill="currentColor" opacity=".3" />
            <circle cx="46" cy="30" r="3" fill="currentColor" opacity=".3" />
            <rect x="14" y="14" width="8" height="4" rx="1" fill="currentColor" opacity=".25" />
            <rect x="26" y="14" width="8" height="4" rx="1" fill="currentColor" opacity=".25" />
        </svg>
    ),
};
