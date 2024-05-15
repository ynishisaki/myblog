import {
  Box,
  Center,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import ErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import "zenn-content-css";
import markdownHtml from "zenn-markdown-html";
import FixedBackgroundImage from "../../components/common/FixedBackgroundImage";
import HeaderAndFooter from "../../components/common/HeaderAndFooter";
import { PostContent } from "../../components/medium/PostContent";
import { PostTitle } from "../../components/posts/PostTitle";
import { getAllPosts, getPostBySlug } from "../../lib/api";

export default function Post({ post, relatedPosts }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post.title}｜もにょblog</title>
        <meta name="description" content={post.excerpt} />
        {/* og */}
        <meta property="og:site_name" content="もにょblog" />
        <meta property="og:title" content={post.title} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.monyoblog.com/posts/${post.slug}/`}
        />
        <meta
          property="og:image"
          content={`https://www.monyoblog.com${post.coverImagePath}`}
        />
        <meta property="og:description" content={post.excerpt} />
        {/* twitter */}
        <meta
          property="twitter:image"
          content={`https://www.monyoblog.com${post.coverImagePath}`}
        />
        <meta name="twitter:title" content={post.title} />
      </Head>
      <FixedBackgroundImage />
      <HeaderAndFooter>
        <Box layerStyle={"base"}>
          <Box layerStyle={"post_display"} position="relative">
            <PostTitle
              title={post.title}
              coverImagePath={post.coverImagePath}
              coverImagePhotographer={post.coverImagePhotographer}
              coverImageSrcUrl={post.coverImageSrcUrl}
              date={post.date}
              category={post.category}
            />
            <PostContent content={post.content} />
            {relatedPosts[0] ? (
              <Box mt="100" color="#4d5156">
                <Box borderTop="1px solid" borderColor="gray.300" />
                <Center fontSize="3xl" p="5">
                  関連記事
                </Center>
                <Flex>
                  {/* 関連記事を最大2つ表示する */}
                  {relatedPosts.slice(0, 2).map((post) => (
                    <LinkBox key={post.slug} as="article" mx="auto" w="40%">
                      <Image
                        width={400}
                        height={300}
                        src={post.coverImagePath}
                        alt="cover image"
                        style={{ objectFit: "cover" }}
                      />
                      <LinkOverlay
                        href={`/posts/${post.slug}/`}
                        title={post.title}
                        target="_blank"
                      >
                        <Text
                          my={"3"}
                          fontSize="sm"
                          lineHeight={1}
                          noOfLines={3}
                        >
                          {post.title}
                        </Text>
                      </LinkOverlay>
                    </LinkBox>
                  ))}
                </Flex>
              </Box>
            ) : null}
          </Box>
        </Box>
      </HeaderAndFooter>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "slug",
    "title",
    "excerpt",
    "coverImagePath",
    "coverImagePhotographer",
    "coverImageSrcUrl",
    "date",
    "category",
    "content",
  ]);

  const content =
    markdownHtml(post.content, {
      embedOrigin: "https://embed.zenn.studio",
    }) || "";

  const relatedPosts = getAllPosts([
    "slug",
    "title",
    "excerpt",
    "coverImagePath",
    "date",
    "category",
  ]).filter((p) => p.category === post.category && p.slug !== post.slug); // 同一カテゴリーの記事を取得

  return {
    props: {
      post: {
        ...post,
        content,
      },
      relatedPosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
