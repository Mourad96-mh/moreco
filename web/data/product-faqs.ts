import type { Locale } from '@/i18n/config';
import type { FamilyFaq } from './family-faqs';
import { PRODUCTS } from './products';

/**
 * The product pages' search texts and questions — "Moreco Product Pages SEO & FAQ", sent
 * with the final briefing of 2026-10-29 for the seventeen products of the sheet list.
 *
 * `seo` is the client's meta-title and meta-description, French only: they are written
 * around Moroccan regions for the French pages; the other languages keep the product's
 * name and the site's description. The title is used as it stands, without " — Moreco".
 *
 * The questions sit at the foot of the product page only (Mourad, 2026-10-29), not under
 * Resources. The client wrote the French; EN, ES and NL are ours (TRADUCTIONS-A-VALIDER.md,
 * section 23). Words between asterisks are set in italics: the client asked for the Latin
 * and scientific terms in italics.
 */
interface ProductFaqEntry {
  seo?: { title: string; description: string };
  faqs: Record<Locale, FamilyFaq[]>;
}

const ENTRIES: Record<string, ProductFaqEntry> = {
  'orthagrow-control': {
    seo: {
      title: 'Orthagrow Control | OSA Anti-Stress Abiotique',
      description:
        'Renforcez les tomates d’Agadir et Dakhla ainsi que les myrtilles du Gharb contre le stress salin, thermique et hydrique grâce à l’OSA biodisponible.',
    },
    faqs: {
      fr: [
        {
          question: 'Pourquoi un biostimulant végétal à base d’OSA fonctionne-t-il mieux que la silice ordinaire ?',
          answer:
            'La silice ordinaire doit d’abord être transformée *in situ* dans le sol pendant plusieurs mois en affichant une faible efficacité d’assimilation. Notre formule OSA est directement et entièrement biodisponible pour la culture. Cela assure un renforcement rapide des parois cellulaires et l’établissement d’un bilan hydrique stable. La résistance naturelle de la plante augmente immédiatement face aux maladies fongiques (comme l’oïdium) et aux stress abiotiques majeurs tels que le stress hydrique (manque d’eau), le stress salin (salinité) et le stress thermique (chaleur extrême).',
        },
        {
          question: 'Comment l’OSA aide-t-il la plante à lutter contre le stress abiotique ?',
          answer:
            'L’OSA développe une couche microscopique de silicium dans les parois cellulaires qui minimise la perte d’eau par transpiration. Ce mécanisme permet de neutraliser efficacement le stress hydrique et la hausse des températures (stress thermique), tout en régulant l’absorption des nutriments en cas de forte salinité du sol (stress salin). Cette triple protection contre les stress abiotiques est essentielle pour préserver la structure délicate des myrtilles dans le Gharb et pour sécuriser les cultures intensives de tomates à Agadir et à Dakhla, où la gestion de l’eau et des chocs thermiques est cruciale pour les rendements.',
        },
      ],
      en: [
        {
          question: 'Why does an OSA-based plant biostimulant work better than ordinary silica?',
          answer:
            'Ordinary silica must first be converted *in situ* in the soil over several months, and is taken up poorly. Our OSA formula is directly and fully bioavailable to the crop. Cell walls are strengthened quickly and a stable water balance is established. The plant’s natural resistance rises at once against fungal diseases (such as powdery mildew) and the major abiotic stresses: water stress (lack of water), salt stress (salinity) and heat stress (extreme heat).',
        },
        {
          question: 'How does OSA help the plant fight abiotic stress?',
          answer:
            'OSA builds a microscopic layer of silicon in the cell walls that minimises water loss through transpiration. This effectively counters water stress and rising temperatures (heat stress), while regulating nutrient uptake when soil salinity is high (salt stress). This triple protection against abiotic stress is essential to preserve the delicate structure of blueberries in the Gharb and to secure intensive tomato crops in Agadir and Dakhla, where managing water and heat shocks is crucial to yields.',
        },
      ],
      es: [
        {
          question: '¿Por qué un bioestimulante vegetal a base de OSA funciona mejor que la sílice común?',
          answer:
            'La sílice común debe transformarse primero *in situ* en el suelo durante varios meses, con una baja eficiencia de asimilación. Nuestra fórmula OSA es directa y totalmente biodisponible para el cultivo. Esto asegura un refuerzo rápido de las paredes celulares y un balance hídrico estable. La resistencia natural de la planta aumenta de inmediato frente a las enfermedades fúngicas (como el oídio) y a los grandes estreses abióticos: el estrés hídrico (falta de agua), el estrés salino (salinidad) y el estrés térmico (calor extremo).',
        },
        {
          question: '¿Cómo ayuda el OSA a la planta a combatir el estrés abiótico?',
          answer:
            'El OSA forma una capa microscópica de silicio en las paredes celulares que minimiza la pérdida de agua por transpiración. Este mecanismo neutraliza eficazmente el estrés hídrico y el aumento de las temperaturas (estrés térmico), al tiempo que regula la absorción de nutrientes cuando la salinidad del suelo es alta (estrés salino). Esta triple protección contra el estrés abiótico es esencial para preservar la delicada estructura de los arándanos en el Gharb y para asegurar los cultivos intensivos de tomate en Agadir y Dajla, donde la gestión del agua y de los golpes de calor es decisiva para los rendimientos.',
        },
      ],
      nl: [
        {
          question: 'Waarom werkt een plantaardige biostimulator op basis van OSA beter dan gewoon silica?',
          answer:
            'Gewoon silica moet eerst maandenlang *in situ* in de bodem worden omgezet en wordt slecht opgenomen. Onze OSA-formule is direct en volledig biobeschikbaar voor het gewas. Zo worden de celwanden snel versterkt en ontstaat een stabiele waterhuishouding. De natuurlijke weerstand van de plant stijgt meteen tegen schimmelziekten (zoals echte meeldauw) en de grote abiotische stressfactoren: droogtestress (watertekort), zoutstress (verzilting) en hittestress (extreme warmte).',
        },
        {
          question: 'Hoe helpt OSA de plant abiotische stress te weerstaan?',
          answer:
            'OSA vormt een microscopisch laagje silicium in de celwanden dat het waterverlies door verdamping beperkt. Zo worden droogtestress en stijgende temperaturen (hittestress) doeltreffend opgevangen, terwijl de opname van voedingsstoffen geregeld blijft bij een hoog zoutgehalte in de bodem (zoutstress). Deze drievoudige bescherming tegen abiotische stress is essentieel om de kwetsbare structuur van blauwe bessen in de Gharb te bewaren en de intensieve tomatenteelt in Agadir en Dakhla veilig te stellen, waar water- en hittebeheer bepalend zijn voor de opbrengst.',
        },
      ],
    },
  },

  'orthagrow-myco': {
    seo: {
      title: 'MYCO4G | Mycorhizes Erfoud & Boudnib',
      description:
        'Stimulez la rhizosphère et protégez vos cultures contre la salinité à Agadir, Dakhla, Erfoud et Boudnib. Colonisation racinaire rapide à 95 %.',
    },
    faqs: {
      fr: [
        {
          question: 'Pourquoi une combinaison de 3 espèces de mycorhizes est-elle meilleure qu’une monoculture ?',
          answer:
            'Grâce à ces trois souches spécifiques, l’activité biologique dans la zone racinaire reste garantie sous des conditions climatiques variées. Si une souche devient moins active en raison d’un froid ou d’une chaleur extrême, les autres souches prennent le relais pour assurer un soutien ininterrompu à la culture. Cette synergie soutient efficacement la phoeniciculture à Erfoud, Boudnib, Errachidia, Tafilalet et en KSA. De plus, dans les cultures de tomates à Agadir et Dakhla, elle aide à protéger le système racinaire contre le stress thermique et la forte pression saline.',
        },
        {
          question: 'Qu’est-ce que la technologie ROC et pourquoi fait-elle la différence ?',
          answer:
            'La technologie ROC (Root Organ Culture) est une méthode *in vitro* avancée qui permet de cultiver des champignons mycorhiziens dans un environnement de laboratoire totalement stérile et contrôlé. Cela garantit un produit fini pur, exempt de tout agent pathogène ou contaminant. De plus, les spores issues de la méthode ROC possèdent un pouvoir germinatif et une vitalité supérieurs. Cette technologie garantit une colonisation racinaire rapide pouvant atteindre 95 % : dès que le produit entre en contact avec la rhizosphère, la symbiose démarre immédiatement et l’absorption des nutriments est activée.',
        },
      ],
      en: [
        {
          question: 'Why is a combination of 3 mycorrhizal species better than a single species?',
          answer:
            'With these three specific strains, biological activity in the root zone is assured across varied climatic conditions. If one strain slows down in extreme cold or heat, the others take over, so the crop is supported without interruption. This synergy is an effective support for date palm growing in Erfoud, Boudnib, Errachidia, Tafilalet and Saudi Arabia. In tomato crops in Agadir and Dakhla, it also helps protect the root system against heat stress and high salt pressure.',
        },
        {
          question: 'What is ROC technology and why does it make the difference?',
          answer:
            'ROC (Root Organ Culture) is an advanced *in vitro* method for growing mycorrhizal fungi in a fully sterile, controlled laboratory environment. The finished product is pure, free of any pathogen or contaminant. Spores produced by the ROC method also have higher germination capacity and vitality. The technology ensures fast root colonisation of up to 95 %: as soon as the product meets the rhizosphere, the symbiosis starts and nutrient uptake is activated.',
        },
      ],
      es: [
        {
          question: '¿Por qué una combinación de 3 especies de micorrizas es mejor que una sola especie?',
          answer:
            'Gracias a estas tres cepas específicas, la actividad biológica en la zona radicular queda garantizada en condiciones climáticas variadas. Si una cepa pierde actividad por un frío o un calor extremos, las demás toman el relevo para dar al cultivo un apoyo ininterrumpido. Esta sinergia sostiene eficazmente el cultivo de la palmera datilera en Erfoud, Boudnib, Errachidia, Tafilalet y Arabia Saudí. Además, en los cultivos de tomate de Agadir y Dajla, ayuda a proteger el sistema radicular frente al estrés térmico y a la alta presión salina.',
        },
        {
          question: '¿Qué es la tecnología ROC y por qué marca la diferencia?',
          answer:
            'La tecnología ROC (Root Organ Culture) es un método *in vitro* avanzado que permite cultivar hongos micorrícicos en un entorno de laboratorio totalmente estéril y controlado. Esto garantiza un producto final puro, libre de cualquier patógeno o contaminante. Además, las esporas obtenidas por el método ROC tienen un poder germinativo y una vitalidad superiores. Esta tecnología garantiza una colonización radicular rápida de hasta el 95 %: en cuanto el producto entra en contacto con la rizosfera, la simbiosis comienza y se activa la absorción de nutrientes.',
        },
      ],
      nl: [
        {
          question: 'Waarom is een combinatie van 3 mycorrhizasoorten beter dan één soort?',
          answer:
            'Dankzij deze drie specifieke stammen blijft de biologische activiteit in de wortelzone verzekerd onder uiteenlopende weersomstandigheden. Wordt één stam minder actief door extreme kou of hitte, dan nemen de andere het over, zodat het gewas zonder onderbreking wordt ondersteund. Deze synergie ondersteunt de dadelpalmteelt in Erfoud, Boudnib, Errachidia, Tafilalet en Saoedi-Arabië. In de tomatenteelt in Agadir en Dakhla helpt ze bovendien het wortelstelsel te beschermen tegen hittestress en hoge zoutdruk.',
        },
        {
          question: 'Wat is ROC-technologie en waarom maakt ze het verschil?',
          answer:
            'ROC (Root Organ Culture) is een geavanceerde *in vitro*-methode om mycorrhizaschimmels te kweken in een volledig steriele, gecontroleerde laboratoriumomgeving. Dat garandeert een zuiver eindproduct, vrij van ziekteverwekkers en verontreinigingen. Sporen uit de ROC-methode hebben bovendien een hogere kiemkracht en vitaliteit. De technologie zorgt voor een snelle wortelkolonisatie tot 95 %: zodra het product de rizosfeer raakt, start de symbiose en wordt de opname van voedingsstoffen geactiveerd.',
        },
      ],
    },
  },

  'orthagrow-soil-conditioner': {
    seo: {
      title: 'Orthagrow Soil Conditioner | CEC Boudnib',
      description:
        'Bloquez le lessivage des engrais dans les sols sableux de Taroudant et des oasis d’Erfoud et Boudnib en augmentant la CEC du sol.',
    },
    faqs: {
      fr: [
        {
          question: 'Pourquoi utiliser Orthagrow Soil Conditioner pour mon sol ?',
          answer:
            'Orthagrow Soil Conditioner augmente la capacité d’échange cationique (CEC) du sol. Cela optimise la structure globale du sol et accroît considérablement sa capacité à stocker et restituer efficacement les engrais apportés.',
        },
        {
          question: 'Comment ce conditionneur de sol protège-t-il mes apports en engrais ?',
          answer:
            'Le produit fixe de manière optimale les macro-éléments essentiels tels que le calcium, le magnésium et le potassium dans la zone racinaire, créant ainsi un réservoir nutritionnel stable. Sans ce conditionneur, les engrais coûteux sont rapidement lessivés ; avec cet apport, ils restent directement disponibles pour les poils absorbants. Dans les sols sableux des vergers d’agrumes autour de Taroudant et dans les plantations de dattes des oasis d’Erfoud et de Boudnib, cela aide efficacement à limiter le lessivage.',
        },
      ],
      en: [
        {
          question: 'Why use Orthagrow Soil Conditioner on my soil?',
          answer:
            'Orthagrow Soil Conditioner raises the soil’s cation exchange capacity (CEC). This improves the overall soil structure and greatly increases its ability to store the fertilisers applied and release them efficiently.',
        },
        {
          question: 'How does this soil conditioner protect my fertiliser inputs?',
          answer:
            'The product holds essential macronutrients such as calcium, magnesium and potassium in the root zone, building a stable nutrient reserve. Without the conditioner, costly fertilisers are quickly leached; with it, they stay directly available to the root hairs. In the sandy soils of the citrus orchards around Taroudant and in the date plantations of the Erfoud and Boudnib oases, it is an effective way to limit leaching.',
        },
      ],
      es: [
        {
          question: '¿Por qué usar Orthagrow Soil Conditioner en mi suelo?',
          answer:
            'Orthagrow Soil Conditioner aumenta la capacidad de intercambio catiónico (CIC) del suelo. Esto mejora la estructura general del suelo y aumenta considerablemente su capacidad para almacenar los fertilizantes aportados y liberarlos de forma eficaz.',
        },
        {
          question: '¿Cómo protege este acondicionador de suelo mis aportes de fertilizantes?',
          answer:
            'El producto fija de forma óptima los macroelementos esenciales, como el calcio, el magnesio y el potasio, en la zona radicular, creando una reserva nutritiva estable. Sin este acondicionador, los fertilizantes, que son caros, se lixivian rápidamente; con él, siguen directamente disponibles para los pelos absorbentes. En los suelos arenosos de los huertos de cítricos de Taroudant y en las plantaciones de dátiles de los oasis de Erfoud y Boudnib, ayuda eficazmente a limitar la lixiviación.',
        },
      ],
      nl: [
        {
          question: 'Waarom Orthagrow Soil Conditioner gebruiken voor mijn bodem?',
          answer:
            'Orthagrow Soil Conditioner verhoogt de kationenuitwisselingscapaciteit (CEC) van de bodem. Dat verbetert de algemene bodemstructuur en vergroot sterk het vermogen van de bodem om toegediende meststoffen vast te houden en efficiënt weer af te geven.',
        },
        {
          question: 'Hoe beschermt deze bodemverbeteraar mijn bemesting?',
          answer:
            'Het product houdt essentiële macro-elementen zoals calcium, magnesium en kalium vast in de wortelzone en vormt zo een stabiele voedingsreserve. Zonder deze bodemverbeteraar spoelen dure meststoffen snel uit; met de toepassing blijven ze direct beschikbaar voor de wortelharen. In de zandgronden van de citrusboomgaarden rond Taroudant en in de dadelplantages van de oases van Erfoud en Boudnib helpt dit uitspoeling doeltreffend te beperken.',
        },
      ],
    },
  },

  'orthagrow-granule': {
    seo: {
      title: 'Orthagrow Granule | Biostimulant Boudnib',
      description:
        'Réduisez la consommation d’eau de 40 %. Protection thermique idéale pour Erfoud, Boudnib, le Tafilalet et la KSA.',
    },
    faqs: {
      fr: [
        {
          question: 'Qu’est-ce qui rend la formulation scientifique d’Orthagrow Granule si unique ?',
          answer:
            'Il s’agit d’un biostimulant breveté de quatrième génération, développé par l’inventeur de l’acide orthosilicique stabilisé (OSA) en collaboration avec l’Université d’Anvers. Ses molécules bioactives activent directement la biosynthèse et stimulent intensément la production de chlorophylle fonctionnelle au cœur de la culture.',
        },
        {
          question: 'Comment Orthagrow Granule influence-t-il la gestion de l’eau et la tolérance au stress ?',
          answer:
            'Cette formule exclusive favorise une germination précoce dans les sols secs ou salins, stimule un enracinement profond et permet de réduire la consommation d’eau jusqu’à 40 %. De plus, elle limite la perte d’eau après récolte, immobilise de manière optimale les métaux lourds et prolonge la durée de conservation des produits. En phoeniciculture dans les régions d’Erfoud, Boudnib, du Tafilalet et en KSA, cela offre une protection hautement efficace contre les effets physiologiques des vagues de chaleur extrêmes et la hausse de la conductivité électrique (CE) de l’eau d’irrigation.',
        },
      ],
      en: [
        {
          question: 'What makes the scientific formulation of Orthagrow Granule so unique?',
          answer:
            'It is a patented fourth-generation biostimulant, developed by the inventor of stabilised orthosilicic acid (OSA) in collaboration with the University of Antwerp. Its bioactive molecules directly activate biosynthesis and strongly stimulate the production of functional chlorophyll at the heart of the crop.',
        },
        {
          question: 'How does Orthagrow Granule affect water management and stress tolerance?',
          answer:
            'This exclusive formula promotes early germination in dry or saline soils, encourages deep rooting and cuts water use by up to 40 %. It also limits water loss after harvest, binds heavy metals and extends the shelf life of the produce. In date palm growing in Erfoud, Boudnib, Tafilalet and Saudi Arabia, it gives highly effective protection against the physiological effects of extreme heatwaves and the rising electrical conductivity (EC) of irrigation water.',
        },
      ],
      es: [
        {
          question: '¿Qué hace tan única la formulación científica de Orthagrow Granulé?',
          answer:
            'Es un bioestimulante patentado de cuarta generación, desarrollado por el inventor del ácido ortosilícico estabilizado (OSA) en colaboración con la Universidad de Amberes. Sus moléculas bioactivas activan directamente la biosíntesis y estimulan intensamente la producción de clorofila funcional en el corazón del cultivo.',
        },
        {
          question: '¿Cómo influye Orthagrow Granulé en la gestión del agua y la tolerancia al estrés?',
          answer:
            'Esta fórmula exclusiva favorece una germinación temprana en suelos secos o salinos, estimula un enraizamiento profundo y reduce el consumo de agua hasta en un 40 %. Además, limita la pérdida de agua tras la cosecha, inmoviliza los metales pesados y prolonga la conservación de los productos. En el cultivo de la palmera datilera en Erfoud, Boudnib, Tafilalet y Arabia Saudí, ofrece una protección muy eficaz frente a los efectos fisiológicos de las olas de calor extremo y al aumento de la conductividad eléctrica (CE) del agua de riego.',
        },
      ],
      nl: [
        {
          question: 'Wat maakt de wetenschappelijke formulering van Orthagrow Granule zo uniek?',
          answer:
            'Het is een gepatenteerde biostimulator van de vierde generatie, ontwikkeld door de uitvinder van gestabiliseerd orthokiezelzuur (OSA) in samenwerking met de Universiteit Antwerpen. De bioactieve moleculen activeren rechtstreeks de biosynthese en stimuleren sterk de aanmaak van functioneel bladgroen in het hart van het gewas.',
        },
        {
          question: 'Hoe beïnvloedt Orthagrow Granule het waterbeheer en de stresstolerantie?',
          answer:
            'Deze exclusieve formule bevordert een vroege kieming in droge of zoute bodems, stimuleert een diepe beworteling en verlaagt het waterverbruik tot 40 %. Ze beperkt bovendien het waterverlies na de oogst, legt zware metalen vast en verlengt de houdbaarheid van de oogst. In de dadelpalmteelt in Erfoud, Boudnib, Tafilalet en Saoedi-Arabië biedt dit een zeer doeltreffende bescherming tegen de fysiologische gevolgen van extreme hittegolven en de stijgende elektrische geleidbaarheid (EC) van het irrigatiewater.',
        },
      ],
    },
  },

  'orthagrow-bloom-booster': {
    seo: {
      title: 'Orthagrow Bloom Booster | Floraison & Nouaison',
      description:
        'Stimulez la synthèse des protéines et sécurisez la nouaison des agrumes face aux hausses soudaines de température printanières.',
    },
    faqs: {
      fr: [
        {
          question: 'Comment Orthagrow Bloom Booster stimule-t-il la floraison et la nouaison des cultures ?',
          answer:
            'La formule intègre une sélection rigoureuse d’acides aminés libres, d’antioxydants naturels et d’acides organiques à faible poids moléculaire. Ce complexe unique accélère la synthèse des protéines et fournit l’énergie métabolique indispensable à un développement floral homogène, vigoureux et parfaitement équilibré.',
        },
        {
          question: 'Orthagrow Bloom Booster peut-il prévenir la chute prématurée des fleurs et la perte de fruits ?',
          answer:
            'Oui. Grâce à l’activation ciblée des enzymes végétales, la rétention des fruits est renforcée mécaniquement. Cela réduit la coulure au strict minimum et augmente significativement le nombre de fruits récoltés par plante. Il s’agit d’une stratégie éprouvée pour sécuriser la nouaison des agrumes face aux hausses soudaines de température printanières.',
        },
      ],
      en: [
        {
          question: 'How does Orthagrow Bloom Booster stimulate flowering and fruit set?',
          answer:
            'The formula combines a carefully selected blend of free amino acids, natural antioxidants and low-molecular-weight organic acids. This unique complex speeds up protein synthesis and supplies the metabolic energy needed for even, vigorous and well-balanced flower development.',
        },
        {
          question: 'Can Orthagrow Bloom Booster prevent early flower drop and fruit loss?',
          answer:
            'Yes. Through the targeted activation of plant enzymes, fruit retention is mechanically reinforced. Flower and fruitlet drop is kept to a strict minimum and the number of fruits harvested per plant rises significantly. It is a proven way to secure citrus fruit set against sudden spring temperature rises.',
        },
      ],
      es: [
        {
          question: '¿Cómo estimula Orthagrow Bloom Booster la floración y el cuajado de los cultivos?',
          answer:
            'La fórmula integra una selección rigurosa de aminoácidos libres, antioxidantes naturales y ácidos orgánicos de bajo peso molecular. Este complejo único acelera la síntesis de proteínas y aporta la energía metabólica indispensable para un desarrollo floral homogéneo, vigoroso y perfectamente equilibrado.',
        },
        {
          question: '¿Puede Orthagrow Bloom Booster prevenir la caída prematura de flores y la pérdida de frutos?',
          answer:
            'Sí. Gracias a la activación selectiva de las enzimas vegetales, la retención de los frutos se refuerza mecánicamente. Esto reduce la caída de flores y frutitos al mínimo y aumenta significativamente el número de frutos cosechados por planta. Es una estrategia probada para asegurar el cuajado de los cítricos frente a las subidas bruscas de temperatura en primavera.',
        },
      ],
      nl: [
        {
          question: 'Hoe stimuleert Orthagrow Bloom Booster de bloei en vruchtzetting?',
          answer:
            'De formule bevat een zorgvuldige selectie van vrije aminozuren, natuurlijke antioxidanten en organische zuren met een laag moleculegewicht. Dit unieke complex versnelt de eiwitsynthese en levert de stofwisselingsenergie die nodig is voor een gelijkmatige, krachtige en evenwichtige bloemontwikkeling.',
        },
        {
          question: 'Kan Orthagrow Bloom Booster vroegtijdige bloem- en vruchtval voorkomen?',
          answer:
            'Ja. Door de gerichte activering van plantenenzymen wordt het vasthouden van de vruchten mechanisch versterkt. Bloem- en vruchtval blijft zo tot het strikte minimum beperkt en het aantal geoogste vruchten per plant stijgt aanzienlijk. Het is een beproefde manier om de vruchtzetting van citrus veilig te stellen bij plotse temperatuurstijgingen in de lente.',
        },
      ],
    },
  },

  'orthagrow-micro-manager': {
    seo: {
      title: 'Orthagrow Micro Manager | Oligo-éléments',
      description:
        'Corrigez les carences en calcium, bore et zinc. Prévient l’éclatement des fruits et les microfissures des tomates et petits fruits.',
    },
    faqs: {
      fr: [
        {
          question: 'Qu’est-ce qui rend l’absorption des micronutriments dans Orthagrow Micro Manager si efficace ?',
          answer:
            'Le produit associe une technologie d’encapsulation brevetée à des chélates organiques hautement hydrosolubles. Cette configuration spécifique augmente considérablement la biodisponibilité, permettant aux oligo-éléments de traverser le tissu foliaire sans aucune barrière physiologique.',
        },
        {
          question: 'Comment Orthagrow Micro Manager prévient-il l’éclatement des fruits et les pertes après récolte ?',
          answer:
            'La formule corrige instantanément les carences aiguës en calcium, bore et zinc. Cela renforce l’élasticité structurelle des parois cellulaires de l’épiderme, réduisant ainsi drastiquement le risque de microfissures. Cela minimise les pertes pendant le transport et le stockage, ce qui est crucial pour les cultures hautement sensibles comme les tomates et les petits fruits.',
        },
      ],
      en: [
        {
          question: 'What makes micronutrient uptake from Orthagrow Micro Manager so efficient?',
          answer:
            'The product pairs a patented encapsulation technology with highly water-soluble organic chelates. This combination greatly increases bioavailability, so the trace elements pass through the leaf tissue without any physiological barrier.',
        },
        {
          question: 'How does Orthagrow Micro Manager prevent fruit cracking and post-harvest losses?',
          answer:
            'The formula quickly corrects acute calcium, boron and zinc deficiencies. This strengthens the structural elasticity of the epidermal cell walls and sharply reduces the risk of micro-cracks. Losses during transport and storage are minimised, which is crucial for highly sensitive crops such as tomatoes and berries.',
        },
      ],
      es: [
        {
          question: '¿Qué hace tan eficaz la absorción de micronutrientes de Orthagrow Micro Manager?',
          answer:
            'El producto combina una tecnología de encapsulación patentada con quelatos orgánicos altamente hidrosolubles. Esta configuración aumenta considerablemente la biodisponibilidad y permite que los oligoelementos atraviesen el tejido foliar sin ninguna barrera fisiológica.',
        },
        {
          question: '¿Cómo previene Orthagrow Micro Manager el agrietado de los frutos y las pérdidas poscosecha?',
          answer:
            'La fórmula corrige rápidamente las carencias agudas de calcio, boro y zinc. Esto refuerza la elasticidad estructural de las paredes celulares de la epidermis y reduce drásticamente el riesgo de microfisuras. Así se minimizan las pérdidas durante el transporte y el almacenamiento, algo crucial para cultivos muy sensibles como el tomate y los frutos rojos.',
        },
      ],
      nl: [
        {
          question: 'Waarom is de opname van micronutriënten uit Orthagrow Micro Manager zo efficiënt?',
          answer:
            'Het product combineert een gepatenteerde inkapselingstechnologie met sterk wateroplosbare organische chelaten. Die combinatie verhoogt de biobeschikbaarheid sterk, zodat de sporenelementen zonder fysiologische barrière door het bladweefsel gaan.',
        },
        {
          question: 'Hoe voorkomt Orthagrow Micro Manager het barsten van vruchten en verliezen na de oogst?',
          answer:
            'De formule verhelpt acute tekorten aan calcium, boor en zink snel. Dat versterkt de structurele elasticiteit van de celwanden van de opperhuid en verkleint het risico op microscheurtjes drastisch. Zo blijven de verliezen tijdens transport en opslag minimaal, wat cruciaal is voor zeer gevoelige gewassen zoals tomaten en zachtfruit.',
        },
      ],
    },
  },

  'orthagrow-alga-si': {
    seo: {
      title: 'Orthagrow Alga-Si 4G | Algues & Silicium',
      description:
        'Neutralisez les chocs salins et thermiques dans le Souss-Massa et le Gharb. Maintient le flux de sève continu des avocats et tomates.',
    },
    faqs: {
      fr: [
        {
          question: 'Pourquoi la combinaison d’algues marines et de silicium dans Orthagrow Alga-Si 4G est-elle si puissante ?',
          answer:
            'Ce mélange exclusif intègre de l’*Ascophyllum nodosum* à du silicium bioactif de pointe. Cette synergie puissante soutient activement l’équilibre hormonal endogène et stimule la division cellulaire, ce qui se traduit par une croissance végétative régulière et un développement supérieur des fruits.',
        },
        {
          question: 'Comment Orthagrow Alga-Si 4G neutralise-t-il le stress abiotique de manière si rapide et efficace ?',
          answer:
            'L’extrait d’algues hautement concentré rétablit l’équilibre hormonal après une période de stress, tandis que le silicium actif consolide simultanément la structure de la paroi cellulaire. Cela empêche le blocage de la sève en cas de forte chaleur, de sécheresse ou de choc salin abiotique. Les producteurs de tomates, d’avocats et de myrtilles dans le Souss-Massa et le Gharb exploitent cette technologie pour maintenir une croissance continue lors des fluctuations climatiques critiques.',
        },
      ],
      en: [
        {
          question: 'Why is the combination of seaweed and silicon in Orthagrow Alga-Si 4G so powerful?',
          answer:
            'This exclusive blend pairs *Ascophyllum nodosum* with advanced bioactive silicon. The synergy actively supports the plant’s own hormonal balance and stimulates cell division, which shows as steady vegetative growth and better fruit development.',
        },
        {
          question: 'How does Orthagrow Alga-Si 4G counter abiotic stress so quickly and effectively?',
          answer:
            'The highly concentrated seaweed extract restores hormonal balance after a period of stress, while the active silicon reinforces the cell wall structure at the same time. This keeps the sap flowing in high heat, drought or salt shock. Tomato, avocado and blueberry growers in Souss-Massa and the Gharb use this technology to keep growth going through critical swings in the weather.',
        },
      ],
      es: [
        {
          question: '¿Por qué es tan potente la combinación de algas marinas y silicio de Orthagrow Alga-Si 4G?',
          answer:
            'Esta mezcla exclusiva combina *Ascophyllum nodosum* con silicio bioactivo de última generación. Esta potente sinergia sostiene activamente el equilibrio hormonal endógeno y estimula la división celular, lo que se traduce en un crecimiento vegetativo regular y un mejor desarrollo de los frutos.',
        },
        {
          question: '¿Cómo neutraliza Orthagrow Alga-Si 4G el estrés abiótico de forma tan rápida y eficaz?',
          answer:
            'El extracto de algas altamente concentrado restablece el equilibrio hormonal tras un periodo de estrés, mientras que el silicio activo consolida al mismo tiempo la estructura de la pared celular. Esto evita el bloqueo de la savia con calor intenso, sequía o choque salino. Los productores de tomate, aguacate y arándano del Souss-Massa y del Gharb aprovechan esta tecnología para mantener un crecimiento continuo durante las fluctuaciones climáticas críticas.',
        },
      ],
      nl: [
        {
          question: 'Waarom is de combinatie van zeewier en silicium in Orthagrow Alga-Si 4G zo krachtig?',
          answer:
            'Deze exclusieve mengeling combineert *Ascophyllum nodosum* met geavanceerd bioactief silicium. Die synergie ondersteunt actief het eigen hormonale evenwicht van de plant en stimuleert de celdeling, wat zich vertaalt in een regelmatige vegetatieve groei en een betere vruchtontwikkeling.',
        },
        {
          question: 'Hoe vangt Orthagrow Alga-Si 4G abiotische stress zo snel en doeltreffend op?',
          answer:
            'Het sterk geconcentreerde zeewierextract herstelt het hormonale evenwicht na een stressperiode, terwijl het actieve silicium tegelijk de celwandstructuur verstevigt. Zo blijft de sapstroom op gang bij grote hitte, droogte of zoutschok. Telers van tomaten, avocado’s en blauwe bessen in Souss-Massa en de Gharb gebruiken deze technologie om de groei aan te houden bij kritieke weersschommelingen.',
        },
      ],
    },
  },

  'orthagrow-aminactif': {
    seo: {
      title: 'Orthagrow Aminactif-4G | Acides Aminés L & Si',
      description:
        'Relancez instantanément l’activité métabolique ralentie par le stress thermique ou salin des avocats et myrtilles à Agadir.',
    },
    faqs: {
      fr: [
        {
          question:
            'Pourquoi les acides aminés libres contenus dans Orthagrow Aminactif-4G agissent-ils si rapidement comme déclencheur physiologique ?',
          answer:
            'La formule apporte des acides aminés L directement assimilables, issus d’un hydrolysat végétal de soja de qualité supérieure. Comme ces molécules évitent la phase de synthèse longue et coûteuse, la plante économise une précieuse énergie. Ils agissent ainsi comme un activateur physiologique direct qui booste instantanément le métabolisme primaire.',
        },
        {
          question: 'Quel est l’avantage de la synergie entre les acides aminés et le silicium (Si) dans cette formule ?',
          answer:
            'En application foliaire, les acides aminés augmentent la perméabilité cuticulaire et l’absorption des nutriments, tandis que le silicium renforce durablement la barrière mécanique de l’épiderme. Dans les cultures intensives d’avocats et de myrtilles à Agadir et dans le Gharb, cela aide à débloquer immédiatement l’activité métabolique ralentie par le stress salin ou thermique.',
        },
      ],
      en: [
        {
          question: 'Why do the free amino acids in Orthagrow Aminactif-4G act so quickly as a physiological trigger?',
          answer:
            'The formula supplies directly assimilable L-amino acids from a high-grade plant (soy) hydrolysate. Because these molecules skip the long and costly synthesis stage, the plant saves valuable energy. They act as a direct physiological activator that immediately boosts primary metabolism.',
        },
        {
          question: 'What is the benefit of combining amino acids and silicon (Si) in this formula?',
          answer:
            'Applied to the leaf, amino acids increase cuticle permeability and nutrient uptake, while silicon durably strengthens the mechanical barrier of the epidermis. In intensive avocado and blueberry crops in Agadir and the Gharb, this helps restart metabolic activity slowed by salt or heat stress straight away.',
        },
      ],
      es: [
        {
          question: '¿Por qué los aminoácidos libres de Orthagrow Aminactif-4G actúan tan rápido como desencadenante fisiológico?',
          answer:
            'La fórmula aporta L-aminoácidos directamente asimilables, procedentes de un hidrolizado vegetal de soja de calidad superior. Como estas moléculas se saltan la fase de síntesis, larga y costosa, la planta ahorra una energía valiosa. Actúan así como un activador fisiológico directo que impulsa de inmediato el metabolismo primario.',
        },
        {
          question: '¿Qué ventaja aporta la sinergia entre los aminoácidos y el silicio (Si) en esta fórmula?',
          answer:
            'En aplicación foliar, los aminoácidos aumentan la permeabilidad de la cutícula y la absorción de nutrientes, mientras que el silicio refuerza de forma duradera la barrera mecánica de la epidermis. En los cultivos intensivos de aguacate y arándano de Agadir y del Gharb, esto ayuda a reactivar de inmediato la actividad metabólica frenada por el estrés salino o térmico.',
        },
      ],
      nl: [
        {
          question: 'Waarom werken de vrije aminozuren in Orthagrow Aminactif-4G zo snel als fysiologische trigger?',
          answer:
            'De formule levert direct opneembare L-aminozuren uit een hoogwaardig plantaardig sojahydrolysaat. Omdat deze moleculen de lange en kostbare synthesefase overslaan, bespaart de plant waardevolle energie. Ze werken zo als een directe fysiologische activator die het primaire metabolisme meteen een boost geeft.',
        },
        {
          question: 'Wat is het voordeel van de synergie tussen aminozuren en silicium (Si) in deze formule?',
          answer:
            'Bij bladtoepassing verhogen de aminozuren de doorlaatbaarheid van de cuticula en de opname van voedingsstoffen, terwijl silicium de mechanische barrière van de opperhuid duurzaam versterkt. In de intensieve teelt van avocado’s en blauwe bessen in Agadir en de Gharb helpt dit de door zout- of hittestress vertraagde stofwisseling meteen weer op gang te brengen.',
        },
      ],
    },
  },

  'orthagrow-cal': {
    seo: {
      title: 'Orthagrow Cal 21% SC 4G | Anti-Nécrose Apicale',
      description:
        'Évitez le cul noir des tomates et poivrons à Agadir et Dakhla grâce à une suspension stable 4G à haute translocation.',
    },
    faqs: {
      fr: [
        {
          question:
            'Qu’est-ce qui rend le calcium actif d’Orthagrow Cal 21% SC 4G supérieur aux suspensions de calcium traditionnelles ?',
          answer:
            'Grâce à sa formulation de suspension stable 4G, ce produit contient une concentration exceptionnellement élevée de microparticules qui ne sédimentent pas. Cela garantit une absorption foliaire fluide, sans boucher les buses, et une translocation hautement efficace vers les organes en croissance rapide.',
        },
        {
          question: 'Comment Orthagrow Cal 21% SC 4G prévient-il la nécrose apicale ?',
          answer:
            'Le produit stimule un déplacement actif du calcium vers le fruit via des voies de transport alternatives dans le phloème. Cela prévient directement les carences physiologiques graves telles que le cul noir (nécrose apicale) chez les tomates et les poivrons. Cette application s’avère indispensable dans les grandes régions de production de tomates comme Agadir et Dakhla, où les fortes chaleurs et les chocs environnementaux bloquent l’assimilation naturelle du calcium par les fruits.',
        },
      ],
      en: [
        {
          question: 'What makes the active calcium in Orthagrow Cal 21% SC 4G better than traditional calcium suspensions?',
          answer:
            'Thanks to its stable 4G suspension formulation, the product holds an exceptionally high concentration of microparticles that do not settle. Leaf uptake is smooth, nozzles do not clog, and the calcium is moved efficiently to the fast-growing organs.',
        },
        {
          question: 'How does Orthagrow Cal 21% SC 4G prevent blossom-end rot?',
          answer:
            'The product drives active movement of calcium into the fruit through alternative transport routes in the phloem. This directly prevents serious physiological disorders such as blossom-end rot in tomatoes and peppers. It is indispensable in the major tomato-growing regions such as Agadir and Dakhla, where high heat and environmental shocks block the fruit’s natural calcium uptake.',
        },
      ],
      es: [
        {
          question: '¿Qué hace que el calcio activo de Orthagrow Cal 21% SC 4G sea superior a las suspensiones de calcio tradicionales?',
          answer:
            'Gracias a su formulación en suspensión estable 4G, este producto contiene una concentración excepcionalmente alta de micropartículas que no sedimentan. Esto garantiza una absorción foliar fluida, sin obstruir las boquillas, y una translocación muy eficaz hacia los órganos en crecimiento rápido.',
        },
        {
          question: '¿Cómo previene Orthagrow Cal 21% SC 4G la necrosis apical?',
          answer:
            'El producto estimula un desplazamiento activo del calcio hacia el fruto por vías de transporte alternativas en el floema. Esto previene directamente fisiopatías graves como la podredumbre apical (necrosis apical) en el tomate y el pimiento. Su aplicación resulta indispensable en las grandes regiones productoras de tomate como Agadir y Dajla, donde el calor intenso y los choques ambientales bloquean la asimilación natural del calcio por los frutos.',
        },
      ],
      nl: [
        {
          question: 'Waarom is het actieve calcium in Orthagrow Cal 21% SC 4G beter dan traditionele calciumsuspensies?',
          answer:
            'Dankzij de stabiele 4G-suspensie bevat dit product een uitzonderlijk hoge concentratie microdeeltjes die niet bezinken. Dat zorgt voor een vlotte opname via het blad, zonder verstopte spuitdoppen, en een zeer efficiënt transport naar de snelgroeiende organen.',
        },
        {
          question: 'Hoe voorkomt Orthagrow Cal 21% SC 4G neusrot?',
          answer:
            'Het product stimuleert een actieve verplaatsing van calcium naar de vrucht via alternatieve transportroutes in het floëem. Zo worden ernstige fysiologische gebreken zoals neusrot bij tomaat en paprika rechtstreeks voorkomen. In grote tomatenregio’s als Agadir en Dakhla, waar hitte en klimaatschokken de natuurlijke calciumopname van de vruchten blokkeren, is deze toepassing onmisbaar.',
        },
      ],
    },
  },

  'orthagrow-zno': {
    seo: {
      title: 'Orthagrow ZnO 39,5% 4G | Zinc Micronisé',
      description:
        'Protégez vos raisins, avocats et tomates du stress oxydatif causé par le fort rayonnement sans aucun risque de phytotoxicité.',
    },
    faqs: {
      fr: [
        {
          question:
            'Pourquoi l’oxyde de zinc micronisé d’Orthagrow ZnO 39,5% 4G offre-t-il une biodisponibilité supérieure ?',
          answer:
            'Cette formulation liquide unique présente une densité de zinc exceptionnelle de 1,71 – 1,75 g/ml, basée sur des microparticules hautement micronisées. Cette structure augmente considérablement la surface de contact fonctionnelle sur la cuticule cireuse de la feuille, permettant au zinc d’être absorbé de manière parfaitement uniforme et sans aucune résistance moléculaire.',
        },
        {
          question:
            'Comment la pureté chimique d’Orthagrow ZnO 39,5% 4G protège-t-elle la culture contre la phytotoxicité et le stress abiotique ?',
          answer:
            'La formulation est totalement exempte de chlorures, de nitrates et de sulfates, éliminant ainsi tout risque de brûlure foliaire ou d’accumulation saline résiduelle. Le zinc agit également comme un puissant cofacteur enzymatique pour neutraliser le stress oxydatif. Cela offre un soutien physiologique hautement sécurisé pour les cultures à feuillage persistant ou délicat, comme les raisins, les avocats et les tomates soumis à de fortes pressions de rayonnement et de chaleur.',
        },
      ],
      en: [
        {
          question: 'Why does the micronised zinc oxide in Orthagrow ZnO 39.5% 4G offer better bioavailability?',
          answer:
            'This unique liquid formulation has an exceptional zinc density of 1.71–1.75 g/ml, built on highly micronised microparticles. This structure greatly increases the effective contact surface on the waxy leaf cuticle, so the zinc is absorbed evenly and without molecular resistance.',
        },
        {
          question: 'How does the chemical purity of Orthagrow ZnO 39.5% 4G protect the crop against phytotoxicity and abiotic stress?',
          answer:
            'The formulation is completely free of chlorides, nitrates and sulphates, removing any risk of leaf scorch or residual salt build-up. Zinc also acts as a powerful enzyme cofactor that neutralises oxidative stress. This gives safe physiological support to evergreen or delicate crops such as grapes, avocados and tomatoes under strong radiation and heat.',
        },
      ],
      es: [
        {
          question: '¿Por qué el óxido de zinc micronizado de Orthagrow ZnO 39,5% 4G ofrece una biodisponibilidad superior?',
          answer:
            'Esta formulación líquida única presenta una densidad de zinc excepcional de 1,71–1,75 g/ml, basada en micropartículas altamente micronizadas. Esta estructura aumenta considerablemente la superficie de contacto efectiva sobre la cutícula cerosa de la hoja, lo que permite que el zinc se absorba de forma perfectamente uniforme y sin resistencia molecular.',
        },
        {
          question: '¿Cómo protege la pureza química de Orthagrow ZnO 39,5% 4G al cultivo contra la fitotoxicidad y el estrés abiótico?',
          answer:
            'La formulación está totalmente libre de cloruros, nitratos y sulfatos, lo que elimina cualquier riesgo de quemadura foliar o de acumulación salina residual. El zinc actúa además como un potente cofactor enzimático que neutraliza el estrés oxidativo. Esto ofrece un apoyo fisiológico muy seguro a los cultivos de follaje perenne o delicado, como la uva, el aguacate y el tomate, sometidos a fuertes presiones de radiación y calor.',
        },
      ],
      nl: [
        {
          question: 'Waarom biedt het gemicroniseerde zinkoxide in Orthagrow ZnO 39,5% 4G een betere biobeschikbaarheid?',
          answer:
            'Deze unieke vloeibare formulering heeft een uitzonderlijke zinkdichtheid van 1,71–1,75 g/ml, op basis van sterk gemicroniseerde microdeeltjes. Die structuur vergroot het werkzame contactoppervlak op de wasachtige bladcuticula aanzienlijk, zodat het zink gelijkmatig en zonder moleculaire weerstand wordt opgenomen.',
        },
        {
          question: 'Hoe beschermt de chemische zuiverheid van Orthagrow ZnO 39,5% 4G het gewas tegen fytotoxiciteit en abiotische stress?',
          answer:
            'De formulering is volledig vrij van chloriden, nitraten en sulfaten, waardoor elk risico op bladverbranding of zoutophoping wegvalt. Zink werkt bovendien als krachtige enzymcofactor die oxidatieve stress neutraliseert. Dat geeft een veilige fysiologische ondersteuning aan wintergroene of gevoelige gewassen zoals druiven, avocado’s en tomaten onder sterke instraling en hitte.',
        },
      ],
    },
  },

  'orthagrow-fertifight': {
    seo: {
      title: 'Fertifight | Double Action Nutrition & SAR',
      description:
        'Activez les défenses systémiques des plantes contre Phytophthora et Xanthomonas avec une mobilité systémique complète (2 voies).',
    },
    faqs: {
      fr: [
        {
          question: 'Qu’est-ce qui rend Fertifight si unique sur le marché agricole ?',
          answer:
            'Il s’agit d’une formulation brevetée dotée d’un double mécanisme d’action innovant. Le produit optimise le statut nutritionnel global de la culture tout en stimulant puissamment la résistance systémique acquise (SAR) de la plante contre des agents pathogènes redoutables tels que *Phytophthora* et *Xanthomonas*.',
        },
        {
          question: 'Comment Fertifight performe-t-il dans la lutte contre de potentielles infections fongiques ?',
          answer:
            'Les molécules de Fertifight possèdent une mobilité systémique complète, tant ascendante que descendante. Le produit stoppe net la germination des spores à la surface des feuilles et inhibe la pénétration enzymatique dans les tissus végétaux, offrant une protection hautement efficace en cas de forte humidité ou de fluctuations thermiques irrégulières.',
        },
      ],
      en: [
        {
          question: 'What makes Fertifight so unique on the agricultural market?',
          answer:
            'It is a patented formulation with an innovative dual mode of action. The product optimises the crop’s overall nutritional status while strongly stimulating the plant’s systemic acquired resistance (SAR) against formidable pathogens such as *Phytophthora* and *Xanthomonas*.',
        },
        {
          question: 'How does Fertifight perform against potential fungal infections?',
          answer:
            'Fertifight’s molecules are fully systemic, moving both upwards and downwards in the plant. The product stops spore germination on the leaf surface and inhibits enzymatic penetration into plant tissue, giving highly effective protection in high humidity or irregular temperature swings.',
        },
      ],
      es: [
        {
          question: '¿Qué hace que Fertifight sea tan único en el mercado agrícola?',
          answer:
            'Es una formulación patentada con un innovador doble mecanismo de acción. El producto optimiza el estado nutricional global del cultivo y estimula con fuerza la resistencia sistémica adquirida (SAR) de la planta frente a patógenos temibles como *Phytophthora* y *Xanthomonas*.',
        },
        {
          question: '¿Cómo actúa Fertifight frente a posibles infecciones fúngicas?',
          answer:
            'Las moléculas de Fertifight tienen una movilidad sistémica completa, tanto ascendente como descendente. El producto detiene en seco la germinación de las esporas en la superficie de las hojas e inhibe la penetración enzimática en los tejidos vegetales, lo que ofrece una protección muy eficaz con humedad elevada o fluctuaciones térmicas irregulares.',
        },
      ],
      nl: [
        {
          question: 'Wat maakt Fertifight zo uniek op de landbouwmarkt?',
          answer:
            'Het is een gepatenteerde formulering met een innovatief dubbel werkingsmechanisme. Het product optimaliseert de algemene voedingstoestand van het gewas en stimuleert tegelijk krachtig de systemisch verworven resistentie (SAR) van de plant tegen geduchte ziekteverwekkers zoals *Phytophthora* en *Xanthomonas*.',
        },
        {
          question: 'Hoe presteert Fertifight tegen mogelijke schimmelinfecties?',
          answer:
            'De moleculen van Fertifight zijn volledig systemisch en bewegen zowel opwaarts als neerwaarts in de plant. Het product stopt de kieming van sporen op het bladoppervlak en remt de enzymatische indringing in het plantenweefsel, wat een zeer doeltreffende bescherming biedt bij hoge luchtvochtigheid of grillige temperatuurschommelingen.',
        },
      ],
    },
  },

  'orthagrow-initio': {
    seo: {
      title: 'Orthagrow Initio-4G NPK 14-48-0 | Engrais OSA',
      description:
        'Boostez la division cellulaire et la formation des poils absorbants dès le départ. Absorption maximale des nutriments (NPK 14-48-0).',
    },
    faqs: {
      fr: [
        {
          question: 'Quel avantage scientifique la technologie « Powered by OSA » offre-t-elle au démarrage de la culture ?',
          answer:
            'Le silicium soluble [Si(OH)₄] abaisse considérablement la barrière énergétique requise pour l’absorption des macronutriments. En combinaison avec la forte concentration de phosphore (48 %), cette synergie stimule intensément la division cellulaire et la formation précoce des poils absorbants, assurant un développement ultra-rapide de la surface foliaire initiale.',
        },
        {
          question:
            'Comment Orthagrow Initio-4G influence-t-il la régulation métabolique et physiologique des jeunes cultures ?',
          answer:
            'Le ratio spécifique entre l’azote (14 %) et le soufre (4 %) accélère la conversion des nutriments en protéines fonctionnelles. Les oligo-éléments chélatés ajoutés orientent avec précision les processus enzymatiques, permettant à la jeune plante de développer une efficacité métabolique maximale dès les premiers stades de croissance.',
        },
      ],
      en: [
        {
          question: 'What scientific advantage does “Powered by OSA” technology give at crop establishment?',
          answer:
            'Soluble silicon [Si(OH)₄] considerably lowers the energy barrier for macronutrient uptake. Combined with the high phosphorus content (48 %), this synergy strongly stimulates cell division and the early formation of root hairs, for very fast development of the first leaf area.',
        },
        {
          question: 'How does Orthagrow Initio-4G influence the metabolic and physiological regulation of young crops?',
          answer:
            'The specific ratio of nitrogen (14 %) to sulphur (4 %) speeds up the conversion of nutrients into functional proteins. The added chelated trace elements precisely steer the enzymatic processes, so the young plant reaches maximum metabolic efficiency from the first growth stages.',
        },
      ],
      es: [
        {
          question: '¿Qué ventaja científica ofrece la tecnología «Powered by OSA» en el arranque del cultivo?',
          answer:
            'El silicio soluble [Si(OH)₄] reduce considerablemente la barrera energética necesaria para la absorción de los macronutrientes. Combinado con la alta concentración de fósforo (48 %), esta sinergia estimula intensamente la división celular y la formación temprana de los pelos absorbentes, lo que asegura un desarrollo muy rápido de la superficie foliar inicial.',
        },
        {
          question: '¿Cómo influye Orthagrow Initio-4G en la regulación metabólica y fisiológica de los cultivos jóvenes?',
          answer:
            'La relación específica entre el nitrógeno (14 %) y el azufre (4 %) acelera la conversión de los nutrientes en proteínas funcionales. Los oligoelementos quelatados añadidos orientan con precisión los procesos enzimáticos, lo que permite a la planta joven alcanzar la máxima eficiencia metabólica desde las primeras fases de crecimiento.',
        },
      ],
      nl: [
        {
          question: 'Welk wetenschappelijk voordeel biedt de technologie “Powered by OSA” bij de start van de teelt?',
          answer:
            'Oplosbaar silicium [Si(OH)₄] verlaagt de energiedrempel voor de opname van macronutriënten aanzienlijk. Samen met het hoge fosforgehalte (48 %) stimuleert deze synergie sterk de celdeling en de vroege vorming van wortelharen, voor een zeer snelle ontwikkeling van het eerste bladoppervlak.',
        },
        {
          question: 'Hoe beïnvloedt Orthagrow Initio-4G de metabole en fysiologische regulatie van jonge gewassen?',
          answer:
            'De specifieke verhouding tussen stikstof (14 %) en zwavel (4 %) versnelt de omzetting van voedingsstoffen in functionele eiwitten. De toegevoegde gechelateerde sporenelementen sturen de enzymatische processen nauwkeurig, zodat de jonge plant vanaf de eerste groeistadia een maximale metabole efficiëntie bereikt.',
        },
      ],
    },
  },

  'orthagrow-flor': {
    seo: {
      title: 'Orthagrow Flor-4G NPK 10-54-10 | Énergie ATP',
      description:
        'Optimisez la relation source-puits et prévenez l’avortement prématuré des fleurs sous l’effet des vents secs et stress abiotiques.',
    },
    faqs: {
      fr: [
        {
          question:
            'Comment Orthagrow Flor-4G restructure-t-il le bilan énergétique physiologique lors de la transition critique vers la phase de floraison ?',
          answer:
            'La concentration exceptionnelle en phosphore (54 %) fournit à la plante l’énergie moléculaire (ATP) indispensable pour réussir la transition de la phase végétative à la phase générative. Ce processus active directement les voies physiologiques majeures qui déterminent la différenciation et l’initiation des bourgeons floraux.',
        },
        {
          question: 'Comment la technologie « Powered by OSA » optimise-t-elle la relation source-puits lors de la nouaison ?',
          answer:
            'Le silicium actif régule avec précision le flux de sève physiologique et favorise, en parfaite synergie avec l’équilibre NPK, le transport massif des glucides depuis les feuilles (source) directement vers les jeunes pièces florales et les fruits (puits). Cela prévient efficacement l’avortement prématuré des fruits sous l’influence des vents secs ou des stress abiotiques sévères.',
        },
      ],
      en: [
        {
          question: 'How does Orthagrow Flor-4G rebalance the plant’s energy budget during the critical switch to flowering?',
          answer:
            'The exceptional phosphorus content (54 %) gives the plant the molecular energy (ATP) it needs to move from the vegetative to the generative phase. This directly activates the main physiological pathways that govern flower bud differentiation and initiation.',
        },
        {
          question: 'How does “Powered by OSA” technology optimise the source–sink relationship at fruit set?',
          answer:
            'Active silicon precisely regulates sap flow and, together with the NPK balance, drives the transport of carbohydrates from the leaves (source) straight to the young flower parts and fruits (sink). This effectively prevents early fruit abortion under dry winds or severe abiotic stress.',
        },
      ],
      es: [
        {
          question: '¿Cómo reestructura Orthagrow Flor-4G el balance energético fisiológico en la transición crítica hacia la floración?',
          answer:
            'La concentración excepcional de fósforo (54 %) aporta a la planta la energía molecular (ATP) indispensable para pasar de la fase vegetativa a la generativa. Este proceso activa directamente las principales vías fisiológicas que determinan la diferenciación y la iniciación de las yemas florales.',
        },
        {
          question: '¿Cómo optimiza la tecnología «Powered by OSA» la relación fuente-sumidero durante el cuajado?',
          answer:
            'El silicio activo regula con precisión el flujo de savia y favorece, en perfecta sinergia con el equilibrio NPK, el transporte masivo de carbohidratos desde las hojas (fuente) directamente hacia las jóvenes piezas florales y los frutos (sumidero). Esto previene eficazmente el aborto prematuro de los frutos bajo el efecto de los vientos secos o de estreses abióticos severos.',
        },
      ],
      nl: [
        {
          question: 'Hoe herschikt Orthagrow Flor-4G de energiehuishouding van de plant bij de kritieke overgang naar de bloei?',
          answer:
            'Het uitzonderlijk hoge fosforgehalte (54 %) geeft de plant de moleculaire energie (ATP) die nodig is voor de overgang van de vegetatieve naar de generatieve fase. Dat activeert rechtstreeks de belangrijkste fysiologische routes die de differentiatie en aanleg van bloemknoppen bepalen.',
        },
        {
          question: 'Hoe optimaliseert de technologie “Powered by OSA” de source-sinkrelatie bij de vruchtzetting?',
          answer:
            'Actief silicium regelt de sapstroom nauwkeurig en stuurt, samen met de NPK-balans, het transport van koolhydraten van de bladeren (source) rechtstreeks naar de jonge bloemdelen en vruchten (sink). Zo wordt vroegtijdige vruchtabortus door droge wind of zware abiotische stress doeltreffend voorkomen.',
        },
      ],
    },
  },

  'orthagrow-frucfolia': {
    seo: {
      title: 'Orthagrow Frucfolia-4G | Calibrage des Fruits',
      description:
        'Formule sans azote combinant fer et OSA pour empêcher la chute des fruits et inhiber la dégradation enzymatique du pédoncule.',
    },
    faqs: {
      fr: [
        {
          question:
            'Comment Orthagrow Frucfolia-4G maximise-t-il biochimiquement le calibre des fruits et l’élongation cellulaire ?',
          answer:
            'L’absence totale d’azote permet de freiner immédiatement toute croissance végétale indésirable. Les concentrations massives de phosphore (42 %) et de potassium (47 %) orientent spécifiquement la division et l’élongation cellulaires vers le fruit, garantissant ainsi un calibrage supérieur et un développement parfaitement homogène.',
        },
        {
          question:
            'Comment l’interaction entre le fer (Fe) biochimique et le silicium soluble [Si(OH)₄] prévient-elle la formation de la zone d’abscission chez les fruits ?',
          answer:
            'L’avortement prématuré des fruits résulte souvent d’un déficit énergétique critique au niveau du pédoncule. Le fer actif (2,8 %) soutient puissamment la chaîne respiratoire en stimulant la production d’ATP sous une forte charge de fruits, tandis que la technologie OSA augmente la résistance mécanique des parois cellulaires au point d’attache. Cela inhibe la dégradation enzymatique de la pectine, évitant ainsi la chute prématurée des fruits dans les phases les plus critiques.',
        },
      ],
      en: [
        {
          question: 'How does Orthagrow Frucfolia-4G biochemically maximise fruit size and cell elongation?',
          answer:
            'With no nitrogen at all, unwanted vegetative growth is held back at once. The very high phosphorus (42 %) and potassium (47 %) contents direct cell division and elongation specifically to the fruit, for better sizing and perfectly even development.',
        },
        {
          question:
            'How does the interaction between iron (Fe) and soluble silicon [Si(OH)₄] prevent the abscission zone from forming in fruit?',
          answer:
            'Early fruit drop often comes from a critical energy shortfall at the fruit stalk. Active iron (2.8 %) strongly supports the respiratory chain by stimulating ATP production under a heavy fruit load, while OSA technology increases the mechanical strength of the cell walls at the attachment point. This inhibits the enzymatic breakdown of pectin and prevents early fruit drop at the most critical stages.',
        },
      ],
      es: [
        {
          question: '¿Cómo maximiza Orthagrow Frucfolia-4G bioquímicamente el calibre de los frutos y la elongación celular?',
          answer:
            'La ausencia total de nitrógeno frena de inmediato cualquier crecimiento vegetativo no deseado. Las altísimas concentraciones de fósforo (42 %) y potasio (47 %) orientan específicamente la división y la elongación celulares hacia el fruto, lo que garantiza un calibre superior y un desarrollo perfectamente homogéneo.',
        },
        {
          question:
            '¿Cómo previene la interacción entre el hierro (Fe) y el silicio soluble [Si(OH)₄] la formación de la zona de abscisión en los frutos?',
          answer:
            'El aborto prematuro de los frutos se debe a menudo a un déficit energético crítico en el pedúnculo. El hierro activo (2,8 %) sostiene con fuerza la cadena respiratoria al estimular la producción de ATP con una carga de frutos elevada, mientras que la tecnología OSA aumenta la resistencia mecánica de las paredes celulares en el punto de unión. Esto inhibe la degradación enzimática de la pectina y evita la caída prematura de los frutos en las fases más críticas.',
        },
      ],
      nl: [
        {
          question: 'Hoe maximaliseert Orthagrow Frucfolia-4G biochemisch het vruchtkaliber en de celstrekking?',
          answer:
            'Doordat stikstof volledig ontbreekt, wordt ongewenste vegetatieve groei meteen afgeremd. De zeer hoge gehalten aan fosfor (42 %) en kalium (47 %) sturen celdeling en celstrekking specifiek naar de vrucht, voor een beter kaliber en een volkomen gelijkmatige ontwikkeling.',
        },
        {
          question:
            'Hoe voorkomt de wisselwerking tussen ijzer (Fe) en oplosbaar silicium [Si(OH)₄] de vorming van de afscheuringszone bij vruchten?',
          answer:
            'Vroegtijdige vruchtval ontstaat vaak door een kritiek energietekort ter hoogte van het vruchtsteeltje. Actief ijzer (2,8 %) ondersteunt de ademhalingsketen krachtig door de ATP-productie te stimuleren bij een zware vruchtdracht, terwijl de OSA-technologie de mechanische sterkte van de celwanden op het aanhechtingspunt verhoogt. Dat remt de enzymatische afbraak van pectine en voorkomt vroegtijdige vruchtval in de meest kritieke fasen.',
        },
      ],
    },
  },

  'orthagrow-frucferti': {
    seo: {
      title: 'Orthagrow Frucferti-4G | Fertigation Boudnib',
      description:
        'Maximisez le flux des sucres et protégez la charge de fruits contre la chaleur et la salinité à Erfoud et Boudnib.',
    },
    faqs: {
      fr: [
        {
          question:
            'Comment Orthagrow Frucferti-4G dirige-t-il la translocation des glucides et des assimilats lors d’une fertigation intensive ?',
          answer:
            'Cette formule exclusive, exempte d’azote et de calcium, concentre pleinement la gestion de l’énergie sur le remplissage optimal des fruits via le système de fertigation. Elle stimule le flux de masse des sucres à travers le phloème, ce qui conduit à un rapport source-puits optimal et à un poids de récolte nettement supérieur.',
        },
        {
          question:
            'Comment Orthagrow Frucferti-4G protège-t-il physiologiquement la culture contre le stress abiotique pendant la phase lourde de développement des fruits ?',
          answer:
            'Lors d’une forte charge en fruits, la plante devient particulièrement vulnérable aux chocs climatiques. La technologie « Powered by OSA » stabilise efficacement l’osmorégulation et maintient la pression de turgescence cellulaire. Le silicium directement assimilable forme une matrice élastique protectrice autour de l’attache du fruit, rendant la culture mécaniquement beaucoup plus résiliente face aux stress abiotiques liés à la salinité, à la chaleur et à la sécheresse, particulièrement dans les oasis d’Erfoud et Boudnib.',
        },
      ],
      en: [
        {
          question: 'How does Orthagrow Frucferti-4G steer the translocation of carbohydrates and assimilates under intensive fertigation?',
          answer:
            'This exclusive formula, free of nitrogen and calcium, puts the plant’s energy entirely into filling the fruit through the fertigation system. It stimulates the mass flow of sugars through the phloem, giving an optimal source–sink ratio and a clearly higher harvest weight.',
        },
        {
          question: 'How does Orthagrow Frucferti-4G physiologically protect the crop against abiotic stress during heavy fruit development?',
          answer:
            'Under a heavy fruit load, the plant becomes especially vulnerable to weather shocks. “Powered by OSA” technology stabilises osmoregulation and maintains cell turgor pressure. Directly assimilable silicon forms a protective elastic matrix around the fruit attachment, making the crop mechanically far more resilient to abiotic stress from salinity, heat and drought, particularly in the Erfoud and Boudnib oases.',
        },
      ],
      es: [
        {
          question: '¿Cómo dirige Orthagrow Frucferti-4G la translocación de carbohidratos y asimilados en fertirrigación intensiva?',
          answer:
            'Esta fórmula exclusiva, sin nitrógeno ni calcio, concentra plenamente la gestión de la energía en el llenado óptimo de los frutos a través del sistema de fertirrigación. Estimula el flujo masivo de azúcares por el floema, lo que conduce a una relación fuente-sumidero óptima y a un peso de cosecha claramente superior.',
        },
        {
          question: '¿Cómo protege Orthagrow Frucferti-4G fisiológicamente al cultivo frente al estrés abiótico durante la fase de mayor desarrollo de los frutos?',
          answer:
            'Con una carga de frutos elevada, la planta se vuelve especialmente vulnerable a los choques climáticos. La tecnología «Powered by OSA» estabiliza eficazmente la osmorregulación y mantiene la presión de turgencia celular. El silicio directamente asimilable forma una matriz elástica protectora alrededor de la unión del fruto, lo que hace al cultivo mecánicamente mucho más resistente al estrés abiótico debido a la salinidad, el calor y la sequía, en particular en los oasis de Erfoud y Boudnib.',
        },
      ],
      nl: [
        {
          question: 'Hoe stuurt Orthagrow Frucferti-4G de translocatie van koolhydraten en assimilaten bij intensieve fertigatie?',
          answer:
            'Deze exclusieve formule, vrij van stikstof en calcium, zet de energie van de plant volledig in op het optimaal vullen van de vruchten via het fertigatiesysteem. Ze stimuleert de massastroom van suikers door het floëem, wat zorgt voor een optimale source-sinkverhouding en een duidelijk hoger oogstgewicht.',
        },
        {
          question: 'Hoe beschermt Orthagrow Frucferti-4G het gewas fysiologisch tegen abiotische stress tijdens de zware vruchtontwikkeling?',
          answer:
            'Bij een zware vruchtdracht wordt de plant bijzonder kwetsbaar voor weersschokken. De technologie “Powered by OSA” stabiliseert de osmoregulatie en handhaaft de turgordruk van de cellen. Het direct opneembare silicium vormt een beschermende, elastische matrix rond de aanhechting van de vrucht, waardoor het gewas mechanisch veel beter bestand is tegen abiotische stress door verzilting, hitte en droogte, vooral in de oases van Erfoud en Boudnib.',
        },
      ],
    },
  },

  'orthagrow-matur': {
    seo: {
      title: 'Orthagrow Matur-4G | Maturation Boudnib',
      description:
        'Richesse en potassium (46 %) pour bloquer la perte d’eau post-récolte et préserver la fermeté à Erfoud en phase de maturation.',
    },
    faqs: {
      fr: [
        {
          question:
            'Comment Orthagrow Matur-4G active-t-il biochimiquement l’accumulation des sucres et une maturation uniforme des fruits ?',
          answer:
            'Ce complexe de maturation intègre une concentration massive de potassium soluble (46 %) qui active directement la conversion enzymatique de l’amidon en sucres et optimise le rapport sucre-acide. Ce processus accélère l’évolution naturelle des fruits en assurant un développement parfaitement homogène de la couleur et de la saveur lors de la phase finale.',
        },
        {
          question:
            'Comment la technologie « Powered by OSA » prévient-elle la perte de qualité et le stress post-récolte pendant la maturation ?',
          answer:
            'Pendant la maturation, la rigidité de la paroi cellulaire diminue naturellement, ce qui accélère la perte d’eau. Le silicium soluble s’intègre au cœur des parois cellulaires de l’épiderme pour construire, en parfaite synergie avec la pression de turgescence régulée par le potassium, une barrière mécanique protectrice. Cela minimise drastiquement la perte d’eau après récolte en oasis (Erfoud, Boudnib) en maintenant la fermeté de la peau juste avant la cueillette.',
        },
      ],
      en: [
        {
          question: 'How does Orthagrow Matur-4G biochemically drive sugar accumulation and even fruit ripening?',
          answer:
            'This ripening complex contains a very high level of soluble potassium (46 %), which directly activates the enzymatic conversion of starch into sugars and optimises the sugar–acid ratio. Ripening is speeded up while colour and flavour develop perfectly evenly in the final phase.',
        },
        {
          question: 'How does “Powered by OSA” technology prevent quality loss and post-harvest stress during ripening?',
          answer:
            'During ripening, cell walls naturally lose rigidity, which speeds up water loss. Soluble silicon is built into the epidermal cell walls and, together with the turgor pressure that potassium regulates, forms a protective mechanical barrier. This sharply reduces water loss after harvest in the oases (Erfoud, Boudnib) by keeping the skin firm right up to picking.',
        },
      ],
      es: [
        {
          question: '¿Cómo activa Orthagrow Matur-4G bioquímicamente la acumulación de azúcares y una maduración uniforme de los frutos?',
          answer:
            'Este complejo de maduración integra una concentración muy alta de potasio soluble (46 %) que activa directamente la conversión enzimática del almidón en azúcares y optimiza la relación azúcar-acidez. Este proceso acelera la evolución natural de los frutos y asegura un desarrollo perfectamente homogéneo del color y del sabor en la fase final.',
        },
        {
          question: '¿Cómo previene la tecnología «Powered by OSA» la pérdida de calidad y el estrés poscosecha durante la maduración?',
          answer:
            'Durante la maduración, la rigidez de la pared celular disminuye de forma natural, lo que acelera la pérdida de agua. El silicio soluble se integra en las paredes celulares de la epidermis para formar, en perfecta sinergia con la presión de turgencia regulada por el potasio, una barrera mecánica protectora. Esto reduce drásticamente la pérdida de agua tras la cosecha en los oasis (Erfoud, Boudnib) al mantener la firmeza de la piel justo antes de la recolección.',
        },
      ],
      nl: [
        {
          question: 'Hoe activeert Orthagrow Matur-4G biochemisch de suikerophoping en een gelijkmatige afrijping van de vruchten?',
          answer:
            'Dit afrijpingscomplex bevat een zeer hoog gehalte aan oplosbaar kalium (46 %), dat de enzymatische omzetting van zetmeel in suikers rechtstreeks activeert en de suiker-zuurverhouding optimaliseert. Zo verloopt de afrijping sneller, met een volkomen gelijkmatige ontwikkeling van kleur en smaak in de eindfase.',
        },
        {
          question: 'Hoe voorkomt de technologie “Powered by OSA” kwaliteitsverlies en stress na de oogst tijdens de afrijping?',
          answer:
            'Tijdens de afrijping verliezen de celwanden van nature stevigheid, wat het waterverlies versnelt. Oplosbaar silicium wordt ingebouwd in de celwanden van de opperhuid en vormt, samen met de door kalium geregelde turgordruk, een beschermende mechanische barrière. Dat beperkt het waterverlies na de oogst in de oases (Erfoud, Boudnib) drastisch, doordat de schil tot vlak voor de pluk stevig blijft.',
        },
      ],
    },
  },

  clearox: {
    seo: {
      title: 'Clearox | Désinfection Argent & Peroxyde',
      description:
        'Éliminez à 100 % le biofilm organique des systèmes d’irrigation. Solution écologique sans résidus pour l’agriculture biologique.',
    },
    faqs: {
      fr: [
        {
          question: 'Qu’est-ce qui rend l’action biochimique à large spectre de Clearox unique au monde ?',
          answer:
            'Clearox est une formule de désinfection hautement concentrée à base de peroxyde d’hydrogène, stabilisée moléculairement par des ions d’argent grâce à une technologie de pointe. Cette configuration génère un effet synergique extrêmement puissant : elle brise instantanément les systèmes de défense microbiens en attaquant directement les enzymes et les membranes cellulaires des bactéries, champignons, virus, spores et algues, garantissant une efficacité microbiologique totale.',
        },
        {
          question:
            'Comment Clearox élimine-t-il le biofilm tenace dans les systèmes d’irrigation sans laisser de résidus nocifs ?',
          answer:
            'Grâce à sa stabilisation brevetée à l’argent, le peroxyde conserve son action oxydante profonde sur le long terme, même sous des valeurs de pH extrêmes et des températures élevées. Le produit pénètre et élimine complètement le biofilm organique existant dans les conduites et les réservoirs de stockage, tout en empêchant durablement la recolonisation. Après la réaction, la formule se dégrade de manière totalement écologique en eau pure (H₂O) et en oxygène (O₂), ce qui la rend absolument exempte de résidus, de chlore et d’odeurs, s’intégrant ainsi parfaitement dans les environnements agricoles biologiques.',
        },
      ],
      en: [
        {
          question: 'What makes the broad-spectrum biochemical action of Clearox unique?',
          answer:
            'Clearox is a highly concentrated disinfectant based on hydrogen peroxide, molecularly stabilised with silver ions through advanced technology. This produces a very powerful synergy: it breaks down microbial defences at once by attacking the enzymes and cell membranes of bacteria, fungi, viruses, spores and algae directly, for complete microbiological efficacy.',
        },
        {
          question: 'How does Clearox remove stubborn biofilm from irrigation systems without leaving harmful residues?',
          answer:
            'Thanks to its patented silver stabilisation, the peroxide keeps its deep oxidising action over the long term, even at extreme pH values and high temperatures. The product penetrates and fully removes existing organic biofilm in pipes and storage tanks, and prevents recolonisation over time. After reacting, the formula breaks down entirely into pure water (H₂O) and oxygen (O₂), so it leaves no residues, chlorine or odours, and fits perfectly into organic farming.',
        },
      ],
      es: [
        {
          question: '¿Qué hace única la acción bioquímica de amplio espectro de Clearox?',
          answer:
            'Clearox es una fórmula desinfectante muy concentrada a base de peróxido de hidrógeno, estabilizada molecularmente con iones de plata gracias a una tecnología de vanguardia. Esta configuración genera un efecto sinérgico muy potente: rompe al instante los sistemas de defensa microbianos al atacar directamente las enzimas y las membranas celulares de bacterias, hongos, virus, esporas y algas, lo que garantiza una eficacia microbiológica total.',
        },
        {
          question: '¿Cómo elimina Clearox la biopelícula persistente de los sistemas de riego sin dejar residuos nocivos?',
          answer:
            'Gracias a su estabilización patentada con plata, el peróxido conserva su acción oxidante profunda a largo plazo, incluso con valores de pH extremos y temperaturas elevadas. El producto penetra y elimina por completo la biopelícula orgánica existente en las tuberías y los depósitos, e impide de forma duradera la recolonización. Tras la reacción, la fórmula se degrada de manera totalmente ecológica en agua pura (H₂O) y oxígeno (O₂), por lo que no deja residuos, cloro ni olores y se integra perfectamente en la agricultura ecológica.',
        },
      ],
      nl: [
        {
          question: 'Wat maakt de breedwerkende biochemische werking van Clearox uniek?',
          answer:
            'Clearox is een sterk geconcentreerd ontsmettingsmiddel op basis van waterstofperoxide, moleculair gestabiliseerd met zilverionen dankzij geavanceerde technologie. Dat geeft een zeer krachtige synergie: de afweer van micro-organismen wordt meteen doorbroken doordat de enzymen en celmembranen van bacteriën, schimmels, virussen, sporen en algen rechtstreeks worden aangevallen, voor een volledige microbiologische werkzaamheid.',
        },
        {
          question: 'Hoe verwijdert Clearox hardnekkige biofilm uit irrigatiesystemen zonder schadelijke residuen?',
          answer:
            'Dankzij de gepatenteerde zilverstabilisatie behoudt het peroxide zijn diepe oxiderende werking op lange termijn, zelfs bij extreme pH-waarden en hoge temperaturen. Het product dringt door in bestaande organische biofilm in leidingen en opslagtanks, verwijdert die volledig en voorkomt blijvend nieuwe aangroei. Na de reactie valt de formule volledig uiteen in zuiver water (H₂O) en zuurstof (O₂), zonder residuen, chloor of geur, zodat ze perfect past in de biologische landbouw.',
        },
      ],
    },
  },
};

/** The product's questions in this language, or none. Variants share their parent's. */
export const productFaqs = (slug: string, locale: Locale): FamilyFaq[] => {
  const source = PRODUCTS.find((p) => p.slug === slug)?.variantOf ?? slug;
  return ENTRIES[source]?.faqs[locale] ?? [];
};

/**
 * The client's French meta-title and description; other languages have none. The product's
 * own page only: Clearox's strengths keep their names, so no two pages share a title.
 */
export const productSeo = (slug: string, locale: Locale) => (locale === 'fr' ? ENTRIES[slug]?.seo : undefined);
