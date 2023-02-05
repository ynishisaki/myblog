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
  category,
}: {
  title: string;
  coverImagePath: string;
  coverImagePhotographer: string;
  coverImageSrcUrl: string;
  date: string;
  slug: string;
  excerpt: string;
  category: string;
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
        bg={'#FAF7F2'} // high color
        borderRadius={'md'}
        // ホバーすると記事がちょっと浮き出た感じになる
        transition={'box-shadow 0.4s, transform 0.4s'}
        _hover={{
          boxShadow: '2xl',
          transform: 'translateY(-4px)',
        }}
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
              <LinkOverlay href={`/posts/${slug}`} textStyle={'h2'} lineHeight={'1'}>
                {title}
              </LinkOverlay>
            </Heading>
            <Text textStyle={'p'} my={'5'}>
              {date}
            </Text>
            {/* <Text
              textStyle={'p'}
              my={'5'}
              borderRadius={'2xl'}
              borderColor={'#f6f1eb'}
              border={'2px solid #f6f1eb'}
            >
              {category}
            </Text> */}
            <Text textStyle={'p'} noOfLines={3} my={'5'}>
              {excerpt}
            </Text>
          </Box>
        </Box>
      </LinkBox>
    </>
  );
};
