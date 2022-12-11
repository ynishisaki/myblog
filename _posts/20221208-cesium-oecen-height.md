---
title: '符号あり整数，符号なし整数の正規表現と，入力制限の方法'
excerpt: 'JavaScriptで、正規表現を用いて符号あり・符号なし整数を表現する方法と、入力制限を行う方法を紹介する。'
coverImagePath: '/assets/blog/20220426-regex/cover.jpg'
coverImagePhotographer: 'Robin Canfield'
coverImageSrcUrl: 'https://unsplash.com/photos/5pSPVKImqvI'
date: '2022-04-26'
category: 'JavaScript'
---

# 本記事の内容

# 実装環境

pyproj 3.4.0
https://pyproj4.github.io/pyproj/stable/index.html

# やりたいこと：東京湾の最終氷期の海面を示したい

# Cesium の height についてと、手っ取り早く海面（標高 0m）を求める方法

# 結論

この回答がとっても良いなと思ったので、シェアしたかった。
https://community.cesium.com/t/the-height-of-the-sea-is-not-0/14220/8

height は楕円体高。
海面(0m)の高さは height=ジオイド高にすれば OK。
狭い領域ならば、代表地点のジオイド高を計算し、その値を標高 0m として適応しても問題ない
大体

はて、楕円体高？ジオイド高ってなんすか？という人は、国土地理院の HP へ勉強しに行こう。

# まずはベースの作成

PLATEU でベースを作成。
海面上昇した Entity を作成する

# 検証 1: height=0 m の時

# 検証 2: height=3337 m の時

富士山山頂より低い。これは誤差なんてレベルではないということがお分かりかと思う。

# 対処法は？

狭い領域ならば、代表地点のジオイド高を計算し、その値を標高 0m として適応しても問題ない

1. 代表 1 地点のジオイド高 Hg を計算する
2. この高さ Hg が、その地点の標高 0m になる
3. 周辺のある程度狭い範囲であれば、この高さ Hg を適応できる
