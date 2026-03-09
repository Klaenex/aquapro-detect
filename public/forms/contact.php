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

if (!empty($data["website"])) {
    echo json_encode(["ok" => true]);
    exit;
}

$nom = trim((string)($data["nom"] ?? ""));
$prenom = trim((string)($data["prenom"] ?? ""));
$email = trim((string)($data["email"] ?? ""));
$objet = trim((string)($data["objet"] ?? ""));
$message = trim((string)($data["message"] ?? ""));
$page = trim((string)($data["page"] ?? ""));
$submittedAt = trim((string)($data["submittedAt"] ?? ""));

if ($nom === "" || $prenom === "" || $email === "" || $objet === "" || $message === "") {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Champs obligatoires manquants"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "Email invalide"]);
    exit;
}

$to = "contact@aquapro-detect.be";
$subject = "Nouveau message de contact — " . $objet;

$lines = [];
$lines[] = "Nouveau message reçu (site AquaPro-Détect)";
$lines[] = "----------------------------------------";
$lines[] = "Nom : " . $nom . " " . $prenom;
$lines[] = "Email : " . $email;
if ($page !== "") $lines[] = "Page : " . $page;
if ($submittedAt !== "") $lines[] = "Date : " . $submittedAt;
$lines[] = "";
$lines[] = "OBJET";
$lines[] = $objet;
$lines[] = "";
$lines[] = "MESSAGE";
$lines[] = $message;

$body = implode("\n", $lines);

$fromEmail = "no-reply@aquapro-detect.be";
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
