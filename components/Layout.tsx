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

  const jumpToContact = () => {
    router.push(`/posts/privacy_policy`);
  };

  return (
    <>
      <Box layerStyle={'header'}>
        <Button
          onClick={jumpToHome}
          layerStyle={'homeButton'}
          aria-label={'Home button'}
          leftIcon={<RiHome2Line />}
          variant={'ghost'}
          marginLeft={'70px'}
          fontSize={'25px'}
          _hover={{ backgroundColor: 'gray ' }}
        >
          <Text textStyle={'h1'}>Home</Text>
        </Button>
        {/* <Image layerStyle={'blogLogo'} src={'/logo.png'}></Image> */}
        <Text textStyle={'h2'} layerStyle={'blogTitle'}>もにょブログ</Text>
        
      </Box>
      {children}
      <Box layerStyle={'footer'}>
        <Box layerStyle={'profile'}>
          <Text textStyle={'h1'}>
            <Icon as={FcBusinesswoman} fontSize={'30px'} />
            もにょ
          </Text>
          <Text textStyle={'p'}>
            
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
        <HStack textStyle={'p'} w={'auto'} spacing={'30px'}>
          <Link
            onClick={jumpToPrivacyPolicy}
            textDecoration={'underline'}
            _hover={{ textDecoration: 'none' }}
            w={'auto'}
          >
            プライバシーポリシー/免責事項
          </Link>
          <Link
            onClick={jumpToContact}
            textDecoration='underline'
            _hover={{ textDecoration: 'none' }}
            w={'auto'}
          >
            お問い合わせ
          </Link>
          <Link href='https://github.com/ynishisaki/myblog.git' isExternal
          textDecoration='underline'
          _hover={{ textDecoration: 'none' }}
          >
            <AiFillGithub mx='2px' />お問い合わせはこちらor修正はGitHubにて 
          </Link>
        </HStack>
      </Box>
    </>
  );
};
