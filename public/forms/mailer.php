<?php
/**
 * Envoi SMTP OVH avec fallback vers la fonction mail() de PHP.
 */

error_log(
    'MAILER LOCAL EXISTS=' . (is_file(__DIR__ . '/mailer.local.php') ? 'yes' : 'no')
);

function _mailer_set_last_error(string $message = ''): void
{
    $GLOBALS['MAILER_LAST_ERROR'] = $message;
}

function _mailer_set_last_transport(string $transport = ''): void
{
    $GLOBALS['MAILER_LAST_TRANSPORT'] = $transport;
}

function mailer_last_error(): ?string
{
    $value = $GLOBALS['MAILER_LAST_ERROR'] ?? '';
    $value = trim((string)$value);
    return $value !== '' ? $value : null;
}

function mailer_last_transport(): ?string
{
    $value = $GLOBALS['MAILER_LAST_TRANSPORT'] ?? '';
    $value = trim((string)$value);
    return $value !== '' ? $value : null;
}

function _mailer_get_env(string $name, string $default = ''): string
{
    $value = getenv($name);
    if ($value === false) {
        return $default;
    }

    $value = trim((string)$value);
    return $value !== '' ? $value : $default;
}

function _mailer_load_local_config(): array
{
    static $config = null;

    if ($config !== null) {
        return $config;
    }

    $path = __DIR__ . '/mailer.local.php';
    if (!is_file($path)) {
        $config = [];
        return $config;
    }

    $loaded = require $path;
    $config = is_array($loaded) ? $loaded : [];

    error_log('MAILER LOCAL KEYS=' . implode(',', array_keys($config)));

    return $config;
}

function _mailer_account_key_from_email(string $email): string
{
    $safeEmail = mailer_extract_email($email);
    if ($safeEmail === '') {
        return '';
    }

    $localPart = strtolower((string)strtok($safeEmail, '@'));
    if ($localPart === 'contact' || $localPart === 'intervention') {
        return $localPart;
    }

    return '';
}

function _mailer_smtp_config_from_headers(string $headers): array
{
    $fromEmail = _mailer_headers_from_email($headers);
    $accountKey = _mailer_account_key_from_email($fromEmail);
    $localConfig = _mailer_load_local_config();
    $accountConfig = $accountKey !== '' && isset($localConfig[$accountKey]) && is_array($localConfig[$accountKey])
        ? $localConfig[$accountKey]
        : [];

    $host = _mailer_get_env('MAIL_SMTP_HOST', _mailer_get_env('SMTP_HOST', 'ssl0.ovh.net'));
    $port = (int)_mailer_get_env('MAIL_SMTP_PORT', _mailer_get_env('SMTP_PORT', '465'));
    if ($port <= 0) {
        $port = 465;
    }

    $secure = strtolower(_mailer_get_env('MAIL_SMTP_SECURITY', _mailer_get_env('SMTP_SECURE', 'ssl')));
    if (!in_array($secure, ['ssl', 'tls', 'starttls', 'none'], true)) {
        $secure = 'ssl';
    }

    $timeout = (int)_mailer_get_env('MAIL_SMTP_TIMEOUT', '15');
    if ($timeout <= 0) {
        $timeout = 15;
    }

    $user = '';
    $pass = '';

    if ($accountKey !== '') {
        $upperKey = strtoupper($accountKey);
        $user = _mailer_get_env('MAIL_SMTP_USER_' . $upperKey, '');
        $pass = _mailer_get_env('MAIL_SMTP_PASS_' . $upperKey, '');
    }

    if ($user === '') {
        $user = _mailer_get_env('MAIL_SMTP_USER', isset($accountConfig['user']) ? (string)$accountConfig['user'] : '');
    }

    if ($pass === '') {
        $pass = _mailer_get_env('MAIL_SMTP_PASS', isset($accountConfig['pass']) ? (string)$accountConfig['pass'] : '');
    }

    return [
        'host' => $host,
        'port' => $port,
        'secure' => $secure,
        'timeout' => $timeout,
        'user' => trim($user),
        'pass' => (string)$pass,
        'from' => $fromEmail,
    ];
}

