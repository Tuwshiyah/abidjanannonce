import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AbidjanAnnonce | Petites annonces à Abidjan et en Côte d'Ivoire",
  description: "Achetez et vendez facilement à Abidjan. Véhicules, immobilier, électronique, emplois et plus encore.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={publicSans.variable}>
        <ClientProviders>
          <Header />
          <main style={{ minHeight: "80vh" }}>
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
