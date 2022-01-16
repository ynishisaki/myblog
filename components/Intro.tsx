import { Box, Image, Text, HStack } from '@chakra-ui/react';


export const Intro = () => {
  const property = {
    title: 'title1',
    coverImage: '/images.jpeg',
    date: '2022-01-16',
    slug: 'start blog!',
    excerpt: "hello! i'm monyo. ... ",
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
  }

  return (
     <>
           <Box
        mt={'0px'}
        display={'flex'}
        bg={'#f6f1eb'}
        width={'100%'}
      >

      <HStack 
        spacing='0'
        alignItem={'center'}
      >
        <Box
          pr={'5'}
          w={'50%'}
          // maxW={'lg'}
          // boxSize={'400px'}
        > 
          <Image
          fit={'cover'}
            // boxSize={'400px'}
            objectFit={'cover'}
            borderRadius={'1rem'}
            src={property.coverImage}
            alt='coverimage'
          />
        </Box>

        <Box
          pl={'5'}
          // maxW={'lg'}
          // boxSize={'400px'}
          color={'#4d5156'}
          font-family={'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;'}
          textTransform={'uppercase'}
          w={'50%'}
          ml={'2px'}
        >
          <Text fontSize={'30px'} fontweight={'semibold'}>{property.title}</Text>
          <br/>
          <Text fontSize={'16px'} fontWeight={'medium'}>{property.date}</Text>
          <br />
          <Text fontSize={'16px'} noOfLines={3}>{property.text}</Text>
          <br />
          </Box>
          </HStack>
        </Box>
      

     </>
  )
}