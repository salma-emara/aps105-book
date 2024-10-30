const CACHE_NAME = 'model-cache-v1';
const MODEL_FILES = [
  'https://cdn.jsdelivr.net/npm/@xenova/transformers@3.0.0/dist/transformers.min.js',
  // 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.js',
  // Add any other model files needed for caching here
];

/**
 * Install event: Cache only the model files.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching model files...');
      return cache.addAll(MODEL_FILES);
    })
  );
});

/**
 * Fetch event: Serve cached model files, skip caching for other requests.
 */
self.addEventListener('fetch', (event) => {
  if (MODEL_FILES.includes(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
  // Allow all other requests to bypass the cache and fetch directly
});
