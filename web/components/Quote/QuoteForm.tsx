'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import type { Locale } from '@/i18n/config';
import { useQuote } from './QuoteProvider';
import { requiredFieldsFilled } from '@/components/forms/requiredFields';
import s from './QuoteForm.module.css';

interface CatalogueEntry {
  slug: string;
  name: string;
  image: string | null;
}

type Labels = {
  lead: string;
  empty: string;
  emptyCta: string;
  remove: string;
  clear: string;
  quantity: string;
  items: string;
  formTitle: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  messageHint: string;
  required: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

/**
 * The quote request itself: the basket on the left, the contact form on the right.
 *
 * The site is a static export, so there is no server to post to — the request goes
 * straight to a form-mail endpoint. Set NEXT_PUBLIC_QUOTE_ENDPOINT to the Web3Forms /
 * Formspree URL; without it the form still validates and reports the failure honestly
 * rather than pretending to have sent.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT ?? '';
const ACCESS_KEY = process.env.NEXT_PUBLIC_QUOTE_ACCESS_KEY ?? '';

export default function QuoteForm({
  locale,
  catalogue,
  productsHref,
  labels,
}: {
  locale: Locale;
  catalogue: CatalogueEntry[];
  productsHref: string;
  labels: Labels;
}) {
  const { lines, remove, setQuantity, clear, ready } = useQuote();
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const byslug = new Map(catalogue.map((c) => [c.slug, c]));
  const selection = lines.map((l) => ({ ...l, product: byslug.get(l.slug) }));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!requiredFieldsFilled(form)) return;
    const data = new FormData(form);

    // The basket travels as readable text, so whoever opens the mail sees the request.
    data.set(
      'produits',
      selection
        .map((l) => `${l.quantity} × ${l.product?.name ?? l.slug} (${l.slug})`)
        .join('\n') || '—'
    );
    data.set('langue', locale);
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
      clear();
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
        <Link className="btn btn--ghost" href={productsHref}>
          {labels.emptyCta}
        </Link>
      </div>
    );
  }

  return (
    <div className={s.layout}>
      <section className={s.basket} aria-label={labels.lead}>
        <header className={s.basketHead}>
          <h2 className={s.basketTitle}>{labels.lead}</h2>
          {ready && lines.length > 0 && (
            <button type="button" className={s.clear} onClick={clear}>
              {labels.clear}
            </button>
          )}
        </header>

        {!ready ? (
          <p className={s.empty} aria-hidden="true">
            &nbsp;
          </p>
        ) : lines.length === 0 ? (
          <div className={s.emptyBox}>
            <p className={s.empty}>{labels.empty}</p>
            <Link className="btn" href={productsHref}>
              {labels.emptyCta}
            </Link>
          </div>
        ) : (
          <>
            <ul className={s.lines}>
              {selection.map((line) => (
                <li key={line.slug} className={s.line}>
                  {line.product?.image && (
                    <Image
                      src={line.product.image}
                      alt=""
                      width={72}
                      height={72}
                      className={s.thumb}
                    />
                  )}

                  <div className={s.lineBody}>
                    <p className={s.lineName}>{line.product?.name ?? line.slug}</p>
                    <label className={s.qty}>
                      <span className="visually-hidden">{labels.quantity}</span>
                      <input
                        type="number"
                        min={1}
                        max={999}
                        value={line.quantity}
                        onChange={(e) => setQuantity(line.slug, Number(e.target.value))}
                      />
                    </label>
                  </div>

                  <button type="button" className={s.remove} onClick={() => remove(line.slug)}>
                    <span className="visually-hidden">{labels.remove}</span>
                    <CloseIcon />
                  </button>
                </li>
              ))}
            </ul>
            <p className={s.count}>
              {lines.length} {labels.items}
            </p>
          </>
        )}
      </section>

      <section className={s.formSide}>
        <h2 className={s.formTitle}>{labels.formTitle}</h2>

        <form className={s.form} onSubmit={onSubmit} noValidate={false}>
          {/* Bot trap: a real person never fills this in. */}
          <input type="text" name="_gotcha" className={s.gotcha} tabIndex={-1} autoComplete="off" />

          <p className={s.legend}>
            <span className={s.req} aria-hidden="true">
              *
            </span>{' '}
            {labels.required}
          </p>

          <div className={s.row}>
            <Field name="prenom" label={labels.firstName} required autoComplete="given-name" />
            <Field name="nom" label={labels.lastName} required autoComplete="family-name" />
          </div>

          <Field name="societe" label={labels.company} required autoComplete="organization" />

          <div className={s.row}>
            <Field name="email" label={labels.email} type="email" required autoComplete="email" />
            <Field name="telephone" label={labels.phone} type="tel" required autoComplete="tel" />
          </div>

          <Field name="ville" label={labels.city} required autoComplete="address-level2" />

          <label className={s.field}>
            <span className={s.label}>{labels.message}</span>
            <textarea name="message" rows={5} placeholder={labels.messageHint} />
          </label>

          {state === 'failed' && (
            <p className={s.error} role="alert">
              {labels.error}
            </p>
          )}

          <button type="submit" className="btn" disabled={state === 'sending' || lines.length === 0}>
            {state === 'sending' ? labels.sending : labels.submit}
          </button>
        </form>
      </section>
    </div>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required = false,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className={s.field}>
      <span className={s.label}>
        {label}
        {required && (
          <span className={s.req} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </span>
      <input type={type} name={name} required={required} autoComplete={autoComplete} />
    </label>
  );
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="m7.5 12.5 3 3 6-6.5" />
  </svg>
);
