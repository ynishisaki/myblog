import { Box } from '@chakra-ui/react';

export const Conteiner = ({ children }: { children: React.ReactElement }) => {
  return (
    <Box
      mt={'70px'}
      mx={'auto'}
      h={'500px'}
      w={'100%'}
      py={'3%'}
      px={'10%'}
      bg={'#f6f1eb'}
    >
      {children}
    </Box>
  );
};