function _mailer_is_smtp_configured(array $config): bool
{
    return trim((string)($config['host'] ?? '')) !== ''
        && trim((string)($config['user'] ?? '')) !== ''
        && (string)($config['pass'] ?? '') !== '';
}

function _mailer_normalize_line_endings(string $value): string
{
    return preg_replace('/\r\n|\r|\n/', "\r\n", $value) ?? $value;
}

function mailer_encode_header_text(string $value): string
{
    $trimmed = trim($value);
    if ($trimmed === '') {
        return '';
    }

    if (preg_match('/^[\x20-\x7E]+$/', $trimmed)) {
        return $trimmed;
    }

    if (function_exists('mb_encode_mimeheader')) {
        $encoded = mb_encode_mimeheader($trimmed, 'UTF-8', 'B');
        $encoded = str_replace(["\r", "\n"], '', (string)$encoded);
        if ($encoded !== '') {
            return $encoded;
        }
    }

    return '=?UTF-8?B?' . base64_encode($trimmed) . '?=';
}

function mailer_extract_email(string $value): string
{
    $trimmed = trim($value);
    if ($trimmed === '') {
        return '';
    }

    if (preg_match('/<([^>]+)>/', $trimmed, $matches)) {
        $trimmed = trim($matches[1]);
    }

    $trimmed = trim($trimmed, " \t\n\r\0\x0B<>\"'");

    return filter_var($trimmed, FILTER_VALIDATE_EMAIL) ? $trimmed : '';
}

function mailer_extract_name(string $value): string
{
    $trimmed = trim($value);
    if ($trimmed === '') {
        return '';
    }

    if (!preg_match('/^(.*?)<[^>]+>$/', $trimmed, $matches)) {
        return '';
    }

    return trim($matches[1], " \t\n\r\0\x0B\"'");
}

function _mailer_ascii_display_name(string $value): string
{
    $trimmed = trim(str_replace(["\r", "\n"], ' ', $value));
    if ($trimmed === '') {
        return '';
    }

    if (function_exists('iconv')) {
        $ascii = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $trimmed);
        if (is_string($ascii)) {
            $trimmed = $ascii;
        }
    }

    $trimmed = preg_replace('/[^A-Za-z0-9 ._\-]/', '', $trimmed) ?? '';
    $trimmed = preg_replace('/\s+/', ' ', $trimmed) ?? '';

    return trim($trimmed);
}

function mailer_address_header(string $headerName, string $email, string $name = ''): string
{
    $safeEmail = mailer_extract_email($email);
    if ($safeEmail === '') {
        return $headerName . ':';
    }

    $safeName = trim($name);
    if ($safeName === '') {
        $safeName = mailer_extract_name($email);
    }
    $safeName = _mailer_ascii_display_name($safeName);
    if ($safeName === '') {
        return $headerName . ': ' . $safeEmail;
    }

    return $headerName . ': ' . $safeName . ' <' . $safeEmail . '>';
}

function _mailer_encode_body(string $body): string
{
    $normalized = _mailer_normalize_line_endings($body);

    if (function_exists('quoted_printable_encode')) {
        return quoted_printable_encode($normalized);
    }

    return $normalized;
}

function _mailer_filter_headers(array $headers, array $blockedPrefixes = []): array
{
    return array_values(array_filter(
        $headers,
        static function ($header) use ($blockedPrefixes) {
            $trimmed = trim((string)$header);
            if ($trimmed === '') {
                return false;
            }

            foreach ($blockedPrefixes as $prefix) {
                if (stripos($trimmed, $prefix . ':') === 0) {
                    return false;
                }
            }

            return true;
        }
    ));
}

function _mailer_has_header(array $headers, string $name): bool
{
    foreach ($headers as $header) {
        if (stripos((string)$header, $name . ':') === 0) {
            return true;
        }
    }

    return false;
}

