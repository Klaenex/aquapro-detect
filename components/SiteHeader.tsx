import Container from "./Container";
import React from "react";
import SiteMenuGlass from "./SiteMenuGlass";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950/40 backdrop-blur-xl">
      <Container className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition cursor-pointer"
        >
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
        </Link>

        <SiteMenuGlass />
      </Container>
    </header>
  );
}
