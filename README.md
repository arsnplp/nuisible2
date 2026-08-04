# Nuisibles Secure — Site vitrine local SEO

Site vitrine statique (HTML / CSS / JS purs, sans framework ni dépendance externe) pour **Nuisibles Secure**,
entreprise d'extermination et de nettoyage basée à Chartres (28), intervenant en Eure-et-Loir et dans les
Yvelines.

Le site compte **40 pages HTML** (37 indexables + mentions légales + 404, plus un gabarit d'article
technique non publié) générées à partir d'un jeu de données commun afin de garantir une structure, un
maillage interne et une charte strictement identiques partout.

**Aucun formulaire sur le site** : toute demande de devis passe par un appel téléphonique (`tel:`) ou par
WhatsApp (`wa.me`), conformément au choix du client — voir §4.

---

## 1. Démarrer en local

Aucune installation n'est nécessaire (pas de `npm install`, pas de build). À la racine du dossier :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000/`. Toutes les URLs sont en dossiers (`/deratisation-dreux/`,
`/punaises-de-lit-chartres/`, etc.), ce qui fonctionne nativement avec n'importe quel serveur statique
(Netlify, Vercel, OVH, o2switch, Apache, Nginx, GitHub Pages…).

---

## 2. Arborescence

```
/                              accueil
/deratisation-rats-souris-chartres/   ┐
/punaises-de-lit-chartres/            │
/nid-de-guepes-frelons-chartres/      │ 8 pages prestations
/desinsectisation-cafards-blattes-chartres/
/depigeonnage-chartres/               │
/desinfection-nettoyage-chartres/     │
/contrat-nuisibles-restaurant-haccp-chartres/
/nuisibles-copropriete-syndic-chartres/ ┘
/deratisation-{ville}/         22 pages villes (voir liste §3)
/zone-intervention/            hub des communes desservies
/a-propos/                     page de confiance
/blog/                         index du blog
/blog/{article}/               3 articles
/blog/_modele-article.html     gabarit non publié (noindex + Disallow)
/mentions-legales/             noindex, follow
/404.html                      page d'erreur personnalisée, noindex
/sitemap.xml, /robots.txt
/assets/css/style.css          feuille de style unique (~29 Ko)
/assets/js/main.js             script unique (menu mobile, apparitions au scroll)
/assets/fonts/                 Anton + Montserrat, auto-hébergées en woff2
/assets/img/                   images (voir tableau §5)
/assets/favicons/               favicons générés depuis /logo/logonuisible2.png
```

Il n'y a **pas de page « Devis »** : chaque CTA « Devis » du site ouvre directement soit l'appel
téléphonique (`tel:`), soit une conversation WhatsApp pré-remplie (`wa.me`) — voir §4.

### Pourquoi pas de page « /nuisibles-chartres/ » dédiée ?
Chartres est le siège de l'entreprise : l'accueil (`/`) porte déjà le mot-clé principal
« Dératisation & désinsectisation Chartres ». Créer une seconde page ciblant le même mot-clé aurait
créé une concurrence interne (cannibalisation SEO). Les 22 pages villes couvrent donc les communes
**autres que Chartres**, ce qui respecte la fourchette « 10 à 25 villes » demandée.

### Villes couvertes (pages dédiées)
Lucé, Mainvilliers, Lèves, Luisant, Le Coudray, Nogent-le-Phaye, Champhol, Barjouville (agglomération) ·
Dreux, Anet, Châteauneuf-en-Thymerais, Nogent-le-Roi (axe Nord) · Maintenon, Épernon, Gallardon,
Auneau-Bleury-Saint-Symphorien (axe Est) · Bonneval, Châteaudun, Illiers-Combray (axe Sud) ·
Courville-sur-Eure, Nogent-le-Rotrou, Senonches (axe Ouest/Perche).

Les communes limitrophes desservies **sur devis uniquement** (Rambouillet, Houdan,
Saint-Arnoult-en-Yvelines, Dourdan, Nonancourt, Saint-André-de-l'Eure) sont listées en texte sur
`/zone-intervention/` mais n'ont volontairement pas de page dédiée (contenu insuffisant pour être unique
→ risque de doorway page).

---

## 3. Charte graphique

