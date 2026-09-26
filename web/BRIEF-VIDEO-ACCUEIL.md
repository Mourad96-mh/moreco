# Vidéo d'accueil — cahier des charges

Commande client du 2026-09-09. La bannière de la page d'accueil ne porte plus ni titre,
ni sous-titre, ni bouton : la vidéo est seule à l'écran. Elle doit donc tenir toute seule.

**Mis à jour le 2026-09-26** : le client a remis un titre sur le film, « MORECO | La
technologie au service de l'agriculture régénérative ». Il est posé en surimpression par
le site (`t.home.heroTitle`), pas incrusté dans la vidéo : il reste net, traduit, et
modifiable sans nouveau montage. Toujours ni sous-titre ni bouton.

**Livré le 2026-09-12.** Le film du client est en place (`public/media/hero/hero.mp4`,
10 s, 1024 × 576, H.264). Sa piste audio a été retirée au montage : la bannière démarre
toute seule, et un film qui démarre tout seul avec du son est bloqué par les navigateurs.
L'affiche `hero-poster.webp` est tirée de sa première image. Le plan Mixkit de
remplacement et sa mention de crédit ont été retirés.

Deux réserves à lever avec le client : la définition livrée est très en deçà du master 4K
demandé ci-dessous, et un filigrane en étoile est incrusté en bas à droite de l'image.

Pour l'achat des rushes plan par plan, voir [ACHAT-RUSHES-VIDEO.md](ACHAT-RUSHES-VIDEO.md).

## Contraintes générales

| | |
| --- | --- |
| Durée | 20 secondes maximum |
| Son | aucun — pas de voix, pas de musique, pas de bruitage, **pas de piste audio du tout** |
| Format | 16:9, 4K Ultra HD (3840 × 2160) pour le master |
| Style | naturel, luxueux, cinématographique, végétation dense, lumière chaude d'heure dorée |
| Figuration | aucune personne à l'image, aucun agriculteur |
| Lecture | boucle continue, sans coupure visible |

## Découpage plan par plan

| Temps | Durée | Plan |
| --- | --- | --- |
| 00:00 – 00:03 | 3 s | Plan large au drone, mouvement fluide, vastes champs verts au lever de soleil doré. |
| 00:03 – 00:05 | 2 s | Macro de luxe, piqué maximal : feuilles vert foncé brillantes et mouillées, grappes de tomates vertes parfaites, gouttes d'eau scintillantes. **Référence visuelle : le plant de tomate de bioworkseurope.com** — reprendre ce style précis, et rien d'autre de ce site. |
| 00:05 – 00:07 | 2 s | Macro extrême sur des cassis brillants, gouttes de rosée éclatantes. |
| 00:07 – 00:09 | 2 s | Gros plan de fraises rouges, mûres, fraîches, poussant à même une terre riche. |
| 00:09 – 00:11 | 2 s | Gros plan cinématographique d'avocats généreux suspendus aux branches, lumière douce et chaude. |
| 00:11 – 00:13 | 2 s | Travelling linéaire, propre, le long de rangs de vigne parfaitement symétriques, plein soleil. |
| 00:13 – 00:15 | 2 s | Mouvement bas et dynamique, la caméra fend les rangs serrés d'un grand champ de maïs à maturité. |
| 00:15 – 00:17 | 2 s | Gros plan de luxe sur des olives mûres luisantes, verger méditerranéen gorgé de soleil. |
| 00:17 – 00:20 | 3 s | Plan drone spectaculaire, montée lente en recul au-dessus d'une immense palmeraie de dattiers symétrique, coucher de soleil chaud. |

## La boucle — point à ne pas manquer

Le brief initial demandait un fondu au noir en fin de plan 9. La bannière rejoue le
fichier en boucle : un fondu au noir produirait un clignotement noir toutes les
20 secondes, en plein haut de page. **Décision du client, 2026-09-09 : la fin est
raccordée au plan 1.** Le ciel de coucher de soleil du plan 9 doit fondre vers le ciel
de lever de soleil du plan 1, de sorte que le raccord de boucle soit invisible.

