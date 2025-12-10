const CACHE_NAME = "pwa-cache-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.json",
  // 如果你有 CSS / JS 請加:
  // "./style.css",
  // "./app.js"
];

// Install：快取必要檔案
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate：清理舊 Cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch：有 cache 用 cache，沒有才抓網路
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
