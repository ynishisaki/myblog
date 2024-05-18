---
title: 'Pythonでバイナリファイルを読んでみよう（前編）'
excerpt: 'Python でバイナリファイルを読む方法を紹介する。具体的には、WAVファイルからサンプリングレートと時系列データを取得することを目指す。'
coverImagePath: '/assets/blog/20220607-read-binary-file-py-1/cover.webp'
coverImagePhotographer: 'Christian Englmeier'
coverImageSrcUrl: 'https://unsplash.com/photos/QwIgqvA4-go'
date: '2022-06-07'
category: 'Python'
---

# 本記事の内容

Python でバイナリファイルを読む方法を紹介する。
具体的には、WAV（Waveform Audio File Format）ファイルから、サンプリングレートと時系列データを取得することを目指す。

本記事は前編にあたる。後編は[こちら](https://www.monyoblog.com/posts/20220710-read-binary-file-py-2/)。

# 目次

（前編）
1 WAV ファイルの作成
2 WAV ファイルのフォーマットについて大まかに説明
3 バイナリモードでファイルを開く
4 バイナリファイルのランダムアクセス

（後編）
1 WAV ファイルの準備
2 WAV ファイルのフォーマットについて
3 サンプリングレートと時系列データをバイト列で取得
4 バイト列を int に変換
5 バイト列を ndarray に変換
6 WAV ファイルから、サンプリングレートと時系列データを取得

# 0. WAV ファイルの作成

まずは、読み込みの練習に用いる WAV ファイルを作成する。
WAV ファイルの作成には、pysoundfile を用いる。

pysoundfile の詳細はこちら。
<https://pysoundfile.readthedocs.io/en/latest/>

```python:sin波作成、WAVファイルに変換
import numpy as np
import matplotlib.pyplot as plt
import soundfile as sf  # WAVファイルの読み書きに使用

# sin波のパラメータを設定
record_length = 10    # 記録長[sec]
sampling_rate = 1000  # サンプリングレート[Hz]

# sin波生成
t = np.arange(start=0, stop=record_length, step=1/sampling_rate)
ft = np.sin(t)

print(f'ft = {ft}')
print(f'sampling rate = {sampling_rate} [Hz]')

# プロット
fig, ax = plt.subplots()
ax.plot(t, ft)
ax.set_xlabel('t: time')
ax.set_ylabel('ft: amplitude')
fig.show()

# 生成したsin波を，WAVファイルとして出力
sf.write('new_file.wav', ft, sampling_rate)
```

```:出力結果
data = [ 0.          0.00097656  0.00198364 ... -0.54150391 -0.5423584 -0.54318237]
sampling rate = 1000
```

![Image from Gyazo](https://i.gyazo.com/5f00546eb9008038138b6ed9281b5a6b.png)
_出力結果。_

WAV ファイル（new_file.wav）が作成された。

# 1. WAV ファイルのフォーマットについて大まかに説明

WAV ファイルのフォーマットについては、これらを参考にした。
<https://ja.wikipedia.org/wiki/WAV>
<https://www.youfit.co.jp/archives/1418>
<https://docs.fileformat.com/audio/wav/>

作成した WAV ファイル（new_file.wav）を、バイナリエディタで開いてみる。

ブラウザなら、こちらが便利。
<https://www.oh-benri-tools.com/tools/programming/hex-editor>

開いてみると、こんな感じ。
![Image from Gyazo](https://i.gyazo.com/a0d7260ccaa3f6f7546527ce9379b336.png)
_（出所：<https://www.oh-benri-tools.com/tools/programming/hex-editor> ）WAV ファイル（new_file.wav）を開いた状態。_

「バイナリ（=2 進数）」だから、実際のファイルの中身は「0」か「1」なのだが、エディタ上では 16 進数で表現される。
エディタ上では、以下の 4 つのチャンク ID が確認できる。

| byte  | チャンク ID（4 文字固定） |
| ----- | ------------------------- |
| 1-4   | "RIFF"                    |
| 9-12  | "WAVE"                    |
| 13-16 | "fmt "                    |
| 37-40 | "data"                    |

# 2. バイナリモードでファイルを開く

open 関数の mode 引数に'b'を追加すればよい。
<https://docs.python.org/ja/3/library/functions.html?highlight=open#open>

試しに、4 つのチャンク ID を狙ってデータを読み込んでみる。

```python:バイナリモードでファイルを開き、読み込む
with open('new_file.wav', mode="rb") as fin:  # r: 読み込み、b: バイナリモード
    data_all = fin.read()  # 全部データ読み込む

print(f'data type: {type(data_all)}')
print(f'data all = {data_all}')
print()
print(f'data 1-4 byte = {data_all[0:4]}')
print(f'data 9-12 byte = {data_all[8:12]}')
print(f'data 13-16 byte = {data_all[12:16]}')
print(f'data 37-40 byte = {data_all[36:40]}')
```

```:出力結果
data type: <class 'bytes'>
data all = b'RIFFDN\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00\xe8\x03\x00\x00\xd0\x07\x00\x00\x02\x00\x10\x00data N\x00\x00\x00\x00 \x00A\x00b\x00\x83\x00\xa3\x00\xc4\x00\xe5\x00\x06\x01&\x01G\x01h\x01\x89\x01\xa9\x01\xca ...(省略)'

data 1-4 byte = b'RIFF'
data 9-12 byte = b'WAVE'
data 13-16 byte = b'fmt '
data 37-40 byte = b'data'
```

バイナリモードで開かれたファイルでは、読み込んだデータはデコードされずに bytes 型として返される。
bytes 型は、slice によるデータの切り出しが可能。

# 3. バイナリファイルのランダムアクセス

ランダムアクセスとは、ファイルの読み込み位置を自由に移動することである。
効率の良いファイルの読み書きには必須。

先ほどは、ファイルの最初から最後まで全データを読み込んでいたが、
次は、必要なデータ部分に適宜移動（シーク）して、最小限のデータを読み込んでいく方法を紹介する。

シークの指定には、以下の 3 種類がある。

```python:
x  # シーク量は負の値も使用可能

fin.seek(x, os.SEEK_CUR)  # 現在位置から、x byte
fin.seek(x, os.SEEK_SET)  # ファイル先頭位置から、x byte
fin.seek(x, os.SEEK_END)  # ファイル終了位置から、x byte
```

詳細はこちら。
<https://docs.python.org/ja/3/library/os.html?highlight=seek#os.lseek>

以下にランダムアクセスの一例を示す。
read()または write()すると、読み込みまたは書き込みした分だけ現在位置が移動することに注意したい。

```python:バイナリモードでファイルを開き、ランダムアクセスで読み込む
import os

with open('new_file.wav', mode="rb") as fin:  # r: 読み込み、b: バイナリモード
    # 現在位置: 0 byte

    data_1_4_byte = fin.read(4)    # 現在位置（0 byte）から4バイト分読み込む
    # 現在位置: 4 byte

    fin.seek(4, os.SEEK_CUR)       # 現在位置（4 byte）から4バイト後ろ（8 byte）に移動
    # 現在位置: 8 byte

    data_9_12_byte = fin.read(4)   # 現在位置（8 byte）から4バイト分読み込む
    # 現在位置: 12 byte

    data_13_16_byte = fin.read(4)  # 現在位置（12 byte）から4バイト分読み込む
    # 現在位置: 16 byte

    fin.seek(20, os.SEEK_CUR)      # 現在位置（16 byte）から20バイト後ろ（36 byte）に移動
    # 現在位置: 36 byte

    data_37_40_byte = fin.read(4)  # 現在位置（36 byte）から4バイト分読み込む
    # 現在位置: 40 byte

print(f'data 1-4 byte = {data_1_4_byte}')
print(f'data 9-12 byte = {data_9_12_byte}')
print(f'data 13-16 byte = {data_13_16_byte}')
print(f'data 37-40 byte = {data_37_40_byte}')
```

```:出力結果
data 0-4 byte = b'RIFF'
data 8-12 byte = b'WAVE'
data 12-16 byte = b'fmt '
data 36-40 byte = b'data'
```

長くなったので、今日はここまで。

# 今日のまとめ

## バイナリモードでファイルを開く

open 関数の mode 引数に'b'を追加すればよい。

```python
with open('hoge', mode='rb') as fin:
```

## ランダムアクセス

シークの指定には、以下の 3 種類がある。

```python
fin.seek(x, os.SEEK_CUR)  # 現在位置から、x byte
fin.seek(x, os.SEEK_SET)  # ファイル先頭位置から、x byte
fin.seek(x, os.SEEK_END)  # ファイル終了位置から、x byte
```

# 後編はこちら

<https://www.monyoblog.com/posts/20220710-read-binary-file-py-2/>
