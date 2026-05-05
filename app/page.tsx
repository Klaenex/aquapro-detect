import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/content";
import Hero from "@/components/Hero";
import Emergency from "@/components/Emergency";
import WhyAqua from "@/components/WhyAqua";
import ServiceCard from "@/components/ServicesCard";

export const metadata: Metadata = {
  title: "AquaPro-Détect Belgium | Détection de fuite, égouts, débouchage",
  description:
    "Recherche de fuite, caméra thermique, test fumigène, détection sonar, inspection caméra, débouchage 24/7, entretien d’égouts et nettoyage après sinistre en Belgique.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AquaPro-Détect Belgium | Détection de fuite, égouts, débouchage",
    description:
      "Recherche de fuite, inspection caméra, débouchage 24/7, caméra thermique, test fumigène, détection sonar, nettoyage et sinistres en Belgique.",
    url: "/",
    type: "website",
    images: [{ url: "/img/stock/detection-diagnostic.webp", alt: "AquaPro-Détect Belgium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AquaPro-Détect Belgium | Détection de fuite, égouts, débouchage",
    description:
      "Recherche de fuite, inspection caméra, débouchage 24/7 et nettoyage après sinistre en Belgique.",
    images: ["/img/stock/detection-diagnostic.webp"],
  },
};

export default function HomePage() {
  return (
    <div>
      <Hero service={null} category={null} />

      <ServiceCard categories={CATEGORIES} services={null} />

      <Emergency />

      <WhyAqua />
    </div>
  );
}
