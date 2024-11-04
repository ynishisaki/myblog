---
title: 【Three.js + Vue.js】点群データの距離を計測する
description: Three.jsとVue.jsを使って、点群データの距離を計測するサンプルコードを紹介する。
date: 2024-09-29
tag: Vue.js, Three.js, Point Cloud
---

![cover image from Unsplash](/assets/blog/20240929-threejs-point-cloud-measurements/cover.webp)

Photo by [Karsten Winegeart](https://unsplash.com/photos/a-view-of-a-mountain-range-covered-in-clouds-YYtYappKDWo) on [Unsplash](https://unsplash.com/)

## 本記事について

Three.jsとVue.jsを使って、点群データの距離を計測するサンプルコードを紹介する。

## 実装内容

- マウスクリックで点群データ上の2点を選択し、2点間の距離をメートル単位で表示できる
- 「計測開始」ボタンを押すと計測を開始できる
- 「計測終了」ボタンを押すと計測を終了できる
- 「クリア」ボタンを押すと計測した距離表示をリセット（削除）できる

### デモ

![距離を計測するデモ](/assets/blog/20240929-threejs-point-cloud-measurements/demo.gif)

### 使用した点群データ

1m四方の立方体の頂点からなるPLYファイルをサンプルとして使用した。

```ply filename="sample.ply"
ply
format ascii 1.0
element vertex 8
property float x
property float y
property float z
property uchar red
property uchar green
property uchar blue
end_header
0 0 0 255 255 255
0 0 1 255 255 255
0 1 1 255 255 255
0 1 0 255 255 255
1 0 0 255 255 255
1 0 1 255 255 255
1 1 1 255 255 255
1 1 0 255 255 255
```

### ソースコード

プロジェクトは`pnpm create vite@latest --template vue-ts`で作成した。

```vue filename="App.vue"
<script setup lang="ts">
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PLYLoader } from "three/addons/loaders/PLYLoader.js";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { onMounted, ref } from "vue";

const url = "sample.ply";

const threeElement = ref<HTMLDivElement | null>(null);

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const labelRenderer = new CSS2DRenderer();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);

const pickableObjects: THREE.Points[] = [];

const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.1; // 適宜調整
let intersects: THREE.Intersection[];

const mouse = new THREE.Vector2();

const isMeasuring = ref(false);
const isDrawingLine = ref(false);
let currentLine: THREE.Line;
const measurementLineId = ref(0);
const measurementLines: THREE.Line[] = [];
const measurementLabels: { [key: number]: CSS2DObject } = {};

function init() {
 if (!threeElement.value) return;
 const { clientWidth, clientHeight } = threeElement.value;

 // renderer
 renderer.setSize(clientWidth, clientHeight);
 threeElement.value.appendChild(renderer.domElement);

 // labelRenderer
 labelRenderer.setSize(clientWidth, clientHeight);
 labelRenderer.domElement.style.position = "absolute";
 labelRenderer.domElement.style.top = "0px";
 labelRenderer.domElement.style.pointerEvents = "none";
 threeElement.value.appendChild(labelRenderer.domElement);

 // camera
 camera.aspect = clientWidth / clientHeight;
 camera.position.set(-1, -1, -1);
 camera.lookAt(new THREE.Vector3(0, 0, 0));

 // controls
 controls.addEventListener("change", () => {
  render();
 });

 const loader = new PLYLoader();
 loader.load(
  url,
  (geometry: THREE.BufferGeometry) => {
   const material = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.05, // 適宜調整
   });
   const pointCloud = new THREE.Points(geometry, material);
   pickableObjects.push(pointCloud);
   scene.add(pointCloud);

   render();
  },
  (xhr: ProgressEvent<EventTarget>) => {
   console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
  },
  (error: unknown) => {
   console.log(error);
  }
 );

 window.addEventListener("resize", onWindowResize, false);
 document.addEventListener("mousemove", onDocumentMouseMove, false);
 renderer.domElement.addEventListener("pointerdown", handleMeasurementClick, false);
}

function onWindowResize() {
 if (!threeElement.value) return;

 const { clientWidth, clientHeight } = threeElement.value;
 camera.aspect = clientWidth / clientHeight;
 camera.updateProjectionMatrix();
 renderer.setSize(clientWidth, clientHeight);

 render();
}

function onDocumentMouseMove(event: MouseEvent) {
 if (!isMeasuring.value) return;

 mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
 mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

 if (isDrawingLine.value) {
  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObjects(pickableObjects, false);

  if (intersects.length > 0) {
   const positions = (currentLine.geometry.attributes.position as THREE.BufferAttribute).array;
   const startPoint = new THREE.Vector3(positions[0], positions[1], positions[2]);
   const currentPoint = intersects[0].point;
   positions[3] = currentPoint.x;
   positions[4] = currentPoint.y;
   positions[5] = currentPoint.z;
   currentLine.geometry.attributes.position.needsUpdate = true;

   const distance = startPoint.distanceTo(currentPoint);
   measurementLabels[measurementLineId.value].element.innerText = distance.toFixed(2) + "m";
   measurementLabels[measurementLineId.value].position.lerpVectors(startPoint, currentPoint, 0.5);
  }
  render();
 }
}

function handleMeasurementClick() {
 if (!isMeasuring.value) return;

 raycaster.setFromCamera(mouse, camera);
 intersects = raycaster.intersectObjects(pickableObjects, false);
 if (intersects.length === 0) return;

 // Draw the starting point of the line
 if (isDrawingLine.value === false) {
  const points = [];
  points.push(intersects[0].point);
  points.push(intersects[0].point.clone());
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  currentLine = new THREE.LineSegments(
   geometry,
   new THREE.LineBasicMaterial({
    color: 0xff00ff, // pink
   })
  );
  currentLine.frustumCulled = false;
  scene.add(currentLine);
  measurementLines.push(currentLine);

  const measurementDiv = document.createElement("div") as HTMLDivElement;
  measurementDiv.className = "measurementLabel";
  measurementDiv.innerText = "0.0m";
  const measurementLabel = new CSS2DObject(measurementDiv);
  measurementLabel.position.copy(intersects[0].point);
  measurementLabels[measurementLineId.value] = measurementLabel;
  scene.add(measurementLabels[measurementLineId.value]);

  isDrawingLine.value = true;
 }
 // Draw the end point of the line
 else {
  const positions = (currentLine.geometry.attributes.position as THREE.BufferAttribute).array;
  positions[3] = intersects[0].point.x;
  positions[4] = intersects[0].point.y;
  positions[5] = intersects[0].point.z;
  currentLine.geometry.attributes.position.needsUpdate = true;

  measurementLineId.value++;
  isDrawingLine.value = false;
 }

 render();
}

function handleClickMeasuringButton() {
 if (isMeasuring.value === false) {
  onMeasuringStart();
 } else {
  onMeasuringEnd();
 }
}

function onMeasuringStart() {
 isMeasuring.value = true;
 renderer.domElement.style.cursor = "crosshair";
}

function onMeasuringEnd() {
 isMeasuring.value = false;
 renderer.domElement.style.cursor = "auto";

 // Stop drawing the line
 if (isDrawingLine.value) {
  scene.remove(currentLine);
  scene.remove(measurementLabels[measurementLineId.value]);
  isDrawingLine.value = false;

  render();
 }
}

function resetMeasuring() {
 // Stop drawing
 if (isMeasuring.value) {
  onMeasuringEnd();
 }

 // Remove labels
 for (let i = 0; i < measurementLineId.value + 1; i++) {
  scene.remove(measurementLabels[i]);
 }
 for (const key in measurementLabels) {
  if (measurementLabels.hasOwnProperty(key)) {
   delete measurementLabels[key];
  }
 }
 measurementLineId.value = 0;

 // Remove lines
 measurementLines.forEach((line) => {
  scene.remove(line);
  line.geometry.dispose();
 });
 measurementLines.length = 0;

 render();
}

function render() {
 renderer.render(scene, camera);
 labelRenderer.render(scene, camera);
}

onMounted(() => {
 if (!threeElement.value) return;

 if (!WebGL.isWebGLAvailable()) {
  const warning = WebGL.getWebGLErrorMessage();
  threeElement.value.appendChild(warning);
  return;
 }

 init();
});
</script>

<template>
 <main>
  <div id="threeContainer" ref="threeElement" />
  <div id="measurementToolContainer">
   <button @click="handleClickMeasuringButton">計測{{ isMeasuring ? "終了" : "開始" }}</button>
   <button @click="resetMeasuring">クリア</button>
  </div>
 </main>
</template>

<style>
body {
 margin: 0;
}

main {
 height: 100vh;
}

.measurementLabel {
 color: black;
 font-size: 12px;
 font-weight: bold;
 text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
}

#threeContainer {
 width: 100%;
 height: 100%;
}

#measurementToolContainer {
 position: fixed;
 top: 0;
 right: 0;
 margin: 16px;
 display: flex;
 gap: 8px;
}
</style>
```

## 参考

[Raycaster Measurements - Three.js Tutorials](https://sbcode.net/threejs/measurements/)
