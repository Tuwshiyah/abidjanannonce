import Link from "next/link";
import "./footer.css";

export default function Footer() {
    return (
        <footer className="site-footer">
            {/* Top CTA Banner */}
            <div className="footer-cta">
                <div className="container footer-cta-inner">
                    <div className="footer-cta-text">
                        <h3>Prêt à vendre ?</h3>
                        <p>Publiez votre annonce gratuitement et touchez des milliers d&apos;acheteurs à Abidjan.</p>
                    </div>
                    <Link href="/vendre" className="footer-cta-btn">
                        Publier une annonce
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </Link>
                </div>
            </div>

            {/* Main Footer */}
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Brand Column */}
                        <div className="footer-brand">
                            <Link href="/" className="footer-logo">
                                <span className="footer-logo-a">Abidjan</span>
                                <span className="footer-logo-b">Annonce</span>
                            </Link>
                            <p className="footer-tagline">La première plateforme de petites annonces en Côte d&apos;Ivoire. Achetez et vendez facilement près de chez vous.</p>
                            <div className="footer-socials">
                                <a href="#" aria-label="Facebook" className="footer-social">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                                </a>
                                <a href="#" aria-label="Instagram" className="footer-social">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                                </a>
                                <a href="#" aria-label="TikTok" className="footer-social">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.16 8.16 0 005.58 2.18V11.7a4.84 4.84 0 01-3.59-1.42V6.69h3.59z" /></svg>
                                </a>
                                <a href="#" aria-label="WhatsApp" className="footer-social footer-social-wa">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="footer-col">
                            <h4>Explorer</h4>
                            <ul>
                                <li><Link href="/annonces">Toutes les annonces</Link></li>
                                <li><Link href="/categories">Catégories</Link></li>
                                <li><Link href="/vendre">Déposer une annonce</Link></li>
                                <li><Link href="/forfaits">Forfaits Pro</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Mon compte</h4>
                            <ul>
                                <li><Link href="/connexion">Connexion</Link></li>
                                <li><Link href="/inscription">Inscription</Link></li>
                                <li><Link href="/tableau-de-bord">Tableau de bord</Link></li>
                                <li><a href="#">Mes favoris</a></li>
                                <li><a href="#">Mes messages</a></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Informations</h4>
                            <ul>
                                <li><a href="#">Qui sommes-nous</a></li>
                                <li><a href="#">Comment ça marche</a></li>
                                <li><a href="#">Conseils de sécurité</a></li>
                                <li><a href="#">Centre d&apos;aide</a></li>
                                <li><Link href="/contact">Nous contacter</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Légal</h4>
                            <ul>
                                <li><a href="#">Conditions d&apos;utilisation</a></li>
                                <li><a href="#">Politique de confidentialité</a></li>
                                <li><a href="#">Mentions légales</a></li>
                                <li><a href="#">Signaler une annonce</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p>&copy; 2026 AbidjanAnnonce. Tous droits réservés.</p>
                    <div className="footer-payments">
                        <span>Paiements acceptés :</span>
                        <span className="footer-payment-badge">Orange Money</span>
                        <span className="footer-payment-badge">MTN</span>
                        <span className="footer-payment-badge">Wave</span>
                        <span className="footer-payment-badge">Moov</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
