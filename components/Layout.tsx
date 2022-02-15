import {
  Box,
  IconButton,
  Image,
  Text,
  ListItem,
  UnorderedList,
  HStack,
  VStack,
  Icon,
  Link,
  Spacer,
  Flex,
  Button,
  Stack,
  Center,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RiHome2Line } from 'react-icons/ri';
import { FcBusinesswoman } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import React from 'react';
import { Conteiner } from './Conteiner';
import { NextRouter, useRouter } from 'next/router';

export const Layout = ({ children }: { children: React.ReactElement }) => {
  const router: NextRouter = useRouter();

  const jumpToHome = () => {
    router.push(`/`);
  };

  const jumpToPrivacyPolicy = () => {
    router.push(`/posts/privacy_policy`);
  };

  const jumpToGithub = () => {
    router.push(`https://github.com/ynishisaki/myblog.git`);
  };

  const isnotMobile = useBreakpointValue({ base: false, md: true });

  console.log(isnotMobile);

  return (
    <>
      <Box layerStyle={'header'} boxShadow='lg'>
        <Button
          onClick={jumpToHome}
          layerStyle={'homeButton'}
          aria-label={'Home button'}
          leftIcon={<RiHome2Line />}
          variant={'ghost'}
          marginLeft={{ base: '0px', md: '70px' }}
          fontSize={'25px'}
          _hover={{ backgroundColor: 'gray ' }}
        >
          {isnotMobile && <Text textStyle={'h1'}>Home</Text>}
        </Button>
        {/* <Image layerStyle={'blogLogo'} src={'/logo.png'}></Image> */}
        <Text textStyle={'h2'} layerStyle={'blogTitle'}>
          もにょブログ
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
            ずんばばずんばば
            {/* 今年の目標は、
            <UnorderedList>
              <ListItem>ハーブを植える</ListItem>
              <ListItem>ブログを開設する</ListItem>
              <ListItem>脱毛を契約する</ListItem>
              <ListItem>泳げるようになる</ListItem>
              <ListItem>証券口座を開設する</ListItem>
            </UnorderedList>{' '} */}
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
              onClick={jumpToPrivacyPolicy}
              textDecoration={'underline'}
              _hover={{ textDecoration: 'none' }}
            >
              プライバシーポリシー/免責事項
            </Link>
          </Center>
          {/* <Link
            onClick={jumpToContact}
            textDecoration='underline'
            _hover={{ textDecoration: 'none' }}
            w={'auto'}
          >
            お問い合わせ
          </Link> */}
          {/* <Link href='https://github.com/ynishisaki/myblog.git' isExternal */}
          <Center width={{ base: '100%', md: '50%' }}>
            <Link
              alignItems={'center'}
              onClick={jumpToGithub}
              textDecoration='underline'
              _hover={{ textDecoration: 'none' }}
            >
              <Icon as={AiFillGithub} />
              お問い合わせはGitHubにて
            </Link>
          </Center>
        </Stack>
      </Box>
    </>
  );
};
