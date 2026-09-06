import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import { locale as rootLocale } from 'next/root-params';
import { notFound } from 'next/navigation';

import '../globals.css';
import {
  LOCALES,
  LOCALE_DIR,
  LOCALE_HREFLANG,
  SITE_URL,
  isLocale,
  type Locale,
} from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { QuoteProvider } from '@/components/Quote/QuoteProvider';
import SiteHeader from '@/components/Header/SiteHeader';
import SiteFooter from '@/components/Footer/SiteFooter';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

/**
 * Inter carries no Arabic, so /ar/ would fall back to whatever the device happens to
 * have. Noto Sans Arabic is loaded only on that locale and slots in ahead of Inter in
 * --font-sans, which leaves the Latin brand names (Moreco, Orthagrow) on Inter.
 */
const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-arabic',
});

/**
 * `[locale]` sits above the root layout, which makes it a root param: any server
 * component can read it through `next/root-params` without prop drilling, and the
 * <html lang> can be set here. See node_modules/next/dist/docs/01-app/03-api-reference/
 * 04-functions/next-root-params.md.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const value = await rootLocale();
  if (!value || !isLocale(value)) return {};
  const t = getDictionary(value);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${t.site.name} — ${t.site.tagline}`,
      template: `%s — ${t.site.name}`,
    },
    description: t.site.description,
    openGraph: {
      type: 'website',
      siteName: t.site.name,
      title: `${t.site.name} — ${t.site.tagline}`,
      description: t.site.description,
      locale: LOCALE_HREFLANG[value],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<'/[locale]'>) {
  const value = await rootLocale();
  if (!value || !isLocale(value)) notFound();
  const locale = value as Locale;
  const t = getDictionary(locale);

  return (
    /*
     * Both `suppressHydrationWarning`s are for attributes React never rendered and so
     * cannot reconcile — it suppresses this element only, not the tree below it.
     *
     * <html>: the inline script below adds `js` to the class list before hydration, on
     * purpose. Rendering `js` on the server instead would leave a visitor with
     * JavaScript off staring at a page whose reveal styles never un-hide anything.
     *
     * <body>: browser extensions write their own attributes there — ColorZilla's
     * `cz-shortcut-listen`, Grammarly's `data-gr-*`. Nothing on our side can prevent it.
     */
    <html
      lang={LOCALE_HREFLANG[locale]}
      dir={LOCALE_DIR[locale]}
      className={[inter.variable, locale === 'ar' ? notoArabic.variable : ''].join(' ').trim()}
      suppressHydrationWarning
    >
      <head>
        {/*
         * Arms the scroll-reveal styles. They hide their element until an observer
         * shows it, so they must only apply where this script has run — otherwise a
         * visitor with JavaScript off would get a blank page.
         */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body suppressHydrationWarning>
        <QuoteProvider>
          <a className="skip-link" href="#main">
            {t.a11y.skipToContent}
          </a>
          <SiteHeader locale={locale} />
          <main id="main">{children}</main>
          <SiteFooter locale={locale} />
        </QuoteProvider>
      </body>
    </html>
  );
}
