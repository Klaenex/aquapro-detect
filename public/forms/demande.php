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

function normalize_uploaded_files($field)
{
    if (!isset($_FILES[$field])) return [];

    $files = $_FILES[$field];
    if (!is_array($files["name"])) {
        return [$files];
    }

    $normalized = [];
    $count = count($files["name"]);
    for ($i = 0; $i < $count; $i++) {
        $normalized[] = [
            "name" => $files["name"][$i] ?? "",
            "type" => $files["type"][$i] ?? "",
            "tmp_name" => $files["tmp_name"][$i] ?? "",
            "error" => $files["error"][$i] ?? UPLOAD_ERR_NO_FILE,
            "size" => $files["size"][$i] ?? 0,
        ];
    }

    return $normalized;
}

function collect_photo_attachments($field)
{
    $allowedMimeTypes = [
        "image/jpeg" => "jpg",
        "image/png" => "png",
        "image/webp" => "webp",
        "image/gif" => "gif",
    ];
    $maxFiles = 5;
    $maxSize = 8 * 1024 * 1024;

    $files = normalize_uploaded_files($field);
    $attachments = [];
    $finfo = new finfo(FILEINFO_MIME_TYPE);

    foreach ($files as $file) {
        if (($file["error"] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
            continue;
        }

        if (count($attachments) >= $maxFiles) {
            return [null, "Maximum 5 photos autorisées."];
        }

        if (($file["error"] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
            return [null, "Erreur lors de l’envoi d’une photo."];
        }

        if (($file["size"] ?? 0) > $maxSize) {
            return [null, "Chaque photo doit faire moins de 8 Mo."];
        }

        $tmpName = (string)($file["tmp_name"] ?? "");
        if ($tmpName === "" || !is_uploaded_file($tmpName)) {
            return [null, "Fichier photo invalide."];
        }

        $mimeType = $finfo->file($tmpName);
        if (!isset($allowedMimeTypes[$mimeType])) {
            return [null, "Seuls les fichiers JPG, PNG, WEBP ou GIF sont acceptés."];
        }

        $contents = @file_get_contents($tmpName);
        if ($contents === false) {
            return [null, "Impossible de lire une photo envoyée."];
        }

        $originalName = trim((string)($file["name"] ?? ""));
        $safeName = preg_replace('/[^A-Za-z0-9._-]/', '-', $originalName);
        $safeName = trim((string)$safeName, "-.");
        if ($safeName === "") {
            $safeName = "photo-" . (count($attachments) + 1) . "." . $allowedMimeTypes[$mimeType];
        }

        $attachments[] = [
            "name" => $safeName,
            "mime" => $mimeType,
            "content" => $contents,
            "size" => (int)($file["size"] ?? 0),
        ];
    }

    return [$attachments, null];
}

function send_or_store_mail($to, $subject, $textBody, $htmlBody, $headers, $attachments = [])
{
    $mode = strtolower((string)(getenv("MAIL_MODE") ?: "send"));

    if ($mode === "file") {
        $root = dirname(__DIR__, 2);
        $dir = $root . DIRECTORY_SEPARATOR . "tmp" . DIRECTORY_SEPARATOR . "mails";
        if (!is_dir($dir)) {
            @mkdir($dir, 0775, true);
        }

        $base = "demande-" . date("Ymd-His") . "-" . bin2hex(random_bytes(4));
        $textPath = $dir . DIRECTORY_SEPARATOR . $base . ".txt";
        $htmlPath = $dir . DIRECTORY_SEPARATOR . $base . ".html";
        $attachmentsDir = $dir . DIRECTORY_SEPARATOR . $base . "-attachments";
        $content = "TO: " . $to . "\n"
            . "SUBJECT: " . $subject . "\n"
            . "HEADERS:\n" . implode("\n", $headers) . "\n\n"
            . $textBody . "\n";

        $htmlContent = "<!-- TO: " . h($to) . " | SUBJECT: " . h($subject) . " -->\n" . $htmlBody;

        $okText = @file_put_contents($textPath, $content);
        $okHtml = @file_put_contents($htmlPath, $htmlContent);
        $okAttachments = true;

        if (!empty($attachments)) {
            if (!is_dir($attachmentsDir)) {
                @mkdir($attachmentsDir, 0775, true);
            }

            foreach ($attachments as $attachment) {
                $saved = @file_put_contents(
                    $attachmentsDir . DIRECTORY_SEPARATOR . $attachment["name"],
                    $attachment["content"]
                );
                if ($saved === false) {
                    $okAttachments = false;
                    break;
                }
            }
        }

        return [
            "ok" => $okText !== false && $okHtml !== false && $okAttachments,
            "mode" => "file",
            "path" => $textPath,
            "htmlPath" => $htmlPath
        ];
    }

    $finalHeaders = $headers;
    $messageBody = $htmlBody;

    if (!empty($attachments)) {
        $mixedBoundary = "mix-" . bin2hex(random_bytes(12));
        $htmlBoundary = "alt-" . bin2hex(random_bytes(12));

        $finalHeaders = array_values(array_filter(
            $headers,
            function ($header) {
                return stripos($header, "Content-Type:") !== 0;
            }
        ));
        $finalHeaders[] = 'Content-Type: multipart/mixed; boundary="' . $mixedBoundary . '"';

        $parts = [];
        $parts[] = "--" . $mixedBoundary;
        $parts[] = 'Content-Type: multipart/alternative; boundary="' . $htmlBoundary . '"';
        $parts[] = "";
        $parts[] = "--" . $htmlBoundary;
        $parts[] = 'Content-Type: text/plain; charset="utf-8"';
        $parts[] = "Content-Transfer-Encoding: 8bit";
        $parts[] = "";
        $parts[] = $textBody;
        $parts[] = "";
        $parts[] = "--" . $htmlBoundary;
        $parts[] = 'Content-Type: text/html; charset="utf-8"';
        $parts[] = "Content-Transfer-Encoding: 8bit";
        $parts[] = "";
        $parts[] = $htmlBody;
        $parts[] = "";
        $parts[] = "--" . $htmlBoundary . "--";

        foreach ($attachments as $attachment) {
            $parts[] = "";
            $parts[] = "--" . $mixedBoundary;
            $parts[] = 'Content-Type: ' . $attachment["mime"] . '; name="' . $attachment["name"] . '"';
            $parts[] = 'Content-Disposition: attachment; filename="' . $attachment["name"] . '"';
            $parts[] = "Content-Transfer-Encoding: base64";
            $parts[] = "";
            $parts[] = chunk_split(base64_encode($attachment["content"]));
        }

        $parts[] = "--" . $mixedBoundary . "--";
        $parts[] = "";
        $messageBody = implode("\r\n", $parts);
    }

    $ok = @mail($to, $subject, $messageBody, implode("\r\n", $finalHeaders));
    return ["ok" => $ok, "mode" => "send"];
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "Méthode non autorisée"]);
    exit;
}

