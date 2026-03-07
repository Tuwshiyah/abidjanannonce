"use client";

import { useState } from 'react';
import Link from 'next/link';
import './vendre.css';

export default function VendrePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            // Redirect after success
            setTimeout(() => {
                window.location.href = '/tableau-de-bord';
            }, 2000);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="vendre-page container">
                <div className="success-container glass-panel animate-fade-in">
                    <div className="success-icon-large">✓</div>
                    <h2>Annonce publiée avec succès !</h2>
                    <p>Votre article est maintenant visible par les acheteurs sur LuxeBay.</p>
                    <p className="redirect-text">Redirection vers votre tableau de bord...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="vendre-page container animate-fade-in">
            <div className="vendre-header">
                <h1>Mettre en vente un objet</h1>
                <p>Remplissez les détails ci-dessous pour créer votre annonce sur LuxeBay.</p>
            </div>

            <div className="vendre-content glass-panel">
                <form onSubmit={handleSubmit} className="vendre-form">

                    {/* Section 1: Basic Info */}
                    <section className="form-section">
                        <h3>Détails de l&apos;article</h3>

                        <div className="form-group">
                            <label htmlFor="title">Titre de l&apos;annonce *</label>
                            <input type="text" id="title" required placeholder="Ex: Apple MacBook Pro 16 pouces M3 Max (2023)" />
                            <span className="input-hint">Un titre clair et précis aide les acheteurs à trouver votre objet.</span>
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label htmlFor="category">Catégorie *</label>
                                <select id="category" required>
                                    <option value="">Sélectionnez une catégorie...</option>
                                    <option value="vehicules">Véhicules</option>
                                    <option value="immobilier">Immobilier</option>
                                    <option value="electronique">Électronique & Informatique</option>
                                    <option value="mode">Mode & Beauté</option>
                                    <option value="maison">Maison & Jardin</option>
                                    <option value="emploi">Emploi & Services</option>
                                    <option value="alimentation">Alimentation & Agriculture</option>
                                    <option value="cours">Cours & Formation</option>
                                    <option value="loisirs">Loisirs & Divertissement</option>
                                    <option value="animaux">Animaux</option>
                                    <option value="pro">Matériel Professionnel & BTP</option>
                                    <option value="affaires">Opportunités d&apos;affaires</option>
                                </select>
                            </div>
                            <div className="form-group half">
                                <label htmlFor="condition">État de l&apos;objet *</label>
                                <select id="condition" required>
                                    <option value="">Sélectionnez l&apos;état...</option>
                                    <option value="new">Neuf</option>
                                    <option value="like-new">Comme neuf (Reconditionné)</option>
                                    <option value="used-excellent">Occasion - Excellent état</option>
                                    <option value="used-good">Occasion - Bon état</option>
                                    <option value="used-fair">Occasion - État correct</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Photos */}
                    <section className="form-section">
                        <h3>Photos</h3>
                        <p className="section-desc">Ajoutez des photos de qualité. Les annonces avec de bonnes photos se vendent plus vite.</p>

                        <div className="photo-upload-area">
                            <div className="upload-placeholder">
                                <span className="upload-icon">+</span>
                                <span>Ajouter des photos</span>
                                <span className="upload-hint">Glissez-déposez ou cliquez (Max 12 photos)</span>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Description & Price */}
                    <section className="form-section">
                        <h3>Description et Prix</h3>

                        <div className="form-group">
                            <label htmlFor="description">Description détaillée *</label>
                            <textarea
                                id="description"
                                required
                                rows={6}
                                placeholder="Décrivez l'objet en détail, précisez d'éventuels défauts, les accessoires inclus..."
                            />
                        </div>

                        <div className="form-group price-group">
                            <label htmlFor="price">Prix demandé *</label>
                            <div className="price-input-wrapper">
                                <span className="currency-symbol">€</span>
                                <input type="number" id="price" required min="1" step="0.01" placeholder="0.00" />
                            </div>
                            <span className="input-hint">Puisqu&apos;il n&apos;y a pas de paiement en ligne, vous fixez le prix et négociez directement avec l&apos;acheteur.</span>
                        </div>
                    </section>

                    {/* Submit Area */}
                    <div className="form-actions-footer">
                        <Link href="/" className="cancel-link">Annuler</Link>
                        <button type="submit" className="primary-btn submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Publication en cours...' : 'Publier l\'annonce'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
