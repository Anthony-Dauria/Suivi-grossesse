import { createContext, useContext } from 'react'
import type { EtatGrossesse, Profil } from './grossesse'

export const PREFIXE = 'suivi-grossesse:'

export type Pesee = { id: string; date: string; poids: number }
export type NoteJournal = {
  id: string
  date: string
  humeur: number
  symptomes: string[]
  texte: string
}
export type SessionMouvements = { id: string; date: string; debutISO: string; dureeMin: number; nombre: number }
export type Contraction = { id: string; debutISO: string; dureeSec: number }
export type Question = { id: string; texte: string; repondu: boolean }
export type RdvPerso = { id: string; titre: string; date: string; heure: string; lieu: string }
export type Prenom = { id: string; nom: string; sexe: 'fille' | 'garcon' | 'mixte'; favori: boolean }

export type Etat = {
  profil: Profil
  grossesse: EtatGrossesse | null
  pesees: Pesee[]
  journal: NoteJournal[]
  mouvements: SessionMouvements[]
  contractions: Contraction[]
  questions: Question[]
  rdvs: RdvPerso[]
  prenoms: Prenom[]
  coches: Record<string, boolean>
  majProfil: (patch: Partial<Profil>) => void
  ajouterPesee: (p: Omit<Pesee, 'id'>) => void
  supprimerPesee: (id: string) => void
  ajouterNote: (n: Omit<NoteJournal, 'id'>) => void
  supprimerNote: (id: string) => void
  ajouterMouvements: (m: Omit<SessionMouvements, 'id'>) => void
  ajouterContraction: (c: Omit<Contraction, 'id'>) => void
  viderContractions: () => void
  ajouterQuestion: (texte: string) => void
  basculerQuestion: (id: string) => void
  supprimerQuestion: (id: string) => void
  ajouterRdv: (r: Omit<RdvPerso, 'id'>) => void
  supprimerRdv: (id: string) => void
  ajouterPrenom: (nom: string, sexe: Prenom['sexe']) => void
  basculerPrenom: (id: string) => void
  supprimerPrenom: (id: string) => void
  basculerCoche: (id: string) => void
  toutEffacer: () => void
}

export const Contexte = createContext<Etat | null>(null)

export function idUnique(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

export function useDonnees(): Etat {
  const ctx = useContext(Contexte)
  if (!ctx) throw new Error('useDonnees doit être utilisé dans FournisseurDonnees')
  return ctx
}
