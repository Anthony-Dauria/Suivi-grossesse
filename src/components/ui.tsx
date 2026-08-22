import type { ReactNode } from 'react'

export function Carte({
  children,
  className = '',
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`card p-4 ${className}`} {...rest}>
      {children}
    </div>
  )
}

export function TitreSection({
  children,
  action,
}: {
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="mb-3 mt-6 flex items-end justify-between gap-3 first:mt-0">
      <h2 className="font-display text-lg leading-tight text-ink">{children}</h2>
      {action}
    </div>
  )
}

const TONS = {
  rose: 'bg-rose-soft text-rose-deep',
  sage: 'bg-sage-soft text-sage-deep',
  amber: 'bg-amber-soft text-amber-deep',
  clay: 'bg-clay-soft text-clay-deep',
  sky: 'bg-sky-soft text-sky-deep',
  neutre: 'bg-cream text-muted',
} as const

export type Ton = keyof typeof TONS

export function Puce({ ton = 'neutre', children }: { ton?: Ton; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${TONS[ton]}`}
    >
      {children}
    </span>
  )
}

export function Bouton({
  children,
  variante = 'principal',
  className = '',
  ...rest
}: {
  children: ReactNode
  variante?: 'principal' | 'secondaire' | 'discret' | 'danger'
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = {
    principal: 'bg-rose-deep text-white hover:bg-rose active:scale-[0.98]',
    secondaire: 'bg-white text-ink border border-line hover:bg-cream active:scale-[0.98]',
    discret: 'text-muted hover:text-ink',
    danger: 'bg-clay-soft text-clay-deep hover:bg-clay-deep hover:text-white',
  }[variante]
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${styles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Champ({
  label,
  aide,
  children,
}: {
  label: string
  aide?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {aide && <span className="mt-1 block text-xs leading-relaxed text-muted">{aide}</span>}
    </label>
  )
}

export const classesInput =
  'w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] outline-none transition focus:border-rose focus:ring-2 focus:ring-rose-soft'

export function Onglets<T extends string>({
  valeur,
  options,
  onChange,
}: {
  valeur: T
  options: readonly { id: T; label: string }[]
  onChange: (id: T) => void
}) {
  return (
    <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition ${
            valeur === o.id
              ? 'bg-ink text-white'
              : 'border border-line bg-white text-muted hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Vide({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line px-4 py-8 text-center text-sm leading-relaxed text-muted">
      {children}
    </div>
  )
}

export function Depliant({
  titre,
  sous,
  ouvert,
  onToggle,
  children,
  gauche,
}: {
  titre: ReactNode
  sous?: ReactNode
  ouvert: boolean
  onToggle: () => void
  children: ReactNode
  gauche?: ReactNode
}) {
  return (
    <div className="card overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-4 text-left"
        aria-expanded={ouvert}
      >
        {gauche}
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium leading-snug text-ink">{titre}</span>
          {sous && <span className="mt-0.5 block text-[13px] leading-snug text-muted">{sous}</span>}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`size-4 shrink-0 text-muted transition-transform ${ouvert ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {ouvert && <div className="border-t border-line px-4 py-4 text-sm leading-relaxed">{children}</div>}
    </div>
  )
}
