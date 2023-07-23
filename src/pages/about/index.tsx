import Head from 'next/head';
import Image from 'next/image';
import {
  Center,
  Box,
  Text,
  List,
  UnorderedList,
  ListItem,
  HStack,
  VStack,
  Stack,
  Flex,
  LinkBox,
  LinkOverlay,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FixedBackgroundImage } from '../../components/small/FixedBackgroundImage';
import { HeaderAndFooter } from '../../components/large/HeaderAndFooter';
import CategoryTag from '../../components/small/CategoryTag';

interface Props {
  //
}

export default function About(props: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Home｜もにょblog</title>
        <meta name='description' content='もにょのテックブログ。' />
        {/* og */}
        <meta property='og:site_name' content='もにょblog' />
        <meta property='og:title' content='Home｜もにょblog' />
        <meta property='og:type' content='blog' />
        <meta property='og:url' content='https://www.monyoblog.com/' />
        {/* <meta property='og:image' content='' /> */}
        <meta property='og:description' content='もにょのテックブログ。' />
        {/* twitter */}
        <meta name='twitter:title' content='もにょblog' />
      </Head>
      <FixedBackgroundImage />
      <HeaderAndFooter>
        <Box layerStyle={'base'}>
          <Box layerStyle={'post_display'} position='relative'>
            <Text textStyle={'h1'}>About</Text>
            <Stack spacing={8} align='stretch'>
              <Box paddingTop={2}>
                <Text textStyle={'p'}>地質・測量をバックグラウンドに持つwebエンジニアです。</Text>
              </Box>
              <Box>
                <Text textStyle={'h3'}>経歴</Text>

                <Flex textStyle={'p'} style={{ margin: '8px 0', gap: '1rem' }}>
                  <Text>2019.04</Text>
                  <Box>
                    <Text>千葉大学大学院 融合理工学府 地球環境科学専攻</Text>
                  </Box>
                </Flex>
                <Flex textStyle={'p'} style={{ margin: '8px 0', gap: '1rem' }}>
                  <Text>2021.04</Text>
                  <Box>
                    <Text>地質コンサルティング</Text>
                    <Text fontSize={'sm'} color={'gray.600'}>
                      物理探査手法を用いた地形・地質情報の取得、解析、評価
                    </Text>
                  </Box>
                </Flex>
                <Flex textStyle={'p'} style={{ margin: '8px 0', gap: '1rem' }}>
                  <Text>2023.01</Text>
                  <Box>
                    <Text>ITコンサルティング・SIer</Text>
                    <Text fontSize={'sm'} color={'gray.600'}>
                      防災や社会インフラを対象としたコンサルティング、システム開発
                    </Text>
                  </Box>
                </Flex>
              </Box>

              <Box>
                <Text textStyle={'h3'}>公開制作物</Text>

                <Text textStyle={'p'}>
                  GitHubアカウントは{' '}
                  <Link color='blue.500' href='https://github.com/ynishisaki'>
                    こちら
                  </Link>
                </Text>

                <LinkBox as='div' textAlign={'center'}>
                  <CategoryTag color={'blue'} label={'Next.js'} />
                  <LinkOverlay
                    href={`https://www.hexdecconverter.com/`}
                    textStyle={'p'}
                    display={'block'}
                  >
                    16 進数-10 進数変換アプリ
                  </LinkOverlay>
                  <Image
                    width={400}
                    height={250}
                    objectFit='cover'
                    objectPosition={'Top'}
                    src={`/assets/figure/hex-dec-converter.png`}
                    alt='HEX-DEC Converter'
                    onClick={() => {
                      window.open('https://www.hexdecconverter.com/');
                    }}
                  />
                </LinkBox>

                <LinkBox as='div' textAlign={'center'} marginTop={8}>
                  <CategoryTag color={'orange'} label={'Astro'} />
                  <LinkOverlay
                    href={`https://www.hexdecconverter.com/`}
                    textStyle={'p'}
                    display={'block'}
                    alignItems={'center'}
                  >
                    LP制作（共同開発）
                  </LinkOverlay>
                  <Image
                    width={400}
                    height={250}
                    objectFit='cover'
                    objectPosition={'Top'}
                    src={`/assets/figure/happiness-chain.png`}
                    alt='HappinessChain'
                    onClick={() => {
                      window.open('https://happiness-chain.com/');
                    }}
                  />
                </LinkBox>
              </Box>

              <Box>
                <Text textStyle={'h3'}>興味</Text>
                <Text textStyle={'p'}>地図や3Dを用いた情報の可視化、データの利活用</Text>
                <Text textStyle={'p'}>防災のための災害予測技術、情報通達技術</Text>
              </Box>

              <Box>
                <Text textStyle={'h3'}>現在取り組んでいること</Text>
                <Text textStyle={'p'}>
                  業務 : 災害予測シミュレーションシステムの開発（React）
                  <br />
                  個人 : フェムテックのネイティブアプリ開発（React Native）
                </Text>
              </Box>
            </Stack>
          </Box>
        </Box>
      </HeaderAndFooter>
    </>
  );
}
