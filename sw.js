self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("static").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./message.html",
        "./style-message.css",
        "./script.js",
        "./script-message.js",
        "./manifest.json",
        "./assets/bg.png",
        "./assets/icon-192.png",
        "./assets/icon-512.png",
        "./assests/icon-apple-touch.png",
        "./assets/story1.jpeg",
        "./assets/story2.jpeg",
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});