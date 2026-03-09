import { ALL_PRODUCTS, getSellerInfo } from "@/lib/data";
import SellerProfileContent from "./SellerProfileContent";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    const sellerIds = [...new Set(ALL_PRODUCTS.map((p) => p.sellerId))];
    return sellerIds.map((id) => ({ id }));
}

export default async function SellerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const seller = getSellerInfo(id);

    if (!seller) {
        notFound();
    }

    return <SellerProfileContent seller={seller} />;
}
