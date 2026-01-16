import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/content";
import { Card, CardsGrid } from "@/components/Cards";

export const metadata: Metadata = {
  title: "Services | AquaPro-Détect Belgium",
  description:
    "Découvrez nos services : détection & diagnostic, égouts & canalisations, nettoyage & sinistres. Recherche de fuite, inspection caméra, débouchage 24/7, etc.",
  alternates: { canonical: "/services/" },
  openGraph: {
    title: "Services | AquaPro-Détect Belgium",
    description:
      "Détection & Diagnostic, Égouts & Canalisations, Nettoyage & Sinistres : services détaillés et demandes d’intervention.",
    url: "/services/",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div>
      <h2 className="h2">Services</h2>
      <p className="lead">
        Accédez à chaque catégorie de services AquaPro-Détect.
      </p>

      <div className="section">
        <CardsGrid>
          {CATEGORIES.map((c) => (
            <Card
              key={c.slug}
              title={c.title}
              text={c.excerpt}
              href={`/services/${c.slug}`}
              badge="Catégorie"
            />
          ))}
        </CardsGrid>
      </div>
    </div>
  );
}
