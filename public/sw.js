/* Service worker minimaliste : l'application reste consultable hors connexion. */
const CACHE = 'ma-grossesse-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(['./', './manifest.webmanifest', './icone.svg'])),
  )
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

  // Navigation : réseau d'abord, page en cache si hors ligne.
  if (requete.mode === 'navigate') {
    event.respondWith(
      fetch(requete)
        .then((reponse) => {
          const copie = reponse.clone()
          caches.open(CACHE).then((cache) => cache.put('./', copie))
          return reponse
        })
        .catch(() => caches.match('./').then((r) => r ?? Response.error())),
    )
    return
  }

  // Ressources : cache d'abord, mise à jour en arrière-plan.
  event.respondWith(
    caches.match(requete).then((enCache) => {
      const reseau = fetch(requete)
        .then((reponse) => {
          if (reponse.ok) {
            const copie = reponse.clone()
            caches.open(CACHE).then((cache) => cache.put(requete, copie))
          }
          return reponse
        })
        .catch(() => enCache ?? Response.error())
      return enCache ?? reseau
    }),
  )
})
