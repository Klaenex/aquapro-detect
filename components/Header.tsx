import Link from "next/link";

export default function Header() {
  return (
    <header className="topbar">
      <div className="container">
        <div className="navWrap">
          <Link href="/" className="logo">
            AquaPro-Détect
          </Link>

          <nav className="nav">
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
          </nav>
        </div>
      </div>
    </header>
  );
}
