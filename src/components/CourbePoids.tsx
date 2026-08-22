import { useMemo } from 'react'
import type { Pesee } from '../lib/donnees'
import { depuisISO, diffJours } from '../lib/dates'
import { fourchettePoids } from '../lib/grossesse'

type Point = { sa: number; poids: number }

export function CourbePoids({
  pesees,
  ddr,
  poidsAvant,
  valeurIMC,
}: {
  pesees: Pesee[]
  ddr: Date
  poidsAvant: number | null
  valeurIMC: number | null
}) {
  const points: Point[] = useMemo(
    () =>
      pesees
        .map((p) => ({ sa: diffJours(depuisISO(p.date), ddr) / 7, poids: p.poids }))
        .filter((p) => p.sa >= 0 && p.sa <= 42)
        .sort((a, b) => a.sa - b.sa),
    [pesees, ddr],
  )

  const L = 320
  const H = 190
  const marge = { haut: 12, bas: 26, gauche: 34, droite: 10 }
  const largeur = L - marge.gauche - marge.droite
  const hauteur = H - marge.haut - marge.bas

  const bande = useMemo(() => {
    if (poidsAvant == null || valeurIMC == null) return null
    const [min, max] = fourchettePoids(valeurIMC)
    const courbe = (total: number) =>
      Array.from({ length: 43 }, (_, sa) => {
        const part = sa <= 13 ? (sa / 13) * 0.15 : 0.15 + ((sa - 13) / 27) * 0.85
        return { sa, poids: poidsAvant + total * Math.min(1, part) }
      })
    return { bas: courbe(min), haut: courbe(max) }
  }, [poidsAvant, valeurIMC])

  const valeurs = [
    ...points.map((p) => p.poids),
    ...(poidsAvant != null ? [poidsAvant] : []),
    ...(bande ? bande.haut.map((p) => p.poids) : []),
  ]
  if (valeurs.length === 0) return null

  const minY = Math.floor(Math.min(...valeurs) - 2)
  const maxY = Math.ceil(Math.max(...valeurs) + 2)
  const x = (sa: number) => marge.gauche + (sa / 42) * largeur
  const y = (p: number) => marge.haut + hauteur - ((p - minY) / (maxY - minY)) * hauteur

  const chemin = (liste: Point[]) =>
    liste.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.sa).toFixed(1)},${y(p.poids).toFixed(1)}`).join(' ')

  const zone = bande
    ? `${chemin(bande.bas)} L${x(42)},${y(bande.haut[42].poids)} ${bande.haut
        .slice()
        .reverse()
        .map((p) => `L${x(p.sa).toFixed(1)},${y(p.poids).toFixed(1)}`)
        .join(' ')} Z`
    : null

  const graduations = [minY, Math.round((minY + maxY) / 2), maxY]

  return (
    <svg viewBox={`0 0 ${L} ${H}`} className="w-full" role="img" aria-label="Courbe de poids">
      {graduations.map((g) => (
        <g key={g}>
          <line
            x1={marge.gauche}
            x2={L - marge.droite}
            y1={y(g)}
            y2={y(g)}
            stroke="var(--color-line)"
            strokeWidth="1"
          />
          <text x={4} y={y(g) + 4} fontSize="10" fill="var(--color-muted)">
            {g}
          </text>
        </g>
      ))}

      {[0, 14, 28, 42].map((sa) => (
        <text
          key={sa}
          x={x(sa)}
          y={H - 8}
          fontSize="10"
          fill="var(--color-muted)"
          textAnchor={sa === 0 ? 'start' : sa === 42 ? 'end' : 'middle'}
        >
          {sa} SA
        </text>
      ))}

      {zone && <path d={zone} fill="var(--color-sage-soft)" opacity="0.8" />}

      {points.length > 0 && (
        <path
          d={chemin(points)}
          fill="none"
          stroke="var(--color-rose-deep)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {points.map((p) => (
        <circle
          key={`${p.sa}-${p.poids}`}
          cx={x(p.sa)}
          cy={y(p.poids)}
          r="3.5"
          fill="white"
          stroke="var(--color-rose-deep)"
          strokeWidth="2"
        />
      ))}
    </svg>
  )
}
