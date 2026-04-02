import Link from "next/link";
import "../publier.css";
import "../forfaits-choice.css";

const PLANS = [
    {
        id: "starter",
        name: "Starter",
        price: 7500,
        description: "Pour les entreprises qui se lancent",
        color: "#1E88E5",
        features: [
            "15 annonces actives",
            "8 photos par annonce",
            "Durée 60 jours",
            "Numéro visible",
            "3 crédits À la une / mois",
            "Badge PRO",
            "Page boutique",
            "WhatsApp Business",
            "Statistiques de base",
        ],
        missing: [
            "Vidéo",
            "Support prioritaire",
        ],
    },
    {
        id: "business",
        name: "Business",
        price: 18000,
        description: "La solution complète pour les pros",
        color: "#19335d",
        popular: true,
        features: [
            "40 annonces actives",
            "8 photos par annonce",
            "Durée 60 jours",
            "Numéro visible",
            "10 crédits À la une / mois",
            "Badge PRO",
            "Page boutique",
            "WhatsApp Business",
            "Statistiques avancées",
            "Vidéo incluse",
            "Support prioritaire + rapport PDF",
        ],
        missing: [],
    },
    {
        id: "expert",
        name: "Expert",
        price: 35000,
        description: "Pour les grandes entreprises",
        color: "#b8860b",
        features: [
            "Annonces illimitées",
            "8 photos par annonce",
            "Durée 60 jours",
            "Numéro visible",
            "25 crédits À la une / mois",
            "Badge PRO EXPERT doré",
            "Page boutique",
            "WhatsApp Business",
            "Statistiques avancées",
            "Vidéos illimitées",
            "Account manager dédié",
        ],
        missing: [],
    },
];

export default function PublierEntreprisePage() {
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
                        <span className="publier-topbar-current">Entreprise</span>
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
                    <h1>Choisissez votre forfait PRO</h1>
                    <p>Développez votre activité avec les outils professionnels d&apos;AbidjanAnnonce</p>
                </div>

                {/* Plans */}
                <div className="fc-grid fc-grid-3">
                    {PLANS.map((plan) => (
                        <div key={plan.id} className={`fc-card ${plan.popular ? "fc-card-popular" : ""}`}>
                            {plan.popular && <div className="fc-popular-tag">Populaire</div>}

                            <h3 style={{ color: plan.color }}>{plan.name}</h3>
                            <p className="fc-desc">{plan.description}</p>

                            <div className="fc-price">
                                <span className="fc-price-amount" style={{ color: plan.color }}>
                                    {plan.price.toLocaleString("fr-FR")}
                                </span>
                                <span className="fc-price-currency">FCFA<span className="fc-price-period"> /mois</span></span>
                            </div>

                            <Link
                                href="/publier/entreprise/inscription"
                                className="fc-cta"
                                style={{ background: plan.color }}
                            >
                                Choisir {plan.name}
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

                {/* Trust */}
                <div className="fc-trust">
                    <div className="fc-trust-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#43a047" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        Annulation à tout moment
                    </div>
                    <div className="fc-trust-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#43a047" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        Paiement sécurisé
                    </div>
                    <div className="fc-trust-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#43a047" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                        Wave · Orange Money · MTN · Visa
                    </div>
                </div>

                <div className="publier-bottom">
                    <p>Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link></p>
                    <p className="publier-bottom-secondary"><Link href="/forfaits">Voir le détail complet des forfaits</Link></p>
                </div>
            </div>
        </div>
    );
}
