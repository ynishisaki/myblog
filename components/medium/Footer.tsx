import { Box, Text, Icon, Link, Stack, Center, Flex } from '@chakra-ui/react';
import { FcBusinesswoman } from 'react-icons/fc';
import { FiExternalLink } from 'react-icons/fi';
import { AiFillGithub } from 'react-icons/ai';
import React from 'react';

export const Footer = () => {
  return (
    <Box layerStyle={'footer'}>
      <Box layerStyle={'profile'}>
        <Flex alignItems={'flex-end'}>
          <Icon as={FcBusinesswoman} fontSize={'30px'} />
          <Text textStyle={'h1'}>もにょ</Text>
        </Flex>
        <Text fontSize={{ base: 'sm', md: 'md' }} textStyle={'p'} my={'3'}>
          海なし岐阜県生まれ。今は東京に住んでいる。<br></br>
          なぜあだ名がもにょなのかというと、「もにょっとしているから」とのこと。<br></br>
          普段はReactでの開発がメイン。
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
            fontSize={'sm'}
            href='/posts/20220215-privacy-policy/'
            textDecoration={'underline'}
            _hover={{ textDecoration: 'none' }}
          >
            プライバシーポリシー/免責事項
          </Link>
        </Center>
        <Center width={{ base: '100%', md: '50%' }}>
          <Link
            fontSize={'sm'}
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
      <Center textStyle={'p'} my={'3'} fontSize={'sm'}>
        © 2022 もにょ
      </Center>
    </Box>
  );
};
