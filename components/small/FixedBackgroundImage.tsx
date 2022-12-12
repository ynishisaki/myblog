import Image from 'next/image';
import backgroundImage from '../../public/background-image.svg';
import { Box } from '@chakra-ui/react';

export const FixedBackgroundImage = () => {
  return (
    <Box
      position='fixed'
      zIndex='base' // 0
      w='100vw'
      h='100vh'
    >
      <Image
        src={backgroundImage}
        alt='background image'
        layout='fill'
        objectFit='cover'
        priority
      />
    </Box>
  );
};
