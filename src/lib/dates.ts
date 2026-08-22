export const JOUR_MS = 24 * 60 * 60 * 1000

/** Date du jour, normalisée à minuit */
export function aujourdhui(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function versISO(d: Date): string {
  const mois = String(d.getMonth() + 1).padStart(2, '0')
  const jour = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mois}-${jour}`
}

export function depuisISO(iso: string): Date {
  const [a, m, j] = iso.split('-').map(Number)
  return new Date(a, (m ?? 1) - 1, j ?? 1)
}

export function ajouterJours(d: Date, n: number): Date {
  const copie = new Date(d)
  copie.setDate(copie.getDate() + n)
  return copie
}

export function diffJours(a: Date, b: Date): number {
  const x = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime()
  const y = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime()
  return Math.round((x - y) / JOUR_MS)
}

const MOIS_FR = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
]

const JOURS_FR = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

const MOIS_COURTS = [
  'janv.',
  'févr.',
  'mars',
  'avr.',
  'mai',
  'juin',
  'juil.',
  'août',
  'sept.',
  'oct.',
  'nov.',
  'déc.',
]

export function formatLong(d: Date): string {
  return `${JOURS_FR[d.getDay()]} ${d.getDate()} ${MOIS_FR[d.getMonth()]} ${d.getFullYear()}`
}

export function formatCourt(d: Date): string {
  return `${d.getDate()} ${MOIS_COURTS[d.getMonth()]} ${d.getFullYear()}`
}

export function moisCourt(d: Date): string {
  return MOIS_COURTS[d.getMonth()]
}

/** Nombre avec la virgule décimale française */
export function nombreFr(valeur: number, decimales = 1): string {
  return valeur.toFixed(decimales).replace('.', ',')
}

export function formatJourMois(d: Date): string {
  return `${d.getDate()} ${MOIS_FR[d.getMonth()]}`
}
