
import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";

export default function ContactPage() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle
          title="Contact"
          subtitle="Demandez une intervention, un devis ou une analyse technique."
        />

        <p className="text-slate-300 mt-4 text-sm md:text-base">
          Pour toute demande d’intervention ou d’information :
        </p>

        <ul className="mt-4 space-y-2 text-slate-300 text-sm">
          <li>📞 0471 32 57 24</li>
          <li>📞 0487 93 20 51</li>
          <li>✉️ h.s.andreiaf@gmail.com</li>
          <li>📍 Sint-Jansstraat 39, 3080 Tervuren</li>
        </ul>
      </Container>
    </>
  );
}
