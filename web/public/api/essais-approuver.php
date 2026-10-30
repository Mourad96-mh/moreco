<?php
/**
 * Moreco approves a request for the trial results. Reached from the link in the request
 * mail (essais-demande.php).
 *
 * Opening the link only shows the request and a button: mail filters (Outlook's Safe Links
 * among them) open every link in a mail to scan it, and must not approve anyone by doing
 * so. The button posts the same token back; only then is the visitor mailed a personal
 * access link, in the language they asked in. Approving twice just sends a fresh link.
 */

require __DIR__ . '/essais-lib.php';

$smtp = essaisConfig();
if ($smtp === null) essaisPage('Configuration manquante', '<p>candidature-config.php est introuvable sur le serveur.</p>', 500);

$token = isset($_REQUEST['t']) ? (string)$_REQUEST['t'] : '';
$request = essaisRead($smtp, 'demande', $token);
if ($request === null || count($request) < 7) {
    essaisPage(
        'Lien expiré ou invalide',
        '<p>Ce lien d\'approbation n\'est plus valable (il expire après ' . ESSAIS_REQUEST_DAYS . ' jours) ou a été modifié. '
        . 'Si la personne souhaite toujours l\'accès, demandez-lui de refaire sa demande sur le site.</p>',
        410
    );
}
list($email, $name, $lang, $company, $city, $profile, $phone) = $request;

$details = '<table>'
    . '<tr><th>Nom</th><td>' . htmlspecialchars($name) . '</td></tr>'
    . '<tr><th>Email</th><td>' . htmlspecialchars($email) . '</td></tr>'
    . '<tr><th>Téléphone</th><td>' . htmlspecialchars($phone) . '</td></tr>'
    . '<tr><th>Société</th><td>' . htmlspecialchars($company) . '</td></tr>'
    . '<tr><th>Ville</th><td>' . htmlspecialchars($city) . '</td></tr>'
    . '<tr><th>Profil</th><td>' . htmlspecialchars($profile) . '</td></tr>'
    . '</table>';

if ((isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '') !== 'POST') {
    essaisPage(
        'Approuver l\'accès aux résultats d\'essais ?',
        $details
        . '<form method="post"><input type="hidden" name="t" value="' . htmlspecialchars($token) . '">'
        . '<button type="submit">Approuver et envoyer l\'accès</button></form>'
        . '<p class="note">La personne recevra par e-mail un lien personnel valable ' . ESSAIS_ACCESS_DAYS
        . ' jours. Pour refuser, fermez simplement cette page.</p>'
    );
}

$access = ESSAIS_SITE . '/api/essais-acces.php?t=' . essaisSign($smtp, 'acces', ESSAIS_ACCESS_DAYS, [$email, $lang]);
$until = essaisExpiry(ESSAIS_ACCESS_DAYS);

/* The visitor's mail, in the language of the page they asked from. */
$texts = [
    'fr' => [
        'subject' => 'Votre accès aux résultats d\'essais Moreco',
        'hello' => 'Bonjour',
        'body' => 'Votre demande d\'accès aux résultats d\'essais Moreco est acceptée. Ce lien personnel ouvre les résultats sur votre appareil :',
        'button' => 'Voir les résultats d\'essais',
        'note' => "Le lien est valable jusqu'au $until. Sur un autre téléphone ou ordinateur, ouvrez-le une fois de plus. Il vous est personnel : merci de ne pas le transférer.",
        'sign' => 'L\'équipe Moreco',
    ],
    'en' => [
        'subject' => 'Your access to the Moreco trial results',
        'hello' => 'Hello',
        'body' => 'Your request for access to the Moreco trial results has been approved. This personal link opens the results on your device:',
        'button' => 'View the trial results',
        'note' => "The link is valid until $until. On another phone or computer, open it once more. It is personal to you: please do not forward it.",
        'sign' => 'The Moreco team',
    ],
    'es' => [
        'subject' => 'Su acceso a los resultados de ensayos de Moreco',
        'hello' => 'Hola',
        'body' => 'Su solicitud de acceso a los resultados de ensayos de Moreco ha sido aprobada. Este enlace personal abre los resultados en su dispositivo:',
        'button' => 'Ver los resultados de ensayos',
        'note' => "El enlace es válido hasta el $until. En otro teléfono u ordenador, ábralo una vez más. Es personal: le rogamos que no lo reenvíe.",
        'sign' => 'El equipo de Moreco',
    ],
    'nl' => [
        'subject' => 'Uw toegang tot de proefresultaten van Moreco',
        'hello' => 'Beste',
        'body' => 'Uw aanvraag voor toegang tot de proefresultaten van Moreco is goedgekeurd. Deze persoonlijke link opent de resultaten op uw toestel:',
        'button' => 'Bekijk de proefresultaten',
        'note' => "De link is geldig tot $until. Op een andere telefoon of computer opent u hem nog een keer. Hij is persoonlijk: stuur hem niet door.",
        'sign' => 'Het Moreco-team',
    ],
];
$x = isset($texts[$lang]) ? $texts[$lang] : $texts['fr'];

$mail = '<html><body style="font-family:Arial,sans-serif;font-size:15px;color:#1d2419">'
    . '<p>' . htmlspecialchars($x['hello'] . ' ' . $name) . ',</p>'
    . '<p>' . htmlspecialchars($x['body']) . '</p>'
    . '<p style="margin:24px 0"><a href="' . htmlspecialchars($access) . '" style="background:#3d6b25;color:#ffffff;'
    . 'padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold">' . htmlspecialchars($x['button']) . '</a></p>'
    . '<p style="color:#666666;font-size:13px">' . htmlspecialchars($x['note']) . '</p>'
    . '<p>' . htmlspecialchars($x['sign']) . '<br>info@moreco.ma</p>'
    . '</body></html>';

if (!essaisMail($smtp, $email, $x['subject'], 'Moreco', $smtp['from'], $mail)) {
    essaisPage(
        'L\'envoi a échoué',
        $details . '<p>Le message à ' . htmlspecialchars($email) . ' n\'a pas pu partir. Réessayez dans quelques minutes en '
        . 'rouvrant le lien du mail de demande.</p>',
        502
    );
}

essaisPage(
    'Accès accordé',
    $details . '<p>Le lien d\'accès a été envoyé à <strong>' . htmlspecialchars($email) . '</strong>. Il est valable jusqu\'au '
    . htmlspecialchars($until) . '.</p>'
);
