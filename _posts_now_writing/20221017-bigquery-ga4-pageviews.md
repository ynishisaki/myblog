---
title: '【BigQuery × GA4】PV数の集計'
excerpt: 'BigQuery にエクスポートしたデータの詳細の確認方法と、event_timestamp のフォーマットを変換する方法を紹介する。'
coverImagePath: '/assets/blog/20221016-bigquery-ga4-pageviews/cover.jpg'
coverImagePhotographer: 'Henry & Co.'
coverImageSrcUrl: 'https://unsplash.com/photos/pjJdOE2XBRU'
date: '2022-10-17'
category: 'BigQuery'
---

# 本記事について

Google アナリティクス は BigQuery と連携することで、集計前の生データを BigQuery 上で利用することができる。

本記事では、BigQuery を用いて PV 数（Google アナリティクス 4 における「表示回数」）を集計する方法を紹介する。

# 前回はこちら

https://www.monyoblog.com/posts/20221016-bigquery-ga4-timestamp/

# Google アナリティクス 4 における「表示回数」

発生イベントは、page_view（ウェブ）と screen_view（アプリ）の２種類がある。
イベントデータは、テーブルの event_name カラム内に、page_view と screen_view があるのが確認できる。
event_name は、その他にも
page_view や screen_view は自動で収集されるイベントデータである。その他にも

https://support.google.com/analytics/answer/9234069

# 今日のまとめ

複数テーブルを検索するときは、
`_TABLE_SUFFIX`により、テーブル名をワイルドカードで一括指定することが可能。

複数テーブルまとめ
https://cloud.google.com/bigquery/docs/reference/standard-sql/wildcard-table-reference

# web ページの表示回数を集計する

> ページビューとはブラウザにページが読み込まれる（再読み込される）ことです。ページビュー数は、閲覧されたページの合計数として定義される指標です。
>
> ページビュー - アナリティクス ヘルプ (https://support.google.com/analytics/answer/6086080 )より

````sql：日付ごとにページビューを集計する
SELECT
  DATE(TIMESTAMP_MICROS(event_timestamp), 'Asia/Tokyo') AS dates,
  COUNT(1) AS pageviews
FROM `プロジェクトID名.データセット名.events_*`
WHERE event_name = 'page_view'
GROUP BY 1
```

```sql:最近一週間を指定し，日付ごとにページビューを集計する
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
```

```sql:ページごとにページビューを集計する
SELECT
  (SELECT value.string_value FROM unnest(event_params) WHERE key='page_title') AS page_titles,
  COUNT(1) AS pageviews
FROM `プロジェクトID名.データセット名.events_*`
WHERE event_name = 'page_view'
GROUP BY 1
```
````
