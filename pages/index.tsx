import { Button, Center, Box } from '@chakra-ui/react';
import { HomePosts } from '../components/home-posts';
import { HeaderAndFooter } from '../components/header-and-footer';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { getAllPosts } from '../lib/api';
import { useState } from 'react';

const Home = ({
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
  }>;
}) => {
  const initialState = 2;
  const [postCount, setCount] = useState(initialState);
  const ReadMorePosts = () => {
    setCount(postCount + 2);
  };

  const router: NextRouter = useRouter();

  return (
    <html prefix='og: https://ogp.me/ns#'>
      <Head>
        <meta charSet='utf-8' />
        <title>Home｜もにょblog</title>
        <meta name='author' content='monyo'></meta>
        <meta
          name='description'
          content='もにょの成長記録です。プログラミング（Python、JavaScript）の話が多いかな。'
        />
        <meta property='og:site_name' content='もにょblog' />
        <meta property='og:title' content='Home｜もにょblog' />
        <meta property='og:type' content='blog' />
        <meta property='og:url' content='https://www.monyoblog.com/' />
        {/* <meta property='og:image' content='' /> */}
        <meta
          property='og:description'
          content='もにょの成長記録です。プログラミング（Python、JavaScript）の話が多いかな。'
        />
        <meta property='og:locale' content='ja_JP' />
        {/* for twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@monyo75559702' />
        <meta name='twitter:player' content='@monyo75559702' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HeaderAndFooter>
        <Box layerStyle={'display'}>
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
              />
            );
          })}
          {postCount + 1 !== posts.length && (
            <Center pt={'10'}>
              <Button
                onClick={ReadMorePosts}
                aria-label={'read more posts'}
                variant={'outline'}
                textStyle={'h1'}
                pt={'1'}
                // borderColor={'#4d5156'}
                borderColor={'gray.500'}
                _hover={{ bg: 'gray.50' }}
              >
                前の記事
              </Button>
            </Center>
          )}
        </Box>
      </HeaderAndFooter>
    </html>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts([
    'slug',
    'title',
    'excerpt',
    'date',
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
}

export default Home;
