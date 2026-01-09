import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assurances & Rapports | AquaPro-Détect Belgium",
  description:
    "Rapports d’intervention sur demande : photos/vidéos, constat, recommandations. Utile pour dossiers d’assurance et devis de réparation.",
  alternates: { canonical: "/assurances-rapports/" },
  openGraph: {
    title: "Assurances & Rapports | AquaPro-Détect Belgium",
    description:
      "Rapports clairs et exploitables (sur demande) pour assurance, devis et suivi technique.",
    url: "/assurances-rapports/",
    type: "website",
  },
};

export default function AssurancesPage() {
  return (
    <div>
      <h1 className="h1">Assurances & Rapports</h1>
      <p className="lead">
        Sur demande, nous fournissons des rapports structurés utilisables pour
        un dossier d’assurance ou pour établir un devis de réparation.
      </p>

      <div className="section card">
        <h2 className="h2">Documents possibles (sur demande)</h2>
        <ul className="lead" style={{ marginTop: 12 }}>
          <li>Rapport d’intervention détaillé</li>
          <li>Photos et/ou vidéos des constatations</li>
          <li>Schéma du réseau / de la zone concernée</li>
          <li>Recommandations et conseils de réparation</li>
        </ul>
      </div>
    </div>
  );
}
