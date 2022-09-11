---
title: '自分のブログにOpen Graph Protocol（OGP）を設定したよ'
excerpt: '自分のブログ（Next.js）にOpen Graph Protocol（OGP）を設定し、Twitterでブログ記事へのリンクがカード表示されることを確かめる。'
coverImagePath: '/assets/blog/20220504-open-graph-protocol/cover.jpg'
coverImagePhotographer: 'Persnickety Prints'
coverImageSrcUrl: 'https://unsplash.com/photos/98uOSdqum6E'
date: '2022-05-04'
category: 'Next.js'
---

# 本記事の内容

自分のブログ（Next.js）に Open Graph Protocol（OGP）を設定し、Twitter でブログ記事へのリンクがカード表示されることを確かめる。

# 事の発端

先日、自分のブログ用のドメインを取得したので、Twitter でツイートした時のこと。

![Image from Gyazo](https://i.gyazo.com/5f5937a110e7cdbfe18d12a03aace776.jpg)
_（出所：https://twitter.com/ ）OGP 設定前。_

あれ、物寂しいな？

普通、URL 貼ったら、もっと色々ついてくるじゃん？

調べたところ、 **Open Graph Protocol（以下 OGP）** を設定する必要があるみたい。

ということで、今日は、OGP の設定をして、Twitter でリンクカードが表示されるようにしていきます。

# OGP の設定方法

OGP については、こちらをどうぞ。
https://ogp.me/

日本語サイトも参考にしつつ。
https://growthseed.jp/experts/sns/ogp/#Twitter

私のブログは、Next.js で書いているので、こんな感じになりました。

```typescript
import Head from 'next/head';

function HogePage() {
  return (
    <>
      <Head>
        {/* OGPの基本設定 */}
        <meta property='og:site_name' content='Webサイト名' />
        <meta property='og:title' content='Webページのタイトル名' />
        <meta property='og:type' content='ブログトップなら、blog。ブログ記事ならarticle' />
        <meta property='og:url' content='WebページのURL（絶対パスで指定）' />
        <meta property='og:image' content='画像ファイルのURL（絶対パスで指定）' />
        <meta property='og:description' content='詳細' />
        <meta property='og:locale' content='ja_JP' />
        {/* twitter用OGPの設定 */}
        <meta name='twitter:card' content='summary_large_image（他にも色々あるよ）' />
        <meta name='twitter:site' content='@hoge（twitterのアカウント）' />
        <meta name='twitter:player' content='@hoge（twitterのアカウント）' />
      </Head>
    </>
  );
}
```

ホントは、html タグに以下の記述をするみたいなんだけど（参考：https://ogp.me/ ）、なくてもちゃんと動いた。
んー、よくわからない。

```typescript
<html prefix="og: https://ogp.me/ns#">
```

# 出力結果

テストには、Twitter の「Card validator」を使います。
https://cards-dev.twitter.com/validator

ブログの URL を打つと、
![Image from Gyazo](https://i.gyazo.com/61f948c36694f2b2ecfeee1bf41fed64.png)
_（出所：https://cards-dev.twitter.com/validator ）OGP 設定後。_

おー！カードでてきた！

いい感じ！

# 今日のまとめ

今日は、自分のブログに Open Graph Protocol（OGP）を設定し、Twitter でカード表示されることを確かめるところまでできた。

html タグの記述に関しては、今後問題が起きたら調べてみますね。

# 参考サイトまとめ

https://ogp.me/
https://growthseed.jp/experts/sns/ogp/#Twitter
https://cards-dev.twitter.com/validator
