import { Box, Heading, Image, Link, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';

export const HomePosts = ({
  title,
  coverImagePath,
  coverImagePhotographer,
  coverImageSrcUrl,
  date,
  slug,
  excerpt,
}: {
  title: string;
  coverImagePath: string;
  coverImagePhotographer: string;
  coverImageSrcUrl: string;
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
      <LinkBox
        as='article'
        layerStyle={'home_display'}
        borderTop={'1px solid'}
        borderBottom={'1px solid'}
        borderColor={'#fffcf7'}
        borderRadius={'10px'}
        transition={'background 0.4s '}
        _hover={{ background: '#fffcf7' }}
      >
        <Box w={'100%'} display={{ md: 'flex' }}>
          <Box
            w={{ md: '50%' }}
            h={{ base: '50%' }}
            pr={{ base: '0', md: '3' }}
            pb={{ base: '3', md: '0' }}
          >
            <Image objectFit={'fill'} src={coverImagePath} alt='coverimage from Unsplash' />
          </Box>
          <Box
            w={{ md: '50%' }}
            h={{ base: '50%' }}
            pl={{ base: '0', md: '3' }}
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
