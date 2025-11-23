
import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ContactStrip from "../../components/ContactStrip";

export default function ReparationEgoutsPage() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle
          title="Réparation des égouts"
          subtitle="Réhabilitation de conduites, remplacement de sections endommagées ou réparations ciblées."
        />

        <p className="text-slate-300 mt-4 text-sm md:text-base">
          Une canalisation fissurée, affaissée ou cassée peut provoquer des odeurs, des infiltrations
          ou des problèmes de stabilité. AquaPro-Détect Belgium réalise des réparations ciblées ou
          des remplacements complets de sections de conduites, selon l’état observé lors de
          l’inspection caméra. Nous privilégions toujours la solution la plus économique et durable.
        </p>
      </Container>

      <ContactStrip />
    </>
  );
}
