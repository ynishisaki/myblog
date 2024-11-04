---
title: 【BigQuery × GA4】PV数の集計方法
description: BigQuery を用いて Googleアナリティクス4のPV (page_view)数を集計する方法を紹介する。
date: 2022-10-20
tag: BigQuery
---

![cover image from Unsplash](/assets/blog/20221020-bigquery-ga4-pageview/cover.webp)

Photo by [Andrew Neel](https://unsplash.com/photos/A9Msi-vUNKg) on [Unsplash](https://unsplash.com/)

## 本記事について

Google アナリティクス は、 BigQuery と連携することで集計前の生データを BigQuery 上で利用することができる。

本記事では、BigQuery を用いて Google アナリティクス 4 の PV (page_view)数を集計する方法を紹介する。

## 前回はこちら

- [【BigQuery × GA4】連携データの確認とevent_timestampのフォーマット変換｜もにょblog](https://www.monyoblog.com/posts/20221016-bigquery-ga4-timestamp/)

## Google アナリティクス 4 における「表示回数」を集計する

> ページビューとはブラウザにページが読み込まれる（再読み込される）ことです。ページビュー数は、閲覧されたページの合計数として定義される指標です。
>
> [ページビュー - アナリティクス ヘルプ](https://support.google.com/analytics/answer/6086080 )より

Google アナリティクス 4 の「表示回数」に相当するイベントには、page_view（ウェブ）と screen_view（アプリ）の２種類がある。
これらのイベントは、GA4 で自動的に収集されるイベントデータの一つであり、収集されたイベントの種類はテーブルの event_name カラムで確認することができる。

## 実装例

ウェブの場合、event_name カラムの値が page_view であるレコードの数をカウントすれば良い。

### 例１. 日付ごとにページビューを集計する

テーブル名はワイルドカードで一括指定することが可能。

```sql
SELECT
  DATE(TIMESTAMP_MICROS(event_timestamp), 'Asia/Tokyo') AS dates,
  COUNT(1) AS pageviews
FROM `プロジェクトID名.データセット名.events_*`
WHERE event_name = 'page_view'
GROUP BY 1
ORDER BY 1 DESC
```

### 例 2. 最近一週間の範囲で日付ごとにページビューを集計する

ワイルドカードで複数したテーブルから、さらに条件でテーブルを絞り込むときは`_TABLE_SUFFIX`を用いる。

```sql
SELECT
  DATE(TIMESTAMP_MICROS(event_timestamp), 'Asia/Tokyo') AS dates,
  COUNT(1) AS pageviews
FROM `プロジェクトID名.データセット名.events_*`
WHERE
  _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE('Asia/Tokyo'), INTERVAL 7 DAY))
  AND
  FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE('Asia/Tokyo'), INTERVAL 1 DAY))
  AND
  event_name = 'page_view'
GROUP BY 1
ORDER BY 1 DESC
```

### 例 3. ページごとにページビューを集計する

event_params は 1 レコードにつき複数の値を持つので、`UNNEST`演算子を用いて各要素を１行づつのデータに変換する必要がある。

```sql
SELECT
  (SELECT value.string_value FROM unnest(event_params) WHERE key='page_title') AS page_titles,
  COUNT(1) AS pageviews
FROM `プロジェクトID名.データセット名.events_*`
WHERE event_name = 'page_view'
GROUP BY 1
ORDER BY 2 DESC
```
