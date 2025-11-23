
import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ContactStrip from "../../components/ContactStrip";

export default function TestFumigenePage() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle
          title="Test fumigène"
          subtitle="Détection des odeurs d’égout, reflux d’air et défauts d’aération dans les réseaux."
        />

        <p className="text-slate-300 mt-4 text-sm md:text-base">
          Le test fumigène est la méthode la plus efficace pour identifier les fuites d’air ou les
          défauts d’aération dans les réseaux d’égout. En injectant une fumée non toxique, on peut
          visualiser immédiatement les zones défectueuses : rupture, fissure, ventilation
          insuffisante ou mauvais raccordement.
        </p>
      </Container>

      <ContactStrip />
    </>
  );
}
