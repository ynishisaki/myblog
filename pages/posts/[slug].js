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
// import { ReccomendPosts } from '../../components/reccomend-posts';

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post.title}｜もにょblog</title>
        <meta name='description' content={post.excerpt} />
        {/* og */}
        <meta property='og:site_name' content='もにょblog' />
        <meta property='og:title' content={post.title} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={`https://www.monyoblog.com/posts/${post.slug}/`} />
        <meta property='og:image' content={`https://www.monyoblog.com${post.coverImagePath}`} />
        <meta property='og:description' content={post.excerpt} />
        {/* twitter */}
        <meta property='twitter:image' content={`https://www.monyoblog.com${post.coverImagePath}`} />
        <meta name='twitter:title' content={post.title} />
      </Head>
      <HeaderAndFooter>
        <Box layerStyle={'post_base'}>
          <Box layerStyle={'post_display'}>
            <PostHeader
              title={post.title}
              coverImagePath={post.coverImagePath}
              coverImagePhotographer={post.coverImagePhotographer}
              coverImageSrcUrl={post.coverImageSrcUrl}
              date={post.date}
              category={post.category}
            />
            <PostBody content={post.content} />
            {/* {posts.map((each_post) => {
              if (post.category == each_post.category) {
                return (
                  <ReccomendPosts
                    title={post.title}
                    coverImagePath={post.coverImagePath}
                    coverImageSrcUrl={post.coverImageSrcUrl}
                    category={post.category}
                  ></ReccomendPosts>
                );
              }
            })} */}
          </Box>
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
    'coverImagePath',
    'coverImagePhotographer',
    'coverImageSrcUrl',
    'date',
    'category',
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
