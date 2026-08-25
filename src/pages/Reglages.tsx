import { useState } from 'react'
import { Bouton, Carte, Champ, TitreSection, classesInput } from '../components/ui'
import { useDonnees } from '../lib/donnees'
import { PX_PAR_CM_DEFAUT, calculerEtat, type ModeDate, type Profil } from '../lib/grossesse'
import { formatLong, nombreFr, versISO, aujourdhui } from '../lib/dates'
import { CARTE_CM } from '../components/EchelleTaille'

export function Reglages() {
  const { profil, grossesse, majProfil, toutEffacer } = useDonnees()
  const [confirme, setConfirme] = useState(false)

  const apercu = calculerEtat(profil)

  const exporter = () => {
    const donnees: Record<string, unknown> = {}
    for (const cle of Object.keys(localStorage)) {
      if (cle.startsWith('suivi-grossesse:')) {
        donnees[cle] = JSON.parse(localStorage.getItem(cle) || 'null')
      }
    }
    const blob = new Blob([JSON.stringify(donnees, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ma-grossesse-${versISO(aujourdhui())}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importer = (fichier: File) => {
    const lecteur = new FileReader()
    lecteur.onload = () => {
      try {
        const donnees = JSON.parse(String(lecteur.result)) as Record<string, unknown>
        for (const [cle, valeur] of Object.entries(donnees)) {
          if (cle.startsWith('suivi-grossesse:')) {
            localStorage.setItem(cle, JSON.stringify(valeur))
          }
        }
        window.location.reload()
      } catch {
        alert('Ce fichier ne semble pas être une sauvegarde valide.')
      }
    }
    lecteur.readAsText(fichier)
  }

  return (
    <div className="animate-rise">
      <TitreSection>Ma grossesse</TitreSection>
      <Carte className="space-y-4">
        <Champ label="Mon prénom">
          <input
            className={classesInput}
            value={profil.prenomMaman}
            onChange={(e) => majProfil({ prenomMaman: e.target.value })}
          />
        </Champ>

        <Champ label="Surnom du bébé" aide="Comment vous l’appelez en attendant.">
          <input
            className={classesInput}
            placeholder="Petit pois, Crevette…"
            value={profil.prenomBebe}
            onChange={(e) => majProfil({ prenomBebe: e.target.value })}
          />
        </Champ>

        <Champ label="Repère de calcul">
          <select
            className={classesInput}
            value={profil.mode}
            onChange={(e) => majProfil({ mode: e.target.value as ModeDate })}
          >
            <option value="ddr">Premier jour des dernières règles</option>
            <option value="dpa">Date d’accouchement prévue</option>
            <option value="conception">Date de conception</option>
          </select>
        </Champ>

        <Champ label="Date">
          <input
            type="date"
            className={classesInput}
            value={profil.dateRef}
            onChange={(e) => majProfil({ dateRef: e.target.value })}
          />
        </Champ>

        {apercu && (
          <p className="rounded-xl bg-cream px-3 py-2.5 text-[13px] leading-relaxed text-muted">
            {apercu.sa} SA + {apercu.joursDansSemaine} j · terme le {formatLong(apercu.dpa)}
          </p>
        )}
      </Carte>

      <TitreSection>Mon corps</TitreSection>
      <Carte className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Champ label="Poids avant grossesse">
            <input
              type="number"
              inputMode="decimal"
              placeholder="kg"
              className={classesInput}
              value={profil.poidsAvant ?? ''}
              onChange={(e) => majProfil({ poidsAvant: e.target.value ? Number(e.target.value) : null })}
            />
          </Champ>
          <Champ label="Taille">
            <input
              type="number"
              inputMode="numeric"
              placeholder="cm"
              className={classesInput}
              value={profil.tailleCm ?? ''}
              onChange={(e) => majProfil({ tailleCm: e.target.value ? Number(e.target.value) : null })}
            />
          </Champ>
        </div>

        <Champ
          label="Sérologie toxoplasmose"
          aide="Si tu n’es pas immunisée, les conseils insistent davantage sur la cuisson et le lavage."
        >
          <select
            className={classesInput}
            value={profil.toxoplasmose}
            onChange={(e) => majProfil({ toxoplasmose: e.target.value as Profil['toxoplasmose'] })}
          >
            <option value="inconnu">Je ne sais pas</option>
            <option value="immunisee">Immunisée</option>
            <option value="non-immunisee">Non immunisée</option>
          </select>
        </Champ>
      </Carte>

      <TitreSection>Taille réelle à l’écran</TitreSection>
      <Carte>
        <p className="text-sm leading-relaxed text-muted">
          Les fiches semaine par semaine affichent la longueur du bébé à l’échelle 1:1. Pour que la
          règle soit juste sur ton téléphone, pose une carte bancaire sur l’écran et ajuste le
          rectangle ci-dessous jusqu’à ce qu’il ait exactement la même longueur.
        </p>
        <div className="mt-4 overflow-x-auto">
          <div
            className="flex h-[3.4rem] shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-rose bg-rose-soft/50 text-[11px] uppercase tracking-wide text-rose-deep"
            style={{ width: CARTE_CM * profil.pxParCm }}
          >
            carte bancaire
          </div>
        </div>
        <input
          type="range"
          min={26}
          max={64}
          step={0.2}
          value={profil.pxParCm}
          onChange={(e) => majProfil({ pxParCm: Number(e.target.value) })}
          className="mt-4 w-full accent-rose-deep"
          aria-label="Ajuster l’échelle de l’écran"
        />
        <div className="mt-1 flex items-center justify-between text-[12px] text-muted">
          <span>{nombreFr(profil.pxParCm, 1)} points par centimètre</span>
          <button
            className="text-rose-deep"
            onClick={() => majProfil({ pxParCm: PX_PAR_CM_DEFAUT })}
          >
            Valeur par défaut
          </button>
        </div>
      </Carte>

      <TitreSection>Mes données</TitreSection>
      <Carte>
        <p className="text-sm leading-relaxed text-muted">
          Tout est enregistré uniquement sur cet appareil, dans le navigateur. Rien n’est envoyé
          nulle part. Pense à exporter une sauvegarde de temps en temps.
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-muted">
          La sauvegarde contient le suivi, les listes et les verdicts des plats, mais pas les
          photos elles-mêmes : elles restent sur cet appareil.
        </p>
        <div className="mt-4 flex gap-3">
          <Bouton variante="secondaire" className="flex-1" onClick={exporter}>
            Exporter
          </Bouton>
          <label className="flex flex-1 cursor-pointer items-center justify-center rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-cream">
            Importer
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) importer(f)
              }}
            />
          </label>
        </div>
      </Carte>

      <TitreSection>Installer l’application</TitreSection>
      <Carte>
        <p className="text-sm leading-relaxed text-muted">
          Pour l’avoir comme une vraie application, sans passer par le navigateur :
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink">
          <li>
            <strong>iPhone</strong> — bouton Partager, puis « Sur l’écran d’accueil ».
          </li>
          <li>
            <strong>Android</strong> — menu ⋮, puis « Installer l’application ».
          </li>
        </ul>
      </Carte>

      <TitreSection>À propos</TitreSection>
      <Carte>
        <p className="text-sm leading-relaxed text-muted">
          Les repères de cette application suivent les recommandations françaises courantes en
          matière de suivi de grossesse et d’alimentation (ANSES, Assurance Maladie, HAS). Ce sont
          des repères généraux : ils ne remplacent jamais l’avis de ta sage-femme, de ton médecin ou
          de ton gynécologue, qui connaissent ton dossier.
        </p>
        {grossesse && (
          <p className="mt-3 text-[13px] text-muted">
            {grossesse.sa} SA aujourd’hui · terme le {formatLong(grossesse.dpa)}
          </p>
        )}
      </Carte>

      <div className="mt-6 mb-2">
        {confirme ? (
          <Carte className="border-clay-soft bg-clay-soft/50">
            <p className="text-sm leading-relaxed text-clay-deep">
              Tout effacer supprimera définitivement le profil, les pesées, le journal, les
              checklists et les prénoms. Cette action est irréversible.
            </p>
            <div className="mt-3 flex gap-3">
              <Bouton variante="secondaire" className="flex-1" onClick={() => setConfirme(false)}>
                Annuler
              </Bouton>
              <Bouton variante="danger" className="flex-1" onClick={toutEffacer}>
                Effacer
              </Bouton>
            </div>
          </Carte>
        ) : (
          <Bouton variante="discret" className="w-full" onClick={() => setConfirme(true)}>
            Effacer toutes mes données
          </Bouton>
        )}
      </div>
    </div>
  )
}
