import type { Locale } from '@/i18n/config';
import type { FamilyNoteKey } from './family-notes';

/**
 * Two questions under the green box of three families — briefing of 2026-10-21, point 4.
 * The client wrote the French; EN, ES and NL are ours and are listed in
 * TRADUCTIONS-A-VALIDER.md. Two slips in the French were corrected: "récolte and du
 * transport" (et) and "leur mobility interne" (mobilité).
 *
 * Soil's four questions came on 2026-10-23, French again by the client; its slips were
 * corrected too (see TRADUCTIONS-A-VALIDER.md, section 19).
 *
 * Disinfectant has no questions yet: a family without an entry shows none.
 */
export interface FamilyFaq {
  question: string;
  answer: string;
}

const FAQS: Partial<Record<FamilyNoteKey, Record<Locale, FamilyFaq[]>>> = {
  specialties: {
    fr: [
      {
        question:
          'OrthaGrow Control 4TH permet-il de maintenir la nouaison des tomates lors de stress extrêmes liés à la chaleur et à la sécheresse sous serre ?',
        answer:
          'Oui. OrthaGrow Control 4TH optimise la résilience physiologique de la plante grâce à l’acide orthosilicique stabilisé (OSA) directement assimilable. La formulation régule la conductance stomatique, ce qui minimise la transpiration excessive lors des stress thermiques et hydriques, sans pour autant freiner l’absorption de CO₂. Parallèlement, elle stimule la synthèse de la chlorophylle pour maintenir une photosynthèse active et renforce les parois cellulaires au niveau du pédoncule. Cela empêche efficacement l’avortement des fleurs et des jeunes fruits, garantissant ainsi la fertilité du pollen et une nouaison réussie, même sous des conditions de serre suboptimales.',
      },
      {
        question:
          'Comment OrthaGrow Control 4TH aide-t-il à prévenir le ramollissement et l’éclatement des myrtilles avant la récolte ?',
        answer:
          'Le ramollissement des baies et l’éclatement des fruits résultent d’une structure de paroi cellulaire fragile et d’une instabilité de la pression de turgor. OrthaGrow Control 4TH incorpore une matrice de silicium élastique dans la cuticule et les cellules épidermiques de la myrtille. Cela augmente la résistance mécanique de la peau du fruit, évitant ainsi l’apparition de micro-fissures et l’éclatement dus aux pics d’irrigation ou aux variations de l’humidité ambiante. Cette consolidation cellulaire minimise les dommages mécaniques lors de la récolte et du transport, garantissant des fruits plus fermes, avec une pruine préservée et une durée de conservation (shelf life) considérablement prolongée.',
      },
    ],
    en: [
      {
        question:
          'Does OrthaGrow Control 4TH help greenhouse tomatoes keep setting fruit under extreme heat and drought stress?',
        answer:
          'Yes. OrthaGrow Control 4TH optimises the plant’s physiological resilience with directly assimilable stabilised orthosilicic acid (OSA). The formulation regulates stomatal conductance, which minimises excessive transpiration during heat and water stress without slowing CO₂ uptake. At the same time, it stimulates chlorophyll synthesis to keep photosynthesis active and strengthens the cell walls of the peduncle. This effectively prevents the abortion of flowers and young fruit, safeguarding pollen fertility and successful fruit set, even in suboptimal greenhouse conditions.',
      },
      {
        question: 'How does OrthaGrow Control 4TH help prevent blueberries from softening and splitting before harvest?',
        answer:
          'Berry softening and fruit splitting result from a fragile cell-wall structure and unstable turgor pressure. OrthaGrow Control 4TH builds an elastic silicon matrix into the cuticle and epidermal cells of the blueberry. This increases the mechanical strength of the fruit skin, preventing the micro-cracks and splitting caused by irrigation peaks or changes in ambient humidity. This cellular consolidation minimises mechanical damage during harvest and transport, giving firmer fruit with its bloom preserved and a considerably longer shelf life.',
      },
    ],
    es: [
      {
        question:
          '¿Permite OrthaGrow Control 4TH mantener el cuajado de los tomates en invernadero bajo estrés extremo por calor y sequía?',
        answer:
          'Sí. OrthaGrow Control 4TH optimiza la resiliencia fisiológica de la planta gracias al ácido ortosilícico estabilizado (OSA) directamente asimilable. La formulación regula la conductancia estomática, lo que minimiza la transpiración excesiva durante el estrés térmico e hídrico sin frenar la absorción de CO₂. Al mismo tiempo, estimula la síntesis de clorofila para mantener una fotosíntesis activa y refuerza las paredes celulares a nivel del pedúnculo. Esto evita eficazmente el aborto de flores y frutos jóvenes, garantizando la fertilidad del polen y un cuajado exitoso, incluso en condiciones de invernadero subóptimas.',
      },
      {
        question:
          '¿Cómo ayuda OrthaGrow Control 4TH a prevenir el ablandamiento y el agrietado de los arándanos antes de la cosecha?',
        answer:
          'El ablandamiento de las bayas y el agrietado de los frutos se deben a una estructura frágil de la pared celular y a una presión de turgencia inestable. OrthaGrow Control 4TH incorpora una matriz elástica de silicio en la cutícula y las células epidérmicas del arándano. Esto aumenta la resistencia mecánica de la piel del fruto y evita la aparición de microfisuras y el agrietado provocados por picos de riego o variaciones de la humedad ambiental. Esta consolidación celular minimiza los daños mecánicos durante la cosecha y el transporte, y garantiza frutos más firmes, con la pruina preservada y una vida útil (shelf life) considerablemente prolongada.',
      },
    ],
    nl: [
      {
        question:
          'Helpt OrthaGrow Control 4TH tomaten in de kas om vrucht te blijven zetten bij extreme hitte- en droogtestress?',
        answer:
          'Ja. OrthaGrow Control 4TH optimaliseert de fysiologische weerbaarheid van de plant dankzij direct opneembaar gestabiliseerd orthokiezelzuur (OSA). De formulering reguleert de huidmondjesgeleiding, waardoor overmatige verdamping bij hitte- en waterstress tot een minimum beperkt blijft, zonder de CO₂-opname af te remmen. Tegelijk stimuleert ze de aanmaak van chlorofyl, zodat de fotosynthese actief blijft, en versterkt ze de celwanden van de vruchtsteel. Zo wordt het afstoten van bloemen en jonge vruchten doeltreffend voorkomen en blijven de vruchtbaarheid van het stuifmeel en een geslaagde vruchtzetting gewaarborgd, zelfs onder suboptimale kasomstandigheden.',
      },
      {
        question: 'Hoe helpt OrthaGrow Control 4TH om zacht worden en openbarsten van blauwe bessen vóór de oogst te voorkomen?',
        answer:
          'Zachte bessen en openbarstende vruchten zijn het gevolg van een fragiele celwandstructuur en een instabiele turgordruk. OrthaGrow Control 4TH bouwt een elastische siliciummatrix in de cuticula en de epidermiscellen van de blauwe bes. Dat verhoogt de mechanische sterkte van de schil en voorkomt microscheurtjes en openbarsten door irrigatiepieken of schommelingen in de luchtvochtigheid. Deze celversteviging beperkt mechanische schade bij oogst en transport tot een minimum en zorgt voor stevigere vruchten, met behoud van de waslaag en een aanzienlijk langere houdbaarheid (shelf life).',
      },
    ],
  },

  soil: {
    fr: [
      {
        question: 'Quel est le rôle d’Orthagrow MYCO 4G dans l’amélioration de la santé des racines ?',
        answer:
          'Orthagrow MYCO 4G contient un consortium de haute qualité de mycorhizes vésiculo-arbusculaires (Rhizophagus irregularis, R. clarus et Funneliformis mosseae). Ces champignons bénéfiques créent un réseau racinaire secondaire qui augmente considérablement la surface d’absorption des racines. Cela permet aux cultures d’absorber l’eau et les nutriments essentiels (tels que le phosphore et les micronutriments) de manière beaucoup plus efficace, même dans des conditions difficiles.',
      },
      {
        question:
          'Comment la technologie OSA des produits Orthagrow protège-t-elle le sol et les racines contre le stress abiotique ?',
        answer:
          'La technologie brevetée de Moreco fournit du silicium 100 % biologiquement actif et assimilable (OSA). Au niveau du sol et des racines, cela aide la plante à réguler la pression osmotique. Des produits comme Orthagrow Granulé améliorent le système racinaire en longueur et en poids, ce qui augmente la tolérance des cultures face à la sécheresse extrême, à la chaleur et au stress salin (salinité) du sol.',
      },
      {
        question: 'Comment les amendements de sol Orthagrow contribuent-ils à l’agriculture régénérative ?',
        answer:
          'Selon la vision de Moreco sur l’agriculture régénérative, un sol biologiquement actif est la base d’un système racinaire puissant. Des produits tels qu’Orthagrow Soil Conditioner 4TH optimisent la synergie entre la matrice du sol, la rhizosphère (l’environnement des racines) et la culture. Cela restaure la fertilité naturelle du sol et garantit des cultures physiologiquement supérieures ainsi que des rendements durables à long terme.',
      },
      {
        question:
          'Quel est l’effet d’une matrice de sol saine grâce à Orthagrow sur l’absorption des engrais (NPK) ?',
        answer:
          'Un sol sain et un système racinaire fort garantissent que les macro-éléments apportés (azote, phosphore, potassium) et les micronutriments deviennent pleinement mobiles et assimilables. La technologie OSA de la gamme de produits Orthagrow stimule la capacité d’absorption cellulaire des racines. Cela réduit le lessivage des engrais coûteux et augmente le retour sur investissement de votre nutrition végétale.',
      },
    ],
    en: [
      {
        question: 'What role does Orthagrow MYCO 4G play in improving root health?',
        answer:
          'Orthagrow MYCO 4G contains a high-quality consortium of vesicular-arbuscular mycorrhizae (Rhizophagus irregularis, R. clarus and Funneliformis mosseae). These beneficial fungi build a secondary root network that considerably increases the absorbing surface of the roots. Crops can then take up water and essential nutrients (such as phosphorus and micronutrients) far more efficiently, even in difficult conditions.',
      },
      {
        question: 'How does the OSA technology in Orthagrow products protect soil and roots against abiotic stress?',
        answer:
          'Moreco’s patented technology supplies 100% biologically active, assimilable silicon (OSA). At soil and root level, it helps the plant regulate osmotic pressure. Products such as Orthagrow Granule develop a longer and heavier root system, which raises the crop’s tolerance of extreme drought, heat and salt stress (soil salinity).',
      },
      {
        question: 'How do Orthagrow soil conditioners contribute to regenerative agriculture?',
        answer:
          'In Moreco’s view of regenerative agriculture, a biologically active soil is the foundation of a powerful root system. Products such as Orthagrow Soil Conditioner 4TH optimise the synergy between the soil matrix, the rhizosphere (the root environment) and the crop. This restores the soil’s natural fertility and ensures physiologically superior crops and sustainable yields over the long term.',
      },
      {
        question: 'How does a healthy soil matrix built with Orthagrow affect fertiliser (NPK) uptake?',
        answer:
          'A healthy soil and a strong root system make sure that the macronutrients applied (nitrogen, phosphorus, potassium) and the micronutrients become fully mobile and assimilable. The OSA technology of the Orthagrow range stimulates the cellular uptake capacity of the roots. This reduces the leaching of costly fertilisers and increases the return on your investment in plant nutrition.',
      },
    ],
    es: [
      {
        question: '¿Qué papel desempeña Orthagrow MYCO 4G en la mejora de la salud de las raíces?',
        answer:
          'Orthagrow MYCO 4G contiene un consorcio de alta calidad de micorrizas vesículo-arbusculares (Rhizophagus irregularis, R. clarus y Funneliformis mosseae). Estos hongos beneficiosos crean una red radicular secundaria que aumenta considerablemente la superficie de absorción de las raíces. Así, los cultivos absorben el agua y los nutrientes esenciales (como el fósforo y los micronutrientes) de forma mucho más eficaz, incluso en condiciones difíciles.',
      },
      {
        question:
          '¿Cómo protege la tecnología OSA de los productos Orthagrow el suelo y las raíces frente al estrés abiótico?',
        answer:
          'La tecnología patentada de Moreco aporta silicio 100 % biológicamente activo y asimilable (OSA). En el suelo y las raíces, ayuda a la planta a regular la presión osmótica. Productos como Orthagrow Granulé mejoran el sistema radicular en longitud y en peso, lo que aumenta la tolerancia de los cultivos a la sequía extrema, al calor y al estrés salino (salinidad) del suelo.',
      },
      {
        question: '¿Cómo contribuyen las enmiendas de suelo Orthagrow a la agricultura regenerativa?',
        answer:
          'Según la visión de Moreco sobre la agricultura regenerativa, un suelo biológicamente activo es la base de un sistema radicular potente. Productos como Orthagrow Soil Conditioner 4TH optimizan la sinergia entre la matriz del suelo, la rizosfera (el entorno de las raíces) y el cultivo. Esto restablece la fertilidad natural del suelo y garantiza cultivos fisiológicamente superiores y rendimientos sostenibles a largo plazo.',
      },
      {
        question: '¿Qué efecto tiene una matriz de suelo sana gracias a Orthagrow en la absorción de los fertilizantes (NPK)?',
        answer:
          'Un suelo sano y un sistema radicular fuerte garantizan que los macroelementos aportados (nitrógeno, fósforo, potasio) y los micronutrientes sean plenamente móviles y asimilables. La tecnología OSA de la gama Orthagrow estimula la capacidad de absorción celular de las raíces. Esto reduce la lixiviación de fertilizantes costosos y aumenta el retorno de la inversión en la nutrición de sus cultivos.',
      },
    ],
    nl: [
      {
        question: 'Welke rol speelt Orthagrow MYCO 4G bij het verbeteren van de wortelgezondheid?',
        answer:
          'Orthagrow MYCO 4G bevat een hoogwaardig consortium van vesiculair-arbusculaire mycorrhiza’s (Rhizophagus irregularis, R. clarus en Funneliformis mosseae). Deze nuttige schimmels vormen een secundair wortelnetwerk dat het opnameoppervlak van de wortels aanzienlijk vergroot. Zo nemen gewassen water en essentiële voedingsstoffen (zoals fosfor en micronutriënten) veel efficiënter op, ook onder moeilijke omstandigheden.',
      },
      {
        question: 'Hoe beschermt de OSA-technologie van de Orthagrow-producten bodem en wortels tegen abiotische stress?',
        answer:
          'De gepatenteerde technologie van Moreco levert 100% biologisch actief en opneembaar silicium (OSA). In de bodem en de wortels helpt het de plant de osmotische druk te reguleren. Producten als Orthagrow Granule geven een langer en zwaarder wortelstelsel, waardoor het gewas beter bestand is tegen extreme droogte, hitte en zoutstress (verzilting) van de bodem.',
      },
      {
        question: 'Hoe dragen de bodemverbeteraars van Orthagrow bij aan regeneratieve landbouw?',
        answer:
          'In Moreco’s visie op regeneratieve landbouw is een biologisch actieve bodem de basis van een krachtig wortelstelsel. Producten als Orthagrow Soil Conditioner 4TH optimaliseren de synergie tussen de bodemmatrix, de rizosfeer (de omgeving van de wortels) en het gewas. Dat herstelt de natuurlijke vruchtbaarheid van de bodem en zorgt voor fysiologisch sterkere gewassen en duurzame opbrengsten op lange termijn.',
      },
      {
        question: 'Wat doet een gezonde bodemmatrix dankzij Orthagrow met de opname van meststoffen (NPK)?',
        answer:
          'Een gezonde bodem en een sterk wortelstelsel zorgen ervoor dat de toegediende macro-elementen (stikstof, fosfor, kalium) en micronutriënten volledig mobiel en opneembaar worden. De OSA-technologie van het Orthagrow-assortiment stimuleert het cellulaire opnamevermogen van de wortels. Dat beperkt de uitspoeling van dure meststoffen en verhoogt het rendement van uw investering in plantenvoeding.',
      },
    ],
  },

  biostimulants: {
    fr: [
      {
        question:
          'Comment les biostimulants Moreco stimulent-ils la floraison et la nouaison lors de fortes fluctuations thermiques ?',
        answer:
          'Les formulations comme Orthagrow Alga+Si 4G et Aminactif-4G combinent des extraits d’algues marines et des acides aminés végétaux avec du silicium bioactif (OSA). Cette synergie active les processus enzymatiques et la synthèse de protéines de stress chez la plante. Cela corrige l’équilibre hormonal (auxines et cytokinines) perturbé par les écarts thermiques, stimulant ainsi une différenciation florale homogène, améliorant la qualité du pollen et minimisant la chute des fleurs et des jeunes fruits pour une nouaison optimale.',
      },
      {
        question:
          'Pourquoi les formulations de calcium et d’oligo-éléments Moreco ont-elles une efficacité d’assimilation supérieure aux engrais standards ?',
        answer:
          'OrthaGrow Cal 21% SC 4G et Micro Manager intègrent une technologie brevetée de micro-encapsulation et de chélation organique. Au lieu de se lier ou de précipiter dans la cuve ou sur la feuille, les nutriments restent totalement stables et mobiles. Cette technologie réduit la tension superficielle des gouttes, assurant une couverture foliaire maximale et une pénétration transcuticulaire accélérée. Cela prévient immédiatement les carences aiguës (telles que la nécrose apicale ou le déficit en zinc) avec des doses d’intrants nettement maîtrisées.',
      },
    ],
    en: [
      {
        question: 'How do Moreco biostimulants stimulate flowering and fruit set during sharp temperature swings?',
        answer:
          'Formulations such as Orthagrow Alga+Si 4G and Aminactif-4G combine seaweed extracts and plant-derived amino acids with bioactive silicon (OSA). This synergy activates the plant’s enzymatic processes and its synthesis of stress proteins. It corrects the hormonal balance (auxins and cytokinins) disturbed by temperature swings, promoting uniform flower differentiation, improving pollen quality and minimising the drop of flowers and young fruit for optimal fruit set.',
      },
      {
        question:
          'Why are Moreco’s calcium and trace-element formulations absorbed more efficiently than standard fertilisers?',
        answer:
          'OrthaGrow Cal 21% SC 4G and Micro Manager use a patented micro-encapsulation and organic chelation technology. Instead of binding or precipitating in the tank or on the leaf, the nutrients remain fully stable and mobile. The technology lowers the surface tension of the droplets, ensuring maximum leaf coverage and faster transcuticular penetration. Acute deficiencies (such as blossom-end rot or zinc deficiency) are prevented immediately, with tightly controlled input rates.',
      },
    ],
    es: [
      {
        question:
          '¿Cómo estimulan los bioestimulantes Moreco la floración y el cuajado durante fuertes fluctuaciones térmicas?',
        answer:
          'Formulaciones como Orthagrow Alga+Si 4G y Aminactif-4G combinan extractos de algas marinas y aminoácidos vegetales con silicio bioactivo (OSA). Esta sinergia activa los procesos enzimáticos y la síntesis de proteínas de estrés en la planta. Corrige así el equilibrio hormonal (auxinas y citoquininas) alterado por las diferencias térmicas, estimula una diferenciación floral homogénea, mejora la calidad del polen y minimiza la caída de flores y frutos jóvenes para un cuajado óptimo.',
      },
      {
        question:
          '¿Por qué las formulaciones de calcio y oligoelementos Moreco se asimilan mejor que los fertilizantes estándar?',
        answer:
          'OrthaGrow Cal 21% SC 4G y Micro Manager integran una tecnología patentada de microencapsulación y quelación orgánica. En lugar de ligarse o precipitar en el tanque o sobre la hoja, los nutrientes permanecen totalmente estables y móviles. Esta tecnología reduce la tensión superficial de las gotas, lo que asegura una cobertura foliar máxima y una penetración transcuticular acelerada. Así se previenen de inmediato las carencias agudas (como la necrosis apical o el déficit de zinc), con dosis de insumos claramente controladas.',
      },
    ],
    nl: [
      {
        question: 'Hoe stimuleren de biostimulanten van Moreco bloei en vruchtzetting bij sterke temperatuurschommelingen?',
        answer:
          'Formuleringen als Orthagrow Alga+Si 4G en Aminactif-4G combineren zeewierextracten en plantaardige aminozuren met bioactief silicium (OSA). Die synergie activeert de enzymatische processen en de aanmaak van stresseiwitten in de plant. Zo herstelt ze het hormonale evenwicht (auxinen en cytokininen) dat door temperatuurverschillen verstoord is, wat een gelijkmatige bloemaanleg stimuleert, de kwaliteit van het stuifmeel verbetert en de val van bloemen en jonge vruchten beperkt, voor een optimale vruchtzetting.',
      },
      {
        question:
          'Waarom worden de calcium- en sporenelementformuleringen van Moreco beter opgenomen dan standaardmeststoffen?',
        answer:
          'OrthaGrow Cal 21% SC 4G en Micro Manager maken gebruik van een gepatenteerde technologie van micro-inkapseling en organische chelatie. In plaats van te binden of neer te slaan in de tank of op het blad, blijven de voedingsstoffen volledig stabiel en mobiel. De technologie verlaagt de oppervlaktespanning van de druppels, wat zorgt voor een maximale bladbedekking en een snellere opname door de cuticula. Acute tekorten (zoals neusrot of zinkgebrek) worden zo meteen voorkomen, met duidelijk beheerste doseringen.',
      },
    ],
  },

  npk: {
    fr: [
      {
        question:
          'En quoi consiste précisément la stratégie Moreco « Micro Input – Macro Impact » pour les formulations HIGH END NPK ?',
        answer:
          'Les engrais NPK traditionnels nécessitent souvent de fortes doses car une grande partie de l’azote, du phosphore et du potassium est perdue par lessivage ou blocage dans le sol. La gamme HIGH END NPK de Moreco rompt avec ce schéma grâce à une pureté extrême et une précision moléculaire avancée (technologie WSL). Combinée à la technologie Powered by OSA, l’efficience d’utilisation des nutriments (NUE) est maximisée. Cela permet au producteur de réduire considérablement les volumes d’intrants tout en générant un impact macro-agronomique supérieur sur le développement et le rendement des cultures.',
      },
      {
        question:
          'Comment la technologie « Powered by OSA » intégrée aux formulations NPK améliore-t-elle le calibre des fruits et l’accumulation des sucres ?',
        answer:
          'Le phosphore et le potassium sont essentiels pour la floraison, le transfert d’énergie et la maturation, mais leur mobilité interne peut être limitée. L’acide orthosilicique stabilisé (OSA) présent dans nos produits NPK (comme Orthagrow Flor ou Matur) intensifie les flux de sève et optimise le transport xylémique et phloémique. Cela accélère la translocation des glucides vers les organes de réserve (les fruits). Le résultat se traduit par une augmentation directe du taux de °Brix, une meilleure élongation cellulaire pour un calibrage uniforme, et une fermeté tissulaire accrue qui prolonge la conservation.',
      },
    ],
    en: [
      {
        question:
          'What exactly is Moreco’s ‘Micro Input – Macro Impact’ strategy for the HIGH END NPK formulations?',
        answer:
          'Traditional NPK fertilisers often require high rates, because much of the nitrogen, phosphorus and potassium is lost to leaching or locked up in the soil. Moreco’s HIGH END NPK range breaks with this pattern through extreme purity and advanced molecular precision (WSL technology). Combined with Powered by OSA technology, nutrient use efficiency (NUE) is maximised. Growers can considerably reduce input volumes while achieving a greater macro-agronomic impact on crop development and yield.',
      },
      {
        question:
          'How does the ‘Powered by OSA’ technology in the NPK formulations improve fruit size and sugar accumulation?',
        answer:
          'Phosphorus and potassium are essential for flowering, energy transfer and ripening, but their mobility within the plant can be limited. The stabilised orthosilicic acid (OSA) in our NPK products (such as Orthagrow Flor or Matur) intensifies sap flow and optimises xylem and phloem transport. This speeds up the translocation of carbohydrates to the storage organs (the fruit). The result is a direct increase in °Brix, better cell elongation for uniform sizing, and greater tissue firmness that extends shelf life.',
      },
    ],
    es: [
      {
        question:
          '¿En qué consiste exactamente la estrategia Moreco «Micro Input – Macro Impact» para las formulaciones HIGH END NPK?',
        answer:
          'Los fertilizantes NPK tradicionales suelen requerir dosis elevadas, porque gran parte del nitrógeno, el fósforo y el potasio se pierde por lixiviación o queda bloqueada en el suelo. La gama HIGH END NPK de Moreco rompe con este esquema gracias a una pureza extrema y una precisión molecular avanzada (tecnología WSL). Combinada con la tecnología Powered by OSA, la eficiencia en el uso de los nutrientes (NUE) se maximiza. Esto permite al productor reducir considerablemente los volúmenes de insumos y lograr al mismo tiempo un mayor impacto macroagronómico en el desarrollo y el rendimiento de los cultivos.',
      },
      {
        question:
          '¿Cómo mejora la tecnología «Powered by OSA» de las formulaciones NPK el calibre de los frutos y la acumulación de azúcares?',
        answer:
          'El fósforo y el potasio son esenciales para la floración, la transferencia de energía y la maduración, pero su movilidad interna puede ser limitada. El ácido ortosilícico estabilizado (OSA) presente en nuestros productos NPK (como Orthagrow Flor o Matur) intensifica los flujos de savia y optimiza el transporte por el xilema y el floema. Esto acelera la translocación de los carbohidratos hacia los órganos de reserva (los frutos). El resultado es un aumento directo de los °Brix, una mejor elongación celular para un calibre uniforme y una mayor firmeza de los tejidos que prolonga la conservación.',
      },
    ],
    nl: [
      {
        question:
          'Wat houdt de Moreco-strategie ‘Micro Input – Macro Impact’ voor de HIGH END NPK-formuleringen precies in?',
        answer:
          'Traditionele NPK-meststoffen vragen vaak hoge doseringen, omdat een groot deel van de stikstof, fosfor en kalium verloren gaat door uitspoeling of in de bodem wordt vastgelegd. Het HIGH END NPK-assortiment van Moreco doorbreekt dat patroon dankzij een extreme zuiverheid en een geavanceerde moleculaire precisie (WSL-technologie). In combinatie met de Powered by OSA-technologie wordt de nutriëntenbenuttingsefficiëntie (NUE) gemaximaliseerd. Zo kan de teler de hoeveelheid inputs aanzienlijk verminderen en toch een grotere macro-agronomische impact op de ontwikkeling en opbrengst van het gewas bereiken.',
      },
      {
        question:
          'Hoe verbetert de ‘Powered by OSA’-technologie in de NPK-formuleringen de vruchtmaat en de suikeropbouw?',
        answer:
          'Fosfor en kalium zijn onmisbaar voor bloei, energieoverdracht en afrijping, maar hun mobiliteit in de plant kan beperkt zijn. Het gestabiliseerde orthokiezelzuur (OSA) in onze NPK-producten (zoals Orthagrow Flor of Matur) versterkt de sapstroom en optimaliseert het transport via xyleem en floëem. Dat versnelt de verplaatsing van koolhydraten naar de opslagorganen (de vruchten). Het resultaat is een directe stijging van de °Brix, een betere celstrekking voor een gelijkmatige maat en een stevigere weefselstructuur die de houdbaarheid verlengt.',
      },
    ],
  },
};

export const familyFaqs = (key: FamilyNoteKey, locale: Locale): FamilyFaq[] => FAQS[key]?.[locale] ?? [];
