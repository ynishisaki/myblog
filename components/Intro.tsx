import { Box, Image, Text, HStack, extendTheme } from '@chakra-ui/react';


const theme = extendTheme({
  textStyles: {
    p: {
      color: '#4d5156',
      fontSize: '16px',
      fontfamily: 'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;',
    },
    h1: {
      color: '#4d5156',
      fontSize: '30px',
      fontWeight: 'bolder',
    },
  },
})

{/* <ChakraProvider theme={theme}>
  <App />
</ChakraProvider> */}


export const Intro = () => {
  const property = {
    title: 'はじめまして',
    coverImage: '/images.jpeg',
    date: '2022-01-16',
    slug: 'start blog!',
    excerpt: "hello! i'm monyo. ... ",
    text: "もにょと申します。もにょは、中学の頃良くしてくださった先輩から頂いた名前で、命名の理由は「（私が）もにょっとしてるから」だそう。これまでの人生、いろんな呼ばれ方をしてきましたが、なんだかもにょっとした名前が多い...。ですから、私という人物を一言で説明すると、「もにょっとしている」となるんでしょう。",
  };

  return (
    <>
      <Box mt={'0px'} display={'flex'} w={'100%'} h={'100%'}>
        <HStack spacing='0' alignItem={'center'}>
          <Box
            w={'50%'}
            h={'100%'}
            pr={'5'}
            // maxW={'100%'}
            // boxSize={'400px'}
          >
            <Image
              fit={'cover'}
              boxSize={'100%'}
              objectFit={'cover'}
              borderRadius={'1rem'}
              src={property.coverImage}
              alt='coverimage'
            />
          </Box>

          <Box
            w={'50%'}
            h={'100%'}
            pl={'5'}
            color={'#4d5156'}
            font-family={
              'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;'
            }
          >
            <Text fontSize={'30px'} fontweight={'bolder'}>
              {property.title}
            </Text>
            <br/>
            <Text fontSize={'16px'} fontWeight={'light'}>
              {property.date}
            </Text>
            <br />
            <Text fontSize={'16px'} fontWeight={'lighter'} noOfLines={3}>
              {property.text}
            </Text>
            <br />
          </Box>
          <Box textStyle={'h1'}>hello</Box>
        </HStack>
      </Box>
    </>
  );
};
