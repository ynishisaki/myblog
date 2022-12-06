---
title: 'デスクトップ版 MFA 認証アプリを試してみる（Authy, Authenticator）'
excerpt: 'AWS の多要素認証（MFA）用にデスクトップ版アプリをいくつか発見したので、試してみる。'
coverImagePath: '/assets/blog/20221205-mfa-desktop-apps/cover.jpg'
coverImagePhotographer: 'Christina @ wocintechchat.com'
coverImageSrcUrl: 'https://unsplash.com/photos/UTw3j_aoIKM'
date: '2022-12-05'
category: 'MFA'
---

# 本記事について

AWS の多要素認証（MFA）といえば、スマホアプリ（Google Authenticator 等）を利用するケースを多く見かけるが、デスクトップ版アプリに対応したものもいくつか発見したので、試してみる。

今回試したのは、以下の二つ。

- [Authy](https://authy.com/download/) by Twilio(Window, Mac, Linux)
- [Authenticator](https://authenticator.2stable.com/) by 2Stable(Mac)

# デスクトップアプリを利用するメリット

- デスクトップ一つで認証が完結する
- 認証コードをコピペできる
- スマホに万が一があった時の対策として、サブでデスクトップアプリを入れておく使い方も可能
- スマホをよく無くす、スマホの充電すぐ切れちゃうマンはデスクトップ版の方が安心

:::message
ただし上記の使い方で OK なのかはケースバイケースでしょうから、そこは注意していただきたい。
:::

# Authy by Twilio（Window, Mac, Linux）

![Image from Gyazo](https://i.gyazo.com/296712bf2cab526fd0dfb7871cccf4a5.jpg)_ダウンロードはこちらから。https://authy.com/download/_

OS の種類を問わず、スマホ、デスクトップ版の両方がある。
UI/UX もシンプルで良い感じ。

最大のメリットは、スマホアプリとデスクトップアプリで、同一の MFA を共有できる点。
デバイス間の連携方法も大変簡単だった。これおすすめ。

# Authenticator by 2Stable(Mac)

![Image from Gyazo](https://gyazo.com/b8fd1d31b769d8e3e804ff2c7da21f50.png)_ダウンロードはこちらから。https://authenticator.2stable.com/_

iPhone はもちろん、Apple Watch でも使用できるらしい。すごいな。

無料版と有料版があり、デバイス間の連携は有料版しかできないっぽい？
私は Macbook 以外の Mac 製品を所持していないため連携を試すことができなかった。残念。

Authy にはない特徴として、Chrome や Firefox などに対応したブラウザ拡張版もあり、
しかもなんと！ブラウザ拡張版では、**AutoFill 機能**が使用できる。

![](/assets/blog/20221205-mfa-desktop-apps/autofill_example.svg)_Autofill の使用例。_

# どっちがおすすめ？

どっちも同じくらい使いやすい。笑

前者の Authy は、万人におすすめできる。

一方、後者の Authenticator は OS や課金の有無による制限があるため、人を選ぶかなと思った。
とはいえ、AutoFill 機能は非常に魅力的である。

...ということで、もう少し両方使い続けてみるつもり。
