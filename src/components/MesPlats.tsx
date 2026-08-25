import { useEffect, useMemo, useRef, useState } from 'react'
import { Bouton, Carte, Champ, Puce, TitreSection, Vide, classesInput } from './ui'
import { Icone } from './Icones'
import { AideDecision } from './AideDecision'
import { STATUT_LABEL } from '../data/aliments'
import type { Decision } from '../lib/decisionPlat'
import { compresserImage, enregistrerPhoto, lirePhoto, supprimerPhoto } from '../lib/fichiers'
import { idUnique, useDonnees, type PlatPhoto } from '../lib/donnees'
import { aujourdhui, depuisISO, formatCourt, versISO } from '../lib/dates'

const TON = { oui: 'sage', prudence: 'amber', non: 'clay' } as const

/** Vignette lue depuis IndexedDB, avec libération de l'URL objet. */
function Vignette({ id, className = '' }: { id: string; className?: string }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let vivant = true
    let objet: string | null = null
    lirePhoto(id).then((blob) => {
      if (!blob || !vivant) return
      objet = URL.createObjectURL(blob)
      setUrl(objet)
    })
    return () => {
      vivant = false
      if (objet) URL.revokeObjectURL(objet)
    }
  }, [id])

  if (!url) return <div className={`animate-pulse bg-cream ${className}`} />
  return <img src={url} alt="" className={className} />
}

export function MesPlats() {
  const { platsPhoto, ajouterPlatPhoto, supprimerPlatPhoto } = useDonnees()
  const champFichier = useRef<HTMLInputElement>(null)

  const [brouillon, setBrouillon] = useState<{ id: string; apercu: string } | null>(null)
  const [nom, setNom] = useState('')
  const [note, setNote] = useState('')
  const [decision, setDecision] = useState<Decision | null>(null)
  const [occupe, setOccupe] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)

  useEffect(
    () => () => {
      if (brouillon) URL.revokeObjectURL(brouillon.apercu)
    },
    [brouillon],
  )

  const choisir = async (fichier: File) => {
    setErreur(null)
    setOccupe(true)
    try {
      const compresse = await compresserImage(fichier)
      const id = idUnique()
      await enregistrerPhoto(id, compresse)
      setBrouillon({ id, apercu: URL.createObjectURL(compresse) })
    } catch {
      setErreur('Cette image n’a pas pu être lue. Réessaie avec une autre photo.')
    } finally {
      setOccupe(false)
    }
  }

  const annuler = async () => {
    if (brouillon) await supprimerPhoto(brouillon.id)
    setBrouillon(null)
    setNom('')
    setNote('')
    setDecision(null)
  }

  const enregistrer = () => {
    if (!brouillon || !decision) return
    ajouterPlatPhoto({
      id: brouillon.id,
      date: versISO(aujourdhui()),
      nom: nom.trim() || 'Plat sans nom',
      statut: decision.statut,
      note: note.trim(),
    })
    setBrouillon(null)
    setNom('')
    setNote('')
    setDecision(null)
  }

  const retirer = async (p: PlatPhoto) => {
    await supprimerPhoto(p.id)
    supprimerPlatPhoto(p.id)
  }

  const compte = useMemo(
    () => ({
      oui: platsPhoto.filter((p) => p.statut === 'oui').length,
      non: platsPhoto.filter((p) => p.statut === 'non').length,
    }),
    [platsPhoto],
  )

  return (
    <>
      <p className="text-sm leading-relaxed text-muted">
        Photographie un plat, réponds à quelques questions, et garde la réponse. Pratique au
        restaurant, chez des amis, ou pour retrouver un plat déjà validé.
      </p>

      <input
        ref={champFichier}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) choisir(f)
          e.target.value = ''
        }}
      />

      {!brouillon && (
        <>
          <Bouton
            className="mt-4 w-full py-3.5"
            disabled={occupe}
            onClick={() => champFichier.current?.click()}
          >
            {occupe ? 'Traitement…' : 'Photographier un plat'}
          </Bouton>
          {erreur && (
            <p className="mt-2 rounded-xl bg-clay-soft px-3 py-2.5 text-[13px] leading-relaxed text-clay-deep">
              {erreur}
            </p>
          )}
          <p className="mt-2 text-center text-[12px] leading-relaxed text-muted">
            La photo reste sur le téléphone : elle n’est envoyée nulle part.
          </p>
        </>
      )}

      {brouillon && (
        <Carte className="mt-4">
          <img
            src={brouillon.apercu}
            alt="Le plat photographié"
            className="mb-4 max-h-64 w-full rounded-xl object-cover"
          />
          <Champ label="De quoi s’agit-il ?">
            <input
              className={classesInput}
              placeholder="Tartiflette, salade du midi…"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </Champ>

          <div className="mt-4 border-t border-line pt-4">
            <p className="mb-3 text-[15px] font-medium text-ink">Qu’est-ce qu’il contient ?</p>
            <AideDecision intro={false} sansCadre onDecision={setDecision} />
          </div>

          <div className="mt-4">
            <Champ label="Une note, si tu veux">
              <input
                className={classesInput}
                placeholder="Chez Marie, elle a proposé de le repasser au four"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Champ>
          </div>

          <div className="mt-4 flex gap-3">
            <Bouton variante="secondaire" className="flex-1" onClick={annuler}>
              Annuler
            </Bouton>
            <Bouton
              className="flex-1"
              disabled={!decision?.repondu}
              onClick={enregistrer}
            >
              Enregistrer
            </Bouton>
          </div>
          {!decision?.repondu && (
            <p className="mt-2 text-center text-[12px] text-muted">
              Réponds à au moins une question pour enregistrer le verdict.
            </p>
          )}
        </Carte>
      )}

      {platsPhoto.length > 0 && (
        <>
          <TitreSection
            action={
              <span className="text-[13px] text-muted">
                {compte.oui} validé{compte.oui > 1 ? 's' : ''} · {compte.non} à éviter
              </span>
            }
          >
            Mes plats
          </TitreSection>
          <div className="space-y-2">
            {platsPhoto.map((p) => (
              <Carte key={p.id} className="overflow-hidden p-0">
                <div className="flex gap-3">
                  <Vignette id={p.id} className="w-24 shrink-0 self-stretch object-cover" />
                  <div className="min-w-0 flex-1 py-3 pr-3">
                    <div className="flex items-start gap-2">
                      <p className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-ink">
                        {p.nom}
                      </p>
                      <button
                        onClick={() => retirer(p)}
                        aria-label="Supprimer"
                        className="text-muted transition hover:text-clay-deep"
                      >
                        <Icone nom="poubelle" className="size-4" />
                      </button>
                    </div>
                    <div className="mt-1.5">
                      <Puce ton={TON[p.statut]}>{STATUT_LABEL[p.statut]}</Puce>
                    </div>
                    <p className="mt-1.5 text-[12px] text-muted">
                      {formatCourt(depuisISO(p.date))}
                    </p>
                    {p.note && (
                      <p className="mt-1 text-[13px] leading-snug text-muted">{p.note}</p>
                    )}
                  </div>
                </div>
              </Carte>
            ))}
          </div>
        </>
      )}

      {platsPhoto.length === 0 && !brouillon && (
        <div className="mt-4">
          <Vide>
            Aucun plat enregistré pour l’instant. Les photos et les verdicts resteront sur cet
            appareil.
          </Vide>
        </div>
      )}
    </>
  )
}
