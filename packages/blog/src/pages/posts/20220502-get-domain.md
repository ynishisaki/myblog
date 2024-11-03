---
title: ブログ用ドメインを取得したよ
description: ブログを開設して、2か月ほど経過した。自分のブログに愛着が湧いてきたため、ブログ用のドメインを取得することにした。
date: 2022-05-02
tag: 個人開発
---

![cover image from Unsplash](/assets/blog/20220502-get-domain/cover.webp)

Photo by [Irina Blok](https://unsplash.com/photos/RLR9AfOd5hw) on [Unsplash](https://unsplash.com/)

## 本記事の内容

ブログを開設してから、2 か月ほど経過した。

投稿記事が少しずつ溜まってくると同時に、自分のブログに愛着が湧いてきた。

ブログ制作当初は、「サーバーやドメインに一銭もかけたくない！」と思っていたけれど、かわいい自分のブログのために、ドメインを取得することにした。

## 取得したいドメイン名を決める

どんなドメインが適当か？色々調べてみて、**名は体を表す**ことが最も重要であると考えた。

私の場合、

- 取得するドメインは、ブログに使う予定である
- （現時点での）ブログのコンセプトは、「もにょ自身」である

ということで、第一希望は「monyoblog.com」になった。

## ドメイン取得サービスを選ぶ

ドメインを取得するのは初めてだったので、こちらを参考に決めた。
【2022 年】ドメイン取得サービスのおすすめ人気ランキング 23 選【徹底比較】
https://my-best.com/11725

最安＆Whois 代行があるもの、ということで、今回は namegear を利用した。「.com」なら、1,294 円/年で利用できる。
~~あれ、参考にしたサイトに書いてある値段と違うじゃん.。よくよく調べたら、FC2 ドメインのほうが安かった。とほほ。~~

## ドメインを取得する

namegear にて、第一希望「monyoblog.com」で申請。
![Image from Gyazo](https://i.gyazo.com/56128cc06eacc055fc1feeb38695331f.png)
_（出展：https://namegear.co )_

取得できました～！

## Vercel で、取得したドメインを設定する

簡単だった。特に調べなくても出来ると思う。

まず、Vercel での操作。
`Project Settings` 内の `Domains` で、取得したドメインを入力し、Add ボタンを押す。

次に、namegear での操作。
DNS の設定で、Vercel で表示された DNS レコードを新規登録する。

再び Vercel に戻り、「Valid Configuration」と表示されていれば OK。

![Image from Gyazo](https://i.gyazo.com/c07232a562dff6cd960a3819d077bb95.png)
_（出展：https://vercel.com )_

出来ました～！

## 今日のまとめ

今日は、「monyoblog.com」でドメインを取得し、Vercel でドメインを追加するところまでできた。

こんな安直な名前のドメインが空いてるとは思っていなかったので、ラッキー。
全国にたくさんいるもにょさんの中で、ブログを作ろうとした初のもにょさんなのかも？（たぶん違う）
