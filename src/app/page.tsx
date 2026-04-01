import Link from "next/link";
import { MOCK_PRODUCTS, LATEST_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import AnnonceCarousel from "@/components/AnnonceCarousel";
import HeroSlider from "@/components/HeroSlider";
import { CategoryIcons } from "@/components/CategoryIcons";
import "./home.css";

export default function Home() {
  return (
    <div className="home-page container">

      {/* Hero Slider */}
      <HeroSlider />

      {/* Category Section */}
      <section className="category-carousel-section">
        <h2>Explorer les catégories</h2>
        <div className="category-carousel">
          {[
            { name: "Véhicules", key: "vehicules", borderColor: "#E53935", iconColor: "#C62828" },
            { name: "Immobilier", key: "immobilier", borderColor: "#1E88E5", iconColor: "#1565C0" },
            { name: "Électronique", key: "electronique", borderColor: "#43A047", iconColor: "#2E7D32" },
            { name: "Mode & Beauté", key: "mode", borderColor: "#FFB300", iconColor: "#E65100" },
            { name: "Pour la maison", key: "maison", borderColor: "#8E24AA", iconColor: "#6A1B9A" },
            { name: "Emplois", key: "emploi", borderColor: "#1E88E5", iconColor: "#1565C0" },
            { name: "Services", key: "services", borderColor: "#00897B", iconColor: "#00695C" },
            { name: "Alimentation", key: "alimentation", borderColor: "#43A047", iconColor: "#2E7D32" },
            { name: "Sports & Loisirs", key: "loisirs", borderColor: "#E53935", iconColor: "#C62828" },
            { name: "Animaux", key: "animaux", borderColor: "#1E88E5", iconColor: "#1565C0" },
            { name: "Matériel Pro", key: "pro", borderColor: "#43A047", iconColor: "#2E7D32" },
            { name: "Électroménager", key: "electromenager", borderColor: "#FFB300", iconColor: "#E65100" },
          ].map((cat) => (
            <Link key={cat.name} href={`/categorie/${cat.key}`} className="category-item">
              <div className="category-circle" style={{ borderColor: cat.borderColor, color: cat.iconColor }}>
                {CategoryIcons[cat.key]}
              </div>
              <span className="category-label">{cat.name}</span>
            </Link>
          ))}
          <Link href="/categories" className="category-item">
            <div className="category-circle" style={{ borderColor: "#888", background: "#eee" }}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#555" strokeWidth="2">
                <circle cx="5" cy="5" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                <circle cx="5" cy="19" r="2" /><circle cx="12" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
              </svg>
            </div>
            <span className="category-label">Tout voir</span>
          </Link>
        </div>
      </section>

      {/* Annonces à la une */}
      <AnnonceCarousel products={MOCK_PRODUCTS} />

      {/* Dernières annonces publiées */}
      <section className="latest-section">
        <div className="latest-header">
          <h2>Dernières annonces publiées</h2>
        </div>
        <div className="latest-grid">
          {LATEST_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} showBadge={false} />
          ))}
        </div>
        <div className="latest-footer">
          <Link href="/annonces" className="voir-tout-btn">Voir toutes les annonces</Link>
        </div>
      </section>

    </div>
  );
}
