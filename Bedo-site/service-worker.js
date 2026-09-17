const CACHE = "bedo-v14";
const APP_SHELL = [
  "/",
  "/index.html",
  "/favicon.svg",
  "/logo-mask.svg",
  "/manifest.webmanifest",
  "/assets/index-zx5AaXri.js",
  "/assets/index-DcYDiIl0.css",
  "/bedo-sync.js",
  "/bedo-sync.css",
  "/bedo-enhancements.js",
  "/bedo-enhancements.css",
  "/bedo-auth.js",
  "/bedo-auth.css",
  "/bedo-product.js",
  "/bedo-product.css",
  "/auth-config.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== location.origin) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put("/index.html", copy));
      return response;
    }).catch(() => caches.match("/index.html")));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) {
      const cacheCopy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, cacheCopy)));
    }
    return response;
  })));
});
