---
title: 'ブログ用ドメインを取得したよ'
excerpt: 'ブログを開設して、2か月ほど経過した。自分のブログに愛着が湧いてきたため、ブログ用のドメインを取得することにした。'
coverImage: '/assets/blog/20220502_get-domain/cover.jpg'
coverImagePhotographer: 'Irina Blok'
coverImageSrc: 'https://unsplash.com/photos/RLR9AfOd5hw'
date: '2022-05-02'
---
# 本記事の内容
ブログを開設してから、2か月ほど経過した。

投稿記事が少しずつ溜まってくると同時に、自分のブログに愛着が湧いてきた。

ブログ制作当初は、「サーバーやドメインに一銭もかけたくない！」と思っていたけれど、かわいい自分のブログのために、ドメインを取得することにした。

# 取得したいドメイン名を決める
どんなドメインが適当か？色々調べてみて、**名は体を表す**ことが最も重要であると考えた。

私の場合、
- 取得するドメインは、ブログに使う予定である
- （現時点での）ブログのコンセプトは、「もにょ自身」である

ということで、第一希望は「monyoblog.com」になった。

# ドメイン取得サービスを選ぶ
ドメインを取得するのは初めてだったので、こちらを参考に決めた。
【2022年】ドメイン取得サービスのおすすめ人気ランキング23選【徹底比較】
https://my-best.com/11725


最安＆Whois代行があるもの、ということで、今回はnamegearを利用した。「.com」なら、1,294円/年で利用できる。
~~あれ、参考にしたサイトに書いてある値段と違うじゃん.。よくよく調べたら、FC2ドメインのほうが安かった。とほほ。~~

# ドメインを取得する
namegearにて、第一希望「monyoblog.com」で申請。
[![Image from Gyazo](https://i.gyazo.com/56128cc06eacc055fc1feeb38695331f.png)](https://gyazo.com/56128cc06eacc055fc1feeb38695331f)*（出展：https://namegear.co )*

取得できました～！

# Vercelで、取得したドメインを設定する
簡単だった。特に調べなくても出来ると思う。

まず、Vercelでの操作。
`Project Settings` 内の `Domains` で、取得したドメインを入力し、Addボタンを押す。

次に、namegearでの操作。
DNSの設定で、Vercelで表示されたDNSレコードを新規登録する。

再びVercelに戻り、「Valid Configuration」と表示されていればOK。

[![Image from Gyazo](https://i.gyazo.com/c07232a562dff6cd960a3819d077bb95.png)](https://gyazo.com/c07232a562dff6cd960a3819d077bb95)*（出展：https://vercel.com )*

出来ました～！


# 今日のまとめ
今日は、「monyoblog.com」でドメインを取得し、Vercelでドメインを追加するところまでできた。

こんな安直な名前のドメインが空いてるとは思っていなかったので、ラッキー。
全国にたくさんいるもにょさんの中で、ブログを作ろうとした初のもにょさんなのかも？（たぶん違う）