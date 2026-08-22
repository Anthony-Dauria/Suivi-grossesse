import { SEMAINES, type Semaine } from '../data/semaines'
import { ajouterJours, aujourdhui, depuisISO, diffJours } from './dates'

export type ModeDate = 'ddr' | 'dpa' | 'conception'

export type Profil = {
  prenomMaman: string
  prenomBebe: string
  mode: ModeDate
  dateRef: string
  poidsAvant: number | null
  tailleCm: number | null
  toxoplasmose: 'immunisee' | 'non-immunisee' | 'inconnu'
  /**
   * Pixels CSS par centimètre réel sur cet écran. La valeur par défaut suppose
   * 96 dpi ; l'écran de réglages permet de la caler sur une carte bancaire.
   */
  pxParCm: number
  configure: boolean
}

/** 96 dpi : l'hypothèse par défaut du CSS, souvent proche sans être exacte */
export const PX_PAR_CM_DEFAUT = 96 / 2.54

export const PROFIL_VIDE: Profil = {
  prenomMaman: '',
  prenomBebe: '',
  mode: 'ddr',
  dateRef: '',
  poidsAvant: null,
  tailleCm: null,
  toxoplasmose: 'inconnu',
  pxParCm: PX_PAR_CM_DEFAUT,
  configure: false,
}

export const DUREE_TOTALE_JOURS = 280

/** Reconstitue la date des dernières règles à partir du mode choisi */
export function calculerDDR(profil: Profil): Date | null {
  if (!profil.dateRef) return null
  const ref = depuisISO(profil.dateRef)
  if (Number.isNaN(ref.getTime())) return null
  switch (profil.mode) {
    case 'ddr':
      return ref
    case 'conception':
      return ajouterJours(ref, -14)
    case 'dpa':
      return ajouterJours(ref, -DUREE_TOTALE_JOURS)
  }
}

/** Table de correspondance française SA → mois de grossesse */
const MOIS_PAR_SA: [number, number][] = [
  [6, 1],
  [11, 2],
  [15, 3],
  [20, 4],
  [24, 5],
  [29, 6],
  [33, 7],
  [38, 8],
  [41, 9],
]

export function moisDeGrossesse(sa: number): number {
  for (const [limite, mois] of MOIS_PAR_SA) {
    if (sa <= limite) return mois
  }
  return 9
}

export function trimestre(sa: number): 1 | 2 | 3 {
  if (sa <= 15) return 1
  if (sa <= 28) return 2
  return 3
}

export type EtatGrossesse = {
  ddr: Date
  dpa: Date
  /** Jours écoulés depuis la DDR */
  joursEcoules: number
  sa: number
  joursDansSemaine: number
  /** Semaines de grossesse (SA − 2) */
  sg: number
  mois: number
  trimestre: 1 | 2 | 3
  joursRestants: number
  progression: number
  semaine: Semaine | undefined
  /** true si le terme est dépassé */
  termeDepasse: boolean
  /** true si la date saisie place la grossesse dans le futur */
  pasEncore: boolean
}

export function calculerEtat(profil: Profil, date = aujourdhui()): EtatGrossesse | null {
  const ddr = calculerDDR(profil)
  if (!ddr) return null

  const dpa = ajouterJours(ddr, DUREE_TOTALE_JOURS)
  const joursEcoules = diffJours(date, ddr)
  const saBrut = Math.floor(joursEcoules / 7)
  const sa = Math.max(0, saBrut)
  const joursDansSemaine = Math.max(0, joursEcoules - sa * 7)

  return {
    ddr,
    dpa,
    joursEcoules,
    sa,
    joursDansSemaine,
    sg: Math.max(0, sa - 2),
    mois: moisDeGrossesse(sa),
    trimestre: trimestre(sa),
    joursRestants: diffJours(dpa, date),
    progression: Math.min(1, Math.max(0, joursEcoules / DUREE_TOTALE_JOURS)),
    semaine: trouverSemaine(sa),
    termeDepasse: joursEcoules > DUREE_TOTALE_JOURS,
    pasEncore: joursEcoules < 0,
  }
}

export function trouverSemaine(sa: number): Semaine | undefined {
  if (sa < SEMAINES[0].sa) return SEMAINES[0]
  const derniere = SEMAINES[SEMAINES.length - 1]
  if (sa > derniere.sa) return derniere
  return SEMAINES.find((s) => s.sa === sa)
}

/** Première date de la semaine d’aménorrhée donnée */
export function dateDebutSA(ddr: Date, sa: number): Date {
  return ajouterJours(ddr, sa * 7)
}

export function imc(poidsKg: number, tailleCm: number): number {
  const m = tailleCm / 100
  return poidsKg / (m * m)
}

export function categorieIMC(valeur: number): string {
  if (valeur < 18.5) return 'Maigreur'
  if (valeur < 25) return 'Corpulence normale'
  if (valeur < 30) return 'Surpoids'
  return 'Obésité'
}

/** Prise de poids recommandée (min/max en kg) selon l’IMC de départ */
export function fourchettePoids(valeurIMC: number): [number, number] {
  if (valeurIMC < 18.5) return [12.5, 18]
  if (valeurIMC < 25) return [11.5, 16]
  if (valeurIMC < 30) return [7, 11.5]
  return [5, 9]
}

/** Prise de poids attendue à un stade donné, interpolée sur la grossesse */
export function poidsAttendu(sa: number, valeurIMC: number): [number, number] {
  const [min, max] = fourchettePoids(valeurIMC)
  // Environ 15 % de la prise totale sur le 1er trimestre, puis linéaire.
  const semaines = Math.min(40, Math.max(0, sa))
  const part = semaines <= 13 ? (semaines / 13) * 0.15 : 0.15 + ((semaines - 13) / 27) * 0.85
  return [Number((min * part).toFixed(1)), Number((max * part).toFixed(1))]
}
