# Traductions ES / NL / AR — points à valider

Rédigé le 2026-09-01 (passe espagnole et allemande), mis à jour le 2026-09-06 :
**l'allemand a été retiré du site et remplacé par l'arabe et le néerlandais.**
**À faire relire par le client avant mise en ligne.**

## Ce qui a été traduit

| Fichier | Contenu | Avant | Après |
| --- | --- | --- | --- |
| `data/product-copy.json` | 36 fiches produits (accroche, paragraphes, avantages, conditionnements) | fr, en, es, de | fr, en, es, **nl, ar** |
| `data/research.json` | 19 essais R&D + I (titre + description) | fr, en, es, de | fr, en, es, **nl, ar** |
| `data/pages.json` | 5 pages éditoriales (à propos, carrières, médias, applications, actualités) | fr, en, es, de | fr, en, es, **nl, ar** |
| `data/articles.json` | 7 articles du centre de connaissances | fr, en, es, de | fr, en, es, **nl, ar** |
| `i18n/dictionaries/*.json` | libellés d'interface | fr, en, es, de | fr, en, es, **nl, ar** (149 clés × 5) |

**Tout le contenu du site est désormais dans les cinq langues.** Les blocs `nl` et `ar`
sont calqués sur la liste anglaise : mêmes types de blocs, mêmes images, seul le texte
change. Les noms de fichiers PDF, les tailles en Kio et les titres d'ouvrages cités
(*Metal Ions in Biology and Medicine*, *Comptes Rendus Geoscience*) ne sont pas traduits.

Les lignes de tableau « Langues : Anglais » des sept articles décrivent la langue **du PDF
lié**, pas celle de la page : elles restent donc exactes après traduction — voir aussi la
section 8.

Les essais étaient la dernière donnée monolingue : leurs titres s'affichaient en français
y compris sur les pages anglaises. `title` et `description` sont devenus des objets par
langue et `data/trials.ts` sert de point d'accès (`trialTitle`, `trialDescription`).
`scripts/extract-research.mjs` fusionne désormais au lieu d'écraser : une ré-extraction
rafraîchit le `fr` et conserve les traductions écrites à la main.

Vérifié après build : 435 URLs, 2175 alternates hreflang, TypeScript propre.

## 0. Arabe — ce que le passage en RTL implique

- `<html dir>` est piloté par `LOCALE_DIR` (`i18n/config.ts`). Les feuilles de style
  utilisaient déjà des propriétés logiques (`margin-inline-start`, `padding-inline`) ; la
  dizaine de propriétés physiques restantes a été convertie. **À revoir à l'œil dans un
  vrai navigateur avant mise en ligne**, en particulier le méga-menu et le fil d'ariane.
- Inter ne porte pas l'arabe : `/ar/` charge en plus **Noto Sans Arabic**, placé devant
  Inter dans la pile de polices pour que les noms de marque latins (Moreco, Orthagrow)
  restent sur Inter.
- **Les URLs arabes réutilisent les mots anglais** (`/ar/products/`, pas `/ar/منتجات/`).
  L'export est une arborescence de vrais dossiers sur Hostinger : des segments arabes
  partiraient percent-encodés. Choix réversible — voir `data/route-words.json`.
- Les anciennes pages arabes du site WordPress ne retombent plus sur le français : le
  `.htaccess` généré les renvoie vers leur équivalent `/ar/` lorsqu'il existe.

## 0 bis. Néerlandais — marché visé

Le néerlandais expose le catalogue à un marché **UE** (Belgique, Pays-Bas), là où
l'allemand le faisait auparavant. Les points 1 à 4 ci-dessous, écrits pour l'ES et le DE,
s'appliquent donc **à l'identique au NL**. Ils valent aussi pour l'arabe, sous la
réglementation marocaine sur les allégations des compléments alimentaires et des biocides,
qui n'a pas été auditée ici.

## 1. Allégations santé — compléments alimentaires (priorité haute)

