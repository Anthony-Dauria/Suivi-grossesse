export type Nutriment = {
  nom: string
  emoji: string
  besoin: string
  role: string
  sources: string[]
  astuce: string
  /** Trimestres où le besoin est le plus critique */
  pic: string
}

export const NUTRIMENTS: Nutriment[] = [
  {
    nom: 'Acide folique (B9)',
    emoji: '🥬',
    besoin: '400 µg/jour',
    role:
      "Il permet la fermeture correcte du tube neural, qui deviendra le cerveau et la moelle épinière. Tout se joue avant la 8e semaine.",
    sources: [
      'Épinards, mâche, cresson, brocoli',
      'Lentilles, pois chiches, haricots secs',
      'Avocat, melon, orange',
      'Œufs bien cuits, noix',
    ],
    astuce:
      "La supplémentation est indispensable : l’alimentation seule couvre rarement les besoins au bon moment.",
    pic: '1er trimestre',
  },
  {
    nom: 'Fer',
    emoji: '🥩',
    besoin: '16 à 27 mg/jour',
    role:
      "Il fabrique les globules rouges qui transportent l’oxygène jusqu’au bébé. Le volume sanguin augmente de près de 50 % pendant la grossesse.",
    sources: [
      'Boudin noir bien cuit, viande rouge, volaille',
      'Lentilles, haricots rouges, tofu',
      'Épinards, persil, graines de courge',
      'Cacao non sucré',
    ],
    astuce:
      'Le fer végétal s’absorbe 3 à 4 fois mieux avec de la vitamine C (citron, poivron, kiwi). À l’inverse, thé et café pris au repas le bloquent.',
    pic: '2e et 3e trimestres',
  },
  {
    nom: 'Calcium',
    emoji: '🥛',
    besoin: '1 000 mg/jour',
    role:
      "Il construit le squelette et les dents du bébé. S’il en manque dans ton assiette, il ira le chercher dans tes propres os.",
    sources: [
      '3 produits laitiers par jour (yaourt, fromage, lait)',
      'Eaux minérales calciques',
      'Amandes, sardines avec arêtes, tofu',
      'Chou kale, brocoli, figues sèches',
    ],
    astuce: 'Un yaourt, 30 g de comté et un verre de lait couvrent déjà l’essentiel de la journée.',
    pic: '3e trimestre',
  },
  {
    nom: 'Vitamine D',
    emoji: '☀️',
    besoin: '15 µg/jour',
    role: 'Sans elle, le calcium avalé n’est pas fixé. Elle conditionne la solidité du squelette du bébé.',
    sources: [
      'Exposition raisonnable au soleil',
      'Poissons gras (sardine, maquereau, saumon)',
      'Jaune d’œuf cuit, produits laitiers enrichis',
    ],
    astuce: 'Une ampoule est prescrite en routine au 6e ou 7e mois : ne l’oublie pas, elle compte vraiment.',
    pic: '3e trimestre',
  },
  {
    nom: 'Oméga-3 (DHA)',
    emoji: '🐟',
    besoin: '250 mg de DHA/jour',
    role: 'Ils construisent le cerveau et la rétine du bébé, dont le développement s’accélère au 3e trimestre.',
    sources: [
      'Sardine, maquereau, hareng, saumon (2 fois/semaine)',
      'Huile de colza et de noix',
      'Noix, graines de lin moulues',
    ],
    astuce: 'Une cuillère à soupe d’huile de colza dans la vinaigrette chaque jour, c’est simple et efficace.',
    pic: '2e et 3e trimestres',
  },
  {
    nom: 'Iode',
    emoji: '🧂',
    besoin: '200 µg/jour',
    role: 'Indispensable à la thyroïde du bébé, donc à son développement cérébral.',
    sources: ['Poissons et fruits de mer cuits', 'Produits laitiers, œufs', 'Sel iodé'],
    astuce: 'Utilise du sel iodé en cuisine — sans pour autant saler davantage.',
    pic: 'Toute la grossesse',
  },
  {
    nom: 'Protéines',
    emoji: '🍳',
    besoin: '+ 10 à 20 g/jour au 3e trimestre',
    role: 'Elles servent de matériau de construction pour les tissus du bébé, le placenta et l’utérus.',
    sources: ['Viande, poisson, œufs bien cuits', 'Produits laitiers', 'Légumineuses + céréales'],
    astuce: 'Une source de protéines à midi et le soir suffit à couvrir les besoins.',
    pic: '3e trimestre',
  },
  {
    nom: 'Magnésium',
    emoji: '🌰',
    besoin: '360 mg/jour',
    role: 'Il limite les crampes, la fatigue nerveuse et participe à la croissance des tissus.',
    sources: ['Chocolat noir, amandes, noix de cajou', 'Céréales complètes, légumineuses', 'Eaux magnésiennes'],
    astuce: 'Deux carrés de chocolat noir et une poignée d’amandes en collation : le remède des crampes nocturnes.',
    pic: '2e et 3e trimestres',
  },
  {
    nom: 'Fibres',
    emoji: '🌾',
    besoin: '25 à 30 g/jour',
    role: 'Elles luttent contre la constipation, très fréquente sous l’effet de la progestérone.',
    sources: ['Pain et pâtes complets', 'Fruits et légumes à chaque repas', 'Pruneaux, figues, légumineuses'],
    astuce: 'Les fibres sans eau aggravent la constipation : les deux vont ensemble.',
    pic: 'Toute la grossesse',
  },
]

