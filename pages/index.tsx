import Head from 'next/head';
import Image from 'next/image';
import { Center, Box } from '@chakra-ui/react';
import { HomePosts } from '../components/medium/HomePosts';
import { HeaderAndFooter } from '../components/large/HeaderAndFooter';
import { getAllPosts } from '../lib/api';
import { useState } from 'react';
import { HoverButton } from '../components/small/HoverButton';

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
    category: string;
  }>;
}) => {
  const initialState = 2;
  const [postCount, setCount] = useState(initialState);
  const ReadMorePosts = () => {
    setCount(postCount + 2);
  };

  return (
    <>
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
        {/* twitter */}
        <meta name='twitter:title' content='もにょblog' />
      </Head>
      {/* set background image */}
      <Image src='/background-image.svg' layout='fill' objectFit='cover' />
      <HeaderAndFooter>
        <Box layerStyle={'home_base'}>
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
            <Center pt={'10'}>
              <HoverButton onClick={ReadMorePosts} areaLabel='read more posts'>
                <>前の記事</>
              </HoverButton>
            </Center>
          )}
        </Box>
      </HeaderAndFooter>
    </>
  );
};

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

export default Home;
