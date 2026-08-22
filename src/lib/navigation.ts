export type Onglet = 'accueil' | 'semaines' | 'alimentation' | 'suivi' | 'preparer' | 'reglages'

export const ONGLETS: { id: Onglet; label: string; icone: string }[] = [
  { id: 'accueil', label: 'Accueil', icone: 'maison' },
  { id: 'semaines', label: 'Semaines', icone: 'calendrier' },
  { id: 'alimentation', label: 'Manger', icone: 'assiette' },
  { id: 'suivi', label: 'Suivi', icone: 'courbe' },
  { id: 'preparer', label: 'Préparer', icone: 'liste' },
]

export const TITRES: Record<Onglet, string> = {
  accueil: 'Ma grossesse',
  semaines: 'Semaine par semaine',
  alimentation: 'Bien manger',
  suivi: 'Mon suivi',
  preparer: 'Se préparer',
  reglages: 'Réglages',
}
