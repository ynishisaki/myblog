import { Box, IconButton, Image, layout, ListItem, UnorderedList } from '@chakra-ui/react';
import { Conteiner } from '../components/Conteiner';
import { Intro } from '../components/Intro';
import { Layout } from '../components/Layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';

const Home: NextPage = () => {
  const router: NextRouter = useRouter();

  // const pushbutton = () => {
  //   console.log('push done');
  // };

  interface Blog {
    title: string;
    content: string;
    articleId?: number;
  }

  // const blog: { title: string; content: string } = {
  //   title: 'title',
  //   content: 'this is content',
  // };

  // const showBlog = ({ title, content }: Blog) => {
  //   console.log(title);
  // };

  // showBlog({ title: 'a', content: 'b', articleId: 3 });

  return (
    <>
      <Layout>
        <>
          <Head>
            <title>Home</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Conteiner>
            <Intro />
          </Conteiner>
        </>
      </Layout>
    </>
  );
};

export default Home;
