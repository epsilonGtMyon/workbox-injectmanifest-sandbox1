importScripts('/libs/workbox/workbox-v6.5.4/workbox-sw.js');

// workbox-precaching に食わせるみたい
const precacheEntries = self.__WB_MANIFEST
workbox.precaching.precacheAndRoute(precacheEntries)
