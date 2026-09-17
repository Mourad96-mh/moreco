'use client';

import { useRef, useState, type FormEvent } from 'react';

import type { Locale } from '@/i18n/config';
import s from './CareerForm.module.css';

/**
 * The speculative-application form, modelled on casem.ma/carrieres: four identity fields,
 * two dropdowns, the level of study, a message, and the CV itself.
 *
 * Same plumbing as the contact and quote forms — the site is a static export, so there is
 * no server of our own and the form posts to a form-mail endpoint. Without
 * NEXT_PUBLIC_QUOTE_ENDPOINT it reports the failure rather than pretending to have sent:
 * an application that vanishes silently is worse than a form that says it is broken.
 *
 * The CV is checked here before anything is sent. The endpoint's own limit is not ours to
 * rely on, and someone who has just filled in eight fields should be told their file is
 * too heavy before the upload, not after it.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT ?? '';
const ACCESS_KEY = process.env.NEXT_PUBLIC_QUOTE_ACCESS_KEY ?? '';

/** The client's cap, to the byte the browser reports. */
const MAX_CV_BYTES = 1024 * 1024;

export interface CareerLabels {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  required: string;
  sending: string;
  error: string;
  department: string;
  diploma: string;
  studyLevel: string;
  choose: string;
  cv: string;
  cvHint: string;
  cvButton: string;
  cvEmpty: string;
  cvType: string;
  cvSize: string;
  submit: string;
  success: string;
  departments: string[];
  diplomas: string[];
}

export default function CareerForm({ locale, labels }: { locale: Locale; labels: CareerLabels }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [cvName, setCvName] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  /** PDF, and under a megabyte. Anything else is refused before the form can be sent. */
  function checkCv(file: File | undefined): boolean {
    if (!file) {
      setCvName(null);
      setCvError(null);
      return false;
    }

    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      setCvName(null);
      setCvError(labels.cvType);
      return false;
    }
    if (file.size > MAX_CV_BYTES) {
      setCvName(null);
      setCvError(labels.cvSize);
      return false;
    }

    setCvName(file.name);
    setCvError(null);
    return true;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!checkCv(fileInput.current?.files?.[0])) {
      if (!fileInput.current?.files?.length) setCvError(labels.cvType);
      fileInput.current?.focus();
      return;
    }

    const data = new FormData(form);
    data.set('langue', locale);
    data.set('origine', 'candidature-spontanee');
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
      setCvName(null);
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
    <form className={s.form} onSubmit={onSubmit}>
      <div className={s.row}>
        <Field name="nom" label={labels.lastName} required requiredLabel={labels.required} />
        <Field name="prenom" label={labels.firstName} required requiredLabel={labels.required} />
      </div>

      <div className={s.row}>
        <Field name="email" type="email" label={labels.email} required requiredLabel={labels.required} />
        <Field name="telephone" type="tel" label={labels.phone} required requiredLabel={labels.required} />
      </div>

      <div className={s.row}>
        <Select name="departement" label={labels.department} placeholder={labels.choose} options={labels.departments} />
        <Select name="diplome" label={labels.diploma} placeholder={labels.choose} options={labels.diplomas} />
      </div>

      <Field name="niveau-etude" label={labels.studyLevel} />

      <label className={s.field}>
        <span className={s.label}>{labels.message}</span>
        <textarea name="message" rows={5} className={s.textarea} />
      </label>

      {/*
       * A file input styled as a button. The native control is kept — it is what carries
       * the file and what a keyboard and a screen reader already know how to drive — and
       * only its appearance is replaced, with the chosen filename read back beside it.
       */}
      <div className={s.field}>
        <span className={s.label}>
          {labels.cv} <span className={s.req}>{labels.required}</span>
        </span>
        <div className={s.file}>
          <label className={s.fileButton}>
            {labels.cvButton}
            <input
              ref={fileInput}
              type="file"
              name="cv"
              accept="application/pdf,.pdf"
              required
              className={s.fileInput}
              onChange={(e) => checkCv(e.currentTarget.files?.[0])}
            />
          </label>
          <span className={cvName ? s.fileName : s.fileEmpty}>{cvName ?? labels.cvEmpty}</span>
        </div>
        <p className={s.hint}>{labels.cvHint}</p>
        {cvError && (
          <p className={s.error} role="alert">
            {cvError}
          </p>
        )}
      </div>

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
  required = false,
  requiredLabel,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  requiredLabel?: string;
}) {
  return (
    <label className={s.field}>
      <span className={s.label}>
        {label} {required && <span className={s.req}>{requiredLabel}</span>}
      </span>
      <input type={type} name={name} required={required} className={s.input} />
    </label>
  );
}

function Select({
  name,
  label,
  placeholder,
  options,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
}) {
  return (
    <label className={s.field}>
      <span className={s.label}>{label}</span>
      <select name={name} className={s.select} defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="m4 12.5 5.2 5.2L20 7" />
  </svg>
);
