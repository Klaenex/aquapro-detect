#!/bin/bash

echo "🚀 Création de la structure AquaPro-Détect Belgium..."

# === Création des dossiers ===
mkdir -p app
mkdir -p app/a-propos
mkdir -p app/recherche-fuite
mkdir -p app/inspection-camera
mkdir -p app/debouchage
mkdir -p app/detection-sonar
mkdir -p app/test-fumigene
mkdir -p app/nettoyage
mkdir -p app/reparation-egouts
mkdir -p app/contact
mkdir -p components

# === Création du fichier global CSS ===
if [ ! -f app/globals.css ]; then
cat > app/globals.css <<'EOF'
@import "tailwindcss";

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
    "Segoe UI", sans-serif;
}

a {
  text-decoration: none;
}
EOF
fi

# === LAYOUT GLOBAL ===
if [ ! -f app/layout.tsx ]; then
cat > app/layout.tsx <<'EOF'
import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "AquaPro-Détect Belgium | Recherche de fuite, inspection caméra & débouchage",
  description:
    "AquaPro-Détect Belgium est spécialisé en recherche de fuite sans destruction, inspection caméra des égouts, débouchage urgent, test fumigène, détection sonar et nettoyage après sinistre en Belgique.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
EOF
fi

# === COMPONENT : Container ===
cat > components/Container.tsx <<'EOF'
import React from "react";

export default function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl w-full px-4 md:px-6 ${className}`}>{children}</div>;
}
EOF

# === COMPONENT : Header ===
cat > components/SiteHeader.tsx <<'EOF'
import Container from "./Container";
import React from "react";

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-xl">
            💧
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              AquaPro-Détect Belgium
            </span>
            <span className="text-xs text-slate-400">
              Recherche de fuite • Inspection caméra • Débouchage
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}
EOF

# === COMPONENT : Footer ===
cat > components/SiteFooter.tsx <<'EOF'
import Container from "./Container";
import React from "react";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <Container className="py-6 text-sm text-slate-400 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>© {currentYear} AquaPro-Détect Belgium. Tous droits réservés.</div>
        <div className="flex flex-wrap gap-4">
          <span>Sint-Jansstraat 39, 3080 Tervuren</span>
          <span>Tel : 0471 32 57 24 – 0487 93 20 51</span>
          <span>E-mail : h.s.andreiaf@gmail.com</span>
        </div>
      </Container>
    </footer>
  );
}
EOF

# === COMPONENT : SectionTitle ===
cat > components/SectionTitle.tsx <<'EOF'
import React from "react";

export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-50">{title}</h2>
      {subtitle && <p className="text-sm text-slate-300">{subtitle}</p>}
    </div>
  );
}
EOF

# === COMPONENT : ContactStrip ===
cat > components/ContactStrip.tsx <<'EOF'
import React from "react";
import Container from "./Container";

export default function ContactStrip() {
  return (
    <section className="mt-10 rounded-3xl border border-blue-500/40 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-slate-900/90 py-6 text-sm text-slate-100 md:py-7">
      <Container className="md:flex md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">Besoin d’un diagnostic ou d’une intervention ?</h2>
          <p className="text-sm text-slate-200 max-w-xl">
            Décrivez votre problème (fuite, odeurs, bouchon, sinistre…) et indiquez vos disponibilités.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <span>📞 0471 32 57 24</span>
          <span>📞 0487 93 20 51</span>
          <span>✉️ h.s.andreiaf@gmail.com</span>
          <span>📍 Sint-Jansstraat 39, 3080 Tervuren</span>
        </div>
      </Container>
    </section>
  );
}
EOF

# === PAGE: Accueil ===
cat > app/page.tsx <<'EOF'
import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import ContactStrip from "../components/ContactStrip";

export default function Page() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle
          title="AquaPro-Détect Belgium"
          subtitle="Recherche de fuite, inspection caméra & débouchage avec méthodes non destructives."
        />
        <p className="text-slate-300 mt-4">
          Bienvenue sur le site d’AquaPro-Détect Belgium. Nous intervenons partout en Belgique...
        </p>
      </Container>

      <ContactStrip />
    </>
  );
}
EOF

# === PAGES SIMPLES ===
PAGES=("a-propos" "recherche-fuite" "inspection-camera" "debouchage" "detection-sonar" "test-fumigene" "nettoyage" "reparation-egouts" "contact")

for PAGE in "${PAGES[@]}"; do
cat > app/$PAGE/page.tsx <<EOF
import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ContactStrip from "../../components/ContactStrip";

export default function ${PAGE//-/}Page() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle title="${PAGE^}" subtitle="Page en construction." />
        <p className="text-slate-300 mt-4">Contenu spécifique pour ${PAGE}...</p>
      </Container>
      <ContactStrip />
    </>
  );
}
EOF
done

echo "✅ Structure complète créée !"
