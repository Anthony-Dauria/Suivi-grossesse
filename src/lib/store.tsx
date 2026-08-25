import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { PROFIL_VIDE, calculerEtat, type Profil } from './grossesse'
import { aujourdhui } from './dates'
import {
  Contexte,
  PREFIXE,
  idUnique,
  type Contraction,
  type DosageHcg,
  type DocumentMedical,
  type PlatPhoto,
  type Etat,
  type NoteJournal,
  type Pesee,
  type Prenom,
  type Question,
  type RdvPerso,
  type SessionMouvements,
} from './donnees'

function lire<T>(cle: string, valeurParDefaut: T): T {
  try {
    const brut = localStorage.getItem(PREFIXE + cle)
    if (!brut) return valeurParDefaut
    return { ...(valeurParDefaut as object), ...JSON.parse(brut) } as T
  } catch {
    return valeurParDefaut
  }
}

function lireListe<T>(cle: string): T[] {
  try {
    const brut = localStorage.getItem(PREFIXE + cle)
    if (!brut) return []
    const valeur = JSON.parse(brut)
    return Array.isArray(valeur) ? (valeur as T[]) : []
  } catch {
    return []
  }
}

function ecrire(cle: string, valeur: unknown) {
  try {
    localStorage.setItem(PREFIXE + cle, JSON.stringify(valeur))
  } catch {
    /* quota dépassé ou mode privé : on ignore silencieusement */
  }
}

