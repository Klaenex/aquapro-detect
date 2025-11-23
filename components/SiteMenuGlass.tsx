"use client";

import React, { useState } from "react";
import Link from "next/link";

type NavLink = {
  href: string;
  label: string;
};

const mainLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
];

const serviceLinks: NavLink[] = [
  { href: "/recherche-fuite", label: "Recherche de fuite" },
  { href: "/inspection-camera", label: "Inspection caméra" },
  { href: "/debouchage", label: "Débouchage" },
  { href: "/detection-sonar", label: "Détection sonar" },
  { href: "/test-fumigene", label: "Test fumigène" },
  { href: "/nettoyage", label: "Nettoyage fin de bail / sinistre" },
  { href: "/reparation-egouts", label: "Réparation des égouts" },
];

const endLinks: NavLink[] = [{ href: "/contact", label: "Contact" }];

export default function SiteMenuGlass() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);

  return (
    <>
      {/* NAV DESKTOP */}
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {mainLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-slate-200 hover:text-blue-300 transition"
          >
            {link.label}
          </Link>
        ))}

        {/* Services : hover + click */}
        <div
          className="relative"
          onMouseEnter={() => setDesktopServicesOpen(true)}
          onMouseLeave={() => setDesktopServicesOpen(false)}
        >
          <button
            type="button"
            className="inline-flex items-center gap-1 text-slate-200 hover:text-blue-300 transition"
            onClick={() => setDesktopServicesOpen((prev) => !prev)}
          >
            <span>Services</span>
            <span
              className={`text-xs transition-transform ${
                desktopServicesOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {desktopServicesOpen && (
            <div className="absolute right-0 mt-2 min-w-[220px] rounded-2xl border border-slate-700 bg-slate-900/90 backdrop-blur-lg shadow-xl z-40">
              <ul className="py-2 text-sm text-slate-100">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block px-4 py-2 hover:bg-blue-500/15 hover:text-blue-200 transition"
                      onClick={() => setDesktopServicesOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {endLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-slate-200 hover:text-blue-300 transition"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* BOUTON BURGER MOBILE */}
      <button
        type="button"
        className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 p-1.5 text-slate-100 md:hidden"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Ouvrir le menu"
      >
        <span className="text-lg">{mobileOpen ? "✕" : "☰"}</span>
      </button>

      {/* MENU MOBILE */}
      {mobileOpen && (
        <div className="absolute left-0 top-16 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4 text-sm text-slate-100">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2 hover:bg-slate-800/80 transition"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Services en accordéon */}
            <div className="mt-1 rounded-xl border border-slate-700 bg-slate-900/70">
              <button
                type="button"
                className="flex w-full items-center justify-between px-3 py-2 text-left"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
              >
                <span>Services</span>
                <span
                  className={`text-xs transition-transform ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {mobileServicesOpen && (
                <ul className="border-t border-slate-700">
                  {serviceLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block px-4 py-2 text-[0.9rem] hover:bg-slate-800/80 transition"
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileServicesOpen(false);
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {endLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mt-1 rounded-xl px-3 py-2 hover:bg-slate-800/80 transition"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
