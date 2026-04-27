<?php
header('Content-Type: application/json; charset=utf-8');

$_allowedOrigins = [
    'https://aquapro-detect.be',
    'https://www.aquapro-detect.be'
];
$_origin = $_SERVER['HTTP_ORIGIN'] ?? '';
header('Access-Control-Allow-Origin: ' . (in_array($_origin, $_allowedOrigins, true) ? $_origin : 'https://aquapro-detect.be'));
header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/mailer.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function h($value)
{
    return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function format_submitted_at($value)
{
    $raw = trim((string)$value);
    if ($raw === "") return ["", ""];

    try {
        $dt = new DateTimeImmutable($raw);
        $dt = $dt->setTimezone(new DateTimeZone("Europe/Brussels"));
        return [$dt->format("d/m/Y"), $dt->format("H:i")];
    } catch (Exception $e) {
        return [$raw, ""];
    }
}

function send_or_store_mail($to, $subject, $textBody, $htmlBody, $headers)
{
    $message = mailer_compose_message($textBody, $htmlBody, $headers);
    $ok = deliver_mail($to, $subject, $message["body"], implode("\r\n", $message["headers"]));
    return [
        "ok" => $ok,
        "transport" => mailer_last_transport(),
    ];
}

function send_customer_confirmation($email, $nom, $prenom, $objet, $submittedDate, $submittedTime, $fromEmail)
{
    $displayName = trim($prenom . " " . $nom);
    $confirmationSubject = "Nous avons bien reçu votre message";

    $confirmationTextLines = [];
    $confirmationTextLines[] = "Bonjour " . $displayName . ",";
    $confirmationTextLines[] = "";
    $confirmationTextLines[] = "Nous vous confirmons la bonne réception de votre message.";
    $confirmationTextLines[] = "Notre équipe reviendra vers vous dans les plus brefs délais.";
    if ($objet !== "") {
        $confirmationTextLines[] = "";
        $confirmationTextLines[] = "Objet : " . $objet;
    }
    if ($submittedDate !== "") $confirmationTextLines[] = "Date : " . $submittedDate;
    if ($submittedTime !== "") $confirmationTextLines[] = "Heure : " . $submittedTime;
    $confirmationTextLines[] = "";
    $confirmationTextLines[] = "Si vous souhaitez ajouter une précision, vous pouvez répondre à cet email.";
    $confirmationTextLines[] = "";
    $confirmationTextLines[] = "AquaPro-Détect";
    $confirmationTextBody = implode("\n", $confirmationTextLines);

    $confirmationHtml = [];
    $confirmationHtml[] = '<!doctype html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' . h($confirmationSubject) . '</title></head><body style="margin:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#122033;">';
    $confirmationHtml[] = '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;"><tr><td align="center">';
    $confirmationHtml[] = '<table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #d8e1ea;">';
    $confirmationHtml[] = '<tr><td style="background:#0a5b8c;color:#ffffff;padding:16px 20px;font-size:20px;font-weight:700;">Message de contact reçu</td></tr>';
    $confirmationHtml[] = '<tr><td style="padding:20px;line-height:1.6;">';
    $confirmationHtml[] = '<p style="margin:0 0 12px;">Bonjour ' . h($displayName) . ',</p>';
    $confirmationHtml[] = '<p style="margin:0 0 12px;">Nous vous confirmons la bonne réception de votre message.</p>';
    $confirmationHtml[] = '<p style="margin:0 0 18px;">Notre équipe reviendra vers vous dans les plus brefs délais.</p>';
    if ($objet !== "" || $submittedDate !== "" || $submittedTime !== "") {
        $confirmationHtml[] = '<div style="margin:0 0 18px;padding:14px;border:1px solid #d8e1ea;border-radius:10px;background:#f9fbfe;">';
        if ($objet !== "") $confirmationHtml[] = '<p style="margin:0 0 8px;"><strong>Objet :</strong> ' . h($objet) . '</p>';
        if ($submittedDate !== "") $confirmationHtml[] = '<p style="margin:0 0 8px;"><strong>Date :</strong> ' . h($submittedDate) . '</p>';
        if ($submittedTime !== "") $confirmationHtml[] = '<p style="margin:0;"><strong>Heure :</strong> ' . h($submittedTime) . '</p>';
        $confirmationHtml[] = '</div>';
    }
    $confirmationHtml[] = '<p style="margin:0 0 12px;">Si vous souhaitez ajouter une précision, vous pouvez répondre à cet email.</p>';
    $confirmationHtml[] = '<p style="margin:0;">AquaPro-Détect</p>';
    $confirmationHtml[] = '</td></tr></table></td></tr></table></body></html>';
    $confirmationHtmlBody = implode("", $confirmationHtml);

    $confirmationHeaders = [];
    $confirmationHeaders[] = "MIME-Version: 1.0";
    $confirmationHeaders[] = mailer_address_header("From", $fromEmail, "AquaPro-Détect");
    $confirmationHeaders[] = mailer_address_header("Reply-To", $fromEmail);
    $confirmationHeaders[] = "Content-Type: text/html; charset=utf-8";

    $result = send_or_store_mail(
        $email,
        $confirmationSubject,
        $confirmationTextBody,
        $confirmationHtmlBody,
        $confirmationHeaders
    );

    return [
        "ok" => $result["ok"] ?? false,
        "transport" => $result["transport"] ?? null,
        "detail" => mailer_last_error(),
        "subject" => $confirmationSubject,
    ];
}

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
$submittedAt = trim((string)($data["submittedAt"] ?? ""));
[$submittedDate, $submittedTime] = format_submitted_at($submittedAt);

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

$to = getenv("FORM_TO_CONTACT")
    ?: getenv("MAIL_TO_CONTACT")
    ?: "contact@aquapro-detect.be";
$subject = "Nouveau message de contact — " . $objet;

$lines = [];
$lines[] = "Nouveau message reçu (site AquaPro-Détect)";
$lines[] = "----------------------------------------";
$lines[] = "Nom : " . $nom . " " . $prenom;
$lines[] = "Email : " . $email;
if ($submittedDate !== "") $lines[] = "Date : " . $submittedDate;
if ($submittedTime !== "") $lines[] = "Heure : " . $submittedTime;
$lines[] = "";
$lines[] = "OBJET";
$lines[] = $objet;
$lines[] = "";
$lines[] = "MESSAGE";
$lines[] = $message;

$textBody = implode("\n", $lines);

$metaRows = [];
$metaRows[] = '<tr><td style="padding:0 12px 12px 0;font-weight:700;vertical-align:top;white-space:nowrap;">Nom :</td><td style="padding:0 0 12px 0;">' . h($nom . ' ' . $prenom) . '</td></tr>';
$metaRows[] = '<tr><td style="padding:0 12px 12px 0;font-weight:700;vertical-align:top;white-space:nowrap;">Email :</td><td style="padding:0 0 12px 0;"><a href="mailto:' . h($email) . '" style="color:#0a5b8c;">' . h($email) . '</a></td></tr>';
$metaRows[] = '<tr><td style="padding:0 12px 12px 0;font-weight:700;vertical-align:top;white-space:nowrap;">Objet :</td><td style="padding:0 0 12px 0;">' . h($objet) . '</td></tr>';
if ($submittedDate !== "") $metaRows[] = '<tr><td style="padding:0 12px 12px 0;font-weight:700;vertical-align:top;white-space:nowrap;">Date :</td><td style="padding:0 0 12px 0;">' . h($submittedDate) . '</td></tr>';
if ($submittedTime !== "") $metaRows[] = '<tr><td style="padding:0 12px 18px 0;font-weight:700;vertical-align:top;white-space:nowrap;">Heure :</td><td style="padding:0 0 18px 0;">' . h($submittedTime) . '</td></tr>';

$htmlBody = '<!doctype html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'
    . h($subject)
    . '</title></head><body style="margin:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#122033;">'
    . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;"><tr><td align="center">'
    . '<table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #d8e1ea;">'
    . '<tr><td style="background:#0a5b8c;color:#ffffff;padding:16px 20px;font-size:20px;font-weight:700;">Nouveau message de contact</td></tr>'
    . '<tr><td style="padding:20px;">'
    . '<table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 12px 0;border-collapse:collapse;">' . implode("", $metaRows) . '</table>'
    . '<div style="margin-top:12px;padding:14px;border:1px solid #d8e1ea;border-radius:10px;background:#f9fbfe;white-space:pre-wrap;line-height:1.5;">' . h($message) . '</div>'
    . '</td></tr></table></td></tr></table></body></html>';

$internalFromEmail = getenv("MAIL_FROM_CONTACT")
    ?: getenv("MAIL_FROM")
    ?: "contact@aquapro-detect.be";
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = mailer_address_header("From", $internalFromEmail, "AquaPro-Détect");
$headers[] = mailer_address_header("Reply-To", $email);
$headers[] = "Content-Type: text/html; charset=utf-8";

$result = send_or_store_mail($to, $subject, $textBody, $htmlBody, $headers);

if (!$result["ok"]) {
    error_log("AquaPro contact form: deliver_mail failed for recipient " . $to);
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "error" => "Échec envoi email",
        "transport" => $result["transport"] ?? null,
        "detail" => mailer_last_error(),
    ]);
    exit;
}

$confirmationFromEmail = getenv("MAIL_FROM_CONTACT")
    ?: getenv("MAIL_FROM")
    ?: "contact@aquapro-detect.be";

$confirmation = send_customer_confirmation(
    $email,
    $nom,
    $prenom,
    $objet,
    $submittedDate,
    $submittedTime,
    $confirmationFromEmail
);

if (!$confirmation["ok"]) {
    error_log(
        "AquaPro contact form: confirmation email failed for client "
            . $email
            . " — "
            . ($confirmation["detail"] ?? "Erreur inconnue")
    );
}

echo json_encode([
    "ok" => true,
    "transport" => $result["transport"] ?? null,
    "confirmationSent" => $confirmation["ok"],
    "confirmationTransport" => $confirmation["transport"] ?? null,
]);
