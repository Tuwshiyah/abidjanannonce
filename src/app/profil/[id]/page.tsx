import { getSellerInfo, getSellerProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import ProfilParticulierContent from "./ProfilParticulierContent";

export default async function ProfilPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const seller = getSellerInfo(id);
    if (!seller) notFound();

    const products = getSellerProducts(id);

    return <ProfilParticulierContent seller={seller} products={products} />;
}
