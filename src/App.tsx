import { useEffect, useState } from 'react'
import { FournisseurDonnees } from './lib/store'
import { useDonnees } from './lib/donnees'
import { ONGLETS, TITRES, type Onglet } from './lib/navigation'
import { Icone } from './components/Icones'
import { Bienvenue } from './pages/Bienvenue'
import { Accueil } from './pages/Accueil'
import { Semaines } from './pages/Semaines'
import { Alimentation } from './pages/Alimentation'
import { Suivi } from './pages/Suivi'
import { Preparer } from './pages/Preparer'
import { Reglages } from './pages/Reglages'

function Application() {
  const { profil, grossesse } = useDonnees()
  const [onglet, setOnglet] = useState<Onglet>('accueil')
  const [sousOnglet, setSousOnglet] = useState<string | undefined>()

  const aller = (cible: Onglet, sous?: string) => {
    setOnglet(cible)
    setSousOnglet(sous)
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [onglet])

  if (!profil.configure) return <Bienvenue />

  return (
    <div className="mx-auto min-h-dvh w-full max-w-lg">
      <header className="sticky top-0 z-20 border-b border-line/70 bg-cream/90 backdrop-blur-md">
        <div className="flex items-center gap-3 px-5 py-3.5">
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-lg leading-tight text-ink">{TITRES[onglet]}</h1>
            {grossesse && onglet !== 'reglages' && (
              <p className="text-[12px] text-muted">
                {grossesse.sa} SA + {grossesse.joursDansSemaine} j
                {profil.prenomBebe ? ` · ${profil.prenomBebe}` : ''}
              </p>
            )}
          </div>
          <button
            onClick={() => aller(onglet === 'reglages' ? 'accueil' : 'reglages')}
            aria-label={onglet === 'reglages' ? 'Fermer les réglages' : 'Réglages'}
            className={`rounded-full p-2 transition ${
              onglet === 'reglages' ? 'bg-ink text-white' : 'text-muted hover:bg-white hover:text-ink'
            }`}
          >
            <Icone nom="reglages" />
          </button>
        </div>
      </header>

      <main className="px-5 pb-32 pt-5">
        {onglet === 'accueil' && <Accueil aller={aller} />}
        {onglet === 'semaines' && <Semaines />}
        {onglet === 'alimentation' && <Alimentation vueInitiale={sousOnglet} />}
        {onglet === 'suivi' && <Suivi vueInitiale={sousOnglet} />}
        {onglet === 'preparer' && <Preparer vueInitiale={sousOnglet} />}
        {onglet === 'reglages' && <Reglages />}
      </main>

      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-line/70 bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg">
          {ONGLETS.map((o) => {
            const actif = onglet === o.id
            return (
              <button
                key={o.id}
                onClick={() => aller(o.id)}
                className={`flex flex-1 flex-col items-center gap-1 py-2.5 transition ${
                  actif ? 'text-rose-deep' : 'text-muted'
                }`}
                aria-current={actif ? 'page' : undefined}
              >
                <span
                  className={`flex size-9 items-center justify-center rounded-full transition ${
                    actif ? 'bg-rose-soft' : ''
                  }`}
                >
                  <Icone nom={o.icone} />
                </span>
                <span className="text-[10.5px] font-medium">{o.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <FournisseurDonnees>
      <Application />
    </FournisseurDonnees>
  )
}
