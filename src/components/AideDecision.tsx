import { useState } from 'react'
import { Carte, Puce } from './ui'
import { STATUT_LABEL, type Statut } from '../data/aliments'

type Critere = {
  cle: string
  question: string
  /** Ce que ce critère implique quand le plat n'est pas cuit à cœur */
  risque: string
  /** true si une cuisson à cœur suffit à lever le risque */
  leveParLaCuisson: boolean
}

const CRITERES: Critere[] = [
  {
    cle: 'cru',
    question: 'De la viande, du poisson ou un œuf crus ou peu cuits',
    risque: 'chair ou œuf crus : toxoplasmose, listeria, salmonelle',
    leveParLaCuisson: true,
  },
  {
    cle: 'laitCru',
    question: 'Un fromage au lait cru, ou un fromage avec sa croûte',
    risque: 'lait cru et croûte : listeria',
    leveParLaCuisson: true,
  },
  {
    cle: 'charcuterie',
    question: 'De la charcuterie crue : jambon cru, saucisson, pâté, rillettes',
    risque: 'charcuterie crue ou en gelée : listeria et toxoplasmose',
    leveParLaCuisson: true,
  },
  {
    cle: 'fume',
    question: 'Du poisson fumé, mariné ou des œufs de poisson',
    risque: 'fumage à froid : la listeria y survit',
    leveParLaCuisson: true,
  },
  {
    cle: 'crudites',
    question: 'Des crudités, des herbes fraîches ou des graines germées',
    risque: 'terre résiduelle : toxoplasmose si elles ne sont pas lavées',
    leveParLaCuisson: true,
  },
  {
    cle: 'vitrine',
    question: 'Un plat resté en vitrine, au buffet ou préparé à l’avance',
    risque: 'chaîne du froid incertaine : la listeria se multiplie même au frais',
    leveParLaCuisson: false,
  },
]

export function AideDecision() {
  const [coches, setCoches] = useState<Record<string, boolean>>({})
  const [cuit, setCuit] = useState<boolean | null>(null)

  const basculer = (cle: string) => setCoches((c) => ({ ...c, [cle]: !c[cle] }))
  const retenus = CRITERES.filter((c) => coches[c.cle])
  const repondu = cuit !== null || retenus.length > 0

  const bloquants = retenus.filter((c) => !c.leveParLaCuisson || cuit !== true)

  let statut: Statut = 'oui'
  let phrase =
    'Rien de ce qui pose problème pendant la grossesse. Ce plat peut se manger tel quel.'

  if (bloquants.length > 0) {
    statut = 'non'
    phrase =
      'Mieux vaut passer ton tour, ou faire modifier la préparation avant de la commander.'
  } else if (retenus.length > 0 && cuit === true) {
    statut = 'oui'
    phrase =
      'La cuisson à cœur lève le risque : servi bien chaud, ce plat est autorisé.'
  } else if (cuit === false && retenus.length === 0) {
    statut = 'prudence'
    phrase =
      'Rien d’identifié comme risqué, mais un plat qui n’est ni cuit ni chaud mérite de savoir comment il a été préparé.'
  }

  const ton = statut === 'oui' ? 'sage' : statut === 'prudence' ? 'amber' : 'clay'

  return (
    <Carte>
      <p className="text-[15px] font-medium text-ink">Aide-moi à décider</p>
      <p className="mt-1 text-[13px] leading-relaxed text-muted">
        Le plat n’est pas dans la liste ? Coche ce qu’il contient, la réponse se construit toute
        seule.
      </p>

      <div className="mt-4 space-y-2">
        {CRITERES.map((c) => {
          const actif = !!coches[c.cle]
          return (
            <button
              key={c.cle}
              onClick={() => basculer(c.cle)}
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

      {repondu && (
        <div className="mt-4 border-t border-line pt-4">
          <Puce ton={ton}>{STATUT_LABEL[statut]}</Puce>
          <p className="mt-2.5 text-sm leading-relaxed text-ink">{phrase}</p>
          {bloquants.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {bloquants.map((c) => (
                <li key={c.cle} className="flex gap-2.5 text-[13px] leading-relaxed text-muted">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-clay-deep" />
                  <span>{c.risque}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 rounded-xl bg-cream px-3 py-2.5 text-[12px] leading-relaxed text-muted">
            La règle qui marche presque toujours : <strong className="text-ink">bien lavé, bien
            cuit, bien chaud</strong>. Tout ce qui est cuit à cœur juste avant d’être servi est
            autorisé, quelle que soit sa composition.
          </p>
        </div>
      )}
    </Carte>
  )
}
