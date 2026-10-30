/**
 * Where the contact, quote and careers forms go: public/api/<form>.php, small mailers on
 * the site's own server that sign in to the info@moreco.ma mailbox at Savvii and send the
 * message (see public/api/mailer.php). Not EmailJS, whose free plan refuses any request
 * over 50 KB, so nearly every CV bounced (HTTP 413); not FormSubmit either, whose
 * activation page answered 500 and never activated (2026-10-09).
 *
 * The form's own field names are posted as they are; each script gives them the French
 * titles the reader of the mail sees. The scripts only run on the PHP host, so under
 * `next dev` every form reports a failure.
 */
export type MailerForm = 'contact' | 'devis' | 'candidature' | 'essais-demande';

/** Resolves once the server has mailed the form, throws otherwise. */
export async function sendForm(form: MailerForm, data: FormData): Promise<void> {
  // The honeypot: a person never sees this field, so a filled one is a robot. Pretend it
  // went through rather than tell the robot what gave it away.
  const trap = data.get('_gotcha');
  if (typeof trap === 'string' && trap !== '') return;

  const response = await fetch(`/api/${form}.php`, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  });
  const result = (await response.json().catch(() => ({}))) as { success?: boolean };
  if (!response.ok || result.success !== true) {
    throw new Error(`${response.status} ${JSON.stringify(result)}`);
  }
}
