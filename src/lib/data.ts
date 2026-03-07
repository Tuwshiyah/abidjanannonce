export type Product = {
    id: string;
    title: string;
    price: number;
    condition: "Brand New" | "Like New" | "Used";
    imageUrl: string;
    sellerId: string;
    sellerName: string;
    sellerRating: number;
    description: string;
    category: string;
    rating: number;
    reviewCount: number;
};

export const MOCK_PRODUCTS: Product[] = [
    {
        id: "prod-1",
        title: "Appareil photo hybride Sony Alpha a7 IV avec objectif 28-70mm",
        price: 2498.00,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-123",
        sellerName: "CameraWorld",
        sellerRating: 4.9,
        description: "Neuf, jamais ouvert. Découvrez la qualité d'image incroyable et l'autofocus avancé du Sony a7 IV.",
        category: "Électronique",
        rating: 4.6,
        reviewCount: 32
    },
    {
        id: "prod-2",
        title: "Apple MacBook Pro 16 pouces M3 Max (2023) - 36Go RAM, 1To SSD",
        price: 3250.00,
        condition: "Like New",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-456",
        sellerName: "TechProGear",
        sellerRating: 4.8,
        description: "MacBook Pro 16 à peine utilisé. En parfait état, sans aucune égratignure. Boîte d'origine et chargeur inclus.",
        category: "Informatique",
        rating: 4.55,
        reviewCount: 25
    },
    {
        id: "prod-3",
        title: "Rolex Submariner Date 41mm 'Starbucks' 126610LV",
        price: 15400.00,
        condition: "Used",
        imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-789",
        sellerName: "LuxuryTimepieces",
        sellerRating: 5.0,
        description: "Rolex Submariner en excellent état. Livrée avec boîte et papiers. Récemment révisée.",
        category: "Mode & Beauté",
        rating: 4.6,
        reviewCount: 430
    },
    {
        id: "prod-4",
        title: "Nike Air Jordan 1 Retro High OG 'Chicago' (2015) - Taille 43",
        price: 1850.00,
        condition: "Like New",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-101",
        sellerName: "SneakerVault",
        sellerRating: 4.7,
        description: "Portées une fois en intérieur. 100% authentiques. Reçu d'achat d'origine fourni.",
        category: "Mode & Beauté",
        rating: 4.6,
        reviewCount: 230
    },
    {
        id: "prod-5",
        title: "Siège de bureau ergonomique Herman Miller Aeron - Taille B",
        price: 850.00,
        condition: "Used",
        imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-202",
        sellerName: "OfficeLiquidators",
        sellerRating: 4.5,
        description: "En très bon état, support lombaire et accoudoirs entièrement réglables. Légère usure sur les roulettes.",
        category: "Maison & Jardin",
        rating: 4.6,
        reviewCount: 320
    },
    {
        id: "prod-6",
        title: "Drone DJI Mavic 3 Pro avec pack Fly More",
        price: 2650.00,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-303",
        sellerName: "AeroTech",
        sellerRating: 4.9,
        description: "Pack complet DJI Mavic 3 Pro Fly More neuf et scellé. Comprend 3 batteries, la télécommande RC Pro et les filtres ND.",
        category: "Électronique",
        rating: 4.8,
        reviewCount: 156
    }
];

