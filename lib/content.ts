export const CONTACT = {
  brand: "AquaPro-Détect Belgium",
  address: "Sint-Jansstraat 39, 3080 Tervuren",
  phone1: "0471 32 57 24",
  phone2: "0487 93 20 51",
  email: "contact@aquapro-detect.be",
  vat: "BE 1015.155.577",
};

export type Category = {
  slug: string;
  title: string; // Titre page / marketing
  navTitle: string; // Titre menu / navigation
  excerpt: string;
  imageURL: string;
  imageName: string;
};

export type ServiceFormType =
  | "debouchage"
  | "inspection"
  | "fuite"
  | "nettoyage"
  | "generic";

export type Service = {
  slug: string;
  title: string; // Titre page / marketing
  navTitle: string; // Titre menu / navigation
  excerpt: string;
  categorySlug: string;
  categoryTitle: string;
  imageURL: string;
  imageName: string;

  hero: string;
  methods: string[];
  process: string[];
  documents: string[];
  advantages: string[];
  formType: ServiceFormType;
};

export type Problem = {
  slug: string;
  title: string; // Titre page / marketing
  navTitle: string; // Titre menu / navigation
  excerpt: string;
  content: string[];
  relatedServices: Array<{ categorySlug: string; serviceSlug: string }>;
};

export const CATEGORIES: Category[] = [
  {
    slug: "detection-diagnostic",
    title: "Détection & Diagnostic",
    navTitle: "Détection & Diagnostic",
    excerpt:
      "Localisation précise, sans casse inutile, avec méthodes adaptées et rapports exploitables.",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },
  {
    slug: "egouts-canalisations",
    title: "Égouts & Canalisations",
    navTitle: "Égouts & Canalisations",
    excerpt:
      "Inspection, débouchage 24/7, entretien, réparations et analyse de stabilité liée au réseau.",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },
  {
    slug: "nettoyage-sinistres",
    title: "Nettoyage & Sinistres",
    navTitle: "Nettoyage & Sinistres",
    excerpt:
      "Remise en état fin de bail ou après sinistre : intervention clé-en-main.",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },
];

