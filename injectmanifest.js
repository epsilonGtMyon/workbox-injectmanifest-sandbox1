import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { injectManifest } from "workbox-build";

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const swDest = "docs/sw.js";
const swDestFullPath = path.resolve(dirname, swDest);

// 成果物があれば削除
if (fs.existsSync(swDestFullPath)) {
  fs.unlinkSync(swDestFullPath);
}

injectManifest({
  globDirectory: 'docs/',
  globPatterns: [
    '**/*.{css,woff2,png,svg,jpg,js,html}'
  ],
  swDest: swDest,
  swSrc:'./swSrc.js'
})
