---
title: Docker で Intel Fortran 実行環境を構築する
description: Docker を活用して Fortran 環境を簡単にセットアップし、コンパイルと実行を行う方法を紹介する。
date: 2023-10-24
tag: Docker, Fortran
slug: 20231024-ifort-docker-setup
---

![cover image from Unsplash](/assets/blog/20231024-ifort-docker-setup/cover.webp)

Photo by [Mason Jones](https://unsplash.com/photos/selective-focus-photography-of-green-iguana-eNulyu7PzZU) on [Unsplash](https://unsplash.com/)

## 本記事について

Docker を活用して Fortran 環境を簡単にセットアップし、コンパイルと実行を行う方法を紹介する。

## ディレクトリ構成

```txt
.
├── Dockerfile
├── Makefile
└── hello.f90
```

## ファイルの内容

Hello, World!するだけのプログラムでテストする。

```fortran-free-form
program hello
  implicit none
  write(*, *) 'Hello, World!'
end program hello
```

```make
FC = ifort

hello: hello.f90
 $(FC) -o hello hello.f90
```

Intel から oneAPI の公式 Docker イメージ[intel/oneapi-hpckit](https://hub.docker.com/r/intel/oneapi-hpckit/)が提供されているので、これを利用する。

```dockerfile
FROM intel/oneapi-hpckit:2023.0.0-devel-ubuntu20.04

RUN apt-get update \
 && apt-get install -y --no-install-recommends make

COPY . .
RUN make

CMD ["./hello"]
```

## コンテナのビルドと実行

`ifort-hello`という名前でイメージを作成する。  
※ `intel/oneapi-hpckit`イメージの pull に結構時間かかります

```sh
docker build -t ifort-hello .
```

コンテナの起動。`./hello`が実行される。

```sh
$ docker run --rm ifort-hello
Hello, World!
```

これで OK。

## コンテナの軽量化

上記で作成したイメージはなんと 17GB もあるので、マルチステージビルドを利用して軽量化する。

コンパイルは`intel/oneapi-hpckit`イメージで行い、実行ファイルと必要なライブラリだけを`ubuntu:20.04`イメージにコピーする。

```dockerfile
FROM intel/oneapi-hpckit:2023.0.0-devel-ubuntu20.04 as build

RUN apt-get update \
 && apt-get install -y --no-install-recommends make

COPY . .
RUN make


FROM ubuntu:20.04

COPY --from=build /opt/intel/oneapi/mpi/2021.8.0 /opt/intel/oneapi/mpi/2021.8.0
COPY --from=build /opt/intel/oneapi/compiler/2023.0.0 /opt/intel/oneapi/compiler/2023.0.0
ENV LD_LIBRARY_PATH="/opt/intel/oneapi/compiler/2023.0.0/linux/compiler/lib/intel64_lin:$LD_LIBRARY_PATH"

COPY --from=build ./hello ./hello

CMD ["./hello"]
```

コンテナのビルドと起動のコマンドは同じ。

&emsp;

作成されたイメージのサイズを確認してみる。

```txt
$ docker image ls
REPOSITORY        　(略)     　　SIZE
ifort-hello-slim 　 (略)　　   　　　4.86GB
ifort-hello       　(略)　　　   　　17.3GB
```

`ifort-hello-slim`がマルチステージビルドを利用した場合のイメージ。  
マルチステージビルドを利用することで、10GB 以上もサイズを削減できた。
