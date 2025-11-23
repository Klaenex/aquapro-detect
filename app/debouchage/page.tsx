
import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ContactStrip from "../../components/ContactStrip";

export default function DebouchagePage() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle
          title="Débouchage urgent 24/7"
          subtitle="Intervention rapide pour WC, évier, douche, baignoire, colonne d’évacuation et égouts."
        />

        <p className="text-slate-300 mt-4 text-sm md:text-base">
          Un bouchon peut rapidement provoquer un débordement et endommager votre logement.
          AquaPro-Détect Belgium intervient en urgence pour déboucher tout type d’installation.
          Nous utilisons des outils professionnels : furet motorisé, haute pression et inspection
          caméra si nécessaire.
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-300">
          <li>Débouchage WC et colonne principale.</li>
          <li>Évier cuisine ou salle de bain.</li>
          <li>Douches, baignoires et siphons.</li>
          <li>Chambres de visite et réseaux d’égouts.</li>
        </ul>

      </Container>

      <ContactStrip />
    </>
  );
}
