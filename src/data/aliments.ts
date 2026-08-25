export type Statut = 'oui' | 'prudence' | 'non'

export type Categorie =
  | 'Fromages & laitages'
  | 'Viandes & charcuterie'
  | 'Poissons & fruits de mer'
  | 'Œufs & préparations'
  | 'Fruits & légumes'
  | 'Boissons'
  | 'Sucré & épicerie'
  | 'Plantes & compléments'
  | 'Plats & recettes'

export type Aliment = {
  nom: string
  cat: Categorie
  statut: Statut
  /** Verdict en une ligne */
  resume: string
  /** Le pourquoi, en clair */
  pourquoi: string
  /** Comment s’en sortir quand même */
  astuce?: string
  /** Synonymes pour la recherche */
  mots?: string[]
}

export const STATUT_LABEL: Record<Statut, string> = {
  oui: 'Autorisé',
  prudence: 'Sous conditions',
  non: 'À éviter',
}

export const ALIMENTS: Aliment[] = [
  // ---------- Fromages & laitages ----------
  {
    nom: 'Fromage au lait cru (camembert, reblochon, roquefort…)',
    cat: 'Fromages & laitages',
    statut: 'non',
    resume: 'À éviter pendant toute la grossesse.',
    pourquoi:
      "Le lait cru n’a subi aucun traitement thermique : la listeria peut y survivre et s’y multiplier, même au réfrigérateur. La listériose est rare mais grave pour le bébé.",
    astuce:
      'Bien cuit à cœur (fondu et bouillonnant dans une tartiflette, une quiche, un gratin), il redevient sans danger.',
    mots: ['camembert', 'reblochon', 'roquefort', 'brie', 'munster', 'lait cru', 'bleu'],
  },
  {
    nom: 'Fromage à pâte pressée cuite (comté, gruyère, beaufort, emmental, parmesan)',
    cat: 'Fromages & laitages',
    statut: 'oui',
    resume: 'Oui, même au lait cru — mais sans la croûte.',
    pourquoi:
      "Ces fromages sont chauffés à haute température et très pauvres en eau : la listeria ne s’y développe pas. C’est la seule famille de fromages au lait cru autorisée.",
    astuce: 'Retire toujours la croûte, c’est là que se concentrent les bactéries de surface.',
    mots: ['comté', 'gruyère', 'beaufort', 'emmental', 'parmesan', 'abondance', 'pâte dure'],
  },
  {
    nom: 'Fromage pasteurisé à pâte molle (brie, camembert pasteurisés)',
    cat: 'Fromages & laitages',
    statut: 'prudence',
    resume: 'Possible si pasteurisé et sans la croûte.',
    pourquoi:
      "La pasteurisation élimine la listeria du lait, mais la croûte peut être recontaminée pendant l’affinage et le conditionnement.",
    astuce: 'Vérifie « au lait pasteurisé » sur l’étiquette, retire la croûte, et consomme rapidement après ouverture.',
    mots: ['brie pasteurisé', 'pâte molle', 'coulommiers'],
  },
  {
    nom: 'Mozzarella, feta, ricotta, burrata',
    cat: 'Fromages & laitages',
    statut: 'prudence',
    resume: 'Oui si l’étiquette indique « lait pasteurisé ».',
    pourquoi:
      "Ces fromages frais et humides sont un terrain idéal pour la listeria s’ils sont au lait cru. Pasteurisés, ils ne posent pas de problème.",
    astuce: 'Au restaurant, en cas de doute, demande — ou choisis autre chose.',
    mots: ['mozzarella', 'feta', 'ricotta', 'burrata', 'mozza'],
  },
  {
    nom: 'Fromage râpé industriel',
    cat: 'Fromages & laitages',
    statut: 'oui',
    resume: 'Oui, sans réserve.',
    pourquoi: 'Fabriqué à partir de pâtes pressées cuites pasteurisées, sans croûte.',
    mots: ['râpé', 'rapé', 'gratin'],
  },
  {
    nom: 'Raclette, fondue, tartiflette',
    cat: 'Fromages & laitages',
    statut: 'prudence',
    resume: 'Oui si le fromage est vraiment fondu et bien chaud.',
    pourquoi:
      "La chaleur détruit la listeria. Le risque vient du fromage tiède ou à peine ramolli, et de la croûte.",
    astuce: 'Retire la croûte avant, et attends que ça bouillonne, pas juste que ça ramollisse.',
    mots: ['raclette', 'fondue', 'tartiflette', 'savoyarde'],
  },
  {
    nom: 'Lait cru',
    cat: 'Fromages & laitages',
    statut: 'non',
    resume: 'Non, sauf porté à ébullition.',
    pourquoi: 'Il peut contenir listeria, salmonelle ou E. coli.',
    astuce: 'Fais-le bouillir 1 à 2 minutes et il devient consommable.',
    mots: ['lait cru', 'lait de ferme'],
  },
  {
    nom: 'Lait pasteurisé, UHT, en poudre',
    cat: 'Fromages & laitages',
    statut: 'oui',
    resume: 'Oui, et c’est une excellente source de calcium.',
    pourquoi: 'Traité thermiquement, donc sans risque microbiologique.',
    mots: ['lait', 'uht', 'demi-écrémé'],
  },
  {
    nom: 'Yaourts, fromage blanc, petits-suisses',
    cat: 'Fromages & laitages',
    statut: 'oui',
    resume: 'Oui, à volonté ou presque.',
    pourquoi: 'Fabriqués avec du lait pasteurisé. Riches en calcium et en protéines, faciles à digérer.',
    astuce: 'Deux à trois produits laitiers par jour couvrent une bonne partie de tes besoins en calcium.',
    mots: ['yaourt', 'fromage blanc', 'skyr', 'petit suisse'],
  },
  {
    nom: 'Beurre, crème fraîche pasteurisée',
    cat: 'Fromages & laitages',
    statut: 'oui',
    resume: 'Oui, en quantité raisonnable.',
    pourquoi: 'Produits pasteurisés. Le beurre apporte de la vitamine A sous forme sûre aux doses alimentaires.',
    mots: ['beurre', 'crème'],
  },

  // ---------- Viandes & charcuterie ----------
  {
    nom: 'Viande crue ou saignante (tartare, carpaccio, steak bleu)',
    cat: 'Viandes & charcuterie',
    statut: 'non',
    resume: 'Non. La viande doit être cuite à cœur.',
    pourquoi:
      "Risque de toxoplasmose (surtout si ta sérologie est négative) et de bactéries comme E. coli ou salmonelle.",
    astuce: 'Plus de jus rosé au centre : la viande doit être uniformément grise/brune à cœur.',
    mots: ['tartare', 'carpaccio', 'saignant', 'bleu', 'cru'],
  },
  {
    nom: 'Viande bien cuite (bœuf, veau, agneau, porc, volaille)',
    cat: 'Viandes & charcuterie',
    statut: 'oui',
    resume: 'Oui, et c’est une très bonne source de fer.',
    pourquoi: 'Une cuisson à cœur détruit toxoplasme et bactéries.',
    astuce: 'La viande rouge bien cuite, 2 à 3 fois par semaine, aide à couvrir les besoins en fer qui explosent.',
    mots: ['boeuf', 'poulet', 'porc', 'agneau', 'viande'],
  },
  {
    nom: 'Viande hachée, steak haché',
    cat: 'Viandes & charcuterie',
    statut: 'prudence',
    resume: 'Oui, mais cuit à cœur, jamais rosé.',
    pourquoi:
      'Le hachage répartit les bactéries de surface dans toute la viande : le centre doit donc être parfaitement cuit.',
    mots: ['haché', 'steak haché', 'bolognaise'],
  },
  {
    nom: 'Jambon blanc (jambon cuit)',
    cat: 'Viandes & charcuterie',
    statut: 'prudence',
    resume: 'Possible, préemballé et consommé rapidement.',
    pourquoi:
      "C’est une charcuterie cuite, donc sans toxoplasme, mais elle peut être recontaminée par la listeria après cuisson, surtout à la coupe.",
    astuce: 'Préfère le préemballé au jambon à la coupe, et mange-le dans les 24 h après ouverture. Poêlé, il ne pose aucun problème.',
    mots: ['jambon', 'jambon blanc', 'jambon cuit'],
  },
  {
    nom: 'Jambon cru, chorizo, saucisson sec, coppa',
    cat: 'Viandes & charcuterie',
    statut: 'non',
    resume: 'Non, sauf bien cuit dans un plat.',
    pourquoi: 'Charcuteries crues séchées : risque de toxoplasmose et de listeria.',
    astuce: 'Sur une pizza bien cuite ou dans une quiche au four, c’est autorisé.',
    mots: ['jambon cru', 'serrano', 'parme', 'chorizo', 'saucisson', 'coppa', 'bresaola'],
  },
  {
    nom: 'Rillettes, pâté, terrine, foie gras, produits en gelée',
    cat: 'Viandes & charcuterie',
    statut: 'non',
    resume: 'Non pendant toute la grossesse.',
    pourquoi:
      'Ce sont les aliments les plus souvent en cause dans les listérioses. Le foie gras cumule en plus un excès de vitamine A.',
    mots: ['rillettes', 'pâté', 'pate', 'terrine', 'foie gras', 'gelée', 'museau'],
  },
  {
    nom: 'Foie et abats (foie de veau, de volaille, rognons)',
    cat: 'Viandes & charcuterie',
    statut: 'non',
    resume: 'À éviter, même bien cuits.',
    pourquoi:
      "Le foie concentre énormément de vitamine A. À forte dose, elle est toxique pour le développement du bébé, surtout au 1er trimestre.",
    astuce: 'Pour le fer, remplace-le par du boudin noir bien cuit, des lentilles ou de la viande rouge.',
    mots: ['foie', 'abats', 'rognons', 'ris de veau'],
  },
  {
    nom: 'Boudin noir bien cuit',
    cat: 'Viandes & charcuterie',
    statut: 'oui',
    resume: 'Oui, bien cuit : champion du fer.',
    pourquoi: "C’est l’aliment le plus riche en fer très bien absorbé (fer héminique).",
    astuce: 'Accompagne-le d’un fruit ou de légumes riches en vitamine C pour absorber encore mieux le fer.',
    mots: ['boudin'],
  },
  {
    nom: 'Gibier',
    cat: 'Viandes & charcuterie',
    statut: 'non',
    resume: 'Mieux vaut s’en passer.',
    pourquoi: 'Risque de résidus de plomb liés aux munitions, et de toxoplasmose.',
    mots: ['gibier', 'chevreuil', 'sanglier', 'faisan'],
  },
  {
    nom: 'Nuggets, cordons bleus, plats préparés à réchauffer',
    cat: 'Viandes & charcuterie',
    statut: 'oui',
    resume: 'Oui, bien cuits et bien chauds.',
    pourquoi: 'La cuisson complète élimine les risques microbiologiques.',
    astuce: 'Réchauffe toujours à plus de 70 °C à cœur, pas juste tiède.',
    mots: ['nuggets', 'cordon bleu', 'plat préparé', 'micro-ondes'],
  },

  // ---------- Poissons & fruits de mer ----------
  {
    nom: 'Poisson cru, sushi, sashimi, ceviche',
    cat: 'Poissons & fruits de mer',
    statut: 'non',
    resume: 'Non pendant la grossesse.',
    pourquoi: 'Risque de listeria et de parasites (anisakis).',
    astuce: 'Au restaurant japonais : makis cuits, brochettes yakitori, tempura, riz et légumes.',
    mots: ['sushi', 'sashimi', 'maki', 'ceviche', 'poisson cru', 'tartare de poisson'],
  },
  {
    nom: 'Saumon fumé, truite fumée, poissons fumés',
    cat: 'Poissons & fruits de mer',
    statut: 'non',
    resume: 'Non, sauf cuit dans un plat chaud.',
    pourquoi:
      "Le fumage à froid ne détruit pas la listeria, et ces produits se conservent longtemps au frais — le temps qu’elle se multiplie.",
    astuce: 'Dans une quiche ou des pâtes bien chaudes (plus de 70 °C), c’est possible.',
    mots: ['saumon fumé', 'truite fumée', 'haddock', 'fumé'],
  },
  {
    nom: 'Poisson bien cuit (cabillaud, colin, sole, saumon…)',
    cat: 'Poissons & fruits de mer',
    statut: 'oui',
    resume: 'Oui, deux fois par semaine idéalement.',
    pourquoi:
      "Le poisson apporte des protéines, de l’iode et surtout des oméga-3 (DHA), essentiels au cerveau et à la rétine du bébé.",
    astuce: 'Une fois un poisson gras (sardine, maquereau, saumon), une fois un poisson maigre. Varie les espèces et les provenances.',
    mots: ['poisson', 'cabillaud', 'colin', 'saumon', 'sole', 'merlu'],
  },
  {
    nom: 'Espadon, marlin, requin, siki, lamproie',
    cat: 'Poissons & fruits de mer',
    statut: 'non',
    resume: 'Interdits pendant la grossesse.',
    pourquoi:
      'Ces grands prédateurs accumulent le méthylmercure, toxique pour le système nerveux du bébé en formation.',
    mots: ['espadon', 'marlin', 'requin', 'siki', 'lamproie', 'mercure'],
  },
  {
    nom: 'Thon (frais ou en conserve)',
    cat: 'Poissons & fruits de mer',
    statut: 'prudence',
    resume: 'Une fois par semaine maximum.',
    pourquoi: "Le thon est un gros poisson qui concentre du mercure, moins que l’espadon mais suffisamment pour être limité.",
    astuce: 'Alterne avec des sardines ou du maquereau, plus petits et bien moins contaminés.',
    mots: ['thon', 'thon en boîte'],
  },
  {
    nom: 'Lotte, bar (loup), dorade, flétan, brochet, anguille',
    cat: 'Poissons & fruits de mer',
    statut: 'prudence',
    resume: 'Occasionnellement, pas chaque semaine.',
    pourquoi: 'Poissons prédateurs ou d’eau douce, susceptibles de concentrer mercure ou PCB.',
    mots: ['lotte', 'bar', 'loup', 'dorade', 'flétan', 'brochet', 'anguille', 'raie'],
  },
  {
    nom: 'Sardines, maquereaux, harengs (en conserve ou cuits)',
    cat: 'Poissons & fruits de mer',
    statut: 'oui',
    resume: 'Oui, à privilégier.',
    pourquoi: 'Petits poissons gras : beaucoup d’oméga-3, très peu de mercure, et du calcium si tu manges les arêtes.',
    mots: ['sardine', 'maquereau', 'hareng', 'anchois'],
  },
  {
    nom: 'Huîtres, coquillages crus',
    cat: 'Poissons & fruits de mer',
    statut: 'non',
    resume: 'Non pendant la grossesse.',
    pourquoi: 'Risque élevé de norovirus, listeria et hépatite A.',
    astuce: 'Cuits (gratinés, en sauce), les coquillages sont autorisés.',
    mots: ['huitre', 'huître', 'coquillage', 'palourde', 'moule crue'],
  },
  {
    nom: 'Moules, crevettes, coquilles Saint-Jacques cuites',
    cat: 'Poissons & fruits de mer',
    statut: 'oui',
    resume: 'Oui, bien cuits et bien chauds.',
    pourquoi: 'La cuisson élimine les micro-organismes. Ce sont d’excellentes sources d’iode et de fer.',
    astuce: 'Jette les moules qui ne se sont pas ouvertes à la cuisson.',
    mots: ['moules', 'crevettes', 'saint-jacques', 'gambas', 'fruits de mer cuits'],
  },
  {
    nom: 'Surimi',
    cat: 'Poissons & fruits de mer',
    statut: 'oui',
    resume: 'Oui, produit cuit et pasteurisé.',
    pourquoi: 'Le surimi est fabriqué à partir de chair de poisson cuite. Peu intéressant nutritionnellement, mais sans risque.',
    astuce: 'Consomme-le rapidement après ouverture du paquet.',
    mots: ['surimi', 'bâtonnet'],
  },
  {
    nom: 'Tarama, poutargue, œufs de poisson',
    cat: 'Poissons & fruits de mer',
    statut: 'non',
    resume: 'À éviter.',
    pourquoi: 'Produits crus ou fumés à froid, très sensibles à la listeria.',
    mots: ['tarama', 'oeufs de poisson', 'caviar', 'poutargue'],
  },

  // ---------- Œufs & préparations ----------
  {
    nom: 'Œufs bien cuits (durs, omelette ferme)',
    cat: 'Œufs & préparations',
    statut: 'oui',
    resume: 'Oui, jaune et blanc bien pris.',
    pourquoi: 'Excellente source de protéines et de choline, importante pour le cerveau du bébé.',
    mots: ['oeuf', 'omelette', 'oeuf dur'],
  },
  {
    nom: 'Œuf à la coque, mollet, au plat baveux, œuf poché',
    cat: 'Œufs & préparations',
    statut: 'non',
    resume: 'Non, le jaune doit être cuit.',
    pourquoi: 'Risque de salmonellose : une forte fièvre et une déshydratation ne sont jamais anodines enceinte.',
    astuce: 'Un œuf au plat cuit doucement à couvert : le jaune se voile et devient sûr.',
    mots: ['coque', 'mollet', 'baveux', 'poché', 'oeuf au plat'],
  },
  {
    nom: 'Mousse au chocolat, tiramisu, mayonnaise maison',
    cat: 'Œufs & préparations',
    statut: 'non',
    resume: 'Non si préparés avec des œufs crus.',
    pourquoi: 'Œufs crus = risque de salmonelle.',
    astuce: 'Les versions industrielles sont faites avec des œufs pasteurisés : elles sont autorisées.',
    mots: ['mousse au chocolat', 'tiramisu', 'mayonnaise', 'pâte à gâteau crue'],
  },
  {
    nom: 'Mayonnaise et sauces industrielles',
    cat: 'Œufs & préparations',
    statut: 'oui',
    resume: 'Oui, elles utilisent des œufs pasteurisés.',
    pourquoi: 'Pas de risque microbiologique. Reste juste attentive aux quantités.',
    mots: ['mayonnaise industrielle', 'sauce', 'aïoli industriel'],
  },

  // ---------- Fruits & légumes ----------
  {
    nom: 'Fruits et légumes crus',
    cat: 'Fruits & légumes',
    statut: 'prudence',
    resume: 'Oui, à condition de très bien les laver.',
    pourquoi:
      'La terre peut porter le toxoplasme. C’est le principal risque des crudités, pas le légume lui-même.',
    astuce:
      'Lave à grande eau, frotte, et pèle quand c’est possible. Une eau vinaigrée aide à décoller la terre.',
    mots: ['salade', 'crudités', 'légumes', 'fruits', 'tomate', 'concombre'],
  },
  {
    nom: 'Salades préparées, crudités traiteur, buffets',
    cat: 'Fruits & légumes',
    statut: 'non',
    resume: 'À éviter.',
    pourquoi:
      'Lavage incertain, chaîne du froid mal maîtrisée, manipulations multiples : c’est un classique de la listériose.',
    astuce: 'Prépare la même salade chez toi, tu sais exactement ce qu’il y a dedans.',
    mots: ['salade traiteur', 'buffet', 'sandwich', 'crudités'],
  },
  {
    nom: 'Graines germées crues (soja, alfalfa, radis)',
    cat: 'Fruits & légumes',
    statut: 'non',
    resume: 'Non crues.',
    pourquoi: 'Leur milieu de culture chaud et humide favorise la prolifération bactérienne.',
    astuce: 'Bien cuites au wok, elles sont autorisées.',
    mots: ['germes', 'soja', 'alfalfa', 'pousses'],
  },
  {
    nom: 'Herbes fraîches (persil, coriandre, basilic)',
    cat: 'Fruits & légumes',
    statut: 'prudence',
    resume: 'Oui, soigneusement lavées.',
    pourquoi: 'Souvent pleines de terre, donc potentiellement de toxoplasme.',
    mots: ['persil', 'coriandre', 'basilic', 'herbes', 'menthe'],
  },
  {
    nom: 'Champignons crus ou sauvages',
    cat: 'Fruits & légumes',
    statut: 'prudence',
    resume: 'Cuits et cultivés, oui. Crus ou cueillis, non.',
    pourquoi: 'Les champignons sauvages concentrent métaux lourds et toxines, et le risque de confusion existe.',
    mots: ['champignon', 'cèpe', 'girolle'],
  },
  {
    nom: 'Légumineuses (lentilles, pois chiches, haricots)',
    cat: 'Fruits & légumes',
    statut: 'oui',
    resume: 'Oui, à mettre au menu régulièrement.',
    pourquoi: 'Fer, fibres, folates, protéines : elles cochent presque toutes les cases de la grossesse.',
    astuce: 'Un filet de citron dessus double quasiment l’absorption du fer végétal.',
    mots: ['lentilles', 'pois chiches', 'haricots', 'légumineuses'],
  },
  {
    nom: 'Fruits secs et oléagineux (amandes, noix, noisettes)',
    cat: 'Fruits & légumes',
    statut: 'oui',
    resume: 'Oui, une petite poignée par jour.',
    pourquoi: 'Magnésium, calcium, bons lipides. Parfaits en collation pour éviter les fringales.',
    astuce: 'Les cacahuètes ne sont plus déconseillées : elles ne provoquent pas d’allergie chez le bébé.',
    mots: ['amandes', 'noix', 'noisettes', 'cacahuètes', 'fruits secs'],
  },

  // ---------- Boissons ----------
  {
    nom: 'Alcool (vin, bière, spiritueux)',
    cat: 'Boissons',
    statut: 'non',
    resume: 'Zéro alcool, pendant toute la grossesse.',
    pourquoi:
      "L’alcool traverse le placenta et atteint le bébé à la même concentration que toi. Aucune dose seuil n’a été démontrée comme sûre.",
    astuce: 'En soirée : jus, eau pétillante avec du citron, sirop, ou une boisson 0,0 %.',
    mots: ['alcool', 'vin', 'bière', 'champagne', 'cocktail'],
  },
  {
    nom: 'Bière ou vin sans alcool',
    cat: 'Boissons',
    statut: 'prudence',
    resume: 'Préfère les 0,0 % stricts.',
    pourquoi: 'Les mentions « sans alcool » autorisent jusqu’à 0,5 % d’alcool résiduel.',
    astuce: 'Cherche explicitement « 0,0 % » sur l’étiquette.',
    mots: ['sans alcool', '0,0', 'bière sans alcool'],
  },
  {
    nom: 'Café',
    cat: 'Boissons',
    statut: 'prudence',
    resume: 'Maximum 200 mg de caféine par jour (≈ 2 expressos).',
    pourquoi:
      'La caféine traverse le placenta et le bébé l’élimine très lentement. Au-delà, on observe un risque accru de petit poids de naissance.',
    astuce: 'Compte tout : café, thé, sodas au cola, chocolat noir. Le déca est libre.',
    mots: ['café', 'expresso', 'caféine'],
  },
  {
    nom: 'Thé et thé vert',
    cat: 'Boissons',
    statut: 'prudence',
    resume: 'Oui, mais pas pendant les repas.',
    pourquoi:
      'Il contient de la caféine (à compter dans les 200 mg) et surtout des tanins qui bloquent l’absorption du fer.',
    astuce: 'Bois-le à distance des repas, au moins une heure avant ou après.',
    mots: ['thé', 'thé vert', 'matcha'],
  },
  {
    nom: 'Boissons énergisantes',
    cat: 'Boissons',
    statut: 'non',
    resume: 'Non.',
    pourquoi: 'Très fortement caféinées, avec de la taurine et des extraits de plantes non évalués chez la femme enceinte.',
    mots: ['red bull', 'énergisante', 'taurine'],
  },
  {
    nom: 'Sodas et jus de fruits industriels',
    cat: 'Boissons',
    statut: 'prudence',
    resume: 'Occasionnellement.',
    pourquoi: 'Beaucoup de sucres rapides, qui favorisent la prise de poids et le diabète gestationnel.',
    astuce: 'Un fruit entier rassasie bien plus qu’un verre de jus, à sucre équivalent.',
    mots: ['soda', 'jus', 'coca', 'limonade'],
  },
  {
    nom: 'Jus de fruits frais pressés en boutique',
    cat: 'Boissons',
    statut: 'prudence',
    resume: 'Uniquement si tu vois les fruits être lavés et pressés.',
    pourquoi: 'Fruits mal lavés et machines mal nettoyées peuvent transmettre toxoplasme ou bactéries.',
    mots: ['jus pressé', 'jus frais', 'smoothie'],
  },
  {
    nom: 'Kombucha, kéfir non pasteurisé',
    cat: 'Boissons',
    statut: 'non',
    resume: 'À éviter.',
    pourquoi: 'Boissons fermentées non pasteurisées : flore incontrôlée et traces d’alcool.',
    mots: ['kombucha', 'kéfir', 'fermenté'],
  },
  {
    nom: 'Eau du robinet',
    cat: 'Boissons',
    statut: 'oui',
    resume: 'Oui, 1,5 à 2 L par jour.',
    pourquoi: 'Elle est contrôlée en permanence. L’hydratation prévient constipation, infections urinaires et contractions.',
    astuce: 'Dans un logement ancien avec des canalisations en plomb, laisse couler l’eau avant de la boire, ou prends de l’eau en bouteille.',
    mots: ['eau', 'hydratation'],
  },
  {
    nom: 'Eaux minérales riches en calcium ou en magnésium',
    cat: 'Boissons',
    statut: 'oui',
    resume: 'Un vrai coup de pouce.',
    pourquoi: 'Certaines eaux apportent autant de calcium qu’un produit laitier, ou du magnésium contre les crampes.',
    astuce: 'Alterne avec l’eau du robinet, et évite les eaux très salées si tu fais de la rétention d’eau.',
    mots: ['hepar', 'contrex', 'courmayeur', 'eau minérale'],
  },

  // ---------- Sucré & épicerie ----------
  {
    nom: 'Glaces industrielles',
    cat: 'Sucré & épicerie',
    statut: 'oui',
    resume: 'Oui, elles sont pasteurisées.',
    pourquoi: 'Fabriquées avec des ingrédients pasteurisés dans des conditions contrôlées.',
    astuce: 'Vérifie que le bac n’a pas subi de rupture de la chaîne du froid (cristaux de glace, texture granuleuse).',
    mots: ['glace', 'crème glacée', 'sorbet'],
  },
  {
    nom: 'Glaces artisanales, machines à glace italienne',
    cat: 'Sucré & épicerie',
    statut: 'prudence',
    resume: 'Mieux vaut s’abstenir.',
    pourquoi: 'Œufs parfois crus et machines difficiles à nettoyer : listeria et salmonelle y ont été retrouvées.',
    mots: ['glace italienne', 'glacier', 'artisanale'],
  },
  {
    nom: 'Chocolat',
    cat: 'Sucré & épicerie',
    statut: 'oui',
    resume: 'Oui, avec plaisir et modération.',
    pourquoi: 'Le chocolat noir contient un peu de caféine et de magnésium. Rien d’inquiétant aux doses habituelles.',
    mots: ['chocolat', 'cacao'],
  },
  {
    nom: 'Miel',
    cat: 'Sucré & épicerie',
    statut: 'oui',
    resume: 'Oui pour toi.',
    pourquoi: 'Aucun risque pendant la grossesse.',
    astuce: 'En revanche, jamais avant 1 an pour le bébé, à cause du botulisme infantile.',
    mots: ['miel'],
  },
  {
    nom: 'Réglisse (bonbons, pastis sans alcool, tisanes)',
    cat: 'Sucré & épicerie',
    statut: 'prudence',
    resume: 'En petite quantité seulement.',
    pourquoi: 'La glycyrrhizine fait monter la tension artérielle et favorise la rétention d’eau.',
    mots: ['réglisse', 'reglisse', 'antésite', 'zan'],
  },
  {
    nom: 'Édulcorants (aspartame, sucralose, stévia)',
    cat: 'Sucré & épicerie',
    statut: 'prudence',
    resume: 'Autorisés, mais sans en abuser.',
    pourquoi: 'Ils sont considérés comme sûrs aux doses habituelles. Ils entretiennent toutefois le goût du sucré.',
    mots: ['aspartame', 'stévia', 'édulcorant', 'sucralose'],
  },
  {
    nom: 'Pain, pâtes, riz, céréales complètes',
    cat: 'Sucré & épicerie',
    statut: 'oui',
    resume: 'Oui, à chaque repas.',
    pourquoi: 'Les féculents stabilisent la glycémie et évitent les fringales. Les versions complètes apportent fibres et magnésium.',
    astuce: 'Des féculents à chaque repas limitent nettement les nausées du 1er trimestre.',
    mots: ['pain', 'pâtes', 'riz', 'féculents', 'céréales'],
  },
  {
    nom: 'Soja et dérivés (tofu, boisson de soja)',
    cat: 'Sucré & épicerie',
    statut: 'prudence',
    resume: 'Une portion par jour maximum.',
    pourquoi: 'Le soja contient des phyto-œstrogènes, dont l’effet sur le développement du bébé n’est pas totalement connu.',
    astuce: 'Alterne avec d’autres sources de protéines végétales : lentilles, pois chiches, quinoa.',
    mots: ['soja', 'tofu', 'tonyu', 'edamame'],
  },
  {
    nom: 'Restes de repas',
    cat: 'Sucré & épicerie',
    statut: 'prudence',
    resume: 'Oui, réchauffés à plus de 70 °C.',
    pourquoi: 'La listeria se multiplie même au réfrigérateur. Le froid ne suffit pas, la chaleur oui.',
    astuce: 'Consomme les restes dans les 24 h et réchauffe-les bien fumants, pas juste tièdes.',
    mots: ['restes', 'réchauffer', 'frigo'],
  },

  // ---------- Plantes & compléments ----------
  {
    nom: 'Acide folique (vitamine B9)',
    cat: 'Plantes & compléments',
    statut: 'oui',
    resume: 'Indispensable : 400 µg/jour jusqu’à 12 SA.',
    pourquoi: 'Il réduit fortement le risque de malformation du tube neural (spina bifida).',
    astuce: 'Idéalement commencé avant la conception, et poursuivi tout le 1er trimestre.',
    mots: ['b9', 'folates', 'acide folique', 'spéciafoldine'],
  },
  {
    nom: 'Vitamine D',
    cat: 'Plantes & compléments',
    statut: 'oui',
    resume: 'Une ampoule est systématiquement prescrite au 6e ou 7e mois.',
    pourquoi: 'Elle permet au bébé de fixer le calcium et de constituer son squelette.',
    mots: ['vitamine d', 'uvedose'],
  },
  {
    nom: 'Compléments de vitamine A / rétinol',
    cat: 'Plantes & compléments',
    statut: 'non',
    resume: 'Non, sauf prescription.',
    pourquoi: 'Un excès de vitamine A est tératogène, en particulier au 1er trimestre.',
    astuce: 'Vérifie que ton complément « spécial grossesse » n’en contient pas, ou seulement sous forme de bêta-carotène.',
    mots: ['vitamine a', 'rétinol'],
  },
  {
    nom: 'Huiles essentielles',
    cat: 'Plantes & compléments',
    statut: 'non',
    resume: 'Pas d’usage interne, prudence en externe.',
    pourquoi: 'Beaucoup sont neurotoxiques ou hormone-like, et les données chez la femme enceinte sont insuffisantes.',
    astuce: 'Demande systématiquement à ta sage-femme ou ton pharmacien avant tout usage.',
    mots: ['huile essentielle', 'aromathérapie', 'he'],
  },
  {
    nom: 'Tisanes (camomille, tilleul, verveine)',
    cat: 'Plantes & compléments',
    statut: 'prudence',
    resume: 'Oui, sans excès et en variant.',
    pourquoi: 'Une plante reste un principe actif. Une à deux tasses par jour, en alternant, ne pose pas de problème.',
    astuce: 'À éviter : sauge, réglisse, bourrache, armoise, séné, ginseng, et le fenouil à forte dose.',
    mots: ['tisane', 'infusion', 'camomille', 'verveine', 'tilleul'],
  },
  {
    nom: 'Feuilles de framboisier',
    cat: 'Plantes & compléments',
    statut: 'prudence',
    resume: 'Uniquement en toute fin de grossesse, sur avis.',
    pourquoi: 'Elles tonifient l’utérus : intéressantes à partir de 37 SA, à éviter absolument avant.',
    mots: ['framboisier'],
  },
  {
    nom: 'Gingembre',
    cat: 'Plantes & compléments',
    statut: 'oui',
    resume: 'Oui, et il soulage vraiment les nausées.',
    pourquoi: 'Son efficacité contre les nausées de grossesse est l’une des mieux documentées, jusqu’à 1 g par jour.',
    astuce: 'Frais râpé dans de l’eau chaude avec du citron, à siroter le matin.',
    mots: ['gingembre'],
  },
  {
    nom: 'Fer (complément)',
    cat: 'Plantes & compléments',
    statut: 'prudence',
    resume: 'Seulement si une prise de sang le justifie.',
    pourquoi: 'La supplémentation systématique n’est pas recommandée : un excès de fer a ses propres inconvénients.',
    astuce: 'Prends-le à distance du thé et du café, avec un jus d’orange.',
    mots: ['fer', 'tardyferon', 'anémie'],
  },
]

export const CATEGORIES: Categorie[] = [
  'Fromages & laitages',
  'Viandes & charcuterie',
  'Poissons & fruits de mer',
  'Œufs & préparations',
  'Fruits & légumes',
  'Boissons',
  'Sucré & épicerie',
  'Plantes & compléments',
  'Plats & recettes',
]
