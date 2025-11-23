
import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ContactStrip from "../../components/ContactStrip";

export default function DetectionSonarPage() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle
          title="Détection sonar des conduites enterrées"
          subtitle="Localisation précise des canalisations, citernes, chambres de visite et fosses septiques."
        />

        <p className="text-slate-300 mt-4 text-sm md:text-base">
          La détection sonar permet de localiser des conduites ou structures enterrées sans creuser.
          Grâce à cette technologie, il est possible d’identifier le tracé d’un égout, la position
          d’une chambre de visite invisible ou d’une citerne enterrée. Une solution idéale avant des
          travaux de rénovation ou d’aménagement extérieur.
        </p>
      </Container>

      <ContactStrip />
    </>
  );
}
