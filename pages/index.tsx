import Head from 'next/head';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import { Button, Center, Box } from '@chakra-ui/react';
import { HomePosts } from '../components/home-posts';
import { HeaderAndFooter } from '../components/header-and-footer';
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
      <Head>
        <title>Home｜もにょblog</title>
        <meta
          name='description'
          content='もにょの成長記録です。プログラミング（Python、JavaScript）の話が多いかな。'
        />
        {/* og */}
        <meta property='og:site_name' content='もにょblog' />
        <meta property='og:title' content='Home｜もにょblog' />
        <meta property='og:type' content='blog' />
        <meta property='og:url' content='https://www.monyoblog.com/' />
        {/* <meta property='og:image' content='' /> */}
        <meta
          property='og:description'
          content='もにょの成長記録です。プログラミング（Python、JavaScript）の話が多いかな。'
        />
      {/* set background image */}
      <Image src='/background-image.svg' layout='fill' objectFit='cover' />
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
                bg={'#f6f1eb'}
                borderColor={'#f6f1eb'}
                borderRadius={'100px'}
                aria-label={'read more posts'}
                textStyle={'h1'}
                _hover={{ bg: '#f3f0ed' }}
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
