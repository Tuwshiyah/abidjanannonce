"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { account } from "@/lib/appwrite";

type FavoritesContextType = {
    favorites: string[];
    toggleFavorite: (productId: string) => boolean; // returns true if needs login
    isFavorite: (productId: string) => boolean;
    isLoggedIn: boolean;
};

const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    toggleFavorite: () => false,
    isFavorite: () => false,
    isLoggedIn: false,
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("abidjan-favorites");
        if (stored) {
            try { setFavorites(JSON.parse(stored)); } catch { /* ignore */ }
        }
        setLoaded(true);

        // Check if user is logged in
        account.get()
            .then(() => setIsLoggedIn(true))
            .catch(() => setIsLoggedIn(false));
    }, []);

    useEffect(() => {
        if (loaded) {
            localStorage.setItem("abidjan-favorites", JSON.stringify(favorites));
        }
    }, [favorites, loaded]);

    const toggleFavorite = (productId: string): boolean => {
        if (!isLoggedIn) {
            return true; // needs login
        }
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
        return false;
    };

    const isFavorite = (productId: string) => favorites.includes(productId);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, isLoggedIn }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
