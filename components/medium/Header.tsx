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
      <HoverButton
        icon={<Icon as={RiHome2Line} fontSize={'2xl'} />}
        onClick={jumpToHome}
        areaLabel={'Home button'}
      >
        {isnotMobile && <Text textStyle={'h1'}>ホーム</Text>}
      </HoverButton>
      <Center layerStyle={'blogTitle'}>もにょぶろぐ</Center>
    </Box>
  );
};
