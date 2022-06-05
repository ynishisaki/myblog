---
title: 'Pythonでバイナリファイルを読んでみよう'
excerpt: 'Pythonを用いたバイナリファイルの読み込み方法を紹介する。
本記事ではWAVファイルを例として使用し、サンプリングレートと時系列データを取得することを目指す。'
coverImage: '/assets/blog/20220504-open-graph-protocol/cover.jpg'
coverImagePhotographer: 'Persnickety Prints'
coverImageSrc: 'https://unsplash.com/photos/98uOSdqum6E'
date: '2022-06-04'
---
# 本記事の内容
Pythonでバイナリファイルを読み込むする方法を紹介する。
具体的には、WAV（Waveform Audio File Format）ファイルを例として使用し、サンプリングレートと時系列データを取得することを目指す。

本記事は前編にあたる。後編はこちら。

# 目次

（前編）　
0 WAVファイルの作成
1 WAVファイルのフォーマットについて
2 バイナリモードでファイルを開く
3 バイナリファイルのランダムアクセス

（後編）
4 バイト列をintに変換
5 バイト列をfloatに変換
6 バイト列をndarrayに変換
7 WAVファイルから、サンプリングレートと時系列データを取得

# 0. WAVファイルの作成
まずは、読み込みの練習に用いるWAVファイルを作成する。
WAVファイルの作成には、pysoundfileを用いる。

pysoundfileの詳細はこちら。
https://pysoundfile.readthedocs.io/en/latest/

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
*出力結果。*

WAVファイル（new_file.wav）が作成された。
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
これを、pysoundfileを用いず、取得できるようになることを目指す。

# 1. WAVファイルのフォーマットについて

作成したWAVファイル（new_file.wav）を、バイナリエディタで開いてみる。

ブラウザなら、こちらが便利。
https://www.oh-benri-tools.com/tools/programming/hex-editor

開いてみると、こんな感じ。
![Image from Gyazo](https://i.gyazo.com/a0d7260ccaa3f6f7546527ce9379b336.png)
*（出所：https://www.oh-benri-tools.com/tools/programming/hex-editor ）WAVファイル（new_file.wav）を開いた状態。*

「バイナリ（=2進数）」だから、実際のファイルの中身は「0」か「1」なのだが、エディタ上では16進数で表現される。

2桁ごとにスペースが空いているのは、ファイルの読み書きは、バイト単位で行われるからである。

バイトとビット、2進数と16進数の関係は、以下の通り。

```
1 byte = 8 bit

8 bit : 2**8 通り、すなわち2進数だと8桁で表現される
      : 2**8 = 16**2 通り、すなわち16進数だと2桁で表現される
```

つまり、先頭から1バイトづつ読むということは、2桁ずつ読むことになるので、

```
52(16)、49(16)、46(16)、46(16)、....
```
となる。このとき(16)は16進数を意味する。

なお、左列が行番号（16進数表記）、右列がASCIIでエンコードしたものである。

...だんだん説明が面倒になってきたので、エディタの見方はここまでとする。

## WAVファイルのフォーマット

WAVファイルのフォーマットについては、これらを参考にした。
https://ja.wikipedia.org/wiki/WAV
https://www.youfit.co.jp/archives/1418
https://docs.fileformat.com/audio/wav/

細かい話は置いておいて（私自身よくわかっていない）、ざっくり読んでいくと、
以下のことが読み取れる。

| byte | タグ名（4文字固定） |
| ---- | ---- |
| 1-4 | RIFF |
| 9-12 | WAVE |
| 13-16 | fmt  |
| 37-40 | data |

サンプリングレートと時系列データを取得するのが目的であるが、
"fmt "に、サンプリングレート等フォーマットに関する情報が、
"data"に、時系列データが入っているようだ。

|byte|size|値|説明|説明|
| ---- | ---- | ---- | ---- | ---- |
|13-16|4|"fmt "|fmt識別子|"fmt "(0x666D7420)で固定。|
|17-20|4|10 00 00 00|fmtチャンクのバイト数|リニアPCMならば16(0x10000000)|
|21-22|2|01 10|音声フォーマット|1:非圧縮のリニアPCMフォーマットは1(0x0100)|
|23-24|2|01 10|チャンネル数|モノラルは1|
|25-28|4|E8 03 00 00|サンプリング周波数|(Hz)|
|29-32|4|D0 07 00 00|1 秒あたりバイト数の平均|サンプリング周波数 * ブロックサイズで求める|
|33-34|2|02 00|ブロックサイズ|チャンネル数 * 1サンプルあたりのビット数 / 8で求める|

# 2. バイナリモードでファイルを開く

open関数のmode引数に'b'を追加すればよい。
https://docs.python.org/ja/3/library/functions.html?highlight=open#open


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

バイナリモードで開かれたファイルでは、読み込んだデータはデコードされずにbytes型として返される。
バイト列は、sliceによるデータの切り出しが可能。

# 3. バイナリファイルのランダムアクセス

ランダムアクセスとは、ファイルの読み込み位置を自由に移動することである。
効率の良いファイルの読み書きには必須。

先ほどは、ファイルの最初から最後まで全データを読み込んでいたが、
次は、必要なデータ部分に適宜移動（シーク）して、最小限のデータを読み込んでいく方法を紹介する。

シークの指定には、以下の3種類がある。

```python:
x  # シーク量は負の値も使用可能

fin.seek(x, os.SEEK_CUR)  # 現在位置から、x byte
fin.seek(x, os.SEEK_SET)  # ファイル先頭位置から、x byte
fin.seek(x, os.SEEK_END)  # ファイル終了位置から、x byte
```
詳細はこちら。
https://docs.python.org/ja/3/library/os.html?highlight=seek#os.lseek

以下にランダムアクセスの一例を示す。
read()またはwrite()すると、読み込みまたは書き込みした分だけ現在位置が移動することに注意したい。

```python:バイナリモードでファイルを開き、ランダムアクセスで読み込む
    import os

    with open('new_file.wav', mode="rb") as fin:  # r: 読み込み、b: バイナリモード
        # 現在位置: 0 byte

        data_all = fin.read()         # 現在位置（0 byte）からファイルの終わりまで全部読み込む
        # 現在位置: (end) byte

        fin.seek(0, os.SEEK_SET)       # ファイル先頭から0バイト目（0 byte）に移動
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

    print(f'data type: {type(data_all)}')
    print(f'data all = {data_all}')
    print()
    print(f'data 1-4 byte = {data_1_4_byte}')
    print(f'data 9-12 byte = {data_9_12_byte}')
    print(f'data 13-16 byte = {data_13_16_byte}')
    print(f'data 37-40 byte = {data_37_40_byte}')
```

```:出力結果
data type: <class 'bytes'>
data all = b'RIFFDN\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00\xe8\x03\x00\x00\xd0\x07\x00\x00\x02\x00\x10\x00data N\x00\x00\x00\x00 \x00A\x00b\x00\x83\x00\xa3\x00\xc4\x00\xe5\x00\x06\x01&\x01G\x01h\x01\x89\x01\xa9\x01\xca ...(省略)'

data 0-4 byte = b'RIFF'
data 8-12 byte = b'WAVE'
data 12-16 byte = b'fmt '
data 36-40 byte = b'data'
```



# 今日のまとめ

バイナリの
これができるようになれば、2進数の世界がバイナリファイルの構造を理解する
バイナリファイルの読み込みができれば、書き込みもできるでしょう。