Variables CSS dans `assets/css/style.css` (`:root`) :

| Rôle | Variable | Hex |
|---|---|---|
| Fond principal | `--black` | `#000000` |
| Rouge principal (CTA, titres, logo) | `--red` | `#C10206` |
| Rouge foncé (ombres, hover) | `--red-dark` | `#8F0005` |
| Texte principal | `--white` | `#FFFFFF` |
| Texte secondaire | `--grey-light` | `#D9D9D9` |
| Bordures | `--grey-dark` | `#2E2E2E` |
| Vert WhatsApp (boutons WhatsApp uniquement) | `--whatsapp` | `#25D366` |

Le vert `--whatsapp` est une exception volontaire à la charte noir/rouge/blanc, réservée **exclusivement**
aux boutons qui ouvrent WhatsApp (`.btn-whatsapp`) : c'est la couleur de reconnaissance immédiate de l'app,
ce qui aide l'utilisateur à distinguer en un coup d'œil « appeler » (rouge) de « écrire sur WhatsApp » (vert).

Typographies auto-hébergées en woff2 (`assets/fonts/`, aucun appel à Google Fonts en ligne) :
- **Anton** (titres, majuscules condensées) — `--font-display`
- **Montserrat** variable 400-800 (texte courant) — `--font-body`

Le site reprend volontairement l'univers du logo fourni (cercle, mire/crosshair, noir/rouge/blanc) : le
schéma « zone d'intervention » (accueil, page Villes) reprend ce motif de cible.

---

## 4. Contact : téléphone & WhatsApp (pas de formulaire)

Sur demande explicite du client, le site n'utilise **aucun formulaire** : chaque bouton « Devis » ouvre soit
un appel téléphonique, soit une conversation WhatsApp pré-remplie. Cela concerne le header, la barre mobile
fixe, le menu mobile, le footer et tous les encarts d'appel à l'action des pages.

Le numéro utilisé pour WhatsApp est le numéro de téléphone de l'entreprise, au format international sans
espaces : **`33768495393`**. Les liens `tel:` et `https://wa.me/...` sont écrits en dur dans chaque page
HTML (pas de JavaScript nécessaire : `main.js` ne gère plus que le menu mobile et les apparitions au scroll).

**⚠️ Avant mise en ligne**, vérifier que WhatsApp Business est bien activé sur ce numéro (`07 68 49 53 93`) —
sinon le lien `https://wa.me/33768495393` n'aboutira à aucune conversation. Si un numéro WhatsApp différent
doit être utilisé, remplacer `33768495393` par le bon numéro (format international, sans « + » ni espaces)
dans **tous** les fichiers `.html` (recherche/remplacement global sur `wa.me/33768495393`).

Le message pré-rempli envoyé est : *« Bonjour, je souhaite un devis gratuit pour une intervention. »*

---

## 5. Remplacer les images (gabarits SVG → photos réelles)

Aucune photo n'ayant été fournie, chaque emplacement affiche un **gabarit SVG** généré aux couleurs de la
charte, avec le nom de fichier final et les dimensions écrites dessus. Pour les remplacer :

1. Prendre/sélectionner la photo réelle, aux dimensions indiquées (JPG ou WebP, < 300 Ko).
2. L'enregistrer dans `/assets/img/` sous le **nom de fichier final** de la colonne ci-dessous.
3. Dans le(s) fichier(s) HTML concerné(s), remplacer `nom-fichier.svg` par `nom-fichier.jpg` (ou `.webp`)
   dans l'attribut `src` de la balise `<img>`.

| Fichier placeholder actuel | Nom de fichier final attendu | Description de la photo à fournir | Dimensions | Page(s) |
|---|---|---|---|---|
| `equipe.svg` | `equipe.jpg` | Portrait de l'artisan ou de l'équipe | 800×800 | À propos |
| `vehicule.svg` | `vehicule.jpg` | Véhicule d'intervention | 800×600 | À propos |

Le **logo** (`assets/img/logo.webp`, favicons dans `assets/favicons/`, image Open Graph
`assets/img/og-image.jpg`) a en revanche été généré à partir du vrai fichier fourni
(`/logo/logonuisible2.png`) — aucune action requise sauf si le logo change.

