import { Box, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';
import Image from 'next/image';

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
        p={'4'}
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
            <Image
              width={400}
              height={300}
              objectFit='cover'
              src={coverImagePath}
              alt='coverimage from Unsplash'
              style={{ borderRadius: 'md' }}
            />
          </Box>
          <Box
            w={{ md: '50%' }}
            h={{ base: '50%' }}
            pl={{ base: '0', md: '3' }}
            pt={{ base: '3', md: '0' }}
            display={'flex'}
            flexDirection={'column'}
            flex={'1'}
            my={'auto'}
          >
            <Heading>
              <LinkOverlay href={`/posts/${slug}`} textStyle={'h2'}>
                {title}
              </LinkOverlay>
            </Heading>
            <Text
              textStyle={'p'}
              mt={'1'} // override
              color={'gray.600'} // override
            >
              {date}
            </Text>

            {/* md 以上の時だけ表示 */}
            <Text
              textStyle={'p'}
              fontSize={'sm'} // override
              color={'gray.600'} // override
              mt={'5'} // override
              noOfLines={3}
              display={{ base: 'none', md: 'block' }}
            >
              {excerpt}
            </Text>
          </Box>
        </Box>
      </LinkBox>
    </>
  );
};
