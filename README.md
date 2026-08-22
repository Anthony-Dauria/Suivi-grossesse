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
conseils concrets et étape marquante de la semaine.

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

L’application est une PWA : elle s’installe sur l’écran d’accueil et fonctionne hors connexion.

1. Publier le contenu de `dist/` sur n’importe quel hébergement statique (Netlify, Vercel, GitHub
   Pages, un simple dossier servi en HTTPS). Le build utilise des chemins relatifs, il fonctionne
   donc aussi dans un sous-répertoire.
2. Ouvrir l’adresse sur le téléphone.
3. **iPhone** : bouton Partager → « Sur l’écran d’accueil ».
   **Android** : menu ⋮ → « Installer l’application ».

Les données étant propres à l’appareil et au navigateur, l’écran Réglages permet d’exporter une
sauvegarde JSON et de la réimporter (utile en cas de changement de téléphone).

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
