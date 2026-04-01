import type {
    PlanLimits, BoostPricing, BoostTier, AlaCarteOption,
    BoostPack, PaymentMethodInfo, TrustScoreBreakdown
} from "./types";

// ============================================
// Plan Limits
// ============================================
export const PLAN_LIMITS: PlanLimits[] = [
    {
        plan: "gratuit",
        label: "Gratuit",
        price: 0,
        maxAds: 5,
        maxPhotos: 3,
        durationDays: 30, // 60 for entreprise — handled in logic
        boostCreditsPerMonth: 0,
        hasShop: false,
        hasBadge: false,
        hasProExpertBadge: false,
        hasVideo: false,
        hasAdvancedStats: false,
        hasPrioritySupport: false,
        hasMonthlyReport: false,
        hasAccountManager: false,
        hasUnlimitedBumps: false,
        hasPrioritySearch: false,
        phoneVisible: false,
        whatsappIntegration: false,
        canPostJobOffers: false,
    },
    {
        plan: "starter",
        label: "Starter",
        price: 7500,
        maxAds: 15,
        maxPhotos: 10,
        durationDays: 60,
        boostCreditsPerMonth: 3,
        hasShop: true,
        hasBadge: true,
        hasProExpertBadge: false,
        hasVideo: false,
        hasAdvancedStats: false,
        hasPrioritySupport: false,
        hasMonthlyReport: false,
        hasAccountManager: false,
        hasUnlimitedBumps: false,
        hasPrioritySearch: false,
        phoneVisible: true,
        whatsappIntegration: true,
        canPostJobOffers: true,
    },
    {
        plan: "business",
        label: "Business",
        price: 18000,
        maxAds: 40,
        maxPhotos: 10,
        durationDays: 60,
        boostCreditsPerMonth: 10,
        hasShop: true,
        hasBadge: true,
        hasProExpertBadge: false,
        hasVideo: true,
        hasAdvancedStats: true,
        hasPrioritySupport: true,
        hasMonthlyReport: true,
        hasAccountManager: false,
        hasUnlimitedBumps: false,
        hasPrioritySearch: false,
        phoneVisible: true,
        whatsappIntegration: true,
        canPostJobOffers: true,
    },
    {
        plan: "expert",
        label: "Expert",
        price: 35000,
        maxAds: null, // unlimited
        maxPhotos: 10,
        durationDays: 60,
        boostCreditsPerMonth: 25,
        hasShop: true,
        hasBadge: true,
        hasProExpertBadge: true,
        hasVideo: true,
        hasAdvancedStats: true,
        hasPrioritySupport: true,
        hasMonthlyReport: true,
        hasAccountManager: true,
        hasUnlimitedBumps: true,
        hasPrioritySearch: true,
        phoneVisible: true,
        whatsappIntegration: true,
        canPostJobOffers: true,
    },
];

export function getPlanLimits(plan: string): PlanLimits {
    return PLAN_LIMITS.find(p => p.plan === plan) || PLAN_LIMITS[0];
}

// ============================================
// Boost Premium Pricing by Category Tier
// ============================================
export const BOOST_PRICING: BoostPricing[] = [
    {
        tier: "haute_valeur",
        label: "Haute Valeur",
        emoji: "🔴",
        categories: ["immobilier", "vehicules", "pro"],
        prices: { 7: 4000, 14: 7000, 30: 12000 },
    },
    {
        tier: "valeur_moyenne",
        label: "Valeur Moyenne",
        emoji: "🟠",
        categories: ["electronique", "electromenager", "maison"],
        prices: { 7: 2500, 14: 4500, 30: 8000 },
    },
    {
        tier: "accessible",
        label: "Accessible",
        emoji: "🟡",
        categories: ["mode", "enfant", "loisirs"],
        prices: { 7: 1500, 14: 2500, 30: 4000 },
    },
    {
        tier: "emploi",
        label: "Emplois",
        emoji: "🔵",
        categories: ["emplois"],
        prices: { 7: 3000, 14: 5000, 30: 9000 },
    },
    {
        tier: "services",
        label: "Services",
        emoji: "🔵",
        categories: ["services"],
        prices: { 7: 1500, 14: 2500, 30: 4000 },
    },
    {
        tier: "legere",
        label: "Légère",
        emoji: "🟢",
        categories: ["alimentation", "animaux"],
        prices: { 7: 1000, 14: 1750, 30: 3000 },
    },
];

export function getCategoryTier(categoryValue: string): BoostTier {
    for (const bp of BOOST_PRICING) {
        if (bp.categories.includes(categoryValue)) return bp.tier;
    }
    return "accessible"; // default
}

export function getBoostPrice(categoryValue: string, duration: 7 | 14 | 30): number {
    const tier = getCategoryTier(categoryValue);
    const pricing = BOOST_PRICING.find(bp => bp.tier === tier);
    return pricing ? pricing.prices[duration] : 1500;
}

// ============================================
// Options À la Carte
// ============================================
export const ALACARTE_OPTIONS: AlaCarteOption[] = [
    { id: "bump", label: "Remonter l'annonce", description: "Repasse en tête de liste", price: 300, icon: "↑" },
    { id: "urgent", label: "Badge URGENT", description: "Badge rouge visible 7 jours", price: 500, icon: "🔴" },
    { id: "video", label: "Ajouter une vidéo", description: "Vidéo intégrée à l'annonce", price: 1000, icon: "🎬" },
    { id: "extend", label: "Prolonger 15 jours", description: "Prolonge la durée de l'annonce", price: 500, icon: "📅" },
    { id: "pack_bumps", label: "Pack 5 remontées", description: "5 remontées à utiliser quand vous voulez", price: 1200, icon: "📦" },
];

