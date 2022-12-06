import { Box, Text, Icon, Center, useBreakpointValue } from '@chakra-ui/react';
import { RiHome2Line } from 'react-icons/ri';
import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import { HoverButton } from '../small/HoverButton';

export const Header = () => {
  const router: NextRouter = useRouter();

  const jumpToHome = () => {
    router.push(`/`);
  };

  const isnotMobile = useBreakpointValue({ base: false, md: true });

  return (
    <Box layerStyle={'header'} boxShadow='lg'>
      <HoverButton onClick={jumpToHome} areaLabel={'Home button'}>
        <>
          <Icon as={RiHome2Line} fontSize={'2xl'} />
          {isnotMobile && <Text textStyle={'h1'}>ホーム</Text>}
        </>
      </HoverButton>
      {/*       
        <Button
          onClick={jumpToHome}
          pl={'4'}
          aria-label={'Home button'}
          leftIcon={<RiHome2Line />}
          bg={'#EFECE7'}
          borderRadius={'3xl'}
          fontSize={'2xl'}
          _hover={isnotMobile ? { bg: '#fffcf7' } : {}}
          zIndex={'banner'} //1200
        >
          {isnotMobile && <Text textStyle={'h1'}>ホーム</Text>}
        </Button> */}
      <Center layerStyle={'blogTitle'}>もにょぶろぐ</Center>
    </Box>
  );
};
