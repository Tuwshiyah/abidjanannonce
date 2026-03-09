import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database & Collection IDs
export const DATABASE_ID = "babiannounce";
export const COLLECTIONS = {
    PRODUCTS: "products",
    SELLERS: "sellers",
    CATEGORIES: "categories",
    MESSAGES: "messages",
    REVIEWS: "reviews",
    FAVORITES: "favorites",
};
export const BUCKET_PRODUCT_IMAGES = "product-images";

export default client;
