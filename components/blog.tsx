import { Box, Image } from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export const Blog = ({ title }: { title: string }) => {
  const router = useRouter();

  axios.get('https://zipcloud.ibsnet.co.jp/api/search?zipcode=7830060').then((value) => {
    console.log(value);
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {/* react-router の型使い方を再考する */}
          ブログをつくったよ
        </h1>

        <h2 className={styles.subtitle}>REACTとなんかでつくりました</h2>

        <p className={styles.text}>
          @types/react-router v5.1.9 react-router の型定義は受け取るパスが全て文字列のため、 以前は
          TS コンパイラでパスの間違いを検出できませんでした。 そのため僕は typed-path-builder
          というライブラリを作って次の記事を書きました。
          https://zenn.dev/stin/articles/introduce-typed-path-builder typed-path-builder は
          TypeScript の template literal types を駆使していますが、 @types/react-router v5.1.9
          もそれを利用してパスパラメータを推論するように変更が加えられていました。 業務で v4
          系を使っていて更新していなかったためこの変更にまったく気づいていませんでした。「いつの間に…！」と思って
          DefinitedlyTyped のプルリクエストを探してみたら、なんと 2020 年 12 月 28 日
          にマージされています。
        </p>

        <p className={styles.text}>
          {/* <pre> */}
          @types/react-router v5.1.9<br></br>
          react-router の型定義は<br></br>
          受け取るパスが全て文字列のため、<br></br>
          以前は TS コンパイラで<br></br>
          パスの間違いを検出できませんでした。 そのため僕は typed-path-builder
          というライブラリを作って次の記事を書きました。
          https://zenn.dev/stin/articles/introduce-typed-path-builder typed-path-builder は
          TypeScript の template literal types を駆使していますが、 @types/react-router v5.1.9
          もそれを利用してパスパラメータを推論するように変更が加えられていました。<br></br>
          業務で v4
          系を使っていて更新していなかったためこの変更にまったく気づいていませんでした。「いつの間に…！」と思って
          DefinitedlyTyped のプルリクエストを探してみたら、なんと 2020 年 12 月 28 日
          にマージされています。
        </p>
      </main>
    </div>
  );
};
