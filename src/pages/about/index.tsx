import {
  Box,
  Flex,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { HeaderAndFooter } from '../../components/large/HeaderAndFooter';
import { FixedBackgroundImage } from '../../components/small/FixedBackgroundImage';
import happinessChainImage from '/public/public-productions/happiness-chain.png';
import hexDecConverterImage from '/public/public-productions/hex-dec-converter.png';
import pillmeImage from '/public/public-productions/pillme.png';
import rainForecastMapImage from '/public/public-productions/rain-forecast-map.png';

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
            <Box maxW='500' mx='auto'>
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
                      <Text>千葉大学大学院 融合理工学府 地球環境科学専攻 修了</Text>
                    </Box>
                  </Flex>
                  <Flex textStyle={'p'} style={{ margin: '8px 0', gap: '1rem' }}>
                    <Text>2021.04</Text>
                    <Box>
                      <Text>地質コンサルティング 入社</Text>
                      <Text fontSize={'sm'} color={'gray.600'}>
                        物理探査手法を用いた地形・地質情報の取得、解析、評価
                      </Text>
                    </Box>
                  </Flex>
                  <Flex textStyle={'p'} style={{ margin: '8px 0', gap: '1rem' }}>
                    <Text>2023.01</Text>
                    <Box>
                      <Text>ITコンサルティング・SIer 入社</Text>
                      <Text fontSize={'sm'} color={'gray.600'}>
                        防災や社会インフラを対象としたコンサルティング、システム開発
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <Box>
                  <Text textStyle={'h3'}>公開制作物</Text>

                  <Flex mt={2} mb={8}>
                    <Link
                      alignItems={'center'}
                      href='https://github.com/ynishisaki'
                      textDecoration='underline'
                      _hover={{ textDecoration: 'none' }}
                      isExternal
                    >
                      もにょのGitHubアカウント <Icon as={FiExternalLink} />
                    </Link>
                  </Flex>

                  <SimpleGrid columns={1} spacing={10}>
                    <LinkBox as='div' maxW='500'>
                      <Flex alignItems={'center'} justifyContent={'space-between'}>
                        <LinkOverlay textStyle={'h4'} href={`https://www.hexdecconverter.com/`}>
                          16 進数-10 進数変換アプリ
                        </LinkOverlay>
                        <Link
                          fontSize={'sm'}
                          alignItems={'center'}
                          href='https://github.com/ynishisaki'
                          textDecoration='underline'
                          _hover={{ textDecoration: 'none' }}
                          isExternal
                        >
                          GitHubレポジトリ
                        </Link>
                      </Flex>

                      <Image
                        src={hexDecConverterImage}
                        alt='HEX-DEC Converter'
                        style={{
                          objectPosition: 'top',
                          objectFit: 'cover',
                          border: '8px solid white',
                        }}
                      />
                    </LinkBox>

                    <LinkBox as='div' maxW='500'>
                      <Flex alignItems={'center'} justifyContent={'space-between'}>
                        <LinkOverlay
                          textStyle={'h4'}
                          href={`https://rain-forecast-map.vercel.app/`}
                        >
                          雨が降りそうかがわかるサイト
                        </LinkOverlay>
                        <Link
                          fontSize={'sm'}
                          alignItems={'center'}
                          href='https://github.com/ynishisaki'
                          textDecoration='underline'
                          _hover={{ textDecoration: 'none' }}
                          isExternal
                        >
                          GitHubレポジトリ
                        </Link>
                      </Flex>

                      <Image
                        src={rainForecastMapImage}
                        alt='Rain Forecast Map'
                        style={{
                          objectPosition: 'top',
                          objectFit: 'cover',
                          border: '8px solid white',
                        }}
                      />
                    </LinkBox>

                    <LinkBox as='div' maxW='500'>
                      <LinkOverlay textStyle={'h4'} href={`https://happiness-chain.com/`}>
                        LP制作のお手伝い
                      </LinkOverlay>
                      <Image
                        src={happinessChainImage}
                        alt='Happiness Chain'
                        style={{
                          objectPosition: 'top',
                          objectFit: 'contain',
                          border: '8px solid white',
                        }}
                      />
                    </LinkBox>
                  </SimpleGrid>
                </Box>

                <Box>
                  <Text textStyle={'h3'}>現在取り組んでいること</Text>

                  <Box maxW='500'>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                      <Text textStyle={'p'}>フェムテックのネイティブアプリ開発</Text>
                      <Link
                        fontSize={'sm'}
                        alignItems={'center'}
                        href='https://github.com/ynishisaki/pill-me'
                        textDecoration='underline'
                        _hover={{ textDecoration: 'none' }}
                        isExternal
                      >
                        GitHubレポジトリ
                      </Link>
                    </Flex>

                    <Image
                      src={pillmeImage}
                      alt='pillme'
                      style={{
                        objectPosition: 'top',
                        objectFit: 'contain',
                        border: '8px solid white',
                      }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Text textStyle={'h3'}>興味</Text>
                  <Text textStyle={'p'}>地図や3Dを用いた情報の可視化、データの利活用</Text>
                  <Text textStyle={'p'}>防災のための災害予測技術、情報通達技術</Text>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </HeaderAndFooter>
    </>
  );
}