**Blog et pages prestation : pas d'image, sur demande du client.** Les articles de blog et le corps des
pages prestation n'affichent aucune photo (ni cover d'article, ni vignette dans les cartes du blog, ni photo
au milieu de l'article prestation — ces gabarits ont été retirés). Le client ajoutera lui-même une photo
dans l'en-tête (`page-hero`) de chaque page prestation une fois ses propres visuels prêts ; il suffira
d'ajouter un `<img>` dans la section `<section class="page-hero">` du fichier concerné.

Les 22 pages villes n'ont volontairement **pas** de photo dédiée (aucune photo spécifique par commune
n'étant réaliste) : leur en-tête utilise un habillage graphique (dégradé + motif), pas une photo. Vous
pouvez en ajouter une plus tard si vous disposez de vraies photos locales.

### Vidéo de fond du hero (accueil)

Le hero de l'accueil utilise une vidéo en fond plein cadre plutôt qu'une photo statique :
`assets/video/hero-punaises-de-lit.mp4` (fournie par le client, compressée sans son : ~956 Ko pour 10 s en
boucle, H.264 + `faststart`), avec `assets/video/hero-poster.jpg` comme image affichée avant chargement.
Elle est masquée automatiquement si l'utilisateur a activé « réduire les animations » dans son système
(`prefers-reduced-motion`).

Pour la remplacer par une autre vidéo :
1. Compresser la nouvelle vidéo sans son, idéalement < 1,5 Mo pour une boucle de 8-12 s (ex. avec `ffmpeg
   -an -c:v libx264 -crf 26 -movflags +faststart`).
2. L'enregistrer dans `/assets/video/` et mettre à jour le nom de fichier dans la balise `<source>` du
   `<video class="hero-bg-video">` sur `index.html`.
3. Générer une nouvelle image `hero-poster.jpg` (première image de la vidéo) et l'utiliser en attribut
   `poster`.

---

## 6. Ajouter un article de blog

Le fichier `/blog/_modele-article.html` est un gabarit complet et commenté (placeholders entre crochets),
exclu du sitemap et bloqué dans `robots.txt`. Procédure (également documentée en commentaire HTML en tête
du fichier) :

1. **Copier** `/blog/_modele-article.html` vers `/blog/mon-nouveau-slug/index.html`.
2. **Remplir** tous les `[PLACEHOLDERS]` : titre (≤ 65 car.), meta description (140-160 car.), date, image,
   corps de l'article (700-900 mots), FAQ le cas échéant.
3. **Inverser la balise robots** : remplacer `<meta name="robots" content="noindex, follow">` par
   `content="index, follow"`.
4. **Réindexer** : soumettre l'URL dans Google Search Console une fois en ligne.
5. **Ajouter une carte** sur `/blog/index.html` pointant vers le nouvel article.
6. **Mettre à jour** `sitemap.xml` (nouvelle `<url>`, priorité recommandée 0.6).

---

## 7. ⚠️ Nom de domaine — action requise avant mise en ligne

Le brief ne précisait pas de nom de domaine définitif. Toutes les URLs canoniques, Open Graph, JSON-LD,
`sitemap.xml` et `robots.txt` utilisent donc un domaine **provisoire** :

```
https://www.nuisibles-secure.fr
```

**Avant mise en ligne**, si le domaine réel diffère : remplacer `https://www.nuisibles-secure.fr` par le
domaine définitif dans **tous** les fichiers `.html`, dans `sitemap.xml` et dans `robots.txt` (recherche/
remplacement global sur le dossier).

---

## 8. Informations à compléter (placeholders `[...]`)

Toute information non fournie dans le brief est signalée par un texte **entre crochets** directement
visible sur le site (jamais inventée). Récapitulatif :

- **Adresse postale exacte** du siège (actuellement « [Adresse précise à compléter], 28000 Chartres »,
  utilisée dans le NAP du footer et le JSON-LD `LocalBusiness`).
- **Numéro WhatsApp Business** : à activer/confirmer sur le `07 68 49 53 93` (voir §4) avant mise en ligne.
- **Réseaux sociaux / fiche Google Business** : liens Facebook/Instagram en footer pointent vers `#`.
- **Avis clients** : aucune citation réelle ni note Google n'ayant été fournie, la section « Avis clients »
  de l'accueil affiche 3 cartes explicitement marquées `[Avis client à compléter]` plutôt que des faux
  avis. **Ne jamais** les remplacer par des avis inventés — n'utiliser que de vrais avis vérifiés (Google
  Business, etc.), et retirer la mention d'attente une fois publiés.
