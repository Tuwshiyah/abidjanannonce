import Link from "next/link";
import "./publier.css";

export default function PublierPage() {
    return (
        <div className="publier-page">
            {/* Minimal top bar */}
            <div className="publier-topbar">
                <Link href="/" className="publier-logo">
                    <span className="publier-logo-a">Abidjan</span>
                    <span className="publier-logo-b">Annonce</span>
                </Link>
                <Link href="/" className="publier-close-btn" aria-label="Fermer">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </Link>
            </div>

            {/* Main content */}
            <div className="publier-content">
                <div className="publier-header">
                    <h1>Publiez votre annonce</h1>
                    <p>Choisissez le type de compte qui correspond à votre activité pour commencer à vendre sur AbidjanAnnonce</p>
                </div>

                <div className="publier-grid">
                    {/* Particulier */}
                    <div className="publier-card">
                        <div className="publier-card-icon publier-icon-blue">
                            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="8" r="5" />
                                <path d="M20 21a8 8 0 0 0-16 0" />
                            </svg>
                        </div>

                        <h2>Particulier</h2>
                        <p className="publier-card-desc">Vous vendez des objets personnels ou cherchez des bonnes affaires</p>

                        <ul className="publier-perks">
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>5 annonces gratuites incluses</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>3 photos par annonce</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>Durée de publication : 30 jours</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>Numéro masqué pour votre sécurité</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>Messagerie intégrée</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>Boosts et options à la carte disponibles</span>
                            </li>
                        </ul>

                        <div className="publier-pricing">
                            <strong>Gratuit pour commencer</strong>
                            <span>Des options payantes pour booster vos annonces</span>
                        </div>

                        <Link href="/publier/particulier" className="publier-cta publier-cta-blue">
                            Continuer en tant que particulier
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><polyline points="12 5 19 12 12 19" /></svg>
                        </Link>
                    </div>

                    {/* Entreprise */}
                    <div className="publier-card publier-card-pro">
                        <div className="publier-pro-badge">Recommandé pour les pros</div>

                        <div className="publier-card-icon publier-icon-gold">
                            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="2" y="7" width="20" height="14" rx="3" />
                                <path d="M16 7V5a4 4 0 0 0-8 0v2" />
                                <circle cx="12" cy="14" r="2" />
                            </svg>
                        </div>

                        <h2>Entreprise <span className="publier-pro-label">PRO</span></h2>
                        <p className="publier-card-desc">Vous vendez de façon professionnelle et souhaitez développer votre activité</p>

                        <ul className="publier-perks">
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>Jusqu&apos;à 40+ annonces actives</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>8 photos par annonce</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>Badge PRO vérifié sur vos annonces</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>Page boutique personnalisée</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>Statistiques avancées et boosts inclus</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>WhatsApp Business intégré</span>
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>Support prioritaire</span>
                            </li>
                        </ul>

                        <div className="publier-pricing publier-pricing-pro">
                            <strong>À partir de 7 500 FCFA/mois</strong>
                            <span>Plusieurs forfaits selon vos besoins</span>
                        </div>

                        <Link href="/publier/entreprise" className="publier-cta publier-cta-gold">
                            Continuer en tant qu&apos;entreprise
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><polyline points="12 5 19 12 12 19" /></svg>
                        </Link>
                    </div>
                </div>

                {/* Bottom links */}
                <div className="publier-bottom">
                    <p>Vous avez déjà un compte ? <Link href="/connexion">Se connecter</Link></p>
                    <p className="publier-bottom-secondary"><Link href="/forfaits">Comparer tous les forfaits en détail</Link></p>
                </div>
            </div>
        </div>
    );
}
