import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/ProductDetailPage";
import { ALL_PRODUCTS, getProductById } from "@/lib/data";

export function generateStaticParams() {
    return ALL_PRODUCTS.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    const similarProducts = ALL_PRODUCTS.filter(
        (item) => item.id !== product.id && item.category === product.category,
    ).slice(0, 5);

    return <ProductDetailPage product={product} similarProducts={similarProducts} />;
}
