import { CONTACT } from "@/lib/content";

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
