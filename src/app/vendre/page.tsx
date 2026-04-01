"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { account } from "@/lib/appwrite";
import { CATEGORIES } from "@/lib/categories";
import { CategoryIcons } from "@/components/CategoryIcons";
import "./vendre.css";

const VILLES = [
    "Abidjan - Cocody",
    "Abidjan - Plateau",
    "Abidjan - Marcory",
    "Abidjan - Treichville",
    "Abidjan - Yopougon",
    "Abidjan - Abobo",
    "Abidjan - Adjamé",
    "Abidjan - Koumassi",
    "Abidjan - Port-Bouët",
    "Abidjan - Attécoubé",
    "Abidjan - Bingerville",
    "Abidjan - Songon",
    "Yamoussoukro",
    "Bouaké",
    "San-Pédro",
    "Daloa",
    "Korhogo",
    "Man",
    "Gagnoa",
    "Abengourou",
    "Autre ville",
];

export default function VendrePage() {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [photos, setPhotos] = useState<string[]>([]);
    const [photoErrors, setPhotoErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const MIN_WIDTH = 600;
    const MIN_HEIGHT = 400;
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo

    useEffect(() => {
        account.get()
            .then(() => setIsLoggedIn(true))
            .catch(() => setIsLoggedIn(false));
    }, []);

    const activeCat = CATEGORIES.find((c) => c.value === selectedCategory);

    const handleCategorySelect = (value: string) => {
        setSelectedCategory(value);
        setSelectedSubcategory(null);
        setStep(2);
    };

    const handleSubcategorySelect = (sub: string) => {
        setSelectedSubcategory(sub);
        setStep(3);
    };

    const handlePhotoAdd = () => {
        fileInputRef.current?.click();
    };

    const validateImage = (file: File): Promise<{ valid: boolean; error?: string; url?: string }> => {
        return new Promise((resolve) => {
            // Check file type
            if (!file.type.startsWith("image/")) {
                return resolve({ valid: false, error: `"${file.name}" n'est pas une image.` });
            }
            // Check file size
            if (file.size > MAX_FILE_SIZE) {
                return resolve({ valid: false, error: `"${file.name}" dépasse 10 Mo.` });
            }
            if (file.size < 20 * 1024) {
                return resolve({ valid: false, error: `"${file.name}" est trop petite (< 20 Ko). Utilisez une photo de meilleure qualité.` });
            }
            // Check dimensions
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
                    URL.revokeObjectURL(url);
                    resolve({ valid: false, error: `"${file.name}" est trop petite (${img.width}x${img.height}px). Minimum requis : ${MIN_WIDTH}x${MIN_HEIGHT}px.` });
                } else {
                    resolve({ valid: true, url });
                }
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                resolve({ valid: false, error: `"${file.name}" n'a pas pu être lue.` });
            };
            img.src = url;
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        setPhotoErrors([]);
        const errors: string[] = [];
        const newPhotos: string[] = [];

        for (const file of Array.from(files)) {
            if (photos.length + newPhotos.length >= 8) break;
            const result = await validateImage(file);
            if (result.valid && result.url) {
                newPhotos.push(result.url);
            } else if (result.error) {
                errors.push(result.error);
            }
        }

        if (newPhotos.length > 0) {
            setPhotos((prev) => [...prev, ...newPhotos]);
        }
        if (errors.length > 0) {
            setPhotoErrors(errors);
        }
        // Reset input so same file can be re-selected
        e.target.value = "";
    };

    const removePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    // Success screen
    // Loading auth check
    if (isLoggedIn === null) {
        return (
            <div className="pub-page" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="pub-auth-loading">
                    <div className="pub-spinner" style={{ width: 28, height: 28, borderWidth: 3 }} />
                </div>
            </div>
        );
    }

    // Not logged in — show auth gate
    if (isLoggedIn === false) {
        return (
            <div className="pub-page">
                <div className="pub-auth-gate">
                    <div className="pub-auth-card">
                        <div className="pub-auth-icon">
                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#19335d" strokeWidth="1.5">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <h2>Connectez-vous pour publier</h2>
                        <p>Créez un compte gratuit ou connectez-vous pour déposer votre annonce sur AbidjanAnnonce.</p>
                        <div className="pub-auth-actions">
                            <Link href="/connexion" className="pub-auth-btn-primary">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
                                Se connecter
                            </Link>
                            <Link href="/inscription" className="pub-auth-btn-secondary">
                                Créer un compte gratuitement
                            </Link>
                        </div>
                        <div className="pub-auth-features">
                            <div className="pub-auth-feature">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                Publication gratuite
                            </div>
                            <div className="pub-auth-feature">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                Jusqu&apos;à 8 photos
                            </div>
                            <div className="pub-auth-feature">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                Contact direct WhatsApp
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="pub-page">
                <div className="pub-success">
                    <div className="pub-success-icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <h2>Annonce publiée !</h2>
                    <p>Votre annonce est maintenant visible par les acheteurs sur AbidjanAnnonce.</p>
                    <div className="pub-success-actions">
                        <Link href="/annonces" className="pub-btn-outline">Voir les annonces</Link>
                        <Link href="/tableau-de-bord" className="pub-btn-primary">Mon tableau de bord</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pub-page">
            {/* Stepper */}
            <div className="pub-stepper">
                {[
                    { num: 1, label: "Catégorie", icon: "grid" },
                    { num: 2, label: "Type", icon: "tag" },
                    { num: 3, label: "Détails", icon: "edit" },
                ].map((s, i) => (
                    <div key={s.num} className="pub-stepper-item-wrap">
                        {i > 0 && (
                            <div className={`pub-stepper-line ${step > i ? "pub-stepper-line-done" : ""}`} />
                        )}
                        <button
                            className={`pub-stepper-item ${step === s.num ? "pub-stepper-current" : ""} ${step > s.num ? "pub-stepper-done" : ""} ${step < s.num ? "pub-stepper-future" : ""}`}
                            onClick={() => {
                                if (s.num === 1) setStep(1);
                                else if (s.num === 2 && selectedCategory) setStep(2);
                                else if (s.num === 3 && selectedSubcategory) setStep(3);
                            }}
                        >
                            <span className="pub-stepper-circle">
                                {step > s.num ? (
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                                ) : (
                                    s.num
                                )}
                            </span>
                            <span className="pub-stepper-label">{s.label}</span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Step 1: Category selection */}
            {step === 1 && (
                <div className="pub-step-content">
                    <div className="pub-step-header">
                        <h1>Que souhaitez-vous vendre ?</h1>
                        <p>Choisissez la catégorie qui correspond le mieux à votre annonce</p>
                    </div>
                    <div className="pub-cat-grid">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                className={`pub-cat-card ${selectedCategory === cat.value ? "pub-cat-card-active" : ""}`}
                                onClick={() => handleCategorySelect(cat.value)}
                                style={{ "--cat-color": cat.color } as React.CSSProperties}
                            >
                                <div className="pub-cat-icon" style={{ color: cat.color }}>
                                    {CategoryIcons[cat.iconKey]}
                                </div>
                                <span className="pub-cat-name">{cat.name}</span>
                                <span className="pub-cat-count">{cat.subcategories.length} types</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 2: Subcategory selection */}
            {step === 2 && activeCat && (
                <div className="pub-step-content">
                    <div className="pub-step-header">
                        <button className="pub-back" onClick={() => setStep(1)}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                            Retour
                        </button>
                        <h1>
                            <span className="pub-step-header-icon" style={{ color: activeCat.color }}>{CategoryIcons[activeCat.iconKey]}</span>
                            {activeCat.name}
                        </h1>
                        <p>Précisez le type d&apos;annonce pour aider les acheteurs à vous trouver</p>
                    </div>
                    <div className="pub-sub-grid">
                        {activeCat.subcategories.map((sub) => (
                            <button
                                key={sub}
                                className={`pub-sub-card ${selectedSubcategory === sub ? "pub-sub-card-active" : ""}`}
                                onClick={() => handleSubcategorySelect(sub)}
                                style={{ "--cat-color": activeCat.color } as React.CSSProperties}
                            >
                                <span className="pub-sub-dot" style={{ background: activeCat.color }} />
                                {sub}
                                <svg className="pub-sub-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 6 15 12 9 18" /></svg>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Form */}
            {step === 3 && activeCat && (
                <div className="pub-step-content">
                    <div className="pub-step-header">
                        <button className="pub-back" onClick={() => setStep(2)}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                            Retour
                        </button>
                        <h1>Rédigez votre annonce</h1>
                        <div className="pub-breadcrumb">
                            <span style={{ color: activeCat.color }}>{activeCat.name}</span>
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 6 15 12 9 18" /></svg>
                            <span>{selectedSubcategory}</span>
                        </div>
                    </div>

                    <div className="pub-form-layout">
                        {/* Main form */}
                        <form className="pub-form" onSubmit={handleSubmit}>

                            {/* Photos */}
                            <div className="pub-form-section">
                                <h3>
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                    Photos
                                    <span className="pub-form-badge">{photos.length}/8</span>
                                </h3>
                                <p className="pub-form-hint">Ajoutez jusqu&apos;à 8 photos. La première sera la photo principale.</p>

                                <div className="pub-photo-rules">
                                    <div className="pub-photo-rule">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        <span>Minimum <strong>600 x 400 px</strong></span>
                                    </div>
                                    <div className="pub-photo-rule">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        <span>Bonne lumière, <strong>pas de flou</strong></span>
                                    </div>
                                    <div className="pub-photo-rule">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#43a047" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        <span>Montrez <strong>plusieurs angles</strong></span>
                                    </div>
                                    <div className="pub-photo-rule">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#e53935" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        <span>Pas de logos, textes ou captures d&apos;écran</span>
                                    </div>
                                </div>

                                {photoErrors.length > 0 && (
                                    <div className="pub-photo-errors">
                                        {photoErrors.map((err, i) => (
                                            <div key={i} className="pub-photo-error">
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                                                {err}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/jpeg,image/png,image/webp,image/heic"
                                    multiple
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />

                                <div className="pub-photos-grid">
                                    {photos.map((src, i) => (
                                        <div key={i} className="pub-photo-item">
                                            <img src={src} alt={`Photo ${i + 1}`} />
                                            {i === 0 && <span className="pub-photo-main">Principale</span>}
                                            <button type="button" className="pub-photo-remove" onClick={() => removePhoto(i)}>
                                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                            </button>
                                        </div>
                                    ))}
                                    {photos.length < 8 && (
                                        <button type="button" className="pub-photo-add" onClick={handlePhotoAdd}>
                                            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                            <span>Ajouter</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Title & Price */}
                            <div className="pub-form-section">
                                <h3>
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                    Informations
                                </h3>

                                <div className="pub-field">
                                    <label>Titre de l&apos;annonce *</label>
                                    <input type="text" required placeholder="Ex: iPhone 15 Pro Max 256Go" />
                                    <span className="pub-field-hint">Soyez précis : marque, modèle, taille, couleur...</span>
                                </div>

                                <div className="pub-field-row">
                                    <div className="pub-field">
                                        <label>Prix (FCFA) *</label>
                                        <div className="pub-price-input">
                                            <input type="number" required min="0" placeholder="0" />
                                            <span className="pub-price-unit">FCFA</span>
                                        </div>
                                    </div>
                                    <div className="pub-field">
                                        <label>État *</label>
                                        <select required>
                                            <option value="">Sélectionnez...</option>
                                            <option value="new">Neuf</option>
                                            <option value="like-new">Comme neuf</option>
                                            <option value="good">Bon état</option>
                                            <option value="used">État correct</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pub-field">
                                    <label>Localisation *</label>
                                    <select required>
                                        <option value="">Choisissez votre ville / commune...</option>
                                        {VILLES.map((v) => (
                                            <option key={v} value={v}>{v}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="pub-field">
                                    <label>Description *</label>
                                    <textarea required rows={5} placeholder="Décrivez votre article en détail : état, caractéristiques, raison de la vente..." />
                                    <span className="pub-field-hint">Une bonne description augmente vos chances de vente.</span>
                                </div>

                                <div className="pub-field">
                                    <label>Numéro WhatsApp / Téléphone</label>
                                    <input type="tel" placeholder="Ex: +225 07 XX XX XX XX" />
                                    <span className="pub-field-hint">Facultatif. Les acheteurs pourront vous contacter directement.</span>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pub-form-actions">
                                <button type="button" className="pub-btn-outline" onClick={() => setStep(2)}>Retour</button>
                                <button type="submit" className="pub-btn-primary pub-btn-submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <span className="pub-spinner" />
                                            Publication...
                                        </>
                                    ) : (
                                        <>
                                            Publier mon annonce
                                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Sidebar tips */}
                        <aside className="pub-tips">
                            <div className="pub-tips-card">
                                <h4>
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                                    Conseils pour bien vendre
                                </h4>
                                <ul>
                                    <li>
                                        <strong>Photos claires</strong>
                                        <span>Prenez vos photos en bonne lumière, montrez l&apos;article sous plusieurs angles</span>
                                    </li>
                                    <li>
                                        <strong>Prix juste</strong>
                                        <span>Vérifiez les prix du marché pour fixer un prix attractif</span>
                                    </li>
                                    <li>
                                        <strong>Titre précis</strong>
                                        <span>Incluez la marque, le modèle et les caractéristiques clés</span>
                                    </li>
                                    <li>
                                        <strong>Description complète</strong>
                                        <span>Mentionnez l&apos;état, les défauts éventuels et les accessoires inclus</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pub-tips-card pub-tips-rules">
                                <h4>
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                    Règles de publication
                                </h4>
                                <ul>
                                    <li>N&apos;écrivez pas le prix dans le titre</li>
                                    <li>Pas de coordonnées dans la description</li>
                                    <li>Une seule annonce par article</li>
                                    <li>Pas de produits illégaux ou contrefaits</li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            )}
        </div>
    );
}
