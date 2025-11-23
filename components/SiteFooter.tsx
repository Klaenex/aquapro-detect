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
