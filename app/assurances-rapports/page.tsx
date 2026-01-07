export default function AssurancesPage() {
  return (
    <div>
      <h1 className="h1">Assurances & Rapports</h1>
      <p className="lead">
        Sur demande, nous pouvons fournir des rapports clairs et structurés
        (photos/vidéos, constat, recommandations) utilisables pour un dossier
        d’assurance ou pour établir un devis de réparation.
      </p>

      <div className="section card">
        <h2 className="h2">Documents possibles (sur demande)</h2>
        <ul className="lead" style={{ marginTop: 12 }}>
          <li>Rapport d’intervention détaillé</li>
          <li>Photos et/ou vidéos des constatations</li>
          <li>Schéma du réseau / de la zone concernée</li>
          <li>Recommandations et conseils de réparation</li>
        </ul>
      </div>
    </div>
  );
}
