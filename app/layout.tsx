// app/layout.tsx
import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "AquaPro-Détect Belgium | Recherche de fuite, inspection caméra & débouchage",
  description:
    "AquaPro-Détect Belgium est spécialisé en recherche de fuite sans destruction, inspection caméra des égouts, débouchage urgent, test fumigène, détection sonar et nettoyage après sinistre en Belgique.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
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

              <nav className="hidden gap-6 text-sm font-medium text-slate-200 md:flex">
                <a href="#services" className="hover:text-blue-400">
                  Services
                </a>
                <a href="#pourquoi-nous" className="hover:text-blue-400">
                  Pourquoi nous ?
                </a>
                <a href="#contact" className="hover:text-blue-400">
                  Contact
                </a>
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-slate-800 bg-slate-950/90">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-6">
              <div>
                © {new Date().getFullYear()} AquaPro-Détect Belgium. Tous droits
                réservés.
              </div>
              <div className="flex flex-wrap gap-4">
                <span>Sint-Jansstraat 39, 3080 Tervuren</span>
                <span>Tel : 0471 32 57 24 – 0487 93 20 51</span>
                <span>E-mail : h.s.andreiaf@gmail.com</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
