/** Minuscules sans accent, pour comparer des saisies utilisateur */
export function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, ' ')
    .trim()
}

/** 1 → « 1er », 2 → « 2e » (avec l’exposant géré par l’appelant si besoin) */
export function ordinal(n: number): string {
  return n === 1 ? '1er' : `${n}e`
}
