
import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ContactStrip from "../../components/ContactStrip";

export default function AProposPage() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle
          title="À propos d’AquaPro-Détect Belgium"
          subtitle="Plus de 15 ans d’expérience dans le diagnostic non destructif, la recherche de fuite et l’inspection des réseaux."
        />

        <p className="text-slate-300 mt-4 text-sm md:text-base">
          AquaPro-Détect Belgium est une entreprise spécialisée dans la recherche de fuite,
          l’inspection caméra des égouts, le débouchage et le diagnostic technique des bâtiments.
          Depuis plus de quinze ans, nous intervenons auprès de particuliers, syndics, entreprises,
          agences immobilières et services publics. Notre expertise repose sur un travail soigné,
          précis et documenté, permettant à nos clients de prendre les bonnes décisions, en toute
          transparence.
        </p>

        <p className="text-slate-300 mt-4 text-sm md:text-base">
          Notre approche consiste à intervenir comme si nous travaillions dans notre propre
          logement : respect du bien, explications claires, solutions durables et tarification
          annoncée à l’avance. Nous privilégions les méthodes non destructives pour préserver les
          structures et réduire les coûts de réparation.
        </p>

        <h3 className="text-lg font-semibold text-slate-50 mt-8">
          Nos valeurs fondamentales
        </h3>

        <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc pl-4">
          <li>Transparence totale et explications accessibles.</li>
          <li>Diagnostic précis grâce à des outils professionnels.</li>
          <li>Rapports clairs, photos et vidéos disponibles.</li>
          <li>Interventions soignées, propres et respectueuses.</li>
          <li>Solutions durables, jamais de réparations temporaires.</li>
        </ul>
      </Container>

      <ContactStrip />
    </>
  );
}
