import type { Statut } from '../data/aliments'

export type Critere = {
  cle: string
  question: string
  /** Le risque que ce critère fait porter, nommé en clair */
  risque: string
  /** true si une cuisson à cœur suffit à lever ce risque */
  leveParLaCuisson: boolean
}

export const CRITERES: Critere[] = [
  {
    cle: 'cru',
    question: 'De la viande, du poisson ou un œuf crus ou peu cuits',
    risque: 'chair ou œuf crus : toxoplasmose, listeria, salmonelle',
    leveParLaCuisson: true,
  },
  {
    cle: 'laitCru',
    question: 'Un fromage au lait cru, ou un fromage avec sa croûte',
    risque: 'lait cru et croûte : listeria',
    leveParLaCuisson: true,
  },
  {
    cle: 'charcuterie',
    question: 'De la charcuterie crue : jambon cru, saucisson, pâté, rillettes',
    risque: 'charcuterie crue ou en gelée : listeria et toxoplasmose',
    leveParLaCuisson: true,
  },
  {
    cle: 'fume',
    question: 'Du poisson fumé, mariné ou des œufs de poisson',
    risque: 'fumage à froid : la listeria y survit',
    leveParLaCuisson: true,
  },
  {
    cle: 'crudites',
    question: 'Des crudités, des herbes fraîches ou des graines germées',
    risque: 'terre résiduelle : toxoplasmose si elles ne sont pas lavées',
    leveParLaCuisson: true,
  },
  {
    cle: 'vitrine',
    question: 'Un plat resté en vitrine, au buffet ou préparé à l’avance',
    risque: 'chaîne du froid incertaine : la listeria se multiplie même au frais',
    leveParLaCuisson: false,
  },
]

export type Decision = {
  statut: Statut
  phrase: string
  /** Les critères qui restent bloquants malgré la cuisson déclarée */
  bloquants: Critere[]
  /** true dès que l'utilisatrice a répondu à quelque chose */
  repondu: boolean
}

/** Déduit un verdict de la composition déclarée et de la cuisson. */
export function evaluer(coches: Record<string, boolean>, cuit: boolean | null): Decision {
  const retenus = CRITERES.filter((c) => coches[c.cle])
  const bloquants = retenus.filter((c) => !c.leveParLaCuisson || cuit !== true)
  const repondu = cuit !== null || retenus.length > 0

  if (bloquants.length > 0) {
    return {
      statut: 'non',
      phrase: 'Mieux vaut passer ton tour, ou faire modifier la préparation avant de la commander.',
      bloquants,
      repondu,
    }
  }
  if (retenus.length > 0 && cuit === true) {
    return {
      statut: 'oui',
      phrase: 'La cuisson à cœur lève le risque : servi bien chaud, ce plat est autorisé.',
      bloquants,
      repondu,
    }
  }
  if (cuit === false) {
    return {
      statut: 'prudence',
      phrase:
        'Rien d’identifié comme risqué, mais un plat qui n’est ni cuit ni chaud mérite de savoir comment il a été préparé.',
      bloquants,
      repondu,
    }
  }
  return {
    statut: 'oui',
    phrase: 'Rien de ce qui pose problème pendant la grossesse. Ce plat peut se manger tel quel.',
    bloquants,
    repondu,
  }
}
