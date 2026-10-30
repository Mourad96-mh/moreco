<?php
/**
 * The door to the trial results (2026-10-30). The root .htaccess sends here every request
 * for a trial page, in any language, for the trial plates (/media/research/*.webp) and for
 * the trial reports (/media/research/documents/): the files are on the server like the
 * rest of the site, but only reach a visitor through this script.
 *
 * With a valid access cookie (essais-acces.php) the file is served as Apache would serve
 * it. Without one, a page request is sent to the request page in its language, and
 * anything else — an image, a PDF, the data Next.js fetches between pages — is refused.
 * When that data is refused, Next.js loads the page in full instead, which lands here as a
 * page request and is redirected the same way.
 */

require __DIR__ . '/essais-lib.php';

$root = dirname(__DIR__);
$routes = essaisRoutes();
$uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
$path = rawurldecode((string)parse_url($uri, PHP_URL_PATH));

/* Only what .htaccess is meant to send here, whatever it actually sent. */
$lang = null;
foreach ($routes['trials'] as $code => $prefix) {
    if ($path === "/$prefix" || strpos($path, "/$prefix/") === 0) $lang = $code;
}
$media = (bool)preg_match('#^/media/research/(documents/)?[^/]+$#', $path);
if (($lang === null && !$media) || strpos($path, '..') !== false || strpos($path, "\0") !== false) {
    notFound($root);
}

$file = $root . $path;
if (is_dir($file)) {
    // Apache adds the slash to a folder; do the same, then serve its index.
    if (substr($path, -1) !== '/') {
        header('Location: ' . $path . '/', true, 301);
        exit;
    }
    $file .= 'index.html';
}
$real = realpath($file);
if ($real === false || strpos($real, realpath($root) . DIRECTORY_SEPARATOR) !== 0 || !is_file($real)) notFound($root);

$extension = strtolower(pathinfo($real, PATHINFO_EXTENSION));
$smtp = essaisConfig();
$visitor = $smtp === null ? null : essaisVisitor($smtp);

header('Vary: Cookie');
header('X-Robots-Tag: noindex');

if ($visitor === null) {
    header('Cache-Control: no-store');
    if ($extension === 'html') {
        header('Location: ' . ESSAIS_SITE . '/' . $routes['access'][$lang === null ? 'fr' : $lang] . '/', true, 302);
        exit;
    }
    http_response_code(403);
    exit;
}

$types = [
    'html' => 'text/html; charset=utf-8',
    'txt' => 'text/plain; charset=utf-8',
    'webp' => 'image/webp',
    'png' => 'image/png',
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'pdf' => 'application/pdf',
];
$modified = filemtime($real);
header('Content-Type: ' . (isset($types[$extension]) ? $types[$extension] : 'application/octet-stream'));
header('Cache-Control: private, ' . ($extension === 'html' || $extension === 'txt' ? 'no-cache' : 'max-age=86400'));
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $modified) . ' GMT');

$since = isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ? strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) : false;
if ($since !== false && $since >= $modified) {
    http_response_code(304);
    exit;
}

header('Content-Length: ' . filesize($real));
if ((isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET') !== 'HEAD') readfile($real);
exit;

/** The site's own 404 page, as Apache would answer. */
function notFound($root)
{
    http_response_code(404);
    header('Content-Type: text/html; charset=utf-8');
    if (is_file("$root/404.html")) readfile("$root/404.html");
    exit;
}
