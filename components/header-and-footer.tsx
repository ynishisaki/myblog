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

  const isnotMobile = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Box layerStyle={'header'} boxShadow='lg'>
        <Button
          onClick={jumpToHome}
          pl={'4'}
          aria-label={'Home button'}
          leftIcon={<RiHome2Line />}
          bg={'#f6f1eb'}
          borderRadius={'100px'}
          fontSize={'25px'}
          _hover={isnotMobile ? { bg: '#fffcf7' } : {}}
          zIndex={'banner'} //1200
        >
          {isnotMobile && <Text textStyle={'h1'}>ホーム</Text>}
        </Button>
        {/* <Image layerStyle={'blogLogo'} src={'/logo.png'}></Image> */}
        <Center layerStyle={'blogTitle'}>もにょぶろぐ</Center>
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
              href='/posts/20220215-privacy-policy/'
              textDecoration={'underline'}
              _hover={{ textDecoration: 'none' }}
            >
              プライバシーポリシー/免責事項
            </Link>
          </Center>
          <Center width={{ base: '100%', md: '50%' }}>
            <Link
              alignItems={'center'}
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
