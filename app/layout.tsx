import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AquaPro-Détect Belgium",
  description:
    "Recherche de fuite, caméra thermique, test fumigène, détection sonar, inspection caméra, débouchage 24/7, entretien et réparation d’égouts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
