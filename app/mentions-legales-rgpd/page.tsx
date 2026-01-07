import { CONTACT } from "@/lib/content";

export default function LegalPage() {
  return (
    <div>
      <h1 className="h1">Mentions légales & RGPD</h1>
      <p className="lead">
        Cette page sera complétée avec les informations légales obligatoires et
        la politique de confidentialité (RGPD).
      </p>

      <div className="section card" style={{ display: "grid", gap: 10 }}>
        <div>
          <strong>Entreprise :</strong> {CONTACT.brand}
        </div>
        <div>
          <strong>Adresse :</strong> {CONTACT.address}
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
