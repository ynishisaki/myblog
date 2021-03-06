import { Box, Text, Icon, Link, Button, Stack, Center, useBreakpointValue } from '@chakra-ui/react';
import { RiHome2Line } from 'react-icons/ri';
import { FcBusinesswoman } from 'react-icons/fc';
import { FiExternalLink } from 'react-icons/fi';
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import React from 'react';
import { NextRouter, useRouter } from 'next/router';

export const HeaderAndFooter = ({ children }: { children: React.ReactElement }) => {
  const router: NextRouter = useRouter();

  const jumpToHome = () => {
    router.push(`/`);
  };

  const jumpToPrivacyPolicy = () => {
    router.push(`/posts/20220215-privacy-policy/`);
  };

  const jumpToGithub = () => {
    router.push(`https://github.com/ynishisaki/myblog.git`);
  };

  const jumpToTwitter = () => {
    router.push(`https://twitter.com/monyo75559702`);
  };

  const isnotMobile = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Box layerStyle={'header'} boxShadow='lg'>
        <Button
          onClick={jumpToHome}
          // layerStyle={'homeButton'}
          pl={'4'}
          aria-label={'Home button'}
          leftIcon={<RiHome2Line />}
          // variant={'ghost'}
          variant={'outline'}
          // borderColor={'#4d5156'}
          borderColor={'gray.500'}
          marginLeft={{ base: '0px', md: '70px' }}
          fontSize={'25px'}
          width={'auto'}
          _hover={{ bg: 'gray.50' }}
        >
          {isnotMobile && (
            <Text textStyle={'h1'} mt={'1'}>
              ホーム
            </Text>
          )}
        </Button>
        {/* <Image layerStyle={'blogLogo'} src={'/logo.png'}></Image> */}
        <Text textStyle={'h2'} layerStyle={'blogTitle'}>
          もにょblog
        </Text>
      </Box>

      {children}

      <Box layerStyle={'footer'}>
        <Box layerStyle={'profile'}>
          <Text textStyle={'h1'}>
            <Icon as={FcBusinesswoman} fontSize={'30px'} />
            もにょ
          </Text>
          <Text textStyle={'p'}>
            海なし岐阜県生まれ。今は東京に住んでいる。<br></br>
            なぜあだ名がもにょなのかというと、「もにょっとしているから」とのこと。<br></br>
            使用言語は、Python、TypeScript。
          </Text>
        </Box>
        <Box layerStyle={'borderLine'} />
        <Stack
          textStyle={'p'}
          direction={{ base: 'column', md: 'row' }}
          width={{ base: '100%', md: '70%' }}
        >
          <Center width={{ base: '100%', md: '50%' }}>
            <Link
              // onClick={jumpToPrivacyPolicy}
              href='`/posts/20220215-privacy-policy/`'
              textDecoration={'underline'}
              _hover={{ textDecoration: 'none' }}
            >
              プライバシーポリシー/免責事項
            </Link>
          </Center>
          <Center width={{ base: '100%', md: '50%' }}>
            <Link
              alignItems={'center'}
              // onClick={jumpToGithub}
              href='https://github.com/ynishisaki/myblog.git'
              textDecoration='underline'
              _hover={{ textDecoration: 'none' }}
              isExternal
            >
              <Icon as={AiFillGithub} /> お問い合わせはGitHubにて <Icon as={FiExternalLink} />
            </Link>
          </Center>
        </Stack>
        <Center textStyle={'p'}>© 2022 もにょ</Center>
      </Box>
    </>
  );
};
