import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import Head from 'next/head';
import markdownToHtml from 'zenn-markdown-html';
import 'zenn-content-css';
import { PostHeader } from '../../components/post-header';
import { PostBody } from '../../components/post-body';
import { HeaderAndFooter } from '../../components/header-and-footer';

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>{post.title}｜もにょblog</title>
        <meta name='author' content='monyo'></meta>
        <meta name='description' content={post.excerpt} />
        <meta property='og:site_name' content='もにょblog' />
        <meta property='og:title' content={post.title} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={`https://www.monyoblog.com/posts/${post.slug}/`} />
        <meta property='og:image' content={`https://www.monyoblog.com/${post.coverImage}`} />
        <meta property='og:description' content={post.excerpt} />
        <meta property='og:locale' content='ja_JP' />
        {/* for twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@monyo75559702' />
        <meta name='twitter:player' content='@monyo75559702' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HeaderAndFooter>
        <Box layerStyle={'display'}>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            coverImagePhotographer={post.coverImagePhotographer}
            coverImageSrc={post.coverImageSrc}
            date={post.date}
          />
          <PostBody content={post.content} />
        </Box>
      </HeaderAndFooter>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'excerpt',
    'coverImage',
    'coverImagePhotographer',
    'coverImageSrc',
    'date',
    'content',
  ]);

  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

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
