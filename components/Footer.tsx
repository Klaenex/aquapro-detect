import Link from "next/link";
import { CONTACT } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <div style={{ fontWeight: 750, color: "var(--text)" }}>
              {CONTACT.brand}
            </div>
            <div>{CONTACT.address}</div>
            <div>TVA : {CONTACT.vat}</div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link href="/mentions-legales-rgpd" className="pill">
              Mentions légales & RGPD
            </Link>
            <Link href="/demande-intervention" className="pill">
              Demande d’intervention
            </Link>
            <Link href="/contact" className="pill">
              Contact
            </Link>
          </div>

          <div>
            <div>
              Tél : {CONTACT.phone1} — {CONTACT.phone2}
            </div>
            <div>Email : {CONTACT.email}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
