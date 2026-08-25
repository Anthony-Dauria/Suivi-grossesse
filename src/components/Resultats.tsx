import { useMemo, useRef, useState } from 'react'
import { Bouton, Carte, Champ, Puce, Vide, classesInput } from './ui'
import { Icone } from './Icones'
import {
  compresserImage,
  enregistrerFichier,
  formatTaille,
  lireFichier,
  supprimerFichier,
} from '../lib/fichiers'
import {
  idUnique,
  useDonnees,
  type CategorieDocument,
  type DocumentMedical,
} from '../lib/donnees'
import { aujourdhui, depuisISO, formatCourt, versISO } from '../lib/dates'

const CATEGORIES: { cle: CategorieDocument; label: string; emoji: string }[] = [
  { cle: 'analyse', label: 'Analyse', emoji: '🩸' },
  { cle: 'echographie', label: 'Échographie', emoji: '🩻' },
  { cle: 'ordonnance', label: 'Ordonnance', emoji: '📄' },
  { cle: 'compte-rendu', label: 'Compte-rendu', emoji: '🩺' },
  { cle: 'autre', label: 'Autre', emoji: '📎' },
]

const LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.cle, c.label])) as Record<
  CategorieDocument,
  string
>
const EMOJI = Object.fromEntries(CATEGORIES.map((c) => [c.cle, c.emoji])) as Record<
  CategorieDocument,
  string
>

/** Ouvre un document déjà en mémoire : aperçu pour une image, lien pour un PDF. */
function Apercu({ doc }: { doc: DocumentMedical }) {
  const [url, setUrl] = useState<string | null>(null)
  const [chargement, setChargement] = useState(false)

  const charger = async () => {
    if (url || chargement) return
    setChargement(true)
    const blob = await lireFichier('documents', doc.id)
    if (blob) setUrl(URL.createObjectURL(blob))
    setChargement(false)
  }

  if (!url) {
    return (
      <Bouton variante="secondaire" className="mt-3 w-full" onClick={charger} disabled={chargement}>
        {chargement ? 'Ouverture…' : 'Ouvrir'}
      </Bouton>
    )
  }

  if (doc.typeMime.startsWith('image/')) {
    return <img src={url} alt={doc.titre} className="mt-3 w-full rounded-xl" />
  }

  // Un lien réel : sur iOS, un PDF ouvert par script est souvent bloqué.
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white py-2.5 text-sm font-medium text-ink transition hover:bg-cream"
    >
      Ouvrir le document
    </a>
  )
}

