---
title: 
description: 
date: 2024-10-30
tag: CesiumJS, Vue.js
slug: 20241030-cesiumjs-vue-render-error
draft: true
---

![cover image from Unsplash](/assets/blog/20240929-threejs-point-cloud-measurements/cover.webp)

Photo by [Karsten Winegeart](https://unsplash.com/photos/a-view-of-a-mountain-range-covered-in-clouds-YYtYappKDWo) on [Unsplash](https://unsplash.com/)

## 本記事について

Viewerをリアクティブな値にしてはいけないよという話。

## 不具合発生

結論から述べると、Viewerをrefに格納すると、Render Errorが発生する。
このエラーは、地図上にポイントレイヤーを足すと発生しやすくなる。

### 参考

[Raycaster Measurements - Three.js Tutorials](https://sbcode.net/threejs/measurements/)

## 再現例

## サンプルコード

[CesiumGS/cesium-vite-example: The minimal recommended setup for an application using Cesium with Vite.](https://github.com/CesiumGS/cesium-vite-example)

```bash
git clone https://github.com/CesiumGS/cesium-vite-example.git

cd cesium-vite-example
pnpm i
pnpm dev
```

もとのexampleが表示されることを確認。

ここにVue.jsを導入する。

```bash
pnpm add vue @vitejs/plugin-vue
```

`vite.config.js`ファイルにVueプラグインを追加する。

```js
+ import vue from '@vitejs/plugin-vue';
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const cesiumSource = "node_modules/cesium/Build/Cesium";
// This is the base url for static files that CesiumJS needs to load.
// Set to an empty string to place the files at the site's root path
const cesiumBaseUrl = "cesiumStatic";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // Define relative base path in cesium for loading assets
    // https://vitejs.dev/config/shared-options.html#define
    CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`),
  },
  plugins: [
    // Copy Cesium Assets, Widgets, and Workers to a static directory.
    // If you need to add your own static files to your project, use the `public` directory
    // and other options listed here: https://vitejs.dev/guide/assets.html#the-public-directory
    viteStaticCopy({
      targets: [
        { src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Workers`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Assets`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Widgets`, dest: cesiumBaseUrl },
      ],
    }),
+    vue(),
  ],
});
```

`src`ディレクトリに`App.vue`ファイルを新規作成する。
