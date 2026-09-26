import type { Locale } from '@/i18n/config';

/**
 * The green box under a product family — briefing of 2026-09-26, points 9 to 15, after
 * the category pages of casem.ma. The client wrote the French; EN, ES and NL are ours and
 * are listed in TRADUCTIONS-A-VALIDER.md.
 *
 * The briefing arrived with its bullet lists flattened out of place (they all ran
 * together under point 2). Each list below was put back under the sentence that
 * announces it — "contribuent à :", "Pour une utilisation optimale :" — by matching the
 * number of items and their grammar to that sentence.
 *
 * Protection biologique has no entry: point 14 says its text is still to come, and a box
 * with nothing to say stays off the page.
 */
export type FamilyNoteKey = 'specialties' | 'soil' | 'biostimulants' | 'npk' | 'disinfectant';

export type NoteBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  /** "Label : explanation" items get their label set in bold — see FamilyNote. */
  | { type: 'list'; items: string[] }
  /** The one-line signature each text ends on. */
  | { type: 'closing'; text: string };

export interface FamilyNoteContent {
  /** The family's name in capitals, as the client sets it above each text. */
  eyebrow: string;
  title: string;
  blocks: NoteBlock[];
}

const NOTES: Record<FamilyNoteKey, Record<Locale, FamilyNoteContent>> = {
  specialties: {
    fr: {
      eyebrow: 'Spécialité',
      title: 'Spécialité : technologie exclusive et brevetée Pure OSA pour des performances maximales des cultures',
      blocks: [
        {
          type: 'paragraph',
          text: 'Notre Spécialité repose sur une formule Pure OSA exclusive, brevetée et reconnue mondialement, développée à partir de la technologie OSA pharmaceutique destinée aux applications humaines.',
        },
        {
          type: 'paragraph',
          text: 'Cette formule unique est 100 % assimilable et conçue pour soutenir de manière ciblée les processus physiologiques de la plante et lui permettre d’exprimer pleinement son potentiel naturel.',
        },
        { type: 'heading', text: 'Une technologie avancée pour les conditions de culture les plus exigeantes' },
        {
          type: 'paragraph',
          text: 'La sécheresse, les fortes températures, le stress hydrique, les maladies et les ravageurs soumettent les cultures à des contraintes toujours plus importantes.',
        },
        {
          type: 'paragraph',
          text: 'Notre technologie Pure OSA soutient la résilience naturelle et le fonctionnement physiologique de la plante.',
        },
        { type: 'heading', text: 'Principaux avantages' },
        {
          type: 'list',
          items: [
            'Une meilleure tolérance aux stress abiotiques.',
            'Un soutien des mécanismes naturels de défense.',
            'Une utilisation plus efficace du phosphore et des oligo-éléments essentiels.',
            'Une formule Pure OSA 100 % assimilable pour une disponibilité optimale.',
            'Un soutien du rendement, de la qualité et de l’homogénéité des cultures.',
          ],
        },
        { type: 'paragraph', text: 'Technologie exclusive. Action ciblée. Performances maximales.' },
        {
          type: 'paragraph',
          text: 'Notre Spécialité peut être facilement intégrée dans les programmes professionnels de nutrition végétale et adaptée à la culture, au stade de développement et aux besoins spécifiques.',
        },
        {
          type: 'closing',
          text: 'MORECO associe l’innovation pharmaceutique autour de l’OSA à son expertise agronomique afin d’offrir aux producteurs un accès à une technologie Pure OSA exclusive pour des performances concrètes au champ.',
        },
      ],
    },
    en: {
      eyebrow: 'Specialty',
      title: 'Specialty: exclusive, patented Pure OSA technology for maximum crop performance',
      blocks: [
        {
          type: 'paragraph',
          text: 'Our Specialty is built on an exclusive, patented and internationally recognised Pure OSA formula, developed from the pharmaceutical OSA technology designed for human applications.',
        },
        {
          type: 'paragraph',
          text: 'This unique formula is 100% assimilable and designed to give targeted support to the plant’s physiological processes, so that it can fully express its natural potential.',
        },
        { type: 'heading', text: 'Advanced technology for the most demanding growing conditions' },
        {
          type: 'paragraph',
          text: 'Drought, high temperatures, water stress, diseases and pests put crops under ever greater pressure.',
        },
        {
          type: 'paragraph',
          text: 'Our Pure OSA technology supports the plant’s natural resilience and physiological functioning.',
        },
        { type: 'heading', text: 'Key benefits' },
        {
          type: 'list',
          items: [
            'Better tolerance of abiotic stress.',
            'Support for natural defence mechanisms.',
            'More efficient use of phosphorus and essential trace elements.',
            'A 100% assimilable Pure OSA formula for optimal availability.',
            'Support for crop yield, quality and uniformity.',
          ],
        },
        { type: 'paragraph', text: 'Exclusive technology. Targeted action. Maximum performance.' },
        {
          type: 'paragraph',
          text: 'Our Specialty fits easily into professional plant nutrition programmes and can be adapted to the crop, its growth stage and its specific needs.',
        },
        {
          type: 'closing',
          text: 'MORECO combines pharmaceutical OSA innovation with its agronomic expertise to give growers access to an exclusive Pure OSA technology for tangible results in the field.',
        },
      ],
    },
    es: {
      eyebrow: 'Especialidad',
      title: 'Especialidad: tecnología Pure OSA exclusiva y patentada para el máximo rendimiento de los cultivos',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nuestra Especialidad se basa en una fórmula Pure OSA exclusiva, patentada y reconocida a nivel mundial, desarrollada a partir de la tecnología OSA farmacéutica destinada a aplicaciones humanas.',
        },
        {
          type: 'paragraph',
          text: 'Esta fórmula única es 100 % asimilable y está diseñada para apoyar de forma específica los procesos fisiológicos de la planta y permitirle expresar plenamente su potencial natural.',
        },
        { type: 'heading', text: 'Una tecnología avanzada para las condiciones de cultivo más exigentes' },
        {
          type: 'paragraph',
          text: 'La sequía, las altas temperaturas, el estrés hídrico, las enfermedades y las plagas someten a los cultivos a presiones cada vez mayores.',
        },
        {
          type: 'paragraph',
          text: 'Nuestra tecnología Pure OSA apoya la resiliencia natural y el funcionamiento fisiológico de la planta.',
        },
        { type: 'heading', text: 'Principales ventajas' },
        {
          type: 'list',
          items: [
            'Una mejor tolerancia al estrés abiótico.',
            'Un apoyo a los mecanismos naturales de defensa.',
            'Un uso más eficiente del fósforo y de los oligoelementos esenciales.',
            'Una fórmula Pure OSA 100 % asimilable para una disponibilidad óptima.',
            'Un apoyo al rendimiento, la calidad y la homogeneidad de los cultivos.',
          ],
        },
        { type: 'paragraph', text: 'Tecnología exclusiva. Acción específica. Máximo rendimiento.' },
        {
          type: 'paragraph',
          text: 'Nuestra Especialidad se integra fácilmente en los programas profesionales de nutrición vegetal y se adapta al cultivo, a su fase de desarrollo y a sus necesidades específicas.',
        },
        {
          type: 'closing',
          text: 'MORECO une la innovación farmacéutica en torno al OSA y su experiencia agronómica para ofrecer a los productores una tecnología Pure OSA exclusiva, con resultados concretos en el campo.',
        },
      ],
    },
    nl: {
      eyebrow: 'Specialiteit',
      title: 'Specialiteit: exclusieve, gepatenteerde Pure OSA-technologie voor maximale gewasprestaties',
      blocks: [
        {
          type: 'paragraph',
          text: 'Onze Specialiteit is gebaseerd op een exclusieve, gepatenteerde en wereldwijd erkende Pure OSA-formule, ontwikkeld op basis van de farmaceutische OSA-technologie voor menselijke toepassingen.',
        },
        {
          type: 'paragraph',
          text: 'Deze unieke formule is 100% opneembaar en ontworpen om de fysiologische processen van de plant gericht te ondersteunen, zodat de plant haar natuurlijke potentieel volledig kan benutten.',
        },
        { type: 'heading', text: 'Geavanceerde technologie voor de zwaarste teeltomstandigheden' },
        {
          type: 'paragraph',
          text: 'Droogte, hoge temperaturen, waterstress, ziekten en plagen zetten gewassen steeds meer onder druk.',
        },
        {
          type: 'paragraph',
          text: 'Onze Pure OSA-technologie ondersteunt de natuurlijke weerbaarheid en de fysiologische werking van de plant.',
        },
        { type: 'heading', text: 'Belangrijkste voordelen' },
        {
          type: 'list',
          items: [
            'Een betere tolerantie voor abiotische stress.',
            'Ondersteuning van de natuurlijke afweermechanismen.',
            'Een efficiënter gebruik van fosfor en essentiële sporenelementen.',
            'Een 100% opneembare Pure OSA-formule voor optimale beschikbaarheid.',
            'Ondersteuning van opbrengst, kwaliteit en uniformiteit van het gewas.',
          ],
        },
        { type: 'paragraph', text: 'Exclusieve technologie. Gerichte werking. Maximale prestaties.' },
        {
          type: 'paragraph',
          text: 'Onze Specialiteit past eenvoudig in professionele bemestingsprogramma’s en wordt afgestemd op het gewas, het groeistadium en de specifieke behoeften.',
        },
        {
          type: 'closing',
          text: 'MORECO combineert farmaceutische OSA-innovatie met agronomische expertise en geeft telers zo toegang tot een exclusieve Pure OSA-technologie voor concrete resultaten op het veld.',
        },
      ],
    },
  },

  soil: {
    fr: {
      eyebrow: 'Santé du sol & des racines',
      title: 'Santé du sol & des racines : restaurer le sol, renforcer les racines et développer la performance',
      blocks: [
        { type: 'paragraph', text: 'La performance d’une culture commence sous la surface.' },
        {
          type: 'paragraph',
          text: 'Un sol biologiquement actif, correctement structuré et capable de retenir l’eau et les nutriments constitue la base d’un système racinaire puissant et d’une production durable.',
        },
        { type: 'heading', text: 'Pourquoi choisir nos solutions pour la santé des sols ?' },
        {
          type: 'paragraph',
          text: 'Nos solutions pour le sol sont conçues pour contribuer à une restauration rapide et durable des sols agricoles et créer des conditions optimales pour le développement racinaire.',
        },
        {
          type: 'paragraph',
          text: 'Issues de technologies innovantes et d’une expertise agronomique avancée, elles contribuent à :',
        },
        {
          type: 'list',
          items: [
            'Restaurer la structure et la fonctionnalité des sols agricoles ayant subi une dégradation ou un épuisement.',
            'Optimiser la CEC (capacité d’échange cationique) afin d’améliorer la disponibilité et l’utilisation des éléments nutritifs.',
            'Créer un environnement favorable au développement racinaire, à la vie biologique et à l’activité de la plante.',
            'Améliorer l’efficacité de l’eau et des nutriments dans la zone racinaire.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Un sol fonctionnel constitue un investissement à long terme pour la productivité et la qualité des cultures.',
        },
        { type: 'heading', text: 'Conditionneurs de sol : une nouvelle génération de technologies régénératives' },
        {
          type: 'paragraph',
          text: 'Nos technologies de quatrième génération pour l’amélioration des sols intègrent l’expertise développée autour de l’acide orthosilicique stabilisé (OSA).',
        },
        { type: 'paragraph', text: 'Elles sont conçues pour agir au niveau de la rhizosphère et favoriser :' },
        {
          type: 'list',
          items: [
            'Une activité biologique accrue et un meilleur équilibre de la vie microbienne du sol.',
            'Une meilleure mobilisation des nutriments présents dans la zone racinaire.',
            'Une amélioration de la structure du sol, favorisant la circulation et la rétention de l’eau et des nutriments.',
            'Un environnement plus favorable au développement des racines et à l’installation d’une culture vigoureuse.',
          ],
        },
        { type: 'heading', text: 'Une application ciblée pour des résultats durables' },
        {
          type: 'paragraph',
          text: 'L’intégration de nos conditionneurs de sol, granulés et de notre formulation exclusive et unique à base de mycorhizes dans votre programme de production est simple et peut être adaptée aux besoins spécifiques de chaque parcelle.',
        },
        { type: 'paragraph', text: 'Pour une utilisation optimale :' },
        {
          type: 'list',
          items: [
            'Analysez la structure physique et l’état biologique de votre sol.',
            'Identifiez les zones et les besoins prioritaires.',
            'Respectez les recommandations de dosage et d’application.',
            'Suivez l’évolution de la structure du sol ainsi que le développement racinaire et végétatif.',
          ],
        },
        { type: 'closing', text: 'Investir dans le sol, c’est investir dans les performances futures de votre exploitation.' },
      ],
    },
    en: {
      eyebrow: 'Soil & root health',
      title: 'Soil & root health: restore the soil, strengthen the roots and build performance',
      blocks: [
        { type: 'paragraph', text: 'A crop’s performance starts below the surface.' },
        {
          type: 'paragraph',
          text: 'A biologically active, well-structured soil that holds water and nutrients is the foundation of a strong root system and of lasting production.',
        },
        { type: 'heading', text: 'Why choose our soil health solutions?' },
        {
          type: 'paragraph',
          text: 'Our soil solutions are designed to help restore agricultural soils quickly and durably, and to create optimal conditions for root development.',
        },
        {
          type: 'paragraph',
          text: 'Built on innovative technologies and advanced agronomic expertise, they help to:',
        },
        {
          type: 'list',
          items: [
            'Restore the structure and function of agricultural soils that have been degraded or depleted.',
            'Optimise CEC (cation exchange capacity) to improve the availability and uptake of nutrients.',
            'Create an environment that favours root development, soil life and plant activity.',
            'Improve the efficiency of water and nutrients in the root zone.',
          ],
        },
        {
          type: 'paragraph',
          text: 'A functioning soil is a long-term investment in crop productivity and quality.',
        },
        { type: 'heading', text: 'Soil conditioners: a new generation of regenerative technologies' },
        {
          type: 'paragraph',
          text: 'Our fourth-generation soil improvement technologies build on the expertise developed around stabilised orthosilicic acid (OSA).',
        },
        { type: 'paragraph', text: 'They are designed to act in the rhizosphere and promote:' },
        {
          type: 'list',
          items: [
            'Greater biological activity and a better balance of soil microbial life.',
            'Better mobilisation of the nutrients present in the root zone.',
            'Improved soil structure, helping water and nutrients to move and be retained.',
            'A more favourable environment for root development and the establishment of a vigorous crop.',
          ],
        },
        { type: 'heading', text: 'Targeted application for lasting results' },
        {
          type: 'paragraph',
          text: 'Our soil conditioners, granules and exclusive, unique mycorrhizal formulation are simple to integrate into your production programme and can be adapted to the specific needs of each plot.',
        },
        { type: 'paragraph', text: 'For best results:' },
        {
          type: 'list',
          items: [
            'Analyse the physical structure and biological condition of your soil.',
            'Identify the priority areas and needs.',
            'Follow the dosage and application recommendations.',
            'Monitor how the soil structure, root growth and vegetative growth develop.',
          ],
        },
        { type: 'closing', text: 'Investing in the soil is investing in your farm’s future performance.' },
      ],
    },
    es: {
      eyebrow: 'Salud del suelo y de las raíces',
      title: 'Salud del suelo y de las raíces: restaurar el suelo, reforzar las raíces y desarrollar el rendimiento',
      blocks: [
        { type: 'paragraph', text: 'El rendimiento de un cultivo empieza bajo la superficie.' },
        {
          type: 'paragraph',
          text: 'Un suelo biológicamente activo, bien estructurado y capaz de retener el agua y los nutrientes es la base de un sistema radicular potente y de una producción sostenible.',
        },
        { type: 'heading', text: '¿Por qué elegir nuestras soluciones para la salud del suelo?' },
        {
          type: 'paragraph',
          text: 'Nuestras soluciones para el suelo están diseñadas para contribuir a una restauración rápida y duradera de los suelos agrícolas y crear condiciones óptimas para el desarrollo radicular.',
        },
        {
          type: 'paragraph',
          text: 'Fruto de tecnologías innovadoras y de una experiencia agronómica avanzada, contribuyen a:',
        },
        {
          type: 'list',
          items: [
            'Restaurar la estructura y la funcionalidad de los suelos agrícolas degradados o agotados.',
            'Optimizar la CIC (capacidad de intercambio catiónico) para mejorar la disponibilidad y el aprovechamiento de los nutrientes.',
            'Crear un entorno favorable al desarrollo radicular, a la vida biológica y a la actividad de la planta.',
            'Mejorar la eficiencia del agua y de los nutrientes en la zona radicular.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Un suelo funcional es una inversión a largo plazo en la productividad y la calidad de los cultivos.',
        },
        { type: 'heading', text: 'Acondicionadores de suelo: una nueva generación de tecnologías regenerativas' },
        {
          type: 'paragraph',
          text: 'Nuestras tecnologías de cuarta generación para la mejora de los suelos integran la experiencia desarrollada en torno al ácido ortosilícico estabilizado (OSA).',
        },
        { type: 'paragraph', text: 'Están diseñadas para actuar en la rizosfera y favorecer:' },
        {
          type: 'list',
          items: [
            'Una mayor actividad biológica y un mejor equilibrio de la vida microbiana del suelo.',
            'Una mejor movilización de los nutrientes presentes en la zona radicular.',
            'Una mejora de la estructura del suelo, que favorece la circulación y la retención del agua y los nutrientes.',
            'Un entorno más favorable al desarrollo de las raíces y a la implantación de un cultivo vigoroso.',
          ],
        },
        { type: 'heading', text: 'Una aplicación específica para resultados duraderos' },
        {
          type: 'paragraph',
          text: 'Integrar nuestros acondicionadores de suelo, granulados y nuestra formulación exclusiva y única a base de micorrizas en su programa de producción es sencillo y puede adaptarse a las necesidades específicas de cada parcela.',
        },
        { type: 'paragraph', text: 'Para un uso óptimo:' },
        {
          type: 'list',
          items: [
            'Analice la estructura física y el estado biológico de su suelo.',
            'Identifique las zonas y las necesidades prioritarias.',
            'Respete las recomendaciones de dosis y de aplicación.',
            'Siga la evolución de la estructura del suelo y el desarrollo radicular y vegetativo.',
          ],
        },
        { type: 'closing', text: 'Invertir en el suelo es invertir en el rendimiento futuro de su explotación.' },
      ],
    },
    nl: {
      eyebrow: 'Bodem- & wortelgezondheid',
      title: 'Bodem- & wortelgezondheid: de bodem herstellen, de wortels versterken en de prestaties opbouwen',
      blocks: [
        { type: 'paragraph', text: 'De prestaties van een gewas beginnen onder de grond.' },
        {
          type: 'paragraph',
          text: 'Een biologisch actieve, goed gestructureerde bodem die water en voedingsstoffen vasthoudt, is de basis van een krachtig wortelstelsel en een duurzame productie.',
        },
        { type: 'heading', text: 'Waarom kiezen voor onze oplossingen voor bodemgezondheid?' },
        {
          type: 'paragraph',
          text: 'Onze bodemoplossingen zijn ontwikkeld om landbouwgronden snel en duurzaam te helpen herstellen en optimale omstandigheden te scheppen voor de wortelontwikkeling.',
        },
        {
          type: 'paragraph',
          text: 'Gebaseerd op innovatieve technologieën en geavanceerde agronomische kennis dragen ze bij aan:',
        },
        {
          type: 'list',
          items: [
            'Het herstel van de structuur en werking van aangetaste of uitgeputte landbouwgronden.',
            'Het optimaliseren van de CEC (kationuitwisselingscapaciteit) voor een betere beschikbaarheid en benutting van voedingsstoffen.',
            'Een omgeving die gunstig is voor wortelontwikkeling, bodemleven en plantactiviteit.',
            'Een efficiënter gebruik van water en voedingsstoffen in de wortelzone.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Een goed functionerende bodem is een langetermijninvestering in de productiviteit en kwaliteit van het gewas.',
        },
        { type: 'heading', text: 'Bodemverbeteraars: een nieuwe generatie regeneratieve technologieën' },
        {
          type: 'paragraph',
          text: 'Onze bodemverbeterende technologieën van de vierde generatie bouwen voort op de kennis rond gestabiliseerd orthokiezelzuur (OSA).',
        },
        { type: 'paragraph', text: 'Ze werken in de rizosfeer en bevorderen:' },
        {
          type: 'list',
          items: [
            'Een hogere biologische activiteit en een beter evenwicht in het microbiële bodemleven.',
            'Een betere mobilisatie van de voedingsstoffen in de wortelzone.',
            'Een betere bodemstructuur, die de doorstroming en het vasthouden van water en voedingsstoffen bevordert.',
            'Een gunstigere omgeving voor wortelontwikkeling en de vestiging van een krachtig gewas.',
          ],
        },
        { type: 'heading', text: 'Gerichte toepassing voor duurzame resultaten' },
        {
          type: 'paragraph',
          text: 'Onze bodemverbeteraars, korrels en onze exclusieve, unieke formulering op basis van mycorrhiza zijn eenvoudig in uw teeltprogramma op te nemen en af te stemmen op de specifieke behoeften van elk perceel.',
        },
        { type: 'paragraph', text: 'Voor optimaal gebruik:' },
        {
          type: 'list',
          items: [
            'Analyseer de fysische structuur en de biologische toestand van uw bodem.',
            'Bepaal de prioritaire zones en behoeften.',
            'Volg de dosering- en toepassingsadviezen.',
            'Volg de ontwikkeling van de bodemstructuur en van de wortel- en gewasgroei.',
          ],
        },
        { type: 'closing', text: 'Investeren in de bodem is investeren in de toekomstige prestaties van uw bedrijf.' },
      ],
    },
  },

  biostimulants: {
    fr: {
      eyebrow: 'Oligo-éléments & biostimulants',
      title: 'Technologie avancée de nutrition pour la croissance, la vitalité, la qualité et la performance des cultures',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nos oligo-éléments, chélates et biostimulants associent des formulations hautement concentrées à une technologie unique de micro-encapsulation et à la technologie OSA.',
        },
        {
          type: 'paragraph',
          text: 'Ces technologies sont conçues pour optimiser la disponibilité, l’absorption et l’utilisation des nutriments essentiels et soutenir de manière ciblée les processus physiologiques de la plante.',
        },
        { type: 'heading', text: 'Nutrition ciblée en micronutriments' },
        {
          type: 'paragraph',
          text: 'Nos formulations contenant notamment du calcium, du zinc et du bore contribuent à :',
        },
        {
          type: 'list',
          items: [
            'Une formation efficace de la chlorophylle et une photosynthèse optimisée.',
            'La croissance, la floraison et la nouaison.',
            'Un développement végétatif et reproductif équilibré.',
            'Une correction ciblée des besoins en micronutriments.',
            'L’amélioration de la qualité nutritionnelle et de la conservation prolongée des récoltes.',
          ],
        },
        { type: 'heading', text: 'Biostimulants avec technologie OSA' },
        {
          type: 'paragraph',
          text: 'La combinaison de molécules actives, d’acides aminés végétaux, d’extraits d’algues et de la technologie OSA soutient les processus physiologiques naturels de la plante.',
        },
        { type: 'paragraph', text: 'Ils contribuent notamment à :' },
        {
          type: 'list',
          items: [
            'Améliorer la tolérance aux stress abiotiques.',
            'Soutenir les mécanismes naturels de défense.',
            'Optimiser l’utilisation de l’eau et des nutriments.',
            'Soutenir la croissance, la vitalité et l’homogénéité des cultures.',
            'Optimiser la qualité, la valeur nutritionnelle et la conservation prolongée des récoltes.',
          ],
        },
        {
          type: 'closing',
          text: 'Précision, bioactivité et technologie pour permettre à la culture d’exprimer pleinement son potentiel.',
        },
      ],
    },
    en: {
      eyebrow: 'Trace elements & biostimulants',
      title: 'Advanced nutrition technology for crop growth, vitality, quality and performance',
      blocks: [
        {
          type: 'paragraph',
          text: 'Our trace elements, chelates and biostimulants combine highly concentrated formulations with a unique micro-encapsulation technology and OSA technology.',
        },
        {
          type: 'paragraph',
          text: 'These technologies are designed to optimise the availability, uptake and use of essential nutrients and to give targeted support to the plant’s physiological processes.',
        },
        { type: 'heading', text: 'Targeted micronutrient nutrition' },
        {
          type: 'paragraph',
          text: 'Our formulations, which include calcium, zinc and boron, contribute to:',
        },
        {
          type: 'list',
          items: [
            'Efficient chlorophyll formation and optimised photosynthesis.',
            'Growth, flowering and fruit set.',
            'Balanced vegetative and reproductive development.',
            'Targeted correction of micronutrient needs.',
            'Better nutritional quality and a longer shelf life for the harvest.',
          ],
        },
        { type: 'heading', text: 'Biostimulants with OSA technology' },
        {
          type: 'paragraph',
          text: 'The combination of active molecules, plant amino acids, seaweed extracts and OSA technology supports the plant’s natural physiological processes.',
        },
        { type: 'paragraph', text: 'Among other things, they help to:' },
        {
          type: 'list',
          items: [
            'Improve tolerance of abiotic stress.',
            'Support natural defence mechanisms.',
            'Optimise the use of water and nutrients.',
            'Support crop growth, vitality and uniformity.',
            'Optimise the quality, nutritional value and shelf life of the harvest.',
          ],
        },
        {
          type: 'closing',
          text: 'Precision, bioactivity and technology, so the crop can fully express its potential.',
        },
      ],
    },
    es: {
      eyebrow: 'Oligoelementos y bioestimulantes',
      title: 'Tecnología de nutrición avanzada para el crecimiento, la vitalidad, la calidad y el rendimiento de los cultivos',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nuestros oligoelementos, quelatos y bioestimulantes combinan formulaciones altamente concentradas con una tecnología única de microencapsulación y con la tecnología OSA.',
        },
        {
          type: 'paragraph',
          text: 'Estas tecnologías están diseñadas para optimizar la disponibilidad, la absorción y el aprovechamiento de los nutrientes esenciales y apoyar de forma específica los procesos fisiológicos de la planta.',
        },
        { type: 'heading', text: 'Nutrición específica en micronutrientes' },
        {
          type: 'paragraph',
          text: 'Nuestras formulaciones, que contienen en particular calcio, zinc y boro, contribuyen a:',
        },
        {
          type: 'list',
          items: [
            'Una formación eficaz de la clorofila y una fotosíntesis optimizada.',
            'El crecimiento, la floración y el cuajado.',
            'Un desarrollo vegetativo y reproductivo equilibrado.',
            'Una corrección específica de las necesidades de micronutrientes.',
            'La mejora de la calidad nutricional y una conservación prolongada de las cosechas.',
          ],
        },
        { type: 'heading', text: 'Bioestimulantes con tecnología OSA' },
        {
          type: 'paragraph',
          text: 'La combinación de moléculas activas, aminoácidos vegetales, extractos de algas y la tecnología OSA apoya los procesos fisiológicos naturales de la planta.',
        },
        { type: 'paragraph', text: 'Contribuyen en particular a:' },
        {
          type: 'list',
          items: [
            'Mejorar la tolerancia al estrés abiótico.',
            'Apoyar los mecanismos naturales de defensa.',
            'Optimizar el uso del agua y de los nutrientes.',
            'Apoyar el crecimiento, la vitalidad y la homogeneidad de los cultivos.',
            'Optimizar la calidad, el valor nutricional y la conservación prolongada de las cosechas.',
          ],
        },
        {
          type: 'closing',
          text: 'Precisión, bioactividad y tecnología para que el cultivo exprese plenamente su potencial.',
        },
      ],
    },
    nl: {
      eyebrow: 'Sporenelementen & biostimulanten',
      title: 'Geavanceerde voedingstechnologie voor groei, vitaliteit, kwaliteit en prestaties van het gewas',
      blocks: [
        {
          type: 'paragraph',
          text: 'Onze sporenelementen, chelaten en biostimulanten combineren sterk geconcentreerde formuleringen met een unieke micro-encapsulatietechnologie en OSA-technologie.',
        },
        {
          type: 'paragraph',
          text: 'Deze technologieën optimaliseren de beschikbaarheid, opname en benutting van essentiële voedingsstoffen en ondersteunen de fysiologische processen van de plant gericht.',
        },
        { type: 'heading', text: 'Gerichte voeding met micronutriënten' },
        {
          type: 'paragraph',
          text: 'Onze formuleringen, met onder meer calcium, zink en boor, dragen bij aan:',
        },
        {
          type: 'list',
          items: [
            'Een efficiënte vorming van bladgroen en een optimale fotosynthese.',
            'Groei, bloei en vruchtzetting.',
            'Een evenwichtige vegetatieve en generatieve ontwikkeling.',
            'Een gerichte correctie van tekorten aan micronutriënten.',
            'Een betere voedingskwaliteit en een langere houdbaarheid van de oogst.',
          ],
        },
        { type: 'heading', text: 'Biostimulanten met OSA-technologie' },
        {
          type: 'paragraph',
          text: 'De combinatie van actieve moleculen, plantaardige aminozuren, algenextracten en OSA-technologie ondersteunt de natuurlijke fysiologische processen van de plant.',
        },
        { type: 'paragraph', text: 'Ze helpen onder meer om:' },
        {
          type: 'list',
          items: [
            'De tolerantie voor abiotische stress te verbeteren.',
            'De natuurlijke afweermechanismen te ondersteunen.',
            'Het gebruik van water en voedingsstoffen te optimaliseren.',
            'De groei, vitaliteit en uniformiteit van het gewas te ondersteunen.',
            'De kwaliteit, voedingswaarde en houdbaarheid van de oogst te optimaliseren.',
          ],
        },
        {
          type: 'closing',
          text: 'Precisie, bioactiviteit en technologie, zodat het gewas zijn volle potentieel kan benutten.',
        },
      ],
    },
  },

  npk: {
    fr: {
      eyebrow: 'HIGH END NPK',
      title: 'HIGH END NPK : formulations WSL uniques selon la stratégie MORECO « Micro Input – Macro Impact »',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nos formulations HIGH END NPK uniques sont développées pour maximiser l’impact agronomique grâce à une utilisation ciblée, efficace et maîtrisée des nutriments.',
        },
        {
          type: 'paragraph',
          text: 'Notre gamme WSL représente une nouvelle génération de formulations spécialisées Powered by OSA, développées pour maximiser l’efficacité nutritionnelle tout en permettant une application précise et contrôlée.',
        },
        {
          type: 'paragraph',
          text: 'Grâce à leur technologie moléculaire avancée et à leur forte concentration, elles permettent de rendre les nutriments essentiels disponibles de manière ciblée au moment où la plante en a le plus besoin.',
        },
        { type: 'heading', text: 'Pourquoi choisir nos formulations HIGH END NPK ?' },
        {
          type: 'paragraph',
          text: 'Nos formulations WSL sont conçues pour optimiser l’utilisation de l’azote, du phosphore et du potassium au cours des différentes phases de développement de la culture.',
        },
        { type: 'paragraph', text: 'Principaux avantages :' },
        {
          type: 'list',
          items: [
            'Une haute disponibilité des nutriments pour une utilisation efficace par la plante.',
            'Une efficacité nutritionnelle élevée avec des doses maîtrisées.',
            'Des formulations 100 % solubles et assimilables, développées comme des solutions nutritionnelles d’une très grande pureté pour les systèmes modernes d’irrigation et de fertigation.',
            'Une nutrition adaptée aux différentes phases physiologiques de la culture.',
            'Une nutrition de précision pour accompagner de manière ciblée chaque étape du cycle végétatif.',
          ],
        },
        { type: 'heading', text: 'HIGH END NPK : une formulation spécialisée pour chaque phase clé du développement' },
        {
          type: 'paragraph',
          text: 'Chaque formulation WSL est conçue pour répondre aux besoins spécifiques de la plante à un moment précis de son développement.',
        },
        {
          type: 'list',
          items: [
            'Phase de démarrage : favorise le développement d’un système racinaire puissant ainsi qu’un démarrage végétatif rapide et homogène.',
            'Phase de floraison et de nouaison : accompagne la floraison, la différenciation florale et le développement des fruits.',
            'Phase de développement des fruits – application foliaire & fertigation : soutient la photosynthèse, le transport des sucres et le développement homogène des fruits.',
            'Phase de finition et de maturation : accompagne la fermeté des tissus, la coloration, l’accumulation des sucres (Brix) et la conservation des fruits.',
          ],
        },
        { type: 'heading', text: 'Une nutrition de précision pour chaque étape du cycle de culture' },
        {
          type: 'paragraph',
          text: 'L’intégration des formulations WSL dans votre programme d’irrigation ou de pulvérisation permet d’adapter précisément la nutrition aux besoins réels de la culture.',
        },
        { type: 'paragraph', text: 'Pour une efficacité optimale :' },
        {
          type: 'list',
          items: [
            'Identifiez précisément la phase physiologique de la culture.',
            'Respectez les recommandations de dosage et d’application.',
            'Ajustez les apports en fonction du développement et des besoins de la plante.',
            'Suivez régulièrement la réponse de la culture.',
          ],
        },
        {
          type: 'closing',
          text: 'Micro Input – Macro Impact : un impact agronomique maximal grâce à la précision, à l’efficacité et à une technologie nutritionnelle innovante.',
        },
      ],
    },
    en: {
      eyebrow: 'HIGH END NPK',
      title: 'HIGH END NPK: unique WSL formulations built on the MORECO “Micro Input – Macro Impact” strategy',
      blocks: [
        {
          type: 'paragraph',
          text: 'Our unique HIGH END NPK formulations are developed to maximise agronomic impact through targeted, efficient and controlled use of nutrients.',
        },
        {
          type: 'paragraph',
          text: 'Our WSL range is a new generation of specialised formulations Powered by OSA, developed to maximise nutritional efficiency while allowing precise, controlled application.',
        },
        {
          type: 'paragraph',
          text: 'Thanks to their advanced molecular technology and high concentration, they make essential nutrients available precisely when the plant needs them most.',
        },
        { type: 'heading', text: 'Why choose our HIGH END NPK formulations?' },
        {
          type: 'paragraph',
          text: 'Our WSL formulations are designed to optimise the use of nitrogen, phosphorus and potassium across the crop’s different growth stages.',
        },
        { type: 'paragraph', text: 'Key benefits:' },
        {
          type: 'list',
          items: [
            'High nutrient availability, for efficient use by the plant.',
            'High nutritional efficiency at controlled doses.',
            '100% soluble and assimilable formulations, developed as very high-purity nutrient solutions for modern irrigation and fertigation systems.',
            'Nutrition matched to each physiological stage of the crop.',
            'Precision nutrition that supports every step of the growth cycle.',
          ],
        },
        { type: 'heading', text: 'HIGH END NPK: a specialised formulation for each key growth stage' },
        {
          type: 'paragraph',
          text: 'Each WSL formulation is designed to meet the plant’s specific needs at a precise point in its development.',
        },
        {
          type: 'list',
          items: [
            'Establishment: promotes a strong root system and fast, even early growth.',
            'Flowering and fruit set: supports flowering, flower differentiation and fruit development.',
            'Fruit development – foliar application & fertigation: supports photosynthesis, sugar transport and even fruit development.',
            'Finishing and ripening: supports tissue firmness, colouring, sugar accumulation (Brix) and fruit storage life.',
          ],
        },
        { type: 'heading', text: 'Precision nutrition for every step of the crop cycle' },
        {
          type: 'paragraph',
          text: 'Adding WSL formulations to your irrigation or spray programme lets you match nutrition precisely to what the crop actually needs.',
        },
        { type: 'paragraph', text: 'For best results:' },
        {
          type: 'list',
          items: [
            'Identify the crop’s physiological stage precisely.',
            'Follow the dosage and application recommendations.',
            'Adjust inputs to the plant’s development and needs.',
            'Monitor the crop’s response regularly.',
          ],
        },
        {
          type: 'closing',
          text: 'Micro Input – Macro Impact: maximum agronomic impact through precision, efficiency and innovative nutrition technology.',
        },
      ],
    },
    es: {
      eyebrow: 'HIGH END NPK',
      title: 'HIGH END NPK: formulaciones WSL únicas según la estrategia MORECO «Micro Input – Macro Impact»',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nuestras formulaciones HIGH END NPK únicas se desarrollan para maximizar el impacto agronómico mediante un uso específico, eficiente y controlado de los nutrientes.',
        },
        {
          type: 'paragraph',
          text: 'Nuestra gama WSL representa una nueva generación de formulaciones especializadas Powered by OSA, desarrolladas para maximizar la eficiencia nutricional permitiendo a la vez una aplicación precisa y controlada.',
        },
        {
          type: 'paragraph',
          text: 'Gracias a su avanzada tecnología molecular y a su alta concentración, ponen los nutrientes esenciales a disposición de la planta en el momento en que más los necesita.',
        },
        { type: 'heading', text: '¿Por qué elegir nuestras formulaciones HIGH END NPK?' },
        {
          type: 'paragraph',
          text: 'Nuestras formulaciones WSL están diseñadas para optimizar el uso del nitrógeno, el fósforo y el potasio a lo largo de las distintas fases de desarrollo del cultivo.',
        },
        { type: 'paragraph', text: 'Principales ventajas:' },
        {
          type: 'list',
          items: [
            'Una alta disponibilidad de nutrientes para un aprovechamiento eficaz por la planta.',
            'Una elevada eficiencia nutricional con dosis controladas.',
            'Formulaciones 100 % solubles y asimilables, desarrolladas como soluciones nutritivas de muy alta pureza para los sistemas modernos de riego y fertirrigación.',
            'Una nutrición adaptada a las distintas fases fisiológicas del cultivo.',
            'Una nutrición de precisión para acompañar de forma específica cada etapa del ciclo vegetativo.',
          ],
        },
        { type: 'heading', text: 'HIGH END NPK: una formulación especializada para cada fase clave del desarrollo' },
        {
          type: 'paragraph',
          text: 'Cada formulación WSL está diseñada para responder a las necesidades específicas de la planta en un momento preciso de su desarrollo.',
        },
        {
          type: 'list',
          items: [
            'Fase de arranque: favorece el desarrollo de un sistema radicular potente y un arranque vegetativo rápido y homogéneo.',
            'Fase de floración y cuajado: acompaña la floración, la diferenciación floral y el desarrollo de los frutos.',
            'Fase de desarrollo de los frutos – aplicación foliar y fertirrigación: apoya la fotosíntesis, el transporte de azúcares y el desarrollo homogéneo de los frutos.',
            'Fase de acabado y maduración: acompaña la firmeza de los tejidos, la coloración, la acumulación de azúcares (Brix) y la conservación de los frutos.',
          ],
        },
        { type: 'heading', text: 'Una nutrición de precisión para cada etapa del ciclo de cultivo' },
        {
          type: 'paragraph',
          text: 'Integrar las formulaciones WSL en su programa de riego o de pulverización permite adaptar con precisión la nutrición a las necesidades reales del cultivo.',
        },
        { type: 'paragraph', text: 'Para una eficacia óptima:' },
        {
          type: 'list',
          items: [
            'Identifique con precisión la fase fisiológica del cultivo.',
            'Respete las recomendaciones de dosis y de aplicación.',
            'Ajuste los aportes según el desarrollo y las necesidades de la planta.',
            'Siga con regularidad la respuesta del cultivo.',
          ],
        },
        {
          type: 'closing',
          text: 'Micro Input – Macro Impact: el máximo impacto agronómico gracias a la precisión, la eficiencia y una tecnología nutricional innovadora.',
        },
      ],
    },
    nl: {
      eyebrow: 'HIGH END NPK',
      title: 'HIGH END NPK: unieke WSL-formuleringen volgens de MORECO-strategie “Micro Input – Macro Impact”',
      blocks: [
        {
          type: 'paragraph',
          text: 'Onze unieke HIGH END NPK-formuleringen zijn ontwikkeld om de agronomische impact te maximaliseren door een gericht, efficiënt en beheerst gebruik van voedingsstoffen.',
        },
        {
          type: 'paragraph',
          text: 'Ons WSL-gamma is een nieuwe generatie gespecialiseerde formuleringen Powered by OSA, ontwikkeld om de voedingsefficiëntie te maximaliseren en tegelijk een nauwkeurige, gecontroleerde toepassing mogelijk te maken.',
        },
        {
          type: 'paragraph',
          text: 'Dankzij hun geavanceerde moleculaire technologie en hoge concentratie maken ze essentiële voedingsstoffen gericht beschikbaar op het moment dat de plant ze het meest nodig heeft.',
        },
        { type: 'heading', text: 'Waarom kiezen voor onze HIGH END NPK-formuleringen?' },
        {
          type: 'paragraph',
          text: 'Onze WSL-formuleringen optimaliseren het gebruik van stikstof, fosfor en kalium tijdens de verschillende ontwikkelingsfasen van het gewas.',
        },
        { type: 'paragraph', text: 'Belangrijkste voordelen:' },
        {
          type: 'list',
          items: [
            'Een hoge beschikbaarheid van voedingsstoffen, voor een efficiënte benutting door de plant.',
            'Een hoge voedingsefficiëntie bij beheerste doseringen.',
            '100% oplosbare en opneembare formuleringen, ontwikkeld als zeer zuivere voedingsoplossingen voor moderne irrigatie- en fertigatiesystemen.',
            'Voeding die is afgestemd op de verschillende fysiologische fasen van het gewas.',
            'Precisievoeding die elke fase van de groeicyclus gericht ondersteunt.',
          ],
        },
        { type: 'heading', text: 'HIGH END NPK: een gespecialiseerde formulering voor elke belangrijke groeifase' },
        {
          type: 'paragraph',
          text: 'Elke WSL-formulering beantwoordt aan de specifieke behoeften van de plant op een precies moment in haar ontwikkeling.',
        },
        {
          type: 'list',
          items: [
            'Startfase: bevordert een krachtig wortelstelsel en een snelle, gelijkmatige start van de groei.',
            'Bloei en vruchtzetting: ondersteunt de bloei, de bloemdifferentiatie en de vruchtontwikkeling.',
            'Vruchtontwikkeling – bladbespuiting & fertigatie: ondersteunt de fotosynthese, het suikertransport en een gelijkmatige vruchtontwikkeling.',
            'Afrijping: ondersteunt de stevigheid van het weefsel, de kleuring, de suikeropbouw (Brix) en de houdbaarheid van de vruchten.',
          ],
        },
        { type: 'heading', text: 'Precisievoeding voor elke fase van de teeltcyclus' },
        {
          type: 'paragraph',
          text: 'Door WSL-formuleringen in uw irrigatie- of spuitprogramma op te nemen, stemt u de voeding precies af op de werkelijke behoeften van het gewas.',
        },
        { type: 'paragraph', text: 'Voor een optimale werking:' },
        {
          type: 'list',
          items: [
            'Bepaal nauwkeurig de fysiologische fase van het gewas.',
            'Volg de dosering- en toepassingsadviezen.',
            'Stem de giften af op de ontwikkeling en de behoeften van de plant.',
            'Volg de reactie van het gewas regelmatig op.',
          ],
        },
        {
          type: 'closing',
          text: 'Micro Input – Macro Impact: maximale agronomische impact dankzij precisie, efficiëntie en innovatieve voedingstechnologie.',
        },
      ],
    },
  },

  disinfectant: {
    fr: {
      eyebrow: 'Désinfection',
      title: 'Désinfection : une hygiène maîtrisée pour l’eau, les installations et les cultures',
      blocks: [
        {
          type: 'paragraph',
          text: 'La qualité de l’eau et l’hygiène des installations sont essentielles à une production agricole moderne et performante.',
        },
        {
          type: 'paragraph',
          text: 'Nos solutions de désinfection sont conçues pour contribuer à maîtriser les bactéries, virus et micro-organismes indésirables et à optimiser l’hygiène des systèmes d’eau et d’irrigation.',
        },
        {
          type: 'paragraph',
          text: 'Deux formulations spécialisées agissent comme activateurs du peroxyde d’hydrogène, renforçant ainsi son pouvoir oxydant et son efficacité nettoyante.',
        },
        { type: 'paragraph', text: 'Elles contribuent notamment à :' },
        {
          type: 'list',
          items: [
            'Un nettoyage efficace des systèmes d’irrigation.',
            'Une action ciblée contre les biofilms persistants.',
            'Une meilleure maîtrise de l’hygiène et de la qualité de l’eau.',
            'Une dégradation complète sans résidu.',
            'Une utilisation simple et efficace dans les systèmes de production professionnels.',
          ],
        },
        {
          type: 'closing',
          text: 'De l’eau au système d’irrigation : une hygiène maîtrisée pour une production fiable et durable.',
        },
      ],
    },
    en: {
      eyebrow: 'Disinfection',
      title: 'Disinfection: controlled hygiene for water, installations and crops',
      blocks: [
        {
          type: 'paragraph',
          text: 'Water quality and the hygiene of installations are essential to modern, high-performing agricultural production.',
        },
        {
          type: 'paragraph',
          text: 'Our disinfection solutions are designed to help control bacteria, viruses and unwanted micro-organisms and to optimise the hygiene of water and irrigation systems.',
        },
        {
          type: 'paragraph',
          text: 'Two specialised formulations act as hydrogen peroxide activators, strengthening its oxidising power and cleaning efficiency.',
        },
        { type: 'paragraph', text: 'Among other things, they contribute to:' },
        {
          type: 'list',
          items: [
            'Effective cleaning of irrigation systems.',
            'Targeted action against persistent biofilms.',
            'Better control of hygiene and water quality.',
            'Complete breakdown, with no residue.',
            'Simple, effective use in professional production systems.',
          ],
        },
        {
          type: 'closing',
          text: 'From the water to the irrigation system: controlled hygiene for reliable, sustainable production.',
        },
      ],
    },
    es: {
      eyebrow: 'Desinfección',
      title: 'Desinfección: una higiene controlada para el agua, las instalaciones y los cultivos',
      blocks: [
        {
          type: 'paragraph',
          text: 'La calidad del agua y la higiene de las instalaciones son esenciales para una producción agrícola moderna y eficiente.',
        },
        {
          type: 'paragraph',
          text: 'Nuestras soluciones de desinfección están diseñadas para ayudar a controlar las bacterias, los virus y los microorganismos no deseados y optimizar la higiene de los sistemas de agua y de riego.',
        },
        {
          type: 'paragraph',
          text: 'Dos formulaciones especializadas actúan como activadores del peróxido de hidrógeno, reforzando así su poder oxidante y su eficacia limpiadora.',
        },
        { type: 'paragraph', text: 'Contribuyen en particular a:' },
        {
          type: 'list',
          items: [
            'Una limpieza eficaz de los sistemas de riego.',
            'Una acción específica contra las biopelículas persistentes.',
            'Un mejor control de la higiene y de la calidad del agua.',
            'Una degradación completa sin residuos.',
            'Un uso sencillo y eficaz en los sistemas de producción profesionales.',
          ],
        },
        {
          type: 'closing',
          text: 'Del agua al sistema de riego: una higiene controlada para una producción fiable y sostenible.',
        },
      ],
    },
    nl: {
      eyebrow: 'Desinfectie',
      title: 'Desinfectie: beheerste hygiëne voor water, installaties en gewassen',
      blocks: [
        {
          type: 'paragraph',
          text: 'Waterkwaliteit en de hygiëne van installaties zijn essentieel voor een moderne, goed presterende landbouwproductie.',
        },
        {
          type: 'paragraph',
          text: 'Onze desinfectieoplossingen helpen bacteriën, virussen en ongewenste micro-organismen te beheersen en de hygiëne van water- en irrigatiesystemen te optimaliseren.',
        },
        {
          type: 'paragraph',
          text: 'Twee gespecialiseerde formuleringen werken als activatoren van waterstofperoxide en versterken zo de oxiderende kracht en de reinigende werking ervan.',
        },
        { type: 'paragraph', text: 'Ze dragen onder meer bij aan:' },
        {
          type: 'list',
          items: [
            'Een doeltreffende reiniging van irrigatiesystemen.',
            'Een gerichte werking tegen hardnekkige biofilms.',
            'Een betere beheersing van de hygiëne en de waterkwaliteit.',
            'Een volledige afbraak zonder residu.',
            'Een eenvoudig en doeltreffend gebruik in professionele productiesystemen.',
          ],
        },
        {
          type: 'closing',
          text: 'Van het water tot het irrigatiesysteem: beheerste hygiëne voor een betrouwbare en duurzame productie.',
        },
      ],
    },
  },
};

export const familyNote = (key: FamilyNoteKey, locale: Locale): FamilyNoteContent => NOTES[key][locale];
