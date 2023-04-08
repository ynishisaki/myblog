---
title: '【MapLibre GL JS】地図の下に三角マークがいるけどこれはなんだ'
excerpt: '三角マーク（attributionControl）を非表示にする方法を紹介する。'
coverImagePath: '/assets/blog/20230408-maplibregl-hidden-attribution-control/cover.jpg'
coverImagePhotographer: 'Vlad Sargu'
coverImageSrcUrl: 'https://unsplash.com/photos/ItphH2lGzuI'
date: '2023-04-08'
category: 'Maplibre GL JS'
---

# 本記事について

これです。

![](https://i.gyazo.com/da986b000564556eaee8ee882f468b44.png =400x)_地図の下、左端に三角がいます。_

![](https://i.gyazo.com/146d7168b3bb4aac5f035b92b9aec0e8.png =400x)_開発者ツールで選択するとこんな感じ。_

開発者ツールで選択すると、maplibregl-ctrl-attrib-button と書いてある。

## 三角マークを非表示にする

`attributionControl: false`で非表示にすることができます。

https://maplibre.org/maplibre-gl-js-docs/api/map/#:~:text=options.attributionControl

```diff js
import maplibregl from 'maplibre-gl';

const map = new maplibregl.Map({
+   attributionControl: false,
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: [-74.5, 40],
    zoom: 9
});
```
