import { getSellerInfo, getSellerProducts, ALL_PRODUCTS } from "@/lib/data";
import { notFound } from "next/navigation";
import ProfilParticulierContent from "./ProfilParticulierContent";

export function generateStaticParams() {
    const sellerIds = [...new Set(ALL_PRODUCTS.map((p) => p.sellerId))];
    return sellerIds.map((id) => ({ id }));
}

export default async function ProfilPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const seller = getSellerInfo(id);
    if (!seller) notFound();

    const products = getSellerProducts(id);

    return <ProfilParticulierContent seller={seller} products={products} />;
}
