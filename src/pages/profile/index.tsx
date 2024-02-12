import { Box, Flex, Link, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { HeaderAndFooter } from '../../components/large/HeaderAndFooter';
import { FixedBackgroundImage } from '../../components/small/FixedBackgroundImage';

export default function About(): JSX.Element {
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
              </Box>
            </Stack>
          </Box>
        </Box>
      </HeaderAndFooter>
    </>
  );
}