export function Resultats() {
  const { documents, ajouterDocument, supprimerDocument } = useDonnees()
  const champFichier = useRef<HTMLInputElement>(null)
  const champPhoto = useRef<HTMLInputElement>(null)

  const [brouillon, setBrouillon] = useState<DocumentMedical | null>(null)
  const [occupe, setOccupe] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)
  const [ouvert, setOuvert] = useState<string | null>(null)
  const [filtre, setFiltre] = useState<CategorieDocument | 'tous'>('tous')

  const recevoir = async (fichier: File) => {
    setErreur(null)
    setOccupe(true)
    try {
      const estImage = fichier.type.startsWith('image/')
      // Les scans restent plus définis que les photos de plats : ils doivent se lire.
      const contenu = estImage ? await compresserImage(fichier, 1600, 0.82) : fichier
      const id = idUnique()
      await enregistrerFichier('documents', id, contenu)
      setBrouillon({
        id,
        date: versISO(aujourdhui()),
        titre: fichier.name.replace(/\.[^.]+$/, '').slice(0, 60),
        categorie: 'analyse',
        typeMime: estImage ? 'image/jpeg' : fichier.type || 'application/octet-stream',
        taille: contenu.size,
        note: '',
      })
    } catch {
      setErreur('Ce fichier n’a pas pu être lu. Réessaie avec une photo ou un PDF.')
    } finally {
      setOccupe(false)
    }
  }

  const annuler = async () => {
    if (brouillon) await supprimerFichier('documents', brouillon.id)
    setBrouillon(null)
  }

  const retirer = async (d: DocumentMedical) => {
    await supprimerFichier('documents', d.id)
    supprimerDocument(d.id)
  }

  const visibles = useMemo(
    () => (filtre === 'tous' ? documents : documents.filter((d) => d.categorie === filtre)),
    [documents, filtre],
  )
  const total = useMemo(() => documents.reduce((s, d) => s + d.taille, 0), [documents])

  return (
    <>
      <p className="text-sm leading-relaxed text-muted">
        Analyses, échographies, ordonnances, comptes-rendus : tout au même endroit, consultable
        même sans réseau dans la salle d’attente.
      </p>

      <input
        ref={champFichier}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) recevoir(f)
          e.target.value = ''
        }}
      />
      <input
        ref={champPhoto}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) recevoir(f)
          e.target.value = ''
        }}
      />

      {!brouillon && (
        <>
          <div className="mt-4 flex gap-3">
            <Bouton
              className="flex-1 py-3"
              disabled={occupe}
              onClick={() => champPhoto.current?.click()}
            >
              Photographier
            </Bouton>
            <Bouton
              variante="secondaire"
              className="flex-1 py-3"
              disabled={occupe}
              onClick={() => champFichier.current?.click()}
            >
              Choisir un fichier
            </Bouton>
          </div>
          {occupe && <p className="mt-2 text-center text-[13px] text-muted">Traitement…</p>}
          {erreur && (
            <p className="mt-2 rounded-xl bg-clay-soft px-3 py-2.5 text-[13px] leading-relaxed text-clay-deep">
              {erreur}
            </p>
          )}
          <p className="mt-2 text-center text-[12px] leading-relaxed text-muted">
            Les fichiers restent sur le téléphone : ils ne sont envoyés nulle part.
          </p>
        </>
      )}

      {brouillon && (
        <Carte className="mt-4">
          <p className="text-[15px] font-medium text-ink">Nouveau document</p>
          <p className="mt-1 text-[13px] text-muted">
            {brouillon.typeMime.startsWith('image/') ? 'Image' : 'PDF'} ·{' '}
            {formatTaille(brouillon.taille)}
          </p>

          <div className="mt-4 space-y-4">
            <Champ label="Titre">
              <input
                className={classesInput}
                placeholder="Écho morpho, prise de sang du 3e mois…"
                value={brouillon.titre}
                onChange={(e) => setBrouillon({ ...brouillon, titre: e.target.value })}
              />
            </Champ>

            <div>
              <p className="mb-2 text-sm font-medium text-ink">Type de document</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.cle}
                    onClick={() => setBrouillon({ ...brouillon, categorie: c.cle })}
                    className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                      brouillon.categorie === c.cle
                        ? 'bg-ink text-white'
                        : 'border border-line bg-white text-muted'
                    }`}
                  >
                    {c.emoji} {c.label}
                  </button>
                ))}
              </div>
            </div>

            <Champ label="Date du document">
              <input
                type="date"
                className={classesInput}
                value={brouillon.date}
                onChange={(e) => setBrouillon({ ...brouillon, date: e.target.value })}
              />
            </Champ>

            <Champ label="Une note, si tu veux">
              <input
                className={classesInput}
                placeholder="Tout est normal, à remontrer au 3e trimestre"
                value={brouillon.note}
                onChange={(e) => setBrouillon({ ...brouillon, note: e.target.value })}
              />
            </Champ>
          </div>

          <div className="mt-4 flex gap-3">
            <Bouton variante="secondaire" className="flex-1" onClick={annuler}>
              Annuler
            </Bouton>
            <Bouton
              className="flex-1"
              disabled={!brouillon.titre.trim()}
              onClick={() => {
                ajouterDocument({ ...brouillon, titre: brouillon.titre.trim() })
                setBrouillon(null)
              }}
            >
              Enregistrer
            </Bouton>
          </div>
        </Carte>
      )}

      {documents.length > 0 && (
        <>
          <div className="no-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5">
            <button
              onClick={() => setFiltre('tous')}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
                filtre === 'tous' ? 'bg-ink text-white' : 'border border-line bg-white text-muted'
              }`}
            >
              Tous ({documents.length})
            </button>
            {CATEGORIES.filter((c) => documents.some((d) => d.categorie === c.cle)).map((c) => (
              <button
                key={c.cle}
                onClick={() => setFiltre(c.cle)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
                  filtre === c.cle ? 'bg-ink text-white' : 'border border-line bg-white text-muted'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            {visibles.map((d) => {
              const estOuvert = ouvert === d.id
              return (
                <Carte key={d.id}>
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cream text-lg">
                      {EMOJI[d.categorie]}
                    </span>
                    <button
                      className="min-w-0 flex-1 text-left"
                      onClick={() => setOuvert(estOuvert ? null : d.id)}
                      aria-expanded={estOuvert}
                    >
                      <p className="text-[15px] font-medium leading-snug text-ink">{d.titre}</p>
                      <p className="mt-1 text-[13px] text-muted">
                        {formatCourt(depuisISO(d.date))} · {formatTaille(d.taille)}
                      </p>
                      {d.note && (
                        <p className="mt-1 text-[13px] leading-snug text-muted">{d.note}</p>
                      )}
                    </button>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <Puce>{LABEL[d.categorie]}</Puce>
                      <button
                        onClick={() => retirer(d)}
                        aria-label="Supprimer"
                        className="text-muted transition hover:text-clay-deep"
                      >
                        <Icone nom="poubelle" className="size-4" />
                      </button>
                    </div>
                  </div>
                  {estOuvert && <Apercu doc={d} />}
                </Carte>
              )
            })}
          </div>

          <p className="mt-4 text-[12px] leading-relaxed text-muted">
            {documents.length} document{documents.length > 1 ? 's' : ''} · {formatTaille(total)} sur
            cet appareil. Les fichiers ne sont pas inclus dans la sauvegarde JSON des réglages.
          </p>
        </>
      )}

      {documents.length === 0 && !brouillon && (
        <div className="mt-6">
          <Vide>
            Aucun document pour l’instant. Photographie une ordonnance, ajoute le compte-rendu
            d’échographie reçu par mail : tout restera accessible hors connexion.
          </Vide>
        </div>
      )}
    </>
  )
}
