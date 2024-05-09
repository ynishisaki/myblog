---
title: '【TypeScript, Python, Docker】VSCodeで簡単おすすめリンター・フォーマッター紹介'
excerpt: 'VSCodeで拡張機能と組み合わせて簡単に利用できるおすすめリンター・コードフォーマッターを紹介する。'
coverImagePath: '/assets/blog/20240508-vscode-linter-formatter/cover.jpg'
coverImagePhotographer: 'Viktor Talashuk'
coverImageSrcUrl: 'https://unsplash.com/photos/brown-snail-on-black-wooden-surface-PxfeNQTKrng'
date: '2024-5-8'
category: 'VSCode'
---

## 本記事について

VSCodeで拡張機能と組み合わせて簡単に利用できるおすすめリンター・コードフォーマッターを紹介する。

## TypeSript

### @antfu/eslint-config(ESLint)

https://github.com/antfu/eslint-config

VueやNuxtのコアチームのメンバーであるAnthony Fuさんが開発されている。  
prettierを使わず、ESLintと[VSCodeのESLint拡張機能](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)、VSCodeの設定ファイルを使ってコードフォーマット(auto fix)を行う。  
新規設定用のコマンドが用意されており、コマンドを実行しいくつか質問に答えるとパッケージのインストールが行われ、`eslint.config.mjs`ファイル、auto fix用の`.vscode/settings.json`ファイルが自動生成される。便利。  
flat config対応。

### eslint-plugin-simple-import-sort(ESLint)

https://github.com/lydell/eslint-plugin-simple-import-sort

import文のソートを行うESLintプラグイン。
上記の`@antfu/eslint-config`に設定を追加して利用している。
こちらもflat config対応。

## Python

### Ruff(Linter, Formatter)

https://github.com/astral-sh/ruff

速さを売りにしているリンター兼フォーマッター。  
個人的にはツールがこれ一つで済む点を高く評価している。

[VSCode拡張機能](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff)を入れて以下のようにVSCodeの設定ファイルを編集すれば、保存時に自動でフォーマットが行われるようになる。

```json:settings.json
{
  "[python]": {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll": "explicit",
      "source.organizeImports": "explicit"
    },
    "editor.defaultFormatter": "charliermarsh.ruff"
  }
}
```

## Dockerfile

### hadolint(Linter)

https://github.com/hadolint/hadolint

Dockerfileの書き方が、Docker公式のベストプラクティスに沿っているかを確認できるlintツール。  
`Homebrew`などで`hadolint`をインストールし、[VSCode拡張機能](https://marketplace.visualstudio.com/items?itemName=exiasr.hadolint)を入れると、VSCode上でエラーを確認できる。

## リンター・フォーマッターがうまく機能しない場合

VSCodeのOUTPUTタブで`ESLint`や`prettier`を選択すると、実行結果を確認することができる。  
うまく機能していない際は、何かしらのエラーが表示されている可能性が高いので、エラー内容を元に修正すれば良い。

![Image from Gyazo](https://gyazo.com/5d587250b732174daccb8a6a8d028b5c.png)_ESLintの実行履歴と詳細が表示されている例。_
