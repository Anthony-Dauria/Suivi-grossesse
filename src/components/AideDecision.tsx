import { useEffect, useState } from 'react'
import { Carte, Puce } from './ui'
import { STATUT_LABEL } from '../data/aliments'
import { CRITERES, evaluer, type Decision } from '../lib/decisionPlat'

const TON = { oui: 'sage', prudence: 'amber', non: 'clay' } as const

/**
 * Questionnaire qui déduit un verdict de la composition d'un plat. Utilisé seul
 * quand la recherche ne trouve rien, et intégré à la fiche d'un plat photographié.
 */
export function AideDecision({
  intro = true,
  sansCadre = false,
  onDecision,
}: {
  intro?: boolean
  sansCadre?: boolean
  onDecision?: (decision: Decision, coches: Record<string, boolean>, cuit: boolean | null) => void
}) {
  const [coches, setCoches] = useState<Record<string, boolean>>({})
  const [cuit, setCuit] = useState<boolean | null>(null)
  const decision = evaluer(coches, cuit)

  useEffect(() => {
    onDecision?.(decision, coches, cuit)
    // onDecision est recréé à chaque rendu du parent : on ne suit que l'état réel.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coches, cuit])

  const contenu = (
    <>
      {intro && (
        <>
          <p className="text-[15px] font-medium text-ink">Aide-moi à décider</p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            Le plat n’est pas dans la liste ? Coche ce qu’il contient, la réponse se construit
            toute seule.
          </p>
        </>
      )}

      <div className={intro ? 'mt-4 space-y-2' : 'space-y-2'}>
        {CRITERES.map((c) => {
          const actif = !!coches[c.cle]
          return (
            <button
              key={c.cle}
              onClick={() => setCoches((x) => ({ ...x, [c.cle]: !x[c.cle] }))}
              aria-pressed={actif}
              className="flex w-full items-start gap-3 rounded-xl border border-line bg-white px-3 py-2.5 text-left transition active:scale-[0.99]"
            >
              <span
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border text-[11px] transition ${
                  actif ? 'border-rose-deep bg-rose-deep text-white' : 'border-line'
                }`}
              >
                {actif ? '✓' : ''}
              </span>
              <span className="text-[13px] leading-snug text-ink">{c.question}</span>
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-sm font-medium text-ink">Est-il servi cuit à cœur et bien chaud ?</p>
      <div className="mt-2 flex gap-2">
        {[
          { valeur: true, label: 'Oui, brûlant' },
          { valeur: false, label: 'Non, froid ou tiède' },
        ].map((o) => (
          <button
            key={String(o.valeur)}
            onClick={() => setCuit(cuit === o.valeur ? null : o.valeur)}
            className={`flex-1 rounded-full py-2 text-[13px] transition ${
              cuit === o.valeur ? 'bg-ink text-white' : 'border border-line bg-white text-muted'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {decision.repondu && (
        <div className="mt-4 border-t border-line pt-4">
          <Puce ton={TON[decision.statut]}>{STATUT_LABEL[decision.statut]}</Puce>
          <p className="mt-2.5 text-sm leading-relaxed text-ink">{decision.phrase}</p>
          {decision.bloquants.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {decision.bloquants.map((c) => (
                <li key={c.cle} className="flex gap-2.5 text-[13px] leading-relaxed text-muted">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-clay-deep" />
                  <span>{c.risque}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 rounded-xl bg-cream px-3 py-2.5 text-[12px] leading-relaxed text-muted">
            La règle qui marche presque toujours :{' '}
            <strong className="text-ink">bien lavé, bien cuit, bien chaud</strong>. Tout ce qui est
            cuit à cœur juste avant d’être servi est autorisé, quelle que soit sa composition.
          </p>
        </div>
      )}
    </>
  )

  return sansCadre ? <div>{contenu}</div> : <Carte>{contenu}</Carte>
}
