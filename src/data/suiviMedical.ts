export type Etape = {
  id: string
  titre: string
  /** Fenêtre en semaines d’aménorrhée [début, fin] */
  fenetre: [number, number]
  type: 'consultation' | 'echographie' | 'analyse' | 'demarche' | 'preparation'
  detail: string
  obligatoire?: boolean
}

export const ETAPES: Etape[] = [
  {
    id: 'consult-1',
    titre: '1re consultation prénatale',
    fenetre: [6, 15],
    type: 'consultation',
    detail:
      'Confirmation de la grossesse, datation, examen clinique, prescription du premier bilan sanguin et déclaration de grossesse.',
    obligatoire: true,
  },
  {
    id: 'bilan-1',
    titre: 'Premier bilan sanguin',
    fenetre: [8, 15],
    type: 'analyse',
    detail:
      'Groupe sanguin et rhésus, sérologies rubéole, toxoplasmose et syphilis, glycémie, recherche de sucre et d’albumine dans les urines. Le test VIH est proposé.',
    obligatoire: true,
  },
  {
    id: 'declaration',
    titre: 'Déclaration de grossesse',
    fenetre: [10, 15],
    type: 'demarche',
    detail:
      'À envoyer à la CPAM et à la CAF avant la fin du 3e mois. Elle ouvre la prise en charge à 100 % à partir du 6e mois et les prestations familiales.',
    obligatoire: true,
  },
  {
    id: 'echo-1',
    titre: 'Échographie du 1er trimestre',
    fenetre: [11, 14],
    type: 'echographie',
    detail:
      'Datation précise, vitalité, nombre de fœtus, mesure de la clarté nucale pour le dépistage de la trisomie 21.',
    obligatoire: true,
  },
  {
    id: 'dentiste',
    titre: 'Examen bucco-dentaire',
    fenetre: [16, 28],
    type: 'consultation',
    detail: 'Pris en charge à 100 % pendant la grossesse. Les gencives sont fragilisées par les hormones.',
  },
  {
    id: 'consult-4',
    titre: 'Consultation du 4e mois',
    fenetre: [16, 20],
    type: 'consultation',
    detail: 'Tension, poids, hauteur utérine, bruits du cœur, analyses mensuelles d’urine et toxoplasmose si négative.',
    obligatoire: true,
  },
  {
    id: 'entretien-precoce',
    titre: 'Entretien prénatal précoce',
    fenetre: [16, 22],
    type: 'preparation',
    detail:
      'Un temps d’échange d’environ 45 minutes avec une sage-femme, remboursé à 100 %, pour parler de tout ce qui n’entre pas dans une consultation classique.',
  },
  {
    id: 'echo-2',
    titre: 'Échographie morphologique',
    fenetre: [20, 25],
    type: 'echographie',
    detail:
      'L’examen le plus complet : chaque organe est passé en revue, la croissance mesurée, le placenta localisé. C’est souvent là qu’on découvre le sexe.',
    obligatoire: true,
  },
  {
    id: 'consult-5',
    titre: 'Consultation du 5e mois',
    fenetre: [20, 24],
    type: 'consultation',
    detail: 'Suivi mensuel classique, avec surveillance de la tension et de la prise de poids.',
    obligatoire: true,
  },
  {
    id: 'preparation',
    titre: 'Préparation à la naissance',
    fenetre: [24, 38],
    type: 'preparation',
    detail:
      'Huit séances prises en charge à 100 % : respiration, positions, gestion de la douleur, allaitement, premiers jours avec le bébé.',
  },
  {
    id: 'diabete',
    titre: 'Dépistage du diabète gestationnel',
    fenetre: [24, 28],
    type: 'analyse',
    detail:
      'Proposé en cas de facteurs de risque (âge, IMC, antécédents familiaux). Test d’hyperglycémie provoquée par voie orale, à jeun.',
  },
  {
    id: 'consult-6',
    titre: 'Consultation du 6e mois',
    fenetre: [24, 28],
    type: 'consultation',
    detail: 'Suivi mensuel, prescription de vitamine D et vérification du taux d’hémoglobine.',
    obligatoire: true,
  },
  {
    id: 'anti-d',
    titre: 'Injection d’anti-D (si rhésus négatif)',
    fenetre: [28, 29],
    type: 'analyse',
    detail: 'Prévention de l’incompatibilité rhésus entre la mère et le bébé.',
  },
  {
    id: 'consult-7',
    titre: 'Consultation du 7e mois',
    fenetre: [29, 32],
    type: 'consultation',
    detail: 'Suivi mensuel. On vérifie la position du bébé et la croissance.',
    obligatoire: true,
  },
  {
    id: 'echo-3',
    titre: 'Échographie du 3e trimestre',
    fenetre: [30, 35],
    type: 'echographie',
    detail: 'Estimation du poids, position du bébé, localisation du placenta, quantité de liquide amniotique.',
    obligatoire: true,
  },
  {
    id: 'anesthesiste',
    titre: 'Consultation avec l’anesthésiste',
    fenetre: [32, 38],
    type: 'consultation',
    detail: 'Obligatoire avant l’accouchement, même si tu ne souhaites pas de péridurale.',
    obligatoire: true,
  },
  {
    id: 'strepto',
    titre: 'Prélèvement vaginal (streptocoque B)',
    fenetre: [34, 38],
    type: 'analyse',
    detail:
      'Un simple prélèvement. S’il est positif, des antibiotiques seront donnés pendant le travail pour protéger le bébé.',
    obligatoire: true,
  },
  {
    id: 'consult-8',
    titre: 'Consultation du 8e mois',
    fenetre: [35, 37],
    type: 'consultation',
    detail: 'Évaluation du bassin, discussion du projet de naissance et du mode d’accouchement.',
    obligatoire: true,
  },
  {
    id: 'conge',
    titre: 'Début du congé maternité',
    fenetre: [34, 36],
    type: 'demarche',
    detail:
      'Pour un premier enfant : 6 semaines avant le terme et 10 après. À partir du 3e enfant : 8 semaines avant et 18 après.',
  },
  {
    id: 'consult-9',
    titre: 'Consultation du 9e mois',
    fenetre: [37, 40],
    type: 'consultation',
    detail: 'Dernière consultation avant l’accouchement : position du bébé, col, préinscription confirmée.',
    obligatoire: true,
  },
  {
    id: 'terme',
    titre: 'Surveillance de fin de grossesse',
    fenetre: [41, 41],
    type: 'consultation',
    detail:
      'Après le terme, monitoring et échographie tous les 2 jours. Un déclenchement est généralement proposé vers 41 SA + 5 jours.',
  },
]

