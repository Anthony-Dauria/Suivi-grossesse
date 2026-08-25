import { readdirSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Génère le service worker à partir du contenu réellement produit par le build.
 *
 * Le point important : le cache est nommé d'après le build, et l'installation
 * précharge le HTML *et* les fichiers qu'il référence, d'un bloc. Sans cela un
 * HTML gardé en cache peut survivre à un déploiement et réclamer des fichiers
 * horodatés qui n'existent plus sur le serveur — l'application démarre alors
 * sur un écran blanc.
 */
function serviceWorker(): Plugin {
  return {
    name: 'service-worker-genere',
    apply: 'build',
    generateBundle(_options, bundle) {
      const duBuild = Object.keys(bundle)
        .filter((f) => f !== 'index.html')
        .map((f) => `./${f}`)
      const statiques = readdirSync('public').map((f) => `./${f}`)
      // Version déduite du contenu : deux builds identiques produisent le même
      // service worker. Indispensable si le build est comparé ou versionné.
      const empreinte = duBuild.join('|')
      let somme = 0
      for (let i = 0; i < empreinte.length; i++) somme = (somme * 31 + empreinte.charCodeAt(i)) >>> 0
      const version = `v${somme.toString(36)}`
      const fichiers = ['./', ...duBuild, ...statiques]

      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: `/* Généré au build — ne pas modifier à la main. */
const CACHE = 'ma-grossesse-${version}'
const FICHIERS = ${JSON.stringify(fichiers, null, 2)}

self.addEventListener('install', (event) => {
  // Le HTML et ses fichiers entrent dans le cache ensemble : ils restent cohérents.
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FICHIERS)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cles) => Promise.all(cles.filter((c) => c !== CACHE).map((c) => caches.delete(c))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const requete = event.request
  if (requete.method !== 'GET' || new URL(requete.url).origin !== self.location.origin) return

  if (requete.mode === 'navigate') {
    // Réseau d'abord, pour recevoir la dernière version dès qu'elle existe.
    event.respondWith(
      fetch(requete)
        .then((reponse) => {
          if (!reponse.ok) throw new Error('réponse ' + reponse.status)
          return reponse
        })
        .catch(() => caches.match('./', { cacheName: CACHE }).then((r) => r ?? Response.error())),
    )
    return
  }

  event.respondWith(
    caches.match(requete).then((enCache) => {
      if (enCache) return enCache
      return fetch(requete).then((reponse) => {
        if (reponse.ok) {
          const copie = reponse.clone()
          caches.open(CACHE).then((cache) => cache.put(requete, copie))
        }
        return reponse
      })
    }),
  )
})
`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), serviceWorker()],
})
