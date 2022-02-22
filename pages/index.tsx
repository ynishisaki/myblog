import { Button, Center } from '@chakra-ui/react';
import { Conteiner } from '../components/Conteiner';
import { Intro } from '../components/Intro';
import { Layout } from '../components/Layout';
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
    date: string;
  }>;
}) => {
  const initialState = 2;
  const [postCount, setCount] = useState(initialState);
  const ReadMorePosts = () => {
    setCount(postCount + 1);
  };

  const router: NextRouter = useRouter();

  return (
    <>
      <Head>
        <title>もにょblog｜Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Conteiner>
          <>
            {posts.slice(0, postCount + 1).map((post) => {
              return (
                <Intro
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  coverImage={post.coverImage}
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
          </>
        </Conteiner>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts(['slug', 'title', 'excerpt', 'date', 'coverImage', 'content']);

  return {
    props: {
      posts: posts,
    },
  };
}

export default Home;
