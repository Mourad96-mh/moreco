'use client';

import { useEffect } from 'react';
import { track } from './track';

/**
 * Clicks on the phone number, the e-mail address and the PDFs (datasheets, studies),
 * wherever they appear — header, footer, contact page, product pages. One listener on the
 * document rather than a handler on every link, so a link added later is counted too.
 *
 * GA4's own download tracking ("enhanced measurement") is switched off on the property,
 * so the PDFs are counted here, under GA4's recommended `file_download` name.
 */
export default function LinkTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.getAttribute('href') ?? '';

      if (href.startsWith('tel:')) {
        track('phone_click', { phone_number: href.slice(4), page_path: location.pathname });
      } else if (href.startsWith('mailto:')) {
        track('email_click', { page_path: location.pathname });
      } else if (/\.pdf($|[?#])/i.test(href)) {
        const url = new URL(link.href);
        track('file_download', {
          file_name: decodeURIComponent(url.pathname.split('/').pop() ?? ''),
          file_extension: 'pdf',
          link_url: url.pathname,
          link_text: (link.textContent ?? '').trim().slice(0, 100),
        });
      }
    }

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