export const LATEST_PRODUCTS: Product[] = [
    {
        id: "latest-1",
        title: "iPhone 15 Pro Max 256Go - Noir Titane",
        price: 850000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-401",
        sellerName: "iStore",
        sellerRating: 4.9,
        description: "iPhone 15 Pro Max neuf sous blister.",
        category: "Électronique",
        rating: 4.8,
        reviewCount: 1938
    },
    {
        id: "latest-2",
        title: "Samsung Galaxy S24 Ultra 512Go - Violet",
        price: 720000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-402",
        sellerName: "GalaxyShop",
        sellerRating: 4.7,
        description: "Samsung Galaxy S24 Ultra neuf.",
        category: "Électronique",
        rating: 4.4,
        reviewCount: 171
    },
    {
        id: "latest-3",
        title: "MacBook Air M2 13 pouces 8Go RAM 256Go SSD",
        price: 650000,
        condition: "Like New",
        imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-403",
        sellerName: "MacZone",
        sellerRating: 4.8,
        description: "MacBook Air M2 comme neuf.",
        category: "Informatique",
        rating: 4.4,
        reviewCount: 6171
    },
    {
        id: "latest-4",
        title: "PlayStation 5 Slim Digital Edition + 2 Manettes",
        price: 380000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-404",
        sellerName: "GamersCI",
        sellerRating: 4.6,
        description: "PS5 Slim neuve avec 2 manettes.",
        category: "Électronique",
        rating: 4.3,
        reviewCount: 2171
    },
    {
        id: "latest-5",
        title: "Casque Sony WH-1000XM5 Bluetooth Réduction de bruit",
        price: 195000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-405",
        sellerName: "AudioPro",
        sellerRating: 4.9,
        description: "Casque Sony premium neuf.",
        category: "Électronique",
        rating: 4.9,
        reviewCount: 1938
    },
    {
        id: "latest-6",
        title: "iPad Pro M2 12.9 pouces 256Go WiFi + Cellular",
        price: 580000,
        condition: "Like New",
        imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-406",
        sellerName: "TabletWorld",
        sellerRating: 4.7,
        description: "iPad Pro M2 comme neuf.",
        category: "Informatique",
        rating: 4.6,
        reviewCount: 767
    },
    {
        id: "latest-7",
        title: "Canapé 3 places en cuir italien - Marron cognac",
        price: 450000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-407",
        sellerName: "MeubleDesign",
        sellerRating: 4.5,
        description: "Canapé en cuir italien neuf.",
        category: "Maison & Jardin",
        rating: 4.2,
        reviewCount: 331
    },
    {
        id: "latest-8",
        title: "Vélo électrique pliant Xiaomi QiCycle 20 pouces",
        price: 320000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-408",
        sellerName: "VéloCity",
        sellerRating: 4.6,
        description: "Vélo électrique pliant neuf.",
        category: "Véhicules",
        rating: 4.2,
        reviewCount: 327
    },
    {
        id: "latest-9",
        title: "Sac à main Louis Vuitton Neverfull MM Monogram",
        price: 890000,
        condition: "Like New",
        imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-409",
        sellerName: "LuxBags",
        sellerRating: 5.0,
        description: "Sac LV authentique comme neuf.",
        category: "Mode & Beauté",
        rating: 4.6,
        reviewCount: 210
    },
    {
        id: "latest-10",
        title: "Climatiseur Split Samsung 12000 BTU Inverter",
        price: 280000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1631567091046-bba4937017e8?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-410",
        sellerName: "FroidTech",
        sellerRating: 4.4,
        description: "Climatiseur Samsung neuf avec installation.",
        category: "Maison & Jardin",
        rating: 4.5,
        reviewCount: 1350
    },
    {
        id: "latest-11",
        title: "Montre connectée Apple Watch Ultra 2 49mm Titane",
        price: 520000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-411",
        sellerName: "WatchPro",
        sellerRating: 4.8,
        description: "Apple Watch Ultra 2 neuve.",
        category: "Électronique",
        rating: 4.4,
        reviewCount: 455
    },
    {
        id: "latest-12",
        title: "Sneakers Nike Air Max 90 - Blanc/Noir Taille 42",
        price: 75000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-412",
        sellerName: "SneakerZone",
        sellerRating: 4.7,
        description: "Nike Air Max 90 neuves.",
        category: "Mode & Beauté",
        rating: 4.8,
        reviewCount: 768
    },
    {
        id: "latest-13",
        title: "Appareil photo Canon EOS R6 Mark II Boîtier nu",
        price: 1450000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-413",
        sellerName: "PhotoPro",
        sellerRating: 4.9,
        description: "Canon EOS R6 Mark II neuf.",
        category: "Électronique",
        rating: 4.7,
        reviewCount: 892
    },
    {
        id: "latest-14",
        title: "TV Samsung 65 pouces QLED 4K Smart TV 2024",
        price: 680000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-414",
        sellerName: "ElectroShop",
        sellerRating: 4.6,
        description: "TV Samsung QLED 65 pouces neuve.",
        category: "Électronique",
        rating: 4.5,
        reviewCount: 1245
    },
    {
        id: "latest-15",
        title: "Robot aspirateur iRobot Roomba j9+ avec station",
        price: 420000,
        condition: "Brand New",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=1000&auto=format&fit=crop",
        sellerId: "seller-415",
        sellerName: "SmartHome",
        sellerRating: 4.7,
        description: "Robot aspirateur Roomba j9+ neuf.",
        category: "Maison & Jardin",
        rating: 4.3,
        reviewCount: 567
    }
];

export function getProductById(id: string) {
    return MOCK_PRODUCTS.find(p => p.id === id);
}
