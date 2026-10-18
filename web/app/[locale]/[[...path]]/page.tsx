import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LOCALE_HREFLANG, SITE_URL, DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { ALL_ROUTES, resolveRoute, translationsOf, type Route } from '@/data/routes';
import { getProduct, getRange, productName } from '@/data/products';
import { getTrial, trialTitle, trialDescription } from '@/data/trials';
import { getArticle, articleTitle, articleExcerpt } from '@/data/articles';

import HomeView from '@/views/HomeView';
import ProductsView from '@/views/ProductsView';
import SegmentView from '@/views/SegmentView';
import RangeView from '@/views/RangeView';
import ProductView from '@/views/ProductView';
import RdiView from '@/views/RdiView';
import TrialsView from '@/views/TrialsView';
import TrialView from '@/views/TrialView';
import QuoteView from '@/views/QuoteView';
import NewsView from '@/views/NewsView';
import KnowledgeArticleView from '@/views/KnowledgeArticleView';
import AboutView from '@/views/AboutView';
import ServicesView from '@/views/ServicesView';
import PressView from '@/views/PressView';
import KnowledgeView from '@/views/KnowledgeView';
import ContactView from '@/views/ContactView';
import ArticlePageView from '@/views/ArticlePageView';

/**
 * Every page of the site is rendered from here. A static export cannot run middleware,
 * so localised URLs (/fr/produits, /en/products, /es/productos, /de/produkte) are baked
 * at build time from the table in data/routes.ts and matched back here.
 */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  return ALL_ROUTES.filter((r) => r.locale === params.locale).map((r) => ({ path: r.path }));
}

function routeFrom(locale: string, path?: string[]): { locale: Locale; route: Route } {
  if (!isLocale(locale)) notFound();
  const route = resolveRoute(locale, path ?? []);
  if (!route) notFound();
  return { locale, route };
}

/** Page title and description per view — the products and trials name themselves. */
function seoFor(route: Route, locale: Locale) {
  const t = getDictionary(locale);

  switch (route.view) {
    case 'home':
      return { title: `${t.site.name} — ${t.site.tagline}`, description: t.site.description, absolute: true };
    case 'products':
      return { title: t.pages.products.title, description: t.pages.products.lead };
    case 'segment': {
      const segment = t.segments[route.params.segment!];
      return { title: segment.name, description: segment.blurb };
    }
    case 'range': {
      const range = getRange(route.params.range!);
      return { title: range?.name ?? t.pages.products.title, description: t.pages.products.lead };
    }
    case 'product': {
      const product = getProduct(route.params.product!);
      return { title: product ? productName(product, locale) : '', description: t.site.description };
    }
    case 'rdi':
      return { title: t.rdi.title, description: t.rdi.intro };
    case 'trials':
      return { title: t.pages.trials.title, description: t.pages.trials.lead };
    case 'trial': {
      const trial = getTrial(route.params.trial!);
      return {
        title: trial ? trialTitle(trial, locale) : t.rdi.trialsTitle,
        description: trial ? trialDescription(trial, locale) : t.rdi.trialsIntro,
      };
    }
    case 'article': {
      const article = getArticle(route.params.article!);
      return {
        title: article ? articleTitle(article, locale) : t.nav.knowledge,
        description: article ? articleExcerpt(article, locale) : t.site.description,
      };
    }
    case 'quote':
      return { title: t.quote.title, description: t.quote.intro };
    default: {
      const page = t.pages[route.view as keyof typeof t.pages];
      return page ? { title: page.title, description: page.lead } : { title: t.site.name, description: t.site.description };
    }
  }
}

export async function generateMetadata(props: PageProps<'/[locale]/[[...path]]'>): Promise<Metadata> {
  const { locale: raw, path } = await props.params;
  if (!isLocale(raw)) return {};
  const route = resolveRoute(raw, path ?? []);
  if (!route) return {};

  const seo = seoFor(route, raw);
  const alternates = translationsOf(route.key);

  return {
    title: seo.absolute ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: {
      canonical: `${SITE_URL}${alternates.find((a) => a.locale === raw)!.href}`,
      languages: {
        ...Object.fromEntries(
          alternates.map(({ locale, href }) => [LOCALE_HREFLANG[locale], `${SITE_URL}${href}`])
        ),
        'x-default': `${SITE_URL}${alternates.find((a) => a.locale === DEFAULT_LOCALE)!.href}`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}${alternates.find((a) => a.locale === raw)!.href}`,
    },
  };
}

export default async function Page(props: PageProps<'/[locale]/[[...path]]'>) {
  const params = await props.params;
  const { locale, route } = routeFrom(params.locale, params.path);

  switch (route.view) {
    case 'home':
      return <HomeView locale={locale} />;
    case 'products':
      return <ProductsView locale={locale} />;
    case 'segment':
      return <SegmentView locale={locale} segment={route.params.segment!} />;
    case 'range':
      return <RangeView locale={locale} range={route.params.range!} />;
    case 'product':
      return <ProductView locale={locale} slug={route.params.product!} />;
    case 'rdi':
      return <RdiView locale={locale} />;
    case 'trials':
      return <TrialsView locale={locale} />;
    case 'trial':
      return <TrialView locale={locale} slug={route.params.trial!} />;
    case 'quote':
      return <QuoteView locale={locale} />;
    case 'news':
      return <NewsView locale={locale} />;
    case 'about':
      return <AboutView locale={locale} />;
    case 'services':
      return <ServicesView locale={locale} />;
    case 'media':
      return <PressView locale={locale} />;
    case 'knowledge':
      return <KnowledgeView locale={locale} />;
    case 'contact':
      return <ContactView locale={locale} />;
    case 'article':
      return <KnowledgeArticleView locale={locale} slug={route.params.article!} />;
    default:
      return <ArticlePageView locale={locale} view={route.view} />;
  }
}

/** Only the routes in the table exist; anything else is a 404 at build time. */
export const dynamicParams = false;
