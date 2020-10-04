const CACHE_NAME = 'moviepwa-c12';
const urlsToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/pages/all.html',
  '/pages/action.html',
  '/pages/adventure.html',
  '/pages/comedy.html',
  '/pages/about.html',
  '/css/materialize.min.css',
  '/css/style.css',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/images/badboy.jpg',
  '/images/mulan.jpg',
  '/images/sonic.jpg',
  '/images/dolittle.jpg',
  '/maskable_icon-192x192.png',
  '/maskable_icon-512x512.png',
  '/manifest.json',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request, { cacheName: CACHE_NAME }).then((response) => {
      if (response) {
        console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
        return response;
      }

      console.log('ServiceWorker: Memnuat aset dari server: ', e.request.url);
      return fetch(e.request);
    }),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName !== CACHE_NAME) {
          console.log(`ServiceWorker: cache ${cacheName} dihapus`);
          return caches.delete(cacheName);
        }
        return cacheName;
      }),
    )),
  );
});
