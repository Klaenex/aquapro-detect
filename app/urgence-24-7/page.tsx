import { CONTACT } from "@/lib/content";

export default function UrgencePage() {
  return (
    <div>
      <h1 className="h1">Urgence 24/7</h1>
      <p className="lead">
        Pour une urgence (débordement, bouchon important, reflux, dégâts des
        eaux), appelez-nous directement.
      </p>

      <div className="section card">
        <div style={{ display: "grid", gap: 10 }}>
          <a
            className="pill pillPrimary"
            href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
          >
            Appeler {CONTACT.phone1}
          </a>
          <a className="pill" href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}>
            Appeler {CONTACT.phone2}
          </a>
          <div className="lead" style={{ marginTop: 8 }}>
            Si possible, préparez : adresse, type de bien, étage, description du
            problème et votre disponibilité.
          </div>
        </div>
      </div>
    </div>
  );
}
