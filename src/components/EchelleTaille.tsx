import { useEffect, useRef, useState } from 'react'
import { nombreCompact, nombreFr } from '../lib/dates'

/** Longueur normalisée d'une carte bancaire, en centimètres */
export const CARTE_CM = 8.56
/** Diamètre d'une pièce de 2 €, en centimètres */
export const PIECE_CM = 2.575

type Reference = {
  cle: string
  /** Nom au singulier, sans article */
  etiquette: string
  cm: number
  forme: 'rectangle' | 'ronde'
  /** Ce que mesure la référence, pour la phrase de comparaison */
  mesure: string
  /** Phrase employée quand le bébé est encore plus petit que la référence */
  plusPetit: string
}

/**
 * Repères du quotidien, du plus grand au plus petit. On retient le plus grand
 * qui tient dans la largeur disponible : une carte bancaire à l'échelle réduite
 * des dernières semaines, une pièce de 2 € quand le dessin est à 1:1 et qu'une
 * carte ne rentrerait pas dans l'écran.
 */
const REFERENCES: Reference[] = [
  {
    cle: 'carte',
    etiquette: 'carte bancaire',
    cm: CARTE_CM,
    forme: 'rectangle',
    mesure: 'sa longueur',
    plusPetit: 'Le bébé est encore un peu plus court.',
  },
  {
    cle: 'piece',
    etiquette: 'pièce de 2 €',
    cm: PIECE_CM,
    forme: 'ronde',
    mesure: 'son diamètre',
    plusPetit: 'Le bébé tiendrait tout entier dedans.',
  },
]

/**
 * Règle graduée montrant la longueur du bébé. Tant qu'elle tient dans la
 * largeur disponible, elle est tracée à l'échelle 1:1 : on peut poser l'objet
 * de référence contre l'écran pour comparer. Au-delà, l'échelle est réduite,
 * et annoncée comme telle.
 */
export function EchelleTaille({
  tailleCm,
  pxParCm,
  mesure,
}: {
  tailleCm: number
  pxParCm: number
  mesure: 'assise' | 'debout'
}) {
  const conteneur = useRef<HTMLDivElement>(null)
  const [largeur, setLargeur] = useState(0)

  useEffect(() => {
    const el = conteneur.current
    if (!el) return
    const observateur = new ResizeObserver(([entree]) => setLargeur(entree.contentRect.width))
    observateur.observe(el)
    setLargeur(el.clientWidth)
    return () => observateur.disconnect()
  }, [])

  // On ne grossit jamais le bébé : au mieux 1:1, sinon on réduit pour tenir.
  const utile = Math.max(0, largeur - 2)
  const pxParCmAffiche = utile > 0 ? Math.min(pxParCm, utile / Math.max(tailleCm, 0.3)) : 0
  const facteur = pxParCm > 0 ? pxParCmAffiche / pxParCm : 0
  const grandeurNature = facteur > 0.995

  const longueur = tailleCm * pxParCmAffiche
  const reference =
    pxParCmAffiche > 0 ? REFERENCES.find((r) => r.cm * pxParCmAffiche <= utile) : undefined
  const tailleReference = reference ? reference.cm * pxParCmAffiche : 0
  const rapport = reference ? tailleCm / reference.cm : 0

  // Graduations lisibles : au centimètre quand il y a la place, sinon tous les 5 ou 10.
  const pas = pxParCmAffiche > 13 ? 1 : pxParCmAffiche > 4 ? 5 : 10
  const graduations: number[] = []
  for (let c = pas; c <= tailleCm + 0.001; c += pas) graduations.push(c)

  return (
    <div ref={conteneur}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[13px] font-medium text-ink">
          {grandeurNature ? 'Taille réelle sur ton écran' : 'Longueur, à l’échelle'}
        </p>
        <p className="text-[12px] text-muted">
          {grandeurNature ? '1:1' : `échelle 1:${nombreCompact(1 / facteur)}`}
        </p>
      </div>

      {pxParCmAffiche > 0 && (
        <div className="relative mt-3 h-7" style={{ width: Math.max(longueur, 3) }}>
          <div className="absolute inset-x-0 top-2 h-2.5 rounded-full bg-rose-deep" />
          <div className="absolute left-0 top-0 h-[26px] w-px bg-rose-deep" />
          <div className="absolute right-0 top-0 h-[26px] w-px bg-rose-deep" />
          {graduations.map((c) => (
            <div
              key={c}
              className="absolute top-[19px] w-px bg-rose-deep/50"
              style={{ left: c * pxParCmAffiche, height: c % (pas * 5) === 0 ? 8 : 4 }}
            />
          ))}
        </div>
      )}

      <p className="mt-2 text-sm text-ink">
        <strong className="font-display text-lg">{nombreCompact(tailleCm)} cm</strong>{' '}
        <span className="text-[13px] text-muted">
          {mesure === 'assise' ? 'du sommet du crâne au coccyx' : 'de la tête aux pieds'}
        </span>
      </p>

      {reference ? (
        <div className="mt-4">
          {reference.forme === 'rectangle' ? (
            <div
              className="flex items-center justify-center overflow-hidden whitespace-nowrap rounded border border-dashed border-muted/50 bg-cream text-[10px] uppercase tracking-wide text-muted"
              style={{ width: tailleReference, height: 24 }}
            >
              {tailleReference > 100 ? reference.etiquette : ''}
            </div>
          ) : (
            <div
              className="flex items-center justify-center rounded-full border border-dashed border-muted/50 bg-cream text-[11px] font-medium text-muted"
              style={{ width: tailleReference, height: tailleReference }}
            >
              {tailleReference > 44 ? '2 €' : ''}
            </div>
          )}
          <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
            Une {reference.etiquette}, à la même échelle
            {grandeurNature ? ' : pose la tienne contre l’écran pour comparer' : ''}.{' '}
            {rapport >= 1.05
              ? `Le bébé en fait ${nombreFr(rapport, 1)} fois ${reference.mesure}.`
              : reference.plusPetit}
          </p>
        </div>
      ) : (
        <p className="mt-3 text-[12px] leading-relaxed text-muted">
          Soit {nombreFr(tailleCm / CARTE_CM, 2)} fois la longueur d’une carte bancaire.
        </p>
      )}

      {mesure === 'assise' && (
        <p className="mt-2 text-[12px] leading-relaxed text-muted">
          Jusqu’à 20 SA, le bébé est trop replié pour être mesuré en entier : d’où le saut apparent
          de taille à 21 SA, quand on passe à la mesure de la tête aux pieds.
        </p>
      )}
    </div>
  )
}
