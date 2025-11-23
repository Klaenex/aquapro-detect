"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SiteMenuGlass() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/a-propos", label: "À propos" },
    { href: "/recherche-fuite", label: "Recherche de fuite" },
    { href: "/inspection-camera", label: "Inspection caméra" },
    { href: "/debouchage", label: "Débouchage" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop Menu */}

      <nav className="hidden md:flex gap-6 text-sm font-medium">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-slate-200 hover:text-blue-300 transition backdrop-blur"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {/* Mobile Button */}
      <button
        className="md:hidden text-slate-200 text-xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
      {/* Mobile Menu */}
      {open && (
        <div className="absolute w-full left-0 top-16 bg-slate-900/60 backdrop-blur-lg border-b border-slate-700 p-6 z-40 md:hidden">
          <nav className="flex flex-col gap-4 text-slate-100 text-base">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-blue-300 transition"
                onClick={() => setOpen(false)}
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
