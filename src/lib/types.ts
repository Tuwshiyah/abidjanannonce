// ============================================
// AbidjanAnnonce — Core Types
// ============================================

export type UserType = "particulier" | "entreprise";
export type UserRole = "user" | "vendor_pro" | "moderator" | "admin";
export type ProfileBadge = "PRO" | "PRO_EXPERT" | "VERIFIE" | "REPOND_VITE" | "NOUVEAU";
export type AdBadge = "PREMIUM" | "URGENT" | "NOUVEAU";
export type AdStatus = "en_attente" | "active" | "premium" | "expiree" | "suspendue" | "vendue" | "supprimee";
export type SubscriptionPlan = "gratuit" | "starter" | "business" | "expert";
export type PaymentMethod = "wave" | "orange_money" | "mtn" | "visa_mc";
export type BoostTier = "haute_valeur" | "valeur_moyenne" | "accessible" | "emploi" | "services" | "legere";
export type BoostDuration = 7 | 14 | 30;

// ---- User Profile ----
export interface UserProfile {
    id: string;
    accountType: UserType;
    role: UserRole;
    // Common fields
    fullName: string;
    email: string;
    phone: string;
    city: string;
    avatarUrl?: string;
    createdAt: string;
    // Entreprise-only fields
    businessName?: string;
    logo?: string;
    sector?: string;
    rccm?: string;
    address?: string;
    whatsappBusiness?: string;
    website?: string;
    socialLinks?: string;
    // Verification
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    isRccmVerified: boolean;
    // Subscription
    plan: SubscriptionPlan;
    subscription?: Subscription;
    boostCreditsRemaining: number;
    // Trust & badges
    trustScore: number;
    trustBreakdown?: TrustScoreBreakdown;
    profileBadges: ProfileBadge[];
    // Stats
    responseRate: number;
    avgResponseTimeMinutes: number;
    totalAds: number;
    activeAds: number;
    totalReviews: number;
    avgRating: number;
}

// ---- Ad / Annonce ----
export interface Ad {
    id: string;
    title: string;
    description: string;
    price: number;
    condition: "Brand New" | "Like New" | "Used";
    category: string;
    subcategory?: string;
    location: string;
    photos: string[];
    videoUrl?: string;
    // Seller
    sellerId: string;
    sellerName: string;
    sellerRating: number;
    isProSeller: boolean;
    sellerBadges: ProfileBadge[];
    // Status
    status: AdStatus;
    moderationNote?: string;
    // Badges & boosts
    isPremium: boolean;
    premiumExpiresAt?: string;
    isUrgent: boolean;
    urgentExpiresAt?: string;
    adBadges: AdBadge[];
    // Stats
    viewCount: number;
    favoriteCount: number;
    rating: number;
    reviewCount: number;
    // Dates
    createdAt: string;
    expiresAt: string;
    bumpedAt?: string;
}

// ---- Subscription ----
export interface Subscription {
    id: string;
    userId: string;
    plan: SubscriptionPlan;
    amount: number;
    paymentMethod: PaymentMethod;
    startDate: string;
    endDate: string;
    autoRenew: boolean;
    boostCreditsTotal: number;
    boostCreditsUsed: number;
    isActive: boolean;
}

// ---- Transaction ----
export interface Transaction {
    id: string;
    userId: string;
    type: "subscription" | "boost" | "alacarte" | "pack";
    description: string;
    amount: number;
    paymentMethod: PaymentMethod;
    status: "pending" | "success" | "failed" | "refunded";
    reference: string;
    createdAt: string;
}

// ---- Trust Score ----
export interface TrustScoreBreakdown {
    phoneVerified: number;       // +20
    emailVerified: number;       // +10
    seniority3months: number;    // +15
    seniority12months: number;   // +25
    positiveReviews: number;     // +2 per review, max 20
    responseRate: number;        // +10 if >80%
    rccmVerified: number;        // +15 (entreprise only)
    total: number;
}

// ---- Pricing ----
export interface BoostPricing {
    tier: BoostTier;
    label: string;
    emoji: string;
    categories: string[];
    prices: Record<BoostDuration, number>;
}

export interface PlanLimits {
    plan: SubscriptionPlan;
    label: string;
    price: number;
    maxAds: number | null; // null = unlimited
    maxPhotos: number;
    durationDays: number;
    boostCreditsPerMonth: number;
    hasShop: boolean;
    hasBadge: boolean;
    hasProExpertBadge: boolean;
    hasVideo: boolean;
    hasAdvancedStats: boolean;
    hasPrioritySupport: boolean;
    hasMonthlyReport: boolean;
    hasAccountManager: boolean;
    hasUnlimitedBumps: boolean;
    hasPrioritySearch: boolean;
    phoneVisible: boolean;
    whatsappIntegration: boolean;
    canPostJobOffers: boolean;
}

export interface AlaCarteOption {
    id: string;
    label: string;
    description: string;
    price: number;
    icon: string;
}

export interface BoostPack {
    id: string;
    name: string;
    price: number;
    contents: string[];
    discount: string;
}

export interface PaymentMethodInfo {
    id: PaymentMethod;
    label: string;
    icon: string;
    priority: boolean;
}

// ---- Review ----
export interface Review {
    id: string;
    reviewerId: string;
    reviewerName: string;
    sellerId: string;
    adId?: string;
    rating: number;
    comment: string;
    createdAt: string;
}
