# workbox-injectmanifest-sandbox1

workboxの[workbox-build](https://developer.chrome.com/docs/workbox/modules/workbox-build/)を使って`injectManifest` を試す

`injectManifest` はキャッシュのエントリを生成するだけなので、`workbox-precaching` で食わせる

## 環境の準備

自端末で動かすために `http-server` を入れる
```
npm install http-server --save-dev
```

`workbox-build` のインストール
```
npm install workbox-build --save-dev
```

`workbox-cli` のインストール
workbox-sw を使えるようにする。
CDNから落とすこともできるが、ローカルでホスティングしたい場合は`workbox-cli`を使ってローカルにコピーする必要がある。

```
npm install workbox-cli --save-dev
```

`copyLibraries` コマンドを使って`workbox-sw` 関連のパッケージのソースをコピー
```
npx workbox-cli copyLibraries docs/lib/workbox/
```

## `injectManifest` で動かすための準備

`Service Worker` のテンプレートを準備し
最低限以下の記述をしておく

```
importScripts('/libs/workbox/workbox-v6.5.4/workbox-sw.js');

// self.__WB_MANIFEST はinjectManifestの時にエントリに書き換えられる
const precacheEntries = self.__WB_MANIFEST
// キャッシュとルーティングを同時にする。
workbox.precaching.precacheAndRoute(precacheEntries)
```

あとは injectManifestを行うためのスクリプトを用意し、実行するだけ

実行すると `self.__WB_MANIFEST` 部分がキャッシュのエントリに置換されたものが出来上がる。
実際に使用するのはそちらのコードを使う


## demo
[デモ](https://epsilongtmyon.github.io/workbox-injectmanifest-sandbox1/)
