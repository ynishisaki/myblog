import { Box, Center } from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import { HeaderAndFooter } from '../components/large/HeaderAndFooter';
import { HomePosts } from '../components/medium/HomePosts';
import { FixedBackgroundImage } from '../components/small/FixedBackgroundImage';
import { HoverButton } from '../components/small/HoverButton';
import { getAllPosts } from '../lib/api';

export default function Home({
  posts,
}: {
  posts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    coverImagePath: string;
    coverImagePhotographer: string;
    coverImageSrcUrl: string;
    date: string;
    category: string;
  }>;
}) {
  const initialState = 2;
  const [postCount, setCount] = useState(initialState);
  const ReadMorePosts = () => {
    setCount(postCount + 3);
  };

  return (
    <>
      <Head>
        <title>Home｜もにょblog</title>
        <meta name='description' content='もにょのテックブログ。' />
        {/* og */}
        <meta property='og:site_name' content='もにょblog' />
        <meta property='og:title' content='Home｜もにょblog' />
        <meta property='og:type' content='blog' />
        <meta property='og:url' content='https://www.monyoblog.com/' />
        {/* <meta property='og:image' content='' /> */}
        <meta property='og:description' content='もにょのテックブログ。' />
        {/* twitter */}
        <meta name='twitter:title' content='もにょblog' />
      </Head>
      <FixedBackgroundImage />
      <HeaderAndFooter>
        <Box layerStyle={'base'}>
          <Box layerStyle={'home_display'}>
            {posts.slice(0, postCount + 1).map((post) => {
              return (
                <HomePosts
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  coverImagePath={post.coverImagePath}
                  coverImagePhotographer={post.coverImagePhotographer}
                  coverImageSrcUrl={post.coverImageSrcUrl}
                  date={post.date}
                  category={post.category}
                />
              );
            })}
            {postCount + 1 !== posts.length && (
              <Center>
                <HoverButton onClick={ReadMorePosts} areaLabel='read more posts'>
                  <>前の記事</>
                </HoverButton>
              </Center>
            )}
          </Box>
        </Box>
      </HeaderAndFooter>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPosts([
    'slug',
    'title',
    'excerpt',
    'date',
    'category',
    'coverImagePath',
    'coverImagePhotographer',
    'coverImageSrcUrl',
    'content',
  ]);

  return {
    props: {
      posts: posts,
    },
  };
};
