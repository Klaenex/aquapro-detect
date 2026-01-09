import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aquapro-detect.be"),
  title: {
    default: "AquaPro-Détect Belgium",
    template: "%s",
  },
  description:
    "Recherche de fuite, caméra thermique, test fumigène, détection sonar, inspection caméra, débouchage 24/7, entretien et réparation d’égouts, nettoyage et sinistres.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "AquaPro-Détect Belgium",
    locale: "fr_BE",
  },
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
