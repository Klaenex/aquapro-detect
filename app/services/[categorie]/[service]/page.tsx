import styles from "@/styles/pages/service.module.scss";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/content";
import { getCategory, getService } from "@/lib/utils";
import Hero from "@/components/Hero";
import Methods from "@/components/Methods";
import Process from "@/components/Process";
import Documents from "@/components/Documents";
import ServiceToForm from "@/components/ServiceToForm";
import Advantages from "@/components/Advantages";
import SingleServiceLinks from "@/components/SingleServiceLinks";

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
    <div style={{ backgroundColor: "var(--bg-lightgrey)" }}>
      <Hero category={category} service={service} />

      <div className={`container ${styles.Services__categories}`}>
        <div className={styles.leftContainer}>
          <Methods methods={service.methods} />
          <Process process={service.process} />
          <Documents documents={service.documents} />
        </div>
        <div className={styles.rightContainer}>
          <ServiceToForm />
          <Advantages advantages={service.advantages} />
          <SingleServiceLinks category={category} service={service.slug} />
        </div>
      </div>
    </div>
  );
}
