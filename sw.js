// sw.js - Service Worker
/e/ You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests
//https://developers.google.com/web/fundamentals/primers/service-workers
let CACHE_NAME = 'journal-site-cache-v1';
let urlsToCache = [
    'https://cse110lab6.herokuapp.com/entries'
];

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        this.navigator.serviceWorker.register('./sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened Cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request)
        .then(function(response) {
            //Cache hit - return respones
            if (response) {
                return response;
            }

            return fetch(event.request).then(
                function(response) {
                    //Check if we have
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();
                    cache.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    return response;
                }
            );
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});
