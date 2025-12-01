if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js", { scope: "./" })
      .then((registration) => {
        let serviceWorker;

        if (registration.installing) {
          serviceWorker = registration.installing;
        } else if (registration.waiting) {
          serviceWorker = registration.waiting;
        } else if (registration.active) {
          serviceWorker = registration.active;
        }

        if (serviceWorker) {
          serviceWorker.addEventListener("statechange", (e) => {
            console.log("SW state changed to:", e.target.state);
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao registrar o Service Worker:", error);
      });
} else {
  alert("Este navegador não suporta Service Worker.");
}

const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "/PWA-FINAL/index.html",
    "/PWA-FINAL/atv-display.pedrovigar.html",
    "/PWA-FINAL/manifest.json",
    "/PWA-FINAL/logo.png",
    "/PWA-FINAL/drgbranco.png",
    "/PWA-FINAL/kuriboh.jpeg",
    "/PWA-FINAL/calibregado.jpg",
    "/PWA-FINAL/neos.webp",
    "/PWA-FINAL/mago-negro.jpeg",
    "/PWA-FINAL/index.js",
    "/PWA-FINAL/style.css",
    "/PWA-FINAL/ic_launcher.png"
];

// Instalando o Service Worker com tratamento de erro para cada arquivo
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log("Opened cache");
            for (const url of urlsToCache) {
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        await cache.put(url, response.clone());
                    } else {
                        console.warn("Não foi possível cachear:", url);
                    }
                } catch (err) {
                    console.warn("Erro ao cachear:", url, err);
                }
            }
        })
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});



