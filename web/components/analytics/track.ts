/**
 * GA4 events for what the site is for: leads (2026-10-18). The tag itself is written by
 * app/[locale]/layout.tsx; this only hands an event to it.
 *
 *   generate_lead     a quote request was mailed            (key event)
 *   contact_submit    a contact message was mailed          (key event)
 *   job_application   an application with its CV was mailed (key event)
 *   add_to_quote      a product went into the quote basket
 *   phone_click, email_click, file_download   see LinkTracker
 *
 * Events fire only once the server has confirmed the send, so a failed form counts as
 * nothing. Without the tag (an empty GA_MEASUREMENT_ID, a blocker) this does nothing.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}
