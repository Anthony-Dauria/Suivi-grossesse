import { useState } from 'react'
import { Bouton, Champ, classesInput } from '../components/ui'
import { useDonnees } from '../lib/donnees'
import { calculerEtat, type ModeDate, type Profil } from '../lib/grossesse'
import { formatLong, versISO, aujourdhui } from '../lib/dates'
import { ordinal } from '../lib/texte'

const MODES: { id: ModeDate; label: string; aide: string }[] = [
  { id: 'ddr', label: 'Mes dernières règles', aide: 'Le premier jour de tes dernières règles. C’est la méthode utilisée par les sages-femmes.' },
  { id: 'dpa', label: 'Ma date d’accouchement prévue', aide: 'Si le terme t’a déjà été donné par un professionnel ou une échographie.' },
  { id: 'conception', label: 'La date de conception', aide: 'Si tu la connais précisément.' },
]

export function Bienvenue() {
  const { majProfil } = useDonnees()
  const [etape, setEtape] = useState(0)
  const [prenomMaman, setPrenomMaman] = useState('')
  const [mode, setMode] = useState<ModeDate>('ddr')
  const [dateRef, setDateRef] = useState('')
  const [poidsAvant, setPoidsAvant] = useState('')
  const [tailleCm, setTailleCm] = useState('')
  const [toxo, setToxo] = useState<Profil['toxoplasmose']>('inconnu')

  const brouillon: Profil = {
    prenomMaman,
    prenomBebe: '',
    mode,
    dateRef,
    poidsAvant: poidsAvant ? Number(poidsAvant) : null,
    tailleCm: tailleCm ? Number(tailleCm) : null,
    toxoplasmose: toxo,
    configure: true,
  }
  const apercu = dateRef ? calculerEtat(brouillon) : null
  const dateValide = !!apercu && !apercu.pasEncore && apercu.joursEcoules <= 300

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 py-10">
      {etape === 0 && (
        <div className="animate-rise flex flex-1 flex-col justify-center text-center">
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-rose-soft text-4xl">
            🤍
          </div>
          <h1 className="font-display text-3xl leading-tight text-ink">Ma grossesse</h1>
          <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
            Semaine après semaine, tout ce qui compte au même endroit : l’évolution du bébé, ce que
            tu peux manger, tes rendez-vous et tes petites notes.
          </p>
          <p className="mx-auto mt-6 max-w-sm rounded-2xl bg-white px-4 py-3 text-[13px] leading-relaxed text-muted">
            Tes données restent sur ton téléphone. Aucun compte, aucun envoi, aucune publicité.
          </p>
          <Bouton className="mt-8 w-full py-3.5" onClick={() => setEtape(1)}>
            Commencer
          </Bouton>
        </div>
      )}

      {etape === 1 && (
        <div className="animate-rise flex flex-1 flex-col justify-center">
          <h2 className="font-display text-2xl text-ink">Comment tu t’appelles ?</h2>
          <p className="mt-2 text-sm text-muted">Juste pour te dire bonjour. Tu peux aussi passer.</p>
          <input
            autoFocus
            className={`${classesInput} mt-6`}
            placeholder="Ton prénom"
            value={prenomMaman}
            onChange={(e) => setPrenomMaman(e.target.value)}
          />
          <div className="mt-8 flex gap-3">
            <Bouton variante="secondaire" onClick={() => setEtape(0)}>
              Retour
            </Bouton>
            <Bouton className="flex-1 py-3.5" onClick={() => setEtape(2)}>
              Continuer
            </Bouton>
          </div>
        </div>
      )}

      {etape === 2 && (
        <div className="animate-rise flex flex-1 flex-col justify-center">
          <h2 className="font-display text-2xl text-ink">
            {prenomMaman ? `Où en es-tu, ${prenomMaman} ?` : 'Où en es-tu ?'}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Choisis le repère que tu connais le mieux. Tu pourras le corriger à tout moment.
          </p>

          <div className="mt-5 space-y-2">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  mode === m.id ? 'border-rose bg-rose-soft' : 'border-line bg-white'
                }`}
              >
                <span className="block text-[15px] font-medium text-ink">{m.label}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-muted">{m.aide}</span>
              </button>
            ))}
          </div>

          <div className="mt-5">
            <Champ label="Date">
              <input
                type="date"
                className={classesInput}
                value={dateRef}
                max={versISO(aujourdhui())}
                onChange={(e) => setDateRef(e.target.value)}
              />
            </Champ>
          </div>

          {apercu && (
            <div
              className={`mt-4 rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                dateValide ? 'bg-sage-soft text-sage-deep' : 'bg-amber-soft text-amber-deep'
              }`}
            >
              {apercu.pasEncore ? (
                'Cette date est dans le futur — vérifie ta saisie.'
              ) : apercu.joursEcoules > 300 ? (
                'Cette date remonte à plus de 300 jours — vérifie ta saisie.'
              ) : (
                <>
                  Tu es à <strong>{apercu.sa} SA + {apercu.joursDansSemaine} j</strong>, soit le{' '}
                  {ordinal(apercu.mois)} mois. Terme prévu le <strong>{formatLong(apercu.dpa)}</strong>.
                </>
              )}
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <Bouton variante="secondaire" onClick={() => setEtape(1)}>
              Retour
            </Bouton>
            <Bouton className="flex-1 py-3.5" disabled={!dateValide} onClick={() => setEtape(3)}>
              Continuer
            </Bouton>
          </div>
        </div>
      )}

      {etape === 3 && (
        <div className="animate-rise flex flex-1 flex-col justify-center">
          <h2 className="font-display text-2xl text-ink">Deux détails utiles</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Facultatif, mais ça permet de personnaliser le suivi du poids et les conseils
            alimentaires.
          </p>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Champ label="Poids avant grossesse">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="kg"
                  className={classesInput}
                  value={poidsAvant}
                  onChange={(e) => setPoidsAvant(e.target.value)}
                />
              </Champ>
              <Champ label="Taille">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="cm"
                  className={classesInput}
                  value={tailleCm}
                  onChange={(e) => setTailleCm(e.target.value)}
                />
              </Champ>
            </div>

            <Champ
              label="Sérologie toxoplasmose"
              aide="Elle figure sur ton premier bilan sanguin. Si tu n’es pas immunisée, l’app insistera davantage sur le lavage et la cuisson."
            >
              <select
                className={classesInput}
                value={toxo}
                onChange={(e) => setToxo(e.target.value as Profil['toxoplasmose'])}
              >
                <option value="inconnu">Je ne sais pas encore</option>
                <option value="immunisee">Immunisée</option>
                <option value="non-immunisee">Non immunisée</option>
              </select>
            </Champ>
          </div>

          <div className="mt-8 flex gap-3">
            <Bouton variante="secondaire" onClick={() => setEtape(2)}>
              Retour
            </Bouton>
            <Bouton className="flex-1 py-3.5" onClick={() => majProfil(brouillon)}>
              C’est parti
            </Bouton>
          </div>
        </div>
      )}
    </div>
  )
}
