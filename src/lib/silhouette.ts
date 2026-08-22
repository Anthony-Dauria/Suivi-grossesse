/**
 * Géométrie de la silhouette du bébé.
 *
 * Le dessin est entièrement paramétrique : chaque semaine interpole entre des
 * repères morphologiques, ce qui donne une évolution continue plutôt qu'une
 * poignée d'images figées. Repère de dessin : 240 × 260, bébé recroquevillé,
 * tourné vers la gauche, tête en haut à droite.
 */

export type Morphologie = {
  /** Rayon de la tête */
  tete: number
  /** Épaisseur du torse */
  torse: number
  /** 0 = bourgeons, 1 = membres complets et repliés */
  membres: number
  /** Bourgeon caudal de l'embryon, disparaît vers 12 SA */
  queue: number
  /** 0 = simple tache oculaire, 1 = traits du visage dessinés */
  visage: number
  cheveux: number
  /** Taille du dessin dans son cadre */
  echelle: number
}

const REPERES: [number, Morphologie][] = [
  [6, { tete: 30, torse: 28, membres: 0.08, queue: 0.95, visage: 0.05, cheveux: 0, echelle: 0.5 }],
  [8, { tete: 36, torse: 32, membres: 0.34, queue: 0.6, visage: 0.16, cheveux: 0, echelle: 0.58 }],
  [10, { tete: 40, torse: 34, membres: 0.58, queue: 0.22, visage: 0.32, cheveux: 0, echelle: 0.64 }],
  [13, { tete: 42, torse: 37, membres: 0.76, queue: 0, visage: 0.55, cheveux: 0, echelle: 0.71 }],
  [17, { tete: 42, torse: 41, membres: 0.87, queue: 0, visage: 0.74, cheveux: 0, echelle: 0.78 }],
  [22, { tete: 41, torse: 45, membres: 0.94, queue: 0, visage: 0.9, cheveux: 0.2, echelle: 0.85 }],
  [28, { tete: 40, torse: 49, membres: 1, queue: 0, visage: 1, cheveux: 0.5, echelle: 0.91 }],
  [34, { tete: 39, torse: 53, membres: 1, queue: 0, visage: 1, cheveux: 0.8, echelle: 0.96 }],
  [41, { tete: 38, torse: 56, membres: 1, queue: 0, visage: 1, cheveux: 1, echelle: 1 }],
]

const melange = (a: number, b: number, t: number) => a + (b - a) * t

type Point = { x: number; y: number }
const pt = (a: Point, b: Point, t: number): Point => ({
  x: melange(a.x, b.x, t),
  y: melange(a.y, b.y, t),
})

export function morphologie(sa: number): Morphologie {
  const borne = Math.min(41, Math.max(6, sa))
  let bas = REPERES[0]
  let haut = REPERES[REPERES.length - 1]
  for (let i = 0; i < REPERES.length - 1; i++) {
    if (borne >= REPERES[i][0] && borne <= REPERES[i + 1][0]) {
      bas = REPERES[i]
      haut = REPERES[i + 1]
      break
    }
  }
  const t = haut[0] === bas[0] ? 0 : (borne - bas[0]) / (haut[0] - bas[0])
  const cles = Object.keys(bas[1]) as (keyof Morphologie)[]
  const sortie = {} as Morphologie
  for (const cle of cles) sortie[cle] = melange(bas[1][cle], haut[1][cle], t)
  return sortie
}

export type Segment = { d: string; largeur: number }

export type Trace = {
  m: Morphologie
  tete: { x: number; y: number; r: number }
  torse: Segment
  bras: Segment[]
  main: { x: number; y: number; r: number }
  jambe: Segment[]
  pied: { x: number; y: number; rx: number; ry: number; angle: number }
  queue: Segment | null
  oeil: { x: number; y: number; r: number }
  paupiere: string
  sourcil: string
  nez: string
  bouche: string
  oreille: string
  joue: { x: number; y: number; r: number }
  cheveux: string[]
  cordon: string
}

