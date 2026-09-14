const CACHE_NAME='toki-store-shell-v1';
const APP_SHELL=['./','./Toki_Store_v2_2_updated.html','./manifest.webmanifest','./assets/toki-app-icon-192.png','./assets/toki-app-icon-512.png','./assets/51talk-logo.png','./assets/toki-mascot.png'];

self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const request=event.request;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put('./Toki_Store_v2_2_updated.html',copy));return response;}).catch(()=>caches.match('./Toki_Store_v2_2_updated.html')));
    return;
  }
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(new URL(request.url).origin===self.location.origin){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));}return response;})));
});