export const SERVICES: Service[] = [
  // ============================
  // Détection & Diagnostic
  // ============================

  {
    slug: "recherche-de-fuite",
    title: "Recherche de fuite",
    navTitle: "Recherche de Fuite",
    excerpt:
      "Localisation précise des fuites d’eau (plomberie, toiture, chauffage, enterré) sans casse inutile.",
    categorySlug: "detection-diagnostic",
    categoryTitle: "Détection & Diagnostic",
    hero: "Nous localisons précisément les fuites d’eau (plomberie, canalisations enterrées, chauffage, toiture, etc.) sans casse inutile, en utilisant la méthode la plus adaptée à chaque situation.",
    methods: [
      "Testeur d’humidité",
      "Caméra thermique",
      "Caméra endoscopique",
      "Caméra d’inspection des égouts",
      "Tests colorants (fluorescéine)",
      "Autres outils professionnels selon le type de fuite",
    ],
    process: [
      "Inspection visuelle complète des lieux",
      "Vérification des zones sensibles afin d’identifier tous les points nécessaires à l’enquête",
      "Utilisation des équipements de détection (caméra thermique, caméra d’égout, endoscope, etc.)",
      "Si nécessaire, ouverture contrôlée de zones stratégiques (gaine technique, sous baignoire, faux plafond…) pour améliorer la visibilité",
      "Test à la fluorescéine (ou autre) pour confirmer et localiser précisément la fuite",
    ],
    documents: [
      "Rapport d’intervention détaillé (sur demande)",
      "Schéma explicatif du réseau ou de la zone concernée (sur demande)",
      "Photos et/ou vidéos des constatations (sur demande)",
      "Recommandations et conseils de réparation (sur demande)",
    ],
    advantages: [
      "Diagnostic fiable, précis et exploitable",
      "Gain de temps considérable",
      "Évite les travaux inutiles et les coûts superflus",
      "Rapport utilisable pour l’assurance et/ou pour établir un devis de réparation",
    ],
    formType: "fuite",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },

  {
    slug: "camera-thermique",
    title: "Caméra thermique",
    navTitle: "Caméra Thermique",
    excerpt:
      "Détection des ponts thermiques, pertes d’isolation, infiltrations et zones humides invisibles à l’œil nu.",
    categorySlug: "detection-diagnostic",
    categoryTitle: "Détection & Diagnostic",
    hero: "Grâce à l’imagerie infrarouge, nous détectons les ponts thermiques, pertes d’isolation, infiltrations d’eau, humidité et anomalies invisibles à l’œil nu (murs, plafonds, sols, conduites, etc.).",
    methods: [
      "Caméras thermiques professionnelles haute résolution",
      "Hygromètre & thermo-hygromètre",
      "Logiciels d’analyse thermique pour interprétation des relevés",
    ],
    process: [
      "Inspection visuelle complète de l’environnement",
      "Analyse thermique des zones à risque (murs, plafonds, sols, conduites de chauffage, etc.)",
      "Identification et localisation des anomalies (points chauds/froids, zones humides, fuites de chaleur)",
      "Mesure de l’humidité relative (RH %) pour confirmer les risques d’infiltration",
      "Vérification/analyse des systèmes de ventilation/aération pour limiter condensation et récidives",
    ],
    documents: [
      "Rapport d’intervention détaillé (sur demande)",
      "Schéma explicatif de la zone analysée (sur demande)",
      "Photos thermiques avec annotations et comparaison visuelle (sur demande)",
      "Recommandations techniques (isolation, ventilation, réparation, amélioration énergétique) (sur demande)",
    ],
    advantages: [
      "Diagnostic rapide et sans destruction",
      "Aide à prioriser les travaux réellement nécessaires",
      "Document exploitable pour assurance / devis de réparation",
      "Réduit les risques de récidive (condensation/ventilation)",
    ],
    formType: "fuite",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },

  {
    slug: "test-fumigene",
    title: "Test fumigène",
    navTitle: "Test Fumigène",
    excerpt:
      "Contrôle d’étanchéité : détection de fuites, reflux, défauts d’aération et prises d’air parasites.",
    categorySlug: "detection-diagnostic",
    categoryTitle: "Détection & Diagnostic",
    hero: "Nous réalisons des tests fumigènes afin de vérifier l’étanchéité des réseaux d’évacuation et détecter les points de fuite, reflux, défauts d’aération ou prises d’air parasites. Aussi utile pour ventilation, hottes, conduits de cheminée/chaudière, etc.",
    methods: [
      "Générateur de fumée certifié (fumée dense, non toxique, visible)",
      "Inspection caméra en complément si nécessaire",
      "Équipement adapté aux bâtiments privés, professionnels ou publics",
    ],
    process: [
      "Injection contrôlée de fumée dans le réseau à inspecter",
      "Observation visuelle des sorties pour identifier fuites, raccords défaillants, erreurs de raccordement, mauvaise étanchéité",
      "Localisation et marquage précis des anomalies pour faciliter les réparations",
      "Rapport clair (sur demande) avec description des défauts + recommandations",
    ],
    documents: [
      "Rapport clair et structuré (sur demande)",
      "Photos explicatives (sur demande)",
      "Description détaillée des défauts détectés (sur demande)",
      "Localisation des problèmes + recommandations techniques (sur demande)",
    ],
    advantages: [
      "Méthode très visuelle et précise",
      "Évite les recherches destructives",
      "Facilite des réparations ciblées",
      "Document exploitable pour assurance / architecte / entrepreneur",
    ],
    formType: "inspection",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },

  {
    slug: "detection-sonar",
    title: "Détection sonar",
    navTitle: "Détection Sonar",
    excerpt:
      "Localisation précise de canalisations/éléments enterrés (regards, citernes, fosses, conduites non répertoriées).",
    categorySlug: "detection-diagnostic",
    categoryTitle: "Détection & Diagnostic",
    hero: "Nous utilisons la détection sonar pour localiser avec précision canalisations et éléments enterrés, même lorsqu’ils ne sont pas accessibles (regards enterrés/invisibles, citernes, fosses septiques, conduites non répertoriées…).",
    methods: [
      "Sonar",
      "Localisation associée à une caméra d’inspection ou à un nettoyage haute pression (hydrocurage) si besoin",
      "Marquage au sol / plan de localisation selon la demande",
    ],
    process: [
      "Recherche et détection des éléments enterrés ou non visibles",
      "Localisation précise des conduites, obstacles, vides ou équipements",
      "Vérification du tracé du réseau en complément d’une inspection caméra",
      "Marquage au sol ou plan de localisation (sur demande)",
    ],
    documents: [
      "Plan ou schéma de localisation (sur demande) avec profondeurs/distances approximatives",
      "Recommandations techniques pour les travaux à prévoir",
    ],
    advantages: [
      "Évite les creusements inutiles",
      "Réduit le temps d’intervention et les coûts liés aux recherches destructives",
      "Identifie précisément le réseau avant travaux ou réparations",
      "Très utile quand aucun accès n’est visible",
    ],
    formType: "inspection",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },

  // ============================
  // Égouts & Canalisations
  // ============================

  {
    slug: "inspection-camera",
    title: "Inspection caméra des égouts",
    navTitle: "Inspection Caméra",
    excerpt:
      "Inspection vidéo : obstructions, fissures, effondrements, contre-pentes, infiltrations + schéma du réseau.",
    categorySlug: "egouts-canalisations",
    categoryTitle: "Égouts & Canalisations",
    hero: "Nous réalisons une inspection vidéo complète des canalisations et du réseau d’égouttage afin de vérifier l’état général, détecter les obstructions, fissures, effondrements, contre-pentes et infiltrations.",
    methods: [
      "Caméra d’inspection haute définition (avec sonde de localisation)",
      "Logiciels d’enregistrement photo/vidéo et cartographie",
      "Localisation de profondeur, diamètre et nature des conduites",
      "Détection de chambres de visite, fosses ou citernes non accessibles avec sonar (si nécessaire)",
    ],
    process: [
      "Introduction de la caméra via un regard/chambre de visite ou un accès existant",
      "Inspection complète du réseau + prise de photos",
      "Relevé du réseau : schéma détaillé (positions des regards, longueurs, diamètres, matériaux, profondeur/direction)",
      "Constat précis des anomalies (racines, fissures, contre-pentes, ruptures, bouchons, etc.)",
      "Recommandations techniques et priorités d’intervention",
    ],
    documents: [
      "Rapport d’intervention détaillé (sur demande)",
      "Schéma explicatif du réseau/zone analysée (sur demande)",
      "Photos/vidéos (sur demande)",
      "Recommandations techniques (sur demande)",
    ],
    advantages: [
      "Diagnostic précis et visuel",
      "Aide à cibler les réparations (moins de casse)",
      "Document exploitable pour assurance / devis",
      "Permet de prioriser les travaux",
    ],
    formType: "inspection",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },

  {
    slug: "analyse-stabilite",
    title: "Analyse des problèmes de stabilité",
    navTitle: "Analyse de Stabilité",
    excerpt:
      "Service complémentaire : vérifier un lien entre dégâts du bâtiment et anomalies du réseau d’égouts.",
    categorySlug: "egouts-canalisations",
    categoryTitle: "Égouts & Canalisations",
    hero: "Nous analysons l’état du réseau d’égouts pour vérifier s’il existe un lien entre celui-ci et les dégâts observés (affaissements, fissures murales, sols instables). Si aucune anomalie n’est constatée, nous recommandons un bureau d’étude en stabilité.",
    methods: [
      "Inspection visuelle du bâtiment (intérieur et extérieur)",
      "Relevé du réseau d’égouts par caméra (en complément)",
      "Photographies et constat technique",
    ],
    process: [
      "Inspection visuelle + relevé des fissures/zones à risque",
      "Inspection du réseau d’égouts pour vérifier l’état des conduites",
      "Analyse des causes probables (fuite continue, canalisation cassée, infiltration/affaissement du sol)",
      "Recommandations : travaux réseau ou expertise stabilité si nécessaire",
    ],
    documents: [
      "Rapport clair et exploitable (sur demande)",
      "Photos et constat technique (sur demande)",
      "Recommandations pour la suite (sur demande)",
    ],
    advantages: [
      "Aide à prendre une décision rapide et efficace",
      "Évite des travaux coûteux et inutiles",
      "Utile pour assurance / architecte / entrepreneur",
      "Permet de confirmer/écarter la piste « réseau d’égouts »",
    ],
    formType: "inspection",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },

  {
    slug: "debouchage-24-7",
    title: "Débouchage + service d’urgence 24/7",
    navTitle: "Débouchage 24/7",
    excerpt:
      "Débouchage rapide : canalisations, évacuations, colonnes, égouts. Urgence 24/7 selon la situation.",
    categorySlug: "egouts-canalisations",
    categoryTitle: "Égouts & Canalisations",
    hero: "Intervention rapide pour déboucher canalisations, évacuations, colonnes et réseaux d’égouts. Service d’urgence 24/7 selon la situation.",
    methods: [
      "Haute pression (hydrocurage)",
      "Furets motorisés",
      "Caméra pour diagnostic post-débouchage (si demandé)",
      "Outils mécaniques adaptés",
    ],
    process: [
      "Diagnostic rapide à l’arrivée (caméra si nécessaire)",
      "Débouchage adapté (hydrocurage, furet, aspiration selon cas)",
      "Vérification par test d’écoulement et/ou caméra (sur demande)",
      "Conseils/recommandations sur place (sur demande)",
    ],
    documents: [
      "Rapport simple expliquant la situation et recommandations (sur demande)",
    ],
    advantages: [
      "Intervention rapide",
      "Réduction des dégâts (reflux, débordement)",
      "Diagnostic clair pour éviter la récidive",
      "Possibilité d’urgence 24/7",
    ],
    formType: "debouchage",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },

  {
    slug: "entretien-egouts",
    title: "Entretien des égouts",
    navTitle: "Entretien des Égouts",
    excerpt:
      "Entretien préventif (collectivités, industries, immeubles) : nettoyage, hydrocurage, suivi des anomalies.",
    categorySlug: "egouts-canalisations",
    categoryTitle: "Égouts & Canalisations",
    hero: "Programmes d’entretien préventif pour maintenir le bon fonctionnement des réseaux et limiter les risques de bouchage et sinistres (collectivités, industries, immeubles).",
    methods: [
      "Inspection périodique (selon besoin)",
      "Hydrocurage / nettoyage haute pression",
      "Nettoyage de regards et bacs",
      "Suivi des tronçons critiques",
    ],
    process: [
      "Mise en place d’un planning d’entretien adapté (fréquence selon usage)",
      "Nettoyage complet + vérification des zones sensibles",
      "Rapport d’entretien et suivi des anomalies pour planification",
    ],
    documents: [
      "Rapport d’entretien (sur demande)",
      "Suivi des anomalies/points à surveiller (sur demande)",
    ],
    advantages: [
      "Réduit les risques de bouchage et de sinistre",
      "Prolonge la durée de vie du réseau",
      "Meilleure planification des interventions",
      "Approche préventive = coûts maîtrisés",
    ],
    formType: "inspection",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },

  {
    slug: "reparation-egouts",
    title: "Réparation d’égouts",
    navTitle: "Réparation des Égouts",
    excerpt:
      "Réparation ciblée, remplacement de tronçons, scellement, manchons, réhabilitation partielle.",
    categorySlug: "egouts-canalisations",
    categoryTitle: "Égouts & Canalisations",
    hero: "Réparation ciblée des conduites : remplacement de tronçons, scellement de fissures, pose de manchons ou réhabilitation partielle. Solutions sans tranchée quand possible, ou ouverture locale si nécessaire.",
    methods: [
      "Travaux en régie",
      "Réparation ponctuelle / ciblée",
      "Méthodes sans tranchée quand possible (manchonnage)",
      "Ouverture locale si nécessaire",
    ],
    process: [
      "Diagnostic préalable (souvent via inspection caméra)",
      "Proposition de solutions (réparation locale vs remplacement)",
      "Devis détaillé avec options",
      "Intervention ciblée pour solution durable",
    ],
    documents: [
      "Devis détaillé avec options",
      "Recommandations techniques (sur demande)",
    ],
    advantages: [
      "Solution durable",
      "Minimise les coûts via réparations ciblées",
      "Réduit la casse quand une solution localisée est possible",
      "Devis clair avec alternatives",
    ],
    formType: "inspection",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },

  // ============================
  // Nettoyage & Sinistres
  // ============================

  {
    slug: "nettoyage-fin-de-bail",
    title: "Nettoyage fin de bail",
    navTitle: "Nettoyage Fin de Bail",
    excerpt:
      "Remise en état complète logement/commerce : état des lieux sans contestation.",
    categorySlug: "nettoyage-sinistres",
    categoryTitle: "Nettoyage & Sinistres",
    hero: "Remise en état complète dans le cadre d’une fin de bail / état des lieux : nettoyage approfondi, désinfection si nécessaire, évacuation des déchets et remise au propre.",
    methods: [
      "Nettoyage mécanique & manuel",
      "Décrassage intensif (cuisine, sanitaires, sols, murs)",
      "Produits professionnels adaptés",
      "Évacuation des déchets/encombrants si besoin",
      "Désinfection / décontamination selon situation",
    ],
    process: [
      "Évaluation initiale + devis sur-mesure",
      "Tri, évacuation & nettoyage approfondi (surfaces, sanitaires, cuisine, etc.)",
      "Contrôle qualité & restitution (photos possibles, passage avec agence/propriétaire si besoin)",
    ],
    documents: [
      "Rapport détaillé des travaux (sur demande)",
      "Photos avant/après (sur demande)",
    ],
    advantages: [
      "Locaux remis en état sans contestation à l’état des lieux",
      "Conforme aux exigences d’agences et propriétaires",
      "Intervention rapide, discrète et clé-en-main",
      "Bâtiment prêt à être restitué / reloué / vendu",
    ],
    formType: "nettoyage",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },

  {
    slug: "nettoyage-apres-sinistre",
    title: "Nettoyage après sinistre",
    navTitle: "Nettoyage Après Sinistre",
    excerpt:
      "Après incendie, dégâts des eaux, squat, insalubrité, décès… : remise en état et décontamination.",
    categorySlug: "nettoyage-sinistres",
    categoryTitle: "Nettoyage & Sinistres",
    hero: "Intervention après sinistre (incendie, dégâts des eaux, squat, insalubrité, décès, etc.) : nettoyage approfondi, désinfection, évacuation et remise en état pour retrouver un lieu sain et exploitable.",
    methods: [
      "Nettoyage intensif et décrassage",
      "Désinfection / décontamination certifiée",
      "Évacuation des déchets/encombrants",
      "Produits et matériel professionnels adaptés au type de pollution",
      "Prélèvements/tests si nécessaires (odeurs, humidité, bactéries…)",
    ],
    process: [
      "Évaluation initiale + devis sur-mesure",
      "Tri, évacuation & nettoyage approfondi",
      "Désinfection si risque sanitaire / contamination",
      "Contrôle qualité & restitution (photos possibles)",
    ],
    documents: [
      "Rapport détaillé (sur demande)",
      "Photos avant/après (sur demande)",
    ],
    advantages: [
      "Remise en état rapide et complète",
      "Intervention discrète et professionnelle",
      "Conforme aux exigences agences/assurances",
      "Lieu prêt à être réhabité / reloué / sécurisé",
    ],
    formType: "nettoyage",
    imageURL: "/img/stock/worker.jpg",
    imageName: "worker.jpg",
  },
];

