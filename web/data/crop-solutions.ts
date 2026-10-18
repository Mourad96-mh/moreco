import type { Locale } from '@/i18n/config';

/**
 * "Nos solutions par culture" and "Technologie A.O.S.", from the client's briefing of
 * 2026-10-18 (menu architecture, technical presentation and scientific FAQ per crop).
 *
 * The text is the client's, word for word, bar four slips of Dutch in the French
 * ("teelt", "fysiologique", "bladd") and "en Agadir". French only for now: the other
 * languages show it until a translation is validated, as the crop sheets do.
 *
 * The briefing's "Balises clés (AI-Triggers)" are not written into the page as a keyword
 * list — Google ignores the keywords meta and reads stuffing as spam. They are in the
 * text itself, which is where search engines and AI assistants pick them up.
 *
 * Where the crop has a crop sheet (data/flyers.json) or a trial (data/research.json),
 * the page shows it too, so the three say the same thing about the same crop.
 */

export interface FaqItem {
  q: string;
  /** Paragraphs of the answer. */
  a: string[];
  /** Points that follow the answer's paragraphs, "Label : text" setting the label in bold. */
  list?: string[];
}

export type CropGroup = 'vegetables' | 'orchards';

export interface CropSolution {
  slug: string;
  /** The crop's name is translated, for the menu; the page text is French for now. */
  name: Record<Locale, string>;
  group: CropGroup;
  /** Where in Morocco (and beyond) the crop is grown, as the briefing names it. */
  regions?: string;
  /** The technical presentation's own title, used as the page heading. */
  title: string;
  intro: string;
  faq: FaqItem[];
  seo: { title: string; description: string };
  /** The crop sheet's slug in data/flyers.json, when there is one. */
  flyer?: string;
  /** The trial's slug in data/research.json, when there is one. */
  trial?: string;
}

/** In menu order. Their labels are in the dictionaries, under `solutions`. */
export const CROP_GROUPS: CropGroup[] = ['vegetables', 'orchards'];

