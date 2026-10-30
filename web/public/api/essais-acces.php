<?php
/**
 * The personal link an approved visitor receives (essais-approuver.php). Leaves the access
 * in a cookie on this device, for as long as the link is valid, and opens the trials in
 * the visitor's language. Opening the link again on another device gives that one access
 * too. A link that is expired or altered leads back to the request page.
 */

require __DIR__ . '/essais-lib.php';

$smtp = essaisConfig();
$token = isset($_GET['t']) ? (string)$_GET['t'] : '';
$fields = $smtp === null ? null : essaisRead($smtp, 'acces', $token);
$routes = essaisRoutes();

header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

if ($fields === null || count($fields) < 2) {
    header('Location: ' . ESSAIS_SITE . '/' . $routes['access']['fr'] . '/', true, 302);
    exit;
}

$lang = essaisLang($fields[1]);
$payload = explode("\n", unbase64url(strtok($token, '.')));
$expires = (int)$payload[1];

/* Written by hand: PHP 5.6's setcookie() has no SameSite. Lax lets the cookie travel when
   the visitor arrives from a mail or another site, which is how they arrive. */
header(
    'Set-Cookie: ' . ESSAIS_COOKIE . '=' . $token . '; Expires=' . gmdate('D, d M Y H:i:s', $expires) . ' GMT'
    . '; Max-Age=' . max(0, $expires - time()) . '; Path=/; Secure; HttpOnly; SameSite=Lax'
);
header('Location: ' . ESSAIS_SITE . '/' . $routes['trials'][$lang] . '/', true, 302);
