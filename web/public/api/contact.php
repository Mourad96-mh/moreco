<?php
/**
 * The contact form's mailer. Receives the message posted by
 * components/Contact/ContactForm.tsx and mails it to info@moreco.ma, the department the
 * visitor chose in the subject so it can be forwarded at a glance. The sending itself,
 * and why it is done this way, is in mailer.php.
 */

require __DIR__ . '/mailer.php';

$smtp = startForm();

$fields = [
    'Service demandé' => field('service'),
    'Prénom' => field('prenom'),
    'Nom' => field('nom'),
    'Email' => field('email'),
    'Téléphone' => field('telephone', 40),
    'Société' => field('societe'),
    'Ville' => field('ville'),
];
// Every field is required on this form, the message included.
$message = multiline('message');
requireFields($fields + ['Message' => $message], $fields['Email']);
$fields['Langue du site'] = field('langue', 5);

checkRate('contact');

$name = $fields['Prénom'] . ' ' . $fields['Nom'];
sendAndReply(
    $smtp,
    'contact',
    'moreco.ma – Contact – ' . $fields['Service demandé'] . " – $name",
    $name,
    $fields['Email'],
    htmlBody('Nouveau message reçu via le formulaire de contact de moreco.ma.', $fields, $message)
);
