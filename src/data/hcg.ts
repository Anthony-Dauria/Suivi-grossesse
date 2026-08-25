/**
 * Repères de bêta-hCG plasmatique.
 *
 * Les valeurs varient énormément d'une femme à l'autre : une seule mesure ne
 * veut presque rien dire, c'est l'évolution entre deux dosages qui compte. Ces
 * fourchettes sont indicatives et ne servent qu'à situer un ordre de grandeur.
 */

export type FourchetteHcg = {
  /** Bornes en semaines d'aménorrhée, incluses */
  de: number
  a: number
  libelle: string
  min: number
  max: number
}

export const FOURCHETTES_HCG: FourchetteHcg[] = [
  { de: 3, a: 3, libelle: '3 SA', min: 5, max: 50 },
  { de: 4, a: 4, libelle: '4 SA', min: 5, max: 426 },
  { de: 5, a: 5, libelle: '5 SA', min: 18, max: 7340 },
  { de: 6, a: 6, libelle: '6 SA', min: 1080, max: 56500 },
  { de: 7, a: 8, libelle: '7 à 8 SA', min: 7650, max: 229000 },
  { de: 9, a: 12, libelle: '9 à 12 SA', min: 25700, max: 288000 },
  { de: 13, a: 16, libelle: '13 à 16 SA', min: 13300, max: 254000 },
  { de: 17, a: 24, libelle: '17 à 24 SA', min: 4060, max: 165400 },
  { de: 25, a: 41, libelle: '25 SA et plus', min: 3640, max: 117000 },
]

export function fourchettePourSA(sa: number): FourchetteHcg | undefined {
  return FOURCHETTES_HCG.find((f) => sa >= f.de && sa <= f.a)
}

/**
 * Temps de doublement attendu, qui s'allonge à mesure que le taux monte.
 * Renvoie la borne haute en heures.
 */
export function doublementAttenduHeures(valeur: number): number {
  if (valeur < 1200) return 72
  if (valeur < 6000) return 96
  return 168
}

export function libelleDoublement(valeur: number): string {
  if (valeur < 1200) return 'toutes les 48 à 72 h'
  if (valeur < 6000) return 'toutes les 72 à 96 h'
  return 'un ralentissement, normal à ce stade'
}

/** Temps de doublement observé entre deux dosages, en heures */
export function tempsDeDoublement(
  v1: number,
  j1: Date,
  v2: number,
  j2: Date,
): number | null {
  const heures = (j2.getTime() - j1.getTime()) / 3_600_000
  if (heures <= 0 || v1 <= 0 || v2 <= v1) return null
  return (heures * Math.LN2) / Math.log(v2 / v1)
}

export const NOTE_HCG =
  'Le taux d’hCG double environ toutes les 48 à 72 h en tout début de grossesse, puis ' +
  'ralentit et plafonne vers 8 à 11 SA avant de redescendre. Une valeur isolée ne ' +
  'permet aucune conclusion : seul le médecin qui a prescrit le dosage peut l’interpréter, ' +
  'avec l’échographie et le contexte.'
