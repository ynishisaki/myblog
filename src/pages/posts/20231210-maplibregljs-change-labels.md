---
title: 'MapLibre GL JSのラベル表示の小技（単位をつける、数値の丸め）'
excerpt: 'MapLibre GL JS のラベル表示において、よく使う式演算子を紹介する。'
coverImagePath: '/assets/blog/20231210-maplibregljs-change-labels/cover.webp'
coverImagePhotographer: 'Annie Williams'
coverImageSrcUrl: 'https://unsplash.com/photos/traffic-signage-lvNUmFPev40'
date: '2023-12-10'
category: 'MapLibre GL JS'
---

## 本記事について

MapLibre GL JS のラベル表示において、よく使う式演算子を紹介する。

## 基本となるソースコード

地図は[MapLibre Demo Tiles](https://github.com/maplibre/demotiles)を使用した。

ラベルは`symbol`タイプのレイヤの`text-field`プロパティで設定できる。
今回表示する値は、`source`に指定した geojson の`area`プロパティとした。

```html:index.html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <script src="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js"></script>
    <link href="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css" rel="stylesheet" />
    <style>
      body {
        margin: 0;
        padding: 0;
      }
      html,
      body,
      #map {
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      const map = new maplibregl.Map({
        container: "map",
        // https://github.com/maplibre/demotiles
        style: "https://demotiles.maplibre.org/style.json",
        center: [136, 37],
        zoom: 5,
      });

      map.on("load", () => {
        map.addSource("rectangle", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [
                    [
                      [135, 39],
                      [135, 35],
                      [140, 35],
                      [140, 39],
                      [135, 39],
                    ],
                  ],
                },
                properties: {
                  area: 1234.5,
                },
              },
            ],
          },
        });
        map.addLayer({
          id: "rectangle",
          type: "fill",
          source: "rectangle",
          paint: {
            "fill-color": "white",
            "fill-opacity": 0.7,
          },
        });
        map.addLayer({
          id: "rectangle-label",
          type: "symbol",
          source: "rectangle",
          layout: {
            "text-field": ["get", "area"],
          },
        });
      });
    </script>
  </body>
</html>
```

![Image from Gyazo](https://i.gyazo.com/570305a6220fabd5fa3b531a309dd872.png)

## 値に単位をつける

`concat`演算子でラベルの末尾に単位をつけることができる。  
`area`プロパティは数値だが、`concat`で自動的に文字列に変換され、他の文字列と結合される。

https://maplibre.org/maplibre-style-spec/expressions/#concat

```js:index.html
// (省略)
map.addLayer({
  id: "rectangle-label",
  type: "symbol",
  source: "rectangle",
  layout: {
    "text-field": ["concat", ["get", "area"], " km²"],
  },
});
// (省略)
```

![Image from Gyazo](https://i.gyazo.com/a2827697b67c8eb79124b884fb8fef2f.png)

## 数値を丸めて表示（四捨五入）

`round`演算子で整数に丸めることができる。  
丸めた後は`to-string`で文字列に変換する必要があるので注意。

https://maplibre.org/maplibre-style-spec/expressions/#round

```js:index.html
// (省略)
map.addLayer({
  id: "rectangle-label",
  type: "symbol",
  source: "rectangle",
  layout: {
    "text-field": ["to-string", ["round", ["get", "area"]]],
  },
});
// (省略)
```

![Image from Gyazo](https://i.gyazo.com/277f38ede17d9d880e1f87b0683e3264.png)