Les pages ES et NL visent des marchés de l'UE, où le **règlement (CE) n° 1924/2006**
n'autorise que les allégations figurant au registre européen, et où le **règlement (UE)
n° 432/2012** interdit toute allégation de prévention ou de traitement d'une maladie.
Le texte source français porte des affirmations qui, telles quelles, ne passeraient pas.
Elles ont été **traduites fidèlement** — c'est au client de décider s'il les conserve,
les atténue ou les retire, dans les cinq langues.

- **Mavita Luxe** — « accroît la fertilité », « stimule la libido », « combat l'impuissance
  et les problèmes d'érection », « soulage les symptômes de la ménopause », « réduit les
  douleurs menstruelles », « assure une circulation sanguine accrue dans les corps
  caverneux ». Allégations de santé et allusions à un effet médicamenteux.
- **Mavita Slim+** — « nous vous garantissons une perte de poids rapide et durable »,
  « la façon la plus scientifiquement prouvée de perdre du poids ». Une garantie de
  résultat est le point le plus exposé de tout le catalogue.
- **Mavita Stress-plex** — « améliorer la qualité du sommeil », « réguler la pression
  sanguine en dilatant les artères », « réduire l'inflammation », « aider le système
  immunitaire », plus la mention du prix Nobel 1998, qui récompense la découverte de
  l'oxyde nitrique et non le produit.
- **Mavita Beauty** — « prévient la formation des rides », « résultats visibles très
  rapidement ».
- **Mavita Sport** — « récupération plus rapide des blessures », « prévention de
  l'acidification ».
- **Mavita Health / OrthaHealth** — carences en silicium présentées comme cause de
  symptômes (ongles cassants, rides, os et cartilage chez l'animal).

## 2. Allégations biocides (priorité haute)

Le **règlement (UE) n° 528/2012** impose qu'un produit biocide soit autorisé dans le pays
de commercialisation et que la publicité corresponde à l'autorisation ; les mentions du
type « sans danger » y sont explicitement interdites.

- « Tue 99,9 % des bactéries » (Huwa-San Toilet, Huwa-San Kitchen), « tue 98 % des
  bactéries » (BioXeco Hand) — chiffres à rattacher à une norme d'essai (EN 1276, EN 13697…).
- « Efficace contre les bactéries, virus, champignons », « virucide », « tue même les
  spores bactériennes » (Clearox) — allégations à couvrir par l'autorisation.
- « Prévient la Legionella » (Huwa-San Water, BioXeco DW).
- « Les micro-organismes ne peuvent pas développer une résistance contre Clearox® ».
- « À dosage recommandé, non mutagène, non carcinogène, non toxique » — formulation
  proche des mentions interdites par l'article 72 du règlement biocides.
- « Sans danger pour les aliments, les humains et l'environnement » (Huwa-San Fruit &
  Vegetables), « sans danger pour vous, votre piscine et l'environnement » (Huwa-San Pool).

## 3. Allégations phytosanitaires (priorité haute)

Un produit vendu comme fertilisant ou biostimulant (**règlement (UE) 2019/1009**) ne peut
pas revendiquer le contrôle d'un organisme nuisible : cela relèverait du **règlement (CE)
n° 1107/2009** et exigerait une AMM produit phytopharmaceutique dans chaque pays.

