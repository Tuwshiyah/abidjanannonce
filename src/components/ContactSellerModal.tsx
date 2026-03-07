"use client";

import { useState } from "react";
import "./contact-modal.css";

type ContactSellerModalProps = {
    isOpen: boolean;
    onClose: () => void;
    sellerName: string;
    productTitle: string;
};

export default function ContactSellerModal({ isOpen, onClose, sellerName, productTitle }: ContactSellerModalProps) {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        // Simulate API call
        setTimeout(() => {
            setIsSending(false);
            setIsSent(true);

            // Auto close after showing success
            setTimeout(() => {
                setIsSent(false);
                setMessage("");
                onClose();
            }, 2000);
        }, 1200);
    };

    return (
        <div className="modal-backdrop fadeIn" onClick={onClose}>
            <div className="modal-content scaleIn" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                {isSent ? (
                    <div className="success-state fadeIn">
                        <div className="success-icon">✓</div>
                        <h3>Message envoyé !</h3>
                        <p>{sellerName} vous répondra très bientôt.</p>
                    </div>
                ) : (
                    <>
                        <div className="modal-header">
                            <h2>Contacter le vendeur</h2>
                            <p className="modal-subtitle">À propos de : <strong>{productTitle}</strong></p>
                        </div>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="message">Votre message pour {sellerName}</label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Bonjour, je suis très intéressé(e) par cet article. Est-il toujours disponible ?"
                                    required
                                    rows={5}
                                />
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-button" onClick={onClose} disabled={isSending}>
                                    Annuler
                                </button>
                                <button type="submit" className="send-button" disabled={isSending || !message.trim()}>
                                    {isSending ? "Envoi en cours..." : "Envoyer le message"}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
