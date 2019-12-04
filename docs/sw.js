var CACHE_DYNAMIC_VERSION = 'dynamic-v1';

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching something ...');
  event.respondWith(
    // キャッシュの存在チェック
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          // キャッシュがなければリクエストを投げて、レスポンスをキャッシュに入れる
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_VERSION)
                .then(function(cache) {
                  // 最後に res を返せるように、ここでは clone() する必要がある
                  console.log("sasda");
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function() {
              // エラーが発生しても何もしない
            });
        }
      })
  );
});

// キャッシュファイルの指定
// var CACHE_NAME = 'pwa-sample-caches';
// var urlsToCache = [
//     'cheesestick24.github.io/DAW-Research/',
// ];

// // インストール処理
// self.addEventListener('install', function(event) {
//     event.waitUntil(
//         caches
//             .open(CACHE_NAME)
//             .then(function(cache) {
//                 return cache.addAll(urlsToCache);
//             })
//     );
// });

// // リソースフェッチ時のキャッシュロード処理
// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches
//             .match(event.request)
//             .then(function(response) {
//                 return response ? response : fetch(event.request);
//             })
//     );
// });