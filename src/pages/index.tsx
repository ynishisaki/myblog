import Head from "next/head";
import { useState } from "react";
import FixedBackgroundImage from "../components/common/FixedBackgroundImage";
import Header from "../components/common/Header";
import MiniFooter from "../components/common/MiniFooter";
import { VirtualPosts } from "../components/home/VirtualPosts";
import { getAllPosts } from "../lib/api";

export default function Home({
  posts,
}: {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
    coverImagePath: string;
    coverImagePhotographer: string;
    coverImageSrcUrl: string;
    date: string;
    category: string;
  }[];
}) {
  return (
    <>
      <Head>
        <title>Home｜もにょblog</title>
        <meta name="description" content="もにょのテックブログ。" />
        {/* og */}
        <meta property="og:site_name" content="もにょblog" />
        <meta property="og:title" content="Home｜もにょblog" />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://www.monyoblog.com/" />
        {/* <meta property='og:image' content='' /> */}
        <meta property="og:description" content="もにょのテックブログ。" />
        {/* twitter */}
        <meta name="twitter:title" content="もにょblog" />
      </Head>
      <FixedBackgroundImage />
      <Header />
      <main className="mt-[50px]">
        <VirtualPosts props={posts} />
      </main>
      <MiniFooter />
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPosts([
    "slug",
    "title",
    "excerpt",
    "date",
    "category",
    "coverImagePath",
    "coverImagePhotographer",
    "coverImageSrcUrl",
    "content",
  ]);

  return {
    props: {
      posts: posts,
    },
  };
};
