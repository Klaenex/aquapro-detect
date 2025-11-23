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
