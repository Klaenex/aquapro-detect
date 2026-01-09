import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, SERVICES } from "@/lib/content";
import { getServiceUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Demande d’intervention | AquaPro-Détect Belgium",
  description:
    "Envoyez une demande d’intervention : recherche de fuite, inspection caméra, débouchage 24/7, nettoyage fin de bail ou après sinistre.",
  alternates: { canonical: "/demande-intervention/" },
  openGraph: {
    title: "Demande d’intervention | AquaPro-Détect Belgium",
    description:
      "Choisissez un service puis remplissez le formulaire pour être recontacté rapidement.",
    url: "/demande-intervention/",
    type: "website",
  },
};

export default function RequestPage() {
  return (
    <div>
      <h1 className="h1">Demande d’intervention</h1>
      <p className="lead">
        Choisissez d’abord le service concerné. Vous pourrez ensuite remplir le
        formulaire dédié.
      </p>

      {CATEGORIES.map((c) => {
        const items = SERVICES.filter((s) => s.categorySlug === c.slug);
        return (
          <div key={c.slug} className="section">
            <h2 className="h2">{c.title}</h2>
            <p className="lead">{c.excerpt}</p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 12,
              }}
            >
              {items.map((s) => (
                <Link
                  key={s.slug}
                  className="pill"
                  href={getServiceUrl(s.categorySlug, s.slug)}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