// ============================================
// Boost Packs
// ============================================
export const BOOST_PACKS: BoostPack[] = [
    {
        id: "pack_starter",
        name: "Pack Starter",
        price: 5000,
        contents: [
            "2 À la une 7j (catégorie standard)",
            "5 remontées",
        ],
        discount: "-20%",
    },
    {
        id: "pack_pro",
        name: "Pack Pro",
        price: 10000,
        contents: [
            "1 À la une 14j (immobilier/véhicule)",
            "10 remontées",
            "1 vidéo",
        ],
        discount: "-25%",
    },
    {
        id: "pack_expert",
        name: "Pack Expert",
        price: 20000,
        contents: [
            "3 À la une 14j",
            "20 remontées",
            "3 vidéos",
        ],
        discount: "-30%",
    },
];

// ============================================
// Payment Methods (Wave always first)
// ============================================
export const PAYMENT_METHODS: PaymentMethodInfo[] = [
    { id: "wave", label: "Wave", icon: "📱", priority: true },
    { id: "orange_money", label: "Orange Money", icon: "🟠", priority: false },
    { id: "mtn", label: "MTN Mobile Money", icon: "🟡", priority: false },
    { id: "visa_mc", label: "Visa / Mastercard", icon: "💳", priority: false },
];

// ============================================
// Trust Score
// ============================================
export const TRUST_SCORE_WEIGHTS = {
    phoneVerified: 20,
    emailVerified: 10,
    seniority3months: 15,
    seniority12months: 25, // replaces 3months bonus
    positiveReviewMax: 20,
    positiveReviewPerUnit: 2,
    responseRateAbove80: 10,
    rccmVerified: 15,
};

export function computeTrustScore(params: {
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    accountAgeMonths: number;
    positiveReviewCount: number;
    responseRate: number;
    isRccmVerified: boolean;
}): TrustScoreBreakdown {
    const { isPhoneVerified, isEmailVerified, accountAgeMonths, positiveReviewCount, responseRate, isRccmVerified } = params;
    const W = TRUST_SCORE_WEIGHTS;

    const phoneVerified = isPhoneVerified ? W.phoneVerified : 0;
    const emailVerified = isEmailVerified ? W.emailVerified : 0;
    const seniority3months = accountAgeMonths >= 3 && accountAgeMonths < 12 ? W.seniority3months : 0;
    const seniority12months = accountAgeMonths >= 12 ? W.seniority12months : 0;
    const positiveReviews = Math.min(positiveReviewCount * W.positiveReviewPerUnit, W.positiveReviewMax);
    const responseRateScore = responseRate > 80 ? W.responseRateAbove80 : 0;
    const rccmVerified = isRccmVerified ? W.rccmVerified : 0;

    const total = phoneVerified + emailVerified + seniority3months + seniority12months + positiveReviews + responseRateScore + rccmVerified;

    return {
        phoneVerified,
        emailVerified,
        seniority3months,
        seniority12months,
        positiveReviews,
        responseRate: responseRateScore,
        rccmVerified,
        total: Math.min(total, 100),
    };
}

// ============================================
// Ad Limit Check
// ============================================
export function checkAdLimit(activeAds: number, plan: string): { canPublish: boolean; activeAds: number; limit: number | null } {
    const planLimits = getPlanLimits(plan);
    const limit = planLimits.maxAds;
    if (limit === null) return { canPublish: true, activeAds, limit: null };
    return { canPublish: activeAds < limit, activeAds, limit };
}

// ============================================
// Badge Auto-Assignment Rules
// ============================================
export function computeProfileBadges(profile: {
    accountType: string;
    plan: string;
    accountAgeMonths: number;
    responseRate: number;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    isRccmVerified: boolean;
}): string[] {
    const badges: string[] = [];

    // NOUVEAU: account < 30 days
    if (profile.accountAgeMonths < 1) badges.push("NOUVEAU");

    // REPOND VITE: response rate > 80%
    if (profile.responseRate > 80) badges.push("REPOND_VITE");

    // VERIFIE: phone + email verified (or RCCM for entreprise)
    if (profile.accountType === "entreprise" && profile.isRccmVerified) {
        badges.push("VERIFIE");
    } else if (profile.isPhoneVerified && profile.isEmailVerified) {
        badges.push("VERIFIE");
    }

    // PRO / PRO_EXPERT: active subscription
    if (profile.plan === "expert") {
        badges.push("PRO_EXPERT");
    } else if (profile.plan === "starter" || profile.plan === "business") {
        badges.push("PRO");
    }

    return badges;
}

export function computeAdBadges(ad: { isPremium: boolean; isUrgent: boolean; createdAt: string }): string[] {
    const badges: string[] = [];
    if (ad.isPremium) badges.push("PREMIUM");
    if (ad.isUrgent) badges.push("URGENT");
    // NOUVEAU: created < 24h ago
    const ageMs = Date.now() - new Date(ad.createdAt).getTime();
    if (ageMs < 24 * 60 * 60 * 1000) badges.push("NOUVEAU");
    return badges;
}

// ============================================
// Category-specific rules
// ============================================
export const CATEGORY_RULES = {
    // Job offers: entreprise only
    canPostJobOffer: (accountType: string) => accountType === "entreprise",
    // Job seekers/CV: particulier only, always free
    canPostCV: (accountType: string) => accountType === "particulier",
};
