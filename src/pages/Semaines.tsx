import { useEffect, useMemo, useRef, useState } from 'react'
import { SEMAINES } from '../data/semaines'
import { Carte, Puce, TitreSection } from '../components/ui'
import { SilhouetteBebe } from '../components/SilhouetteBebe'
import { EchelleTaille } from '../components/EchelleTaille'
import { useDonnees } from '../lib/donnees'
import { dateDebutSA, moisDeGrossesse, trimestre } from '../lib/grossesse'
import { ajouterJours, formatJourMois } from '../lib/dates'
import { ordinal } from '../lib/texte'

export function Semaines() {
  const { grossesse, profil } = useDonnees()
  const saActuelle = grossesse?.sa ?? 12
  const [selection, setSelection] = useState(() =>
    Math.min(Math.max(saActuelle, SEMAINES[0].sa), SEMAINES[SEMAINES.length - 1].sa),
  )
  const barre = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const actif = barre.current?.querySelector<HTMLElement>('[data-actif="true"]')
    actif?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [selection])

  const semaine = useMemo(() => SEMAINES.find((s) => s.sa === selection), [selection])
  if (!semaine) return null

  const t = trimestre(semaine.sa)
  const passee = semaine.sa < saActuelle
  const courante = semaine.sa === saActuelle

  const periode = grossesse
    ? (() => {
        const debut = dateDebutSA(grossesse.ddr, semaine.sa)
        return `${formatJourMois(debut)} → ${formatJourMois(ajouterJours(debut, 6))}`
      })()
    : null

  const index = SEMAINES.findIndex((s) => s.sa === selection)

  return (
    <div className="animate-rise">
      <div ref={barre} className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {SEMAINES.map((s) => {
          const actif = s.sa === selection
          return (
            <button
              key={s.sa}
              data-actif={actif}
              onClick={() => setSelection(s.sa)}
              className={`flex size-14 shrink-0 flex-col items-center justify-center rounded-2xl border text-sm font-medium transition ${
                actif
                  ? 'border-rose-deep bg-rose-deep text-white'
                  : s.sa === saActuelle
                    ? 'border-rose bg-rose-soft text-rose-deep'
                    : s.sa < saActuelle
                      ? 'border-line bg-white text-muted'
                      : 'border-line bg-white/50 text-muted'
              }`}
            >
              <span className="text-base leading-none">{s.sa}</span>
              <span className="mt-0.5 text-[10px] uppercase tracking-wide opacity-70">SA</span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Puce ton={t === 1 ? 'sage' : t === 2 ? 'sky' : 'rose'}>{ordinal(t)} trimestre</Puce>
        <Puce>{ordinal(moisDeGrossesse(semaine.sa))} mois</Puce>
        <Puce>{Math.max(0, semaine.sa - 2)} semaines de grossesse</Puce>
        {courante && <Puce ton="rose">Ta semaine</Puce>}
        {passee && <Puce ton="neutre">Déjà passée</Puce>}
      </div>
      {periode && <p className="mt-2 text-[13px] text-muted">Du {periode}</p>}

      {semaine.focus && (
        <Carte className="mt-4 border-amber-soft bg-amber-soft/60">
          <p className="text-[13px] font-medium uppercase tracking-wide text-amber-deep">
            À retenir cette semaine
          </p>
          <p className="mt-1 text-[15px] leading-snug text-ink">{semaine.focus}</p>
        </Carte>
      )}

      <TitreSection>Le bébé</TitreSection>
      <Carte>
        <div className="flex items-center gap-3">
          <SilhouetteBebe sa={semaine.sa} className="w-32 shrink-0" />
          <div className="min-w-0">
            <p className="text-[15px] font-medium leading-snug text-ink">
              Grand comme {semaine.comparaison} {semaine.emoji}
            </p>
            <div className="mt-2 space-y-0.5 text-[13px] text-muted">
              <p>
                <strong className="font-display text-base text-ink">{semaine.taille}</strong> de long
              </p>
              <p>
                <strong className="font-display text-base text-ink">{semaine.poids}</strong>
              </p>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink">{semaine.bebe}</p>
        <div className="mt-4 border-t border-line pt-4">
          <EchelleTaille
            tailleCm={semaine.tailleCm}
            pxParCm={profil.pxParCm}
            mesure={semaine.mesure}
          />
        </div>
      </Carte>

      <TitreSection>Toi</TitreSection>
      <Carte>
        <p className="text-sm leading-relaxed text-ink">{semaine.maman}</p>
      </Carte>

      <TitreSection>Ce qui aide</TitreSection>
      <Carte>
        <ul className="space-y-3">
          {semaine.conseils.map((c) => (
            <li key={c} className="flex gap-3 text-sm leading-relaxed">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Carte>

      <div className="mt-6 flex gap-3">
        <button
          disabled={index === 0}
          onClick={() => setSelection(SEMAINES[index - 1].sa)}
          className="flex-1 rounded-full border border-line bg-white py-2.5 text-sm font-medium text-ink transition disabled:opacity-40"
        >
          ← {index > 0 ? `${SEMAINES[index - 1].sa} SA` : ''}
        </button>
        <button
          disabled={index === SEMAINES.length - 1}
          onClick={() => setSelection(SEMAINES[index + 1].sa)}
          className="flex-1 rounded-full border border-line bg-white py-2.5 text-sm font-medium text-ink transition disabled:opacity-40"
        >
          {index < SEMAINES.length - 1 ? `${SEMAINES[index + 1].sa} SA` : ''} →
        </button>
      </div>
    </div>
  )
}
