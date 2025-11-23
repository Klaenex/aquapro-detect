
import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ContactStrip from "../../components/ContactStrip";

export default function InspectionCameraPage() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle
          title="Inspection caméra des réseaux d’égouts"
          subtitle="Analyse complète des conduites pour détecter fissures, obstructions, racines et affaissements."
        />

        <p className="text-slate-300 mt-4 text-sm md:text-base">
          L’inspection caméra permet d’observer l’intérieur des conduites d’égout et d’évacuation
          afin de détecter les anomalies : fissures, cassures, affaissements, contre-pentes,
          obstructions ou intrusions de racines. Cette méthode est indispensable pour les
          problèmes récurrents ou avant des travaux.
        </p>

        <h3 className="text-lg font-semibold text-slate-50 mt-8">
          Pourquoi faire une inspection caméra ?
        </h3>

        <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-300">
          <li>Identifier la cause exacte d’un bouchon ou d’un reflux.</li>
          <li>Vérifier l’état d’un réseau ancien.</li>
          <li>Contrôler après des travaux ou rénovations.</li>
          <li>Obtenir un rapport pour assurance, architecte ou expert.</li>
        </ul>
      </Container>

      <ContactStrip />
    </>
  );
}
