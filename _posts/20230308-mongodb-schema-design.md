---
title: 'はじめてのMongoDB、スキーマ設計の考え方'
excerpt: 'MongoDB 初心者を対象とした、ドキュメントの構造とスキーマ設計の考え方の入門内容。'
coverImagePath: '/assets/blog/20230308-mongodb-schema-design/cover.jpg'
coverImagePhotographer: 'Kwang Javier'
coverImageSrcUrl: 'https://unsplash.com/photos/qcRMfoIWxRo'
date: '2023-03-08'
category: 'MongoDB'
---

# 本記事について

この記事は、MongoDB をはじめて触る人を対象に、MongoDB におけるドキュメントの構造とスキーマ設計の考え方の入門内容をまとめたものである。

## 参考

<https://docs.mongodb.com/manual/core/data-modeling-introduction/>

&nbsp;

# はじめに用語解説

## docments

RDB における record に相当。  
JSON Object とほぼ同じ形式。

## collections

RDB における table に相当。  
collection 内の docment は、デフォルトで同じフィールドや同じデータ型を持つ必要がない。

Scheme Validation を使用すると、許可されるデータ型や値の範囲などの制約を設定できる。

## field

RDB における column に相当。

## Atomicity

「トランザクション内のすべての操作が完了する」か、「すべて失敗する」かのどちらかしかないということを保証する。  
トランザクションを定義する 4 つの重要な特性、Atomicity（原子性）、Consistency（一貫性）、Isolation（独立性）、Durability（永続性）のうちの一つ。

&nbsp;

# Document Structure

データモデルを設計するにあたり、document の構造、データ間の関係をどう示すかは以下の二つから選択することになる。

## Embedded Data Models（非正規化）

以下の例では、ブログ記事の情報に加えて、記事の著者（author）とコメント（comments）も埋め込まれている。

```json
{
  "_id": "1234567890",
  "title": "My Blog Post",
  "body": "This is my blog post.",
  "author": {
    "name": "John Smith",
    "email": "john.smith@example.com"
  }, // embedded
  "comments": [
    {
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "body": "Great post!"
    },
    {
      "name": "Bob Johnson",
      "email": "bob.johnson@example.com",
      "body": "Thanks for sharing."
    }
  ] // embedded
}
```

Embedded Data Models は、一回の DB 操作で関連データを取得できるという利点がある。  
大抵のケースでは、このモデルが適しているらしい。

## Normalized Data Models

もちろん正規化もできる。

以下の例では、著者とコメントは別のコレクションに格納されている。

```json
// user collection
{
  "_id": "1234567890",
  "name": "John Smith",
  "email": "john.smith@example.com"
}

// order collection
{
  "_id": "0987654321",
  "user_id": "1234567890",      // user collection id
  "item": "MongoDB in Action",
  "price": 29.99
}
```

&nbsp;

# Atomicity

単一 document での write 操作では、atomicity が保証されている。  
しかし、複数 document にまたがる write 操作は、atomic ではない。

各 document の変更は atomic だが操作全体は atomic ではない、ということになる。

現在では multi-document transactions もサポートされている。  
が、Embedded Data Models を活用することによって、multi-document transactions の使用を必要最低限に抑えた方がよいらしい。

&nbsp;

# Data Model Design

先述した Embedded Data Models と Normalized Data Models のどちらを選択するかのざっくりした判断基準は以下の通り。

## Embedded Data Models がよい場合

- 一対一（一方が他方を「含む」関係）
- 一対多

## Normalized Data Models がよい場合

- 仮に Embedded Data Models を採用した場合、データの重複が発生し、かつ重複の影響を上回るほどの十分な読み取りパフォーマンスの利点が得られない場合
- 複雑な多対多
- 大規模な階層データセット
