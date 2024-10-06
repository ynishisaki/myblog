---
title: '【BigQuery × GA4】連携データの確認とevent_timestampのフォーマット変換'
excerpt: 'BigQuery にエクスポートしたデータの詳細の確認方法と、event_timestamp のフォーマットを変換する方法を紹介する。'
coverImagePath: '/assets/blog/20221016-bigquery-ga4-timestamp/cover.webp'
coverImagePhotographer: 'Henry & Co.'
coverImageSrcUrl: 'https://unsplash.com/photos/pjJdOE2XBRU'
date: '2022-10-16'
category: 'BigQuery'
---

## 本記事について

Google アナリティクス は BigQuery と連携することで、集計前の生データを BigQuery 上で利用することができる。

本記事では、BigQuery にエクスポートしたデータの詳細の確認方法と、
クエリの練習として event_timestamp のフォーマットを変換する方法を紹介する。

## BigQuery と Google アナリティクス 4 の連携方法

これの手順通りにやるのが一番よい。
https://support.google.com/analytics/answer/3416092#zippy=%2C%E3%81%93%E3%81%AE%E8%A8%98%E4%BA%8B%E3%81%AE%E5%86%85%E5%AE%B9

他にも連携方法を丁寧に解説した日本語記事はいっぱいあるので、そちらも参考にされるとよい。

## BigQuery export のデータを確認する

連携が成功すると、BigQuery のプロジェクト内に、データセットとテーブルが自動追加される。

![](/assets/blog/20221016-bigquery-ga4-timestamp/page0.svg)_BigQuery 操作画面。_

データセットとテーブルの名前は以下のように決定される。

データセット

> BigQuery にリンクしている Google アナリティクス 4 プロパティおよび Firebase プロジェクトごとに、「analytics\_<property_id>」という名前の 1 つのデータセットが BigQuery プロジェクトに追加されます。

テーブル

> 毎日のエクスポート オプションが有効になっている場合、各データセット内に events_YYYYMMDD という名前のテーブルが毎日作成されます。
>
> [GA4] BigQuery Export スキーマ - アナリティクス ヘルプ(https://support.google.com/analytics/answer/7029846?hl=ja )より

テーブル名に(4)とついているが、これは 4 日分のテーブルが保存されているからである。

![](/assets/blog/20221016-bigquery-ga4-timestamp/page1.svg)_BigQuery 操作画面より。_

テーブル名を選択すると、SCHEMA が開き、データ構造を確認することができる。

日にちごとのテーブルの中身は、PREVIEW で表示することができる。便利。
![](/assets/blog/20221016-bigquery-ga4-timestamp/page2.svg)_BigQuery 操作画面より。_

## event_timestamp のフォーマットを変換する

SQL 処理の手始めに event_timestamp のフォーマット変換を行う。
まず、テーブル内の SCHEMA から event_timestamp が INTEGER であることが確認できる。

![](/assets/blog/20221016-bigquery-ga4-timestamp/page4.svg)_BigQuery 操作画面より。_

今回は、２種類のフォーマット変換を紹介する。
一つめは、マイクロ秒精度が必要な場合。
`TIMESTAMP_MICROS` で、 INTEGER からマイクロ秒精度の TIMESTAMP を返す。
https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions?hl=ja#timestamp_micros

二つめは、年月日のみ欲しい場合。
`DATE`で TIMESTAMP から DATE を抽出すればよい。
https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions?hl=ja#date

## 実装例

```SQL:event_timestampのフォーマット変換
SELECT
  event_timestamp,
  TIMESTAMP_MICROS(event_timestamp) AS event_timestamp_value,
  DATE(TIMESTAMP_MICROS(event_timestamp), 'Asia/Tokyo') AS event_date
FROM `プロジェクトID名.データセット名.テーブル名`
```

![Image from Gyazo](https://gyazo.com/89b1b92deba40589de7b1e6f1df35c00.png)_クエリ実行結果。_

上記のような結果になっていれば、成功である。

BigQuery はクエリ実行前にエラーの有無がわかるので、これまた便利である。