export type Repas = {
  moment: 'Petit-déjeuner' | 'Déjeuner' | 'Collation' | 'Dîner'
  titre: string
  detail: string
  atouts: string[]
}

export const IDEES_REPAS: Repas[] = [
  {
    moment: 'Petit-déjeuner',
    titre: 'Porridge aux fruits rouges',
    detail: 'Flocons d’avoine cuits dans du lait, fruits rouges lavés, une cuillère d’amandes effilées.',
    atouts: ['Fer', 'Calcium', 'Fibres'],
  },
  {
    moment: 'Petit-déjeuner',
    titre: 'Tartines complètes & œuf dur',
    detail: 'Pain complet, beurre, un œuf dur, un kiwi, un thé léger pris à distance du repas.',
    atouts: ['Protéines', 'Vitamine C', 'Fibres'],
  },
  {
    moment: 'Petit-déjeuner',
    titre: 'Version anti-nausées',
    detail: 'Biscottes ou pain grillé avant même de se lever, puis un yaourt une demi-heure plus tard.',
    atouts: ['Estomac calme', 'Sucres lents'],
  },
  {
    moment: 'Déjeuner',
    titre: 'Lentilles, œuf mollet — pardon, œuf dur',
    detail: 'Salade de lentilles bien lavée, dés de comté, vinaigrette à l’huile de colza et au citron.',
    atouts: ['Fer', 'Folates', 'Oméga-3'],
  },
  {
    moment: 'Déjeuner',
    titre: 'Saumon rôti, riz complet, brocoli',
    detail: 'Pavé de saumon bien cuit, riz complet, brocoli vapeur, filet de citron.',
    atouts: ['DHA', 'Iode', 'Fibres'],
  },
  {
    moment: 'Déjeuner',
    titre: 'Steak haché bien cuit & purée maison',
    detail: 'Steak haché cuit à cœur, purée de pommes de terre au lait, épinards à la crème.',
    atouts: ['Fer héminique', 'Calcium'],
  },
  {
    moment: 'Collation',
    titre: 'Yaourt, fruit, amandes',
    detail: 'Un yaourt nature, une poignée d’amandes, un fruit de saison lavé.',
    atouts: ['Calcium', 'Magnésium'],
  },
  {
    moment: 'Collation',
    titre: 'Pain, comté, jus d’orange',
    detail: 'Deux tranches de pain complet, 30 g de comté, un demi-verre de jus d’orange.',
    atouts: ['Calcium', 'Vitamine C'],
  },
  {
    moment: 'Collation',
    titre: 'Compote sans sucres ajoutés & noix',
    detail: 'Idéale en fin d’après-midi quand la fringale arrive et que le dîner est loin.',
    atouts: ['Glycémie stable'],
  },
  {
    moment: 'Dîner',
    titre: 'Soupe de légumes & tartine de chèvre fondu',
    detail: 'Velouté maison, tartine de fromage de chèvre pasteurisé passé au four jusqu’à ce qu’il bouillonne.',
    atouts: ['Léger', 'Hydratant', 'Calcium'],
  },
  {
    moment: 'Dîner',
    titre: 'Omelette bien cuite, salade lavée, pain complet',
    detail: 'Omelette ferme aux herbes soigneusement lavées, salade verte, tranche de pain complet.',
    atouts: ['Protéines', 'Folates'],
  },
  {
    moment: 'Dîner',
    titre: 'Sardines, pommes de terre vapeur, haricots verts',
    detail: 'Sardines en conserve écrasées à la fourchette, pommes de terre tièdes, haricots verts.',
    atouts: ['DHA', 'Calcium', 'Fer'],
  },
]

