# Ma grossesse

Une application de suivi de grossesse complète, en français, pensée pour être consultée sur un
téléphone au quotidien : où en est le bébé cette semaine, ce qu’on peut manger, quels rendez-vous
arrivent, et où en est la valise de maternité.

Tout est stocké **localement, sur l’appareil**. Aucun compte, aucun serveur, aucun envoi de données,
aucune publicité.

## Ce que l’application contient

**Accueil** — semaine d’aménorrhée en cours, mois, trimestre, jours restants, date du terme, taille
et poids du bébé, conseils de la semaine, prochaines étapes médicales et rappel alimentaire du jour.

**Semaine par semaine** — 39 fiches, de 3 à 41 SA : développement du bébé, changements du corps,
conseils concrets et étape marquante de la semaine. Chaque fiche montre **à quoi ressemble le bébé
à cette semaine précise** : une illustration entièrement paramétrique, qui passe de l'amas de
cellules à l'embryon replié avec son bourgeon caudal, puis au fœtus à grosse tête, puis au bébé
potelé aux traits dessinés — la morphologie est interpolée semaine par semaine, pas choisie parmi
quelques images figées.

Sous l'illustration, une **règle graduée** donne sa longueur. Tant qu'elle tient dans l'écran (jusqu'à
environ 13 SA), elle est tracée **à l'échelle 1:1** ; au-delà, l'échelle est réduite et annoncée comme
telle. Un objet du quotidien est dessiné à la même échelle pour servir de repère : l'application
retient le plus grand qui tienne dans la largeur disponible — une carte bancaire dès que l'échelle
est réduite, une pièce de 2 € quand le dessin est à 1:1 et qu'une carte déborderait de l'écran. On
pose l'objet contre l'écran pour comparer. L'écran Réglages permet de caler la règle sur la taille
réelle d'une carte bancaire, pour que le 1:1 soit exact sur ce téléphone.

**Bien manger** — le module le plus fourni :
- *Puis-je manger ça ?* : base de 70 entrées consultables (fromages, charcuterie, poissons, œufs,
  boissons, plantes…), classées « autorisé / sous conditions / à éviter », avec le pourquoi et,
  quand elle existe, l’astuce pour en consommer quand même.
- *Nutriments clés* : B9, fer, calcium, vitamine D, oméga-3, iode, protéines, magnésium, fibres —
  besoins, rôle, sources et pièges d’absorption. Ceux qui comptent le plus au trimestre en cours
  sont mis en avant.
- *Idées de repas* : douze menus simples par moment de la journée, avec leurs atouts nutritionnels.
- *Petits maux* : nausées, reflux, constipation, fatigue, crampes, fringales, diabète gestationnel —
  ce qui soulage vraiment, et les signes qui doivent faire consulter.
- *Les 6 réflexes* d’hygiène alimentaire (listeria, salmonelle, toxoplasme), et le cas du chat.

**Mon suivi** — courbe de poids avec la fourchette recommandée calculée depuis l’IMC de départ,
journal quotidien (humeur, ressentis, notes), compteur de mouvements du bébé et chronomètre de
contractions avec la règle 5-1-1.

**Se préparer** — parcours médical français complet (21 étapes datées automatiquement à partir du
terme : consultations, échographies, analyses, démarches), agenda de rendez-vous personnels, liste
de questions à poser en consultation, cinq checklists (valise maman, valise bébé, papiers,
démarches, maison), liste de prénoms à deux, et une page « quand appeler la maternité ».

Si la sérologie toxoplasmose est renseignée comme négative, les conseils alimentaires insistent
davantage sur la cuisson et le lavage.

## Lancer le projet

```bash
npm install
npm run dev      # développement, sur http://localhost:5173
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
npm run lint
```

## L’installer sur un téléphone

L’application est une PWA : une fois publiée, elle s’installe sur l’écran d’accueil, s’ouvre en
plein écran sans barre de navigateur et fonctionne hors connexion.

