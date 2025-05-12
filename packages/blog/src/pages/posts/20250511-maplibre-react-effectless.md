---
title: 【MapLibre GL JS + React】useEffect多用からの脱却を試みた話
description: useEffectの処理をイベントハンドラーに集約することで、副作用の実行タイミングを明示的に管理できるようになった。
date: 2025-05-11
tag: MapLibre GL JS, React
slug: 20250511-maplibre-react-effectless
---

![cover image from Unsplash](/assets/blog/20250511-maplibre-react-effectless/cover.webp)

Photo by [James Lee](https://unsplash.com/photos/two-glowing-jellyfish-drift-in-the-blue-water-IljRc12rpYI) on [Unsplash](https://unsplash.com/)

## 本記事の概要

- MapLibre GL JS + Reactの地図アプリで`useEffect`を多用した結果、副作用の実行タイミングが複雑化し、制御が難しくなった
- React公式ドキュメントには、副作用をイベントハンドラー内に記述する例が紹介されている
- `useEffect`の代わりにイベントハンドラー内にセッター関数と副作用をまとめて記述することで、副作用の実行タイミングを明示的にし、意図しないタイミングでの発火を防ぐことができるようになった

## Before（useEffectを使用したパターン）

以下は、地形レイヤーの3D/2D表示の状態管理を行うためのカスタムフックである。

```ts
export default function use3DView({ map }: Props) {
  const [is3DView, setIs3DView] = useState(true);

  useEffect(() => {
    if (!map) return;
    
    // 地図のスタイル読み込みが終わっているかの確認
    // 省略

    // 地形レイヤーを3D/2Dに切り替える
    map.setTerrain({
      source: "terrain",
      exaggeration: is3DView ? 1 : 0,
    });
  }, [map, is3DView]);

  // 3D/2D切り替えボタンに渡す
  return { is3DView, setIs3DView };
}
```

このコードにはいくつかの問題がある。  
まず、`useEffect`の実行タイミングによっては、`map`が存在していなかったり、スタイルの読み込みが完了する前に`setTerrain`が実行されてしまう可能性がある。  
そのため、毎回`map`の存在チェックや`isStyleLoaded`の確認といったコードを先頭に書く必要があり、実装が煩雑になりやすい。

加えて、アプリの規模が大きくなるにつれて地図レイヤーの数も増え、それに伴い`useEffect`の依存配列も複雑化していった。
結果として、「いつ、何によって、どの副作用が実行されるのか」が把握しづらくなり、予期しない挙動が発生しやすい状態になっていた。

## After（useEffectを使用しないパターン）

[Reactの公式ドキュメントのサンプルコード](https://ja.react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers)を参考に、副作用をイベントハンドラー内で記述するやり方に変えた。

```ts
export default function use3DView({ map }: Props) {
  const [is3DView, setIs3DView] = useState(true);

  const updateTerrainView = useCallback(
    (nextIs3DView: boolean) => {
      if (!map) return;

      // ユーザー操作に応じて、地形レイヤーの3D/2D表示を切り替える
      map.setTerrain({
        source: "terrain",
        exaggeration: nextIs3DView ? 1 : 0,
      });
    },
    [map]
  );

  // 3D/2D切り替えボタン用イベントハンドラ
  const onToggle3DView = useCallback(
    (nextIs3DView: boolean) => {
      setIs3DView(nextIs3DView);
      updateTerrainView(nextIs3DView);
    },
    [updateTerrainView]
  );

  // 3D/2D切り替えボタンに渡す
  return { is3DView, onToggle3DView };
}
```

この書き方により、3D/2D表示の切り替え処理の実行タイミングが明示的になり、意図しないタイミングでの発火を防ぐことができるようになった。

## まとめ

- `useEffect`を多用した結果、意図しないタイミングでの副作用の発火を制御するのに苦労した
- Reactでは、状態更新のトリガーがユーザーの操作によるものの場合、イベントハンドラーに副作用を記述することが推奨される
- 地図アプリではユーザー操作が副作用のトリガーになる場面が多いため、イベントハンドラーに処理を集約する設計が特に有効だと感じた

## 参考にしたReact公式ドキュメント 関連ページ

- [副作用を引き起こせる場所 - React](https://ja.react.dev/learn/keeping-components-pure#where-you-_can_-cause-side-effects)
- [そのエフェクトは不要かも - React](https://ja.react.dev/learn/you-might-not-need-an-effect)
