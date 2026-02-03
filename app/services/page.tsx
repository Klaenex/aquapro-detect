import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/content";
import ServiceCard from "@/components/ServicesCard";
import Hero from "@/components/Hero";
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
      <Hero />
      <ServiceCard categories={CATEGORIES} services={null} categorySlug="" />
      <div className="section"></div>
    </div>
  );
}
