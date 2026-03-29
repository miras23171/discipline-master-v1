// Basic service worker to satisfy PWA requirements
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', (event) => {
  // Pass-through for now
});
