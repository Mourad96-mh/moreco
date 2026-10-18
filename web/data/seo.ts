import type { Locale } from '@/i18n/config';

/**
 * Google titles and descriptions chosen page by page, over the ones the page would
 * otherwise take from its own heading and lead. From the client's keyword plan of
 * 2026-10-18 ("TAGS SEO MORECO_ORTHAGROW", 14 topics): each topic that already has a page
 * on the site gets the plan's title here. The titles are the plan's, word for word; the
 * descriptions are ours, written to the page's actual content and kept under 155
 * characters. French and English only, as in the plan (its Arabic column has no site to
 * go to); the other languages keep their default.
 *
 * Keyed by route key (see data/routes.ts). The title is used as is, without the
 * "— Moreco" suffix, since every one of them already opens on the brand.
 */
type Seo = { title: string; description: string };

export const SEO_OVERRIDES: Record<string, Partial<Record<Locale, Seo>>> = {
  // Topic "ORTHAGROW brand"
  'range:orthagrow': {
    fr: {
      title: 'ORTHAGROW – Solutions avancées pour les cultures et la nutrition végétale au Maroc',
      description:
        'La gamme Orthagrow « Powered by OSA » : engrais et biostimulants au silicium biodisponible pour la nutrition, la qualité et la résistance des cultures.',
    },
    en: {
      title: 'ORTHAGROW – Advanced Crop & Plant Nutrition Solutions in Morocco',
      description:
        'The Orthagrow range, Powered by OSA: fertilisers and biostimulants with bioavailable silicon for crop nutrition, quality and stress resistance.',
    },
  },
  // Topic "OSA / Orthosilicic Acid"
  'article:importance-du-silicium': {
    fr: {
      title: 'ORTHAGROW OSA – Acide orthosilicique pour l’agriculture',
      description:
        'Le silicium, élément manquant de l’agriculture : le Prof. Dirk Van den Berghe explique le rôle de l’acide orthosilicique (OSA) dans la plante.',
    },
    en: {
      title: 'ORTHAGROW OSA – Orthosilicic Acid for Agriculture',
      description:
        'Silicon, the missing element in agriculture: Prof. Dirk Van den Berghe on the role of orthosilicic acid (OSA) in plants and crops.',
    },
  },
  // Topic "Crop nutrition"
  'article:nutrition-foliaire': {
    fr: {
      title: 'ORTHAGROW – Nutrition des cultures et nutrition végétale',
      description:
        'Nutrition foliaire des cultures : faits, mythes et perspectives. Ce que la recherche dit de l’efficacité des engrais foliaires sur la plante.',
    },
    en: {
      title: 'ORTHAGROW Crop Nutrition – Advanced Plant Nutrition',
      description:
        'Foliar nutrition of crops: facts, myths and perspectives. What research says about how well foliar fertilisers feed the plant.',
    },
  },
  // Topic "Tomatoes"
  'trial:tomates': {
    fr: {
      title: 'ORTHAGROW pour la production de tomates au Maroc',
      description:
        'Tomates au domaine Douiet, à Fès : résultats d’Orthagrow Control, parcelle traitée contre parcelle témoin sur la même exploitation.',
    },
    en: {
      title: 'ORTHAGROW for Tomato Production in Morocco',
      description:
        'Tomatoes at the Douiet estate near Fez: results of Orthagrow Control, treated plot against control plot on the same farm.',
    },
  },
  // Topic "Red fruits & berries"
  'trial:fraises': {
    fr: {
      title: 'ORTHAGROW pour les fruits rouges et les baies au Maroc',
      description:
        'Fraises à Larache et Moulay Bousselham : résultats d’Orthagrow Control, Bloom Booster, Micro Manager et Fertifight, traité contre témoin.',
    },
    en: {
      title: 'ORTHAGROW for Red Fruits & Berry Production',
      description:
        'Strawberries in Larache and Moulay Bousselham: results of Orthagrow Control, Bloom Booster, Micro Manager and Fertifight, treated against control.',
    },
  },
  // Topic "Olives"
  'trial:olives': {
    fr: {
      title: 'ORTHAGROW pour la production d’olives au Maroc',
      description:
        'Olives à Marrakech, 2017 : résultats de l’application d’Orthagrow Control, parcelle traitée contre parcelle témoin sur la même exploitation.',
    },
    en: {
      title: 'ORTHAGROW for Olive Production in Morocco',
      description:
        'Olives in Marrakech, 2017: results of applying Orthagrow Control, treated plot against control plot on the same farm.',
    },
  },
};
