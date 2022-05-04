---
title: '自分のブログにOpen Graph Protocol（OGP）を設定したよ'
excerpt: '自分のブログ（Next.js）にOpen Graph Protocol（OGP）を設定し、Twitterでブログ記事へのリンクがカード表示されることを確かめる。'
coverImage: '/assets/blog/20220504_open-graph-protocol/cover.jpg'
coverImagePhotographer: 'Annie Spratt'
coverImageSrc: 'https://unsplash.com/photos/OAx-cvGkYb8'
date: '2022-05-04'
---
# 本記事の内容
自分のブログ（Next.js）にOpen Graph Protocol（OGP）を設定し、Twitterでブログ記事へのリンクがカード表示されることを確かめる。

# 事の発端
先日、自分のブログ用のドメインを取得したので、Twitterでツイートした時のこと。

[![Image from Gyazo](https://i.gyazo.com/5f5937a110e7cdbfe18d12a03aace776.jpg)](https://gyazo.com/5f5937a110e7cdbfe18d12a03aace776)*（出所：https://twitter.com/ ）OGP設定前。*

あれ、物寂しいな？

普通、URL貼ったら、もっと色々ついてくるじゃん？

調べたところ、 **Open Graph Protocol（以下OGP）** を設定する必要があるみたい。

ということで、今日は、OGPの設定をして、Twitterでリンクカードが表示されるようにしていきます。

# OGPの設定方法

OGPについては、こちらをどうぞ。
https://ogp.me/

日本語サイトも参考にしつつ。
https://growthseed.jp/experts/sns/ogp/#Twitter


私のブログは、Next.jsで書いているので、こんな感じになりました。

```typescript
import Head from 'next/head'

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
                <meta property='og:description' content='詳細'/>
                <meta property='og:locale' content='ja_JP' />
                {/* twitter用OGPの設定 */}
                <meta name='twitter:card' content='summary_large_image（他にも色々あるよ）' />
                <meta name='twitter:site' content='@hoge（twitterのアカウント）' />
                <meta name='twitter:player' content='@hoge（twitterのアカウント）' />
            </Head>
        </>
    )
}
```


ホントは、htmlタグに以下の記述をするみたいなんだけど（参考：https://ogp.me/ ）、なくてもちゃんと動いた。
んー、よくわからない。


```typescript
<html prefix="og: https://ogp.me/ns#">
```

# 出力結果

テストには、Twitterの「Card validator」を使います。
https://cards-dev.twitter.com/validator


ブログのURLを打つと、
[![Image from Gyazo](https://i.gyazo.com/61f948c36694f2b2ecfeee1bf41fed64.png)](https://gyazo.com/61f948c36694f2b2ecfeee1bf41fed64)*（出所：https://cards-dev.twitter.com/validator ）OGP設定後。*

おー！カードでてきた！

いい感じ！

# 今日のまとめ
今日は、自分のブログにOpen Graph Protocol（OGP）を設定し、Twitterでカード表示されることを確かめるところまでできた。

htmlタグの記述に関しては、今後問題が起きたら調べてみますね。


# 参考サイトまとめ
https://ogp.me/
https://growthseed.jp/experts/sns/ogp/#Twitter
https://cards-dev.twitter.com/validator