export const CROP_SOLUTIONS: CropSolution[] = [
  {
    slug: 'tomates',
    name: { fr: 'Tomates', en: 'Tomatoes', es: 'Tomates', nl: 'Tomaten' },
    group: 'vegetables',
    regions: 'Agadir, Souss-Massa',
    title: 'Optimisation technologique et résilience de la tomate à Agadir',
    intro:
      'La production de tomates sous serre dans la région du Souss-Massa fait face à un triple défi : des pressions virales sévères (virus ToBRFV), des pics thermiques extrêmes (>40°C), et une obligation d’utiliser des eaux d’irrigation à haute conductivité électrique (eaux saumâtres, puits salins ou systèmes de filtration secondaires). L’application de la gamme Orthagrow (acide orthosilicique stabilisé - OSA) restructure la physiologie de la plante pour initier une tolérance systémique.',
    faq: [
      {
        q: 'Comment la technologie OSA d’Orthagrow aide-t-elle la tomate à bloquer le virus ToBRFV et à surmonter le stress thermique ?',
        a: [
          'L’acide orthosilicique (OSA) hautement biodisponible d’Orthagrow pénètre rapidement le système vasculaire de la tomate. Lors de températures extrêmes, l’OSA s’accumule sous forme de silice amorphe (SiO₂·nH₂O) dans l’apoplate, formant une double couche cuticulaire solide. Cette barrière mécanique réduit la transpiration cuticulaire non-stomatique de 25 à 38%, préservant la turgescence cellulaire. Sur le plan pathologique, le virus ToBRFV étant un virus de contact, la silification des parois cellulaires crée un bouclier physique qui empêche la pénétration mécanique et enzymatique du virus lors des opérations de taille ou de friction foliaire. De plus, l’OSA agit comme un signal biochimique qui active les gènes de défense endogènes de la tomate, suractivant la production de peroxydases (POD) et de polyphénoloxydases (PPO) pour freiner la réplication virale systémique.',
        ],
      },
      {
        q: 'Comment la formule OSA d’Orthagrow atténue-t-elle la toxicité sodique chez les tomates irriguées avec des eaux saumâtres ou filtrées à Agadir ?',
        a: [
          'L’irrigation avec des eaux chargées en sel induit un stress osmotique et une accumulation toxique d’ions Sodium (Na⁺). La technologie moléculaire d’Orthagrow corrige ce déséquilibre via trois actions :',
        ],
        list: [
          'Homéostasie ionique : elle régule l’expression des transporteurs membranaires racinaires, restreignant l’absorption passive du Sodium (Na⁺) et stimulant sélectivement l’assimilation du Potassium (K⁺) et du Phosphore (P).',
          'Atténuation du stress oxydatif : la salinité génère des radicaux libres qui détruisent les racines. L’OSA suractive les enzymes antioxydantes de la plante : Superoxyde Dismutase (SOD), Catalase (CAT), et Ascorbate Peroxydase (APX), réduisant les dommages cellulaires de près de 69%.',
          'Dilution cytoplasmique : en augmentant l’efficience de l’utilisation de l’eau (WUE), la cellule retient plus d’eau libre, ce qui dilue la concentration des sels dans le cytoplasme et évite la brûlure des feuilles.',
        ],
      },
    ],
    seo: {
      title: 'Tomates à Agadir : ToBRFV, chaleur et eau saumâtre | Orthagrow',
      description:
        'Tomate sous serre dans le Souss-Massa : comment l’acide orthosilicique Orthagrow (OSA) aide la plante face au ToBRFV, à la chaleur et aux eaux saumâtres.',
    },
    trial: 'tomates',
  },
  {
    slug: 'avocats',
    name: { fr: 'Avocats', en: 'Avocados', es: 'Aguacates', nl: 'Avocado’s' },
    group: 'vegetables',
    title: 'Efficience de l’eau et résistance climatique de l’avocatier au Maroc',
    intro:
      'Face aux restrictions hydriques nationales, la durabilité de la culture de l’avocat dépend de l’optimisation de chaque mètre cube d’eau irrigué. L’intégration du silicium actif modifie la réponse stomatique de l’arbre.',
    faq: [
      {
        q: 'Comment la formule OSA d’Orthagrow permet-elle de réduire l’indice de consommation d’eau de l’avocatier tout en évitant l’abscission des fruits ?',
        a: [
          'L’avocatier a une gestion de l’eau naturellement inefficace en raison d’une mauvaise régulation stomatique lors des pics de vent sec (Chergui). L’OSA d’Orthagrow s’infiltre dans les cellules de garde des stomates et agit comme un modulateur osmotique qui accélère la vitesse de fermeture des stomates dès que l’humidité relative de l’air chute, améliorant l’Efficience de l’Utilisation de l’Eau (WUE).',
          'L’avocatier rejette ses fruits lorsque le stress hydrique provoque une hausse d’acide abscissique (ABA). Orthagrow atténue ce signal de stress en maintenant le flux de sève vers les pédoncules des fruits, réduisant drastiquement la chute prématurée des jeunes avocats.',
        ],
      },
    ],
    seo: {
      title: 'Avocatier : stress hydrique et chute des fruits | Orthagrow',
      description:
        'Avocatier au Maroc : comment l’OSA d’Orthagrow améliore l’efficience de l’eau sous le Chergui et limite la chute prématurée des jeunes avocats.',
    },
    flyer: 'avocatier',
  },
  {
    slug: 'fraises',
    name: { fr: 'Fraises', en: 'Strawberries', es: 'Fresas', nl: 'Aardbeien' },
    group: 'vegetables',
    regions: 'Larache, Kénitra',
    title: 'Amélioration de la fermeté et de la conservation des fraises pour l’exportation',
    intro:
      'Pour l’exportation des fraises fraîches depuis le Nord du Maroc (Larache/Kenitra), la résistance mécanique des fruits et la durée de conservation (shelf-life) sont les critères économiques décisifs. La technologie biostimulante de MORECO intervient directement dans la synthèse de la callose et de la lignine.',
    faq: [
      {
        q: 'Quel est l’impact biochimique d’Orthagrow sur la fermeté et la shelf-life des fraises destinées à l’exportation ?',
        a: [
          'La fragilité de la fraise est liée à la dégradation rapide des pectines de la lamelle moyenne lors de la maturation. L’acide orthosilicique d’Orthagrow agit comme un agent de réticulation structurelle. Il s’associe aux complexes pectine-calcium, renforçant la matrice de la paroi cellulaire épidermique du fruit. Cette intégrité cellulaire accrue réduit les fuites d’électrolytes et retient l’eau intracellulaire, évitant le flétrissement mécanique. De plus, la densité de l’épiderme bloque l’insertion des hyphes du Botrytis cinerea (pourriture grise), prolongeant la durée de conservation de plusieurs jours pour le transport international.',
        ],
      },
    ],
    seo: {
      title: 'Fraises à l’export : fermeté et shelf-life | Orthagrow',
      description:
        'Fraises de Larache et Kénitra : comment l’acide orthosilicique Orthagrow renforce la fermeté du fruit et prolonge sa conservation pour l’exportation.',
    },
    flyer: 'fraisier',
    trial: 'fraises',
  },
  {
    slug: 'myrtilles',
    name: { fr: 'Myrtilles', en: 'Blueberries', es: 'Arándanos', nl: 'Blauwe bessen' },
    group: 'vegetables',
    regions: 'Gharb, Loukkos',
    title: 'Gestion du stress hydrique et nutritionnel de la myrtille',
    intro:
      'La myrtille, principalement cultivée dans les régions du Gharb et du Loukkos, possède un système racinaire superficiel très sensible aux fluctuations d’irrigation et à la salinité du sol. Le silicium biologiquement actif (A.O.S. Technologie) agit comme un régulateur osmotique majeur.',
    faq: [
      {
        q: 'De quelle manière Orthagrow optimise-t-il le système racinaire de la myrtille face à la salinité et aux sols du Nord ?',
        a: [
          'La myrtille possède un système racinaire dépourvu de poils absorbants classiques, ce qui la rend hyper-sensible au stress osmotique causé par la conductivité électrique (CE) élevée de l’eau. L’apport d’Orthagrow régule l’expression des transporteurs membranaires. Il bloque sélectivement l’influx des ions toxiques de Sodium (Na⁺) et de Chlorure (Cl⁻) vers le xylème, tout en maintenant un ratio K⁺/Na⁺ optimal. Parallèlement, l’OSA stimule la polymérisation des parois cellulaires des racines fines, augmentant la surface d’absorption globale pour assurer une assimilation continue du Phosphore et de l’Azote, même en conditions d’irrigation restreinte.',
        ],
      },
    ],
    seo: {
      title: 'Myrtilles du Gharb et du Loukkos : salinité et racines | Orthagrow',
      description:
        'Myrtille au Maroc : comment Orthagrow protège un système racinaire superficiel de la salinité et maintient l’absorption du phosphore et de l’azote.',
    },
    flyer: 'myrtille',
  },
  {
    slug: 'courgettes',
    name: { fr: 'Courgettes', en: 'Courgettes', es: 'Calabacines', nl: 'Courgettes' },
    group: 'vegetables',
    title: 'Protection intégrale de la courgette contre l’oïdium et le stress climatique',
    intro:
      'La courgette est une culture maraîchère à cycle court très sensible aux pathogènes foliaires et aux vagues de chaleur. La formulation de la gamme Orthagrow apporte une réponse biostimulante immédiate en renforçant la rigidité structurelle de la plante.',
    faq: [
      {
        q: 'De quelle manière la formule OSA d’Orthagrow renforce-t-elle la courgette contre l’oïdium et le flétrissement thermique en culture maraîchère ?',
        a: [
          'La courgette (Cucurbita pepo) possède de grandes feuilles qui évaporent de grands volumes d’eau sous l’effet du soleil. Grâce à l’optimisation osmotique de l’OSA, les plants limitent la perte d’eau par les stomates pendant les heures les plus chaudes de la journée, évitant le phénomène de flétrissement transitoire (feuilles pendantes).',
          'Sur le plan sanitaire, l’application foliaire d’Orthagrow crée une couche de silice hautement densifiée à la surface de l’épiderme foliaire. Cette barrière physique empêche les tubes germinatifs et les haustoria des champignons de l’oïdium (Podosphaera xanthii) de pénétrer à l’intérieur des cellules végétales. Les tiges et les pédoncules deviennent plus rigides, ce qui améliore la circulation des nutriments vers les fleurs et les fruits, augmentant la fermeté et le rendement après récolte.',
        ],
      },
    ],
    seo: {
      title: 'Courgettes : oïdium et flétrissement thermique | Orthagrow',
      description:
        'Courgette en maraîchage : comment la silice d’Orthagrow renforce l’épiderme contre l’oïdium et limite le flétrissement aux heures chaudes.',
    },
  },
  {
    slug: 'agrumes',
    name: { fr: 'Agrumes', en: 'Citrus', es: 'Cítricos', nl: 'Citrusvruchten' },
    group: 'orchards',
    regions: 'Souss-Massa, Taroudant, Berkane',
    title: 'Protection des agrumes contre le splitting et l’extrême chaleur en Souss-Massa et Taroudant',
    intro:
      'Dans les grands bassins agrumicoles de Taroudant et de la plaine du Souss-Massa, ainsi qu’à Berkane, les variations de température et les vents secs du Chergui causent de lourdes pertes économiques par éclatement des fruits (crevasse/splitting). La technologie moléculaire d’Orthagrow offre une protection physiologique essentielle en renforçant la matrice cellulaire et l’élasticité du péricarpe.',
    faq: [
      {
        q: 'Comment la technologie OSA d’Orthagrow prévient-elle l’éclatement des fruits (crevasse/splitting) et le stress hydrique dans les zones citricoles comme Taroudant et Agadir ?',
        a: [
          'Chez les agrumes (Citrus), les fluctuations d’irrigation combinées à la chaleur intense provoquent l’éclatement de l’écorce. Cela se produit lorsque la pulpe interne se développe plus rapidement que la peau externe. L’acide orthosilicique (OSA) d’Orthagrow s’intègre directement dans la matrice cellulosique de l’albédo et du flavedo. En renforçant ces liaisons cellulaires, l’écorce acquiert une élasticité mécanique supérieure, réduisant drastiquement le splitting.',
          'De plus, le dépôt de silice amorphe sous la cuticule foliaire limite la perte d’eau par évaporation lors du Chergui dans le Souss-Massa. Enfin, l’OSA stimule un flux de transpiration régulier, ce qui améliore le transport du Calcium (Ca²⁺) vers les parois des fruits, renforçant la solidité de la peau.',
        ],
      },
    ],
    seo: {
      title: 'Agrumes : éclatement (splitting) et chaleur à Taroudant | Orthagrow',
      description:
        'Orange, mandarine, citron dans le Souss-Massa, à Taroudant et Berkane : comment l’OSA d’Orthagrow rend l’écorce plus élastique contre le splitting.',
    },
    flyer: 'agrumes',
    trial: 'agrumes',
  },
  {
    slug: 'oliviers',
    name: { fr: 'Oliviers', en: 'Olive trees', es: 'Olivos', nl: 'Olijfbomen' },
    group: 'orchards',
    regions: 'Marrakech, Fès-Meknès',
    title: 'Stabilisation du rendement de l’olivier face à la sécheresse',
    intro:
      'L’oléiculture marocaine (Marrakech, Fès-Meknès) subit de plein fouet l’alternance bisannuelle, intensifiée par le stress hydrique au moment de la floraison en avril/mai et du développement de l’olive en été.',
    faq: [
      {
        q: 'Quelle est l’action d’Orthagrow pour briser le cycle de l’alternance bisannuelle et sécuriser la nouaison de l’olivier sous stress hydrique ?',
        a: [
          'L’alternance de l’olivier est accentuée par l’épuisement nutritionnel et hydrique de l’arbre lors des années de forte charge, bloquant l’initiation florale de l’année suivante. L’application pré-florale d’Orthagrow améliore la viabilité et la germination du tube pollinique sous des températures élevées, assurant un taux de nouaison optimal.',
          'Sur le plan nutritionnel, l’OSA entre en compétition avec les sites de fixation des phosphates dans le sol alcalin marocain. Il libère le Phosphore bloqué, le rendant hautement assimilable. Cette recharge énergétique (ATP) permet à l’arbre de nourrir ses fruits actifs tout en développant les bourgeons floraux pour la saison suivante, lissant ainsi le phénomène d’alternance.',
        ],
      },
    ],
    seo: {
      title: 'Olivier : alternance et sécheresse au Maroc | Orthagrow',
      description:
        'Olivier à Marrakech et Fès-Meknès : comment Orthagrow sécurise la nouaison sous stress hydrique et libère le phosphore pour lisser l’alternance.',
    },
    flyer: 'olivier',
    trial: 'olives',
  },
  {
    slug: 'palmiers-dattiers',
    name: { fr: 'Palmiers dattiers', en: 'Date palms', es: 'Palmeras datileras', nl: 'Dadelpalmen' },
    group: 'orchards',
    regions: 'Boudnib, Erfoud, Errachidia, Zagora · Arabie Saoudite',
    title:
      'Résistance climatique et tolérance saline maximale dans la phoeniciculture de l’Afrique du Nord à la Péninsule Arabique',
    intro:
      'Les oasis marocaines (Boudnib, Erfoud, Errachidia, Zagora) ainsi que les grandes zones de production du Royaume d’Arabie Saoudite (KSA : Riyadh, Al-Qassim, Médine, Al-Ahsa, Al-Jouf) font face à une salinisation critique des sols et des nappes phréatiques combinée à des climats hyper-arides. La technologie moléculaire A.O.S. de la gamme Orthagrow protège les variétés de haute valeur (Medjool, Khalas, Sukari) au niveau cellulaire contre la toxicité saline et la forte évaporation.',
    faq: [
      {
        q: 'Comment l’acide orthosilicique stabilisé renforce-t-il le palmier dattier contre le stress salin extrême et la salinité de l’eau dans des oasis comme Boudnib ou des régions de KSA comme Al-Qassim ou Al-Ahsa ?',
        a: [
          'Dans les écosystèmes oasiens arides du Maroc et les zones de culture intensive d’Arabie Saoudite, la forte concentration de sels bloque l’absorption d’eau par effet osmotique inverse. Le silicium actif apporté par Orthagrow s’accumule massivement dans l’endoderme et l’exoderme des racines du palmier. Cette silification ciblée crée une barrière physiologique ultra-filtrante (barrière exodermique).',
          'Ce mécanisme bloque efficacement le transport passif et toxique des ions Sodium (Na⁺) et des chlorures vers la sève ascendante, tout en maintenant l’assimilation du Potassium (K⁺) essentiel. Grâce à cette pression de turgescence préservée, la photosynthèse reste active même lors des pics thermiques dépassant 45°C, optimisant la croissance et la concentration en sucres des dattes haut de gamme.',
        ],
      },
    ],
    seo: {
      title: 'Palmier dattier : stress salin, oasis et KSA | Orthagrow',
      description:
        'Palmier dattier à Boudnib, Errachidia, Zagora et en Arabie Saoudite : comment l’OSA d’Orthagrow protège Medjool et Khalas de la salinité.',
    },
    flyer: 'palmier-dattier',
  },
  {
    slug: 'vignes',
    name: { fr: 'Vignes', en: 'Vines', es: 'Viñas', nl: 'Wijnstokken' },
    group: 'orchards',
    title: 'Protection de la vigne contre le coup de soleil et l’éclatement',
    intro:
      'Les vignobles au Maroc subissent un fort rayonnement UV et des amplitudes thermiques brutales, provoquant le coup de soleil (sunburn) des grappes et l’éclatement des baies (fruit cracking).',
    faq: [
      {
        q: 'Par quel processus scientifique Orthagrow protège-t-il la vigne contre le coup de soleil (sunburn) et le phénomène d’éclatement des baies ?',
        a: [
          'Les dépôts de silice générés par Orthagrow sous la cuticule des feuilles et des baies créent un film micro-prismatique. Ce film réfléchit les rayonnements ultraviolets et infrarouges excessifs, abaissant la température de surface de la baie de 2 à 4°C, ce qui élimine les nécroses dues au coup de soleil.',
          'De plus, l’OSA co-détermine le dépôt de cellulose et de lignine dans la pellicule du raisin. Cela confère une élasticité mécanique supérieure à la peau de la baie. En cas d’irrigation abondante ou de variation de pression osmotique, la pellicule s’étire sans éclater, prévenant également les infections secondaires causées par les blessures.',
        ],
      },
    ],
    seo: {
      title: 'Vigne : coup de soleil et éclatement des baies | Orthagrow',
      description:
        'Vigne au Maroc : comment la silice d’Orthagrow abaisse la température des baies de 2 à 4 °C contre le coup de soleil et limite leur éclatement.',
    },
    flyer: 'vigne',
    trial: 'raisins',
  },
];

