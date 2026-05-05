// app/layout.tsx
import type { Viewport } from "next";
import "../styles/globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPublicSiteUrl } from "@/lib/site";
import { CONTACT } from "@/lib/content";

const OG_IMAGE = "/img/stock/detection-diagnostic.webp";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10b5cb",
};

export const metadata = {
  title: "AquaPro-Détect Belgium",
  description:
    "Recherche de fuite, inspection caméra, débouchage 24/7, test fumigène, détection sonar et nettoyage après sinistre. Interventions partout en Belgique.",
  metadataBase: new URL(getPublicSiteUrl()),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    images: [{ url: OG_IMAGE, alt: "AquaPro-Détect Belgium" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    images: [OG_IMAGE],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: CONTACT.brand,
  url: "https://aquapro-detect.be",
  telephone: [CONTACT.phone1, CONTACT.phone2],
  email: CONTACT.email,
  vatID: CONTACT.vat,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sint-Jansstraat 39",
    addressLocality: "Tervuren",
    postalCode: "3080",
    addressCountry: "BE",
  },
  areaServed: { "@type": "Country", name: "Belgique" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: CONTACT.phone1,
    areaServed: "BE",
    availableLanguage: "French",
  },
  description:
    "Services de détection de fuites, inspection caméra, débouchage 24/7, test fumigène, entretien et réparation d'égouts, nettoyage fin de bail et après sinistre.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
