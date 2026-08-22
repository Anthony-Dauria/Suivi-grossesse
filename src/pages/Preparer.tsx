import { useMemo, useState } from 'react'
import { Bouton, Carte, Champ, Onglets, Puce, TitreSection, Vide, classesInput } from '../components/ui'
import { Icone } from '../components/Icones'
import { CHECKLISTS, ETAPES, SIGNES_ALERTE, type Etape } from '../data/suiviMedical'
import { useDonnees, type Prenom } from '../lib/donnees'
import { aujourdhui, depuisISO, diffJours, formatCourt, moisCourt } from '../lib/dates'
import { dateDebutSA, moisDeGrossesse } from '../lib/grossesse'
import { ordinal } from '../lib/texte'

type Vue = 'parcours' | 'rdv' | 'questions' | 'listes' | 'prenoms' | 'urgences'

const VUES = [
  { id: 'parcours' as const, label: 'Parcours médical' },
  { id: 'rdv' as const, label: 'Mes rendez-vous' },
  { id: 'questions' as const, label: 'Mes questions' },
  { id: 'listes' as const, label: 'Checklists' },
  { id: 'prenoms' as const, label: 'Prénoms' },
  { id: 'urgences' as const, label: 'Quand appeler' },
]

export function Preparer({ vueInitiale }: { vueInitiale?: string }) {
  const [vue, setVue] = useState<Vue>((vueInitiale as Vue) || 'parcours')
  return (
    <div className="animate-rise">
      <Onglets valeur={vue} options={VUES} onChange={setVue} />
      {vue === 'parcours' && <VueParcours />}
      {vue === 'rdv' && <VueRdv />}
      {vue === 'questions' && <VueQuestions />}
      {vue === 'listes' && <VueListes />}
      {vue === 'prenoms' && <VuePrenoms />}
      {vue === 'urgences' && <VueUrgences />}
    </div>
  )
}

const EMOJI_TYPE: Record<Etape['type'], string> = {
  consultation: '🩺',
  echographie: '🩻',
  analyse: '🩸',
  demarche: '📄',
  preparation: '🧘',
}

