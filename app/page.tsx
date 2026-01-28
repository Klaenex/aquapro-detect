import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, CONTACT } from "@/lib/content";
import { Card, CardsGrid } from "@/components/Cards";
import Hero from "@/components/Hero";
import Emergency from "@/components/Emergency";
import WhyAqua from "@/components/WhyAqua";
import ServiceCard from "@/components/ServicesCard";

export const metadata: Metadata = {
  title: "AquaPro-Détect Belgium | Détection, égouts, débouchage, nettoyage",
  description:
    "AquaPro-Détect Belgium : recherche de fuite, caméra thermique, test fumigène, détection sonar, inspection caméra, débouchage 24/7, entretien et réparation d’égouts, nettoyage fin de bail et après sinistre.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AquaPro-Détect Belgium",
    description:
      "Recherche de fuite, inspection caméra, débouchage 24/7, caméra thermique, test fumigène, détection sonar, nettoyage et sinistres.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div>
      <Hero service={null} category={null}/>

      <ServiceCard categories={CATEGORIES}/>

      <Emergency />

      <WhyAqua/>
    </div>
  );
}
