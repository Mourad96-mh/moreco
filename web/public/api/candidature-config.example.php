<?php
/**
 * Copy to candidature-config.php (same folder) and fill in the password of the
 * info@moreco.ma mailbox, the one used to sign in at mail.savvii.email.
 * candidature-config.php is kept out of git and refused to the web by api/.htaccess.
 */
return [
    'host' => 'smtp.savvii.email',
    'port' => 465,
    'user' => 'info@moreco.ma',
    'password' => 'CHANGE-ME',
    'from' => 'info@moreco.ma', // the mailbox signed in above, so SPF and DKIM pass
    'to' => 'info@moreco.ma',   // where the applications arrive
];