$contentType = strtolower((string)($_SERVER["CONTENT_TYPE"] ?? ""));
$data = null;

if (strpos($contentType, "multipart/form-data") !== false) {
    $metaRaw = (string)($_POST["meta"] ?? "");
    $meta = json_decode($metaRaw, true);
    $data = $_POST;
    $data["meta"] = is_array($meta) ? $meta : [];
} else {
    $raw = file_get_contents("php://input");
    $data = json_decode($raw, true);
}

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
$submittedAt = $meta["submittedAt"] ?? "";
[$submittedDate, $submittedTime] = format_submitted_at($submittedAt);

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

[$photoAttachments, $photosError] = collect_photo_attachments("photos");
if ($photosError !== null) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => $photosError]);
    exit;
}

// Plan de la maison (inspection uniquement, 1 fichier, PDF ou image, 10 Mo max)
$planAttachment = null;
if (isset($_FILES["plan"]) && ($_FILES["plan"]["error"] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    $planFile = $_FILES["plan"];
    $allowedPlanMimes = ["application/pdf" => "pdf", "image/jpeg" => "jpg", "image/png" => "png", "image/webp" => "webp"];
    $maxPlanSize = 10 * 1024 * 1024;

    if (($planFile["error"] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(["ok" => false, "error" => "Erreur lors de l'envoi du plan."]);
        exit;
    }
    if (($planFile["size"] ?? 0) > $maxPlanSize) {
        http_response_code(400);
        echo json_encode(["ok" => false, "error" => "Le plan doit faire moins de 10 Mo."]);
        exit;
    }
    $planTmp = (string)($planFile["tmp_name"] ?? "");
    if ($planTmp === "" || !is_uploaded_file($planTmp)) {
        http_response_code(400);
        echo json_encode(["ok" => false, "error" => "Fichier plan invalide."]);
        exit;
    }
    $finfoPlan = new finfo(FILEINFO_MIME_TYPE);
    $planMime = $finfoPlan->file($planTmp);
    if (!isset($allowedPlanMimes[$planMime])) {
        http_response_code(400);
        echo json_encode(["ok" => false, "error" => "Le plan doit être un PDF, JPG, PNG ou WEBP."]);
        exit;
    }
    $planContents = @file_get_contents($planTmp);
    if ($planContents === false) {
        http_response_code(400);
        echo json_encode(["ok" => false, "error" => "Impossible de lire le plan envoyé."]);
        exit;
    }
    $planOrigName = trim((string)($planFile["name"] ?? ""));
    $planSafeName = preg_replace('/[^A-Za-z0-9._-]/', '-', $planOrigName);
    $planSafeName = trim((string)$planSafeName, "-.");
    if ($planSafeName === "") {
        $planSafeName = "plan." . $allowedPlanMimes[$planMime];
    }
    $planAttachment = ["name" => $planSafeName, "mime" => $planMime, "content" => $planContents, "size" => (int)($planFile["size"] ?? 0)];
}

// >>>> DESTINATAIRE : remplace si besoin
$to = "intervention@aquapro-detect.be";

// Sujet
$subject = "Nouvelle demande d’intervention — " . $serviceTitle;

// Corps du message
$lines = [];
$lines[] = "Nouvelle demande reçue (site AquaPro-Détect)";
$lines[] = "----------------------------------------";
$lines[] = "Service : " . $serviceTitle;
if ($serviceCategory !== "") $lines[] = "Catégorie : " . $serviceCategory;
if ($formType !== "") $lines[] = "Type formulaire : " . $formType;
if ($submittedDate !== "") $lines[] = "Date : " . $submittedDate;
if ($submittedTime !== "") $lines[] = "Heure : " . $submittedTime;
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
if (!empty($photoAttachments)) $lines[] = "Photos jointes : " . count($photoAttachments);
if ($planAttachment !== null) $lines[] = "Plan joint : " . $planAttachment["name"];

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

$textBody = implode("\n", $lines);

$metaRows = [];
$metaRows[] = '<tr><td style="padding:0 12px 8px 0;font-weight:700;vertical-align:top;white-space:nowrap;">Service :</td><td style="padding:0 0 8px 0;">' . h($serviceTitle) . '</td></tr>';
if ($serviceCategory !== "") $metaRows[] = '<tr><td style="padding:0 12px 8px 0;font-weight:700;vertical-align:top;white-space:nowrap;">Catégorie :</td><td style="padding:0 0 8px 0;">' . h($serviceCategory) . '</td></tr>';
if ($formType !== "") $metaRows[] = '<tr><td style="padding:0 12px 8px 0;font-weight:700;vertical-align:top;white-space:nowrap;">Type formulaire :</td><td style="padding:0 0 8px 0;">' . h($formType) . '</td></tr>';
if ($submittedDate !== "") $metaRows[] = '<tr><td style="padding:0 12px 8px 0;font-weight:700;vertical-align:top;white-space:nowrap;">Date :</td><td style="padding:0 0 8px 0;">' . h($submittedDate) . '</td></tr>';
if ($submittedTime !== "") $metaRows[] = '<tr><td style="padding:0 12px 16px 0;font-weight:700;vertical-align:top;white-space:nowrap;">Heure :</td><td style="padding:0 0 16px 0;">' . h($submittedTime) . '</td></tr>';

$html = [];
$html[] = '<!doctype html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' . h($subject) . '</title></head><body style="margin:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#122033;">';
$html[] = '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;"><tr><td align="center">';
$html[] = '<table role="presentation" width="680" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #d8e1ea;">';
$html[] = '<tr><td style="background:#0a5b8c;color:#ffffff;padding:16px 20px;font-size:20px;font-weight:700;">Nouvelle demande d’intervention</td></tr>';
$html[] = '<tr><td style="padding:20px;">';
$html[] = '<table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 12px 0;border-collapse:collapse;">' . implode("", $metaRows) . '</table>';
$html[] = '<h2 style="margin:0 0 10px;font-size:16px;">Description</h2>';
$html[] = '<div style="margin:0 0 16px;padding:14px;border:1px solid #d8e1ea;border-radius:10px;background:#f9fbfe;white-space:pre-wrap;line-height:1.5;">' . h($description) . '</div>';
$html[] = '<h2 style="margin:0 0 10px;font-size:16px;">Infos intervention</h2>';
$html[] = '<p style="margin:0 0 8px;"><strong>Urgence :</strong> ' . h($urgence) . '</p>';
$html[] = '<p style="margin:0 0 8px;"><strong>Type de bien :</strong> ' . h($logement) . '</p>';
if ($etage !== "") $html[] = '<p style="margin:0 0 8px;"><strong>Étage :</strong> ' . h($etage) . '</p>';
$html[] = '<p style="margin:0 0 8px;"><strong>Adresse :</strong> ' . h($adresse) . '</p>';
$html[] = '<p style="margin:0 0 8px;"><strong>Disponibilités :</strong> ' . h($disponibilites) . '</p>';
if ($paiement !== "") $html[] = '<p style="margin:0 0 16px;"><strong>Paiement :</strong> ' . h($paiement) . '</p>';
if (!empty($photoAttachments)) $html[] = '<p style="margin:0 0 8px;"><strong>Photos jointes :</strong> ' . count($photoAttachments) . '</p>';
if ($planAttachment !== null) $html[] = '<p style="margin:0 0 16px;"><strong>Plan joint :</strong> ' . h($planAttachment["name"]) . '</p>';
$html[] = '<h2 style="margin:0 0 10px;font-size:16px;">Contact</h2>';
$html[] = '<p style="margin:0 0 8px;"><strong>Nom :</strong> ' . h($nom) . '</p>';
$html[] = '<p style="margin:0 0 8px;"><strong>Téléphone :</strong> ' . h($telephone) . '</p>';
$html[] = '<p style="margin:0 0 16px;"><strong>Email :</strong> <a href="mailto:' . h($email) . '" style="color:#0a5b8c;">' . h($email) . '</a></p>';

if ($hasExtras) {
    $html[] = '<h2 style="margin:0 0 10px;font-size:16px;">Infos complémentaires</h2>';
    if ($fuiteType !== "") $html[] = '<p style="margin:0 0 8px;"><strong>Type fuite :</strong> ' . h($fuiteType) . '</p>';
    if ($signes !== "") $html[] = '<p style="margin:0 0 8px;"><strong>Signes visibles :</strong> ' . h($signes) . '</p>';
    if ($assurance !== "") $html[] = '<p style="margin:0 0 8px;"><strong>Assurance contactée :</strong> ' . h($assurance) . '</p>';
    if ($acces !== "") $html[] = '<p style="margin:0 0 8px;"><strong>Accès existant :</strong> ' . h($acces) . '</p>';
    if ($odeurs !== "") $html[] = '<p style="margin:0 0 8px;"><strong>Odeurs :</strong> ' . h($odeurs) . '</p>';
    if ($assuranceInspection !== "") $html[] = '<p style="margin:0 0 8px;"><strong>Assurance concernée :</strong> ' . h($assuranceInspection) . '</p>';
    if ($contexteNettoyage !== "") $html[] = '<p style="margin:0 0 8px;"><strong>Contexte nettoyage :</strong> ' . h($contexteNettoyage) . '</p>';
    if ($niveau !== "") $html[] = '<p style="margin:0 0 8px;"><strong>Niveau saleté :</strong> ' . h($niveau) . '</p>';
    if ($evacuation !== "") $html[] = '<p style="margin:0 0 8px;"><strong>Évacuation déchets :</strong> ' . h($evacuation) . '</p>';
}

$html[] = '</td></tr></table></td></tr></table></body></html>';
$htmlBody = implode("", $html);

// Headers
$fromEmail = "intervention@aquapro-detect.be";
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "From: AquaPro-Détect <" . $fromEmail . ">";
$headers[] = "Reply-To: " . $email;
$headers[] = "Content-Type: text/html; charset=utf-8";

$allAttachments = $photoAttachments ?? [];
if ($planAttachment !== null) $allAttachments[] = $planAttachment;
$result = send_or_store_mail($to, $subject, $textBody, $htmlBody, $headers, $allAttachments);

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
