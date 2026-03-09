import Link from "next/link";
import SearchCategoryPicker from "./SearchCategoryPicker";
import "./header.css";

export default function Header() {
    return (
        <header className="site-header">
            {/* Top Navigation */}
            <div className="top-nav">
                <div className="container top-nav-container">
                    <ul className="top-nav-left">
                        <li>Bonjour ! <Link href="/connexion">Connectez-vous</Link> ou <Link href="/inscription">inscrivez-vous</Link></li>
                    </ul>
                    <ul className="top-nav-right">
                        <li className="dropdown-link">
                            <Link href="/tableau-de-bord">Mon tableau de bord <span>&#711;</span></Link>
                        </li>
                        <li>
                            <button className="icon-btn" aria-label="Notifications">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                            </button>
                        </li>
                        <li>
                            <button className="icon-btn" aria-label="Cart">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Search Area */}
            <div className="main-header">
                <div className="container main-header-container">
                    <Link href="/" className="logo">
                        <span style={{ color: "var(--secondary)" }}>e</span>
                        <span style={{ color: "var(--primary)" }}>b</span>
                        <span style={{ color: "var(--accent-yellow)" }}>a</span>
                        <span style={{ color: "var(--accent-green)" }}>y</span>
                    </Link>

                    <div className="main-header-search">
                        <div className="search-container">
                            <div className="search-input-wrapper">
                                <span className="search-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </span>
                                <input type="text" placeholder="Rechercher sur LuxeBay" />
                                <SearchCategoryPicker />
                            </div>
                            <button className="search-button">Rechercher</button>
                        </div>
                    </div>

                    <div className="main-header-actions">
                        <Link href="/publier" className="publish-btn">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Publier une annonce
                        </Link>
                    </div>
                </div>
            </div>

            {/* Category Navigation */}
            <nav className="category-nav">
                <div className="container">
                    <ul>
                        <li><Link href="/annonces">Véhicules</Link></li>
                        <li><Link href="/annonces">Immobilier</Link></li>
                        <li><Link href="/annonces">Électronique</Link></li>
                        <li><Link href="/annonces">Mode &amp; Beauté</Link></li>
                        <li><Link href="/annonces">Maison &amp; Jardin</Link></li>
                        <li><Link href="/annonces">Emploi &amp; Services</Link></li>
                        <li><Link href="/annonces">Alimentation</Link></li>
                        <li><Link href="/annonces">Cours &amp; Formation</Link></li>
                        <li><Link href="/annonces">Loisirs</Link></li>
                        <li><Link href="/annonces">Animaux</Link></li>
                        <li><Link href="/annonces">Matériel Pro</Link></li>
                    </ul>
                </div>
            </nav>

            <div className="header-bottom-border"></div>
        </header >
    );
}