export const PROBLEMS: Problem[] = [
  {
    slug: "odeurs-egout",
    title: "Odeurs d’égout",
    navTitle: "Odeurs d'égout",
    excerpt:
      "Mauvaises odeurs persistantes : identifier la source, vérifier étanchéité et ventilation.",
    content: [
      "Les odeurs d’égout peuvent venir d’un défaut d’étanchéité, d’une mauvaise ventilation, d’un siphon à sec ou d’un reflux.",
      "Un diagnostic ciblé permet de localiser le problème et d’éviter des travaux inutiles.",
    ],
    relatedServices: [
      { categorySlug: "detection-diagnostic", serviceSlug: "test-fumigene" },
      {
        categorySlug: "egouts-canalisations",
        serviceSlug: "inspection-camera",
      },
      { categorySlug: "egouts-canalisations", serviceSlug: "debouchage-24-7" },
    ],
  },
  {
    slug: "humidite-moisissures",
    title: "Humidité & moisissures",
    navTitle: "Humidité & moisissures",
    excerpt:
      "Taches, condensation, odeur de renfermé : détecter infiltration, fuite ou pont thermique.",
    content: [
      "L’humidité peut provenir d’une fuite, d’une infiltration, d’un problème de ventilation ou d’un pont thermique.",
      "Une inspection non destructive permet de confirmer l’origine et de prioriser les réparations.",
    ],
    relatedServices: [
      {
        categorySlug: "detection-diagnostic",
        serviceSlug: "recherche-de-fuite",
      },
      { categorySlug: "detection-diagnostic", serviceSlug: "camera-thermique" },
    ],
  },
  {
    slug: "fissures-stabilite",
    title: "Fissures & stabilité",
    navTitle: "Fissures & stabilité",
    excerpt:
      "Fissures, affaissements, sols instables : vérifier un lien possible avec le réseau d’égouts.",
    content: [
      "Certaines fissures peuvent être liées à une fuite continue, une canalisation cassée ou un affaissement du sol.",
      "Une inspection du réseau aide à confirmer/écarter cette piste avant d’envisager d’autres expertises.",
    ],
    relatedServices: [
      {
        categorySlug: "egouts-canalisations",
        serviceSlug: "inspection-camera",
      },
      {
        categorySlug: "egouts-canalisations",
        serviceSlug: "analyse-stabilite",
      },
      { categorySlug: "detection-diagnostic", serviceSlug: "detection-sonar" },
    ],
  },
];

export const HERO = {
  title: ["Votre service de ", "confiance"],
  first_paragraph:
    "Avec plus de 15 ans d’expérience, AquaPro-Détect Belgium met son expertise au service des particuliers comme des professionnels.",
  second_paragraph:
    "Nous sommes spécialisés dans de nombreux domaines liés à la détection, l’inspection et l’entretien des bâtiments.",
};

export const EMERGENCY = {
  title: "Urgence Débouchage 24h/7j",
  paragraph: "Intervention rapide partout en région bruxelloise",
};

export const WHYAQUA = {
  title: "Pourquoi choisir AquaPro-Detect?",
  paragraph: [
    "Si vous recherchez une équipe sérieuse, professionnelle et efficace, ne  cherchez plus : vous êtes au bon endroit.",
    "Nous travaillons avec respect, transparence et professionnalisme.",
    "Nos tarifs sont clairs, détaillés et sans suppléments inattendus. Aucune mauvaise surprise : tout est annoncé à l’avance.",
    "En faisant appel à nos services, vous faites le choix de la tranquillité et de la qualité. Vous ne le regretterez pas, bien au contraire."
  ]
}