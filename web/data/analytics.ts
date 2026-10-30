/**
 * Google Analytics 4, asked for in the client's briefing of 2026-10-18 (visitors by
 * Moroccan city, Agadir first). The tag is written into the <head> of every page in every
 * language by app/[locale]/layout.tsx, hard-coded rather than through GTM.
 *
 * The Measurement ID of the client's GA4 property (GA4 > Admin > Data streams > Web),
 * received on 2026-10-18. Emptying it removes the tag from every page. The old site's
 * UA-136256554-1 is a Universal Analytics ID, which Google switched off in 2023.
 */
export const GA_MEASUREMENT_ID = 'G-GT393Q3TE4';

/**
 * Which document a visitor downloads (asked for on 2026-10-30). GA4's own file_download
 * only gives the file's address; this sends a `document_download` event that names the kind
 * of document from the folder it sits in, and the product or crop from its file name
 * (orthagrow-control, fraise-larache-felgar-2015…), so a report can tell a technical
 * sheet from a trial report. One listener on the document catches every download link,
 * whichever page or component draws it. Only these folders count: the site's other media
 * are pictures, not documents.
 *
 * GA4 shows the parameters in its reports only once they are registered as event-scoped
 * custom dimensions (Admin > Custom definitions): document_type and document_name.
 */
const DOCUMENT_TYPES: Record<string, string> = {
  datasheets: 'technical_sheet',
  flyers: 'crop_flyer',
  'research/documents': 'trial_report',
  'research/publications': 'scientific_publication',
  articles: 'article',
  press: 'press',
};

export const DOWNLOAD_TRACKING = `document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var u=new URL(a.href,location.href);if(u.origin!==location.origin)return;var m=u.pathname.match(/^\\/media\\/(.+)\\/([^/]+)\\.(pdf|png|jpe?g|docx?|xlsx?)$/i);var t=m&&${JSON.stringify(DOCUMENT_TYPES)}[m[1]];if(!t)return;gtag('event','document_download',{document_type:t,document_name:decodeURIComponent(m[2]),file_extension:m[3].toLowerCase(),link_text:(a.textContent||'').trim().slice(0,100)});});`;
