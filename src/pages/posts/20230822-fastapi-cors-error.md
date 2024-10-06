---
title: 'FastAPIでCORSの設定をしたにもかかわらずなおCORSエラーが出る場合の対処法'
excerpt: 'FastAPI での CORS (Cross-Origin Resource Sharing)の設定方法を紹介する。'
coverImagePath: '/assets/blog/20230822-fastapi-cors-error/cover.webp'
coverImagePhotographer: 'Migle Siauciulyte'
coverImageSrcUrl: 'https://unsplash.com/photos/sSoreg4Lfyw'
date: '2023-08-22'
category: 'FastAPI'
---

## 本記事について

FastAPI で CORS (Cross-Origin Resource Sharing)の設定をしたが、依然フロントエンドの CORS エラーが消えなくて困ったので、その際の対処方法を紹介する。

## 問題のコード

[公式ドキュメント](https://fastapi.tiangolo.com/tutorial/cors/)にならって middleware を設定した。
けれどもフロントエンドの CORS エラーは解消せず。

```ts
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS settings
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 解決方法

ミドルウェアのライブラリを`Starlette`に差し替えることで、CORS エラーが解消された。

```ts
from fastapi import FastAPI

from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

# CORS settings
origins = [
    "http://localhost:3000",
]
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
]

app = FastAPI(middleware=middleware)
```
