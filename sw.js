self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('oxnova-cache').then(cache =>
      cache.addAll([
        './',
        './index.html',
        './styles.css',
        './script.js',
        './manifest.json',
        './icons/icon-192.png',
        './icons/icon-512.png'
      ])
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
