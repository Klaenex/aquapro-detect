import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/content";
import { getCategory, getRequestUrl, getService } from "@/lib/utils";

export function generateStaticParams() {
  return SERVICES.map((s) => ({
    categorie: s.categorySlug,
    service: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string; service: string }>;
}): Promise<Metadata> {
  const { categorie, service: serviceSlug } = await params;

  const category = getCategory(categorie);
  const service = getService(categorie, serviceSlug);

  if (!category || !service) {
    return {
      title: "Service | AquaPro-Détect Belgium",
      description:
        "Services AquaPro-Détect : détection, inspection, débouchage, entretien, nettoyage et sinistres.",
    };
  }

  const title = `${service.title} | ${category.title} | AquaPro-Détect Belgium`;
  const description =
    service.excerpt?.slice(0, 160) ||
    "Services AquaPro-Détect : détection, inspection, débouchage, entretien, nettoyage et sinistres.";

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${categorie}/${serviceSlug}/`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/services/${categorie}/${serviceSlug}/`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ categorie: string; service: string }>;
}) {
  const { categorie, service: serviceSlug } = await params;

  const category = getCategory(categorie);
  const service = getService(categorie, serviceSlug);

  if (!category || !service) return <div>Service introuvable.</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Link className="pill" href={`/services/${category.slug}`}>
          ← {category.title}
        </Link>
        <Link
          className="pill"
          href={getRequestUrl(category.slug, service.slug)}
        >
          Demande d’intervention
        </Link>
        <Link className="pill pillPrimary" href="/urgence-24-7">
          Urgence 24/7
        </Link>
      </div>

      <h1 className="h1" style={{ marginTop: 16 }}>
        {service.title}
      </h1>
      <p className="lead">{service.hero}</p>

      {service.methods?.length ? (
        <div className="section card">
          <h2 className="h2">Méthodes & équipements</h2>
          <ul className="lead" style={{ marginTop: 12 }}>
            {service.methods.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {service.process?.length ? (
        <div className="section card">
          <h2 className="h2">Processus d’intervention</h2>
          <ol className="lead" style={{ marginTop: 12 }}>
            {service.process.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
        </div>
      ) : null}

      {service.documents?.length ? (
        <div className="section card">
          <h2 className="h2">Documents fournis (sur demande)</h2>
          <ul className="lead" style={{ marginTop: 12 }}>
            {service.documents.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {service.advantages?.length ? (
        <div className="section card">
          <h2 className="h2">Avantages client</h2>
          <ul className="lead" style={{ marginTop: 12 }}>
            {service.advantages.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="section">
        <Link
          className="pill pillPrimary"
          href={getRequestUrl(category.slug, service.slug)}
        >
          Ouvrir le formulaire pour {service.title}
        </Link>
      </div>
    </div>
  );
}
