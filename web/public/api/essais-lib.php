<?php
/**
 * What the trial-results access shares (client's request of 2026-10-30): the trials open
 * only to visitors Moreco has approved. The round trip, with no database:
 *
 *   essais-demande.php    the visitor's request, mailed to info@moreco.ma with an approve link
 *   essais-approuver.php  Moreco opens that link and confirms; the visitor is mailed a
 *                         personal access link
 *   essais-acces.php      the visitor opens it; it leaves a cookie and goes to the trials
 *   essais-gate.php       every trial page, plate and report goes through here (.htaccess)
 *                         and is only served when that cookie is valid
 *
 * Each link carries its own facts (who, which language, until when) and an HMAC of them,
 * so nothing has to be stored and nothing can be forged without the key. The key is
 * `essais_secret` in candidature-config.php if set, otherwise derived from the mailbox
 * password: changing either one closes every access given so far.
 *
 * Refused to the web by api/.htaccess, like mailer.php. PHP 5.6, as mailer.php explains.
 */

require_once __DIR__ . '/mailer.php';

/** How long an approved visitor keeps access, and how long Moreco has to approve. */
define('ESSAIS_ACCESS_DAYS', 365);
define('ESSAIS_REQUEST_DAYS', 30);
define('ESSAIS_COOKIE', 'moreco_essais');
define('ESSAIS_SITE', 'https://moreco.ma');

/** The SMTP settings without the form checks — for the scripts that are not forms. */
function essaisConfig()
{
    $config = __DIR__ . '/candidature-config.php';
    if (!is_file($config)) return null;
    return require $config;
}

function essaisKey(array $smtp)
{
    if (!empty($smtp['essais_secret'])) return $smtp['essais_secret'];
    return hash('sha256', 'moreco-essais|' . $smtp['password']);
}

/** The trials and request-page paths per language, written by finalize-export.mjs. */
function essaisRoutes()
{
    return require __DIR__ . '/essais-routes.php';
}

function essaisLang($lang)
{
    $routes = essaisRoutes();
    return isset($routes['trials'][$lang]) ? $lang : 'fr';
}

/* ------------------------------------------------------------------- tokens */

function base64url($bytes)
{
    return rtrim(strtr(base64_encode($bytes), '+/', '-_'), '=');
}

function unbase64url($text)
{
    return base64_decode(strtr($text, '-_', '+/'));
}

/**
 * A signed link value: the fields, one per line, then their HMAC. $kind keeps a request
 * token from ever passing for an access token.
 */
function essaisSign(array $smtp, $kind, $days, array $fields)
{
    $payload = implode("\n", array_merge(array($kind, (string)(time() + $days * 86400)), $fields));
    return base64url($payload) . '.' . base64url(hash_hmac('sha256', $payload, essaisKey($smtp), true));
}

/** The fields of a valid, unexpired token of $kind, or null. */
function essaisRead(array $smtp, $kind, $token)
{
    if (!is_string($token) || !preg_match('/^([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)$/', $token, $m)) return null;
    $payload = unbase64url($m[1]);
    $expected = base64url(hash_hmac('sha256', $payload, essaisKey($smtp), true));
    if (!hash_equals($expected, $m[2])) return null;
    $fields = explode("\n", $payload);
    if (count($fields) < 2 || $fields[0] !== $kind || (int)$fields[1] < time()) return null;
    return array_slice($fields, 2);
}

/** The visitor's access, from the cookie: array(email, lang) or null. */
function essaisVisitor(array $smtp)
{
    if (!isset($_COOKIE[ESSAIS_COOKIE])) return null;
    $fields = essaisRead($smtp, 'acces', $_COOKIE[ESSAIS_COOKIE]);
    return $fields && count($fields) >= 2 ? $fields : null;
}

/** Days and date the token expires, for the mails. */
function essaisExpiry($days)
{
    return date('d/m/Y', time() + $days * 86400);
}

/* --------------------------------------------------------------------- mail */

/** Sends one mail; returns false (and logs why) instead of throwing. */
function essaisMail(array $smtp, $to, $subject, $replyName, $replyEmail, $html)
{
    try {
        smtpSend($smtp, $smtp['from'], $to, composeMail($smtp, $to, $subject, $replyName, $replyEmail, $html));
        return true;
    } catch (Exception $e) {
        error_log('essais: ' . $e->getMessage());
        return false;
    }
}

/** A plain page for the approve and access scripts: Moreco's colours, nothing else. */
function essaisPage($title, $body, $status = 200)
{
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex');
    echo '<!doctype html><html lang="fr"><head><meta charset="utf-8">'
        . '<meta name="viewport" content="width=device-width, initial-scale=1">'
        . '<title>' . htmlspecialchars($title) . ' — Moreco</title>'
        . '<style>body{margin:0;background:#f6f7f2;color:#1d2419;font:16px/1.55 Arial,sans-serif}'
        . 'main{max-width:36rem;margin:3rem auto;padding:0 16px}h1{font-size:1.5rem;line-height:1.2}'
        . 'table{border-collapse:collapse;margin:1rem 0}th,td{text-align:left;padding:.35rem .9rem .35rem 0;vertical-align:top}'
        . 'th{color:#5c6655;font-weight:normal}button,.btn{display:inline-block;background:#3d6b25;color:#fff;border:0;'
        . 'border-radius:6px;padding:.8rem 1.3rem;font:inherit;font-weight:bold;text-decoration:none;cursor:pointer}'
        . '.note{color:#5c6655;font-size:.9rem}</style></head><body><main>'
        . '<img src="/media/brand/moreco-logo.webp" alt="Moreco" style="height:44px;width:auto">'
        . '<h1>' . htmlspecialchars($title) . '</h1>' . $body . '</main></body></html>';
    exit;
}
