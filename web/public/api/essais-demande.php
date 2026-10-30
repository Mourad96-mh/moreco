<?php
/**
 * A request for the trial results, posted by the form on the access page
 * (views/TrialsAccessView.tsx). Mailed to info@moreco.ma like the other forms, with one
 * addition: a link that approves the visitor. The link holds the request itself, signed,
 * so it needs no database and works for 30 days. See essais-lib.php.
 */

require __DIR__ . '/essais-lib.php';

$smtp = startForm();

$fields = [
    'Profil' => field('service'),
    'Prénom' => field('prenom'),
    'Nom' => field('nom'),
    'Email' => field('email'),
    'Téléphone' => field('telephone', 40),
    'Société' => field('societe'),
    'Ville' => field('ville'),
];
requireFields($fields, $fields['Email']);
$crops = multiline('message', 1000);
$lang = essaisLang(field('langue', 5));
$fields['Langue du site'] = $lang;

checkRate('essais-demande');

$name = $fields['Prénom'] . ' ' . $fields['Nom'];
$token = essaisSign($smtp, 'demande', ESSAIS_REQUEST_DAYS, [
    $fields['Email'], $name, $lang, $fields['Société'], $fields['Ville'], $fields['Profil'], $fields['Téléphone'],
]);
$approve = ESSAIS_SITE . '/api/essais-approuver.php?t=' . $token;

$html = htmlBody(
    "Demande d'accès aux résultats d'essais reçue via moreco.ma.",
    $fields,
    $crops === '' ? '' : "Cultures : $crops"
);
$html = str_replace(
    '</body>',
    '<p style="margin:24px 0"><a href="' . htmlspecialchars($approve) . '" style="background:#3d6b25;color:#ffffff;'
    . 'padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold">Examiner et approuver cette demande</a></p>'
    . '<p style="color:#666666;font-size:12px">Le lien ouvre une page de confirmation : rien n\'est envoyé tant que vous '
    . 'n\'avez pas cliqué sur « Approuver ». Valable ' . ESSAIS_REQUEST_DAYS . ' jours. Ne transférez pas ce message en dehors '
    . 'de Moreco : le lien permet d\'ouvrir l\'accès. Pour refuser, ne faites rien.</p></body>',
    $html
);

sendAndReply($smtp, 'essais-demande', "moreco.ma – Accès aux essais – $name", $name, $fields['Email'], $html);