export function FournisseurDonnees({ children }: { children: ReactNode }) {
  const [profil, setProfil] = useState<Profil>(() => lire('profil', PROFIL_VIDE))
  const [pesees, setPesees] = useState<Pesee[]>(() => lireListe('pesees'))
  const [journal, setJournal] = useState<NoteJournal[]>(() => lireListe('journal'))
  const [mouvements, setMouvements] = useState<SessionMouvements[]>(() => lireListe('mouvements'))
  const [contractions, setContractions] = useState<Contraction[]>(() => lireListe('contractions'))
  const [questions, setQuestions] = useState<Question[]>(() => lireListe('questions'))
  const [rdvs, setRdvs] = useState<RdvPerso[]>(() => lireListe('rdvs'))
  const [prenoms, setPrenoms] = useState<Prenom[]>(() => lireListe('prenoms'))
  const [dosagesHcg, setDosagesHcg] = useState<DosageHcg[]>(() => lireListe('dosagesHcg'))
  const [platsPhoto, setPlatsPhoto] = useState<PlatPhoto[]>(() => lireListe('platsPhoto'))
  const [documents, setDocuments] = useState<DocumentMedical[]>(() => lireListe('documents'))
  const [coches, setCoches] = useState<Record<string, boolean>>(() => lire('coches', {}))

  useEffect(() => ecrire('profil', profil), [profil])
  useEffect(() => ecrire('pesees', pesees), [pesees])
  useEffect(() => ecrire('journal', journal), [journal])
  useEffect(() => ecrire('mouvements', mouvements), [mouvements])
  useEffect(() => ecrire('contractions', contractions), [contractions])
  useEffect(() => ecrire('questions', questions), [questions])
  useEffect(() => ecrire('rdvs', rdvs), [rdvs])
  useEffect(() => ecrire('prenoms', prenoms), [prenoms])
  useEffect(() => ecrire('dosagesHcg', dosagesHcg), [dosagesHcg])
  useEffect(() => ecrire('platsPhoto', platsPhoto), [platsPhoto])
  useEffect(() => ecrire('documents', documents), [documents])
  useEffect(() => ecrire('coches', coches), [coches])

  // Recalcule l’état de la grossesse au changement de jour (onglet laissé ouvert)
  const [jour, setJour] = useState(() => aujourdhui().getTime())
  useEffect(() => {
    const timer = window.setInterval(() => {
      const maintenant = aujourdhui().getTime()
      setJour((precedent) => (precedent === maintenant ? precedent : maintenant))
    }, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const grossesse = useMemo(
    () => (profil.configure ? calculerEtat(profil, new Date(jour)) : null),
    [profil, jour],
  )

  const majProfil = useCallback((patch: Partial<Profil>) => {
    setProfil((p) => ({ ...p, ...patch }))
  }, [])

  const valeur: Etat = {
    profil,
    grossesse,
    pesees,
    journal,
    mouvements,
    contractions,
    questions,
    rdvs,
    prenoms,
    dosagesHcg,
    platsPhoto,
    documents,
    coches,
    majProfil,
    ajouterPesee: (p) =>
      setPesees((liste) =>
        [...liste.filter((x) => x.date !== p.date), { ...p, id: idUnique() }].sort((a, b) =>
          a.date.localeCompare(b.date),
        ),
      ),
    supprimerPesee: (id) => setPesees((liste) => liste.filter((p) => p.id !== id)),
    ajouterNote: (n) => setJournal((liste) => [{ ...n, id: idUnique() }, ...liste]),
    supprimerNote: (id) => setJournal((liste) => liste.filter((n) => n.id !== id)),
    ajouterMouvements: (m) => setMouvements((liste) => [{ ...m, id: idUnique() }, ...liste].slice(0, 60)),
    ajouterContraction: (c) => setContractions((liste) => [...liste, { ...c, id: idUnique() }]),
    viderContractions: () => setContractions([]),
    ajouterQuestion: (texte) =>
      setQuestions((liste) => [...liste, { id: idUnique(), texte, repondu: false }]),
    basculerQuestion: (id) =>
      setQuestions((liste) => liste.map((q) => (q.id === id ? { ...q, repondu: !q.repondu } : q))),
    supprimerQuestion: (id) => setQuestions((liste) => liste.filter((q) => q.id !== id)),
    ajouterRdv: (r) =>
      setRdvs((liste) =>
        [...liste, { ...r, id: idUnique() }].sort((a, b) => (a.date + a.heure).localeCompare(b.date + b.heure)),
      ),
    supprimerRdv: (id) => setRdvs((liste) => liste.filter((r) => r.id !== id)),
    ajouterPrenom: (nom, sexe) =>
      setPrenoms((liste) => [...liste, { id: idUnique(), nom, sexe, favori: false }]),
    basculerPrenom: (id) =>
      setPrenoms((liste) => liste.map((p) => (p.id === id ? { ...p, favori: !p.favori } : p))),
    supprimerPrenom: (id) => setPrenoms((liste) => liste.filter((p) => p.id !== id)),
    ajouterDosageHcg: (d) =>
      setDosagesHcg((liste) =>
        [...liste.filter((x) => x.date !== d.date), { ...d, id: idUnique() }].sort((a, b) =>
          a.date.localeCompare(b.date),
        ),
      ),
    supprimerDosageHcg: (id) => setDosagesHcg((liste) => liste.filter((d) => d.id !== id)),
    ajouterPlatPhoto: (p) => setPlatsPhoto((liste) => [p, ...liste]),
    supprimerPlatPhoto: (id) => setPlatsPhoto((liste) => liste.filter((p) => p.id !== id)),
    ajouterDocument: (d) =>
      setDocuments((liste) => [d, ...liste].sort((a, b) => b.date.localeCompare(a.date))),
    supprimerDocument: (id) => setDocuments((liste) => liste.filter((d) => d.id !== id)),
    basculerCoche: (id) => setCoches((c) => ({ ...c, [id]: !c[id] })),
    toutEffacer: () => {
      Object.keys(localStorage)
        .filter((c) => c.startsWith(PREFIXE))
        .forEach((c) => localStorage.removeItem(c))
      setProfil(PROFIL_VIDE)
      setPesees([])
      setJournal([])
      setMouvements([])
      setContractions([])
      setQuestions([])
      setRdvs([])
      setPrenoms([])
      setDosagesHcg([])
      setPlatsPhoto([])
      setDocuments([])
      setCoches({})
    },
  }

  return <Contexte.Provider value={valeur}>{children}</Contexte.Provider>
}
