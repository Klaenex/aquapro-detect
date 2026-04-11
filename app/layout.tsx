// app/layout.tsx
import "../styles/globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPublicSiteUrl } from "@/lib/site";
import { CONTACT } from "@/lib/content";

export const metadata = {
  title: "AquaPro-Détect Belgium",
  description:
    "AquaPro-Détect Belgium : recherche de fuite, caméra thermique, inspection caméra, débouchage 24/7, test fumigène, détection sonar, entretien et réparation d'égouts, nettoyage fin de bail et après sinistre. Interventions en Belgique.",
  metadataBase: new URL(getPublicSiteUrl()),
  icons: {
    icon: "/favicon.png",
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
