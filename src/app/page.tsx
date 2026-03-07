import Link from "next/link";
import { MOCK_PRODUCTS, LATEST_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import AnnonceCarousel from "@/components/AnnonceCarousel";
import { CategoryIcons } from "@/components/CategoryIcons";
import "./home.css";

export default function Home() {
  return (
    <div className="home-page container">

      {/* Hero Banner Area */}
      <section className="hero-banner">
        <div className="hero-banner-content">
          <h1>Jusqu&apos;à -50% sur le reconditionné LuxeBay</h1>
          <p>Obtenez des appareils restaurés par des experts avec une garantie d&apos;un ou deux ans.</p>
          <button className="banner-btn">Voir les offres</button>
        </div>
        <div className="hero-banner-grid">
          {MOCK_PRODUCTS.slice(0, 8).map((p, i) => (
            <div key={i} className="grid-item">
              <img src={p.imageUrl} alt={p.title} />
            </div>
          ))}
        </div>
      </section>

      {/* Category Section */}
      <section className="category-carousel-section">
        <h2>Explorer les catégories</h2>
        <div className="category-carousel">
          {[
            { name: "Véhicules", key: "vehicules", borderColor: "#E53935", iconColor: "#C62828" },
            { name: "Immobilier", key: "immobilier", borderColor: "#1E88E5", iconColor: "#1565C0" },
            { name: "Électronique", key: "electronique", borderColor: "#43A047", iconColor: "#2E7D32" },
            { name: "Mode & Beauté", key: "mode", borderColor: "#FFB300", iconColor: "#E65100" },
            { name: "Maison & Jardin", key: "maison", borderColor: "#E53935", iconColor: "#C62828" },
            { name: "Emploi & Services", key: "emploi", borderColor: "#1E88E5", iconColor: "#1565C0" },
            { name: "Alimentation", key: "alimentation", borderColor: "#43A047", iconColor: "#2E7D32" },
            { name: "Cours & Formation", key: "cours", borderColor: "#FFB300", iconColor: "#E65100" },
            { name: "Loisirs", key: "loisirs", borderColor: "#E53935", iconColor: "#C62828" },
            { name: "Animaux", key: "animaux", borderColor: "#1E88E5", iconColor: "#1565C0" },
            { name: "Matériel Pro", key: "pro", borderColor: "#43A047", iconColor: "#2E7D32" },
            { name: "Affaires", key: "affaires", borderColor: "#FFB300", iconColor: "#E65100" },
          ].map((cat) => (
            <div key={cat.name} className="category-item">
              <div className="category-circle" style={{ borderColor: cat.borderColor, color: cat.iconColor }}>
                {CategoryIcons[cat.key]}
              </div>
              <span className="category-label">{cat.name}</span>
            </div>
          ))}
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
          {LATEST_PRODUCTS.map((product, index) => (
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
