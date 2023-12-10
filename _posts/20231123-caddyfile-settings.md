---
title: 'Caddy v2 で SPA と API サーバを同時に立ち上げる'
excerpt: 'Web サーバ Caddy を用いた SPA の配信と API サーバのリバースプロキシの設定方法を紹介する。'
coverImagePath: '/assets/blog/20231123-caddyfile-settings/cover.jpg'
coverImagePhotographer: 'Maxim Zhgulev'
coverImageSrcUrl: 'https://unsplash.com/photos/blue-padlock-5tmItJfHkIc'
date: '2023-11-23'
category: 'Caddy'
---

## 本記事について

Web サーバ Caddy を用いた SPA の配信と API サーバのリバースプロキシの設定方法を紹介する。

## 実現したいこと

今回は実公開ではなく、開発環境でのテストを想定している。

- `http://localhost` にアクセスすると、SPA の画面が表示
- `http://localhost/api/` にアクセスすると、バックエンドの API サーバにリバースプロキシ

## 事前準備

- Caddy v2: `localhost:80` で立ち上げ
- SPA: 静的ファイルを `/` 直下に配置
- API サーバ: `localhost:8000` で立ち上げ

## Caddyfile の設定

上記を実現するための Caddyfile は以下のようになる。

```:Caddyfile
http://localhost {
  log {
    output file /var/log/access.log
  }
  encode gzip
  # frontend(SPA)
  handle {
    root * /srv
	  try_files {path} /index.html
    file_server
  }
  # backend
  handle_path /api/* {
    reverse_proxy localhost:8000
  }
}
```

これらの設定にはいくつかポイントがあるので、以下で解説する。

## HTTPS の無効化

Caddy はデフォルトで自動 HTTPS が有効になっている。つまり HTTP は HTTPS にリダイレクトされる。

今回 HTTPS は不要なので、HTTP の使用を明示する必要がある。

```diff js:Caddyfile
- localhost {
+ http://localhost {
    (省略）
  }
```

https://caddyserver.com/docs/caddyfile/options#tls-options

## SPA

Caddy 公式ドキュメントに紹介されているので、こちらを参照していただきたい。
https://caddyserver.com/docs/caddyfile/patterns#single-page-apps-spas

## /api を省いてリバースプロキシ

`handle_path` が有効。
`handle` と役割は同じだが、リクエスト URL からマッチした部分を取り除いて渡すことができる。

https://caddyserver.com/docs/caddyfile/directives/handle#similar-directives