En pratique : dernière et première image de teinte et de luminosité proches, fondu
enchaîné d'une petite seconde, aucun noir intermédiaire.

## Livrables

Les points 2 et 3 sont fabriqués automatiquement à partir des rushes, voir « Mise en
place » plus bas. Ils sont décrits ici parce que c'est ce que le site sert.

1. **Master** — 3840 × 2160, codec d'origine (ProRes 422 HQ ou équivalent), sans audio.
2. **Encodage web** — c'est le fichier que le site sert :
   - `hero.mp4`, H.264 `yuv420p`, 1920 × 1080, 25 ou 30 i/s ;
   - **aucune piste audio** ;
   - `faststart` (index en tête de fichier) ;
   - viser **8 Mo maximum** : c'est une bannière, elle se charge avant tout le reste.
3. **Image d'affiche** — `hero-poster.webp`, 2000 px de large, extraite du plan 1.
   Elle est visible plus souvent qu'on ne le croit : elle porte le premier affichage,
   elle s'affiche si la lecture automatique est refusée par le navigateur, et elle
   remplace entièrement la vidéo pour les visiteurs qui ont demandé à leur système de
   réduire les animations. **Ce doit être une belle image, pas une image de service.**

## Mise en place — le montage est automatisé

Le monteur peut livrer **soit le film fini**, soit **les neuf rushes bruts**. Dans les deux
cas c'est `scripts/build-hero-video.mjs` qui fabrique les deux fichiers du site.

### À partir des neuf rushes (recommandé)

Placer les rushes dans `web/hero-source/`, un fichier par plan, nommé par son numéro.
Le dossier est ignoré par git : les rushes ne rentrent pas dans le dépôt.

```
web/hero-source/01-drone-champs.mp4
web/hero-source/02-tomate.mov
…
web/hero-source/09-dattiers.mp4
```

Un rush dure toujours plus longtemps que les deux secondes que le brief lui accorde.
`web/hero-source/shots.json` indique où commencer dans chacun, en secondes :

```json
{ "2": { "start": 14.5 }, "9": { "start": 3 } }
```

Puis, depuis `web/` :

```sh
node scripts/build-hero-video.mjs --dry    # liste ce qui sera coupé, sans rien écrire
node scripts/build-hero-video.mjs          # écrit hero.mp4 et hero-poster.webp
```

Le script coupe chaque plan à sa durée, met tout à la même définition et à la même
cadence, ferme la boucle par un fondu enchaîné du plan 9 vers le plan 1, encode au format
ci-dessus et extrait l'image d'affiche. Il annonce la taille obtenue et prévient si elle
dépasse le budget. `--out ../draft` écrit ailleurs, pour regarder un essai sans toucher au
site ; `--crossfade 1.5` allonge le fondu de boucle.

**Le plan 1 doit avoir une seconde de battement au début** : c'est elle qui alimente le
fondu de fin. Les vingt secondes de rushes donnent bien vingt secondes à l'écran.

### À partir d'un film déjà monté

Déposer les deux fichiers directement dans `web/public/media/hero/`, en écrasant les
fichiers de remplacement, en gardant exactement ces noms :

```
web/public/media/hero/hero.mp4
web/public/media/hero/hero-poster.webp
```

### Dans les deux cas

La vidéo devenant la propriété de Moreco, **retirer la ligne
`credit="Mixkit — free licence"`** dans `views/HomeView.tsx`, qui crédite la séquence de
remplacement. C'est la seule modification de code nécessaire.

Le lecteur (`components/Hero/HeroVideo.tsx`) est déjà réglé pour : lecture automatique
muette, boucle, lecture en ligne sur mobile, image d'affiche en premier affichage, et
mise à l'écart complète de la vidéo si le visiteur a demandé à réduire les animations.
