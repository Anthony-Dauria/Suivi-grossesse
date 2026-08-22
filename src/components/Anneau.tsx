export function Anneau({
  progression,
  taille = 168,
  epaisseur = 10,
  children,
}: {
  progression: number
  taille?: number
  epaisseur?: number
  children?: React.ReactNode
}) {
  const rayon = (taille - epaisseur) / 2
  const circonference = 2 * Math.PI * rayon
  const remplissage = circonference * Math.min(1, Math.max(0, progression))

  return (
    <div className="relative" style={{ width: taille, height: taille }}>
      <svg width={taille} height={taille} className="-rotate-90">
        <circle
          cx={taille / 2}
          cy={taille / 2}
          r={rayon}
          fill="none"
          stroke="var(--color-rose-soft)"
          strokeWidth={epaisseur}
        />
        <circle
          cx={taille / 2}
          cy={taille / 2}
          r={rayon}
          fill="none"
          stroke="var(--color-rose-deep)"
          strokeWidth={epaisseur}
          strokeLinecap="round"
          strokeDasharray={`${remplissage} ${circonference}`}
          style={{ transition: 'stroke-dasharray 0.8s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  )
}
