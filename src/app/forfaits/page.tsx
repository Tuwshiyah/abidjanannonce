"use client";

import { useState } from "react";
import Link from "next/link";
import "./forfaits.css";

const PLANS = [
    {
        id: "gratuit",
        name: "Gratuit",
        price: 0,
        description: "Pour les particuliers qui débutent",
        color: "#6b7280",
        popular: false,
        features: [
            { label: "5 annonces actives", included: true },
            { label: "3 photos par annonce", included: true },
            { label: "Durée 30 jours", included: true },
            { label: "Numéro masqué", included: true },
            { label: "Crédits À la une", included: false },
            { label: "Badge PRO", included: false },
            { label: "Page boutique", included: false },
            { label: "WhatsApp Business", included: false },
            { label: "Statistiques", included: false },
            { label: "Vidéo", included: false },
            { label: "Support prioritaire", included: false },
        ],
    },
    {
        id: "starter",
        name: "Starter",
        price: 7500,
        description: "Pour les entreprises qui se lancent",
        color: "#1E88E5",
        popular: false,
        features: [
            { label: "15 annonces actives", included: true },
            { label: "10 photos par annonce", included: true },
            { label: "Durée 60 jours", included: true },
            { label: "Numéro visible", included: true },
            { label: "3 crédits À la une / mois", included: true },
            { label: "Badge PRO", included: true },
            { label: "Page boutique", included: true },
            { label: "WhatsApp Business", included: true },
            { label: "Statistiques de base", included: true },
            { label: "Vidéo", included: false },
            { label: "Support prioritaire", included: false },
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
            { label: "40 annonces actives", included: true },
            { label: "10 photos par annonce", included: true },
            { label: "Durée 60 jours", included: true },
            { label: "Numéro visible", included: true },
            { label: "10 crédits À la une / mois", included: true },
            { label: "Badge PRO", included: true },
            { label: "Page boutique", included: true },
            { label: "WhatsApp Business", included: true },
            { label: "Statistiques avancées", included: true },
            { label: "Vidéo incluse", included: true },
            { label: "Support prioritaire + rapport PDF", included: true },
        ],
    },
    {
        id: "expert",
        name: "Expert",
        price: 35000,
        description: "Pour les grandes entreprises",
        color: "#b8860b",
        popular: false,
        features: [
            { label: "Annonces illimitées", included: true },
            { label: "10 photos par annonce", included: true },
            { label: "Durée 60 jours", included: true },
            { label: "Numéro visible", included: true },
            { label: "25 crédits À la une / mois", included: true },
            { label: "Badge PRO EXPERT doré", included: true },
            { label: "Page boutique", included: true },
            { label: "WhatsApp Business", included: true },
            { label: "Statistiques avancées", included: true },
            { label: "Vidéos illimitées", included: true },
            { label: "Account manager dédié", included: true },
        ],
    },
];

const BOOST_TIERS = [
    { emoji: "🔴", label: "Haute Valeur", categories: "Immobilier · Véhicules · Matériel Pro", prices: [4000, 7000, 12000] },
    { emoji: "🟠", label: "Valeur Moyenne", categories: "Électronique · Électroménager · Maison", prices: [2500, 4500, 8000] },
    { emoji: "🟡", label: "Accessible", categories: "Mode · Enfant · Sports & Loisirs", prices: [1500, 2500, 4000] },
    { emoji: "🔵", label: "Emplois", categories: "Offres d'emploi (recruteur)", prices: [3000, 5000, 9000] },
    { emoji: "🔵", label: "Services", categories: "Services & Prestations", prices: [1500, 2500, 4000] },
    { emoji: "🟢", label: "Légère", categories: "Alimentation · Animaux", prices: [1000, 1750, 3000] },
];

const ALACARTE = [
    { icon: "↑", label: "Remonter l'annonce", desc: "Repasse en tête de liste", price: 300 },
    { icon: "🔴", label: "Badge URGENT (7j)", desc: "Badge rouge visible 7 jours", price: 500 },
    { icon: "🎬", label: "Ajouter une vidéo", desc: "Vidéo intégrée à l'annonce", price: 1000 },
    { icon: "📅", label: "Prolonger 15 jours", desc: "Prolonge la durée de l'annonce", price: 500 },
    { icon: "📦", label: "Pack 5 remontées", desc: "5 remontées à utiliser quand vous voulez", price: 1200 },
];

const PACKS = [
    { name: "Pack Starter", price: 5000, discount: "-20%", contents: ["2 À la une 7j (cat. standard)", "5 remontées"] },
    { name: "Pack Pro", price: 10000, discount: "-25%", contents: ["1 À la une 14j (immo/véhicule)", "10 remontées", "1 vidéo"] },
    { name: "Pack Expert", price: 20000, discount: "-30%", contents: ["3 À la une 14j", "20 remontées", "3 vidéos"] },
];

