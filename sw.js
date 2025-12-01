const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "/PWA-FINAL/index.html",
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

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Cache aberto e arquivos adicionados");
            return cache.addAll(urlsToCache);
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
                        console.log("Cache antigo removido:", cacheName);
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

