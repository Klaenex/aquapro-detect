<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Méthode non autorisée"]);
    exit;
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "JSON invalide"]);
    exit;
}

// anti-spam honeypot (si un bot le remplit => on fait semblant que c'est OK)
if (!empty($data["website"])) {
    echo json_encode(["ok" => true]);
    exit;
}

$meta = $data["meta"] ?? [];
$serviceTitle = $meta["serviceTitle"] ?? "AquaPro-Détect";
$serviceCategory = $meta["serviceCategory"] ?? "";
$formType = $meta["formType"] ?? "";
$page = $meta["page"] ?? "";
$submittedAt = $meta["submittedAt"] ?? "";

// Champs principaux
$description = trim((string)($data["description"] ?? ""));
$urgence = trim((string)($data["urgence"] ?? ""));
$logement = trim((string)($data["logement"] ?? ""));
$etage = trim((string)($data["etage"] ?? ""));
$adresse = trim((string)($data["adresse"] ?? ""));
$disponibilites = trim((string)($data["disponibilites"] ?? ""));
$paiement = trim((string)($data["paiement"] ?? ""));

$nom = trim((string)($data["nom"] ?? ""));
$telephone = trim((string)($data["telephone"] ?? ""));
$email = trim((string)($data["email"] ?? ""));

// Validation minimale
if ($description === "" || $nom === "" || $telephone === "" || $email === "" || $adresse === "" || $disponibilites === "") {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Champs obligatoires manquants"]);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Email invalide"]);
    exit;
}

// Extras (optionnels)
$fuiteType = trim((string)($data["fuiteType"] ?? ""));
$signes = trim((string)($data["signes"] ?? ""));
$assurance = trim((string)($data["assurance"] ?? ""));

$acces = trim((string)($data["acces"] ?? ""));
$odeurs = trim((string)($data["odeurs"] ?? ""));
$assuranceInspection = trim((string)($data["assuranceInspection"] ?? ""));

$contexteNettoyage = trim((string)($data["contexteNettoyage"] ?? ""));
$niveau = trim((string)($data["niveau"] ?? ""));
$evacuation = trim((string)($data["evacuation"] ?? ""));

// >>>> DESTINATAIRE : remplace si besoin
$to = "contact@aquapro-detect.be";

// Sujet
$subject = "Nouvelle demande d’intervention — " . $serviceTitle;

// Corps du message
$lines = [];
$lines[] = "Nouvelle demande reçue (site AquaPro-Détect)";
$lines[] = "----------------------------------------";
$lines[] = "Service : " . $serviceTitle;
if ($serviceCategory !== "") $lines[] = "Catégorie : " . $serviceCategory;
if ($formType !== "") $lines[] = "Type formulaire : " . $formType;
if ($page !== "") $lines[] = "Page : " . $page;
if ($submittedAt !== "") $lines[] = "Date : " . $submittedAt;
$lines[] = "";
$lines[] = "DESCRIPTION";
$lines[] = $description;
$lines[] = "";
$lines[] = "INFOS INTERVENTION";
$lines[] = "Urgence : " . $urgence;
$lines[] = "Type de bien : " . $logement;
if ($etage !== "") $lines[] = "Étage : " . $etage;
$lines[] = "Adresse : " . $adresse;
$lines[] = "Disponibilités : " . $disponibilites;
if ($paiement !== "") $lines[] = "Paiement : " . $paiement;

$lines[] = "";
$lines[] = "CONTACT";
$lines[] = "Nom : " . $nom;
$lines[] = "Téléphone : " . $telephone;
$lines[] = "Email : " . $email;

$hasExtras = ($fuiteType || $signes || $assurance || $acces || $odeurs || $assuranceInspection || $contexteNettoyage || $niveau || $evacuation);
if ($hasExtras) {
    $lines[] = "";
    $lines[] = "INFOS COMPLEMENTAIRES";
    if ($fuiteType !== "") $lines[] = "Type fuite : " . $fuiteType;
    if ($signes !== "") $lines[] = "Signes visibles : " . $signes;
    if ($assurance !== "") $lines[] = "Assurance contactée : " . $assurance;

    if ($acces !== "") $lines[] = "Accès existant : " . $acces;
    if ($odeurs !== "") $lines[] = "Odeurs : " . $odeurs;
    if ($assuranceInspection !== "") $lines[] = "Assurance concernée : " . $assuranceInspection;

    if ($contexteNettoyage !== "") $lines[] = "Contexte nettoyage : " . $contexteNettoyage;
    if ($niveau !== "") $lines[] = "Niveau saleté : " . $niveau;
    if ($evacuation !== "") $lines[] = "Évacuation déchets : " . $evacuation;
}

$body = implode("\n", $lines);

// Headers
$fromEmail = "no-reply@aquapro-detect.be"; // idéalement une adresse existante du domaine
$headers = [];
$headers[] = "From: AquaPro-Détect <" . $fromEmail . ">";
$headers[] = "Reply-To: " . $email;
$headers[] = "Content-Type: text/plain; charset=utf-8";

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "Échec envoi email"]);
    exit;
}

echo json_encode(["ok" => true]);
