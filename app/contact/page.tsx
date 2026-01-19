import type { Metadata } from "next";
import { CONTACT } from "@/lib/content";
import ContactInfo from "@/components/ContactInfo";

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
      {/* <h1 className="h1">Contact</h1>
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
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.547958180925!2d4.504088577103054!3d50.821013471665324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3d96077ac4009%3A0x89abfbbd98ef885f!2sSint-Jansstraat%2039%2C%203080%20Tervuren!5e0!3m2!1sfr!2sbe!4v1768833059396!5m2!1sfr!2sbe"   loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div> */}
    </>
  );
}
