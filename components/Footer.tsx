import Link from "next/link";
import { CONTACT } from "@/lib/content";
import Image from "next/image";
import call from "@/public/img/icons/phone.svg";
import email from "@/public/img/icons/mail.svg";
import maps from "@/public/img/icons/pin-fat.svg";
import vat from "@/public/img/icons/building.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="liens">
          <h6>Liens</h6>
          <div className="pills">
            <Link className="pill" href="/services">
              Services
            </Link>
            <Link className="pill" href="/problemes">
              Problèmes
            </Link>
            <Link className="pill" href="/assurances-rapports">
              Assurances & Rapports
            </Link>
            <Link className="pill" href="/a-propos">
              À propos
            </Link>
            <Link className="pill" href="/contact">
              Contact
            </Link>
            <Link className="pill pillPrimary" href="/urgence-24-7">
              Urgence 24/7
            </Link>
          </div>
        </div>

        <div className="contactContainer">
          <h6>Nous contacter</h6>
          <div className="contacts">
            <div>
              <Image src={maps} alt="AquaPro-Détect" className="icon" />
              <p>{CONTACT.address}</p>
            </div>
            <div>
              <Image src={vat} alt="AquaPro-Détect" className="icon" />
              <p>{CONTACT.vat}</p>
            </div>
            <div>
              <Image src={call} alt="AquaPro-Détect" className="icon" />
              <p>
                {CONTACT.phone1} — {CONTACT.phone2}
              </p>
            </div>
            <div>
              <Image src={email} alt="AquaPro-Détect" className="icon" />
              <p>{CONTACT.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container copyright">
        <p>© 2025 AquaPro-Detect</p>
      </div>
    </footer>
  );
}
