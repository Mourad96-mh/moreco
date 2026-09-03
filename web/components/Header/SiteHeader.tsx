import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { mainNav, PRIMARY_PHONE, CONTACT } from '@/data/nav';
import { href } from '@/data/routes';
import HeaderClient from './HeaderClient';

/**
 * The casem.ma header, rebuilt: a thin utility bar over a full-height main bar with the
 * logo left, hover dropdowns, and the "Voir la demande de devis" button on the right.
 * Everything interactive lives in HeaderClient; this half just resolves the copy.
 */
export default function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <HeaderClient
      locale={locale}
      nav={mainNav(locale, t)}
      homeHref={href(locale, 'home')}
      quoteHref={href(locale, 'quote')}
      phone={PRIMARY_PHONE}
      social={CONTACT.social}
      labels={{
        quote: t.nav.quote,
        quoteShort: t.nav.quoteShort,
        openMenu: t.nav.openMenu,
        closeMenu: t.nav.closeMenu,
        search: t.nav.search,
        language: t.nav.language,
        mainNav: t.a11y.mainNav,
        siteName: t.site.name,
      }}
    />
  );
}
