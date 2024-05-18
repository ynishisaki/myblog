---
title: 'Mongoose から Prisma に移行して得た恩恵、思わぬつまづきについて'
excerpt: 'Prisma への移行作業を行ってわかった、Prismaのメリットと移行時のつまづきについて紹介する。'
coverImagePath: '/assets/blog/20230717-migration-from-mongoose-to-prisma/cover.webp'
coverImagePhotographer: 'Tyler Casey'
coverImageSrcUrl: 'https://unsplash.com/photos/4uCdG0scCJ0'
date: '2023-07-17'
category: 'MongoDB'
---

# 本記事について

MongoDB を使ったプロジェクトにて、Mongoose から Prisma への移行を行った。
本記事では、Prisma への移行作業を行ってわかった、Prisma のメリットと移行時のつまづきについて紹介する。

# Prisma への移行の動機

Mongoose と Typescript の相性が悪いように感じたため。
MongoDB とそのほか RDB(PostgreSQL, MySQL)を使用したプロジェクトで、ORM ライブラリーを統一したかったため。

# Prisma への移行方法

Prisma の公式ドキュメントにて、移行手順が示されている。  
<https://www.prisma.io/docs/guides/migrate-to-prisma/migrate-from-mongoose>

Prisma での型定義・CRUD 操作の記述は直感的でわかりやすく、Prisma 初心者の筆者でも苦労なく実装することができた。

私の場合、移行に伴い DB 構造が一部変わった（id, relation 周り）ため、DB の更新反映のための作業が発生した。今回のプロジェクトは開発初期段階だったため、作業量は少なく済んだ。

# まさかのレプリケーション必須で思いきりつまづきました

Prisma で MongoDB を使用するには、Replica set の設定が必要である。

<https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb-node-mongodb#:~:text=on%20your%20machine-,Access%20to%20a%20MongoDB%204.2%2B%20server%20with%20a%20replica%20set%20deployment,.,-The%20MongoDB%20database>

今回のプロジェクトは docker を使用していたため、Replica set の設定を含めた docker コンテナの構築を試みるのだが、これが結構厄介で、構築にめちゃめちゃ時間がかかってしまった。
結果的にはコンテナ一つで Replica set を構築した。~~意味あるのかこれ......~~

# Prisma に移行して得られた恩恵

Mongoose で問題になっていた Typescript との相性の悪さは劇的に改善され、型定義が楽になり、型のチェックも正常に機能するようになった。
他にも、relation を設定すると relation の親側の削除を試みた際にエラーが発生したりと Prisma がうまい具合に働いて開発が非常に楽になった。

# まとめ

Mongoose から Prsima へ移行することで、型周りの問題が解決され、開発が非常に楽になった。

Mongoose から Prisma への移行は簡単だが、MongoDB に Replica set の設定が必要で、これを docker で環境構築しようとすると結構ハマると思う。  
移行を検討している方は、レプリケーション周りをどうするか（Atlas 使うか、docker で頑張るかなど）をよく考えてから移行を実施することをお勧めします。
