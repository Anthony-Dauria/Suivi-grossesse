export type Semaine = {
  /** Semaine d’aménorrhée (convention française) */
  sa: number
  taille: string
  poids: string
  comparaison: string
  emoji: string
  bebe: string
  maman: string
  conseils: string[]
  /** Étape médicale ou administrative marquante de la semaine */
  focus?: string
}

export const SEMAINES: Semaine[] = [
  {
    sa: 3,
    taille: '0,1 mm',
    poids: '—',
    comparaison: 'une tête d’épingle',
    emoji: '✨',
    bebe:
      "La fécondation vient d’avoir lieu. L'œuf, une petite boule de cellules appelée blastocyste, descend doucement la trompe et commence à se nicher dans la muqueuse de l’utérus. Tout est déjà écrit : le sexe, la couleur des yeux, le groupe sanguin.",
    maman:
      "Tu ne sens encore rien, et c’est normal : le test de grossesse est souvent trop précoce. Quelques femmes remarquent de minuscules saignements roses au moment de la nidation, autour du 7e jour.",
    conseils: [
      "Commence l’acide folique (vitamine B9) dès maintenant si ce n’est pas déjà fait : 400 µg par jour.",
      'Arrête l’alcool et le tabac — il n’existe pas de dose sans risque pendant la grossesse.',
      'Pas besoin de tout changer d’un coup : une alimentation variée suffit déjà à beaucoup.',
    ],
  },
  {
    sa: 4,
    taille: '1 mm',
    poids: '—',
    comparaison: 'une graine de pavot',
    emoji: '🌱',
    bebe:
      "L’embryon est implanté et se divise en trois feuillets qui donneront la peau et le cerveau, les muscles et le squelette, puis les organes internes. Le placenta commence à se former.",
    maman:
      "Le test de grossesse devient positif : l’hormone hCG est détectable dans les urines. Les seins peuvent déjà tirer, la fatigue s’installe.",
    conseils: [
      'Fais un test urinaire le matin, les urines sont plus concentrées.',
      'Note la date de tes dernières règles : c’est elle qui datera toute la grossesse.',
      'Évite l’automédication, même le paracétamol se prend à la dose la plus faible et le moins longtemps possible.',
    ],
    focus: 'Test de grossesse positif',
  },
  {
    sa: 5,
    taille: '2 mm',
    poids: '—',
    comparaison: 'une graine de sésame',
    emoji: '🌾',
    bebe:
      "Le tube neural se referme : c’est l’ébauche du cerveau et de la moelle épinière. Le cœur, encore un simple tube, se met à battre vers la fin de la semaine.",
    maman:
      "Les nausées peuvent débuter, souvent le matin mais pas seulement. Envie fréquente d’uriner, seins tendus, odorat en alerte.",
    conseils: [
      "L’acide folique protège justement la fermeture du tube neural : ne l’oublie aucun jour.",
      'Contre les nausées : mange peu mais souvent, et garde un biscuit sec sur la table de nuit.',
      'Préviens ton médecin ou ta sage-femme de tout traitement en cours.',
    ],
  },
  {
    sa: 6,
    taille: '4 mm',
    poids: '—',
    comparaison: 'une lentille',
    emoji: '🫘',
    bebe:
      "Le cœur bat à environ 110 battements par minute. Les bourgeons des bras et des jambes apparaissent, ainsi que les ébauches des yeux et des oreilles.",
    maman:
      "Fatigue parfois écrasante — la progestérone grimpe. L’humeur peut faire des montagnes russes : c’est hormonal, pas un défaut de caractère.",
    conseils: [
      'Dors dès que tu peux, même 20 minutes en journée.',
      'Prends rendez-vous pour la première consultation prénatale (avant 15 SA).',
      'Bois régulièrement : 1,5 à 2 L d’eau par jour, surtout si tu as des nausées.',
    ],
  },
  {
    sa: 7,
    taille: '1 cm',
    poids: '1 g',
    comparaison: 'une myrtille',
    emoji: '🫐',
    bebe:
      "Le cerveau se développe à toute vitesse, environ 100 nouvelles cellules nerveuses par minute. Les mains et les pieds ressemblent à de petites palmes.",
    maman:
      "L’utérus a la taille d’une orange. Salivation excessive, dégoûts alimentaires soudains, seins qui gonflent d’une taille.",
    conseils: [
      'Un aliment te dégoûte ? Remplace-le par un équivalent : peu importe la source, l’important est l’apport.',
      'Investis dans un soutien-gorge sans armatures, plus confortable.',
      'Note tes questions pour la première consultation, on oublie tout une fois sur place.',
    ],
  },
  {
    sa: 8,
    taille: '1,6 cm',
    poids: '1 g',
    comparaison: 'un haricot rouge',
    emoji: '🫘',
    bebe:
      "Les doigts se séparent, les paupières se forment, le nez se dessine. L’embryon bouge déjà, mais bien trop peu pour être senti.",
    maman:
      "Les nausées atteignent souvent leur pic entre 8 et 10 SA. Ballonnements, constipation, envie de dormir en permanence.",
    conseils: [
      'Le gingembre (infusion, morceau frais) soulage réellement les nausées chez beaucoup de femmes.',
      'Contre la constipation : fibres, eau riche en magnésium, et un peu de marche.',
      'Si tu vomis plus de 5 fois par jour ou que tu perds du poids, consulte : ce n’est plus banal.',
    ],
  },
  {
    sa: 9,
    taille: '2,3 cm',
    poids: '2 g',
    comparaison: 'une olive',
    emoji: '🫒',
    bebe:
      "Fin de la période embryonnaire : tous les organes essentiels sont ébauchés. Le cœur possède maintenant ses quatre cavités.",
    maman:
      "Le volume sanguin augmente déjà : possibles vertiges en se levant trop vite. Les gencives peuvent saigner au brossage.",
    conseils: [
      'Lève-toi en deux temps, assise d’abord, puis debout.',
      'Prends rendez-vous chez le dentiste : un examen bucco-dentaire est pris en charge à 100 %.',
      'Attention à la toxoplasmose si ta sérologie est négative : viande bien cuite, légumes lavés.',
    ],
  },
  {
    sa: 10,
    taille: '3,1 cm',
    poids: '4 g',
    comparaison: 'un pruneau',
    emoji: '🍇',
    bebe:
      "On ne dit plus embryon mais fœtus. Les ongles poussent, les organes génitaux se différencient, le squelette commence à s’ossifier.",
    maman:
      "L’utérus double presque de volume. Le ventre reste plat, mais les pantalons serrent déjà à la taille.",
    conseils: [
      "Prévois la première échographie : elle se fait entre 11 et 13 SA + 6 jours.",
      'Continue à bouger : 30 minutes de marche par jour, c’est le meilleur traitement contre presque tout.',
      'Déclare ta grossesse à la CPAM et à la CAF avant la fin du 3e mois.',
    ],
    focus: 'Déclaration de grossesse à préparer',
  },
  {
    sa: 11,
    taille: '4,1 cm',
    poids: '7 g',
    comparaison: 'un citron vert',
    emoji: '🍋',
    bebe:
      "Le fœtus s’entraîne : il ouvre et ferme les poings, avale du liquide amniotique, fait des mouvements de succion. Sa tête représente encore la moitié de son corps.",
    maman:
      "Souvent le moment où les nausées commencent à s’alléger. Le teint peut changer, en mieux ou en pire.",
    conseils: [
      'Échographie du 1er trimestre : mesure de la clarté nucale et datation précise.',
      'Un dépistage de la trisomie 21 te sera proposé — il reste ton choix, jamais une obligation.',
      'Hydrate ta peau du ventre dès maintenant, avant que ça ne tire.',
    ],
    focus: 'Échographie du 1er trimestre (11–13 SA + 6 j)',
  },
  {
    sa: 12,
    taille: '5,4 cm',
    poids: '14 g',
    comparaison: 'une clémentine',
    emoji: '🍊',
    bebe:
      "Les réflexes apparaissent : si on appuie sur le ventre, il s’écarte. Les intestins regagnent l’abdomen, les reins fabriquent de l’urine.",
    maman:
      "Le risque de fausse couche chute nettement. Beaucoup de femmes annoncent la nouvelle à cette période.",
    conseils: [
      'Bilan sanguin obligatoire : groupe sanguin, rubéole, toxoplasmose, syphilis, VIH proposé.',
      'Si tu prévois de continuer le sport, valide-le avec la sage-femme : la plupart des activités douces sont encouragées.',
      'Envoie ta déclaration de grossesse si ce n’est pas fait — elle déclenche tes droits.',
    ],
  },
  {
    sa: 13,
    taille: '7,4 cm',
    poids: '23 g',
    comparaison: 'un citron',
    emoji: '🍋',
    bebe:
      "Les cordes vocales se forment. Le fœtus a désormais ses empreintes digitales, uniques au monde. Il commence à percevoir les sons graves.",
    maman:
      "Entrée dans le 2e trimestre, souvent le plus agréable : énergie qui revient, appétit qui repart.",
    conseils: [
      'Ce n’est pas “manger pour deux” mais “manger deux fois mieux” : environ +200 kcal par jour au 2e trimestre.',
      'Pense au fer : lentilles, boudin noir bien cuit, viande rouge, associés à de la vitamine C.',
      'Commence les exercices doux du périnée avec ta sage-femme si elle le conseille.',
    ],
  },
  {
    sa: 14,
    taille: '8,7 cm',
    poids: '43 g',
    comparaison: 'une pêche',
    emoji: '🍑',
    bebe:
      "Un fin duvet, le lanugo, recouvre sa peau et le protège. Il fait des grimaces, fronce les sourcils, suce son pouce.",
    maman:
      "Le ventre commence à s’arrondir pour de bon. Possible ligne brune verticale (linea nigra), qui disparaîtra après.",
    conseils: [
      'Passe aux vêtements de grossesse ou une taille au-dessus : le confort compte plus que la garde-robe.',
      'Dors sur le côté gauche dès que possible, ça améliore la circulation vers le placenta.',
      'Protège-toi du soleil : la peau marque plus facilement (masque de grossesse).',
    ],
  },
  {
    sa: 15,
    taille: '10,1 cm',
    poids: '70 g',
    comparaison: 'une pomme',
    emoji: '🍎',
    bebe:
      "Il perçoit la lumière à travers la paroi, bouge beaucoup et se retourne dans un espace encore immense pour lui.",
    maman:
      "Appétit franc, énergie retrouvée. Le nez peut se boucher facilement (rhinite de grossesse), c’est bénin.",
    conseils: [
      'Dernier délai pour la 1re consultation prénatale obligatoire : elle doit avoir eu lieu avant 15 SA.',
      'Fractionne les repas : 3 repas + 1 à 2 collations évitent les coups de fatigue.',
      'Sérum physiologique plutôt que spray décongestionnant, contre-indiqué enceinte.',
    ],
    focus: '1re consultation prénatale au plus tard',
  },
  {
    sa: 16,
    taille: '11,6 cm',
    poids: '100 g',
    comparaison: 'un avocat',
    emoji: '🥑',
    bebe:
      "Ses jambes sont maintenant plus longues que ses bras. Il entend la voix de sa mère, son cœur, ses intestins : un vacarme permanent auquel il s’habitue.",
    maman:
      "Certaines femmes sentent les premiers mouvements, comme de petites bulles. Pour un premier bébé, c’est plutôt vers 20 SA.",
    conseils: [
      'Parle-lui, mets de la musique : il enregistre déjà les voix familières.',
      'Attention aux positions statiques prolongées, elles favorisent les jambes lourdes.',
      'Calcium : 3 produits laitiers par jour, ou équivalents (eaux calciques, amandes, tofu).',
    ],
  },
  {
    sa: 17,
    taille: '13 cm',
    poids: '140 g',
    comparaison: 'une poire',
    emoji: '🍐',
    bebe:
      "Le tissu graisseux se met en place sous la peau. Le cordon ombilical s’épaissit et se renforce.",
    maman:
      "Le centre de gravité se déplace : le dos tire, la démarche change. Les rêves deviennent souvent très intenses.",
    conseils: [
      'Plie les genoux plutôt que le dos pour ramasser quelque chose, dès maintenant.',
      'Une ceinture de grossesse peut soulager le bas du dos en fin de journée.',
      'Renseigne-toi sur les cours de préparation à la naissance : 8 séances remboursées à 100 %.',
    ],
  },
  {
    sa: 18,
    taille: '14,2 cm',
    poids: '190 g',
    comparaison: 'un poivron',
    emoji: '🫑',
    bebe:
      "Il bâille, s’étire, a des cycles de sommeil et d’éveil. La myéline commence à recouvrir ses nerfs.",
    maman:
      "L’utérus arrive au niveau du nombril. Essoufflement à l’effort, appétit soutenu.",
    conseils: [
      "Prépare la 2e échographie, dite morphologique, entre 20 et 25 SA.",
      'Mange du poisson deux fois par semaine dont un gras (sardine, maquereau) pour les oméga-3.',
      'Évite les positions allongées à plat sur le dos trop longtemps.',
    ],
  },
  {
    sa: 19,
    taille: '15,3 cm',
    poids: '240 g',
    comparaison: 'une mangue',
    emoji: '🥭',
    bebe:
      "Le vernix caseosa, un enduit blanc et gras, protège sa peau du liquide amniotique. Les papilles gustatives fonctionnent.",
    maman:
      "Possibles douleurs sur les côtés du ventre : ce sont les ligaments ronds qui s’étirent. C’est banal, ça passe en changeant de position.",
    conseils: [
      'Ce que tu manges parfume le liquide amniotique : la variété d’aujourd’hui prépare son goût de demain.',
      'Crampes nocturnes ? Magnésium, hydratation et étirement du mollet avant de dormir.',
      'Pense à un coussin de grossesse pour caler le ventre la nuit.',
    ],
  },
  {
    sa: 20,
    taille: '16,4 cm',
    poids: '300 g',
    comparaison: 'une banane',
    emoji: '🍌',
    bebe:
      "Mi-parcours. Ses cheveux poussent, ses ongles aussi. Il avale jusqu’à un demi-litre de liquide amniotique par jour.",
    maman:
      "Les mouvements deviennent nets pour presque toutes. Le ventre est visible de tous.",
    conseils: [
      'Échographie morphologique : l’examen le plus long, on y vérifie chaque organe.',
      'C’est souvent là qu’on peut connaître le sexe, si tu le souhaites.',
      'Fais-toi accompagner à cette écho, c’est un beau moment à partager.',
    ],
    focus: 'Échographie morphologique (20–25 SA)',
  },
  {
    sa: 21,
    taille: '25,6 cm',
    poids: '360 g',
    comparaison: 'une carotte',
    emoji: '🥕',
    bebe:
      "On le mesure désormais de la tête aux pieds. Son système digestif s’entraîne, la moelle osseuse fabrique ses globules rouges.",
    maman:
      "Faim plus présente, parfois brûlures d’estomac. Les seins peuvent laisser perler un liquide jaune, le colostrum.",
    conseils: [
      'Contre les remontées acides : repas légers, pas de position allongée juste après manger.',
      'Surélève la tête du lit de quelques centimètres plutôt qu’empiler les oreillers.',
      'Le colostrum qui perle est normal, pas besoin de s’inquiéter.',
    ],
  },
  {
    sa: 22,
    taille: '27,8 cm',
    poids: '430 g',
    comparaison: 'une courgette',
    emoji: '🥒',
    bebe:
      "Ses paupières se dessinent, ses sourcils apparaissent. Il réagit aux sons forts par un sursaut.",
    maman:
      "Peau sèche, démangeaisons sur le ventre qui s’étire. Chevelure souvent plus dense et brillante.",
    conseils: [
      'Huile végétale ou crème riche, matin et soir, sur le ventre, les hanches et les seins.',
      'Des démangeaisons intenses sur les paumes et les plantes doivent faire consulter rapidement.',
      'Bouge : natation, yoga prénatal, marche — l’eau soulage énormément le poids du ventre.',
    ],
  },
  {
    sa: 23,
    taille: '28,9 cm',
    poids: '501 g',
    comparaison: 'un gros pamplemousse',
    emoji: '🍈',
    bebe:
      "Ses poumons fabriquent le surfactant, la substance qui permettra aux alvéoles de s’ouvrir à la naissance.",
    maman:
      "Le ventre prend de l’avance sur l’équilibre : attention aux faux pas. Possibles gonflements légers des chevilles.",
    conseils: [
      'Chaussures plates et stables, on range les talons pour quelques mois.',
      'Jambes surélevées le soir contre le mur, 10 minutes, effet immédiat.',
      'Un gonflement brutal du visage ou des mains doit faire consulter le jour même.',
    ],
  },
  {
    sa: 24,
    taille: '30 cm',
    poids: '600 g',
    comparaison: 'un épi de maïs',
    emoji: '🌽',
    bebe:
      "Il entend nettement, distingue la voix du père de celle de la mère. Son cerveau développe ses circonvolutions.",
    maman:
      "Test de dépistage du diabète gestationnel entre 24 et 28 SA si tu présentes des facteurs de risque.",
    conseils: [
      'Le test O’Sullivan / HGPO est un peu désagréable mais bref : prévois de quoi t’occuper.',
      'Limite les sucres rapides isolés : associe-les toujours à des fibres ou des protéines.',
      'C’est le bon moment pour réfléchir au mode de garde, les places partent tôt.',
    ],
    focus: 'Dépistage du diabète gestationnel (24–28 SA)',
  },
  {
    sa: 25,
    taille: '34,6 cm',
    poids: '660 g',
    comparaison: 'un chou-rave',
    emoji: '🥬',
    bebe:
      "Ses narines s’ouvrent, il s’entraîne à respirer du liquide amniotique. Sa peau se lisse à mesure que la graisse s’installe.",
    maman:
      "Le sommeil se hache : envies d’uriner, ventre encombrant, jambes agitées.",
    conseils: [
      'Bois beaucoup en journée mais réduis après 19 h.',
      'Jambes sans repos : vérifie ton fer avec ta sage-femme, la carence est fréquente.',
      'Une sieste courte vaut mieux qu’une nuit blanche à essayer de rattraper.',
    ],
  },
  {
    sa: 26,
    taille: '35,6 cm',
    poids: '760 g',
    comparaison: 'un chou-fleur',
    emoji: '🥦',
    bebe:
      "Il ouvre les yeux pour la première fois. Ses mouvements deviennent puissants et parfaitement perceptibles de l’extérieur.",
    maman:
      "Ventre bien rond, essoufflement plus net. Les contractions de Braxton Hicks peuvent commencer : ventre dur, sans douleur.",
    conseils: [
      'Contractions indolores et irrégulières = normales. Douloureuses et régulières = on appelle.',
      'Fais toucher le ventre au futur papa au moment des coups, c’est le début de leur lien.',
      'Prépare la 3e échographie, entre 30 et 35 SA.',
    ],
  },
  {
    sa: 27,
    taille: '36,6 cm',
    poids: '875 g',
    comparaison: 'une salade',
    emoji: '🥬',
    bebe:
      "Il a le hoquet régulièrement — de petits soubresauts rythmés que tu vas apprendre à reconnaître.",
    maman:
      "Fin du 2e trimestre. La fatigue revient doucement, le dos se fait entendre.",
    conseils: [
      'Prépare ton dossier de congé maternité avec ton employeur.',
      'Séances de préparation à la naissance : commence-les maintenant si ce n’est pas fait.',
      'Continue le fer et le calcium, les besoins montent en flèche au 3e trimestre.',
    ],
  },
  {
    sa: 28,
    taille: '37,6 cm',
    poids: '1 005 g',
    comparaison: 'une aubergine',
    emoji: '🍆',
    bebe:
      "Un kilo. Il rêve — on observe des phases de sommeil paradoxal. Ses poumons pourraient fonctionner avec aide en cas de naissance prématurée.",
    maman:
      "Entrée dans le 3e trimestre. Consultations désormais mensuelles jusqu’à l’accouchement.",
    conseils: [
      'Injection d’anti-D si tu es de rhésus négatif : elle se fait vers 28 SA.',
      'Repère le trajet vers la maternité et le parking, une fois de jour, une fois de nuit.',
      'Commence à noter les mouvements du bébé : tu dois en sentir régulièrement chaque jour.',
    ],
    focus: 'Début du 3e trimestre',
  },
  {
    sa: 29,
    taille: '38,6 cm',
    poids: '1 150 g',
    comparaison: 'une courge butternut',
    emoji: '🎃',
    bebe:
      "Ses os durcissent et puisent beaucoup de calcium. Il prend maintenant environ 200 g par semaine.",
    maman:
      "Souffle court, brûlures d’estomac, envie d’uriner toutes les heures : l’utérus comprime tout.",
    conseils: [
      'Mange moins mais plus souvent, ton estomac est littéralement écrasé.',
      'Calcium quotidien indispensable : il puise dans tes réserves si tu n’en apportes pas assez.',
      'Réserve ta place à la maternité si ce n’est pas déjà fait.',
    ],
  },
  {
    sa: 30,
    taille: '39,9 cm',
    poids: '1 320 g',
    comparaison: 'un chou',
    emoji: '🥬',
    bebe:
      "Il distingue le jour de la nuit à travers la paroi. Sa moelle osseuse prend le relais complet de la fabrication du sang.",
    maman:
      "Le nombril peut ressortir. Les mouvements deviennent moins amples mais plus francs, il a moins de place.",
    conseils: [
      '3e échographie entre 30 et 35 SA : croissance, position, placenta.',
      'Prévois l’entretien avec l’anesthésiste, obligatoire avant l’accouchement.',
      'Commence à préparer la valise de maternité, sans stress, un peu chaque semaine.',
    ],
    focus: 'Échographie du 3e trimestre (30–35 SA)',
  },
  {
    sa: 31,
    taille: '41,1 cm',
    poids: '1 500 g',
    comparaison: 'une noix de coco',
    emoji: '🥥',
    bebe:
      "Il perçoit les saveurs, réagit à la lumière vive et tourne la tête vers les sons. Ses cinq sens fonctionnent.",
    maman:
      "Le sommeil est de plus en plus fragmenté. Les jambes lourdes et les hémorroïdes peuvent apparaître.",
    conseils: [
      'Hémorroïdes : fibres, eau, et surtout ne pas pousser aux toilettes. Ta sage-femme peut prescrire.',
      'Dors calée sur le côté gauche avec un coussin entre les genoux.',
      'Fais la liste de qui prévenir le jour J, et qui s’occupe de quoi.',
    ],
  },
  {
    sa: 32,
    taille: '42,4 cm',
    poids: '1 700 g',
    comparaison: 'une grosse courge',
    emoji: '🎃',
    bebe:
      "La plupart des bébés se placent tête en bas à cette période. Ses ongles atteignent le bout de ses doigts.",
    maman:
      "Contractions de Braxton Hicks plus fréquentes. Fatigue, essoufflement, et souvent une grande impatience.",
    conseils: [
      'Repose-toi vraiment : la fatigue du 3e trimestre n’est pas un caprice.',
      'Note les signes qui doivent faire partir à la maternité, affiche-les sur le frigo.',
      'Prépare aussi la valise du bébé, séparément de la tienne.',
    ],
  },
  {
    sa: 33,
    taille: '43,7 cm',
    poids: '1 920 g',
    comparaison: 'un ananas',
    emoji: '🍍',
    bebe:
      "Son système immunitaire reçoit tes anticorps, qui le protégeront pendant ses premiers mois.",
    maman:
      "Le bassin s’assouplit sous l’effet des hormones : douleurs possibles au pubis et aux hanches.",
    conseils: [
      'Douleur du pubis (syndrome de Lacomme) : évite d’écarter les jambes, serre les genoux pour sortir de voiture.',
      'Ostéopathe ou kiné spécialisé peuvent vraiment soulager.',
      'Séances de préparation : concentre-toi maintenant sur la respiration et la poussée.',
    ],
  },
  {
    sa: 34,
    taille: '45 cm',
    poids: '2 150 g',
    comparaison: 'un melon',
    emoji: '🍈',
    bebe:
      "Ses poumons sont presque matures. S’il naissait maintenant, il aurait d’excellentes chances sans soins lourds.",
    maman:
      "Le souffle se libère un peu quand le bébé descend dans le bassin. Mais la vessie, elle, souffre davantage.",
    conseils: [
      'Prélèvement vaginal de dépistage du streptocoque B entre 34 et 38 SA.',
      'Fais le point sur le projet de naissance avec la sage-femme : péridurale, positions, peau à peau.',
      'Prépare les repas à congeler pour le retour à la maison, tu te remercieras.',
    ],
    focus: 'Dépistage du streptocoque B (34–38 SA)',
  },
  {
    sa: 35,
    taille: '46,2 cm',
    poids: '2 380 g',
    comparaison: 'un melon miel',
    emoji: '🍈',
    bebe:
      "Il prend environ 30 g par jour, essentiellement de la graisse, qui régulera sa température à la naissance.",
    maman:
      "Consultation du 8e mois. Le col peut commencer à se modifier discrètement.",
    conseils: [
      'Consultation du 8e mois + entretien avec l’anesthésiste s’il n’a pas eu lieu.',
      'Valise prête et posée près de la porte à partir de maintenant.',
      'Papiers rassemblés : carte Vitale, mutuelle, dossier de maternité, carte d’identité.',
    ],
    focus: 'Consultation du 8e mois',
  },
  {
    sa: 36,
    taille: '47,4 cm',
    poids: '2 620 g',
    comparaison: 'une laitue romaine',
    emoji: '🥬',
    bebe:
      "Il perd une grande partie de son lanugo. Son crâne reste souple, les os ne sont pas soudés, pour passer le bassin.",
    maman:
      "Début du congé maternité pour un premier enfant (6 semaines avant le terme).",
    conseils: [
      'Profite de ce temps pour dormir, pas seulement pour tout ranger.',
      'Marche : elle aide le bébé à descendre et prépare le col.',
      'Rappelle-toi les signes d’alerte : perte de liquide, saignement, bébé qui ne bouge plus.',
    ],
    focus: 'Congé maternité (1er enfant)',
  },
  {
    sa: 37,
    taille: '48,6 cm',
    poids: '2 860 g',
    comparaison: 'une blette',
    emoji: '🥬',
    bebe:
      "Il est considéré comme né à terme dès 37 SA. Il s’entraîne à téter et à respirer en continu.",
    maman:
      "Contractions plus nettes, perte du bouchon muqueux possible — cela ne veut pas dire que c’est imminent.",
    conseils: [
      'Le bouchon muqueux peut partir des jours, voire des semaines avant : pas d’urgence.',
      'Chronomètre les contractions : régulières, douloureuses, toutes les 5 min pendant 1 h → on y va.',
      'Consultation du 9e mois cette semaine ou la prochaine.',
    ],
    focus: 'Bébé considéré à terme',
  },
  {
    sa: 38,
    taille: '49,8 cm',
    poids: '3 080 g',
    comparaison: 'un poireau',
    emoji: '🥬',
    bebe:
      "Son intestin est rempli de méconium, la première selle noire qu’il émettra après la naissance.",
    maman:
      "Consultation du 9e mois : on vérifie la position du bébé et on évalue le bassin.",
    conseils: [
      'Repose-toi sans culpabiliser, la maison peut attendre.',
      'Repasse mentalement le trajet et le scénario du départ, ça calme beaucoup.',
      'Mange équilibré et léger : ton corps a besoin de réserves pour le jour J.',
    ],
    focus: 'Consultation du 9e mois',
  },
  {
    sa: 39,
    taille: '50,7 cm',
    poids: '3 290 g',
    comparaison: 'une pastèque',
    emoji: '🍉',
    bebe:
      "Il continue de prendre du poids et de constituer sa graisse brune. Tout est prêt, il attend le signal.",
    maman:
      "Sensation de pression dans le bassin, envie irrépressible de tout ranger : l’instinct de nidification.",
    conseils: [
      'Économise ton énergie, tu en auras besoin.',
      'Reste joignable et garde ton téléphone chargé.',
      'Aucun signe ne prédit vraiment la date : ne compte pas les jours, vis-les.',
    ],
  },
  {
    sa: 40,
    taille: '51,2 cm',
    poids: '3 460 g',
    comparaison: 'un potiron',
    emoji: '🎃',
    bebe:
      "Terme théorique. Seuls 5 % des bébés naissent le jour prévu — c’est une moyenne, pas un rendez-vous.",
    maman:
      "L’attente est difficile. Surveillance rapprochée à partir de maintenant.",
    conseils: [
      'Surveillance au moins tous les 2 jours après 41 SA.',
      'Continue de compter les mouvements du bébé chaque jour.',
      'Marche, ballon, câlins : rien n’est magique, mais rien ne fait de mal non plus.',
    ],
    focus: 'Terme théorique (DPA)',
  },
  {
    sa: 41,
    taille: '51,7 cm',
    poids: '3 600 g',
    comparaison: 'un gros potiron',
    emoji: '🎃',
    bebe:
      "Sa peau peut être un peu sèche, le vernix a presque disparu. Il va très bien, il prend son temps.",
    maman:
      "Terme dépassé : monitoring et échographie régulièrement. Un déclenchement sera proposé, généralement vers 41 SA + 5 j.",
    conseils: [
      'Rends-toi à chaque contrôle, même si tu te sens parfaitement bien.',
      'Le déclenchement est encadré et discuté avec toi : pose toutes tes questions.',
      'Tu y es presque. Vraiment.',
    ],
    focus: 'Terme dépassé — surveillance rapprochée',
  },
]