export type Symptome = {
  titre: string
  emoji: string
  quand: string
  conseils: string[]
  alerte?: string
}

export const SYMPTOMES: Symptome[] = [
  {
    titre: 'Nausées et vomissements',
    emoji: '🤢',
    quand: 'Surtout de 5 à 14 SA',
    conseils: [
      'Mange quelque chose de sec avant même de te lever, puis reste allongée 15 minutes.',
      'Fractionne : 5 à 6 petites prises plutôt que 3 repas copieux. L’estomac vide aggrave tout.',
      'Gingembre frais en infusion, jusqu’à 1 g par jour.',
      'Évite les odeurs fortes, les plats gras, très épicés ou trop chauds.',
      'Bois entre les repas plutôt que pendant.',
    ],
    alerte:
      'Consulte si tu vomis plus de 5 fois par jour, si tu ne gardes aucun liquide ou si tu perds du poids : ce peut être une hyperémèse, qui se traite.',
  },
  {
    titre: 'Brûlures d’estomac et remontées acides',
    emoji: '🔥',
    quand: 'Surtout au 3e trimestre',
    conseils: [
      'Repas légers et fréquents, en mâchant lentement.',
      'Pas de position allongée dans les 2 heures qui suivent le repas.',
      'Surélève la tête du lit de 10 cm plutôt que d’empiler les oreillers.',
      'Limite le gras, le café, les agrumes, la tomate, la menthe et les plats épicés.',
      'Ta sage-femme peut prescrire un pansement gastrique compatible.',
    ],
  },
  {
    titre: 'Constipation',
    emoji: '🌾',
    quand: 'Toute la grossesse',
    conseils: [
      'Fibres à chaque repas : légumes, fruits, céréales complètes, légumineuses.',
      '1,5 à 2 L d’eau par jour, dont une eau riche en magnésium.',
      'Deux à trois pruneaux réhydratés le matin, très efficaces.',
      'Marche 30 minutes par jour, le transit suit le mouvement.',
      'Ne te retiens jamais quand l’envie est là.',
    ],
  },
  {
    titre: 'Fatigue',
    emoji: '😴',
    quand: '1er et 3e trimestres',
    conseils: [
      'Ne lutte pas : des siestes de 20 minutes valent mieux qu’une journée à tenir debout.',
      'Vérifie ton fer avec une prise de sang, l’anémie est fréquente et se corrige.',
      'Répartis les glucides sur la journée pour éviter les coups de barre.',
      'Un peu d’activité douce paradoxalement redonne de l’énergie.',
    ],
  },
  {
    titre: 'Crampes et jambes lourdes',
    emoji: '🦵',
    quand: '2e et 3e trimestres',
    conseils: [
      'Magnésium : amandes, chocolat noir, eau magnésienne.',
      'Étire le mollet avant de dormir, pied fléchi vers toi.',
      'Jambes surélevées le soir, 10 minutes contre un mur.',
      'Douche fraîche sur les jambes de bas en haut.',
      'Bas de contention si la sage-femme les recommande.',
    ],
    alerte: 'Une douleur d’un seul mollet, chaude et dure, impose une consultation en urgence (phlébite).',
  },
  {
    titre: 'Fringales et envies de sucre',
    emoji: '🍫',
    quand: 'Toute la grossesse',
    conseils: [
      'Ne saute aucun repas : la fringale est presque toujours une glycémie qui s’effondre.',
      'Associe toujours le sucré à des fibres ou des protéines (fruit + amandes).',
      'Une collation prévue vaut mieux qu’un grignotage subi.',
      'Se faire plaisir fait partie de l’équilibre — l’enjeu, c’est la régularité, pas la perfection.',
    ],
  },
  {
    titre: 'Diabète gestationnel',
    emoji: '🩸',
    quand: 'Dépisté entre 24 et 28 SA',
    conseils: [
      'Trois repas et deux collations à heures régulières, jamais de saut de repas.',
      'Des féculents à chaque repas, mais en portion mesurée et de préférence complets.',
      'Sucres rapides seulement en fin de repas, jamais seuls.',
      'Une marche de 20 minutes après le repas fait baisser la glycémie de façon nette.',
      'Le suivi diététique est pris en charge : demande-le, il change vraiment les choses.',
    ],
  },
]

