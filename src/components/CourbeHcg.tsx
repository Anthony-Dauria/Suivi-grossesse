import { useMemo } from 'react'
import type { DosageHcg } from '../lib/donnees'
import { depuisISO, diffJours } from '../lib/dates'
import { FOURCHETTES_HCG } from '../data/hcg'

/**
 * Courbe des dosages d'hCG. L'échelle verticale est logarithmique : le taux
 * passe de quelques dizaines à plusieurs centaines de milliers en huit
 * semaines, une échelle linéaire écraserait tout le début.
 */
export function CourbeHcg({ dosages, ddr }: { dosages: DosageHcg[]; ddr: Date }) {
  const points = useMemo(
    () =>
      dosages
        .map((d) => ({ sa: diffJours(depuisISO(d.date), ddr) / 7, valeur: d.valeur }))
        .filter((p) => p.sa >= 0 && p.sa <= 20 && p.valeur > 0)
        .sort((a, b) => a.sa - b.sa),
    [dosages, ddr],
  )
  if (points.length === 0) return null

  const L = 320
  const H = 190
  const marge = { haut: 10, bas: 24, gauche: 40, droite: 8 }
  const largeur = L - marge.gauche - marge.droite
  const hauteur = H - marge.haut - marge.bas

  const saMin = 3
  const saMax = Math.max(9, Math.ceil(Math.max(...points.map((p) => p.sa)) + 1))
  const log = (v: number) => Math.log10(Math.max(v, 1))
  const yMin = 0 // 1 mUI/mL
  const yMax = 6 // 1 000 000

  const x = (sa: number) => marge.gauche + ((sa - saMin) / (saMax - saMin)) * largeur
  const y = (v: number) => marge.haut + hauteur - ((log(v) - yMin) / (yMax - yMin)) * hauteur

  const chemin = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.sa).toFixed(1)},${y(p.valeur).toFixed(1)}`)
    .join(' ')

  // Bandes de référence, tronquées à la fenêtre affichée
  const bandes = FOURCHETTES_HCG.filter((f) => f.de <= saMax && f.a >= saMin)

  const graduations = [1, 2, 3, 4, 5, 6]
  const etiquette = (p: number) =>
    p >= 3 ? `${10 ** (p - 3)}k` : String(10 ** p)

  return (
    <svg viewBox={`0 0 ${L} ${H}`} className="w-full" role="img" aria-label="Courbe des dosages d’hCG">
      {bandes.map((f) => {
        const x1 = x(Math.max(f.de, saMin))
        const x2 = x(Math.min(f.a + 1, saMax))
        if (x2 <= x1) return null
        return (
          <rect
            key={f.libelle}
            x={x1}
            y={y(f.max)}
            width={x2 - x1}
            height={Math.max(1, y(f.min) - y(f.max))}
            fill="var(--color-sage-soft)"
            opacity="0.75"
          />
        )
      })}

      {graduations.map((p) => (
        <g key={p}>
          <line
            x1={marge.gauche}
            x2={L - marge.droite}
            y1={y(10 ** p)}
            y2={y(10 ** p)}
            stroke="var(--color-line)"
            strokeWidth="1"
          />
          <text x={4} y={y(10 ** p) + 4} fontSize="9" fill="var(--color-muted)">
            {etiquette(p)}
          </text>
        </g>
      ))}

      {Array.from({ length: saMax - saMin + 1 }, (_, i) => saMin + i)
        .filter((sa) => (saMax - saMin > 8 ? sa % 2 === 1 : true))
        .map((sa) => (
          <text
            key={sa}
            x={x(sa)}
            y={H - 7}
            fontSize="9"
            fill="var(--color-muted)"
            textAnchor="middle"
          >
            {sa}
          </text>
        ))}

      <path
        d={chemin}
        fill="none"
        stroke="var(--color-rose-deep)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={x(p.sa)}
          cy={y(p.valeur)}
          r="3.5"
          fill="white"
          stroke="var(--color-rose-deep)"
          strokeWidth="2"
        />
      ))}
    </svg>
  )
}
