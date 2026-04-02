import Link from "next/link";
import "../publier.css";
import "../forfaits-choice.css";

const PLANS = [
    {
        id: "gratuit",
        name: "Gratuit",
        price: 0,
        description: "Pour débuter et tester la plateforme",
        color: "#6b7280",
        features: [
            "5 annonces actives",
            "3 photos par annonce",
            "Durée 30 jours",
            "Numéro masqué",
            "Messagerie intégrée",
        ],
        missing: [
            "Boosts À la une",
            "Badge urgent",
            "Vidéo",
        ],
    },
    {
        id: "boost-7",
        name: "Boost 7 jours",
        price: 1500,
        description: "Placez votre annonce À la une pendant 7 jours",
        color: "#1E88E5",
        popular: true,
        features: [
            "Badge PREMIUM sur l'annonce",
            "Affiché en page d'accueil",
            "Épinglé en haut de la catégorie",
            "8 photos au lieu de 3",
            "Statistiques de vues",
        ],
        missing: [],
    },
    {
        id: "boost-14",
        name: "Boost 14 jours",
        price: 2500,
        description: "2 semaines de visibilité maximale",
        color: "#19335d",
        features: [
            "Badge PREMIUM sur l'annonce",
            "Affiché en page d'accueil",
            "Épinglé en haut de la catégorie",
            "8 photos au lieu de 3",
            "Statistiques de vues",
            "Remontée automatique à mi-parcours",
        ],
        missing: [],
    },
    {
        id: "boost-30",
        name: "Boost 30 jours",
        price: 4000,
        description: "Un mois complet de visibilité premium",
        color: "#b8860b",
        features: [
            "Badge PREMIUM sur l'annonce",
            "Affiché en page d'accueil",
            "Épinglé en haut de la catégorie",
            "8 photos au lieu de 3",
            "Statistiques de vues",
            "3 remontées automatiques",
        ],
        missing: [],
    },
];

const OPTIONS = [
    { label: "Remonter l'annonce", price: 300 },
    { label: "Badge URGENT (7j)", price: 500 },
    { label: "Ajouter une vidéo", price: 1000 },
    { label: "Prolonger 15 jours", price: 500 },
];

export default function PublierParticulierPage() {
    return (
        <div className="publier-page">
            <div className="publier-topbar">
                <div className="publier-topbar-left">
                    <Link href="/" className="publier-logo">
                        <span className="publier-logo-a">Abidjan</span>
                        <span className="publier-logo-b">Annonce</span>
                    </Link>
                    <nav className="publier-topbar-breadcrumb">
                        <span className="publier-topbar-sep">/</span>
                        <Link href="/publier">Publier</Link>
                        <span className="publier-topbar-sep">/</span>
                        <span className="publier-topbar-current">Particulier</span>
                    </nav>
                </div>
                <Link href="/publier" className="publier-close-btn" aria-label="Retour">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </Link>
            </div>

            <div className="publier-content">
                <div className="publier-header">
                    <h1>Choisissez votre formule</h1>
                    <p>Publiez gratuitement ou boostez vos annonces pour vendre plus vite</p>
                </div>

                {/* Plans */}
                <div className="fc-grid">
                    {PLANS.map((plan) => (
                        <div key={plan.id} className={`fc-card ${plan.popular ? "fc-card-popular" : ""}`}>
                            {plan.popular && <div className="fc-popular-tag">Le plus choisi</div>}

                            <h3 style={{ color: plan.color }}>{plan.name}</h3>
                            <p className="fc-desc">{plan.description}</p>

                            <div className="fc-price">
                                {plan.price === 0 ? (
                                    <span className="fc-price-amount">Gratuit</span>
                                ) : (
                                    <>
                                        <span className="fc-price-amount" style={{ color: plan.color }}>
                                            {plan.price.toLocaleString("fr-FR")}
                                        </span>
                                        <span className="fc-price-currency">FCFA</span>
                                    </>
                                )}
                            </div>

                            <Link
                                href="/publier/particulier/inscription"
                                className="fc-cta"
                                style={plan.price > 0 ? { background: plan.color } : {}}
                            >
                                {plan.price === 0 ? "Commencer gratuitement" : "Choisir cette formule"}
                            </Link>

                            <div className="fc-divider" />

                            <ul className="fc-features">
                                {plan.features.map((f) => (
                                    <li key={f}>
                                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        {f}
                                    </li>
                                ))}
                                {plan.missing.map((f) => (
                                    <li key={f} className="fc-feature-disabled">
                                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#d0d0d0" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Options à la carte */}
                <div className="fc-options-section">
                    <h2>Options à la carte</h2>
                    <p>Ajoutez ces options à n&apos;importe quelle annonce</p>
                    <div className="fc-options">
                        {OPTIONS.map((opt) => (
                            <div key={opt.label} className="fc-option">
                                <span>{opt.label}</span>
                                <strong>{opt.price.toLocaleString("fr-FR")} FCFA</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="publier-bottom">
                    <p>Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link></p>
                </div>
            </div>
        </div>
    );
}
