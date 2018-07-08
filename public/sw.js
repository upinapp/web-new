/**
 * Please take a look at Workbox docs before change this file
 * https://developers.google.com/web/tools/workbox/
 *
 * @author Vladimir Fedin <vovcyan@gmail.com>
 */

/*global workbox */

workbox.skipWaiting();
workbox.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  new RegExp('^https://fonts.googleapis.com/*'),
  workbox.strategies.networkFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  }),
);

workbox.routing.registerRoute(
  new RegExp('^http://ec2-18-207-118-194.compute-1.amazonaws.com:1339/timeZones'),
  workbox.strategies.networkFirst({
    cacheName: 'timezones-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('^http://ec2-18-207-118-194.compute-1.amazonaws.com:1337/get'),
  workbox.strategies.networkFirst({
    cacheName: 'user-data-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      })
    ],
    fetchOptions: {
      credentials: 'include',
    }
  })
);

workbox.routing.registerRoute(
  new RegExp('^http://ec2-18-207-118-194.compute-1.amazonaws.com:1339/list'),
  workbox.strategies.networkFirst({
    cacheName: 'apps-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      })
    ],
    fetchOptions: {
      credentials: 'include',
    }
  })
);
