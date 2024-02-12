import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import backgroundImage from '/public/background/background-image.png';

export const FixedBackgroundImage = () => {
  return (
    <Box
      as='div'
      position='fixed'
      zIndex='base' // 0
      w='100vw'
      h='100vh'
    >
      <Image
        src={backgroundImage}
        alt='background image'
        fill
        priority
        style={{
          objectFit: 'cover',
        }}
      />
    </Box>
  );
};
