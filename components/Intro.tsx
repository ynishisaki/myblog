import { Box, Image, HStack, Link, Text, LinkBox, Heading, LinkOverlay } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';

export const Intro = ({
  title,
  coverImage,
  date,
  slug,
  excerpt,
}:
{
  title: string;
  coverImage: string;
  date: string;
  slug: string;
  excerpt: string;
}) => {
  const router: NextRouter = useRouter();

  const jumpToSlug = () => {
    router.push(`/posts/${slug}`);
  };

  return (
    <>
      <Box layerStyle={'posts'}>
        <HStack spacing='0' w={'100%'}>
          <Box w={'50%'} h={'100%'} pr={'5'}>
            <Image
              fit={'cover'}
              boxSize={'100%'}
              objectFit={'cover'}
              borderRadius={'1rem'}
              src={'/images.jpeg'}
              alt='coverimage'
            />
          </Box>
          <Box w={'50%'} h={'100%'} pl={'5'}>
            <Text textStyle={'h2'} mt={'30px'}>
              {title}
            </Text>
            <Text textStyle={'p'} mt={'20px'}>
              {date}
            </Text>
            <Text textStyle={'p'} mt={'20px'} noOfLines={3}>
              {excerpt}
            </Text>
            <Text textStyle={'p'} mt={'20px'}>
              詳しくは{' '}
              <Link
                onClick={jumpToSlug}
                textDecoration='underline'
                _hover={{ textDecoration: 'none' }}
              >
                こちら
              </Link>
            </Text>
          </Box>
        </HStack>
      </Box>
    </>
  );
};
