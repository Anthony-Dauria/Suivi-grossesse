import { useMemo, useState } from 'react'
import {
  ALIMENTS,
  CATEGORIES,
  STATUT_LABEL,
  type Aliment,
  type Categorie,
  type Statut,
} from '../data/aliments'
import { IDEES_REPAS, NUTRIMENTS, REGLES_HYGIENE, SYMPTOMES } from '../data/nutrition'
import { Carte, Depliant, Onglets, Puce, TitreSection, Vide, classesInput } from '../components/ui'
import { Icone } from '../components/Icones'
import { normaliser, ordinal } from '../lib/texte'
import { useDonnees } from '../lib/donnees'

type Vue = 'recherche' | 'nutriments' | 'repas' | 'maux' | 'hygiene'

const VUES = [
  { id: 'recherche' as const, label: 'Puis-je manger ?' },
  { id: 'nutriments' as const, label: 'Nutriments clés' },
  { id: 'repas' as const, label: 'Idées de repas' },
  { id: 'maux' as const, label: 'Petits maux' },
  { id: 'hygiene' as const, label: 'Les 6 réflexes' },
]

const TON_STATUT: Record<Statut, 'sage' | 'amber' | 'clay'> = {
  oui: 'sage',
  prudence: 'amber',
  non: 'clay',
}

const PASTILLE: Record<Statut, string> = {
  oui: 'bg-sage-soft text-sage-deep',
  prudence: 'bg-amber-soft text-amber-deep',
  non: 'bg-clay-soft text-clay-deep',
}

const SYMBOLE: Record<Statut, string> = { oui: '✓', prudence: '!', non: '✕' }

export function Alimentation({ vueInitiale }: { vueInitiale?: string }) {
  const [vue, setVue] = useState<Vue>((vueInitiale as Vue) || 'recherche')

  return (
    <div className="animate-rise">
      <Onglets valeur={vue} options={VUES} onChange={setVue} />
      {vue === 'recherche' && <Recherche />}
      {vue === 'nutriments' && <VueNutriments />}
      {vue === 'repas' && <VueRepas />}
      {vue === 'maux' && <VueMaux />}
      {vue === 'hygiene' && <VueHygiene />}
    </div>
  )
}

