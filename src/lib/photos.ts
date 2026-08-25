/**
 * Stockage local des photos de plats.
 *
 * Les images vivent dans IndexedDB et non dans localStorage : le quota y est
 * bien plus large, et une photo compressée pèse encore quelques dizaines de
 * kilo-octets. Rien ne sort de l'appareil.
 */

const BASE = 'ma-grossesse'
const MAGASIN = 'photos'

function ouvrir(): Promise<IDBDatabase> {
  return new Promise((resoudre, rejeter) => {
    const requete = indexedDB.open(BASE, 1)
    requete.onupgradeneeded = () => {
      const db = requete.result
      if (!db.objectStoreNames.contains(MAGASIN)) db.createObjectStore(MAGASIN)
    }
    requete.onsuccess = () => resoudre(requete.result)
    requete.onerror = () => rejeter(requete.error)
  })
}

async function transaction<T>(
  mode: IDBTransactionMode,
  action: (magasin: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await ouvrir()
  return new Promise((resoudre, rejeter) => {
    const tx = db.transaction(MAGASIN, mode)
    const requete = action(tx.objectStore(MAGASIN))
    requete.onsuccess = () => resoudre(requete.result)
    requete.onerror = () => rejeter(requete.error)
    tx.oncomplete = () => db.close()
  })
}

export const enregistrerPhoto = (id: string, blob: Blob) =>
  transaction('readwrite', (m) => m.put(blob, id)).then(() => undefined)

export const lirePhoto = (id: string) => transaction<Blob | undefined>('readonly', (m) => m.get(id))

export const supprimerPhoto = (id: string) =>
  transaction('readwrite', (m) => m.delete(id)).then(() => undefined)

/**
 * Réduit une photo pour qu'elle tienne en quelques dizaines de kilo-octets.
 * Les clichés d'iPhone font plusieurs mégaoctets, inutiles pour une vignette.
 */
export function compresserImage(fichier: File, maxCote = 900, qualite = 0.72): Promise<Blob> {
  return new Promise((resoudre, rejeter) => {
    const url = URL.createObjectURL(fichier)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      const facteur = Math.min(1, maxCote / Math.max(image.width, image.height))
      const toile = document.createElement('canvas')
      toile.width = Math.round(image.width * facteur)
      toile.height = Math.round(image.height * facteur)
      const ctx = toile.getContext('2d')
      if (!ctx) return rejeter(new Error('canvas indisponible'))
      ctx.drawImage(image, 0, 0, toile.width, toile.height)
      toile.toBlob(
        (blob) => (blob ? resoudre(blob) : rejeter(new Error('compression impossible'))),
        'image/jpeg',
        qualite,
      )
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      rejeter(new Error('image illisible'))
    }
    image.src = url
  })
}
