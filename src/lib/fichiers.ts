/**
 * Stockage local des fichiers : photos de plats et documents médicaux.
 *
 * Tout vit dans IndexedDB plutôt que dans localStorage — le quota y est bien
 * plus large, et un compte-rendu scanné pèse vite quelques mégaoctets. Rien ne
 * sort de l'appareil.
 */

const BASE = 'ma-grossesse'

export type Magasin = 'photos' | 'documents'
const MAGASINS: Magasin[] = ['photos', 'documents']

function ouvrir(): Promise<IDBDatabase> {
  return new Promise((resoudre, rejeter) => {
    // Version 2 : ajout du magasin « documents » à côté des photos de plats,
    // que la montée de version conserve.
    const requete = indexedDB.open(BASE, 2)
    requete.onupgradeneeded = () => {
      const db = requete.result
      for (const nom of MAGASINS) {
        if (!db.objectStoreNames.contains(nom)) db.createObjectStore(nom)
      }
    }
    requete.onsuccess = () => resoudre(requete.result)
    requete.onerror = () => rejeter(requete.error)
  })
}

async function transaction<T>(
  magasin: Magasin,
  mode: IDBTransactionMode,
  action: (m: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await ouvrir()
  return new Promise((resoudre, rejeter) => {
    const tx = db.transaction(magasin, mode)
    const requete = action(tx.objectStore(magasin))
    requete.onsuccess = () => resoudre(requete.result)
    requete.onerror = () => rejeter(requete.error)
    tx.oncomplete = () => db.close()
  })
}

export const enregistrerFichier = (magasin: Magasin, id: string, blob: Blob) =>
  transaction(magasin, 'readwrite', (m) => m.put(blob, id)).then(() => undefined)

export const lireFichier = (magasin: Magasin, id: string) =>
  transaction<Blob | undefined>(magasin, 'readonly', (m) => m.get(id))

export const supprimerFichier = (magasin: Magasin, id: string) =>
  transaction(magasin, 'readwrite', (m) => m.delete(id)).then(() => undefined)

// Raccourcis pour les photos de plats, historiquement le premier usage.
export const enregistrerPhoto = (id: string, blob: Blob) => enregistrerFichier('photos', id, blob)
export const lirePhoto = (id: string) => lireFichier('photos', id)
export const supprimerPhoto = (id: string) => supprimerFichier('photos', id)

/**
 * Réduit une image pour qu'elle reste légère. Les documents scannés gardent une
 * définition plus haute que les photos de plats : ils doivent rester lisibles.
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

/** Taille lisible : 412 ko, 2,3 Mo… */
export function formatTaille(octets: number): string {
  if (octets < 1024) return `${octets} o`
  if (octets < 1024 * 1024) return `${Math.round(octets / 1024)} ko`
  return `${(octets / (1024 * 1024)).toFixed(1).replace('.', ',')} Mo`
}
