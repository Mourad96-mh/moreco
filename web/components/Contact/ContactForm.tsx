'use client';

import { useState, type FormEvent } from 'react';

import type { Locale } from '@/i18n/config';
import { requiredFieldsFilled } from '@/components/forms/requiredFields';
import s from './ContactForm.module.css';

/**
 * The message form. Same plumbing as the quote basket's: the site is a static export, so
 * there is no server to post to and the form goes straight to a form-mail endpoint.
 * Without NEXT_PUBLIC_QUOTE_ENDPOINT it reports the failure honestly rather than
 * pretending to have sent — a contact form that silently swallows messages is worse than
 * none at all.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT ?? '';
const ACCESS_KEY = process.env.NEXT_PUBLIC_QUOTE_ACCESS_KEY ?? '';

export interface ContactLabels {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  /** The legend under the star: "Champs obligatoires". */
  required: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
}

export default function ContactForm({ locale, labels }: { locale: Locale; labels: ContactLabels }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!requiredFieldsFilled(form)) return;
    const data = new FormData(form);
    data.set('langue', locale);
    data.set('origine', 'contact');
    if (ACCESS_KEY) data.set('access_key', ACCESS_KEY);

    if (!ENDPOINT) {
      setState('failed');
      return;
    }

    setState('sending');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(String(response.status));
      setState('sent');
      form.reset();
    } catch {
      setState('failed');
    }
  }

  if (state === 'sent') {
    return (
      <div className={s.done}>
        <CheckIcon />
        <p>{labels.success}</p>
      </div>
    );
  }

  return (
    /* Every field is required since 2026-09-26, each marked with a star. */
    <form className={s.form} onSubmit={onSubmit} noValidate={false}>
      <p className={s.legend}>
        <Star /> {labels.required}
      </p>

      <div className={s.row}>
        <Field name="prenom" label={labels.firstName} autoComplete="given-name" />
        <Field name="nom" label={labels.lastName} autoComplete="family-name" />
      </div>

      <div className={s.row}>
        <Field name="email" type="email" label={labels.email} autoComplete="email" />
        <Field name="telephone" type="tel" label={labels.phone} autoComplete="tel" />
      </div>

      <div className={s.row}>
        <Field name="societe" label={labels.company} autoComplete="organization" />
        <Field name="ville" label={labels.city} autoComplete="address-level2" />
      </div>

      <label className={s.field}>
        <span className={s.label}>
          {labels.message} <Star />
        </span>
        <textarea name="message" rows={6} required className={s.textarea} />
      </label>

      {/* Bots fill every field they find; people never see this one. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className={s.gotcha} aria-hidden="true" />

      <div className={s.actions}>
        <button type="submit" className="btn" disabled={state === 'sending'}>
          {state === 'sending' ? labels.sending : labels.submit}
        </button>
        {state === 'failed' && (
          <p className={s.error} role="alert">
            {labels.error}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className={s.field}>
      <span className={s.label}>
        {label} <Star />
      </span>
      <input type={type} name={name} required autoComplete={autoComplete} className={s.input} />
    </label>
  );
}

/** The required-field mark. Screen readers get the `required` attribute instead. */
const Star = () => (
  <span className={s.req} aria-hidden="true">
    *
  </span>
);

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="m4 12.5 5.2 5.2L20 7" />
  </svg>
);
