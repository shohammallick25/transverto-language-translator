const CACHE_NAME = "transverto-cache-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./languages.js",
  "./manifest.json",
  "./images/logo.png",
  "./images/sun.png",
  "./images/moon.png",
  "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js",
  "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
