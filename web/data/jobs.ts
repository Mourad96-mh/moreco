import type { Locale } from '@/i18n/config';

/**
 * Careers > Postes vacants — briefing of 2026-10-22, four openings at Moreco Maroc.
 * The client wrote the French, text and layout (the facts first, then description,
 * missions, profile and offer); EN, ES and NL are ours and are listed in
 * TRADUCTIONS-A-VALIDER.md. Apostrophes are set typographically, as on the rest of the site.
 *
 * An opening that is filled comes off this list; an empty list hides the section.
 */
export interface Job {
  slug: string;
  title: string;
  /** The lines above the description, in the client's order and with their labels. */
  facts: { label: string; value: string }[];
  description: string;
  missions: string[];
  profile: string[];
  offer: string[];
  /** A remark under the offer, e.g. that no bonus applies. */
  note?: string;
}

const JOBS: Record<Locale, Job[]> = {
  fr: [
    {
      slug: 'senior-key-account-manager',
      title: 'Senior Key Account Manager (H/F) – Région d’expertise Agadir',
      facts: [
        { label: 'Lieu de travail fixe', value: 'Casablanca (avec des déplacements nationaux dans différentes régions)' },
        { label: 'Expérience', value: 'Minimum 5 ans d’expérience pertinente' },
        { label: 'Région cible', value: 'Agadir (grands domaines agricoles)' },
      ],
      description:
        'En tant que Senior Key Account Manager, vous êtes la figure de proue commerciale et stratégique de Moreco. Vous possédez une connaissance approfondie et actualisée des produits nationaux et des cultures (cultures agricoles) et vous êtes pleinement conscient des problèmes agricoles locaux auxquels les producteurs sont confrontés au quotidien. Depuis votre lieu de travail fixe à Casablanca, vous pilotez l’expansion commerciale via des déplacements nationaux dans différentes régions. Vous vous concentrez sur la conclusion de partenariats stratégiques avec les grands domaines et vous dirigez l’équipe de Techniciens Commerciaux avec une focalisation absolue sur les résultats.',
      missions: [
        'Gestion commerciale, prospection et gestion stratégique des relations avec les grands domaines agricoles via des déplacements nationaux.',
        'Diriger, former et accompagner l’équipe de Techniciens Commerciaux vers les résultats ; vous les motivez à dépasser les objectifs.',
        'Analyser les défis agricoles locaux et proposer les produits Moreco comme la solution commerciale directe à ces problèmes.',
      ],
      profile: [
        'Minimum 5 ans d’expérience démontrée et réussie dans une fonction commerciale senior ou de management au sein du secteur agricole.',
        'Très forte fibre commerciale : vous êtes axé sur les résultats de manière démontrée et habitué à travailler avec des objectifs de vente stricts.',
        'Expertise agricole approfondie : connaissance absolue des cultures nationales, des récoltes, des produits et de la problématique agricole locale spécifique (comme dans la région d’Agadir).',
        'Leadership fort et capacité à coacher à distance une équipe commerciale de terrain vers le succès.',
        'Maîtrise courante du français et de l’arabe, et bonne connaissance de l’anglais pour la communication professionnelle.',
      ],
      offer: [
        'Un contrat à durée indéterminée (CDI).',
        'Un salaire basé sur votre expérience (à discuter).',
        'Une assurance maladie complémentaire (Mutuelle complémentaire).',
        'Une prime annuelle fixe liée à l’atteinte des objectifs.',
      ],
    },
    {
      slug: 'technicien-commercial',
      title: 'Technicien Commercial (H/F) – 5 postes',
      facts: [
        { label: 'Régions', value: '3 postes pour la région d’Agadir / 2 postes pour la région de Casablanca - Gharb' },
        { label: 'Expérience', value: 'Minimum 5 ans d’expérience' },
        { label: 'Nombre de postes', value: '5' },
      ],
      description:
        'Pour renforcer notre équipe de terrain, nous recherchons cinq Techniciens Commerciaux expérimentés et axés sur les résultats. Dans ce rôle, vous êtes le maillon crucial sur le terrain entre la technique et la vente pure. Vous êtes parfaitement au fait des produits et des cultures nationales et vous comprenez mieux que quiconque les problèmes agricoles locaux des agriculteurs de votre région. Grâce à vos solides compétences commerciales, vous ne vous contentez pas de conseiller, mais vous traduisez cela directement en chiffres de vente concrets afin d’atteindre vos objectifs.',
      missions: [
        'Vente active, prospection et développement commercial du portefeuille clients sur le terrain.',
        'Diagnostiquer les problèmes agricoles locaux chez le client et vendre directement les produits Moreco adéquats comme solution.',
        'Réaliser et dépasser les objectifs de vente individuels et régionaux (targets).',
        'Reporting précis des résultats de vente et des mouvements du marché auprès du Key Account Manager.',
      ],
      profile: [
        'Minimum 5 ans d’expérience démontrée en tant que Technicien Commercial dans le secteur agricole avec de solides résultats de vente.',
        'Un profil commercial très fort avec une attitude axée sur la performance et les objectifs.',
        'Connaissance approfondie et actualisée des cultures nationales, des récoltes, des produits agricoles et des problèmes agricoles spécifiques par région.',
        'Excellentes compétences en négociation, force de persuasion et attitude proactive sur le terrain.',
      ],
      offer: [
        'Un contrat à durée indéterminée (CDI).',
        'Un salaire basé sur votre expérience (à discuter).',
        'Une assurance maladie complémentaire (Mutuelle complémentaire).',
        'Une prime annuelle fixe liée à l’atteinte des objectifs (structure de bonus/commission attractive basée sur votre succès commercial).',
      ],
    },
    {
      slug: 'office-manager',
      title: 'Office Manager / Secrétaire Expérimentée (H/F)',
      facts: [
        { label: 'Lieu de travail', value: 'Lieu de travail fixe à Casablanca' },
        { label: 'Expérience', value: 'Minimum 5 ans d’expérience' },
      ],
      description:
        'Nous recherchons une Office Manager / Secrétaire organisée et représentative pour assurer la bonne marche de notre siège social à Casablanca. Dans ce rôle clé, vous êtes la colonne vertébrale administrative de l’organisation. Vous gérez les agendas, soutenez la direction et êtes le point de contact central pour la communication interne et externe.',
      missions: [
        'Office management général et optimisation des processus administratifs.',
        'Gestion des agendas, préparation des réunions et correspondance.',
        'Accueil des clients et gestion des appels téléphoniques.',
      ],
      profile: [
        'Minimum 5 ans d’expérience dans une fonction administrative ou de secrétariat similaire.',
        'Excellentes compétences organisationnelles et souci du détail.',
        'Maîtrise des langues de travail requises (Français/Arabe).',
      ],
      offer: [
        'Un contrat à durée indéterminée (CDI).',
        'Un salaire basé sur votre expérience (à discuter).',
        'Excellentes conditions secondaires incluant une assurance maladie complémentaire (Mutuelle complémentaire).',
      ],
    },
    {
      slug: 'social-media-content-expert',
      title: 'Senior Social Media & Content Creation Expert (H/F)',
      facts: [
        { label: 'Lieu de travail', value: 'Lieu de travail fixe à Casablanca' },
        { label: 'Expérience', value: 'Minimum 5 ans d’expérience démontrée' },
      ],
      description:
        'Nous recherchons un Senior Social Media & Content Creation Expert créatif et stratégique pour propulser notre visibilité digitale à un niveau supérieur. Dans ce rôle, vous êtes responsable de l’identité en ligne complète de Moreco. Vous concevez la stratégie de médias sociaux et êtes le moteur de la création de contenus visuels et textuels (photo, vidéo, copy) afin de booster nos leads commerciaux.',
      missions: [
        'Développer, implémenter et gérer la stratégie de médias sociaux (LinkedIn, Facebook, Instagram).',
        'Produire et éditer de manière autonome du contenu de haute qualité (visuels graphiques, vidéos, reels et copy).',
        'Analyser les résultats des campagnes (KPIs) et générer des leads en ligne pour l’équipe commerciale.',
      ],
      profile: [
        'Minimum 5 ans d’expérience en gestion de médias sociaux et en création de contenu professionnel.',
        'Excellente maîtrise des outils de design et de vidéo (Adobe Photoshop, Illustrator, Canva, CapCut).',
        'Maîtrise courante du français, très bonne connaissance de l’arabe et bonne connaissance de l’anglais pour la communication de base.',
      ],
      offer: [
        'Un contrat à durée indéterminée (CDI).',
        'Un salaire basé sur votre expérience (à discuter).',
        'Inclus une assurance maladie complémentaire (Mutuelle complémentaire).',
        'Une prime annuelle fixe liée à l’atteinte des objectifs.',
      ],
    },
  ],
  en: [
    {
      slug: 'senior-key-account-manager',
      title: 'Senior Key Account Manager (M/F) – Agadir region expertise',
      facts: [
        { label: 'Fixed place of work', value: 'Casablanca (with travel to regions across Morocco)' },
        { label: 'Experience', value: 'At least 5 years of relevant experience' },
        { label: 'Target region', value: 'Agadir (large farming estates)' },
      ],
      description:
        'As Senior Key Account Manager, you are the commercial and strategic figurehead of Moreco. You have in-depth, up-to-date knowledge of the products and crops grown in Morocco, and you are fully aware of the local agricultural problems growers face every day. From your fixed place of work in Casablanca, you drive commercial expansion through travel to regions across the country. You focus on closing strategic partnerships with large estates and you lead the team of Sales Technicians with an absolute focus on results.',
      missions: [
        'Sales management, prospecting and strategic relationship management with large farming estates, travelling across the country.',
        'Leading, training and coaching the team of Sales Technicians towards results; you motivate them to exceed their targets.',
        'Analysing local agricultural challenges and putting forward Moreco products as the direct commercial solution to them.',
      ],
      profile: [
        'At least 5 years of proven, successful experience in a senior sales or management role in the agricultural sector.',
        'A very strong commercial drive: you have a proven focus on results and are used to working with strict sales targets.',
        'In-depth agricultural expertise: thorough knowledge of Moroccan crops, harvests, products and the specific local agricultural issues (as in the Agadir region).',
        'Strong leadership and the ability to coach a field sales team to success remotely.',
        'Fluent French and Arabic, and good English for professional communication.',
      ],
      offer: [
        'A permanent contract (CDI).',
        'A salary based on your experience (to be discussed).',
        'Supplementary health insurance (mutuelle).',
        'A fixed annual bonus linked to meeting targets.',
      ],
    },
    {
      slug: 'technicien-commercial',
      title: 'Sales Technician (M/F) – 5 positions',
      facts: [
        { label: 'Regions', value: '3 positions in the Agadir region / 2 positions in the Casablanca - Gharb region' },
        { label: 'Experience', value: 'At least 5 years of experience' },
        { label: 'Number of positions', value: '5' },
      ],
      description:
        'To strengthen our field team, we are looking for five experienced, results-driven Sales Technicians. In this role, you are the crucial link in the field between technical expertise and pure sales. You know the products and crops of Morocco inside out, and you understand the local agricultural problems of the farmers in your region better than anyone. With your strong sales skills, you do not just advise: you turn that advice directly into concrete sales figures to reach your targets.',
      missions: [
        'Active selling, prospecting and growing the customer portfolio in the field.',
        'Diagnosing local agricultural problems at the customer’s and directly selling the right Moreco products as the solution.',
        'Meeting and exceeding individual and regional sales targets.',
        'Accurate reporting of sales results and market movements to the Key Account Manager.',
      ],
      profile: [
        'At least 5 years of proven experience as a Sales Technician in the agricultural sector, with strong sales results.',
        'A very strong sales profile with an attitude focused on performance and targets.',
        'In-depth, up-to-date knowledge of Moroccan crops, harvests, agricultural products and the specific agricultural problems of each region.',
        'Excellent negotiation skills, persuasiveness and a proactive attitude in the field.',
      ],
      offer: [
        'A permanent contract (CDI).',
        'A salary based on your experience (to be discussed).',
        'Supplementary health insurance (mutuelle).',
        'A fixed annual bonus linked to meeting targets (an attractive bonus/commission structure based on your sales success).',
      ],
    },
    {
      slug: 'office-manager',
      title: 'Office Manager / Experienced Secretary (M/F)',
      facts: [
        { label: 'Place of work', value: 'Fixed place of work in Casablanca' },
        { label: 'Experience', value: 'At least 5 years of experience' },
      ],
      description:
        'We are looking for an organised, presentable Office Manager / Secretary to keep our head office in Casablanca running smoothly. In this key role, you are the administrative backbone of the organisation. You manage diaries, support the management team and are the central point of contact for internal and external communication.',
      missions: [
        'General office management and streamlining of administrative processes.',
        'Managing diaries, preparing meetings and handling correspondence.',
        'Welcoming customers and handling telephone calls.',
      ],
      profile: [
        'At least 5 years of experience in a similar administrative or secretarial role.',
        'Excellent organisational skills and attention to detail.',
        'Command of the required working languages (French/Arabic).',
      ],
      offer: [
        'A permanent contract (CDI).',
        'A salary based on your experience (to be discussed).',
        'Excellent benefits, including supplementary health insurance (mutuelle).',
      ],
    },
    {
      slug: 'social-media-content-expert',
      title: 'Senior Social Media & Content Creation Expert (M/F)',
      facts: [
        { label: 'Place of work', value: 'Fixed place of work in Casablanca' },
        { label: 'Experience', value: 'At least 5 years of proven experience' },
      ],
      description:
        'We are looking for a creative, strategic Senior Social Media & Content Creation Expert to take our digital visibility to the next level. In this role, you are responsible for Moreco’s entire online identity. You design the social media strategy and drive the creation of visual and written content (photo, video, copy) to boost our sales leads.',
      missions: [
        'Developing, implementing and managing the social media strategy (LinkedIn, Facebook, Instagram).',
        'Independently producing and editing high-quality content (graphics, videos, reels and copy).',
        'Analysing campaign results (KPIs) and generating online leads for the sales team.',
      ],
      profile: [
        'At least 5 years of experience in social media management and professional content creation.',
        'Excellent command of design and video tools (Adobe Photoshop, Illustrator, Canva, CapCut).',
        'Fluent French, very good Arabic and good English for basic communication.',
      ],
      offer: [
        'A permanent contract (CDI).',
        'A salary based on your experience (to be discussed).',
        'Supplementary health insurance (mutuelle) included.',
        'A fixed annual bonus linked to meeting targets.',
      ],
    },
  ],
  es: [
    {
      slug: 'senior-key-account-manager',
      title: 'Senior Key Account Manager (H/M) – Experiencia en la región de Agadir',
      facts: [
        { label: 'Lugar de trabajo fijo', value: 'Casablanca (con desplazamientos por distintas regiones del país)' },
        { label: 'Experiencia', value: 'Mínimo 5 años de experiencia pertinente' },
        { label: 'Región objetivo', value: 'Agadir (grandes explotaciones agrícolas)' },
      ],
      description:
        'Como Senior Key Account Manager, usted es la figura comercial y estratégica de referencia de Moreco. Tiene un conocimiento profundo y actualizado de los productos y cultivos del país y es plenamente consciente de los problemas agrícolas locales a los que se enfrentan los productores cada día. Desde su lugar de trabajo fijo en Casablanca, impulsa la expansión comercial mediante desplazamientos por distintas regiones del país. Se centra en cerrar alianzas estratégicas con las grandes explotaciones y dirige el equipo de Técnicos Comerciales con un enfoque absoluto en los resultados.',
      missions: [
        'Gestión comercial, prospección y gestión estratégica de las relaciones con las grandes explotaciones agrícolas mediante desplazamientos por el país.',
        'Dirigir, formar y acompañar al equipo de Técnicos Comerciales hacia los resultados; los motiva para superar los objetivos.',
        'Analizar los retos agrícolas locales y proponer los productos Moreco como la solución comercial directa a esos problemas.',
      ],
      profile: [
        'Mínimo 5 años de experiencia demostrada y exitosa en un puesto comercial sénior o de dirección en el sector agrícola.',
        'Muy fuerte vocación comercial: orientación demostrada a los resultados y costumbre de trabajar con objetivos de venta estrictos.',
        'Profunda experiencia agrícola: conocimiento absoluto de los cultivos del país, las cosechas, los productos y la problemática agrícola local específica (como en la región de Agadir).',
        'Fuerte liderazgo y capacidad para guiar a distancia a un equipo comercial de campo hacia el éxito.',
        'Dominio fluido del francés y del árabe, y buen nivel de inglés para la comunicación profesional.',
      ],
      offer: [
        'Un contrato indefinido (CDI).',
        'Un salario según su experiencia (a negociar).',
        'Un seguro médico complementario (mutua complementaria).',
        'Una prima anual fija vinculada al cumplimiento de objetivos.',
      ],
    },
    {
      slug: 'technicien-commercial',
      title: 'Técnico Comercial (H/M) – 5 puestos',
      facts: [
        { label: 'Regiones', value: '3 puestos en la región de Agadir / 2 puestos en la región de Casablanca - Gharb' },
        { label: 'Experiencia', value: 'Mínimo 5 años de experiencia' },
        { label: 'Número de puestos', value: '5' },
      ],
      description:
        'Para reforzar nuestro equipo de campo, buscamos cinco Técnicos Comerciales con experiencia y orientados a los resultados. En este puesto, usted es el eslabón decisivo sobre el terreno entre la técnica y la venta pura. Conoce a fondo los productos y cultivos del país y entiende mejor que nadie los problemas agrícolas locales de los agricultores de su región. Gracias a sus sólidas competencias comerciales, no se limita a asesorar: lo traduce directamente en cifras de venta concretas para alcanzar sus objetivos.',
      missions: [
        'Venta activa, prospección y desarrollo comercial de la cartera de clientes sobre el terreno.',
        'Diagnosticar los problemas agrícolas locales en casa del cliente y vender directamente los productos Moreco adecuados como solución.',
        'Cumplir y superar los objetivos de venta individuales y regionales.',
        'Reporting preciso de los resultados de venta y de los movimientos del mercado al Key Account Manager.',
      ],
      profile: [
        'Mínimo 5 años de experiencia demostrada como Técnico Comercial en el sector agrícola, con sólidos resultados de venta.',
        'Un perfil comercial muy fuerte, con una actitud orientada al rendimiento y a los objetivos.',
        'Conocimiento profundo y actualizado de los cultivos del país, las cosechas, los productos agrícolas y los problemas agrícolas específicos de cada región.',
        'Excelentes dotes de negociación, capacidad de persuasión y actitud proactiva sobre el terreno.',
      ],
      offer: [
        'Un contrato indefinido (CDI).',
        'Un salario según su experiencia (a negociar).',
        'Un seguro médico complementario (mutua complementaria).',
        'Una prima anual fija vinculada al cumplimiento de objetivos (atractiva estructura de bonus/comisiones basada en su éxito comercial).',
      ],
    },
    {
      slug: 'office-manager',
      title: 'Office Manager / Secretaria con experiencia (H/M)',
      facts: [
        { label: 'Lugar de trabajo', value: 'Lugar de trabajo fijo en Casablanca' },
        { label: 'Experiencia', value: 'Mínimo 5 años de experiencia' },
      ],
      description:
        'Buscamos una Office Manager / Secretaria organizada y con buena presencia para garantizar el buen funcionamiento de nuestra sede en Casablanca. En este puesto clave, usted es la columna vertebral administrativa de la organización. Gestiona las agendas, da apoyo a la dirección y es el punto de contacto central para la comunicación interna y externa.',
      missions: [
        'Office management general y optimización de los procesos administrativos.',
        'Gestión de agendas, preparación de reuniones y correspondencia.',
        'Recepción de clientes y atención de llamadas telefónicas.',
      ],
      profile: [
        'Mínimo 5 años de experiencia en un puesto administrativo o de secretariado similar.',
        'Excelentes dotes organizativas y atención al detalle.',
        'Dominio de los idiomas de trabajo requeridos (francés/árabe).',
      ],
      offer: [
        'Un contrato indefinido (CDI).',
        'Un salario según su experiencia (a negociar).',
        'Excelentes beneficios sociales, incluido un seguro médico complementario (mutua complementaria).',
      ],
    },
    {
      slug: 'social-media-content-expert',
      title: 'Senior Social Media & Content Creation Expert (H/M)',
      facts: [
        { label: 'Lugar de trabajo', value: 'Lugar de trabajo fijo en Casablanca' },
        { label: 'Experiencia', value: 'Mínimo 5 años de experiencia demostrada' },
      ],
      description:
        'Buscamos un Senior Social Media & Content Creation Expert creativo y estratégico para llevar nuestra visibilidad digital a un nivel superior. En este puesto, usted es responsable de toda la identidad en línea de Moreco. Diseña la estrategia de redes sociales e impulsa la creación de contenidos visuales y escritos (foto, vídeo, copy) para aumentar nuestros leads comerciales.',
      missions: [
        'Desarrollar, implementar y gestionar la estrategia de redes sociales (LinkedIn, Facebook, Instagram).',
        'Producir y editar de forma autónoma contenido de alta calidad (piezas gráficas, vídeos, reels y copy).',
        'Analizar los resultados de las campañas (KPI) y generar leads en línea para el equipo comercial.',
      ],
      profile: [
        'Mínimo 5 años de experiencia en gestión de redes sociales y creación de contenido profesional.',
        'Excelente dominio de las herramientas de diseño y vídeo (Adobe Photoshop, Illustrator, Canva, CapCut).',
        'Dominio fluido del francés, muy buen nivel de árabe y buen nivel de inglés para la comunicación básica.',
      ],
      offer: [
        'Un contrato indefinido (CDI).',
        'Un salario según su experiencia (a negociar).',
        'Seguro médico complementario (mutua complementaria) incluido.',
        'Una prima anual fija vinculada al cumplimiento de objetivos.',
      ],
    },
  ],
  nl: [
    {
      slug: 'senior-key-account-manager',
      title: 'Senior Key Account Manager (m/v) – Expertiseregio Agadir',
      facts: [
        { label: 'Vaste standplaats', value: 'Casablanca (met reizen naar verschillende regio’s in het land)' },
        { label: 'Ervaring', value: 'Minimaal 5 jaar relevante ervaring' },
        { label: 'Doelregio', value: 'Agadir (grote landbouwbedrijven)' },
      ],
      description:
        'Als Senior Key Account Manager ben je het commerciële en strategische boegbeeld van Moreco. Je hebt een grondige, actuele kennis van de producten en gewassen in Marokko en je bent je volledig bewust van de lokale landbouwproblemen waar telers dagelijks mee te maken hebben. Vanuit je vaste standplaats in Casablanca stuur je de commerciële groei aan, met reizen naar verschillende regio’s in het land. Je richt je op het sluiten van strategische partnerschappen met grote landbouwbedrijven en je leidt het team van Commercieel Technici met een absolute focus op resultaat.',
      missions: [
        'Commercieel beheer, prospectie en strategisch relatiebeheer met grote landbouwbedrijven, met reizen door het hele land.',
        'Het team van Commercieel Technici aansturen, opleiden en begeleiden naar resultaat; je motiveert hen om de doelstellingen te overtreffen.',
        'Lokale landbouwuitdagingen analyseren en Moreco-producten aanbieden als de directe commerciële oplossing voor die problemen.',
      ],
      profile: [
        'Minimaal 5 jaar aantoonbare en succesvolle ervaring in een senior commerciële of leidinggevende functie in de landbouwsector.',
        'Een zeer sterke commerciële drive: je bent aantoonbaar resultaatgericht en gewend te werken met strikte verkoopdoelstellingen.',
        'Grondige landbouwexpertise: diepgaande kennis van de Marokkaanse gewassen, oogsten, producten en de specifieke lokale landbouwproblematiek (zoals in de regio Agadir).',
        'Sterk leiderschap en het vermogen om een commercieel buitendienstteam op afstand naar succes te coachen.',
        'Vloeiend Frans en Arabisch, en een goede kennis van het Engels voor zakelijke communicatie.',
      ],
      offer: [
        'Een contract voor onbepaalde tijd (CDI).',
        'Een salaris op basis van je ervaring (bespreekbaar).',
        'Een aanvullende ziektekostenverzekering (mutuelle).',
        'Een vaste jaarlijkse bonus gekoppeld aan het behalen van de doelstellingen.',
      ],
    },
    {
      slug: 'technicien-commercial',
      title: 'Commercieel Technicus (m/v) – 5 vacatures',
      facts: [
        { label: 'Regio’s', value: '3 vacatures in de regio Agadir / 2 vacatures in de regio Casablanca - Gharb' },
        { label: 'Ervaring', value: 'Minimaal 5 jaar ervaring' },
        { label: 'Aantal vacatures', value: '5' },
      ],
      description:
        'Ter versterking van ons buitendienstteam zoeken we vijf ervaren en resultaatgerichte Commercieel Technici. In deze rol ben je in het veld de cruciale schakel tussen techniek en pure verkoop. Je kent de producten en gewassen van Marokko door en door, en je begrijpt de lokale landbouwproblemen van de boeren in jouw regio als geen ander. Dankzij je sterke commerciële vaardigheden blijf je niet bij advies: je vertaalt het rechtstreeks naar concrete verkoopcijfers om je doelstellingen te halen.',
      missions: [
        'Actieve verkoop, prospectie en commerciële uitbouw van de klantenportefeuille in het veld.',
        'Lokale landbouwproblemen bij de klant diagnosticeren en direct de juiste Moreco-producten als oplossing verkopen.',
        'Individuele en regionale verkoopdoelstellingen (targets) halen en overtreffen.',
        'Nauwkeurige rapportage van verkoopresultaten en marktontwikkelingen aan de Key Account Manager.',
      ],
      profile: [
        'Minimaal 5 jaar aantoonbare ervaring als Commercieel Technicus in de landbouwsector, met sterke verkoopresultaten.',
        'Een zeer sterk commercieel profiel met een houding gericht op prestaties en doelstellingen.',
        'Grondige, actuele kennis van de Marokkaanse gewassen, oogsten, landbouwproducten en de specifieke landbouwproblemen per regio.',
        'Uitstekende onderhandelingsvaardigheden, overtuigingskracht en een proactieve houding in het veld.',
      ],
      offer: [
        'Een contract voor onbepaalde tijd (CDI).',
        'Een salaris op basis van je ervaring (bespreekbaar).',
        'Een aanvullende ziektekostenverzekering (mutuelle).',
        'Een vaste jaarlijkse bonus gekoppeld aan het behalen van de doelstellingen (aantrekkelijke bonus-/commissiestructuur op basis van je commerciële succes).',
      ],
    },
    {
      slug: 'office-manager',
      title: 'Officemanager / Ervaren Secretaresse (m/v)',
      facts: [
        { label: 'Standplaats', value: 'Vaste standplaats in Casablanca' },
        { label: 'Ervaring', value: 'Minimaal 5 jaar ervaring' },
      ],
      description:
        'We zoeken een georganiseerde en representatieve Officemanager / Secretaresse die zorgt dat ons hoofdkantoor in Casablanca soepel draait. In deze sleutelrol ben je de administratieve ruggengraat van de organisatie. Je beheert de agenda’s, ondersteunt de directie en bent het centrale aanspreekpunt voor interne en externe communicatie.',
      missions: [
        'Algemeen officemanagement en optimalisatie van de administratieve processen.',
        'Agendabeheer, voorbereiding van vergaderingen en correspondentie.',
        'Ontvangst van klanten en afhandeling van telefoongesprekken.',
      ],
      profile: [
        'Minimaal 5 jaar ervaring in een vergelijkbare administratieve of secretariële functie.',
        'Uitstekende organisatorische vaardigheden en oog voor detail.',
        'Beheersing van de vereiste werktalen (Frans/Arabisch).',
      ],
      offer: [
        'Een contract voor onbepaalde tijd (CDI).',
        'Een salaris op basis van je ervaring (bespreekbaar).',
        'Uitstekende secundaire arbeidsvoorwaarden, waaronder een aanvullende ziektekostenverzekering (mutuelle).',
      ],
    },
    {
      slug: 'social-media-content-expert',
      title: 'Senior Social Media & Content Creation Expert (m/v)',
      facts: [
        { label: 'Standplaats', value: 'Vaste standplaats in Casablanca' },
        { label: 'Ervaring', value: 'Minimaal 5 jaar aantoonbare ervaring' },
      ],
      description:
        'We zoeken een creatieve en strategische Senior Social Media & Content Creation Expert die onze digitale zichtbaarheid naar een hoger niveau tilt. In deze rol ben je verantwoordelijk voor de volledige online identiteit van Moreco. Je ontwerpt de socialemediastrategie en bent de drijvende kracht achter de creatie van visuele en tekstuele content (foto, video, copy) om onze commerciële leads te vergroten.',
      missions: [
        'De socialemediastrategie ontwikkelen, implementeren en beheren (LinkedIn, Facebook, Instagram).',
        'Zelfstandig hoogwaardige content produceren en bewerken (grafische beelden, video’s, reels en copy).',
        'Campagneresultaten (KPI’s) analyseren en online leads genereren voor het verkoopteam.',
      ],
      profile: [
        'Minimaal 5 jaar ervaring in socialemediabeheer en professionele contentcreatie.',
        'Uitstekende beheersing van design- en videotools (Adobe Photoshop, Illustrator, Canva, CapCut).',
        'Vloeiend Frans, zeer goed Arabisch en een goede kennis van het Engels voor basiscommunicatie.',
      ],
      offer: [
        'Een contract voor onbepaalde tijd (CDI).',
        'Een salaris op basis van je ervaring (bespreekbaar).',
        'Inclusief een aanvullende ziektekostenverzekering (mutuelle).',
        'Een vaste jaarlijkse bonus gekoppeld aan het behalen van de doelstellingen.',
      ],
    },
  ],
};

export const jobsFor = (locale: Locale): Job[] => JOBS[locale];
