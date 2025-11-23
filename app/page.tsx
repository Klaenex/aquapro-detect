import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import ContactStrip from "../components/ContactStrip";

export default function Page() {
  return (
    <>
      <Container className="py-10">
        <SectionTitle
          title="AquaPro-Détect Belgium"
          subtitle="Recherche de fuite, inspection caméra & débouchage avec méthodes non destructives."
        />
        <p className="text-slate-300 mt-4">
          Bienvenue sur le site d’AquaPro-Détect Belgium. Nous intervenons partout en Belgique...
        </p>
      </Container>

      <ContactStrip />
    </>
  );
}
