import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/lib/data';
import './dashboard.css';

export default function TableauDeBordPage() {
    // Simulate finding products belonging to the logged-in seller
    // For the UI, we just grab a few mock products
    const sellerListings = MOCK_PRODUCTS.slice(3, 5);

    return (
        <div className="dashboard-page container animate-fade-in">
            <div className="dashboard-header">
                <div>
                    <h1>Mon Tableau de Bord</h1>
                    <p className="dashboard-subtitle">Gérez vos annonces et vos messages.</p>
                </div>
                <Link href="/vendre" className="primary-btn shrink-btn">
                    + Nouvelle Annonce
                </Link>
            </div>

            <div className="dashboard-grid">

                {/* Sidebar Navigation */}
                <aside className="dashboard-sidebar">
                    <nav className="sidebar-nav glass-panel">
                        <ul>
                            <li className="active"><a href="#">Vue d&apos;ensemble</a></li>
                            <li><a href="#">Mes annonces (2)</a></li>
                            <li><a href="#">Brouillons (0)</a></li>
                            <li><a href="#">Terminées (14)</a></li>
                            <li className="nav-divider"></li>
                            <li><a href="#">Messages & Contacts (3)</a></li>
                            <li><a href="#">Évaluations</a></li>
                            <li><a href="#">Paramètres du compte</a></li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="dashboard-content">

                    {/* Stats Row */}
                    <div className="stats-row">
                        <div className="stat-card glass-panel">
                            <h3>Ventes sur 90 jours</h3>
                            <div className="stat-value">3 450,00 €</div>
                            <span className="stat-trend positive">↑ +12%</span>
                        </div>
                        <div className="stat-card glass-panel">
                            <h3>Vues (30j)</h3>
                            <div className="stat-value">1 248</div>
                            <span className="stat-trend positive">↑ +5%</span>
                        </div>
                        <div className="stat-card glass-panel">
                            <h3>Évaluation</h3>
                            <div className="stat-value">100%</div>
                            <span className="stat-subtitle">Positif (42 avis)</span>
                        </div>
                    </div>

                    {/* Listings Table */}
                    <div className="listings-section glass-panel">
                        <div className="section-header">
                            <h2>Annonces en cours</h2>
                            <button className="secondary-btn">Voir tout</button>
                        </div>

                        <div className="listings-list">
                            {sellerListings.map(product => (
                                <div key={product.id} className="listing-item">
                                    <div className="listing-image">
                                        <img src={product.imageUrl} alt={product.title} />
                                    </div>
                                    <div className="listing-details">
                                        <Link href={`/product/${product.id}`} className="listing-title">
                                            {product.title}
                                        </Link>
                                        <div className="listing-meta">
                                            <span>N° d&apos;objet: {123456789000 + (parseInt(product.id.replace(/\D/g, '') || '0'))}</span>
                                            <span>•</span>
                                            <span className="condition-tag">{product.condition}</span>
                                        </div>
                                    </div>
                                    <div className="listing-stats">
                                        <div className="stat-cell">
                                            <span className="stat-label">Prix</span>
                                            <span className="stat-num">{product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                                        </div>
                                        <div className="stat-cell">
                                            <span className="stat-label">Vues</span>
                                            <span className="stat-num">{24 * (parseInt(product.id.replace(/\D/g, '') || '1'))}</span>
                                        </div>
                                        <div className="stat-cell">
                                            <span className="stat-label">Suivis</span>
                                            <span className="stat-num">{3 * (parseInt(product.id.replace(/\D/g, '') || '1'))}</span>
                                        </div>
                                    </div>
                                    <div className="listing-actions">
                                        <button className="action-btn">Modifier</button>
                                        <button className="action-btn">Terminer</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Messages */}
                    <div className="messages-section glass-panel">
                        <div className="section-header">
                            <h2>Derniers messages</h2>
                        </div>
                        <div className="message-list">
                            <div className="message-item unread">
                                <div className="msg-avatar">JL</div>
                                <div className="msg-content">
                                    <div className="msg-header">
                                        <span className="msg-sender">Jean_Luc_75</span>
                                        <span className="msg-time">Il y a 2 heures</span>
                                    </div>
                                    <div className="msg-subject">Objet : {sellerListings[0].title}</div>
                                    <p className="msg-preview">Bonjour, est-ce que le prix est négociable si je viens le chercher ?</p>
                                </div>
                            </div>
                            <div className="message-item">
                                <div className="msg-avatar">MC</div>
                                <div className="msg-content">
                                    <div className="msg-header">
                                        <span className="msg-sender">MarieCaro</span>
                                        <span className="msg-time">Hier</span>
                                    </div>
                                    <div className="msg-subject">Objet : {sellerListings[1].title}</div>
                                    <p className="msg-preview">Merci pour votre réponse rapide, je regarde ça ce soir.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
