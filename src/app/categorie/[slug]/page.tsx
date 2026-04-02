import { CATEGORIES } from "@/lib/categories";
import CategorieContent from "./CategorieContent";

export function generateStaticParams() {
    return CATEGORIES.map((cat) => ({ slug: cat.value }));
}

export default async function CategoriePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <CategorieContent slug={slug} />;
}