### 1. La publier

Il faut une adresse en HTTPS : une PWA ne s’installe pas depuis un fichier local.

**Option A — Netlify, Vercel ou Cloudflare Pages.** La plus simple quand le dépôt est privé :
ces plateformes déploient gratuitement depuis un dépôt privé sans le rendre public. Connecter le
dépôt, puis renseigner :

- commande de build : `npm run build`
- dossier à publier : `dist`

**Option B — GitHub Pages.** Un workflow (`.github/workflows/publier.yml`) construit et publie
l’application à chaque push. Attention : **GitHub Pages n’est pas disponible pour un dépôt privé
sur un compte gratuit**. Il faut donc soit un compte GitHub Pro, soit passer le dépôt en public
(le site publié, lui, est public dans les deux cas).

Le workflow tente d’activer Pages tout seul (`enablement: true`). Si le plan ne le permet pas,
l’étape `configure-pages` échoue avec `Get Pages site failed … Not Found`. En cas de besoin,
l’activation manuelle se fait dans **Settings → Pages → Source : GitHub Actions**.

L’adresse publiée est alors `https://<compte>.github.io/<dépôt>/`.

Deux erreurs possibles sur l’étape `configure-pages` :

| Message | Cause | Correctif |
| --- | --- | --- |
| `Get Pages site failed … Not Found` | Pages n’est pas activé | **Settings → Pages → Source : GitHub Actions** |
| `Create Pages site failed … Resource not accessible by integration` | le workflow n’a pas le droit de l’activer | vérifier **Settings → Actions → General → Workflow permissions : Read and write**, et que le plan autorise Pages sur ce dépôt |


Dans tous les cas, le build utilise des chemins relatifs : l’application fonctionne aussi bien à
la racine d’un domaine que dans un sous-répertoire.

### 2. L’ajouter à l’écran d’accueil

**iPhone** — il faut passer par **Safari**, Chrome sur iOS ne sait pas installer une application.

1. Ouvrir l’adresse dans Safari.
2. Toucher le bouton **Partager** (le carré avec une flèche vers le haut, en bas de l’écran).
3. Faire défiler et choisir **« Sur l’écran d’accueil »**.
4. Valider avec **Ajouter**.

**Android** — dans Chrome, menu **⋮** puis **« Installer l’application »** ou **« Ajouter à
l’écran d’accueil »**.

### 3. Après l’installation

Le premier lancement doit se faire avec du réseau, le temps que le service worker mette
l’application en cache ; ensuite elle s’ouvre hors connexion.

Les données sont enregistrées dans le navigateur de l’appareil : elles ne suivent pas d’un
téléphone à l’autre. L’écran Réglages permet d’exporter une sauvegarde JSON et de la réimporter.
C’est aussi là qu’on cale la règle « taille réelle » sur une carte bancaire.

## Organisation du code

```
src/
  data/         contenu éditorial (semaines, aliments, nutrition, parcours médical, checklists)
  lib/          calculs de dates et de grossesse, contexte de données, persistance locale
  components/   briques d’interface, anneau de progression, courbe de poids, icônes
  pages/        les six écrans de l’application
```

Le contenu vit entièrement dans `src/data/` : corriger un conseil ou ajouter un aliment ne demande
de toucher à aucun composant.

Stack : React 19, TypeScript, Vite, Tailwind CSS v4. Aucune dépendance d’exécution en dehors de
React — les graphiques, les icônes et le service worker sont écrits à la main.

## Avertissement

Les repères de cette application suivent les recommandations françaises courantes en matière de
suivi de grossesse et d’alimentation (ANSES, Assurance Maladie, HAS). Ce sont des repères généraux :
ils ne remplacent en aucun cas l’avis d’une sage-femme, d’un médecin ou d’un gynécologue, seuls à
connaître le dossier médical. En cas de doute ou de signe inhabituel, c’est la maternité qu’il faut
appeler.
