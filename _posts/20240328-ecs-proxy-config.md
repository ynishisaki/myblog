---
title: 'AWS ECSをプロキシ経由でネットワーク接続する'
excerpt: 'ECSからプロキシ経由でインターネットに接続する方法について、AWS公式ガイドを元に大まかな流れと注意点をまとめる。'
coverImagePath: '/assets/blog/20240328-ecs-proxy-config/cover.jpg'
coverImagePhotographer: 'Wolfgang Hasselmann'
coverImageSrcUrl: 'https://unsplash.com/photos/a-white-and-yellow-flower-in-a-pond-of-water-lilies-C_p73VZemp0'
date: '2024-3-27'
category: 'AWS'
---

## 本記事について

ECSからプロキシ経由でインターネットに接続する方法について、AWS公式ガイドを元に大まかな流れと注意点をまとめる。
VPCエンドポイントやNATゲートウェイは使用しない。

https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/http_proxy_config.html

## 作業の流れ

ECSにはAmazon ECS コンテナインスタンスを使用する。コンテナインスタンスとはつまるところ、EC2のことであると私は認識している。
EC2インスタンスにプロキシ設定を追加し、ECS上でコンテナを実行する際にEC2を使用するという流れになる。

1. ECSクラスターの作成
   特別な設定は不要。  
   この時作成したクラスター名は次のEC2インスタンスのユーザーデータ設定に使用する。

2. EC2インスタンスの立ち上げ
   起動時のユーザーデータ設定にECSで利用するための設定とプロキシ設定を加える。
   あるいはインスタンス起動後に手動で設定してもよい。

https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/launch_container_instance.html

3. ECSでコンテナインスタンスが利用可能であることを確認する
   クラスターのコンテナインスタンスタブで登録されていることを確認する。
   ![Image from Gyazo](https://i.gyazo.com/91a086358f06036ae269ceee5201b27e.png)_コンテナインスタンスの登録を確認できる画面例。_

4. ECSでサービスorタスク起動
   コンピューティングオプションで起動タイプを選択、起動タイプはEC2を選択する。
   ![Image from Gyazo](https://i.gyazo.com/ef433ca637aa90e3cc0e826e2d2f03cd.png)_サービス新規作成時の画面。_

## 注意点

- どうやらFargateは利用できないみたい？
  また、Fargate不可に伴いキャパシティープロバイダー戦略は選択できない。

- EC2インスタンスの作成は、AWSが用意するAmazon ECS 対応 AMIを利用するのが公式ガイドで紹介されている方法で、この通りにやるのが一番簡単。
  というのも、ECSコンテナインスタンスとして利用するには、EC2にAmazon ECSコンテナエージェントのインストールが必要なのだが、Amazon ECS 対応 AMIはECSコンテナエージェントがインストール済みだからである。
  上記AMI以外からEC2を立ち上げる場合は、ECSコンテナエージェントのインストール作業が別途必要となる。

https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/ecs-agent-install.html

- AWS SDKsを使用している場合、コード内にプロキシ設定を追加する必要がある。
  例えばAWS SDK for Python (Boto3)の場合、以下のようにプロキシ設定を追加することができる。

```python
import boto3
import botocore

session = boto3.Session()
s3 = session.client(
    "s3",
    config=botocore.client.Config(
        proxies={
            "http": "http://proxy.example.com:3128",
            "https": "http://proxy.example.com:3128",
        }
    ),
)
```
