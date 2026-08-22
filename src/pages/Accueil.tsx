import { useMemo } from 'react'
import { Anneau } from '../components/Anneau'
import { Carte, Puce, TitreSection } from '../components/ui'
import { SilhouetteBebe } from '../components/SilhouetteBebe'
import { useDonnees } from '../lib/donnees'
import { ETAPES } from '../data/suiviMedical'
import { ALIMENTS } from '../data/aliments'
import { formatLong, formatJourMois, aujourdhui, depuisISO, diffJours, nombreFr } from '../lib/dates'
import { imc, poidsAttendu } from '../lib/grossesse'
import type { Onglet } from '../lib/navigation'
import { ordinal } from '../lib/texte'

export function Accueil({ aller }: { aller: (onglet: Onglet, sousOnglet?: string) => void }) {
  const { profil, grossesse, pesees, rdvs } = useDonnees()
  const sa = grossesse?.sa ?? 0

  const prochainesEtapes = useMemo(() => ETAPES.filter((e) => e.fenetre[1] >= sa).slice(0, 3), [sa])

  const astuceDuJour = useMemo(() => {
    const jour = Math.floor(aujourdhui().getTime() / 86_400_000)
    const utiles = ALIMENTS.filter((a) => a.astuce)
    return utiles[jour % utiles.length]
  }, [])

  const prochainRdv = useMemo(() => {
    const today = aujourdhui()
    return rdvs.find((r) => diffJours(depuisISO(r.date), today) >= 0)
  }, [rdvs])

  if (!grossesse) return null
  const { joursDansSemaine, mois, trimestre, dpa, joursRestants, progression, semaine } = grossesse

  const derniere = pesees[pesees.length - 1]
  const priseDePoids =
    derniere && profil.poidsAvant ? Number((derniere.poids - profil.poidsAvant).toFixed(1)) : null
  const cible =
    profil.poidsAvant && profil.tailleCm
      ? poidsAttendu(sa, imc(profil.poidsAvant, profil.tailleCm))
      : null

  const heure = new Date().getHours()
  const salutation = heure < 5 ? 'Bonne nuit' : heure < 18 ? 'Bonjour' : 'Bonsoir'

  return (
    <div className="animate-rise">
      <p className="text-sm text-muted">
        {salutation}
        {profil.prenomMaman ? ` ${profil.prenomMaman}` : ''} 👋
      </p>

      <div className="mt-5 flex flex-col items-center">
        <Anneau progression={progression}>
          <span className="font-display text-4xl leading-none text-ink">{sa}</span>
          <span className="mt-1 text-xs font-medium tracking-wide text-muted">
            SA + {joursDansSemaine} j
          </span>
          <span className="mt-2 text-[13px] text-rose-deep">
            {ordinal(mois)} mois · T{trimestre}
          </span>
        </Anneau>

        <div className="mt-5 text-center">
          {grossesse.termeDepasse ? (
            <p className="text-[15px] font-medium text-clay-deep">
              Terme dépassé de {Math.abs(joursRestants)} jour{Math.abs(joursRestants) > 1 ? 's' : ''}
            </p>
          ) : (
            <p className="text-[15px] text-ink">
              <strong className="font-display text-xl">{joursRestants}</strong> jours avant la
              rencontre
            </p>
          )}
          <p className="mt-1 text-[13px] text-muted">Terme prévu le {formatLong(dpa)}</p>
        </div>
      </div>

      {semaine && (
        <>
          <TitreSection>Ton bébé cette semaine</TitreSection>
          <button
            onClick={() => aller('semaines')}
            aria-label={`Voir le détail de la semaine ${sa} SA`}
            className="block w-full text-left"
          >
            <Carte className="transition active:scale-[0.99]">
              <div className="flex items-center gap-3">
                <SilhouetteBebe sa={sa} className="w-24 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium leading-snug text-ink">
                    Grand comme {semaine.comparaison} {semaine.emoji}
                  </p>
                  <p className="mt-1 text-[13px] text-muted">
                    {semaine.taille} · {semaine.poids}
                  </p>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 shrink-0 text-muted"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{semaine.bebe}</p>
            </Carte>
          </button>

          <TitreSection>Les conseils de la semaine</TitreSection>
          <Carte>
            <ul className="space-y-3">
              {semaine.conseils.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-deep" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Carte>
        </>
      )}

      <TitreSection
        action={
          <button onClick={() => aller('preparer')} className="text-[13px] text-rose-deep">
            Tout voir
          </button>
        }
      >
        À venir
      </TitreSection>
      <div className="space-y-2">
        {prochainRdv && (
          <Carte className="border-rose-soft bg-rose-soft/40">
            <div className="flex items-center gap-3">
              <span className="text-xl">📅</span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium text-ink">{prochainRdv.titre}</p>
                <p className="mt-0.5 text-[13px] text-muted">
                  {formatJourMois(depuisISO(prochainRdv.date))}
                  {prochainRdv.heure && ` à ${prochainRdv.heure}`}
                  {prochainRdv.lieu && ` · ${prochainRdv.lieu}`}
                </p>
              </div>
            </div>
          </Carte>
        )}
        {prochainesEtapes.map((e) => {
          const enCours = e.fenetre[0] <= sa
          return (
            <Carte key={e.id}>
              <div className="flex items-start gap-3">
                <span className="text-xl">
                  {e.type === 'echographie'
                    ? '🩻'
                    : e.type === 'analyse'
                      ? '🩸'
                      : e.type === 'demarche'
                        ? '📄'
                        : e.type === 'preparation'
                          ? '🧘'
                          : '🩺'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium leading-snug text-ink">{e.titre}</p>
                  <p className="mt-1 text-[13px] text-muted">
                    {e.fenetre[0] === e.fenetre[1]
                      ? `À ${e.fenetre[0]} SA`
                      : `Entre ${e.fenetre[0]} et ${e.fenetre[1]} SA`}
                  </p>
                </div>
                {enCours && <Puce ton="rose">C’est le moment</Puce>}
              </div>
            </Carte>
          )
        })}
      </div>

      <TitreSection
        action={
          <button onClick={() => aller('alimentation')} className="text-[13px] text-rose-deep">
            Alimentation
          </button>
        }
      >
        Le réflexe du jour
      </TitreSection>
      <Carte className="bg-sage-soft/50">
        <p className="text-[13px] font-medium uppercase tracking-wide text-sage-deep">
          {astuceDuJour.nom}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink">{astuceDuJour.astuce}</p>
      </Carte>

      <TitreSection
        action={
          <button onClick={() => aller('suivi')} className="text-[13px] text-rose-deep">
            Mon suivi
          </button>
        }
      >
        En un coup d’œil
      </TitreSection>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => aller('suivi', 'poids')} className="text-left">
          <Carte className="h-full">
            <p className="text-[13px] text-muted">Prise de poids</p>
            <p className="mt-1 font-display text-2xl text-ink">
              {priseDePoids === null ? '—' : `${priseDePoids > 0 ? '+' : ''}${nombreFr(priseDePoids)} kg`}
            </p>
            {cible && (
              <p className="mt-1 text-[12px] text-muted">
                attendu : {nombreFr(cible[0])} à {nombreFr(cible[1])} kg
              </p>
            )}
          </Carte>
        </button>
        <button onClick={() => aller('suivi', 'mouvements')} className="text-left">
          <Carte className="h-full">
            <p className="text-[13px] text-muted">Mouvements</p>
            <p className="mt-1 font-display text-2xl text-ink">{sa >= 28 ? '👶' : '⏳'}</p>
            <p className="mt-1 text-[12px] text-muted">
              {sa >= 28 ? 'Compter les coups' : 'Utile à partir de 28 SA'}
            </p>
          </Carte>
        </button>
      </div>

      <p className="mt-8 rounded-2xl bg-white px-4 py-3 text-[12px] leading-relaxed text-muted">
        Cette application donne des repères généraux. Elle ne remplace ni ta sage-femme ni ton
        médecin — au moindre doute, c’est eux qu’il faut appeler.
      </p>
    </div>
  )
}
