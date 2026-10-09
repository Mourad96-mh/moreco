<?php
/**
 * The careers form's mailer. Receives the speculative application posted by
 * components/Careers/CareerForm.tsx and mails it, CV attached, to info@moreco.ma.
 * The sending itself, and why it is done this way, is in mailer.php.
 */

require __DIR__ . '/mailer.php';

$smtp = startForm();

$fields = [
    'Prénom' => field('prenom'),
    'Nom' => field('nom'),
    'Email' => field('email'),
    'Téléphone' => field('telephone', 40),
    'Département' => field('departement'),
    'Diplôme' => field('diplome'),
    "Niveau d'étude après bac" => field('niveau-etude'),
];
requireFields($fields, $fields['Email']);
// The covering message is the only optional field.
$message = multiline('message');
$fields['Langue du site'] = field('langue', 5);

/* ------------------------------------------------------------------- the CV */

// The form caps the CV at 1 MB; a little slack for what browsers count differently.
$maxCvBytes = 1024 * 1024 + 4096;

$cv = isset($_FILES['cv']) ? $_FILES['cv'] : null;
if (!is_array($cv) || !isset($cv['error']) || $cv['error'] !== UPLOAD_ERR_OK) reply(400, false, 'cv');
if ($cv['size'] > $maxCvBytes) reply(413, false, 'cv-size');
$pdf = file_get_contents($cv['tmp_name']);
// Judged by its content, not its name: a PDF starts with %PDF.
if ($pdf === false || strncmp($pdf, '%PDF', 4) !== 0) reply(400, false, 'cv-type');

$cvName = trim((string)preg_replace('/[^A-Za-z0-9._-]+/', '-', basename((string)$cv['name'])), '-.');
if (!preg_match('/\.pdf$/i', $cvName)) $cvName .= '.pdf';
if ($cvName === '.pdf') $cvName = 'cv.pdf';

checkRate('candidature');

$name = $fields['Prénom'] . ' ' . $fields['Nom'];
sendAndReply(
    $smtp,
    'candidature',
    "moreco.ma – Candidature spontanée – $name",
    $name,
    $fields['Email'],
    htmlBody('Nouvelle candidature spontanée reçue via moreco.ma. Le CV est en pièce jointe.', $fields, $message),
    array($cvName, $pdf)
);
