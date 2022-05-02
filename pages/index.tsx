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
    coverImage: string;
    coverImagePhotographer: string;
    coverImageSrc: string;
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
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Home｜もにょblog</title>
        <meta name='description' content='つれづれなるもにょ' />
        <meta name='author' content='monyo'></meta>
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
                coverImage={post.coverImage}
                coverImagePhotographer={post.coverImagePhotographer}
                coverImageSrc={post.coverImageSrc}
                date={post.date}
              />
            );
          })}
          {postCount + 1 !== posts.length && (
            <Center>
              <Button
                onClick={ReadMorePosts}
                aria-label={'read more posts'}
                variant={'outline'}
                textStyle={'h1'}
                borderColor={'#4d5156'}
                _hover={{ backgroundColor: 'gray ' }}
              >
                read more
              </Button>
            </Center>
          )}
        </Box>
      </HeaderAndFooter>
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts([
    'slug',
    'title',
    'excerpt',
    'date',
    'coverImage',
    'coverImagePhotographer',
    'coverImageSrc',
    'content',
  ]);

  return {
    props: {
      posts: posts,
    },
  };
}

export default Home;
