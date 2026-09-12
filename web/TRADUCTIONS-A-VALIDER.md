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
