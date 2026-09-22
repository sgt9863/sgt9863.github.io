const CACHE = 'hokkaido-2026-v6';
const PLACE_IMAGES = ['airport','aoba','asari','ashibetsu','biei_hills','blue_pond','chitose','furano','furano_cheese','furano_forest','futami','hokusei','iwamizawa','jozankei','jozankei_bridge','jozankei_shrine','kanayama','nakayama','nopporo','okanokura','orgel','otaru_bank','otaru_canal','otaru_station','sakaimachi','salmon','sankai','shikotsu','shirahige','shirogane','shujitsu','shukutsu','sunagawa','tanaka','wattsu','yamasen','yotei'].map(name=>`images/places/${name}.jpg`);
const ASSETS = ['./','index.html','style.css','data.js','place-photos.js','app.js','locations.js','maps.js','vendor/leaflet/leaflet.js','vendor/leaflet/leaflet.css','sw.js','manifest.webmanifest','icon.svg','itinerary.txt','images/P03.jpg','images/P04.jpg','images/P06.jpg','images/P12.jpg',...PLACE_IMAGES];
const assetURLs = ASSETS.map(path => new URL(path, self.registration.scope).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(assetURLs)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('hokkaido-2026-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
    for (const client of await self.clients.matchAll()) client.postMessage({type:'CACHE_READY'});
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'CHECK_CACHE') event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    let present = await Promise.all(assetURLs.map(url => cache.match(url)));
    const missing = assetURLs.filter((url,index) => !present[index]);
    if (missing.length) {
      try {await cache.addAll(missing);} catch { /* Keep surviving offline assets. */ }
      present = await Promise.all(assetURLs.map(url => cache.match(url)));
    }
    event.ports[0]?.postMessage({ready:present.every(Boolean)});
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.registration.scope)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(event.request,{ignoreSearch:true});
    if (cached) return cached;
    try {return await fetch(event.request);} catch (error) {
      if (event.request.mode === 'navigate') return await cache.match(new URL('index.html', self.registration.scope).href);
      throw error;
    }
  })());
});