- **Certifications professionnelles** (page À propos) : Certibiocide, agrément biocide, assurance RC pro —
  aucune certification n'ayant été communiquée, le texte reste en placeholder plutôt que d'affirmer une
  certification non vérifiée.
- **Année de création de l'entreprise** (page À propos).
- **Mentions légales** : forme juridique, SIRET/SIREN, capital social, TVA intracommunautaire, directeur
  de publication, coordonnées de l'hébergeur, durée de conservation des données (RGPD) — aucune de ces
  informations n'étant dans le brief, elles sont toutes en placeholder. **Ces mentions légales sont
  obligatoires en France : le site ne doit pas être mis en ligne avant de les avoir complétées.**
- **Tarifs précis** : aucun tarif chiffré n'ayant été fourni, chaque page prestation indique « devis gratuit,
  prix ferme annoncé avant intervention » plutôt qu'une fourchette inventée.

---

## 9. SEO on-page réalisé

- 1 `<h1>` unique par page, titres ≤ 65 caractères, meta descriptions 140-160 caractères avec téléphone —
  **vérifié programmatiquement sur les 40 pages** (voir §10).
- `rel="canonical"` absolu + Open Graph complet + Twitter Card sur chaque page ; `og-image.jpg` 1200×630.
- JSON-LD en `@graph` : `LocalBusiness` + `WebSite` + `FAQPage` sur l'accueil ; `Service` + `BreadcrumbList`
  + `FAQPage` sur les pages prestation et ville ; `BlogPosting` sur les articles. Aucun `aggregateRating`
  auto-proclamé.
- Maillage interne complet : footer (prestations, villes, NAP), pages prestation ↔ pages ville ↔ blog,
  fil d'Ariane + `BreadcrumbList` sur toutes les pages internes, boutons d'appel/WhatsApp répétés partout.
- `sitemap.xml` (37 URLs indexables, priorités différenciées) + `robots.txt`.

## 10. Contrôle qualité effectué

Un script de contrôle a été exécuté sur les 40 pages générées et vérifie automatiquement :
- présence et longueur du `<title>` et de la meta description ;
- unicité du `<h1>` ;
- présence du canonical et de `lang="fr"` ;
- validité JSON (parsing) de chaque bloc JSON-LD ;
- existence réelle de **chaque** lien interne et de **chaque** image référencée (`href`/`src`) ;
- présence de `width`/`height`/`alt` sur chaque `<img>`.

**Résultat : aucune erreur.** Un serveur local (`python3 -m http.server`) a ensuite été lancé et l'ensemble
des pages et des assets clés ont répondu **200**. Une vérification croisée (téléphone, e-mail, nom de
marque) confirme l'absence d'incohérence ou de résidu d'un autre métier/ville dans les 40 pages.

---

## 11. Actions SEO hors-site à réaliser après mise en ligne

1. **Créer/optimiser la fiche Google Business Profile** (nom, catégorie « Service de lutte antiparasitaire »,
   zone de service = communes de `/zone-intervention/`, horaires 24h/24-7j/7, photos, lien vers le site).
2. **S'inscrire sur les annuaires locaux et sectoriels** (Pages Jaunes, annuaires de la CCI d'Eure-et-Loir,
   annuaires BTP/services à la personne) avec un NAP strictement identique à celui du site.
3. **Rediriger en 301 l'ancien domaine** vers le nouveau si l'entreprise disposait d'un site précédent (non
   fourni dans ce brief — à faire dès qu'un ancien domaine est identifié, pour conserver son éventuel
   historique de liens).
4. **Déclarer le site dans Google Search Console** (et Bing Webmaster Tools) et y soumettre `sitemap.xml`
   dès la mise en ligne définitive.
5. **Obtenir des avis Google vérifiés** dès les premières interventions (lien direct vers la fiche Google
   Business envoyé par SMS/e-mail après chaque intervention), puis les intégrer en remplacement des
   cartes placeholder de la section « Avis clients ».
