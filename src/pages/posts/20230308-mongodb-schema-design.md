---
title: 'MongoDBのスキーマ設計入門'
excerpt: 'MongoDB をはじめて触る人を対象としたMongoDB におけるドキュメントの構造とスキーマ設計の考え方。'
coverImagePath: '/assets/blog/20230308-mongodb-schema-design/cover.webp'
coverImagePhotographer: 'Kwang Javier'
coverImageSrcUrl: 'https://unsplash.com/photos/qcRMfoIWxRo'
date: '2023-03-08'
category: 'MongoDB'
---

## 本記事について

MongoDB をはじめて触る人を対象とした MongoDB におけるドキュメントの構造とスキーマ設計の考え方。

## 参考サイト

https://docs.mongodb.com/manual/core/data-modeling-introduction/

&nbsp;

## はじめに用語解説

### docment

RDB における record に相当。  
JSON Object とほぼ同じ形式。

### collection

RDB における table に相当。  
collection 内の docment は、デフォルトで同じフィールドや同じデータ型を持つ必要がない。

Scheme Validation を使用すると、許可されるデータ型や値の範囲などの制約を設定できる。

### field

RDB における column に相当。

### Atomicity

「トランザクション内のすべての操作が完了する」か、「すべて失敗する」かのどちらかしかないということを保証する。  
トランザクションを定義する 4 つの重要な特性、Atomicity（原子性）、Consistency（一貫性）、Isolation（独立性）、Durability（永続性）のうちの一つ。

&nbsp;

## 2 種類の document 構造

スキーマ設計をするにあたり、document の構造をどうするか、データ間の関係をどう示すかは以下の二つから選択することになる。

### 1. Embedded Data Models（denormalized）

以下の例では、ブログ記事の情報に加えて、記事の著者（author）とコメント（comments）も埋め込まれている。

```json
// article collection
{
  "_id": "1234567890",
  "title": "My Blog Post",
  "body": "This is my blog post.",
  "author": {
    // embedded
    "name": "John Smith",
    "email": "john.smith@example.com"
  },
  "comments": [
    // embedded
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
  ]
}
```

Embedded Data Models は、一回の DB 操作で関連データを取得できるという利点がある。

大抵のケースでは、このモデルが適しているらしい。  
ただし、document にはデータサイズの上限がある点には注意。

### 2. Normalized Data Models

正規化もできる。

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

## Atomicity が保証される範囲に注意

単一 document の操作は、atomicity が保たれている。

複数 document にまたがる操作は、atomic ではない。
この場合、各 document の更新は atomic だが操作全体は atomic ではない。

なお、現在では multi-document transactions もサポートされている。  
が、Embedded Data Models を活用することによって、multi-document transactions の使用を必要最低限に抑えた方がよいらしい。

&nbsp;

## スキーマ設計の考え方

問題は Embedded Data Models と Normalized Data Models をどう使い分けるかだが、明確な答えはないようだ。

...と言われても困るので、MongoDB のドキュメントで挙げられている、ざっくりした指針を以下に示す。

### Embedded Data Models がよい場合

- 一対一（一方が他方を「含む」関係）
- 一対多

### Normalized Data Models がよい場合

- 仮に Embedded Data Models を採用した場合、データの重複が発生し、かつ重複の影響を上回るほどの十分な読み取りパフォーマンスの利点が得られない場合
- 複雑な多対多
- 大規模な階層データセット

これはあくまで指針であって、当てはまらないケースもあることに注意が必要である。

例えば、一口に「一対多」と言っても「一対少数」なのか「一対数十万」なのかで話は変わってくるわけで、「一対数十万」は Embedded Data Models に向いていない（document がオーバーフローする恐れがあるため）。

※もっと言うと、「一対数十万」の関係でも Embedded Data Models を適応する方法はある。 「一」側に非正規化する方法、「数十万」側に非正規化する方法どちらも実装可能。だから「答えはない」「ケースバイケースです」ということになるのだろう。

&nbsp;

## まとめ

- MongoDB には二つのデータモデルがある。
  1. Embedded Data Models
  2. Normalized Data Models
- これら二つのモデルの使い分け方について、ざっくりした指針を示した。
- 基本的には、Embedded Data Models が適しているケースが多く、Normalized Data Models は Embedded Data Models を適応するのが難しい場面で使うことになりやすい。