const P = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`
const courbe = (a: Point, c1: Point, c2: Point, b: Point) =>
  `M ${P(a.x, a.y)} C ${P(c1.x, c1.y)} ${P(c2.x, c2.y)} ${P(b.x, b.y)}`

export function tracer(sa: number): Trace {
  const m = morphologie(sa)
  const cx = 152
  const cy = 82
  const R = m.tete
  const mb = m.membres

  const epauleY = cy + R * 0.74
  // Bas du dos : le torse s'allonge et s'épaissit avec les semaines.
  const fesses: Point = { x: 112, y: 168 + m.torse * 0.34 }

  const torse: Segment = {
    d: courbe(
      { x: cx - 6, y: epauleY },
      { x: cx - 18, y: epauleY + 34 },
      { x: fesses.x + 16, y: fesses.y - 40 },
      fesses,
    ),
    largeur: m.torse,
  }

  // Bras replié, dessiné par-dessus le torse : épaule → coude sorti vers
  // l'avant, puis avant-bras remontant vers une main posée près du menton.
  const epaule: Point = { x: cx - 14, y: epauleY + 4 }
  const coude = pt({ x: epaule.x - 7, y: epaule.y + 11 }, { x: 92, y: epauleY + 44 }, mb)
  const main = pt({ x: epaule.x - 9, y: epaule.y + 16 }, { x: 120, y: epauleY + 16 }, mb)
  const bras: Segment[] = [
    {
      d: courbe(
        epaule,
        { x: epaule.x - 16, y: epaule.y + 10 },
        { x: coude.x - 4, y: coude.y - 14 },
        coude,
      ),
      largeur: 7 + 7 * mb,
    },
    {
      d: courbe(coude, { x: coude.x + 10, y: coude.y + 2 }, { x: main.x - 14, y: main.y + 14 }, main),
      largeur: 6 + 5 * mb,
    },
  ]

  // Jambe repliée sous le corps, genou en avant et pied ramené dessous.
  const genou = pt({ x: fesses.x - 9, y: fesses.y + 7 }, { x: 80, y: fesses.y + 16 }, mb)
  const pied = pt({ x: fesses.x - 13, y: fesses.y + 5 }, { x: 126, y: fesses.y + 19 }, mb)
  const jambe: Segment[] = [
    {
      d: courbe(
        { x: fesses.x + 4, y: fesses.y - 10 },
        { x: fesses.x - 12, y: fesses.y + 6 },
        { x: genou.x - 2, y: genou.y - 14 },
        genou,
      ),
      largeur: 11 + 13 * mb,
    },
    {
      d: courbe(genou, { x: genou.x + 10, y: genou.y + 18 }, { x: pied.x - 28, y: pied.y + 10 }, pied),
      largeur: 9 + 8 * mb,
    },
  ]

  const queue =
    m.queue > 0.02
      ? {
          d: courbe(
            { x: fesses.x + 6, y: fesses.y - 4 },
            { x: fesses.x + 2, y: fesses.y + 20 },
            { x: fesses.x + 26, y: fesses.y + 26 },
            { x: fesses.x + 34, y: fesses.y + 10 },
          ),
          largeur: m.torse * 0.38 * m.queue,
        }
      : null

  // Visage, tourné vers la gauche.
  const oeilX = cx - R * 0.54
  const oeilY = cy - R * 0.02
  const oeil = { x: oeilX, y: oeilY, r: melange(R * 0.2, R * 0.09, m.visage) }
  const paupiere = `M ${P(oeilX - R * 0.21, oeilY)} Q ${P(oeilX, oeilY + R * 0.17)} ${P(oeilX + R * 0.21, oeilY)}`
  const sourcil = `M ${P(oeilX - R * 0.2, oeilY - R * 0.19)} Q ${P(oeilX, oeilY - R * 0.27)} ${P(oeilX + R * 0.18, oeilY - R * 0.2)}`
  const nez = `M ${P(cx - R * 0.94, oeilY + R * 0.24)} q ${(-R * 0.11).toFixed(1)},${(R * 0.15).toFixed(1)} ${(R * 0.07).toFixed(1)},${(R * 0.21).toFixed(1)}`
  const bouche = `M ${P(cx - R * 0.8, oeilY + R * 0.58)} q ${(R * 0.13).toFixed(1)},${(R * 0.11).toFixed(1)} ${(R * 0.27).toFixed(1)},${(-R * 0.02).toFixed(1)}`
  const oreille = `M ${P(cx + R * 0.32, oeilY + R * 0.08)} a ${(R * 0.18).toFixed(1)},${(R * 0.23).toFixed(1)} 0 1 1 ${(R * 0.02).toFixed(1)},${(R * 0.44).toFixed(1)}`
  const joue = { x: cx - R * 0.5, y: oeilY + R * 0.5, r: R * 0.17 }

  // Mèches courtes plaquées sur le sommet du crâne.
  const cheveux = [-0.95, -0.62, -0.3, 0.02].map((a) => {
    const angle = -Math.PI / 2 + a
    const base = { x: cx + Math.cos(angle) * R * 0.97, y: cy + Math.sin(angle) * R * 0.97 }
    const l = R * 0.12 * m.cheveux
    const bout = {
      x: cx + Math.cos(angle - 0.22) * (R * 0.97 + l),
      y: cy + Math.sin(angle - 0.22) * (R * 0.97 + l),
    }
    return `M ${P(base.x, base.y)} Q ${P(base.x + Math.cos(angle) * l, base.y + Math.sin(angle) * l)} ${P(bout.x, bout.y)}`
  })

  // Cordon ombilical : part du ventre et sort par la droite du cadre.
  const cordon = courbe(
    { x: fesses.x + 30, y: fesses.y - 44 },
    { x: fesses.x + 76, y: fesses.y - 30 },
    { x: 206, y: fesses.y - 40 },
    { x: 234, y: fesses.y - 84 },
  )

  return {
    m,
    tete: { x: cx, y: cy, r: R },
    torse,
    bras,
    main: { x: main.x, y: main.y, r: 3.5 + 4 * mb },
    jambe,
    pied: { x: pied.x, y: pied.y, rx: 6 + 6 * mb, ry: 4.5 + 3.5 * mb, angle: 12 },
    queue,
    oeil,
    paupiere,
    sourcil,
    nez,
    bouche,
    oreille,
    joue,
    cheveux,
    cordon,
  }
}

/** Amas de cellules des tout premiers jours, avant que l'embryon ne se dessine. */
export function amasCellulaire(sa: number) {
  const cellules = sa <= 3 ? 8 : sa <= 4 ? 14 : 20
  const rayon = 34 + (sa - 3) * 5
  return Array.from({ length: cellules }, (_, i) => {
    const angle = i * 2.399963
    const d = Math.sqrt(i / cellules) * rayon * 0.72
    return {
      x: 120 + Math.cos(angle) * d,
      y: 130 + Math.sin(angle) * d,
      r: rayon * 0.19,
    }
  })
}
