
import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ContactStrip from "../../components/ContactStrip";

export default function RechercheFuitePage() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle
          title="Recherche de fuite d’eau sans destruction"
          subtitle="Localisation précise des infiltrations et pertes d’eau grâce à des méthodes professionnelles."
        />

        <p className="text-slate-300 mt-4 text-sm md:text-base">
          L’apparition d’humidité, de taches, de moisissures ou une consommation d’eau anormale
          peut indiquer une fuite invisible. Une fuite non traitée peut provoquer des dégâts
          importants : affaissements, infiltration, dégradation des matériaux, odeurs et
          développement de moisissures. AquaPro-Détect Belgium est spécialisé dans la détection
          non destructive des fuites grâce à l’utilisation de caméras thermiques, humidimètres,
          traceurs fluorescents et inspection caméra des conduites.
        </p>

        <h3 className="text-lg font-semibold text-slate-50 mt-8">
          Méthodes utilisées lors d’une recherche de fuite
        </h3>

        <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-300">
          <li>Caméra thermique pour localiser les zones froides ou humides.</li>
          <li>Détecteurs d’humidité pour identifier les zones saturées.</li>
          <li>Inspection caméra pour analyser les conduites d’évacuation.</li>
          <li>Fluorescéine pour confirmer les infiltrations.</li>
          <li>Tests ciblés de mise en pression ou de remplissage.</li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-50 mt-8">Déroulement d’une intervention</h3>

        <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-slate-300">
          <li>Analyse des symptômes et inspection visuelle.</li>
          <li>Tests ciblés selon la nature du problème.</li>
          <li>Inspection caméra ou caméra thermique si nécessaire.</li>
          <li>Ouverture localisée au bon endroit (seulement si indispensable).</li>
          <li>Rapport détaillé avec photos et recommandations.</li>
        </ol>

      </Container>

      <ContactStrip />
    </>
  );
}