export const getCropSolution = (slug: string) => CROP_SOLUTIONS.find((c) => c.slug === slug);

/** The "Technologie A.O.S." page. */
export const AOS_TECHNOLOGY = {
  title: 'L’innovation majeure du silicium biologiquement actif',
  intro:
    'Bien que le silicium soit l’un des éléments les plus abondants de la croûte terrestre, les plantes sont physiologiquement incapables de l’absorber sous sa forme brute, minérale ou colloïdale. La technologie brevetée de MORECO repose sur la stabilisation exclusive de l’Acide Orthosilicique (OSA) sous sa forme monomérique pure (H₄SiO₄). Cette prouesse biotechnologique garantit une biodisponibilité systémique de 100%, permettant une assimilation cellulaire immédiate par les voies foliaires et racinaires, contrairement aux silicates de potassium ou de calcium traditionnels qui polymérisent avant absorption.',
  faq: [
    {
      q: 'Quelle est la spécificité biochimique de la technologie A.O.S. de MORECO et comment assure-t-elle une meilleure absorption des nutriments, du rendement et de la conservation ?',
      a: [
        'La supériorité de la gamme Orthagrow réside dans le maintien de l’acide orthosilicique à l’état de monomère libre, agissant comme un puissant catalyseur de la nutrition végétale globale. Dans le sol et au sein des cellules, l’OSA entre en compétition avec les sites de fixation, ce qui entraîne une augmentation massive de l’absorption du phosphore (P) et d’autres nutriments essentiels habituellement bloqués dans les sols alcalins ou secs. Cela optimise drastiquement l’efficience nutritionnelle des cultures.',
        'Le monomère traverse instantanément la cuticule cireuse des feuilles et les membranes racinaires. Transporté par le flux de sève via le xylème, il se dépose de manière ciblée dans les tissus. En renforçant mécaniquement les parois cellulaires par un réseau de silicium élastique et en activant les systèmes antioxydants enzymatiques, cette technologie garantit un rendement significativement plus élevé et une qualité supérieure des produits.',
        'De plus, l’intégrité cellulaire accrue réduit la perte d’eau et la dégradation physiologique post-récolte, ce qui entraîne directement une durée de conservation (shelf-life) fortement prolongée, cruciale pour les marchés d’exportation internationaux.',
      ],
    },
  ] as FaqItem[],
  seo: {
    title: 'Technologie A.O.S. – Acide orthosilicique stabilisé | Orthagrow',
    description:
      'Acide orthosilicique stabilisé sous forme monomérique (H₄SiO₄) : comment la technologie A.O.S. de MORECO rend le silicium biologiquement actif pour la plante.',
  },
};
