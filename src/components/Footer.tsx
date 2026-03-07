import "./footer.css";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-content">
                <div className="footer-links-grid">

                    <div className="link-column">
                        <h4>Acheter</h4>
                        <ul>
                            <li><a href="#">Inscription</a></li>
                            <li><a href="#">Aide pour l&apos;achat</a></li>
                            <li><a href="#">Boutiques</a></li>
                            <li><a href="#">Collections créateurs</a></li>
                            <li><a href="#">Associations caritatives</a></li>
                            <li><a href="#">Boutique solidaire</a></li>
                            <li><a href="#">Ventes saisonnières</a></li>
                            <li><a href="#">Cartes cadeaux</a></li>
                        </ul>
                    </div>

                    <div className="link-column">
                        <h4>Vendre</h4>
                        <ul>
                            <li><a href="/vendre">Commencer à vendre</a></li>
                            <li><a href="#">Comment vendre</a></li>
                            <li><a href="#">Vendeurs professionnels</a></li>
                            <li><a href="#">Affiliés</a></li>
                        </ul>

                        <h4 style={{ marginTop: "24px" }}>Outils et applications</h4>
                        <ul>
                            <li><a href="#">Développeurs</a></li>
                            <li><a href="#">Centre de sécurité</a></li>
                            <li><a href="#">Plan du site</a></li>
                        </ul>
                    </div>

                    <div className="link-column">
                        <h4>LuxeBay et vous</h4>
                        <ul>
                            <li><a href="#">Nos partenaires</a></li>
                        </ul>

                        <h4 style={{ marginTop: "24px" }}>Restez connecté</h4>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">X (Twitter)</a></li>
                        </ul>
                    </div>

                    <div className="link-column">
                        <h4>À propos</h4>
                        <ul>
                            <li><a href="#">Notre entreprise</a></li>
                            <li><a href="#">Actualités</a></li>
                            <li><a href="#">Investisseurs</a></li>
                            <li><a href="#">Carrières</a></li>
                            <li><a href="#">Diversité et inclusion</a></li>
                            <li><a href="#">Impact global</a></li>
                            <li><a href="#">Affaires publiques</a></li>
                            <li><a href="#">Publicité</a></li>
                        </ul>
                    </div>

                    <div className="link-column">
                        <h4>Aide & Contact</h4>
                        <ul>
                            <li><a href="#">Espace Vendeur</a></li>
                            <li><a href="#">Nous contacter</a></li>
                            <li><a href="#">Retours</a></li>
                            <li><a href="#">Garantie client</a></li>
                        </ul>

                        <h4 style={{ marginTop: "24px" }}>Communauté</h4>
                        <ul>
                            <li><a href="#">Annonces</a></li>
                            <li><a href="#">Forums d&apos;entraide</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    );
}
