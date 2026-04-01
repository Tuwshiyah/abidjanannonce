import Link from "next/link";
import SearchBar from "./SearchBar";
import CategoryMegaMenu from "./CategoryMegaMenu";
import "./header.css";

export default function Header() {
    return (
        <header className="site-header">
            {/* Top Navigation */}
            <div className="top-nav">
                <div className="container top-nav-container">
                    <ul className="top-nav-left">
                        <li>Bienvenue sur AbidjanAnnonce !</li>
                    </ul>
                    <ul className="top-nav-right">
                        <li>
                            <Link href="/connexion" className="top-nav-login">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                Se connecter
                            </Link>
                        </li>
                        <li className="top-nav-sep">|</li>
                        <li>
                            <Link href="/inscription" className="top-nav-register">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                                Inscription
                            </Link>
                        </li>
                        <li className="top-nav-sep">|</li>
                        <li>
                            <Link href="/tableau-de-bord" className="top-nav-link">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                                Mon espace
                            </Link>
                        </li>
                        <li>
                            <Link href="/forfaits" className="top-nav-link">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                Forfaits Pro
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Search Area */}
            <div className="main-header">
                <div className="container main-header-container">
                    <Link href="/" className="logo">
                        <span className="logo-abidjan">Abidjan</span>
                        <span className="logo-annonce">Annonce</span>
                    </Link>

                    <div className="main-header-search">
                        <SearchBar />
                    </div>

                    <div className="main-header-actions">
                        <Link href="/vendre" className="publish-btn">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Publier une annonce
                        </Link>
                    </div>
                </div>
            </div>

            {/* Category Mega Menu */}
            <CategoryMegaMenu />

            <div className="header-bottom-border"></div>
        </header>
    );
}
