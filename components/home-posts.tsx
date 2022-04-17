import { Box, Image, Link, Text } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';

export const HomePosts = ({
  title,
  coverImage,
  coverImagePhotographer,
  coverImageSrc,
  date,
  slug,
  excerpt,
}: {
  title: string;
  coverImage: string;
  coverImagePhotographer: string;
  coverImageSrc: string;
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
        <Box spacing='0' w={'100%'} display={{ md: 'flex' }}>
          <Box
            w={{ md: '50%' }}
            h={{ base: '50%' }}
            pr={{ base: '0', md: '5' }}
            pb={{ base: '3', md: '0' }}
          >
            <Image objectFit={'fill'} src={coverImage} alt='coverimage' />
          </Box>
          <Box
            w={{ md: '50%' }}
            h={{ base: '50%' }}
            pl={{ base: '0', md: '5' }}
            pt={{ base: '3', md: '0' }}
          >
            <Text textStyle={'h2'}>{title}</Text>
            <Text textStyle={'p'}>{date}</Text>
            <Text textStyle={'p'} noOfLines={3} mt={'30px'}>
              {excerpt}
            </Text>
            <Text textStyle={'p'} mt={'10px'}>
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
        </Box>
      </Box>
    </>
  );
};