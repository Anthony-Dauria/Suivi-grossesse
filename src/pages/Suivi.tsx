import { useEffect, useMemo, useRef, useState } from 'react'
import { Bouton, Carte, Champ, Onglets, Puce, TitreSection, Vide, classesInput } from '../components/ui'
import { CourbePoids } from '../components/CourbePoids'
import { CourbeHcg } from '../components/CourbeHcg'
import { Resultats } from '../components/Resultats'
import { Icone } from '../components/Icones'
import { useDonnees } from '../lib/donnees'
import { PRISE_DE_POIDS } from '../data/nutrition'
import {
  FOURCHETTES_HCG,
  NOTE_HCG,
  fourchettePourSA,
  libelleDoublement,
  tempsDeDoublement,
} from '../data/hcg'
import { aujourdhui, depuisISO, formatCourt, nombreFr, versISO } from '../lib/dates'
import { categorieIMC, imc, poidsAttendu } from '../lib/grossesse'

type Vue = 'poids' | 'hcg' | 'resultats' | 'journal' | 'mouvements' | 'contractions'

const VUES = [
  { id: 'poids' as const, label: 'Poids' },
  { id: 'hcg' as const, label: 'hCG' },
  { id: 'resultats' as const, label: 'Résultats' },
  { id: 'journal' as const, label: 'Journal' },
  { id: 'mouvements' as const, label: 'Mouvements' },
  { id: 'contractions' as const, label: 'Contractions' },
]

export function Suivi({ vueInitiale }: { vueInitiale?: string }) {
  const [vue, setVue] = useState<Vue>((vueInitiale as Vue) || 'poids')
  return (
    <div className="animate-rise">
      <Onglets valeur={vue} options={VUES} onChange={setVue} />
      {vue === 'poids' && <VuePoids />}
      {vue === 'hcg' && <VueHcg />}
      {vue === 'resultats' && <Resultats />}
      {vue === 'journal' && <VueJournal />}
      {vue === 'mouvements' && <VueMouvements />}
      {vue === 'contractions' && <VueContractions />}
    </div>
  )
}

