// Retire legacy caches without intercepting requests or caching private data.
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  const legacy = ['block', 'day'].join('') + '-';
  await Promise.all((await caches.keys()).filter(key => key.startsWith('bedo-') || key.startsWith(legacy)).map(key => caches.delete(key)));
  await self.clients.claim();
  await self.registration.unregister();
})()));
