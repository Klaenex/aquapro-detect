import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, CONTACT } from "@/lib/content";
import { Card, CardsGrid } from "@/components/Cards";
import Hero from "@/components/Hero"
import Emergency from "@/components/Emergency"

export const metadata: Metadata = {
  title: "AquaPro-Détect Belgium | Détection, égouts, débouchage, nettoyage",
  description:
    "AquaPro-Détect Belgium : recherche de fuite, caméra thermique, test fumigène, détection sonar, inspection caméra, débouchage 24/7, entretien et réparation d’égouts, nettoyage fin de bail et après sinistre.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AquaPro-Détect Belgium",
    description:
      "Recherche de fuite, inspection caméra, débouchage 24/7, caméra thermique, test fumigène, détection sonar, nettoyage et sinistres.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div>
      <Hero />
      <h1 className="h1">AquaPro-Détect Belgium</h1>
      <p className="lead">
        Détection, inspection et entretien : recherche de fuite, inspection
        caméra, débouchage 24/7, caméra thermique, test fumigène, détection
        sonar, entretien et réparation d’égouts, nettoyage et sinistres.
      </p>

      <div
        className="section"
        style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
      >
        <Link className="pill pillPrimary" href="/urgence-24-7">
          🚨 Urgence 24/7
        </Link>
        <Link className="pill" href="/demande-intervention">
          Demande d’intervention
        </Link>
        <a className="pill" href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}>
          Appeler {CONTACT.phone1}
        </a>
      </div>

      <div className="section">
        <h2 className="h2">Nos services</h2>
        <p className="lead">
          Choisissez une catégorie pour accéder aux services détaillés.
        </p>

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

      <Emergency />

      <div className="section">
        <h2 className="h2">Problèmes fréquents</h2>
        <p className="lead">
          Pages orientées client : trouvez rapidement le bon service.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="pill" href="/problemes/odeurs-egout">
            Odeurs d’égout
          </Link>
          <Link className="pill" href="/problemes/humidite-moisissures">
            Humidité & moisissures
          </Link>
          <Link className="pill" href="/problemes/fissures-stabilite">
            Fissures & stabilité
          </Link>
        </div>
      </div>
    </div>
  );
}
