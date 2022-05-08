import { Box, Heading, Image, Link, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
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
      <LinkBox as='article' layerStyle={'posts'} borderWidth='2px' rounded='md'>
        <Box spacing='0' w={'100%'} display={{ md: 'flex' }}>
          <Box
            w={{ md: '50%' }}
            h={{ base: '50%' }}
            pr={{ base: '0', md: '5' }}
            pb={{ base: '3', md: '0' }}
          >
            <Image objectFit={'fill'} src={coverImage} alt='coverimage from Unsplash' />
          </Box>
          <Box
            w={{ md: '50%' }}
            h={{ base: '50%' }}
            pl={{ base: '0', md: '5' }}
            pt={{ base: '3', md: '0' }}
          >
            <Heading>
              <LinkOverlay href={`/posts/${slug}`} textStyle={'h2'}>
                {title}
              </LinkOverlay>
            </Heading>
            <Box as='time' textStyle={'p'}>
              {date}
            </Box>
            <Text textStyle={'p'} noOfLines={3} mt={'30px'}>
              {excerpt}
            </Text>
          </Box>
        </Box>
      </LinkBox>
    </>
  );
};
