export default function AboutPage() {
  return (
    <div>
      <h1 className="h1">À propos</h1>
      <p className="lead">
        Avec plus de 15 ans d’expérience, AquaPro-Détect Belgium intervient avec
        sérieux, transparence et professionnalisme. Tarifs clairs, travail
        soigné, et solutions adaptées à chaque situation.
      </p>

      <div className="section card">
        <h2 className="h2">Nos engagements</h2>
        <ul className="lead" style={{ marginTop: 12 }}>
          <li>Interventions réalisées avec soin et respect</li>
          <li>Diagnostic fiable et recommandations concrètes</li>
          <li>Tarifs annoncés à l’avance, sans mauvaises surprises</li>
          <li>Possibilité de rapport pour assurance (sur demande)</li>
        </ul>
      </div>
    </div>
  );
}
