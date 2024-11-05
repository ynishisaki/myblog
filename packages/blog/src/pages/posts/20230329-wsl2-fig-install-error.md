---
title: WSL2でのFigインストール時に"error Unsupported init system <unknown>"と出るときの対処法
description: WSL2でのFigインストール時のエラーを解消する方法を紹介する。
date: 2023-03-29
tag: WSL
slug: 20230329-wsl2-fig-install-error
---

![cover image from Unsplash](/assets/blog/20230329-wsl2-fig-install-error/cover.webp)

Photo by [Jamie Haughton](https://unsplash.com/photos/Z05GiksmqYU) on [Unsplash](https://unsplash.com/)

## 本記事について

WSL2 での Fig インストール時のエラーを解消する方法を紹介する。

## インストールコマンド

最近、Windows でも Fig が使えるようになった。公式に、WSL2 でのインストール方法が記載されている。

https://fig.io/download

```bash
bash <(curl -fSsL https://fig.io/headless.sh) && exec $SHELL
```

## 実行結果

```bash
(省略)
error: Unsupported init system: <unknown>
```

...あれ？

失敗しました。

## 対処法

github で issue と解決策が挙がっていた。

https://github.com/withfig/fig/issues/2333

/etc/wsl.conf ファイルに、以下の設定を追加する。

```:wsl.conf
[boot]
systemd=true
```

ファイル編集後、再度インストール用のコマンドを実行する。
これで無事インストールできた。
