import { useId } from 'react'
import { amasCellulaire, tracer } from '../lib/silhouette'

/**
 * Silhouette du bébé à la semaine donnée. Le dessin évolue en continu : amas de
 * cellules des premiers jours, embryon replié avec son bourgeon caudal, fœtus à
 * grosse tête, puis bébé potelé aux traits dessinés.
 */
export function SilhouetteBebe({
  sa,
  className = '',
  halo = true,
  cordon = true,
}: {
  sa: number
  className?: string
  halo?: boolean
  cordon?: boolean
}) {
  const id = useId()
  const peau = `url(#peau-${id})`
  // Les membres passent devant le corps : un ton légèrement plus soutenu les
  // détache du torse là où ils le recouvrent.
  const peauMembre = `url(#membre-${id})`

  const cadre = (contenu: React.ReactNode) => (
    <svg
      viewBox="0 0 240 260"
      className={className}
      role="img"
      aria-label={`Illustration du bébé à ${Math.round(sa)} semaines d’aménorrhée`}
    >
      <defs>
        <radialGradient
          id={`peau-${id}`}
          gradientUnits="userSpaceOnUse"
          cx="118"
          cy="72"
          r="185"
        >
          <stop offset="0" stopColor="#f8d6d0" />
          <stop offset="1" stopColor="#e3a49f" />
        </radialGradient>
        <radialGradient
          id={`membre-${id}`}
          gradientUnits="userSpaceOnUse"
          cx="118"
          cy="72"
          r="185"
        >
          <stop offset="0" stopColor="#f2c3bc" />
          <stop offset="1" stopColor="#d99590" />
        </radialGradient>
        <radialGradient id={`halo-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.5" stopColor="#f6dfe1" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f6dfe1" stopOpacity="0" />
        </radialGradient>
      </defs>
      {halo && <circle cx="120" cy="130" r="126" fill={`url(#halo-${id})`} />}
      {contenu}
    </svg>
  )

  // Avant 6 SA, l'embryon n'a pas encore de forme reconnaissable.
  if (sa < 6) {
    const cellules = amasCellulaire(sa)
    return cadre(
      <g>
        <circle cx="120" cy="130" r={38 + (Math.max(3, sa) - 3) * 5} fill={peau} opacity="0.35" />
        {cellules.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.r} fill={peau} opacity="0.9" />
        ))}
      </g>,
    )
  }

  const t = tracer(sa)

  return cadre(
    <g transform={`translate(120 132) scale(${t.m.echelle.toFixed(3)}) translate(-120 -132)`}>
      {cordon && (
        <path
          d={t.cordon}
          fill="none"
          stroke="#e3a49f"
          strokeWidth={8}
          strokeLinecap="round"
          opacity="0.45"
        />
      )}

      <g fill={peau} stroke={peau} strokeLinecap="round" strokeLinejoin="round">
        {t.queue && <path d={t.queue.d} fill="none" strokeWidth={t.queue.largeur} />}
        <path d={t.torse.d} fill="none" strokeWidth={t.torse.largeur} />
        <circle cx={t.tete.x} cy={t.tete.y} r={t.tete.r} stroke="none" />
      </g>

      <g fill={peauMembre} stroke={peauMembre} strokeLinecap="round" strokeLinejoin="round">
        {t.jambe.map((s, i) => (
          <path key={`j${i}`} d={s.d} fill="none" strokeWidth={s.largeur} />
        ))}
        <ellipse
          cx={t.pied.x}
          cy={t.pied.y}
          rx={t.pied.rx}
          ry={t.pied.ry}
          transform={`rotate(${t.pied.angle} ${t.pied.x} ${t.pied.y})`}
          stroke="none"
        />
        {t.bras.map((s, i) => (
          <path key={`b${i}`} d={s.d} fill="none" strokeWidth={s.largeur} />
        ))}
        <circle cx={t.main.x} cy={t.main.y} r={t.main.r} stroke="none" />
      </g>

      <g fill="none" stroke="#ac6259" strokeLinecap="round" strokeLinejoin="round">
        {/* La tache oculaire de l'embryon s'efface au profit d'une paupière close */}
        <circle
          cx={t.oeil.x}
          cy={t.oeil.y}
          r={t.oeil.r}
          fill="#8c4a45"
          stroke="none"
          opacity={(1 - t.m.visage) * 0.72}
        />
        <circle
          cx={t.joue.x}
          cy={t.joue.y}
          r={t.joue.r}
          fill="#e08c8c"
          stroke="none"
          opacity={t.m.visage * 0.22}
        />
        <path d={t.paupiere} strokeWidth={2.4} opacity={t.m.visage} />
        <path d={t.sourcil} strokeWidth={1.6} opacity={t.m.visage * 0.45} />
        <path d={t.nez} strokeWidth={1.9} opacity={t.m.visage * 0.8} />
        <path d={t.bouche} strokeWidth={1.9} opacity={t.m.visage * 0.7} />
        <path d={t.oreille} strokeWidth={1.8} opacity={t.m.visage * 0.5} />
        {t.m.cheveux > 0.05 &&
          t.cheveux.map((d, i) => (
            <path key={`c${i}`} d={d} strokeWidth={2.4} opacity={t.m.cheveux * 0.5} />
          ))}
      </g>
    </g>,
  )
}
