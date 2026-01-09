import type { Metadata } from "next";
import { CONTACT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Urgence 24/7 | AquaPro-Détect Belgium",
  description:
    "Urgence débouchage / reflux / dégâts des eaux : contactez AquaPro-Détect. Intervention rapide selon situation, 24/7.",
  alternates: { canonical: "/urgence-24-7/" },
  openGraph: {
    title: "Urgence 24/7 | AquaPro-Détect Belgium",
    description:
      "Urgence : appelez-nous directement pour un reflux, débordement ou situation critique.",
    url: "/urgence-24-7/",
    type: "website",
  },
};

export default function UrgencePage() {
  return (
    <div>
      <h1 className="h1">Urgence 24/7</h1>
      <p className="lead">
        Pour une urgence, l’appel est la solution la plus rapide.
      </p>

      <div className="section card">
        <div style={{ display: "grid", gap: 10 }}>
          <a
            className="pill pillPrimary"
            href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
          >
            Appeler {CONTACT.phone1}
          </a>
          <a className="pill" href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}>
            Appeler {CONTACT.phone2}
          </a>
          <div className="lead" style={{ marginTop: 8 }}>
            Préparez si possible : adresse, type de bien, étage, description du
            problème et disponibilités.
          </div>
        </div>
      </div>
    </div>
  );
}