function Recherche() {
  const { profil } = useDonnees()
  const [requete, setRequete] = useState('')
  const [statutFiltre, setStatutFiltre] = useState<Statut | 'tous'>('tous')
  const [categorie, setCategorie] = useState<Categorie | 'toutes'>('toutes')
  const [ouvert, setOuvert] = useState<string | null>(null)

  const resultats = useMemo(() => {
    const q = normaliser(requete)
    return ALIMENTS.filter((a) => {
      if (statutFiltre !== 'tous' && a.statut !== statutFiltre) return false
      if (categorie !== 'toutes' && a.cat !== categorie) return false
      if (!q) return true
      const champ = normaliser([a.nom, a.resume, a.pourquoi, ...(a.mots ?? [])].join(' '))
      return q.split(' ').every((mot) => champ.includes(mot))
    })
  }, [requete, statutFiltre, categorie])

  const groupes = useMemo(() => {
    const map = new Map<Categorie, Aliment[]>()
    for (const a of resultats) {
      const liste = map.get(a.cat) ?? []
      liste.push(a)
      map.set(a.cat, liste)
    }
    return CATEGORIES.filter((c) => map.has(c)).map((c) => [c, map.get(c)!] as const)
  }, [resultats])

  return (
    <>
      <div className="relative">
        <Icone
          nom="recherche"
          className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted"
        />
        <input
          className={`${classesInput} pl-11`}
          placeholder="Sushi, camembert, café…"
          value={requete}
          onChange={(e) => setRequete(e.target.value)}
        />
      </div>

      <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5">
        {(['tous', 'oui', 'prudence', 'non'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatutFiltre(s)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
              statutFiltre === s
                ? 'bg-ink text-white'
                : 'border border-line bg-white text-muted hover:text-ink'
            }`}
          >
            {s === 'tous' ? 'Tout' : STATUT_LABEL[s]}
          </button>
        ))}
      </div>

      <div className="no-scrollbar -mx-5 mt-2 flex gap-2 overflow-x-auto px-5">
        <button
          onClick={() => setCategorie('toutes')}
          className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] transition ${
            categorie === 'toutes' ? 'bg-rose-soft text-rose-deep' : 'text-muted'
          }`}
        >
          Toutes catégories
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategorie(c)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] transition ${
              categorie === c ? 'bg-rose-soft text-rose-deep' : 'text-muted'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {profil.toxoplasmose === 'non-immunisee' && (
        <Carte className="mt-4 border-amber-soft bg-amber-soft/50">
          <p className="text-sm leading-relaxed text-amber-deep">
            <strong>Tu n’es pas immunisée contre la toxoplasmose.</strong> Sois particulièrement
            stricte sur la cuisson à cœur des viandes et le lavage des fruits, légumes et herbes.
          </p>
        </Carte>
      )}

      <p className="mt-4 text-[13px] text-muted">
        {resultats.length} aliment{resultats.length > 1 ? 's' : ''}
      </p>

      {resultats.length === 0 && (
        <div className="mt-3">
          <Vide>
            Aucun résultat pour « {requete} ».
            <br />
            En cas de doute sur un aliment, la règle qui marche presque toujours : bien lavé et bien
            cuit, c’est autorisé.
          </Vide>
        </div>
      )}

      {groupes.map(([cat, liste]) => (
        <div key={cat}>
          <TitreSection>{cat}</TitreSection>
          <div className="space-y-2">
            {liste.map((a) => (
              <Depliant
                key={a.nom}
                titre={a.nom}
                sous={a.resume}
                ouvert={ouvert === a.nom}
                onToggle={() => setOuvert(ouvert === a.nom ? null : a.nom)}
                gauche={
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full text-base font-bold ${PASTILLE[a.statut]}`}
                  >
                    {SYMBOLE[a.statut]}
                  </span>
                }
              >
                <Puce ton={TON_STATUT[a.statut]}>{STATUT_LABEL[a.statut]}</Puce>
                <p className="mt-3 text-ink">{a.pourquoi}</p>
                {a.astuce && (
                  <p className="mt-3 rounded-xl bg-cream px-3 py-2.5 text-[13px] leading-relaxed text-muted">
                    <strong className="text-ink">L’astuce : </strong>
                    {a.astuce}
                  </p>
                )}
              </Depliant>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

function VueNutriments() {
  const { grossesse } = useDonnees()
  const [ouvert, setOuvert] = useState<string | null>(NUTRIMENTS[0].nom)
  const t = grossesse?.trimestre ?? 1
  const label = `${ordinal(t)} trimestre`

  return (
    <>
      <p className="text-sm leading-relaxed text-muted">
        Les besoins ne doublent pas, mais certains grimpent fortement. Voici les sept nutriments qui
        comptent vraiment, et où les trouver.
      </p>
      <div className="mt-4 space-y-2">
        {NUTRIMENTS.map((n) => {
          const prioritaire = n.pic.includes(label) || n.pic === 'Toute la grossesse'
          return (
            <Depliant
              key={n.nom}
              titre={n.nom}
              sous={n.besoin}
              ouvert={ouvert === n.nom}
              onToggle={() => setOuvert(ouvert === n.nom ? null : n.nom)}
              gauche={
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cream text-lg">
                  {n.emoji}
                </span>
              }
            >
              {prioritaire && (
                <div className="mb-3">
                  <Puce ton="rose">Prioritaire en ce moment</Puce>
                </div>
              )}
              <p className="text-ink">{n.role}</p>
              <p className="mt-3 text-[13px] font-medium uppercase tracking-wide text-muted">Où en trouver</p>
              <ul className="mt-2 space-y-1.5">
                {n.sources.map((s) => (
                  <li key={s} className="flex gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-xl bg-cream px-3 py-2.5 text-[13px] leading-relaxed text-muted">
                <strong className="text-ink">L’astuce : </strong>
                {n.astuce}
              </p>
            </Depliant>
          )
        })}
      </div>
    </>
  )
}

function VueRepas() {
  const moments = ['Petit-déjeuner', 'Déjeuner', 'Collation', 'Dîner'] as const
  return (
    <>
      <p className="text-sm leading-relaxed text-muted">
        Trois repas et une à deux collations : c’est le rythme qui limite le mieux les nausées, les
        fringales et les variations de glycémie.
      </p>
      {moments.map((m) => (
        <div key={m}>
          <TitreSection>{m}</TitreSection>
          <div className="space-y-2">
            {IDEES_REPAS.filter((r) => r.moment === m).map((r) => (
              <Carte key={r.titre}>
                <p className="text-[15px] font-medium text-ink">{r.titre}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.detail}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.atouts.map((a) => (
                    <Puce key={a} ton="sage">
                      {a}
                    </Puce>
                  ))}
                </div>
              </Carte>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

function VueMaux() {
  const [ouvert, setOuvert] = useState<string | null>(null)
  return (
    <>
      <p className="text-sm leading-relaxed text-muted">
        Presque tous les désagréments de la grossesse s’améliorent avec des ajustements alimentaires
        simples. Voici ceux qui fonctionnent.
      </p>
      <div className="mt-4 space-y-2">
        {SYMPTOMES.map((s) => (
          <Depliant
            key={s.titre}
            titre={s.titre}
            sous={s.quand}
            ouvert={ouvert === s.titre}
            onToggle={() => setOuvert(ouvert === s.titre ? null : s.titre)}
            gauche={
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cream text-lg">
                {s.emoji}
              </span>
            }
          >
            <ul className="space-y-2.5">
              {s.conseils.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            {s.alerte && (
              <p className="mt-3 rounded-xl bg-clay-soft px-3 py-2.5 text-[13px] leading-relaxed text-clay-deep">
                <strong>Quand consulter : </strong>
                {s.alerte}
              </p>
            )}
          </Depliant>
        ))}
      </div>
    </>
  )
}

function VueHygiene() {
  return (
    <>
      <p className="text-sm leading-relaxed text-muted">
        Listeria, salmonelle, toxoplasme : trois noms, six gestes. Une fois qu’ils sont devenus des
        réflexes, il n’y a plus grand-chose à surveiller.
      </p>
      <div className="mt-4 space-y-2">
        {REGLES_HYGIENE.map((r, i) => (
          <Carte key={r.titre}>
            <div className="flex gap-3.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage-soft font-display text-sm text-sage-deep">
                {i + 1}
              </span>
              <div>
                <p className="text-[15px] font-medium text-ink">{r.titre}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{r.texte}</p>
              </div>
            </div>
          </Carte>
        ))}
      </div>
      <Carte className="mt-4 bg-rose-soft/50">
        <p className="text-sm leading-relaxed text-ink">
          <strong>Et le chat ?</strong> Tu peux le garder. C’est la litière le problème, pas
          l’animal : fais-la changer chaque jour par quelqu’un d’autre, ou porte des gants et lave-toi
          les mains ensuite. Même chose pour le jardinage.
        </p>
      </Carte>
    </>
  )
}