function VueParcours() {
  const { grossesse, coches, basculerCoche } = useDonnees()
  const sa = grossesse?.sa ?? 0
  const [ouvert, setOuvert] = useState<string | null>(null)

  const faits = ETAPES.filter((e) => coches[e.id]).length

  return (
    <>
      <Carte className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-ink">
            <strong className="font-display text-lg">{faits}</strong> / {ETAPES.length} étapes
            validées
          </p>
          <Puce ton="rose">{Math.round((faits / ETAPES.length) * 100)} %</Puce>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-rose-soft">
          <div
            className="h-full rounded-full bg-rose-deep transition-all duration-500"
            style={{ width: `${(faits / ETAPES.length) * 100}%` }}
          />
        </div>
      </Carte>

      <div className="relative space-y-2 pl-6">
        <div className="absolute bottom-3 left-2 top-3 w-px bg-line" />
        {ETAPES.map((e) => {
          const fait = !!coches[e.id]
          const enCours = sa >= e.fenetre[0] && sa <= e.fenetre[1]
          const passe = sa > e.fenetre[1]
          const dateEstimee = grossesse ? dateDebutSA(grossesse.ddr, e.fenetre[0]) : null
          const detailOuvert = ouvert === e.id

          return (
            <div key={e.id} className="relative">
              <span
                className={`absolute -left-[1.15rem] top-5 size-2.5 rounded-full ring-4 ring-cream ${
                  fait ? 'bg-sage-deep' : enCours ? 'bg-rose-deep' : passe ? 'bg-clay-deep' : 'bg-line'
                }`}
              />
              <Carte
                className={`${enCours && !fait ? 'border-rose bg-rose-soft/30' : ''} ${fait ? 'opacity-70' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => basculerCoche(e.id)}
                    aria-label={fait ? 'Marquer comme non fait' : 'Marquer comme fait'}
                    className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border transition ${
                      fait ? 'border-sage-deep bg-sage-deep text-white' : 'border-line bg-white'
                    }`}
                  >
                    {fait && <Icone nom="check" className="size-3.5" />}
                  </button>
                  <button
                    className="min-w-0 flex-1 text-left"
                    onClick={() => setOuvert(detailOuvert ? null : e.id)}
                  >
                    <p
                      className={`text-[15px] font-medium leading-snug text-ink ${fait ? 'line-through decoration-1' : ''}`}
                    >
                      {EMOJI_TYPE[e.type]} {e.titre}
                    </p>
                    <p className="mt-1 text-[13px] text-muted">
                      {e.fenetre[0] === e.fenetre[1]
                        ? `${e.fenetre[0]} SA`
                        : `${e.fenetre[0]} à ${e.fenetre[1]} SA`}
                      {dateEstimee && ` · vers le ${formatCourt(dateEstimee)}`}
                    </p>
                    {detailOuvert && (
                      <p className="mt-2.5 text-sm leading-relaxed text-muted">{e.detail}</p>
                    )}
                  </button>
                  {e.obligatoire && !fait && <Puce ton="neutre">Obligatoire</Puce>}
                </div>
              </Carte>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-muted">
        Calendrier basé sur le suivi de grossesse en France : 7 consultations prénatales, 3
        échographies et les analyses associées. Ton praticien peut l’adapter.
      </p>
    </>
  )
}

function VueRdv() {
  const { rdvs, ajouterRdv, supprimerRdv } = useDonnees()
  const [titre, setTitre] = useState('')
  const [date, setDate] = useState('')
  const [heure, setHeure] = useState('')
  const [lieu, setLieu] = useState('')

  const today = aujourdhui()
  const aVenir = rdvs.filter((r) => diffJours(depuisISO(r.date), today) >= 0)
  const passes = rdvs.filter((r) => diffJours(depuisISO(r.date), today) < 0).reverse()

  const enregistrer = () => {
    if (!titre || !date) return
    ajouterRdv({ titre, date, heure, lieu })
    setTitre('')
    setDate('')
    setHeure('')
    setLieu('')
  }

  return (
    <>
      <Carte>
        <Champ label="Rendez-vous">
          <input
            className={classesInput}
            placeholder="Échographie, sage-femme…"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </Champ>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Champ label="Date">
            <input
              type="date"
              className={classesInput}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Champ>
          <Champ label="Heure">
            <input
              type="time"
              className={classesInput}
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
            />
          </Champ>
        </div>
        <div className="mt-3">
          <Champ label="Lieu">
            <input
              className={classesInput}
              placeholder="Cabinet, maternité…"
              value={lieu}
              onChange={(e) => setLieu(e.target.value)}
            />
          </Champ>
        </div>
        <Bouton className="mt-4 w-full" disabled={!titre || !date} onClick={enregistrer}>
          Ajouter
        </Bouton>
      </Carte>

      <TitreSection>À venir</TitreSection>
      {aVenir.length === 0 ? (
        <Vide>Aucun rendez-vous à venir.</Vide>
      ) : (
        <div className="space-y-2">
          {aVenir.map((r) => {
            const jours = diffJours(depuisISO(r.date), today)
            return (
              <Carte key={r.id}>
                <div className="flex items-start gap-3">
                  <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-xl bg-rose-soft text-rose-deep">
                    <span className="font-display text-lg leading-none">
                      {depuisISO(r.date).getDate()}
                    </span>
                    <span className="text-[10px] uppercase">
                      {moisCourt(depuisISO(r.date))}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-medium text-ink">{r.titre}</p>
                    <p className="mt-0.5 text-[13px] text-muted">
                      {jours === 0 ? "Aujourd’hui" : jours === 1 ? 'Demain' : `Dans ${jours} jours`}
                      {r.heure && ` · ${r.heure}`}
                      {r.lieu && ` · ${r.lieu}`}
                    </p>
                  </div>
                  <button
                    onClick={() => supprimerRdv(r.id)}
                    aria-label="Supprimer"
                    className="text-muted transition hover:text-clay-deep"
                  >
                    <Icone nom="poubelle" className="size-4" />
                  </button>
                </div>
              </Carte>
            )
          })}
        </div>
      )}

      {passes.length > 0 && (
        <>
          <TitreSection>Passés</TitreSection>
          <div className="space-y-2">
            {passes.map((r) => (
              <Carte key={r.id} className="flex items-center gap-3 py-3 opacity-60">
                <span className="flex-1 text-sm text-ink">{r.titre}</span>
                <span className="text-[13px] text-muted">{formatCourt(depuisISO(r.date))}</span>
                <button
                  onClick={() => supprimerRdv(r.id)}
                  aria-label="Supprimer"
                  className="text-muted transition hover:text-clay-deep"
                >
                  <Icone nom="poubelle" className="size-4" />
                </button>
              </Carte>
            ))}
          </div>
        </>
      )}
    </>
  )
}

const QUESTIONS_SUGGEREES = [
  'Est-ce que je peux continuer le sport que je pratique ?',
  'Mon taux de fer est-il suffisant ?',
  'Comment se passe l’arrivée à la maternité ?',
  'Puis-je faire un peau à peau immédiatement ?',
  'Qui peut être présent pendant l’accouchement ?',
  'Que se passe-t-il si le bébé se présente en siège ?',
]

function VueQuestions() {
  const { questions, ajouterQuestion, basculerQuestion, supprimerQuestion } = useDonnees()
  const [texte, setTexte] = useState('')

  const dejaPosees = useMemo(() => new Set(questions.map((q) => q.texte)), [questions])

  return (
    <>
      <p className="text-sm leading-relaxed text-muted">
        On oublie toujours la moitié de ses questions une fois dans le cabinet. Note-les ici au fur
        et à mesure, et sors ton téléphone au bon moment.
      </p>

      <Carte className="mt-4">
        <div className="flex gap-2">
          <input
            className={classesInput}
            placeholder="Ta question…"
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && texte.trim()) {
                ajouterQuestion(texte.trim())
                setTexte('')
              }
            }}
          />
          <Bouton
            disabled={!texte.trim()}
            onClick={() => {
              ajouterQuestion(texte.trim())
              setTexte('')
            }}
          >
            <Icone nom="plus" className="size-4" />
          </Bouton>
        </div>
      </Carte>

      {questions.length > 0 && (
        <>
          <TitreSection>Ma liste</TitreSection>
          <div className="space-y-2">
            {questions.map((q) => (
              <Carte key={q.id} className="flex items-start gap-3 py-3">
                <button
                  onClick={() => basculerQuestion(q.id)}
                  aria-label="Marquer comme posée"
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition ${
                    q.repondu ? 'border-sage-deep bg-sage-deep text-white' : 'border-line bg-white'
                  }`}
                >
                  {q.repondu && <Icone nom="check" className="size-3" />}
                </button>
                <span
                  className={`flex-1 text-sm leading-relaxed ${q.repondu ? 'text-muted line-through' : 'text-ink'}`}
                >
                  {q.texte}
                </span>
                <button
                  onClick={() => supprimerQuestion(q.id)}
                  aria-label="Supprimer"
                  className="text-muted transition hover:text-clay-deep"
                >
                  <Icone nom="poubelle" className="size-4" />
                </button>
              </Carte>
            ))}
          </div>
        </>
      )}

      <TitreSection>Idées de questions</TitreSection>
      <div className="space-y-2">
        {QUESTIONS_SUGGEREES.filter((q) => !dejaPosees.has(q)).map((q) => (
          <button key={q} onClick={() => ajouterQuestion(q)} className="block w-full text-left">
            <Carte className="flex items-center gap-3 py-3 transition active:scale-[0.99]">
              <span className="flex-1 text-sm leading-relaxed text-muted">{q}</span>
              <Icone nom="plus" className="size-4 shrink-0 text-rose-deep" />
            </Carte>
          </button>
        ))}
      </div>
    </>
  )
}

function VueListes() {
  const { coches, basculerCoche, grossesse } = useDonnees()
  const [active, setActive] = useState(CHECKLISTS[0].id)
  const liste = CHECKLISTS.find((l) => l.id === active)!
  const faits = liste.items.filter((i) => coches[i.id]).length

  return (
    <>
      <div className="no-scrollbar -mx-5 mb-4 flex gap-2 overflow-x-auto px-5">
        {CHECKLISTS.map((l) => {
          const total = l.items.length
          const ok = l.items.filter((i) => coches[i.id]).length
          return (
            <button
              key={l.id}
              onClick={() => setActive(l.id)}
              className={`shrink-0 rounded-2xl border px-4 py-3 text-left transition ${
                active === l.id ? 'border-rose-deep bg-rose-soft' : 'border-line bg-white'
              }`}
            >
              <span className="block text-lg">{l.emoji}</span>
              <span className="mt-1 block text-[13px] font-medium text-ink">{l.titre}</span>
              <span className="text-[11px] text-muted">
                {ok}/{total}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted">{liste.sousTitre}</p>
        <Puce ton={faits === liste.items.length ? 'sage' : 'neutre'}>
          {faits}/{liste.items.length}
        </Puce>
      </div>

      {grossesse && liste.id === 'valise-maman' && grossesse.sa >= 32 && faits < liste.items.length && (
        <Carte className="mb-3 bg-amber-soft/60">
          <p className="text-sm leading-relaxed text-amber-deep">
            Tu es à {grossesse.sa} SA : c’est le bon moment pour boucler la valise.
          </p>
        </Carte>
      )}

      <div className="space-y-2">
        {liste.items.map((item) => {
          const fait = !!coches[item.id]
          return (
            <button key={item.id} onClick={() => basculerCoche(item.id)} className="block w-full text-left">
              <Carte className={`flex items-start gap-3 py-3 transition ${fait ? 'opacity-60' : ''}`}>
                <span
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition ${
                    fait ? 'border-sage-deep bg-sage-deep text-white' : 'border-line bg-white'
                  }`}
                >
                  {fait && <Icone nom="check" className="size-3" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm text-ink ${fait ? 'line-through' : ''}`}>
                    {item.label}
                  </span>
                  {item.note && <span className="mt-0.5 block text-[12px] text-muted">{item.note}</span>}
                </span>
              </Carte>
            </button>
          )
        })}
      </div>
    </>
  )
}

function VuePrenoms() {
  const { prenoms, ajouterPrenom, basculerPrenom, supprimerPrenom } = useDonnees()
  const [nom, setNom] = useState('')
  const [sexe, setSexe] = useState<Prenom['sexe']>('mixte')

  const tries = useMemo(
    () => [...prenoms].sort((a, b) => Number(b.favori) - Number(a.favori) || a.nom.localeCompare(b.nom)),
    [prenoms],
  )

  return (
    <>
      <p className="text-sm leading-relaxed text-muted">
        Une liste à deux, à remplir au fil des idées. Le cœur marque les favoris.
      </p>

      <Carte className="mt-4">
        <div className="flex gap-2">
          <input
            className={classesInput}
            placeholder="Un prénom…"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && nom.trim()) {
                ajouterPrenom(nom.trim(), sexe)
                setNom('')
              }
            }}
          />
          <Bouton
            disabled={!nom.trim()}
            onClick={() => {
              ajouterPrenom(nom.trim(), sexe)
              setNom('')
            }}
          >
            <Icone nom="plus" className="size-4" />
          </Bouton>
        </div>
        <div className="mt-3 flex gap-2">
          {(['fille', 'garcon', 'mixte'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSexe(s)}
              className={`flex-1 rounded-full py-2 text-[13px] transition ${
                sexe === s ? 'bg-ink text-white' : 'border border-line bg-white text-muted'
              }`}
            >
              {s === 'fille' ? 'Fille' : s === 'garcon' ? 'Garçon' : 'Mixte'}
            </button>
          ))}
        </div>
      </Carte>

      {tries.length === 0 ? (
        <div className="mt-4">
          <Vide>La liste est vide. Le premier prénom est souvent le plus difficile à écrire.</Vide>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {tries.map((p) => (
            <Carte key={p.id} className="flex items-center gap-3 py-3">
              <button
                onClick={() => basculerPrenom(p.id)}
                aria-label="Favori"
                className={p.favori ? 'text-rose-deep' : 'text-line'}
              >
                <Icone nom="coeur" className="size-5" rempli={p.favori} />
              </button>
              <span className="flex-1 font-display text-lg text-ink">{p.nom}</span>
              <Puce ton={p.sexe === 'fille' ? 'rose' : p.sexe === 'garcon' ? 'sky' : 'neutre'}>
                {p.sexe === 'fille' ? 'Fille' : p.sexe === 'garcon' ? 'Garçon' : 'Mixte'}
              </Puce>
              <button
                onClick={() => supprimerPrenom(p.id)}
                aria-label="Supprimer"
                className="text-muted transition hover:text-clay-deep"
              >
                <Icone nom="poubelle" className="size-4" />
              </button>
            </Carte>
          ))}
        </div>
      )}
    </>
  )
}

function VueUrgences() {
  const { grossesse } = useDonnees()
  return (
    <>
      <Carte className="border-clay-soft bg-clay-soft/60">
        <p className="text-sm leading-relaxed text-clay-deep">
          En cas de doute, on appelle. La maternité est ouverte 24 h/24 et personne ne trouvera
          jamais que tu déranges. En urgence vitale : <strong>15</strong> (Samu) ou{' '}
          <strong>112</strong>.
        </p>
      </Carte>

      <TitreSection>Les signes qui doivent alerter</TitreSection>
      <div className="space-y-2">
        {SIGNES_ALERTE.map((s) => (
          <Carte key={s.titre}>
            <p className="text-[15px] font-medium text-ink">{s.titre}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{s.texte}</p>
          </Carte>
        ))}
      </div>

      {grossesse && grossesse.sa >= 34 && (
        <>
          <TitreSection>Est-ce le moment de partir ?</TitreSection>
          <Carte>
            <ul className="space-y-3 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-deep" />
                <span>
                  <strong>Contractions</strong> toutes les 5 minutes, durant 1 minute, depuis 1 heure.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-deep" />
                <span>
                  <strong>Poche des eaux rompue</strong>, même sans aucune contraction.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-deep" />
                <span>
                  <strong>Saignement</strong> rouge vif, quel qu’en soit le volume.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-deep" />
                <span>
                  <strong>Le bébé bouge moins</strong> que d’habitude.
                </span>
              </li>
            </ul>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              Tu es au {ordinal(moisDeGrossesse(grossesse.sa))} mois. La valise et les papiers
              doivent être prêts et accessibles.
            </p>
          </Carte>
        </>
      )}

      <TitreSection>Numéros à garder</TitreSection>
      <Carte>
        <p className="text-sm leading-relaxed text-muted">
          Note ici les numéros de ta maternité et de ta sage-femme sur un papier collé au frigo, et
          enregistre-les dans tes contacts sous « Maternité » — pour que n’importe qui puisse les
          trouver à ta place.
        </p>
      </Carte>
    </>
  )
}