const DURATIONS = [
    { label: "Mensuel", multiplier: 1 },
    { label: "3 mois", multiplier: 2.7, save: "10%" },
    { label: "6 mois", multiplier: 5, save: "17%" },
];

const FAQS = [
    { q: "Comment fonctionne le boost À la une ?", a: "Le boost place votre annonce dans la section « Annonces à la une » de la page d'accueil et en tête des résultats de sa catégorie. Le badge PREMIUM est affiché sur la card. Disponible pour particuliers et entreprises." },
    { q: "Puis-je changer de forfait ?", a: "Oui, vous pouvez passer à un forfait supérieur à tout moment. Le montant restant sera déduit du nouveau prix. Le downgrade prend effet à la fin de la période." },
    { q: "Les crédits À la une sont-ils reportables ?", a: "Non, les crédits d'abonnement mensuel expirent au renouvellement. Par contre, les crédits achetés via les Packs n'expirent jamais." },
    { q: "Comment payer ?", a: "Nous acceptons Wave (prioritaire), Orange Money, MTN Mobile Money et les cartes bancaires Visa/Mastercard. Le paiement est sécurisé et instantané." },
    { q: "Que se passe-t-il si mon abonnement expire ?", a: "Vos annonces restent actives mais perdent les avantages PRO (badge, boutique, stats). Le badge PRO est révoqué automatiquement. Vous pouvez réactiver à tout moment." },
    { q: "Les demandes d'emploi sont-elles payantes ?", a: "Non, les demandes d'emploi et CV de particuliers sont toujours gratuits. Seules les offres d'emploi (publiées par les entreprises) sont soumises au boost payant." },
];

