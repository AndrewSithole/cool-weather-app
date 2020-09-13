self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('smash_it_drew').then(function(cache) {
            return cache.addAll([
                '/',
                '/bundle.js',
                '/styles/index.css',
                '/images/lighthouse_background.svg',
                '/images/01d.svg',
                '/images/01n.svg',
                '/images/02d.svg',
                '/images/02n.svg',
                '/images/03d.svg',
                '/images/03n.svg',
                '/images/04d.svg',
                '/images/04n.svg',
                '/images/09d.svg',
                '/images/09n.svg',
                '/images/10d.svg',
                '/images/10n.svg',
                '/images/11d.svg',
                '/images/11n.svg',
                '/images/13d.svg',
                '/images/13n.svg',
                '/images/50d.svg',
                '/images/50n.svg'
            ]);
        })
    );
});
self.addEventListener("fetch", function (event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
