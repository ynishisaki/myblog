---
title: 'Pythonでバイナリファイルを読んでみよう（実践編）'
excerpt: '（本記事は実践編にあたる。）Pythonでバイナリファイルを読み込むする方法を紹介する。
具体的には、WAV（Waveform Audio File Format）ファイルを例として使用し、サンプリングレートと時系列データを取得することを目指す。'
coverImage: '/assets/blog/20220504-open-graph-protocol/cover.jpg'
coverImagePhotographer: 'Persnickety Prints'
coverImageSrc: 'https://unsplash.com/photos/98uOSdqum6E'
date: '2022-06-08'
---
# 本記事の内容
Pythonでバイナリファイルを読み込むする方法を紹介する。
具体的には、WAV（Waveform Audio File Format）ファイルを例として使用し、サンプリングレートと時系列データを取得することを目指す。

本記事は前編にあたる。後編はこちら。

# 目次

（前編）　
0 WAVファイルの作成
1 WAVファイルのフォーマットについて（概要）
2 バイナリモードでファイルを開く
3 バイナリファイルのランダムアクセス

（後編）
4 WAVファイルのフォーマットについて（fmtチャンクとdataチャンク）
5 bytes型をintに変換
6 bytes型をfloatに変換
7 bytes型をndarrayに変換
8 WAVファイルから、サンプリングレートと時系列データを取得

# 4.WAVファイルのフォーマットについて（fmtチャンクとdataチャンク）

確認のため、pysoundfileを用いて、WAVファイルのサンプリングレートと時系列データを調べる。

```python:WAVファイルの中身を確認
# WAVファイルを読み込む
data, sampling_rate = sf.read('new_file.wav')
time = np.arange(start=0, stop=len(data)/sampling_rate, step=1/sampling_rate)

print(f'data = {data}')
print(f'sampling rate = {sampling_rate} [Hz]')

# プロット
fig, ax = plt.subplots()
ax.plot(time, data)
ax.set_xlabel('time')
ax.set_ylabel('amplitude')
fig.show()
plt.show()
```

```:出力結果
data = [ 0.          0.00097656  0.00198364 ... -0.54150391 -0.5423584 -0.54318237]
sampling rate = 1000
```

![Image from Gyazo](https://i.gyazo.com/6250657a728569f663345f32e6670875.png)
*出力結果。*

時系列データとサンプリングレートが格納されていることがわかる。
これらのデータを、pysoundfileを用いず、取得できるようになることを目指す。

今回は、サンプリングレートと時系列データを取得するのが目的であるが、
**fmt**チャンクに、サンプリングレート等フォーマットに関する情報が、
**data**チャンクに、時系列データが入っているらしい。

というわけで、fmtチャンクとdataチャンクの詳細をみていく。
なお、値（デコード前）は、**リトルエンディアン**表記である点に注意。

### fmtチャンク
|byte |size|値（デコード前）|値（デコード後）|説明|
|---- |----| ----      | ---- | ---- |
|13-16|4   |66 6D 74 20|"fmt "|fmt識別子。"fmt "で固定|
|17-20|4   |10 00 00 00|16    |fmtに格納されているデータのサイズ。単位は[byte]|
|21-22|2   |01 10      |1     |音声フォーマット。1: 非圧縮のリニアPCMフォーマット[1]|
|23-24|2   |01 10      |1     |チャンネル数。1: モノラル|
|25-28|4   |E8 03 00 00|1000  |★サンプリング周波数。単位は[Hz]|
|29-32|4   |D0 07 00 00|2000  |1 秒あたりのバイト数。チャンネル数 * 1サンプルあたりのバイト数 * サンプリングレート|
|33-34|2   |02 00      |2     |ブロックサイズ。チャンネル数 * 1サンプルあたりのバイト数|
|35-36|2 |10 00    |16    |☆1サンプルあたりのビット数。16 bit = 2 byte|

[1] PCMについては、こちらをどうぞ。 https://ja.wikipedia.org/wiki/%E3%83%91%E3%83%AB%E3%82%B9%E7%AC%A6%E5%8F%B7%E5%A4%89%E8%AA%BF

### dataチャンク
|byte |size|値（デコード前）|値（デコード後）|説明|
|---- |----| ----      | ---- | ---- |
|37-40|4   |64 61 74 61|"fmt "|data識別子。"data "で固定|
|41-44|4   |20 4E 00 00|20000    |☆dataに格納されているデータのサイズ。単位は[byte]|
|45-20044|20000   |00 00 20 00 ... | [0, 32, ...] |★時系列データ。今回1サンプルあたり16 bitなので、符号あり整数で表現される。|

★が、今回読み込み対象となるデータである。
また、☆は読み込みにあたり、重要となるデータであるので、よく覚えておく。


```python:sin波作成、WAVファイルに変換
import os
import numpy as np
import matplotlib.pyplot as plt

with open('new_file.wav', mode="rb") as fin:
    fin.seek(24, os.SEEK_CUR)
    sampling_rate_bytes = fin.read(4)  # 25-28 byte: サンプリングレート
    fin.seek(16, os.SEEK_CUR)
    data_bytes = fin.read(20000)       # 45-20044 byte: 時系列データ

print('デコード前')
print(f'sampling_rate_bytes = {sampling_rate_bytes}')
print(f'data_bytes = {data_bytes}')

# デコード
sampling_rate = int.from_bytes(sampling_rate_bytes, byteorder='little', signed=False)
data = np.frombuffer(data_bytes, '<i2')

print()
print('デコード後')
print(f'sampling_rate = {sampling_rate} [Hz]')
print(f'data = {data}')

time = np.arange(start=0, stop=len(data)/sampling_rate, step=1/sampling_rate)

# プロット
fig, ax = plt.subplots()
ax.plot(time, data)
ax.set_xlabel('time')
ax.set_ylabel('amplitude')
fig.show()
plt.show()
```

```:出力結果
デコード前
sampling_rate_bytes = b'\xe8\x03\x00\x00'
data_bytes b'\x00\x00 \x00A\x00b\x00\x83\x00\xa3\x00\xc4\x00\xe5\x00\x06\x01&\x01G\x01h\x01\x89\x01\xa9\x01\xca ...(省略)'

デコード後
sampling_rate = 1000 [Hz]
data = [     0     32     65 ... -17744 -17772 -17799]
```

![Image from Gyazo](https://i.gyazo.com/5f00546eb9008038138b6ed9281b5a6b.png)
*出力結果。*




# 今日のまとめ

バイナリの
これができるようになれば、2進数の世界がバイナリファイルの構造を理解する
バイナリファイルの読み込みができれば、書き込みもできるでしょう。


バイト型から，整数・浮動小数点型に変換
Integerの場合
固定長
ndarrayとして取得
複雑なデータ構造の場合