export default function ForfaitsPage() {
    const [duration, setDuration] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="forfaits-page">
            {/* Hero */}
            <div className="forfaits-hero">
                <div className="forfaits-hero-inner">
                    <span className="forfaits-hero-badge">Vendeur Pro</span>
                    <h1>Vendez plus,<br />vendez <span className="forfaits-hero-accent">mieux</span></h1>
                    <p>Choisissez le forfait adapté à vos besoins et boostez vos ventes sur AbidjanAnnonce.</p>
                    <div className="forfaits-hero-trust">
                        <div className="forfaits-trust-item">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#43a047" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            Annulation à tout moment
                        </div>
                        <div className="forfaits-trust-item">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#43a047" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            Paiement sécurisé
                        </div>
                    </div>
                </div>
            </div>

            {/* Duration Toggle */}
            <div className="forfaits-duration-wrapper">
                <div className="forfaits-duration">
                    {DURATIONS.map((d, i) => (
                        <button key={d.label} className={`duration-btn ${duration === i ? "duration-btn-active" : ""}`} onClick={() => setDuration(i)}>
                            {d.label}
                            {d.save && <span className="duration-save">-{d.save}</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* ====== SECTION 1: Plans ====== */}
            <div className="forfaits-grid">
                {PLANS.map((plan) => {
                    const price = plan.price === 0 ? 0 : Math.round(plan.price * DURATIONS[duration].multiplier);
                    const monthlyPrice = plan.price === 0 ? 0 : Math.round(price / (duration === 0 ? 1 : duration === 1 ? 3 : 6));
                    return (
                        <div key={plan.id} className={`forfait-card ${plan.popular ? "forfait-card-popular" : ""}`}>
                            {plan.popular && <div className="forfait-popular-tag">Populaire</div>}
                            <h3 style={{ color: plan.color }}>{plan.name}</h3>
                            <p className="forfait-desc">{plan.description}</p>
                            <div className="forfait-price">
                                {price === 0 ? (
                                    <span className="forfait-price-amount">Gratuit</span>
                                ) : (
                                    <>
                                        <span className="forfait-price-amount" style={{ color: plan.color }}>{price.toLocaleString("fr-FR")}</span>
                                        <span className="forfait-price-currency">FCFA</span>
                                    </>
                                )}
                                {price > 0 && duration > 0 && <span className="forfait-price-monthly">soit {monthlyPrice.toLocaleString("fr-FR")} FCFA/mois</span>}
                                {price > 0 && duration === 0 && <span className="forfait-price-period">par mois</span>}
                            </div>
                            <button className={`forfait-cta ${plan.price === 0 ? "forfait-cta-free" : ""}`} style={plan.price > 0 ? { background: plan.color } : {}}>
                                {plan.price === 0 ? "Plan actuel" : "Choisir ce forfait"}
                            </button>
                            <div className="forfait-divider" />
                            <ul className="forfait-features">
                                {plan.features.map((f) => (
                                    <li key={f.label} className={!f.included ? "forfait-feature-disabled" : ""}>
                                        {f.included ? (
                                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d0d0d0" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        )}
                                        <span>{f.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* ====== SECTION 2: Boost Premium ====== */}
            <section className="forfaits-section">
                <div className="forfaits-section-header">
                    <h2>Boost Premium — Annonces À la une</h2>
                    <p>Placez votre annonce en tête avec le badge PREMIUM. Tarifs selon la catégorie.</p>
                </div>

                <div className="boost-includes">
                    <div className="boost-includes-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ea8846" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        Badge PREMIUM sur l&apos;annonce
                    </div>
                    <div className="boost-includes-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ea8846" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>
                        Section « À la une » en page d&apos;accueil
                    </div>
                    <div className="boost-includes-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ea8846" strokeWidth="2"><path d="M4 12h16M12 4v16" /></svg>
                        Épinglée en haut de sa catégorie
                    </div>
                    <div className="boost-includes-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ea8846" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                        10 photos au lieu de 3
                    </div>
                    <div className="boost-includes-item">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ea8846" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        Statistiques de vues
                    </div>
                </div>

                <div className="boost-table-wrapper">
                    <table className="boost-table">
                        <thead>
                            <tr>
                                <th>Catégorie</th>
                                <th>7 jours</th>
                                <th>14 jours</th>
                                <th>30 jours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BOOST_TIERS.map((tier) => (
                                <tr key={tier.label}>
                                    <td>
                                        <span className="boost-tier-emoji">{tier.emoji}</span>
                                        <div>
                                            <strong>{tier.label}</strong>
                                            <span className="boost-tier-cats">{tier.categories}</span>
                                        </div>
                                    </td>
                                    {tier.prices.map((p, i) => (
                                        <td key={i} className="boost-price-cell">{p.toLocaleString("fr-FR")} FCFA</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ====== SECTION 3: Options À la carte ====== */}
            <section className="forfaits-section">
                <div className="forfaits-section-header">
                    <h2>Options à la carte</h2>
                    <p>Boostez vos annonces individuellement, disponible pour tous les profils.</p>
                </div>
                <div className="alacarte-grid">
                    {ALACARTE.map((opt) => (
                        <div key={opt.label} className="alacarte-card">
                            <span className="alacarte-icon">{opt.icon}</span>
                            <div className="alacarte-info">
                                <strong>{opt.label}</strong>
                                <span>{opt.desc}</span>
                            </div>
                            <span className="alacarte-price">{opt.price.toLocaleString("fr-FR")} FCFA</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ====== SECTION 4: Packs de Boosts ====== */}
            <section className="forfaits-section">
                <div className="forfaits-section-header">
                    <h2>Packs de Boosts</h2>
                    <p>Économisez avec nos packs. Les crédits de packs n&apos;expirent jamais.</p>
                </div>
                <div className="packs-grid">
                    {PACKS.map((pack) => (
                        <div key={pack.name} className="pack-card">
                            <div className="pack-discount">{pack.discount}</div>
                            <h3>{pack.name}</h3>
                            <div className="pack-price">{pack.price.toLocaleString("fr-FR")} <span>FCFA</span></div>
                            <ul>
                                {pack.contents.map((c) => (
                                    <li key={c}>
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                            <button className="pack-cta">Acheter</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ====== SECTION 5: Moyens de paiement ====== */}
            <section className="forfaits-section forfaits-section-center">
                <h2>Moyens de paiement acceptés</h2>
                <div className="payments-grid">
                    <div className="payment-card payment-card-priority">
                        <span className="payment-emoji">📱</span>
                        <strong>Wave</strong>
                        <span className="payment-priority-tag">Prioritaire</span>
                    </div>
                    <div className="payment-card">
                        <span className="payment-emoji">🟠</span>
                        <strong>Orange Money</strong>
                    </div>
                    <div className="payment-card">
                        <span className="payment-emoji">🟡</span>
                        <strong>MTN Mobile Money</strong>
                    </div>
                    <div className="payment-card">
                        <span className="payment-emoji">💳</span>
                        <strong>Visa / Mastercard</strong>
                    </div>
                </div>
            </section>

            {/* ====== SECTION 6: FAQ ====== */}
            <section className="forfaits-section">
                <div className="forfaits-section-header">
                    <h2>Questions fréquentes</h2>
                </div>
                <div className="faq-list">
                    {FAQS.map((faq, i) => (
                        <div key={i} className={`faq-item ${openFaq === i ? "faq-item-open" : ""}`}>
                            <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                <span>{faq.q}</span>
                                <svg className={`faq-chevron ${openFaq === i ? "faq-chevron-open" : ""}`} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                            </button>
                            {openFaq === i && <div className="faq-answer"><p>{faq.a}</p></div>}
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <div className="forfaits-bottom-cta">
                <div className="forfaits-bottom-inner">
                    <h3>Besoin d&apos;un forfait sur mesure ?</h3>
                    <p>Notre équipe commerciale peut créer un forfait adapté à votre entreprise.</p>
                    <div className="forfaits-bottom-actions">
                        <Link href="/contact" className="forfaits-contact-btn">Nous contacter</Link>
                        <span className="forfaits-bottom-or">ou appelez le <strong>+225 07 00 00 00 00</strong></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
