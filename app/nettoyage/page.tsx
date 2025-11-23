
import React from "react";
import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import ContactStrip from "../../components/ContactStrip";

export default function NettoyagePage() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle
          title="Nettoyage fin de bail & après sinistre"
          subtitle="Remise en état complète après dégâts des eaux, incendie, squat ou insalubrité."
        />

        <p className="text-slate-300 mt-4 text-sm md:text-base">
          Nous intervenons pour restaurer les logements dans les situations les plus difficiles :
          sinistre, dégâts des eaux, incendie, squat, insalubrité sévère, accumulation de déchets
          ou saleté extrême. Nous assurons le nettoyage complet, la désinfection, l’évacuation des
          encombrants et la remise en état pour permettre une relocation ou une vente rapide.
        </p>
      </Container>

      <ContactStrip />
    </>
  );
}