function mailer_compose_message(
    string $textBody,
    string $htmlBody,
    array $headers,
    array $attachments = []
): array {
    $finalHeaders = _mailer_filter_headers($headers, [
        'Content-Type',
        'Content-Transfer-Encoding',
    ]);

    if (!_mailer_has_header($finalHeaders, 'MIME-Version')) {
        $finalHeaders[] = 'MIME-Version: 1.0';
    }

    $encodedTextBody = _mailer_encode_body($textBody);
    $encodedHtmlBody = _mailer_encode_body($htmlBody);

    if (empty($attachments)) {
        $boundary = 'alt-' . bin2hex(random_bytes(12));
        $finalHeaders[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';

        $parts = [];
        $parts[] = '--' . $boundary;
        $parts[] = 'Content-Type: text/plain; charset="utf-8"';
        $parts[] = 'Content-Transfer-Encoding: quoted-printable';
        $parts[] = '';
        $parts[] = $encodedTextBody;
        $parts[] = '';
        $parts[] = '--' . $boundary;
        $parts[] = 'Content-Type: text/html; charset="utf-8"';
        $parts[] = 'Content-Transfer-Encoding: quoted-printable';
        $parts[] = '';
        $parts[] = $encodedHtmlBody;
        $parts[] = '';
        $parts[] = '--' . $boundary . '--';
        $parts[] = '';

        return [
            'headers' => $finalHeaders,
            'body' => implode("\r\n", $parts),
        ];
    }

    $mixedBoundary = 'mix-' . bin2hex(random_bytes(12));
    $altBoundary = 'alt-' . bin2hex(random_bytes(12));

    $finalHeaders[] = 'Content-Type: multipart/mixed; boundary="' . $mixedBoundary . '"';

    $parts = [];
    $parts[] = '--' . $mixedBoundary;
    $parts[] = 'Content-Type: multipart/alternative; boundary="' . $altBoundary . '"';
    $parts[] = '';
    $parts[] = '--' . $altBoundary;
    $parts[] = 'Content-Type: text/plain; charset="utf-8"';
    $parts[] = 'Content-Transfer-Encoding: quoted-printable';
    $parts[] = '';
    $parts[] = $encodedTextBody;
    $parts[] = '';
    $parts[] = '--' . $altBoundary;
    $parts[] = 'Content-Type: text/html; charset="utf-8"';
    $parts[] = 'Content-Transfer-Encoding: quoted-printable';
    $parts[] = '';
    $parts[] = $encodedHtmlBody;
    $parts[] = '';
    $parts[] = '--' . $altBoundary . '--';

    foreach ($attachments as $attachment) {
        $parts[] = '';
        $parts[] = '--' . $mixedBoundary;
        $parts[] = 'Content-Type: ' . $attachment['mime'] . '; name="' . $attachment['name'] . '"';
        $parts[] = 'Content-Disposition: attachment; filename="' . $attachment['name'] . '"';
        $parts[] = 'Content-Transfer-Encoding: base64';
        $parts[] = '';
        $parts[] = chunk_split(base64_encode($attachment['content']));
    }

    $parts[] = '--' . $mixedBoundary . '--';
    $parts[] = '';

    return [
        'headers' => $finalHeaders,
        'body' => implode("\r\n", $parts),
    ];
}

function _mailer_headers_from_email(string $headers): string
{
    if (preg_match('/^From:\s.*<([^>]+)>/mi', $headers, $matches)) {
        return trim($matches[1]);
    }

    if (preg_match('/^From:\s*([^\s]+@[^\s]+)/mi', $headers, $matches)) {
        return trim($matches[1]);
    }

    return '';
}

function _mailer_headers_domain(string $headers): string
{
    $email = _mailer_headers_from_email($headers);

    $atPos = strrpos($email, '@');
    if ($atPos === false) {
        return 'aquapro-detect.be';
    }

    $domain = trim(substr($email, $atPos + 1), ">\t\n\r\0\x0B ");
    return $domain !== '' ? $domain : 'aquapro-detect.be';
}

function _mailer_complete_headers(string $headers): string
{
    $normalized  = trim(_mailer_normalize_line_endings($headers));
    $autoHeaders = [];

    if (!preg_match('/^Date:/mi', $normalized)) {
        $autoHeaders[] = 'Date: ' . date(DATE_RFC2822);
    }

    if (!preg_match('/^Message-ID:/mi', $normalized)) {
        $autoHeaders[] = sprintf(
            'Message-ID: <%s.%s@%s>',
            gmdate('YmdHis'),
            bin2hex(random_bytes(8)),
            _mailer_headers_domain($normalized)
        );
    }


    $parts = [];
    if ($normalized !== '') {
        $parts[] = $normalized;
    }
    if (!empty($autoHeaders)) {
        $parts[] = implode("\r\n", $autoHeaders);
    }

    return implode("\r\n", $parts);
}

function _mailer_smtp_write($socket, string $command): void
{
    fwrite($socket, $command . "\r\n");
}

function _mailer_smtp_read($socket): array
{
    $lines = [];
    $code = 0;

    while (($line = fgets($socket, 515)) !== false) {
        $lines[] = rtrim($line, "\r\n");
        if (preg_match('/^(\d{3})([\s-])/', $line, $matches)) {
            $code = (int)$matches[1];
            if ($matches[2] === ' ') {
                break;
            }
        } else {
            break;
        }
    }

    return [$code, implode("\n", $lines)];
}

function _mailer_smtp_expect($socket, array $expectedCodes, string $context): void
{
    [$code, $response] = _mailer_smtp_read($socket);

    if (!in_array($code, $expectedCodes, true)) {
        throw new RuntimeException(
            sprintf('[mailer] SMTP %s a échoué (%s): %s', $context, (string)$code, $response)
        );
    }
}

function _mailer_smtp_data_escape(string $value): string
{
    $normalized = _mailer_normalize_line_endings($value);
    return preg_replace('/^\./m', '..', $normalized) ?? $normalized;
}

function _mailer_deliver_via_smtp(
    string $to,
    string $subject,
    string $body,
    string $headers,
    array $config
): bool {
    $host = (string)$config['host'];
    $port = (int)$config['port'];
    $secure = (string)$config['secure'];
    $timeout = (int)$config['timeout'];
    $user = (string)$config['user'];
    $pass = (string)$config['pass'];
    $fromEmail = mailer_extract_email((string)$config['from']);

    if ($fromEmail === '') {
        $fromEmail = mailer_extract_email($user);
    }

    if ($fromEmail === '') {
        throw new RuntimeException('[mailer] Adresse expéditeur SMTP invalide');
    }

    $remoteHost = $host;
    if ($secure === 'ssl') {
        $remoteHost = 'ssl://' . $host;
    }

    $socket = @stream_socket_client(
        $remoteHost . ':' . $port,
        $errno,
        $errstr,
        $timeout,
        STREAM_CLIENT_CONNECT
    );

    if (!$socket) {
        throw new RuntimeException(sprintf('[mailer] Connexion SMTP impossible: %s (%s)', $errstr, (string)$errno));
    }

    stream_set_timeout($socket, $timeout);

    try {
        _mailer_smtp_expect($socket, [220], 'connexion');

        $ehloHost = _mailer_get_env('MAIL_EHLO_HOST', php_uname('n'));
        if (trim($ehloHost) === '') {
            $ehloHost = 'localhost';
        }

        _mailer_smtp_write($socket, 'EHLO ' . $ehloHost);
        _mailer_smtp_expect($socket, [250], 'EHLO');

        if ($secure === 'tls' || $secure === 'starttls') {
            _mailer_smtp_write($socket, 'STARTTLS');
            _mailer_smtp_expect($socket, [220], 'STARTTLS');

            $cryptoOk = @stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            if ($cryptoOk !== true) {
                throw new RuntimeException('[mailer] Activation TLS impossible');
            }

            _mailer_smtp_write($socket, 'EHLO ' . $ehloHost);
            _mailer_smtp_expect($socket, [250], 'EHLO après STARTTLS');
        }

        _mailer_smtp_write($socket, 'AUTH LOGIN');
        _mailer_smtp_expect($socket, [334], 'AUTH LOGIN');

        _mailer_smtp_write($socket, base64_encode($user));
        _mailer_smtp_expect($socket, [334], 'utilisateur SMTP');

        _mailer_smtp_write($socket, base64_encode($pass));
        _mailer_smtp_expect($socket, [235], 'mot de passe SMTP');

        _mailer_smtp_write($socket, 'MAIL FROM:<' . $fromEmail . '>');
        _mailer_smtp_expect($socket, [250], 'MAIL FROM');

        $recipients = array_filter(array_map('trim', preg_split('/,/', $to) ?: []));
        if (empty($recipients)) {
            $recipients = [trim($to)];
        }

        foreach ($recipients as $recipient) {
            $safeRecipient = mailer_extract_email($recipient);
            if ($safeRecipient === '') {
                throw new RuntimeException('[mailer] Destinataire SMTP invalide');
            }

            _mailer_smtp_write($socket, 'RCPT TO:<' . $safeRecipient . '>');
            _mailer_smtp_expect($socket, [250, 251], 'RCPT TO');
        }

        _mailer_smtp_write($socket, 'DATA');
        _mailer_smtp_expect($socket, [354], 'DATA');

        $preparedHeaders = trim(_mailer_complete_headers($headers));
        $messageHeaders = [
            'To: ' . $to,
            'Subject: ' . mailer_encode_header_text($subject),
        ];

        if ($preparedHeaders !== '') {
            $messageHeaders[] = $preparedHeaders;
        }

        $rawMessage = implode("\r\n", $messageHeaders) . "\r\n\r\n" . _mailer_smtp_data_escape($body);
        fwrite($socket, $rawMessage . "\r\n.\r\n");
        _mailer_smtp_expect($socket, [250], 'envoi du message');

        _mailer_smtp_write($socket, 'QUIT');
        fclose($socket);

        _mailer_set_last_transport('smtp');
        return true;
    } catch (Throwable $error) {
        _mailer_smtp_write($socket, 'QUIT');
        fclose($socket);
        throw $error;
    }
}

function _mailer_deliver_via_mail(
    string $to,
    string $subject,
    string $body,
    string $headers
): bool {
    $preparedHeaders = _mailer_complete_headers($headers);
    $fromEmail       = _mailer_headers_from_email($preparedHeaders);
    $additionalParams = '';

    if ($fromEmail !== '' && preg_match('/^[A-Za-z0-9_.+\-]+@[A-Za-z0-9.\-]+$/', $fromEmail)) {
        $additionalParams = '-f ' . $fromEmail;
    }

    $ok = $additionalParams !== ''
        ? @mail($to, mailer_encode_header_text($subject), $body, $preparedHeaders, $additionalParams)
        : @mail($to, mailer_encode_header_text($subject), $body, $preparedHeaders);

    if ($ok) {
        _mailer_set_last_transport('mail');
        return true;
    }

    throw new RuntimeException('[mailer] mail() a échoué');
}

function deliver_mail(
    string $to,
    string $subject,
    string $body,
    string $headers
): bool {
    _mailer_set_last_error('');
    _mailer_set_last_transport('');
    $transport = strtolower(_mailer_get_env('MAIL_TRANSPORT', 'smtp'));
    $smtpConfig = _mailer_smtp_config_from_headers($headers);
    $smtpReady = _mailer_is_smtp_configured($smtpConfig);
    $errors = [];

    $attempts = [];
    if ($transport === 'mail') {
        $attempts = ['mail'];
    } elseif ($transport === 'smtp') {
        $attempts = ['smtp', 'mail'];
    } else {
        $attempts = $smtpReady ? ['smtp', 'mail'] : ['mail'];
    }

    foreach ($attempts as $attempt) {
        try {
            if ($attempt === 'smtp') {
                if (!$smtpReady) {
                    throw new RuntimeException('[mailer] SMTP non configuré');
                }

                return _mailer_deliver_via_smtp($to, $subject, $body, $headers, $smtpConfig);
            }

            return _mailer_deliver_via_mail($to, $subject, $body, $headers);
        } catch (Throwable $error) {
            $errors[] = $error->getMessage();
            error_log($error->getMessage());
        }
    }

    $message = implode(' | ', array_unique(array_filter($errors)));
    if ($message === '') {
        $message = '[mailer] Aucun transport disponible';
    }
    _mailer_set_last_error($message);

    return false;
}
