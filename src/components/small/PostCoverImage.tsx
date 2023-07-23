import Image from 'next/image';
import { Box, Link, Text } from '@chakra-ui/react';

type ChildCompProps = {
  coverImagePath: string;
  coverImagePhotographer: string;
  coverImageSrcUrl: string;
};

export const PostCoverImage = (props: ChildCompProps) => {
  return (
    <>
      {/* 画像サイズを親要素で指定する */}
      <Box position='relative' w='100%' h={{ base: '200px', sm: '300px', md: '450px' }}>
        <Image
          src={props.coverImagePath}
          alt='cover image from Unsplash'
          layout='fill'
          objectFit='cover'
          priority
        />
      </Box>
      <Text textStyle={'p'} align={'right'}>
        Photo by{' '}
        <Link
          color='gray.500'
          href={props.coverImageSrcUrl}
          textDecoration={'underline'}
          _hover={{ textDecoration: 'none' }}
        >
          {props.coverImagePhotographer}
        </Link>{' '}
        on{' '}
        <Link
          color='gray.500'
          href='https://unsplash.com/'
          textDecoration={'underline'}
          _hover={{ textDecoration: 'none' }}
        >
          Unsplash
        </Link>
      </Text>
    </>
  );
};
