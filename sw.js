self.addEventListener('install', e => {
  console.log("installing")
  e.waitUntil(
    caches.open('v1')
      .then(cache => {
        return cache.addAll([
          'css/styles.css',
          'data/restaurants.json',
          'img/1.jpg',
          'img/2.jpg',
          'img/10.jpg',
          'img/3.jpg',
          'img/4.jpg',
          'img/5.jpg',
          'img/6.jpg',
          'img/7.jpg',
          'img/8.jpg',
          'img/9.jpg',
          'js/dbhelper.js',
          'js/main.js',
          'js/restaurant_info.js',
          'index.html',
          'register.js',
          'restaurant.html',
          'sw.js',
          'manifest.json',
        ])
          .then(() => {
            return self.skipWaiting();
          })
      })
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          console.log("activating");
          if (cache !== 'v1') {
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

// self.addEventListener('fetch', e => {
//   console.log("fetching");
//   e.respondWith(
//     caches.match(e.request)
//       .then(response => {
//         if (response) {
//           return response;
//         }
//         return fetch(e.request);
//       })
//   )
// })


self.addEventListener('fetch',e=>{
  console.log("Fetching");{
    e.respondWith(
      fetch(e.request)
      .then(res=>{
        const resClone=res.clone();
        caches.open('v1')
        .then(cache=>{
          cache.put(e.request,resClone);
        })
        return res;
      })
     .catch(err=>caches.match(e.request).then(res=>res))
    )
  }
})