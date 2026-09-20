const CACHE = 'bedo-shell-v6';
const SHELL = [
  '/', '/index.html', '/bedo-app.css', '/storage-migration.js',
  '/app-config.js', '/auth-config.js', '/bedo-auth.js', '/bedo-sync.js',
  '/bedo-app.js', '/favicon.svg', '/manifest.webmanifest', '/privacy.html', '/terms.html'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('bedo-shell-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone();
      const cacheKey = ['/privacy.html', '/terms.html'].includes(url.pathname) ? url.pathname : '/index.html';
      caches.open(CACHE).then(cache => cache.put(cacheKey, copy));
      return response;
    }).catch(() => caches.match(url.pathname).then(match => match || caches.match('/index.html'))));
    return;
  }

  event.respondWith(caches.match(request).then(cached => {
    const refresh = fetch(request).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put(request, response.clone()));
      return response;
    });
    if (cached) { event.waitUntil(refresh.catch(() => undefined)); return cached; }
    return refresh;
  }));
});