function VuePoids() {
  const { profil, grossesse, pesees, ajouterPesee, supprimerPesee, majProfil } = useDonnees()
  const [date, setDate] = useState(versISO(aujourdhui()))
  const [poids, setPoids] = useState('')

  const valeurIMC =
    profil.poidsAvant && profil.tailleCm ? imc(profil.poidsAvant, profil.tailleCm) : null
  const derniere = pesees[pesees.length - 1]
  const prise = derniere && profil.poidsAvant ? derniere.poids - profil.poidsAvant : null
  const attendu = grossesse && valeurIMC ? poidsAttendu(grossesse.sa, valeurIMC) : null

  const jugement =
    prise != null && attendu
      ? prise < attendu[0] - 1
        ? { texte: 'Un peu en dessous du repère', ton: 'amber' as const }
        : prise > attendu[1] + 1
          ? { texte: 'Un peu au-dessus du repère', ton: 'amber' as const }
          : { texte: 'Dans la fourchette', ton: 'sage' as const }
      : null

  return (
    <>
      {!profil.poidsAvant && (
        <Carte className="mb-4 bg-rose-soft/40">
          <p className="text-sm leading-relaxed text-ink">
            Renseigne ton poids d’avant grossesse et ta taille pour afficher la fourchette
            recommandée.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <input
              type="number"
              inputMode="decimal"
              placeholder="Poids avant (kg)"
              className={classesInput}
              onChange={(e) => majProfil({ poidsAvant: e.target.value ? Number(e.target.value) : null })}
            />
            <input
              type="number"
              inputMode="numeric"
              placeholder="Taille (cm)"
              className={classesInput}
              onChange={(e) => majProfil({ tailleCm: e.target.value ? Number(e.target.value) : null })}
            />
          </div>
        </Carte>
      )}

      <div className="grid grid-cols-3 gap-3">
        <Carte className="text-center">
          <p className="text-[12px] text-muted">Actuel</p>
          <p className="mt-1 font-display text-xl text-ink">
            {derniere ? `${nombreFr(derniere.poids)} kg` : '—'}
          </p>
        </Carte>
        <Carte className="text-center">
          <p className="text-[12px] text-muted">Prise</p>
          <p className="mt-1 font-display text-xl text-ink">
            {prise == null ? '—' : `${prise > 0 ? '+' : ''}${nombreFr(prise)}`}
          </p>
        </Carte>
        <Carte className="text-center">
          <p className="text-[12px] text-muted">Repère</p>
          <p className="mt-1 font-display text-xl text-ink">
            {attendu ? `${nombreFr(attendu[0])}–${nombreFr(attendu[1])}` : '—'}
          </p>
        </Carte>
      </div>

      {jugement && (
        <div className="mt-3 flex justify-center">
          <Puce ton={jugement.ton}>{jugement.texte}</Puce>
        </div>
      )}

      {grossesse && pesees.length > 0 && (
        <Carte className="mt-4">
          <CourbePoids
            pesees={pesees}
            ddr={grossesse.ddr}
            poidsAvant={profil.poidsAvant}
            valeurIMC={valeurIMC}
          />
          <p className="mt-2 text-center text-[12px] text-muted">
            La zone verte est la fourchette de prise de poids recommandée.
          </p>
        </Carte>
      )}

      <TitreSection>Ajouter une pesée</TitreSection>
      <Carte>
        <div className="flex gap-3">
          <div className="flex-1">
            <Champ label="Date">
              <input
                type="date"
                className={classesInput}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Champ>
          </div>
          <div className="w-28">
            <Champ label="Poids">
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                placeholder="kg"
                className={classesInput}
                value={poids}
                onChange={(e) => setPoids(e.target.value)}
              />
            </Champ>
          </div>
        </div>
        <Bouton
          className="mt-3 w-full"
          disabled={!poids || !date}
          onClick={() => {
            ajouterPesee({ date, poids: Number(poids) })
            setPoids('')
          }}
        >
          Enregistrer
        </Bouton>
        <p className="mt-2 text-center text-[12px] text-muted">
          Une pesée par semaine suffit, le matin à jeun.
        </p>
      </Carte>

      {pesees.length > 0 && (
        <>
          <TitreSection>Historique</TitreSection>
          <div className="space-y-2">
            {[...pesees].reverse().map((p) => (
              <Carte key={p.id} className="flex items-center gap-3 py-3">
                <span className="flex-1 text-sm text-muted">{formatCourt(depuisISO(p.date))}</span>
                <span className="font-display text-lg text-ink">{nombreFr(p.poids)} kg</span>
                <button
                  onClick={() => supprimerPesee(p.id)}
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

      <TitreSection>Les repères</TitreSection>
      <div className="space-y-2">
        {PRISE_DE_POIDS.map((p) => {
          const actif = valeurIMC != null && categorieIMC(valeurIMC) === p.categorie
          return (
            <Carte key={p.categorie} className={actif ? 'border-rose bg-rose-soft/40' : ''}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[15px] font-medium text-ink">{p.categorie}</p>
                <p className="font-display text-base text-rose-deep">{p.recommande}</p>
              </div>
              <p className="mt-1 text-[13px] text-muted">
                {p.imc} — {p.note}
              </p>
            </Carte>
          )
        })}
      </div>
      <p className="mt-3 text-[12px] leading-relaxed text-muted">
        Ces fourchettes sont indicatives. Ce qui compte, c’est la régularité de la courbe, pas le
        chiffre exact — c’est ta sage-femme qui l’interprète.
      </p>
    </>
  )
}

function VueHcg() {
  const { grossesse, dosagesHcg, ajouterDosageHcg, supprimerDosageHcg } = useDonnees()
  const [date, setDate] = useState(versISO(aujourdhui()))
  const [valeur, setValeur] = useState('')

  const dernier = dosagesHcg[dosagesHcg.length - 1]
  const avantDernier = dosagesHcg[dosagesHcg.length - 2]

  const doublement =
    dernier && avantDernier
      ? tempsDeDoublement(
          avantDernier.valeur,
          depuisISO(avantDernier.date),
          dernier.valeur,
          depuisISO(dernier.date),
        )
      : null

  const fourchette = grossesse ? fourchettePourSA(grossesse.sa) : undefined
  const dansLaFourchette =
    dernier && fourchette
      ? dernier.valeur >= fourchette.min && dernier.valeur <= fourchette.max
      : null

  return (
    <>
      <Carte className="bg-sky-soft/50">
        <p className="text-sm leading-relaxed text-sky-deep">{NOTE_HCG}</p>
      </Carte>

      {dosagesHcg.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Carte className="text-center">
            <p className="text-[12px] text-muted">Dernier dosage</p>
            <p className="mt-1 font-display text-xl text-ink">
              {dernier.valeur.toLocaleString('fr-FR')}
            </p>
            <p className="text-[11px] text-muted">mUI/mL</p>
          </Carte>
          <Carte className="text-center">
            <p className="text-[12px] text-muted">Doublement observé</p>
            <p className="mt-1 font-display text-xl text-ink">
              {doublement ? `${Math.round(doublement)} h` : '—'}
            </p>
            <p className="text-[11px] text-muted">
              {dernier ? `attendu ${libelleDoublement(avantDernier?.valeur ?? dernier.valeur)}` : ''}
            </p>
          </Carte>
        </div>
      )}

      {dansLaFourchette !== null && fourchette && (
        <div className="mt-3 flex justify-center">
          <Puce ton={dansLaFourchette ? 'sage' : 'amber'}>
            {dansLaFourchette
              ? `Dans l’ordre de grandeur attendu à ${fourchette.libelle}`
              : `Hors de la fourchette indicative de ${fourchette.libelle}`}
          </Puce>
        </div>
      )}

      {grossesse && dosagesHcg.length > 0 && (
        <Carte className="mt-4">
          <CourbeHcg dosages={dosagesHcg} ddr={grossesse.ddr} />
          <p className="mt-2 text-center text-[12px] leading-relaxed text-muted">
            Échelle logarithmique, en semaines d’aménorrhée. La zone verte est la fourchette
            indicative pour chaque semaine.
          </p>
        </Carte>
      )}

      <TitreSection>Ajouter un dosage</TitreSection>
      <Carte>
        <div className="flex gap-3">
          <div className="flex-1">
            <Champ label="Date de la prise de sang">
              <input
                type="date"
                className={classesInput}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Champ>
          </div>
          <div className="w-32">
            <Champ label="Taux">
              <input
                type="number"
                inputMode="numeric"
                placeholder="mUI/mL"
                className={classesInput}
                value={valeur}
                onChange={(e) => setValeur(e.target.value)}
              />
            </Champ>
          </div>
        </div>
        <Bouton
          className="mt-3 w-full"
          disabled={!valeur || !date || Number(valeur) <= 0}
          onClick={() => {
            ajouterDosageHcg({ date, valeur: Number(valeur) })
            setValeur('')
          }}
        >
          Enregistrer
        </Bouton>
      </Carte>

      {dosagesHcg.length > 0 && (
        <>
          <TitreSection>Historique</TitreSection>
          <div className="space-y-2">
            {[...dosagesHcg].reverse().map((d) => (
              <Carte key={d.id} className="flex items-center gap-3 py-3">
                <span className="flex-1 text-sm text-muted">{formatCourt(depuisISO(d.date))}</span>
                <span className="font-display text-lg text-ink">
                  {d.valeur.toLocaleString('fr-FR')}
                </span>
                <span className="text-[11px] text-muted">mUI/mL</span>
                <button
                  onClick={() => supprimerDosageHcg(d.id)}
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

      <TitreSection>Les fourchettes indicatives</TitreSection>
      <div className="space-y-2">
        {FOURCHETTES_HCG.map((f) => {
          const actif = grossesse ? grossesse.sa >= f.de && grossesse.sa <= f.a : false
          return (
            <Carte key={f.libelle} className={actif ? 'border-rose bg-rose-soft/40' : ''}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[15px] font-medium text-ink">{f.libelle}</p>
                <p className="font-display text-base text-rose-deep">
                  {f.min.toLocaleString('fr-FR')} – {f.max.toLocaleString('fr-FR')}
                </p>
              </div>
            </Carte>
          )
        })}
      </div>
      <p className="mt-3 text-[12px] leading-relaxed text-muted">
        Ces bornes couvrent l’immense majorité des grossesses normales, mais un taux en dehors ne
        signifie pas qu’il y a un problème, ni l’inverse. Elles ne remplacent pas la lecture du
        laboratoire ni celle du médecin.
      </p>
    </>
  )
}

const HUMEURS = ['😞', '😕', '😐', '🙂', '😄']
const SYMPTOMES_COURANTS = [
  'Nausées',
  'Fatigue',
  'Mal de dos',
  'Brûlures d’estomac',
  'Constipation',
  'Crampes',
  'Insomnie',
  'Jambes lourdes',
  'Contractions',
  'Vertiges',
  'Maux de tête',
  'Tout va bien',
]

function VueJournal() {
  const { journal, ajouterNote, supprimerNote } = useDonnees()
  const [date, setDate] = useState(versISO(aujourdhui()))
  const [humeur, setHumeur] = useState(3)
  const [symptomes, setSymptomes] = useState<string[]>([])
  const [texte, setTexte] = useState('')

  const basculer = (s: string) =>
    setSymptomes((liste) => (liste.includes(s) ? liste.filter((x) => x !== s) : [...liste, s]))

  return (
    <>
      <Carte>
        <Champ label="Comment tu te sens aujourd’hui ?">
          <div className="mt-1 flex justify-between gap-2">
            {HUMEURS.map((h, i) => (
              <button
                key={h}
                onClick={() => setHumeur(i + 1)}
                className={`flex-1 rounded-2xl border py-3 text-2xl transition ${
                  humeur === i + 1 ? 'border-rose bg-rose-soft' : 'border-line bg-white opacity-60'
                }`}
                aria-label={`Humeur ${i + 1} sur 5`}
              >
                {h}
              </button>
            ))}
          </div>
        </Champ>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-ink">Ressenti du jour</p>
          <div className="flex flex-wrap gap-2">
            {SYMPTOMES_COURANTS.map((s) => (
              <button
                key={s}
                onClick={() => basculer(s)}
                className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                  symptomes.includes(s)
                    ? 'bg-ink text-white'
                    : 'border border-line bg-white text-muted'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Champ label="Une note pour plus tard">
            <textarea
              rows={3}
              className={`${classesInput} resize-none`}
              placeholder="Premier coup de pied, une envie bizarre, un mot du papa…"
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
            />
          </Champ>
        </div>

        <div className="mt-3 flex items-end gap-3">
          <div className="flex-1">
            <Champ label="Date">
              <input
                type="date"
                className={classesInput}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Champ>
          </div>
          <Bouton
            className="mb-0.5"
            onClick={() => {
              ajouterNote({ date, humeur, symptomes, texte: texte.trim() })
              setTexte('')
              setSymptomes([])
              setHumeur(3)
            }}
          >
            Enregistrer
          </Bouton>
        </div>
      </Carte>

      <TitreSection>Mon journal</TitreSection>
      {journal.length === 0 ? (
        <Vide>
          Rien encore. Ces notes deviendront de jolis souvenirs — et une aide précieuse pour
          répondre aux questions de la sage-femme.
        </Vide>
      ) : (
        <div className="space-y-2">
          {journal.map((n) => (
            <Carte key={n.id}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{HUMEURS[n.humeur - 1]}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-muted">{formatCourt(depuisISO(n.date))}</p>
                  {n.symptomes.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {n.symptomes.map((s) => (
                        <Puce key={s}>{s}</Puce>
                      ))}
                    </div>
                  )}
                  {n.texte && <p className="mt-2 text-sm leading-relaxed text-ink">{n.texte}</p>}
                </div>
                <button
                  onClick={() => supprimerNote(n.id)}
                  aria-label="Supprimer"
                  className="text-muted transition hover:text-clay-deep"
                >
                  <Icone nom="poubelle" className="size-4" />
                </button>
              </div>
            </Carte>
          ))}
        </div>
      )}
    </>
  )
}

function VueMouvements() {
  const { grossesse, mouvements, ajouterMouvements } = useDonnees()
  const [debut, setDebut] = useState<number | null>(null)
  const [nombre, setNombre] = useState(0)
  const [maintenant, setMaintenant] = useState(() => Date.now())

  useEffect(() => {
    if (debut === null) return
    const t = window.setInterval(() => setMaintenant(Date.now()), 1000)
    return () => window.clearInterval(t)
  }, [debut])

  const ecoule = debut ? Math.floor((maintenant - debut) / 1000) : 0
  const mm = String(Math.floor(ecoule / 60)).padStart(2, '0')
  const ss = String(ecoule % 60).padStart(2, '0')
  const termine = nombre >= 10

  const enregistrer = () => {
    if (debut === null) return
    ajouterMouvements({
      date: versISO(aujourdhui()),
      debutISO: new Date(debut).toISOString(),
      dureeMin: Math.max(1, Math.round(ecoule / 60)),
      nombre,
    })
    setDebut(null)
    setNombre(0)
  }

  return (
    <>
      {(grossesse?.sa ?? 0) < 28 && (
        <Carte className="mb-4 bg-sky-soft/60">
          <p className="text-sm leading-relaxed text-sky-deep">
            Le comptage devient vraiment utile à partir de 28 SA, quand les mouvements sont
            réguliers et prévisibles. Avant, l’absence de mouvements ne veut rien dire.
          </p>
        </Carte>
      )}

      <Carte className="text-center">
        <p className="text-sm text-muted">Compte 10 mouvements</p>
        <p className="mt-1 text-[13px] text-muted">
          Allongée sur le côté gauche, après un repas, au moment où il bouge le plus.
        </p>

        <p className="mt-5 font-display text-6xl leading-none text-rose-deep">{nombre}</p>
        <p className="mt-2 text-sm text-muted">{debut === null ? 'Prête ?' : `${mm}:${ss}`}</p>

        <button
          onClick={() => {
            if (debut === null) setDebut(Date.now())
            setNombre((n) => Math.min(10, n + 1))
          }}
          className="mx-auto mt-6 flex size-36 items-center justify-center rounded-full bg-rose-deep text-lg font-medium text-white shadow-lg transition active:scale-95"
        >
          {debut === null ? 'Démarrer' : 'Il a bougé'}
        </button>

        {termine && (
          <p className="mt-4 rounded-xl bg-sage-soft px-3 py-2.5 text-sm leading-relaxed text-sage-deep">
            10 mouvements en {mm}:{ss}. Tout va bien.
          </p>
        )}

        {debut !== null && (
          <div className="mt-4 flex gap-3">
            <Bouton
              variante="secondaire"
              className="flex-1"
              onClick={() => {
                setDebut(null)
                setNombre(0)
              }}
            >
              Annuler
            </Bouton>
            <Bouton className="flex-1" onClick={enregistrer}>
              Enregistrer
            </Bouton>
          </div>
        )}
      </Carte>

      <Carte className="mt-3 bg-clay-soft/50">
        <p className="text-sm leading-relaxed text-clay-deep">
          <strong>Quand appeler la maternité :</strong> si tu ne sens pas 10 mouvements en 2 heures,
          ou si tu remarques un net changement dans ses habitudes. Ne reste jamais dans le doute —
          personne ne te reprochera d’appeler pour rien.
        </p>
      </Carte>

      {mouvements.length > 0 && (
        <>
          <TitreSection>Dernières séances</TitreSection>
          <div className="space-y-2">
            {mouvements.slice(0, 12).map((m) => (
              <Carte key={m.id} className="flex items-center gap-3 py-3">
                <span className="flex-1 text-sm text-muted">{formatCourt(depuisISO(m.date))}</span>
                <span className="text-sm text-ink">{m.nombre} mouvements</span>
                <Puce ton={m.dureeMin <= 120 ? 'sage' : 'amber'}>{m.dureeMin} min</Puce>
              </Carte>
            ))}
          </div>
        </>
      )}
    </>
  )
}

function VueContractions() {
  const { contractions, ajouterContraction, viderContractions } = useDonnees()
  const [debut, setDebut] = useState<number | null>(null)
  const [maintenant, setMaintenant] = useState(() => Date.now())
  const dernierDebut = useRef<number | null>(null)

  useEffect(() => {
    if (debut === null) return
    const t = window.setInterval(() => setMaintenant(Date.now()), 200)
    return () => window.clearInterval(t)
  }, [debut])

  const ecoule = debut ? (maintenant - debut) / 1000 : 0

  const lignes = useMemo(() => {
    return contractions
      .map((c, i) => {
        const precedente = contractions[i - 1]
        const intervalle = precedente
          ? (new Date(c.debutISO).getTime() - new Date(precedente.debutISO).getTime()) / 1000
          : null
        return { ...c, intervalle }
      })
      .reverse()
  }, [contractions])

  const recentes = contractions.slice(-6)
  const alerte = useMemo(() => {
    if (recentes.length < 5) return false
    const intervalles: number[] = []
    for (let i = 1; i < recentes.length; i++) {
      intervalles.push(
        (new Date(recentes[i].debutISO).getTime() - new Date(recentes[i - 1].debutISO).getTime()) / 1000,
      )
    }
    const reguliers = intervalles.every((v) => v <= 5 * 60)
    const longues = recentes.every((c) => c.dureeSec >= 45)
    return reguliers && longues
  }, [recentes])

  return (
    <>
      <Carte className="text-center">
        <p className="text-sm text-muted">Chronomètre de contractions</p>
        <p className="mt-5 font-display text-5xl leading-none text-ink">
          {debut ? `${ecoule.toFixed(0)} s` : '—'}
        </p>
        <button
          onClick={() => {
            if (debut === null) {
              const t = Date.now()
              setDebut(t)
              dernierDebut.current = t
            } else {
              ajouterContraction({
                debutISO: new Date(dernierDebut.current ?? debut).toISOString(),
                dureeSec: Math.round((Date.now() - debut) / 1000),
              })
              setDebut(null)
            }
          }}
          className={`mx-auto mt-6 flex size-36 items-center justify-center rounded-full text-lg font-medium text-white shadow-lg transition active:scale-95 ${
            debut === null ? 'bg-rose-deep' : 'bg-clay-deep'
          }`}
        >
          {debut === null ? 'Ça commence' : 'C’est fini'}
        </button>
        <p className="mt-4 text-[13px] leading-relaxed text-muted">
          Appuie au début de la contraction, puis quand elle se termine.
        </p>
      </Carte>

      <Carte className={`mt-3 ${alerte ? 'bg-clay-soft' : 'bg-cream'}`}>
        <p className={`text-sm leading-relaxed ${alerte ? 'text-clay-deep' : 'text-muted'}`}>
          {alerte ? (
            <>
              <strong>Les contractions semblent régulières et longues.</strong> Appelle la maternité
              maintenant, c’est probablement le moment.
            </>
          ) : (
            <>
              <strong>La règle 5-1-1 :</strong> contractions toutes les 5 minutes, durant 1 minute,
              depuis 1 heure → direction la maternité. Avant 37 SA, appelle dès qu’elles sont
              régulières et douloureuses.
            </>
          )}
        </p>
      </Carte>

      {contractions.length > 0 ? (
        <>
          <TitreSection
            action={
              <button onClick={viderContractions} className="text-[13px] text-muted">
                Tout effacer
              </button>
            }
          >
            Cette série
          </TitreSection>
          <div className="space-y-2">
            {lignes.map((c) => {
              const d = new Date(c.debutISO)
              return (
                <Carte key={c.id} className="flex items-center gap-3 py-3 text-sm">
                  <span className="w-16 text-muted">
                    {String(d.getHours()).padStart(2, '0')}:{String(d.getMinutes()).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-ink">{c.dureeSec} s</span>
                  {c.intervalle != null && (
                    <Puce ton={c.intervalle <= 300 ? 'clay' : 'neutre'}>
                      + {Math.floor(c.intervalle / 60)} min {Math.round(c.intervalle % 60)} s
                    </Puce>
                  )}
                </Carte>
              )
            })}
          </div>
        </>
      ) : (
        <div className="mt-4">
          <Vide>
            Aucune contraction chronométrée. Les contractions de Braxton Hicks, irrégulières et
            indolores, sont normales dès le 2e trimestre.
          </Vide>
        </div>
      )}
    </>
  )
}