- **FertFight** (« Orthagrow FertiFight » jusqu'au 2026-09-09) — « renforce ses défenses
  contre les agents pathogènes fongiques, mildiou, oïdium, botrytis, gommose », « efficace
  préventive et curative ». **Le point reste entier après le renommage** : le produit est
  toujours au catalogue, dans les cinq langues.
- **OrthaFight** et **FertiFight** — « prévention et destruction de moisissures »,
  « directement fongistatique », « peut provoquer la mort de la maladie », « résultats
  efficaces dans les 24 heures de pulvérisation », « ne permet pas aux champignons de
  construire une résistance ». Les deux produits ont été retirés du site le 2026-09-09 ;
  le sujet ne se pose plus tant qu'ils n'y reviennent pas.
- **Orthagrow (gamme)** — « résistance aux maladies et aux parasites », « permet une
  réduction de la fréquence des applications chimiques », « immobilise les métaux lourds
  toxiques ».
- **« Économie d'eau de 40 % !! »** (Orthagrow Granulé et Poudre) — chiffre sans source ;
  à justifier ou à retirer.

## 4. Comparaisons avec la concurrence

« Saviez-vous que les produits concurrents prennent jusqu'à 10 minutes pour tuer les
bactéries et les virus ? » (page Applications, Clearox, Huwa-San). La publicité comparative
(**directive 2006/114/CE**) exige des éléments objectifs et vérifiables. Repris tel quel en
ES, NL et AR ; à sourcer ou à reformuler.

## 5. Références scientifiques à vérifier

- OrthaHealth cite « Le Journal International des maladies endocriniens, Volume 2013,
  article ID 316783 » — la revue s'appelle *International Journal of Endocrinology* ;
  corrigé ainsi en ES, NL et AR, à confirmer côté FR/EN.
- Les renvois `[37-39]`, `[40]`, `[20, 33, 37-43]` de la même fiche proviennent de l'article
  source et ne renvoient à aucune bibliographie sur le site. Soit ajouter la bibliographie,
  soit retirer les numéros.
- Étude AOS : « les ions métaux en biologie et médecine volume 5 » → rendu par
  *Metal Ions in Biology and Medicine, vol. 5* (titre réel de l'ouvrage).

## 6. Qualité de la source française

Le texte français de l'archive est lui-même une traduction approximative (probablement
depuis le néerlandais ou l'anglais) : « Réduit l'incident d'hébergement » pour *reduces
lodging incidence*, « le silicone » pour le silicium, « prendvont », « l'ajou tde », etc.
Les versions ES, NL et AR ont été écrites en langue correcte à partir du sens réel, en
recoupant l'anglais de l'archive. **Conséquence : sur certains passages, l'espagnol, le
néerlandais et l'arabe sont plus clairs que le français d'origine.** Une repasse du texte FR est
recommandée — elle n'a pas été faite ici pour ne pas modifier le contenu validé par le
client.

Deux corrections mineures ont tout de même été portées côté FR, dans `data/research.json` :

- « Résultats sue le blé » → « Résultats sur le blé » ;
- « Résultats sur les grapes » / « effet … sur les grapes » → « le raisin » (le mot
  *grapes* est un anglicisme ; le slug de la page reste `raisins`).

Les restes de balises WPML (« Nutrition @fr », « silicon @fr », « supplèments @fr ») ont
été supprimés dans les listes de mots-clés ES, NL et AR ; ils subsistent en FR et EN.

## 7. Terminologie retenue

| Français | Espagnol | Néerlandais | Arabe |
| --- | --- | --- | --- |
| acide orthosilicique (AOS) | ácido ortosilícico (AOS) | orthokiezelzuur (OSA) | حمض الأورثوسيليسيك (OSA) |
| silicium | silicio | silicium | السيليكون |
| stress abiotique / hydrique | estrés abiótico / hídrico | abiotische stress / waterstress | الإجهاد غير الحيوي / المائي |
| verse (des céréales) | encamado | legering | الرقاد |
| biofilm | biofilm | biofilm | الغشاء الحيوي |
| nébulisation (« fogging ») | nebulización («fogging») | vernevelen (“fogging”) | الترذيذ الضبابي |
| conditionnement 5 L, 25 L | 5 L, 25 L | 5 l, 25 l | 5 ل، 25 ل |
| % ARJ (apport journalier) | % CDR | % ADH | % من الاحتياج اليومي |
| demande de devis | solicitud de presupuesto | offerteaanvraag | طلب عرض سعر |
| essai (au champ) | ensayo | proef | تجربة |

Les noms de marques et de produits ne sont **pas** traduits (Orthagrow, Mavita, Huwa-San,
BioXeco, Clearox, OrthaHealth, FertFight). Seules exceptions, les deux SKU dont le nom
français est un mot commun : *Orthagrow Granulé* → « Orthagrow Granule » / « Orthagrow
حُبيبات » et *Orthagrow Poudre* → « Orthagrow Polvo » / « Orthagrow مسحوق ».

## 8. Ce qui reste en langue d'origine

- **Les 30 PDF** (fiches produits, catalogues, études) : uniquement FR ou EN. Les fiches
  ES, NL et AR pointent vers ces mêmes fichiers. Prévoir soit une traduction des PDF, soit une
  mention « document disponible en français / anglais » près du lien.
- Les lignes de tableau « Langues : Français » des articles décrivent la langue **du PDF
  lié**, pas celle de la page : elles restent donc exactes après traduction.
- Les noms de fichiers PDF (`agronomics201303-foliar-spray.pdf`, etc.).

## 9. Briefing du 2026-09-09 — nouvelles chaînes à relire

Le texte français est celui du client, à un mot près : « une récolte **abondante** mais
saine », le mot manquait dans le document reçu (arbitrage validé le 2026-09-09). Les
quatre autres langues sont de notre main et **n'ont pas encore été relues**.

### Texte d'accueil (trois paragraphes, `home.introText`)

Il remplace l'ancien texte « Une science du silicium, quatre marchés » sous la vidéo.
Points à surveiller à la relecture :

- « Depuis plus de **23 ans** » : le chiffre est daté. Il vieillit d'un an par an et
  n'est écrit qu'ici — à revoir chaque année, ou à remplacer par une année de création.
- « MORECO » est en capitales dans le texte source du client ; nous l'avons gardé tel
  quel dans les cinq langues, alors que le reste du site écrit « Moreco ».
- NL : *telers* traduit « producteurs » au sens horticole. Si le client vise aussi les
  grandes cultures, lire *land- en tuinbouwers*.
- AR : « المنتجين » (les producteurs) plutôt que « المزارعين » (les agriculteurs), pour
  couvrir l'agro-industrie comme le champ.

### « Emploi général » devient « Désinfectant »

Change à la fois le quatrième domaine (accueil, méga-menu, pied de page) et la nouvelle
cinquième famille de la page Agri / Horticulture — même mot pour les deux.

| FR | EN | ES | NL | AR |
| --- | --- | --- | --- | --- |
| Désinfectant | Disinfectant | Desinfectante | Desinfectie | مطهّرات |

À trancher par le client : le néerlandais dit ici **l'activité** (*desinfectie*) et non le
produit (*ontsmettingsmiddel*), qui est plus long et lourd dans une barre de filtres.
L'arabe est au pluriel, « des désinfectants », qui se lit mieux qu'un singulier générique.

**Les URL n'ont pas changé** : le segment reste `/fr/produits/emploi-general/`,
`/nl/producten/algemeen-gebruik/`, etc. Les renommer casserait les 301 venus de l'ancien
moreco.ma ; à faire dans un second temps, avec les redirections qui vont avec.

### Centre de connaissances et publications

Les quatre études évaluées par des pairs quittent le centre de connaissances pour la page
R&D + I. Le centre de connaissances devient une seule liste chronologique, sans article
épinglé et sans intitulé de section : la bannière de la page nomme déjà la page. Deux
chaînes sont nouvelles :

| Clé | FR | EN | ES | NL | AR |
| --- | --- | --- | --- | --- | --- |
| `pages.knowledge.lead` | Le silicium expliqué : entretiens et dossiers de fond. | Silicon explained: interviews and background features. | El silicio explicado: entrevistas y reportajes de fondo. | Silicium uitgelegd: interviews en achtergronddossiers. | السيليكون بلغة مفهومة: حوارات وملفات معمّقة. |
| `rdi.publicationsIntro` | Les études évaluées par des pairs sur lesquelles reposent nos formulations, en téléchargement libre. | The peer-reviewed studies our formulations rest on, free to download. | Los estudios revisados por pares en los que se basan nuestras formulaciones, de descarga libre. | De peer-reviewed studies waarop onze formuleringen steunen, vrij te downloaden. | الدراسات المحكَّمة التي تقوم عليها تركيباتنا، متاحة للتحميل. |

« Évaluées par des pairs » engage : les quatre documents sont bien des articles publiés
ou relus par des scientifiques nommés (Keele University, *Comptes Rendus Geoscience*),
mais **le client doit confirmer** que la formule convient pour les quatre.

Aucun libellé de menu ne change, mais l'entrée « L'importance du silicium » du menu
R&D + I ne pointe plus vers un bloc du centre de connaissances : elle ouvre directement
la page de l'entretien, qui est ce que son libellé annonce.

### « R&D + I » ne se traduit plus

Sur consigne du client, le bouton de menu reste « R&D + I » dans toutes les langues sauf
l'arabe. L'espagnol perd donc *I+D+i* et le néerlandais *O&O + I*, y compris comme titre
de la page. L'arabe garde « البحث والتطوير + الابتكار ».

## 10. Briefing du 2026-09-16 — les cinq nouveaux produits Orthagrow 4G

Cinq fiches ajoutées : **CAL 21% SC 4G**, **ZnO 39,5% 4G**, **ALGA +SI 4G**,
**AMINACTIF-4G** et **MYCO 4G**. Le français est repris **mot pour mot des étiquettes**
fournies par le client — c'est donc la source, et elle n'a pas été réécrite. L'anglais,
l'espagnol, le néerlandais et l'arabe sont **nos traductions, à relire**.

Deux points relèvent des sections 1 à 3 ci-dessus et n'ont **pas** été audités ici :

- **« breveté(e) ».** Les quatre liquides revendiquent une formule ou une absorption
  brevetée (« Absorption 4G brevetée », « formule micro-zinc brevetée », « synergie
  brevetée »). L'étiquette l'affirme ; le site le répète tel quel. **Le client doit
  fournir les numéros de brevet**, ou la revendication doit tomber — en UE (ES, NL) une
  mention de brevet non étayée est une pratique commerciale trompeuse.
- **Allégations d'effet sur la culture.** « Récolte supérieure », « croissance
  supérieure », « fructification maximale », « effet immédiat anti-stress » sont des
  allégations de performance au sens du **règlement (UE) 2019/1009** sur les fertilisants
  et les biostimulants végétaux. Même réserve qu'à la section 3.

Le « 39,5 % » du nom ZnO garde la virgule décimale française dans les cinq langues :
c'est le nom de marque imprimé sur l'emballage, et les noms de marque ne se traduisent
pas (voir `data/products.ts`).

Conditionnements : « 1 L » et « 10 L » pour les quatre liquides, « 200 g » pour MYCO 4G,
translittérés en arabe (« 1 لتر », « 10 لتر », « 200 غ ») sur le modèle du « 1 كغ » des
sachets 4G existants.

## 11. Briefing du 2026-09-17 — arabe retiré, R&D réécrite, candidature spontanée

### L'arabe quitte le site

Sur constat du client (« trop d'erreurs »), **la langue arabe est retirée du site** :
`i18n/dictionaries/ar.json` est supprimé, `ar` disparaît de `LOCALES`, des mots d'URL,
du sélecteur de langue, des `hreflang` et de la page d'atterrissage. Plus aucune page
`/ar/` n'est générée et la police Noto Sans Arabic n'est plus chargée.

Les anciennes URL arabes de moreco.ma **ne tombent pas en 404** : elles redirigent
désormais vers la page **française ou anglaise dont elles étaient la traduction**, d'après
les liens de traduction de l'archive (`scripts/finalize-export.mjs`).

Les chaînes arabes **restent dormantes** dans `data/product-copy.json`,
`data/research.json`, `data/articles.json` et `data/pages.json` : rien ne les lit, elles
ne coûtent rien, et elles servent de base si le client fait relire puis remettre la langue.
Les sections 1 à 10 de ce document gardent donc leurs colonnes AR, qui documentent ce qui
existe encore dans les fichiers. **Si la langue est abandonnée pour de bon, dire de les
purger.**

### Page R&D + I — texte fourni par le client

Le **français est fourni mot pour mot par le client** et n'a pas été réécrit ; l'anglais,
l'espagnol et le néerlandais sont **nos traductions, à relire**. Les titres sont ceux
demandés : H1 « Recherche & Développement Moreco », H2 « Innovation ».

| Clé | FR (source client) | EN | ES | NL |
| --- | --- | --- | --- | --- |
| `rdi.title` | Recherche & Développement Moreco | Moreco Research & Development | Investigación y Desarrollo Moreco | Onderzoek & Ontwikkeling Moreco |
| `rdi.innovationTitle` | Innovation | Innovation | Innovación | Innovatie |
| `rdi.innovationLead` | Toujours une longueur d'avance grâce à la R&D de Moreco | Always a step ahead, thanks to Moreco's R&D | Siempre un paso por delante gracias al I+D de Moreco | Altijd een stap voor, dankzij de R&D van Moreco |
| `rdi.customTitle` | Besoin d'une formule ou d'un produit sur mesure ? | Need a bespoke formula or product? | ¿Necesita una fórmula o un producto a medida? | Een formule of product op maat nodig? |

Les quatre paragraphes (`rdi.innovationText`, `rdi.customText`) suivent la même règle.

**Réserve, même nature qu'aux sections 3 et 10** : le texte affirme des « technologies les
plus avancées du secteur » et un « rendement maximal ». C'est du registre publicitaire
admis, mais en UE (ES, NL) une allégation de supériorité doit pouvoir être étayée si elle
est contestée. Le client a écrit ce texte ; il l'assume.

Le titre du menu reste « R&D + I » — c'est le bouton, pas le titre de la page
(voir section 9).

### Compteurs d'essais

Deux essais ont été supprimés (prunes, framboises), les dix-sept restants renumérotés de
01 à 17. Les textes qui **annonçaient « dix-neuf »** ont donc été réécrits sans chiffre,
dans les quatre langues : `home.rdiText` et `rdi.trialsIntro`. Les compteurs affichés sur
la page R&D + I se calculent sur les données et ne peuvent pas dériver.

### Page carrières — candidature spontanée

Formulaire neuf, sur le modèle de casem.ma/carrieres. Les libellés (`careers.*`) sont
**nos traductions** sauf le français, qui reprend le briefing.

Deux points demandent l'avis du client :

- **« License » → « Licence ».** La liste des diplômes du briefing écrit *License*, qui est
  l'orthographe anglaise. Le menu déroulant affiche **Licence**. À confirmer.
- **« Achats et logistiques » et « Logistique »** figurent tous deux dans la liste des
  départements fournie, comme deux entrées distinctes. Elles sont reprises telles quelles.
  À confirmer qu'il ne s'agit pas d'un doublon.

Traductions des deux listes déroulantes :

| FR | EN | ES | NL |
| --- | --- | --- | --- |
| Commercial | Sales | Comercial | Commercieel |
| Finance et comptabilité | Finance and accounting | Finanzas y contabilidad | Financiën en boekhouding |
| Ressources Humaines | Human Resources | Recursos Humanos | Human Resources |
| Achats et logistiques | Purchasing and logistics | Compras y logística | Inkoop en logistiek |
| Recherche et Développement | Research and Development | Investigación y Desarrollo | Onderzoek en Ontwikkeling |
| Communication et Marketing | Communication and Marketing | Comunicación y Marketing | Communicatie en Marketing |
| Secrétariat | Secretarial | Secretaría | Secretariaat |
| Logistique | Logistics | Logística | Logistiek |
| Ingénieur | Engineer | Ingeniero | Ingenieur |
| Technicien | Technician | Técnico | Technicus |
| Master | Master's | Máster | Master |
| Licence | Bachelor's | Licenciatura | Bachelor |
| Baccalauréat | Secondary school diploma | Bachillerato | Middelbareschooldiploma |
| Autre | Other | Otro | Anders |

« MBA » ne se traduit pas.

### Signature du pied de page

À la demande du client, la ligne anglaise devient exactement
**« Bioavailable silicon for plants, animals and human »** (`site.tagline` en anglais).
*human* y est employé comme nom au singulier, ce qui n'est pas de l'anglais standard —
on attendrait *humans*. **C'est la formulation imposée par le client**, reprise telle
quelle. Les quatre autres langues sont inchangées.

### Gamme Mavita

« Mavita Health » s'appelle désormais **« Mavita Sport »**, et le « Mavita Sport » existant
garde son nom : **deux fiches portent le même nom**, ce que le briefing demande
explicitement. Les textes de description n'ont pas été touchés, comme demandé, ce qui
laisse deux échos de l'ancien nom dans le corps des pages :

- la fiche renommée **commence encore par « Le complexe minéral Mavita Health »** ;
- la fiche Mavita Beauty conseille d'utiliser le produit « avec **Mavita Health** (agit
  comme un stimulateur) ».

À trancher : soit les textes citent l'ancien nom (état actuel, conforme à la lettre du
briefing), soit on y substitue le nouveau.

Deux nouvelles photos (gamme **Human® Laboratoires**, flacons 30 ml gouttes orales) ont
remplacé les visuels d'archive de **Mavita Sport** et **Mavita Beauty**. L'attribution ne
relève pas du jugement : l'étiquette du premier flacon porte « ENDURANCE / ANTI-ACIDITE /
RECUPERATION », qui est mot pour mot l'accroche de `mavita-sport`, et celle du second
« PEAU / CHEVEUX / ONGLES », qui est celle de `mavita-beauty`.

**La fiche renommée (`mavita-health`) garde donc son visuel d'archive**, sur lequel on lit
encore « MAVITA health » alors que la page s'intitule Mavita Sport. Il manque une photo.

### Gamme OrthaHealth — trois espèces sur quatre photographiées

Les visuels d'archive des quatre espèces étaient le même logo de gamme. Trois ont reçu
leur propre photo le 2026-09-17 : **Volailles** (bouteille 1 L et fût 10 L),
**Chiens & Chats** (OrthaHealth PETS, 50 ml) et **Équidés** (250 ml). **Bovins garde le
logo** — la photo manque.

### Conditionnements lus sur les emballages

Les nouvelles photos portent leur contenance, reportée dans « Disponible en » comme pour
les liquides 4G (section 10) : `1 L · 10 L` (volailles), `50 ml` (chiens & chats),
`250 ml` (équidés), `30 ml` (Mavita Sport et Mavita Beauty).

**À confirmer par le client** : ce sont les formats *visibles sur la photo*, pas une liste
fournie. S'il en existe d'autres, ils manquent.

## 12. Briefing du 2026-09-26 — encadrés verts, textes d'accueil, à propos, carrières

Le client a écrit le français ; **l'anglais, l'espagnol et le néerlandais sont de nous** et
sont à faire relire, comme le reste :

| Où | Contenu |
| --- | --- |
| `data/family-notes.ts` | les cinq encadrés verts sous les familles agricoles : Spécialité, Santé du sol & des racines, Oligo-éléments & biostimulants, HIGH END NPK, Désinfection |
| `i18n/dictionaries/*.json` → `home` | titre sur la vidéo, texte d'accueil et ses quatre piliers |
| `i18n/dictionaries/*.json` → `about` | présentation de Moreco et « Notre vision » |
| `i18n/dictionaries/*.json` → `news` | bloc « Technologie OSA unique et brevetée » en tête de Médias & Actus |
| `i18n/dictionaries/*.json` → `careers` | « Travailler chez MORECO » |
| `data/product-copy.json` → `mavita-beauty-gouttes` | la fiche du Mavita Beauty en flacon doré, écrite **uniquement** à partir de l'étui (« Beauté naturelle de l'intérieur », peau / cheveux / ongles, 30 ml gouttes orales) |

Restent en anglais dans toutes les langues, comme le client les écrit : « Pure OSA »,
« Powered by OSA », « Micro Input – Macro Impact », « HIGH END NPK » et la signature
« One World. One Health. ».

**Listes remises en place.** Dans le briefing reçu, toutes les listes à puces étaient
sorties de leur section et regroupées sous le point 2. Chacune a été replacée sous la
phrase qui l'annonce (« contribuent à : », « Pour une utilisation optimale : »…), d'après
le nombre d'éléments et leur grammaire. **À faire valider par le client.**

**Allégations (sections 1 à 3).** Les encadrés parlent de « tolérance aux stress
abiotiques », de « mécanismes naturels de défense », de « conservation prolongée des
récoltes » ; le bloc Désinfection parle de maîtrise des « bactéries, virus et
micro-organismes ». Ce sont les mots du client, traduits fidèlement ; leur recevabilité
sur les marchés UE (ES, NL) n'a pas été vérifiée.

**Fiche Mavita Beauty en pot.** Elle affichait « Disponible en 30 ml », reste du
2026-09-17 où elle portait la photo du flacon. Le flacon ayant désormais sa propre fiche,
le pot n'affiche plus de contenance : **le client doit donner la sienne**.
