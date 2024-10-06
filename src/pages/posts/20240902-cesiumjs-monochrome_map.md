---
title: '【CesiumJS】地図タイルを白から黒までのグレースケール（モノクロ）で表示する'
excerpt: 'CesiumJSを使って、地理院タイルの標準地図をグレースケールで表示する方法を紹介する。'
coverImagePath: '/assets/blog/20240902-cesiumjs-monochrome_map/cover.webp'
coverImagePhotographer: ''
coverImageSrcUrl: ''
date: '2024-09-02'
category: 'CesiumJS'
---

## 本記事について

CesiumJSを使って、地理院タイルの標準地図をグレースケールで表示する方法を紹介する。

## 地理院タイルの標準地図をグレースケールで表示する

`ImageryLayer`のオプションのうち、`saturation`を`-1`にすれば良い。

`saturation`オプションの詳細は、以下のリンクを参照。  
https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayer.html?classFilter=imageryL#saturation

### サンプルコード

```html:index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <script src="https://cesium.com/downloads/cesiumjs/releases/1.120/Build/Cesium/Cesium.js"></script>
    <link
      href="https://cesium.com/downloads/cesiumjs/releases/1.120/Build/Cesium/Widgets/widgets.css"
      rel="stylesheet"
    />
    <style>
      html,
      body,
      #cesiumContainer {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="cesiumContainer"></div>
    <script type="module">
      const viewer = new Cesium.Viewer("cesiumContainer", {
        baseLayer: new Cesium.ImageryLayer(
          new Cesium.UrlTemplateImageryProvider({
            url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
            credit: new Cesium.Credit(
              '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>',
            ),
          }),
          {
            saturation: 0, // 彩度を0にする
          },
        ),
      });

      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(139.77, 35.68, 3000),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90.0),
        },
      });
    </script>
  </body>
</html>
```

### 出力結果

![地理院タイルの標準地図をグレースケールで表示した例](/assets/blog/20240902-cesiumjs-monochrome_map/cover.webp)

## 参考

https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/

https://community.cesium.com/t/converting-images-loaded-by-imageryprovider-into-grayscale-color/4164
