<?php
/**
 * The quote request's mailer. Receives the basket and contact details posted by
 * components/Quote/QuoteForm.tsx and mails them to info@moreco.ma. The sending itself,
 * and why it is done this way, is in mailer.php.
 */

require __DIR__ . '/mailer.php';

$smtp = startForm();

$fields = [
    'Prénom' => field('prenom'),
    'Nom' => field('nom'),
    'Société' => field('societe'),
    'Email' => field('email'),
    'Téléphone' => field('telephone', 40),
    'Ville' => field('ville'),
    // One "quantity × product (slug)" per line, written by the form from the basket.
    'Produits' => multiline('produits', 10000),
];
requireFields($fields, $fields['Email']);
// The message is the only optional field.
$message = multiline('message');
$fields['Langue du site'] = field('langue', 5);

checkRate('devis');

$name = $fields['Prénom'] . ' ' . $fields['Nom'];
sendAndReply(
    $smtp,
    'devis',
    "moreco.ma – Demande de devis – $name (" . $fields['Société'] . ')',
    $name,
    $fields['Email'],
    htmlBody('Nouvelle demande de devis reçue via moreco.ma.', $fields, $message)
);
