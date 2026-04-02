<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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
    $mode = strtolower((string)(getenv("MAIL_MODE") ?: "send"));

    if ($mode === "file") {
        $root = dirname(__DIR__, 2);
        $dir = $root . DIRECTORY_SEPARATOR . "tmp" . DIRECTORY_SEPARATOR . "mails";
        if (!is_dir($dir)) {
            @mkdir($dir, 0775, true);
        }

        $base = "contact-" . date("Ymd-His") . "-" . bin2hex(random_bytes(4));
        $textPath = $dir . DIRECTORY_SEPARATOR . $base . ".txt";
        $htmlPath = $dir . DIRECTORY_SEPARATOR . $base . ".html";
        $content = "TO: " . $to . "\n"
            . "SUBJECT: " . $subject . "\n"
            . "HEADERS:\n" . implode("\n", $headers) . "\n\n"
            . $textBody . "\n";

        $htmlContent = "<!-- TO: " . h($to) . " | SUBJECT: " . h($subject) . " -->\n" . $htmlBody;

        $okText = @file_put_contents($textPath, $content);
        $okHtml = @file_put_contents($htmlPath, $htmlContent);
        return [
            "ok" => $okText !== false && $okHtml !== false,
            "mode" => "file",
            "path" => $textPath,
            "htmlPath" => $htmlPath
        ];
    }

    $ok = @mail($to, $subject, $htmlBody, implode("\r\n", $headers));
    return ["ok" => $ok, "mode" => "send"];
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

$to = "hello@cuozzovincenzo.be";
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

$fromEmail = "hello@cuozzovincenzo.be";
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "From: AquaPro-Détect <" . $fromEmail . ">";
$headers[] = "Reply-To: " . $email;
$headers[] = "Content-Type: text/html; charset=utf-8";

$result = send_or_store_mail($to, $subject, $textBody, $htmlBody, $headers);

if (!$result["ok"]) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "Échec envoi email"]);
    exit;
}

echo json_encode([
    "ok" => true,
    "mode" => $result["mode"],
    "savedTo" => $result["path"] ?? null,
    "savedHtmlTo" => $result["htmlPath"] ?? null
]);
