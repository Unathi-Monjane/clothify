const CACHE_NAME = 'urban-fashion-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/products.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  // add other assets, images, icons you want cached
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
