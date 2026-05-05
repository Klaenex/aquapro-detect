import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/content";
import ServiceCard from "@/components/ServicesCard";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Services | AquaPro-Détect Belgium",
  description:
    "Détection & diagnostic, égouts & canalisations, nettoyage & sinistres. Recherche de fuite, inspection caméra, débouchage 24/7 et plus en Belgique.",
  alternates: { canonical: "/services/" },
  openGraph: {
    title: "Services | AquaPro-Détect Belgium",
    description:
      "Détection & Diagnostic, Égouts & Canalisations, Nettoyage & Sinistres : services détaillés et demandes d’intervention en Belgique.",
    url: "/services/",
    type: "website",
    images: [{ url: "/img/stock/detection-diagnostic.webp", alt: "Services AquaPro-Détect Belgium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | AquaPro-Détect Belgium",
    description: "Détection, égouts, canalisations, nettoyage et sinistres en Belgique.",
    images: ["/img/stock/detection-diagnostic.webp"],
  },
};
export const categories = {
  title: "Nos services",
  excerpt:
    "Découvrez nos services : détection & diagnostic, égouts & canalisations, nettoyage & sinistres. Recherche de fuite, inspection caméra, débouchage 24/7, etc.",
};
export default function ServicesPage() {
  return (
    <>
      <Hero category={categories} service={null} />

      <ServiceCard categories={CATEGORIES} services={null} categorySlug="" />
    </>
  );
}
