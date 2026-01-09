import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | AquaPro-Détect Belgium",
  description:
    "AquaPro-Détect Belgium : expérience, sérieux, transparence. Interventions soignées et recommandations concrètes.",
  alternates: { canonical: "/a-propos/" },
  openGraph: {
    title: "À propos | AquaPro-Détect Belgium",
    description:
      "Expérience, sérieux, tarifs annoncés à l’avance et interventions soignées.",
    url: "/a-propos/",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="h1">À propos</h1>
      <p className="lead">
        Avec plus de 15 ans d’expérience, AquaPro-Détect Belgium intervient avec
        sérieux, transparence et professionnalisme.
      </p>

      <div className="section card">
        <h2 className="h2">Nos engagements</h2>
        <ul className="lead" style={{ marginTop: 12 }}>
          <li>Interventions réalisées avec soin et respect</li>
          <li>Diagnostic fiable et recommandations concrètes</li>
          <li>Tarifs annoncés à l’avance, sans surprises</li>
          <li>Possibilité de rapport pour assurance (sur demande)</li>
        </ul>
      </div>
    </div>
  );
}
