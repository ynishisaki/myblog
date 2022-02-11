import { Box, Button, IconButton, Image, layout, ListItem, UnorderedList } from '@chakra-ui/react';
import { Conteiner } from '../components/Conteiner';
import { Intro } from '../components/Intro';
import { Layout } from '../components/Layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { getAllPosts } from '../lib/api';
import { useState } from 'react';

const Home = ({
  posts,
}: {
  posts: Array<{
    title: string;
    coverImage: string;
    date: string;
    slug: string;
    excerpt: string;
  }>;
}) => {
  const initialState = 0;
  const [postCount, setCount] = useState(initialState);
  const ReadMorePosts = () => {
    setCount(postCount + 1);
  };

  const router: NextRouter = useRouter();
  // debugger;
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Conteiner>
          <>
            {posts.slice(0, postCount + 1).map((post) => {
              return (
                <Intro
                  title={post.title}
                  coverImage={post.coverImage}
                  excerpt={post.excerpt}
                  date={post.date}
                  slug={post.slug}
                />
              );
            })}
            {postCount + 1 !== posts.length && (
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
            )}
          </>
        </Conteiner>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'content',
    'ogImage',
    'coverImage',
  ]);

  return {
    props: {
      posts: posts,
    },
  };
}

export default Home;
