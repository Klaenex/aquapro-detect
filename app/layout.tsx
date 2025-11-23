// app/layout.tsx
import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

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
          {/* Header global avec le menu */}
          <SiteHeader />

          {/* Contenu des pages */}
          <main className="flex-1">{children}</main>

          {/* Footer global */}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
