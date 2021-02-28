const localhosturlsToCache = [
    'index.html',
    '/',
  ];
  
  const netlifyurlsToCache = [
    'index.html',
    '/',
  ];
  
  const CACHE_NAME = 'war9a-VOTE-APP';
  
  const self = this;
  
  // Install SW
  self.addEventListener('install', (event) => {
    const { origin } = event.target.location;
    if (origin.includes('localhost')) {
      event.waitUntil(
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.addAll(localhosturlsToCache)),
      );
    } else {
      event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(netlifyurlsToCache)),
      );
    }
  });
  
  // Listen for requests
  self.addEventListener('fetch', (event) => {
    if (!navigator.onLine) {
      event.respondWith(
        caches.match(event.request).then((resp) => {
          if (resp) {
            return resp;
          }
        }),
      );
    }
  });
  
  self.addEventListener('fetch', (event) => {
    if (!navigator.onLine) {
      if (event.request.url === 'http://localhost:3000/static/js/main.chunk.js') {
        event.waitUntil(
          this.registration.showNotification('Internet', {
            body: 'internet not working',
          }),
        );
      }
      event.respondWith(
        caches.match(event.request).then((resp) => {
          if (resp) {
            return resp;
          }
          const requestUrl = event.request.clone();
          fetch(requestUrl);
        }),
      );
    }
  });
  
  self.addEventListener('push', (e) => {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './static/img/logo.png',
    });
  });
  
  // Activate the SW
  self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
  
    event.waitUntil(
      caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      )),
    );
  });