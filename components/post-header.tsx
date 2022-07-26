import { Box, Link, Text, Image } from '@chakra-ui/react';

export const PostHeader = ({
  title,
  date,
  coverImagePath,
  coverImagePhotographer,
  coverImageSrcUrl,
}: {
  title: string;
  date: string;
  coverImagePath: string;
  coverImagePhotographer: string;
  coverImageSrcUrl: string;
}) => {
  return (
    <Box mb={50}>
      <Text textStyle={'p'} fontSize={'2.4em'} fontWeight={'bold'}>
        {title}
      </Text>
      <Text textStyle={'p'}>{date}</Text>
      <Image
        my={5}
        fit={'cover'}
        boxSize={'100%'}
        objectFit={'cover'}
        src={coverImagePath}
        alt='coverimage from Unsplash'
      />
      <Text textStyle={'p'} align={'right'}>
        Photo by{' '}
        <Link
          color='gray.500'
          href={coverImageSrcUrl}
          textDecoration={'underline'}
          _hover={{ textDecoration: 'none' }}
        >
          {coverImagePhotographer}
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
    </Box>
  );
};
