import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | AquaPro-Détect Belgium",
  description:
    "Contactez AquaPro-Détect Belgium : téléphone, email, formulaire. Demande d’intervention et urgences 24/7 partout en Belgique.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact | AquaPro-Détect Belgium",
    description:
      "Contactez AquaPro-Détect pour une demande d’intervention ou une urgence 24/7.",
    url: "/contact/",
    type: "website",
    images: [{ url: "/img/stock/detection-diagnostic.webp", alt: "Contacter AquaPro-Détect Belgium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | AquaPro-Détect Belgium",
    description: "Demande d’intervention et urgences 24/7 en Belgique.",
    images: ["/img/stock/detection-diagnostic.webp"],
  },
};

export default function ContactPage() {
  return (
    <>
      <Hero
        category={null}
        service={{
          title: "Contact",
          hero: "Besoin d’aide ? Contactez-nous pour une demande d’intervention ou une urgence.",
        }}
      />
      <ContactInfo />
      <ContactForm />
    </>
  );
}