export const REGLES_HYGIENE: { titre: string; texte: string }[] = [
  {
    titre: 'Laver, frotter, éplucher',
    texte:
      'Tous les fruits, légumes et herbes passent sous l’eau et sont frottés. Le risque, c’est la terre, pas l’aliment.',
  },
  {
    titre: 'Cuire à cœur',
    texte:
      'Viandes, poissons, œufs : plus rien de rosé, de baveux ou de translucide. La chaleur règle 90 % des risques.',
  },
  {
    titre: 'Séparer le cru du cuit',
    texte:
      'Planche et couteau différents, et un lavage des mains entre les deux. Le réfrigérateur aussi : cru en bas, cuit en haut.',
  },
  {
    titre: 'Un frigo à 4 °C',
    texte:
      'La listeria se multiplie jusqu’à 4 °C. Vérifie la température avec un thermomètre et nettoie les clayettes tous les 15 jours.',
  },
  {
    titre: 'Manger vite ce qui est ouvert',
    texte: 'Les produits entamés se consomment dans les 24 h. Au moindre doute sur une date ou une odeur, on jette.',
  },
  {
    titre: 'Se laver les mains',
    texte:
      'Avant de cuisiner, après avoir manipulé de la viande crue, de la terre, ou après le contact avec un chat et sa litière.',
  },
]

export type PriseDePoids = {
  categorie: string
  imc: string
  recommande: string
  note: string
}

export const PRISE_DE_POIDS: PriseDePoids[] = [
  {
    categorie: 'Maigreur',
    imc: 'IMC < 18,5',
    recommande: '12,5 à 18 kg',
    note: 'Une prise de poids un peu plus généreuse est souhaitable.',
  },
  {
    categorie: 'Corpulence normale',
    imc: 'IMC 18,5 à 24,9',
    recommande: '11,5 à 16 kg',
    note: 'Le repère le plus courant, avec une prise très faible au 1er trimestre.',
  },
  {
    categorie: 'Surpoids',
    imc: 'IMC 25 à 29,9',
    recommande: '7 à 11,5 kg',
    note: 'Une prise plus mesurée réduit le risque de diabète gestationnel.',
  },
  {
    categorie: 'Obésité',
    imc: 'IMC ≥ 30',
    recommande: '5 à 9 kg',
    note: 'Un suivi diététique personnalisé est en général proposé.',
  },
]
