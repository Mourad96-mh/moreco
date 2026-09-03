# Traductions ES / DE — points à valider

Rédigé le 2026-09-01, à la fin de la passe de traduction espagnole et allemande.
**À faire relire par le client avant mise en ligne.**

## Ce qui a été traduit

| Fichier | Contenu | Avant | Après |
| --- | --- | --- | --- |
| `data/product-copy.json` | 36 fiches produits (accroche, paragraphes, avantages, conditionnements) | fr, en | fr, en, **es, de** |
| `data/pages.json` | 5 pages éditoriales (à propos, carrières, médias, applications, actualités) | fr, en | fr, en, **es, de** |
| `data/articles.json` | 7 articles du centre de connaissances | fr, en | fr, en, **es, de** |
| `data/research.json` | 19 essais R&D + I (titre + description) | **fr seulement** | fr, **en, es, de** |
| `i18n/dictionaries/*.json` | libellés d'interface | déjà complet en 4 langues | inchangé (124 clés × 4) |

Les essais étaient la dernière donnée monolingue : leurs titres s'affichaient en français
y compris sur les pages anglaises. `title` et `description` sont devenus des objets par
langue et `data/trials.ts` sert de point d'accès (`trialTitle`, `trialDescription`).
`scripts/extract-research.mjs` fusionne désormais au lieu d'écraser : une ré-extraction
rafraîchit le `fr` et conserve les traductions écrites à la main.

Vérifié après build : 322 pages, TypeScript propre, aucune chaîne française résiduelle
dans les pages `/es/` et `/de/`, aucune chaîne anglaise résiduelle non plus.

## 1. Allégations santé — compléments alimentaires (priorité haute)

Les pages ES et DE visent des marchés de l'UE, où le **règlement (CE) n° 1924/2006**
n'autorise que les allégations figurant au registre européen, et où le **règlement (UE)
n° 432/2012** interdit toute allégation de prévention ou de traitement d'une maladie.
Le texte source français porte des affirmations qui, telles quelles, ne passeraient pas.
Elles ont été **traduites fidèlement** — c'est au client de décider s'il les conserve,
les atténue ou les retire, dans les quatre langues.

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

- **FertiFight / Orthagrow FertiFight** — « renforce ses défenses contre les agents
  pathogènes fongiques, mildiou, oïdium, botrytis, gommose », « efficace préventive et
  curative », « résultats efficaces dans les 24 heures de pulvérisation », « ne permet pas
  aux champignons de construire une résistance ».
- **OrthaFight** — « prévention et destruction de moisissures », « directement
  fongistatique », « peut provoquer la mort de la maladie ».
- **Orthagrow (gamme)** — « résistance aux maladies et aux parasites », « permet une
  réduction de la fréquence des applications chimiques », « immobilise les métaux lourds
  toxiques ».
- **« Économie d'eau de 40 % !! »** (Orthagrow Granulé et Poudre) — chiffre sans source ;
  à justifier ou à retirer.

## 4. Comparaisons avec la concurrence

« Saviez-vous que les produits concurrents prennent jusqu'à 10 minutes pour tuer les
bactéries et les virus ? » (page Applications, Clearox, Huwa-San). La publicité comparative
(**directive 2006/114/CE**) exige des éléments objectifs et vérifiables. Repris tel quel en
ES et DE ; à sourcer ou à reformuler.

## 5. Références scientifiques à vérifier

- OrthaHealth cite « Le Journal International des maladies endocriniens, Volume 2013,
  article ID 316783 » — la revue s'appelle *International Journal of Endocrinology* ;
  corrigé ainsi en ES et DE, à confirmer côté FR/EN.
- Les renvois `[37-39]`, `[40]`, `[20, 33, 37-43]` de la même fiche proviennent de l'article
  source et ne renvoient à aucune bibliographie sur le site. Soit ajouter la bibliographie,
  soit retirer les numéros.
- Étude AOS : « les ions métaux en biologie et médecine volume 5 » → rendu par
  *Metal Ions in Biology and Medicine, vol. 5* (titre réel de l'ouvrage).

## 6. Qualité de la source française

Le texte français de l'archive est lui-même une traduction approximative (probablement
depuis le néerlandais ou l'anglais) : « Réduit l'incident d'hébergement » pour *reduces
lodging incidence*, « le silicone » pour le silicium, « prendvont », « l'ajou tde », etc.
Les versions ES et DE ont été écrites en langue correcte à partir du sens réel, en
recoupant l'anglais de l'archive. **Conséquence : sur certains passages, l'espagnol et
l'allemand sont plus clairs que le français d'origine.** Une repasse du texte FR est
recommandée — elle n'a pas été faite ici pour ne pas modifier le contenu validé par le
client.

Deux corrections mineures ont tout de même été portées côté FR, dans `data/research.json` :

- « Résultats sue le blé » → « Résultats sur le blé » ;
- « Résultats sur les grapes » / « effet … sur les grapes » → « le raisin » (le mot
  *grapes* est un anglicisme ; le slug de la page reste `raisins`).

Les restes de balises WPML (« Nutrition @fr », « silicon @fr », « supplèments @fr ») ont
été supprimés dans les listes de mots-clés ES et DE ; ils subsistent en FR et EN.

## 7. Terminologie retenue

| Français | Espagnol | Allemand |
| --- | --- | --- |
| acide orthosilicique (AOS) | ácido ortosilícico (AOS) | Orthokieselsäure (OSA) |
| silicium | silicio | Silizium |
| stress abiotique / hydrique | estrés abiótico / hídrico | abiotischer Stress / Trockenstress |
| verse (des céréales) | encamado | Lagerbildung |
| biofilm | biofilm | Biofilm |
| nébulisation (« fogging ») | nebulización («fogging») | Vernebeln („Fogging“) |
| conditionnement 5 L, 25 L | 5 L, 25 L | 5 L, 25 L |
| % ARJ (apport journalier) | % CDR | % NRV |
| demande de devis | solicitud de presupuesto | Angebotsanfrage |
| essai (au champ) | ensayo | Versuch |

Les noms de marques et de produits ne sont **pas** traduits (Orthagrow, Mavita, Huwa-San,
BioXeco, Clearox, OrthaHealth, FertiFight). Seules exceptions, les deux SKU dont le nom
français est un mot commun : *Orthagrow Granulé* → « Orthagrow Granule » et *Orthagrow
Poudre* → « Orthagrow Polvo » / « Orthagrow Pulver ».

## 8. Ce qui reste en langue d'origine

- **Les 30 PDF** (fiches produits, catalogues, études) : uniquement FR ou EN. Les fiches
  ES et DE pointent vers ces mêmes fichiers. Prévoir soit une traduction des PDF, soit une
  mention « document disponible en français / anglais » près du lien.
- Les lignes de tableau « Langues : Français » des articles décrivent la langue **du PDF
  lié**, pas celle de la page : elles restent donc exactes après traduction.
- Les noms de fichiers PDF (`agronomics201303-foliar-spray.pdf`, etc.).
