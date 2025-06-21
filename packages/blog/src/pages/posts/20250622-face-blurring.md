---
title: 【TensorFlow.js】画像の顔を自動で検出してぼかす
description: TensorFlow.jsとsharpを使って、画像内の顔を検出し、ぼかしを行う方法を紹介する。 
date: 2025-06-22
tag: TensorFlow.js, sharp, 画像処理, Node.js
slug: 20250622-face-blurring
---


![cover image from Unsplash](/assets/blog/20250622-face-blurring/cover.webp)

Photo by [ONUR KURT](https://unsplash.com/@bykurt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-blurry-photo-of-a-woman-standing-in-front-of-a-body-of-water-XPf9VLspq7E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

## 本記事について

TensorFlow.jsとsharpを使って、画像内の顔を検出し、ぼかしを行う方法を紹介する。

### 実行環境と前提

- Node.js（Apple Silicon Macで検証）
- GPUは使用せず、CPUバックエンドを使用

## 入力画像と出力イメージ

### 入力画像

[`@tensorflow-models/face-detection`のテストデータ](https://github.com/tensorflow/tfjs-models/blob/master/face-detection/test_data/portrait.jpg)より拝借。

![shallow focus photography of man in white shirt](/assets/blog/20250622-face-blurring/input.webp)

### 出力画像例（顔をぼかし処理）

![blurred faces in image](/assets/blog/20250622-face-blurring/output.webp)

## セットアップ手順

TensorFlow.jsの諸々と、画像のぼかし処理用にsharpをインストールする。  
今回nodeで実行するので、`@tensorflow/tfjs-node`を使用する。

```bash
pnpm init
pnpm add @tensorflow/tfjs-core @tensorflow/tfjs-node @tensorflow-models/face-detection sharp
```

このままコードを実行すると、以下のようなエラーが発生した。

```bash
Error: The Node.js native addon module (tfjs_binding.node) can not be found at path:<省略>/node_modules/.pnpm/@tensorflow+tfjs-node@4.22.0_seedrandom@3.0.5/node_modules/@tensorflow/tfjs-node/lib/napi-v8/tfjs_binding.node. 
Please run command 'npm rebuild @tensorflow/tfjs-node --build-addon-from-source' to rebuild the native addon module. 
If you have problem with building the addon module, please check https://github.com/tensorflow/tfjs/blob/master/tfjs-node/WINDOWS_TROUBLESHOOTING.md or file an issue.
```

エラー内容に従い`npm rebuild @tensorflow/tfjs-node --build-addon-from-source`を実行しておく。

## 顔検出+ぼかし処理のコード解説

顔検出の出力として、顔のバウンディングボックスが画像ピクセル空間でのx,y座標で得られる。この範囲を`sharp`に渡して顔部分を切り出し、ぼかし処理を行う。

注意点としては、nodeで実行する際は、`@tensorflow-models/face-detection`の顔検出処理はCPUバックエンドしか対応していないっぽいため、`tf.setBackend("cpu");`行にてバックエンドの切り替えを行う必要がある。

```ts
import * as faceDetection from "@tensorflow-models/face-detection";
import * as tf from "@tensorflow/tfjs-node";
import fs from "node:fs/promises";
import sharp from "sharp";

interface CompositeInput {
  input: Buffer;
  top: number;
  left: number;
}

async function faceBlurring(inputPath: string, outputPath: string) {
  // Create detector
  const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
  const detector = await faceDetection.createDetector(model, {
    runtime: "tfjs",
  });

  // Load image
  const imageBuffer = await fs.readFile(inputPath);
  const tensor = tf.node.decodeImage(imageBuffer) as tf.Tensor3D;

  // Detect faces
  tf.setBackend("cpu");  // 注意点
  const faces = await detector.estimateFaces(tensor);

  if (faces.length === 0) {
    await fs.copyFile(inputPath, outputPath);
    return;
  }

  // Process detected faces
  const compositeInputs: CompositeInput[] = [];

  for (const face of faces) {
    const box = face.box;
    const boundingBox = {
      x: Math.floor(box.xMin),
      y: Math.floor(box.yMin),
      width: Math.ceil(box.width),
      height: Math.ceil(box.height),
    };

    const blurredFaceBuffer = await sharp(imageBuffer)
      .extract({
        left: boundingBox.x,
        top: boundingBox.y,
        width: boundingBox.width,
        height: boundingBox.height,
      })
      .blur(10)
      .toBuffer();

    compositeInputs.push({
      input: blurredFaceBuffer,
      top: boundingBox.y,
      left: boundingBox.x,
    });
  }

  // Composite and save
  let processedImage = sharp(imageBuffer);
  if (compositeInputs.length > 0) {
    processedImage = processedImage.composite(compositeInputs);
  }
  await processedImage.toFile(outputPath);

  return;
}
```

## 実行方法

実行は以下のように行った。

```ts
const inputImagePath = "input.jpg";
const outputImagePath = "output.jpg";

faceBlurring(inputImagePath, outputImagePath);
```

実行時に以下のような警告が出るが、ちゃんと出力できているので問題ないこととする。

```bash
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================
(node:32175) [DEP0051] DeprecationWarning: The `util.isNullOrUndefined` API is deprecated. Please use `arg === null || arg === undefined` instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

## 参考

- [tfjs-models/face-detection at master · tensorflow/tfjs-models](https://github.com/tensorflow/tfjs-models/tree/master/face-detection#face-detection)
- [Kernel 'Transform' not registered for backend 'tensorflow' · Issue #6437 · tensorflow/tfjs](https://github.com/tensorflow/tfjs/issues/6437)
