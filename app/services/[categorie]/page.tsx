import type { Metadata } from "next";
import { Card, CardsGrid } from "@/components/Cards";
import { CATEGORIES } from "@/lib/content";
import { getCategory, getServicesByCategory, getServiceUrl } from "@/lib/utils";
import ServiceCard from "@/components/ServicesCard";
import Hero from "@/components/Hero";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string }>;
}): Promise<Metadata> {
  const { categorie } = await params;

  const category = getCategory(categorie);

  if (!category) {
    return {
      title: "Services | AquaPro-Détect Belgium",
      description:
        "Services AquaPro-Détect : détection, inspection, débouchage 24/7, entretien, réparations, nettoyage et sinistres.",
    };
  }

  const title = `${category.title} | Services | AquaPro-Détect Belgium`;
  const description =
    category.excerpt?.slice(0, 160) ||
    "Découvrez nos services : détection, inspection, débouchage 24/7, entretien, réparations, nettoyage et sinistres.";

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${categorie}/`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/services/${categorie}/`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorie: string }>;
}) {
  const { categorie } = await params;

  const category = getCategory(categorie);
  if (!category) return <div>Catégorie introuvable.</div>;

  const services = getServicesByCategory(category.slug);

  return (
    <div>
        <Hero category={category} service={null}/>
        <ServiceCard services={services} categories={null} categorySlug={category.slug}/>
    </div>
  );
}