export type ItemCheck = { id: string; label: string; note?: string }
export type Checklist = { id: string; titre: string; emoji: string; sousTitre: string; items: ItemCheck[] }

export const CHECKLISTS: Checklist[] = [
  {
    id: 'valise-maman',
    titre: 'Valise — pour toi',
    emoji: '👜',
    sousTitre: 'À préparer vers 34 SA',
    items: [
      { id: 'vm1', label: '3 chemises de nuit ou t-shirts amples', note: 'Boutonnés devant si tu allaites' },
      { id: 'vm2', label: '1 robe de chambre et des chaussons' },
      { id: 'vm3', label: '5 à 6 culottes jetables ou en coton' },
      { id: 'vm4', label: '2 soutiens-gorge d’allaitement + coussinets' },
      { id: 'vm5', label: 'Serviettes hygiéniques spécial maternité' },
      { id: 'vm6', label: 'Trousse de toilette + serviette de bain' },
      { id: 'vm7', label: 'Élastiques à cheveux, baume à lèvres', note: 'Les lèvres se dessèchent vite en salle' },
      { id: 'vm8', label: 'Brumisateur et petite bouteille d’eau' },
      { id: 'vm9', label: 'Chargeur de téléphone à câble long' },
      { id: 'vm10', label: 'Une tenue confortable pour le retour' },
      { id: 'vm11', label: 'Un en-cas et de quoi t’occuper' },
    ],
  },
  {
    id: 'valise-bebe',
    titre: 'Valise — pour le bébé',
    emoji: '🧸',
    sousTitre: 'Vérifie la liste de ta maternité',
    items: [
      { id: 'vb1', label: '6 bodys naissance et 1 mois' },
      { id: 'vb2', label: '6 pyjamas' },
      { id: 'vb3', label: '2 brassières ou gilets' },
      { id: 'vb4', label: '2 bonnets, chaussettes, moufles anti-griffures' },
      { id: 'vb5', label: 'Couches taille naissance', note: 'Souvent fournies, à vérifier' },
      { id: 'vb6', label: 'Bavoirs et langes' },
      { id: 'vb7', label: 'Gant de toilette, serviette à capuche' },
      { id: 'vb8', label: 'Liniment, sérum physiologique, brosse à cheveux' },
      { id: 'vb9', label: 'Tenue de sortie + nid d’ange selon la saison' },
      { id: 'vb10', label: 'Siège auto cosy installé dans la voiture', note: 'Sans lui, pas de sortie possible' },
    ],
  },
  {
    id: 'valise-papiers',
    titre: 'Papiers & administratif',
    emoji: '📁',
    sousTitre: 'Dans une pochette à part, prête à saisir',
    items: [
      { id: 'vp1', label: 'Carte d’identité' },
      { id: 'vp2', label: 'Carte Vitale et carte de mutuelle' },
      { id: 'vp3', label: 'Dossier de maternité complet' },
      { id: 'vp4', label: 'Carte de groupe sanguin' },
      { id: 'vp5', label: 'Résultats du dernier prélèvement vaginal' },
      { id: 'vp6', label: 'Livret de famille ou acte de reconnaissance anticipée' },
      { id: 'vp7', label: 'Projet de naissance, si tu en as écrit un' },
    ],
  },
  {
    id: 'demarches',
    titre: 'Démarches administratives',
    emoji: '✅',
    sousTitre: 'Étalées sur toute la grossesse',
    items: [
      { id: 'd1', label: 'Déclarer la grossesse à la CPAM et à la CAF', note: 'Avant la fin du 3e mois' },
      { id: 'd2', label: 'Prévenir l’employeur et poser le congé maternité' },
      { id: 'd3', label: 'S’inscrire à la maternité' },
      { id: 'd4', label: 'Reconnaissance anticipée en mairie', note: 'Pour les couples non mariés' },
      { id: 'd5', label: 'Chercher un mode de garde', note: 'Crèche : les inscriptions se font très tôt' },
      { id: 'd6', label: 'Réserver les séances de préparation à la naissance' },
      { id: 'd7', label: 'Choisir le pédiatre ou le médecin du bébé' },
      { id: 'd8', label: 'Vérifier la couverture de la mutuelle (chambre seule, dépassements)' },
      { id: 'd9', label: 'Prévoir le congé du deuxième parent', note: '25 jours + 3 jours de naissance' },
    ],
  },
  {
    id: 'maison',
    titre: 'Préparer la maison',
    emoji: '🏠',
    sousTitre: 'Idéalement bouclé vers 36 SA',
    items: [
      { id: 'm1', label: 'Lit à barreaux ou berceau monté, matelas ferme' },
      { id: 'm2', label: 'Table à langer et matelas à langer' },
      { id: 'm3', label: 'Baignoire ou transat de bain' },
      { id: 'm4', label: 'Poussette et siège auto testés une fois' },
      { id: 'm5', label: 'Stock de couches et de linge lavé' },
      { id: 'm6', label: 'Thermomètre, mouche-bébé, paracétamol nourrisson' },
      { id: 'm7', label: 'Quelques repas cuisinés au congélateur' },
      { id: 'm8', label: 'Le trajet vers la maternité repéré, de jour comme de nuit' },
    ],
  },
]

