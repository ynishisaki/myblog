---
title: Next.jsでページごとの認証チェック・リダイレクトを実装する
description: Next.jsのMiddlewareでページごとの認証チェック、リダイレクトを実装する方法を紹介する。
date: 2023-05-03
tag: Next.js
slug: 20230503-nextjs-middleware-auth
---

![cover image from Unsplash](/assets/blog/20230503-nextjs-middleware-auth/cover.webp)

Photo by [Mysaell Armendariz](https://unsplash.com/photos/IPheOySCW7A) on [Unsplash](https://unsplash.com/)

## 本記事について

あなたは現在 Next.js で開発を行っている。
そこで以下の機能が必要になった。

- ユーザーがとあるページにアクセスする
- ユーザーがログイン済みである場合は、そのままページを表示する
- ユーザーが未ログインである場合は、ログインページにリダイレクトする
- 認証情報は、cookie に保存するとする

本記事では、上記の処理を Next.js の Middleware で実装する方法を紹介する。

### 参考

- [Routing: Middleware | Next.js](https://nextjs.org/docs/advanced-features/middleware)

## 基本実装

Middleware が実行されたパスを確認するために、`console.log`を追加している。

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "これは認証用の関数です";

export function middleware(request: NextRequest) {
  // パス確認用
  console.log("path :", request.nextUrl.pathname);

  // Cookieの有無を確認
  const cookie = request.cookies.get("Cookie名")?.value;
  if (cookie) {
    // 認証チェックの関数を呼び出す（認証に失敗した場合はログイン画面にリダイレクト）
    return checkAuth(cookie).catch(() =>
      NextResponse.redirect(new URL("/login", request.url))
    );
  } else {
    // Cookieがない場合はログイン画面にリダイレクト
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
```

## 特定のページパスだけ Middleware を走らせたい

`console.log`の出力を確認するとわかるが、Middleware はデフォルトでプロジェクト内のすべてのルートに対して呼び出される。
つまりページだけでなく静的なファイルでも逐一実行される。
そこで、`matcher`を使って認証を行いたいページパスに対してのみ Middleware を実行するよう設定していく。

配列の中に、Middleware を実行したいパスを記述していけば良い。

```ts
export function middleware(request: NextRequest) {
  ...
}

export const config = {
  matcher: [
    '/',              // => /
    '/about',         // => /about
    '/about/:path',   // => /about/a, /about/b, /about/c, ...
    '/about/:path*',  // => /about/a, /about/b/hoge, /about/c/hoge/fuga, ...
  ],
}
```

&emsp;

また、Next.js のドキュメントでは api と静的コンテンツを除外する正規表現が紹介されている。

- [Routing: Middleware | Next.js](https://nextjs.org/docs/advanced-features/middleware#:~:text=The%20matcher%20config%20allows%20full%20regex%20so%20matching%20like%20negative%20lookaheads%20or%20character%20matching%20is%20supported.%20An%20example%20of%20a%20negative%20lookahead%20to%20match%20all%20except%20specific%20paths%20can%20be%20seen%20here%3A)

```ts
// https://nextjs.org/docs/advanced-features/middleware より
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

注意点として、これは「"api", "\_next", "\_next/image", "favicon.ico"を除外する」というよりむしろ「"api", "\_next", "\_next/image", "favicon.ico"を含まないもの全てにマッチする」という処理になる。

プロジェクトのページ数がそこまで多くないのであれば、先ほどのように配列にページパスを一つづつ記述していく方が楽だと思う。

## 完成形はこちら

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "これは認証用の関数です";

export function middleware(request: NextRequest) {
  // パス確認用
  console.log("path :", request.nextUrl.pathname);

  // Cookieの有無を確認
  const cookie = request.cookies.get("Cookie名")?.value;
  if (cookie) {
    // 認証チェックの関数を呼び出す（認証に失敗した場合はログイン画面にリダイレクト）
    return checkAuth(cookie).catch(() =>
      NextResponse.redirect(new URL("/login", request.url))
    );
  } else {
    // Cookieがない場合はログイン画面にリダイレクト
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    '/',              // => /
    '/about',         // => /about
    '/about/:path',   // => /about/a, /about/b, /about/c, ...
    '/about/:path*',  // => /about/a, /about/b/hoge, /about/c/hoge/fuga, ...
  ],
}
```
