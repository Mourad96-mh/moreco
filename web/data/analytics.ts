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
