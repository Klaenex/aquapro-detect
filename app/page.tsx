import React from "react";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";
import ContactStrip from "../components/ContactStrip";
import BentoGrid from "../components/BentoGrid";
import { ServiceCardProps } from "../components/ServiceCard";

export default function Page() {
  const services: ServiceCardProps[] = [
    {
      title: "Recherche de fuite",
      description:
        "Détection précise des infiltrations et pertes d’eau grâce à caméra thermique, fluorescéine, humidimètre et inspection ciblée.",
      icon: "💧",
      href: "/recherche-fuite",
      badge: "Non destructif",
      emphasis: "large",
    },
    {
      title: "Inspection caméra",
      description:
        "Analyse complète des réseaux d’égouts pour détecter fissures, racines, affaissements et obstructions.",
      icon: "🎥",
      href: "/inspection-camera",
      emphasis: "tall",
    },
    {
      title: "Débouchage 24/7",
      description:
        "Intervention rapide sur WC, évier, douche, baignoire, colonne et réseau d’égout.",
      icon: "🚨",
      href: "/debouchage",
      badge: "Urgences",
    },
    {
      title: "Détection sonar",
      description:
        "Localisation précise des conduites, citernes, fosses et chambres de visite enterrées.",
      icon: "📡",
      href: "/detection-sonar",
    },
    {
      title: "Test fumigène",
      description:
        "Détection des odeurs d’égout, reflux d’air et défauts d’aération dans les réseaux.",
      icon: "🌫️",
      href: "/test-fumigene",
    },
    {
      title: "Nettoyage sinistre & fin de bail",
      description:
        "Remise en état après dégâts des eaux, incendie, squat ou insalubrité.",
      icon: "🧹",
      href: "/nettoyage",
    },
    {
      title: "Réparation des égouts",
      description:
        "Remplacement et réparation des sections de conduites fissurées, affaissées ou cassées.",
      icon: "🛠️",
      href: "/reparation-egouts",
    },
  ];

  return (
    <>
      {/* HERO */}
      <Container className="py-14">
        <section className="grid gap-8 md:grid-cols-[3fr,2fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              Intervention en Belgique • +15 ans d’expérience
            </span>

            <h1 className="text-3xl md:text-5xl font-semibold text-slate-50 leading-tight">
              Recherche de fuite, inspection caméra & débouchage
              <span className="block text-blue-400">
                Diagnostic professionnel avec rapport complet.
              </span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base max-w-xl">
              AquaPro-Détect Belgium localise l’origine de vos fuites,
              infiltrations ou problèmes d’égout sans destruction inutile. Nos
              diagnostics sont exploitables par les assurances, architectes et
              syndics.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="rounded-full bg-blue-500 hover:bg-blue-400 px-6 py-2.5 text-sm font-semibold text-white shadow-lg"
              >
                Demander une intervention
              </a>
              <a
                href="#services"
                className="rounded-full border border-slate-700 bg-slate-900/60 px-6 py-2.5 text-sm text-slate-100 hover:border-slate-500"
              >
                Voir les services
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-blue-950/50 p-6 shadow-2xl">
            <p className="text-blue-300 text-xs uppercase tracking-wide">
              Diagnostic comme si c’était pour nous
            </p>
            <p className="text-slate-200 text-sm mt-2">
              Chaque intervention est documentée, expliquée et réalisée avec
              soin. Vous recevez un rapport complet avec photos et
              recommandations.
            </p>
          </div>
        </section>
      </Container>

      {/* BENTO SERVICES */}
      <Container id="services" className="py-10">
        <SectionTitle
          title="Nos services"
          subtitle="Toutes nos interventions, organisées pour une compréhension rapide."
        />
        <div className="mt-6">
          <BentoGrid services={services} />
        </div>
      </Container>

      {/* POURQUOI NOUS */}
      <Container id="pourquoi-nous" className="py-10">
        <SectionTitle title="Pourquoi choisir AquaPro-Détect Belgium ?" />
        <div className="grid gap-6 md:grid-cols-2 mt-4">
          <ul className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
            <li>
              ✔️ Plus de 15 ans d’expérience au service des particuliers & pros.
            </li>
            <li>✔️ Méthodes non destructives & matériel professionnel.</li>
            <li>
              ✔️ Rapport complet (photos/vidéos) pour assurance et expert.
            </li>
            <li>✔️ Transparence totale sur les tarifs.</li>
          </ul>
          <ul className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
            <li>✔️ Interventions rapides partout en Belgique.</li>
            <li>✔️ Conseils et recommandations claires après diagnostic.</li>
            <li>✔️ Solutions durables, jamais de réparations temporaires.</li>
            <li>✔️ Approche professionnelle et soignée.</li>
          </ul>
        </div>
      </Container>

      {/* CONTACT */}
      <ContactStrip />
    </>
  );
}
