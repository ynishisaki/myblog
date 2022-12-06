import { Link, Text, Image } from '@chakra-ui/react';

type ChildCompProps = {
  coverImagePath: string;
  coverImagePhotographer: string;
  coverImageSrcUrl: string;
};

export const CoverImage = (props: ChildCompProps) => {
  return (
    <>
      <Image
        my={5}
        fit={'cover'}
        boxSize={'100%'}
        objectFit={'cover'}
        src={props.coverImagePath}
        alt='coverimage from Unsplash'
      />
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