export const SIGNES_ALERTE: { titre: string; texte: string }[] = [
  {
    titre: 'Perte de liquide',
    texte: 'Écoulement clair et continu : la poche des eaux peut être rompue. Rends-toi à la maternité, même sans douleur.',
  },
  {
    titre: 'Saignements',
    texte: 'Tout saignement, même léger, justifie un appel à la maternité sans attendre.',
  },
  {
    titre: 'Le bébé ne bouge plus',
    texte:
      'Après 28 SA, si tu ne le sens pas bouger sur plusieurs heures malgré un repas sucré et un temps allongée sur le côté, appelle immédiatement.',
  },
  {
    titre: 'Contractions régulières',
    texte:
      'Douloureuses, toutes les 5 minutes pendant une heure avant terme, ou avant 37 SA quelle que soit leur fréquence.',
  },
  {
    titre: 'Maux de tête et troubles visuels',
    texte:
      'Céphalées violentes, points lumineux, bourdonnements, gonflement brutal du visage ou des mains : signes possibles de pré-éclampsie, urgence.',
  },
  {
    titre: 'Fièvre supérieure à 38 °C',
    texte: 'Toute fièvre persistante doit être signalée le jour même : elle peut traduire une infection à traiter vite.',
  },
  {
    titre: 'Démangeaisons intenses',
    texte: 'Surtout sur les paumes et les plantes des pieds, en fin de grossesse : possible cholestase, à explorer rapidement.',
  },
]
