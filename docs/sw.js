importScripts('/libs/workbox/workbox-v6.5.4/workbox-sw.js');

// workbox-precaching に食わせるみたい
const precacheEntries = [{"revision":"4b1a5f1544e01a9934fc92acde70cc5f","url":"common/dbHolder.js"},{"revision":"2c943bdf4a0155128bf3bcc6bcbd86ca","url":"common/parameters.js"},{"revision":"8c08a756ffd8b7db77790adf592e2e66","url":"images/icon-192x192.png"},{"revision":"20770ed1e84cd93d724647a195ff5870","url":"images/icon-256x256.png"},{"revision":"334a2892afedcc49df4e1add30efcf90","url":"images/icon-384x384.png"},{"revision":"571110fe5bc9695e5f5864fe875458a8","url":"images/icon-512x512.png"},{"revision":"4052eba78d35cab6b071627c0e254973","url":"index.html"},{"revision":"a259c8d46c354b2a3be505905e603142","url":"lib/dexie/dexie.js"},{"revision":"b13495b45cc618ff99998f1aacddc632","url":"lib/dexie/dexie.min.js"},{"revision":"b9b2fbabbce5009f22f0de660db42f9e","url":"lib/materialize/css/materialize.css"},{"revision":"8ee45883803febca4895fbce6092d514","url":"lib/materialize/css/materialize.min.css"},{"revision":"659093366e85886365c14ac1728e1447","url":"lib/materialize/js/materialize.js"},{"revision":"be7cd775203bb1c9ddd88de9728d24a1","url":"lib/materialize/js/materialize.min.js"},{"revision":"936faa6487ffc1650a9150f9988e4215","url":"lib/workbox/workbox-v6.5.4/workbox-background-sync.dev.js"},{"revision":"53473f3d96e712b9a002d70a62d15fba","url":"lib/workbox/workbox-v6.5.4/workbox-background-sync.prod.js"},{"revision":"6041074b871fe4c262f5f31f1b269aa4","url":"lib/workbox/workbox-v6.5.4/workbox-broadcast-update.dev.js"},{"revision":"404608a5bdaa085c8cb4b6543f19985d","url":"lib/workbox/workbox-v6.5.4/workbox-broadcast-update.prod.js"},{"revision":"77deabe6c722c38a92fb5d39a84793dc","url":"lib/workbox/workbox-v6.5.4/workbox-cacheable-response.dev.js"},{"revision":"d1a28efd8683882980a5bc3e2d514e49","url":"lib/workbox/workbox-v6.5.4/workbox-cacheable-response.prod.js"},{"revision":"69554f9465f0f5603d01b7614f228e1a","url":"lib/workbox/workbox-v6.5.4/workbox-core.dev.js"},{"revision":"26a82243c21f9b819b3888a784f390c9","url":"lib/workbox/workbox-v6.5.4/workbox-core.prod.js"},{"revision":"9a05753529d8c36e962ee1c11bfa04dd","url":"lib/workbox/workbox-v6.5.4/workbox-expiration.dev.js"},{"revision":"c656020670208660b10b68795bb0d5b6","url":"lib/workbox/workbox-v6.5.4/workbox-expiration.prod.js"},{"revision":"2ba1f62ee20f1fb8294941546539f35d","url":"lib/workbox/workbox-v6.5.4/workbox-navigation-preload.dev.js"},{"revision":"2fd701b3662ce2b289925485a358c218","url":"lib/workbox/workbox-v6.5.4/workbox-navigation-preload.prod.js"},{"revision":"94ebc9652e6adbe96fa8e1a709e1ba20","url":"lib/workbox/workbox-v6.5.4/workbox-offline-ga.dev.js"},{"revision":"e794d9377c41c486d9b795dbe0c56a78","url":"lib/workbox/workbox-v6.5.4/workbox-offline-ga.prod.js"},{"revision":"d715c9759d526ac5356ad62ea87a0dd2","url":"lib/workbox/workbox-v6.5.4/workbox-precaching.dev.js"},{"revision":"e05249397035853935551ae71d9d6d1c","url":"lib/workbox/workbox-v6.5.4/workbox-precaching.prod.js"},{"revision":"273ec7f82d0ceb75d98c3e2c351bf038","url":"lib/workbox/workbox-v6.5.4/workbox-range-requests.dev.js"},{"revision":"21bfe07ef929cd0f6951721204ead3c0","url":"lib/workbox/workbox-v6.5.4/workbox-range-requests.prod.js"},{"revision":"d578fd8724dd553c554c952693f74ed2","url":"lib/workbox/workbox-v6.5.4/workbox-recipes.dev.js"},{"revision":"6f38b6b9fa48426ec0750ca7143dba8f","url":"lib/workbox/workbox-v6.5.4/workbox-recipes.prod.js"},{"revision":"f99c8e47f12bea7a254401e1e7f0cd1a","url":"lib/workbox/workbox-v6.5.4/workbox-routing.dev.js"},{"revision":"969a4a29f98e81c7e50faaf39b3e4d3a","url":"lib/workbox/workbox-v6.5.4/workbox-routing.prod.js"},{"revision":"e3383c60eb5187dfcfeaedee8d1674ee","url":"lib/workbox/workbox-v6.5.4/workbox-strategies.dev.js"},{"revision":"9ec33bdeb1efa35de8e64f4b14d565ca","url":"lib/workbox/workbox-v6.5.4/workbox-strategies.prod.js"},{"revision":"c0c92bd3695e961fc6b1bebbe6b681f9","url":"lib/workbox/workbox-v6.5.4/workbox-streams.dev.js"},{"revision":"ff927c6a24fe142b968b6353bf62eb00","url":"lib/workbox/workbox-v6.5.4/workbox-streams.prod.js"},{"revision":"d6e9eb44a24f1e781164287002302b0c","url":"lib/workbox/workbox-v6.5.4/workbox-sw.js"},{"revision":"3b22c2679fd5e640dda2f5ec247955a9","url":"lib/workbox/workbox-v6.5.4/workbox-window.dev.umd.js"},{"revision":"f11ac68db84b173d796c6e3eeb74ec49","url":"lib/workbox/workbox-v6.5.4/workbox-window.prod.umd.js"},{"revision":"025f745296e65e32e7a5d124180317ac","url":"pages/detail/index.html"},{"revision":"4f105a8bb7b91d3e559b06bdb3adfb6f","url":"pages/detail/script.js"},{"revision":"21cd9d0b9b07f63702891e4eac57340e","url":"pages/list/index.html"},{"revision":"71fef4b7dee875ff2a4df1c8570cbd42","url":"pages/list/script.js"},{"revision":"32ca64291085d6b6bab6aa371abf7919","url":"pages/list/style.css"}]
workbox.precaching.precacheAndRoute(precacheEntries)
