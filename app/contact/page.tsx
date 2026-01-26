import type { Metadata } from "next";
import { CONTACT } from "@/lib/content";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | AquaPro-Détect Belgium",
  description:
    "Contact AquaPro-Détect Belgium : téléphone, email, adresse. Demande d’intervention et urgence 24/7.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact | AquaPro-Détect Belgium",
    description:
      "Contactez AquaPro-Détect pour une demande d’intervention ou une urgence.",
    url: "/contact/",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactInfo/>
      <ContactForm/>
    </>
  );
}
