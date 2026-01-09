import type { Metadata } from "next";
import { CONTACT } from "@/lib/content";

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
    <div>
      <h1 className="h1">Contact</h1>
      <p className="lead">Une question ? Une intervention ? Contactez-nous.</p>

      <div className="section card" style={{ display: "grid", gap: 10 }}>
        <div>
          <strong>Adresse :</strong> {CONTACT.address}
        </div>
        <div>
          <strong>Téléphone :</strong> {CONTACT.phone1} — {CONTACT.phone2}
        </div>
        <div>
          <strong>Email :</strong> {CONTACT.email}
        </div>
        <div>
          <strong>TVA :</strong> {CONTACT.vat}
        </div>
      </div>
    </div>
  );
}
